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

export default function SpotifyToolPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  // Spotify account privacy / data download page (direct link)
  const spotifyDataUrl = "https://www.spotify.com/account/privacy/";

  async function handleAnalyze() {
    setLoading(true);
    setData(null);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/spotify/analyze", {
        method: "POST",
        body: formData,
      });

      const json = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(json.error || "Analyze failed");

      setData(json);
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
          <span className="ml-2 text-xs text-neutral-500">
            (click to expand)
          </span>
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
          Privacy note: files are processed locally and not stored.
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
                Plays over 30 seconds:{" "}
                <b>{data.metrics.totals.playsOver30s}</b>
              </div>
            </div>
          </section>

          {/* Top Genres */}
          <section className="rounded-xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Top Genres (by streams)</h2>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {data.genres?.topByStreams?.map((g) => (
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
