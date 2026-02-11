"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { parseSpotifyStreamingHistoryFiles } from "@/lib/spotify/parse";
import { computeSpotifyMetrics } from "@/lib/spotify/metrics";

type Play = {
  ts: string;
  msPlayed: number;
  trackName: string | null;
  artistName: string | null;
  albumName: string | null;
  trackUri: string | null;
};

type ApiResponse = {
  metrics?: {
    totals: {
      totalHours: number;
      totalPlays: number;
      playsOver30s: number;
    };
    topByStreams: {
      artists: { name: string; value: number }[];
      tracks: { name: string; value: number }[];
    };
    topByTime: {
      artists: { name: string; hours: number }[];
      tracks: { name: string; hours: number }[];
    };
  };
  genres?: {
    topByStreams: { genre: string; streams: number }[];
    evolution?: {
      series: string[];
      byMonth: Record<string, number | string>[];
    };
  };
  error?: string;
};

function extractTrackId(uri: string | null) {
  if (!uri) return null;
  const parts = uri.split(":");
  if (parts.length === 3 && parts[1] === "track") return parts[2];
  return null;
}

function monthKey(ts: string) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default function SpotifyToolPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  // Spotify account privacy / data download page
  const spotifyDataUrl = "https://www.spotify.com/account/privacy/";

  async function handleAnalyze() {
    setLoading(true);
    setData(null);

    try {
      // ✅ 1) Parse files locally (NO server upload)
      const plays = (await parseSpotifyStreamingHistoryFiles(files as any)) as Play[];

      // ✅ 2) Compute metrics locally
      const metrics = computeSpotifyMetrics(plays as any);

      // ✅ 3) Extract unique trackIds (small)
      const trackIds = Array.from(
        new Set(
          plays
            .map((p) => extractTrackId(p.trackUri))
            .filter(Boolean) as string[]
        )
      ).slice(0, 5000);

      // ✅ 4) Ask server ONLY for genre mappings (small request)
      const genreRes = await fetch("/api/spotify/track-genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackIds }),
      });

      const genreText = await genreRes.text();
      let genreJson: any;
      try {
        genreJson = JSON.parse(genreText);
      } catch {
        throw new Error(genreText.slice(0, 160));
      }
      if (!genreRes.ok) throw new Error(genreJson?.error || "Genre lookup failed");

      const trackGenres: Record<string, string[]> = genreJson.trackGenres ?? {};
      const trackPrimaryGenre: Record<string, string> =
        genreJson.trackPrimaryGenre ?? {};

      // ✅ 5) Build Top Genres (by streams) locally
      const genreStreams = new Map<string, number>();

      for (const p of plays) {
        const tid = extractTrackId(p.trackUri);
        if (!tid) continue;
        const genres = trackGenres[tid] ?? [];
        for (const g of genres) {
          const key = String(g).trim().toLowerCase();
          if (!key) continue;
          genreStreams.set(key, (genreStreams.get(key) ?? 0) + 1);
        }
      }

      const topByStreams = [...genreStreams.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 25)
        .map(([genre, streams]) => ({ genre, streams }));

      // ✅ 6) Build Genre Evolution (primary genre only) locally
      const monthGenreCounts = new Map<string, Map<string, number>>();
      const primaryGenreTotals = new Map<string, number>();

      for (const p of plays) {
        const tid = extractTrackId(p.trackUri);
        if (!tid) continue;

        const g = (trackPrimaryGenre[tid] || "unknown").toLowerCase();
        const m = monthKey(p.ts);

        if (!monthGenreCounts.has(m)) monthGenreCounts.set(m, new Map());
        const inner = monthGenreCounts.get(m)!;
        inner.set(g, (inner.get(g) ?? 0) + 1);

        primaryGenreTotals.set(g, (primaryGenreTotals.get(g) ?? 0) + 1);
      }

      const K = 8;
      const seriesCore = [...primaryGenreTotals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, K)
        .map(([g]) => g);

      const monthsSorted = [...monthGenreCounts.keys()].sort((a, b) =>
        a.localeCompare(b)
      );

      const byMonth = monthsSorted.map((month) => {
        const inner = monthGenreCounts.get(month)!;

        let other = 0;
        const row: Record<string, string | number> = { month };

        for (const [g, count] of inner.entries()) {
          if (seriesCore.includes(g)) row[g] = count;
          else other += count;
        }

        for (const g of seriesCore) {
          if (row[g] === undefined) row[g] = 0;
        }

        row["other"] = other;
        return row;
      });

      setData({
        metrics,
        genres: {
          topByStreams,
          evolution: {
            series: [...seriesCore, "other"],
            byMonth,
          },
        },
      });
    } catch (err: any) {
      setData({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Spotify All-Time Analyzer</h1>
      <p className="mt-4 text-neutral-600">
        Upload your Spotify data export (.json) to get an all-time snapshot: top
        artists, tracks, genres, and how your taste evolves over time.
      </p>

      {/* Collapsible tutorial */}
      <details className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
        <summary className="cursor-pointer select-none text-sm font-medium text-neutral-900">
          How to download your Spotify extended listening history
          <span className="ml-2 text-xs text-neutral-500">(click to expand)</span>
        </summary>

        <div className="mt-4 text-sm text-neutral-700">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Open Spotify’s privacy page:{" "}
              <a
                href={spotifyDataUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Spotify Account → Privacy
              </a>
            </li>
            <li>
              Scroll to <b>Download your data</b>
            </li>
            <li>
              Request <b>Extended streaming history</b>{" "}
              <span className="text-neutral-500">
                (this includes your full listening history)
              </span>
            </li>
            <li>
              Spotify will email you when it’s ready{" "}
              <span className="text-neutral-500">(usually a few days)</span>
            </li>
            <li>
              Download the <b>.zip</b>, extract it, then upload the{" "}
              <b>Streaming_History_*.json</b> files here
            </li>
          </ol>

          <p className="mt-3 text-xs text-neutral-500">
            Tip: Upload all JSON files from the export for the most accurate
            results.
          </p>
        </div>
      </details>

      {/* Upload Box */}
      <div className="mt-8 rounded-xl border border-neutral-200 p-6">
        <label className="block text-sm font-medium">Upload JSON file(s)</label>

        <input
          type="file"
          multiple
          accept=".json,application/json"
          className="mt-2 block w-full text-sm"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        />

        <button
          onClick={handleAnalyze}
          disabled={!files.length || loading}
          className="mt-4 rounded-md bg-black px-6 py-3 text-white hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <p className="mt-4 text-xs text-neutral-500">
          Privacy note: your files are processed in your browser and not uploaded.
        </p>
      </div>

      {/* Error */}
      {data?.error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {data.error}
        </div>
      )}

      {/* Results */}
      {data?.metrics && (
        <div className="mt-8 space-y-6">
          {/* Totals */}
          <section className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Totals</h2>
            <div className="mt-3 space-y-1 text-sm text-neutral-700">
              <div>
                Total hours listened: <b>{data.metrics.totals.totalHours}</b>
              </div>
              <div>
                Total plays: <b>{data.metrics.totals.totalPlays}</b>
              </div>
              <div>
                Plays over 30 seconds: <b>{data.metrics.totals.playsOver30s}</b>
              </div>
            </div>
          </section>

          {/* Top Genres */}
          <section className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Top Genres (by streams)</h2>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {(data.genres?.topByStreams ?? []).map((g) => (
                <div
                  key={g.genre}
                  className="flex justify-between rounded-lg border border-neutral-200 px-3 py-2"
                >
                  <span className="capitalize">{g.genre}</span>
                  <span className="text-neutral-500">{g.streams}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Genre Evolution Chart */}
          {data.genres?.evolution && (
            <section className="rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold">
                Genre Evolution (stacked, by month)
              </h2>

              <div className="mt-4 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.genres.evolution.byMonth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.genres.evolution.series.map((key) => (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stackId="1"
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Each play is assigned to the primary artist’s primary genre.
                Smaller genres are grouped under “Other.”
              </p>
            </section>
          )}

          {/* Top Artists */}
          <section className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Top Artists (by streams)</h2>
            <div className="mt-3 space-y-2 text-sm">
              {data.metrics.topByStreams.artists.slice(0, 10).map((a) => (
                <div key={a.name} className="flex justify-between">
                  <span>{a.name}</span>
                  <span className="text-neutral-500">{a.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Tracks */}
          <section className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Top Tracks (by streams)</h2>
            <div className="mt-3 space-y-2 text-sm">
              {data.metrics.topByStreams.tracks.slice(0, 10).map((t) => (
                <div key={t.name} className="flex justify-between">
                  <span>{t.name}</span>
                  <span className="text-neutral-500">{t.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
