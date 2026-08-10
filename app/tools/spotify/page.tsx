"use client";

import Link from "next/link";
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

const chartColors = [
  "#ffffff",
  "#d4d4d4",
  "#a3a3a3",
  "#737373",
  "#525252",
  "#404040",
  "#262626",
  "#171717",
  "#0a0a0a",
];

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatGenreLabel(value: string) {
  if (value.toLowerCase() === "other") return "Other";

  return value
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function GenreTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const sortedPayload = [...payload]
    .filter((entry) => {
      const genre = String(entry.dataKey ?? entry.name ?? "").toLowerCase();
      const value = Number(entry.value ?? 0);

      return genre !== "unknown" && value > 0;
    })
    .sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0));

  if (!sortedPayload.length) return null;

  return (
    <div className="min-w-[220px] border border-white/25 bg-black p-4 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white">
        {label}
      </p>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
        Plays by Genre
      </p>

      <div className="mt-4 space-y-2">
        {sortedPayload.map((entry) => {
          const genre = String(entry.dataKey ?? entry.name ?? "");
          const value = Number(entry.value ?? 0);

          return (
            <div
              key={genre}
              className="flex items-center justify-between gap-8"
            >
              <span className="text-xs capitalize text-white">
                {formatGenreLabel(genre)}
              </span>

              <span className="text-xs font-semibold text-white">
                {formatNumber(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function extractTrackId(uri: string | null) {
  if (!uri) return null;

  const parts = uri.split(":");

  if (parts.length === 3 && parts[1] === "track") {
    return parts[2];
  }

  return null;
}

function monthKey(ts: string) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");

  return `${y}-${m}`;
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="border border-white/15 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
        {label}
      </p>

      <p className="mt-5 text-4xl font-medium tracking-[-0.05em] text-white md:text-5xl">
        {typeof value === "number" ? formatNumber(value) : value}
      </p>

      {sub && (
        <p className="mt-3 text-xs leading-5 text-white">
          {sub}
        </p>
      )}
    </div>
  );
}

function RankedList({
  title,
  items,
  valueLabel,
}: {
  title: string;
  items: { name: string; value?: number; hours?: number }[];
  valueLabel: "streams" | "hours";
}) {
  return (
    <section className="border border-white/15 bg-white/[0.02] p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
        {title}
      </h2>

      <div className="mt-6 space-y-3">
        {items.slice(0, 10).map((item, index) => {
          const metricValue =
            valueLabel === "streams"
              ? item.value ?? 0
              : item.hours ?? 0;

          return (
            <div
              key={`${item.name}-${index}`}
              className="grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="text-xs text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="truncate text-sm text-white">
                {item.name}
              </span>

              <span className="text-xs text-white">
                {formatNumber(metricValue)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function SpotifyToolPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const spotifyDataUrl = "https://www.spotify.com/account/privacy/";

  async function handleAnalyze() {
    setLoading(true);
    setData(null);

    try {
      const plays = (await parseSpotifyStreamingHistoryFiles(
        files as any
      )) as Play[];

      const metrics = computeSpotifyMetrics(plays as any);

      const trackIds = Array.from(
        new Set(
          plays
            .map((p) => extractTrackId(p.trackUri))
            .filter(Boolean) as string[]
        )
      ).slice(0, 5000);

      const genreRes = await fetch("/api/spotify/track-genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackIds }),
      });

      const genreText = await genreRes.text();

      let genreJson: any;

      try {
        genreJson = JSON.parse(genreText);
      } catch {
        throw new Error(genreText.slice(0, 160));
      }

      if (!genreRes.ok) {
        throw new Error(
          genreJson?.error || "Genre lookup failed"
        );
      }

      const trackGenres: Record<string, string[]> =
        genreJson.trackGenres ?? {};

      const trackPrimaryGenre: Record<string, string> =
        genreJson.trackPrimaryGenre ?? {};

      /*
       * TOP GENRES
       *
       * Metric: Genre-Tagged Plays
       *
       * Every play is counted once for each Spotify genre associated with
       * that track/artist. Therefore, one play can contribute to multiple
       * genres.
       */
      const genreStreams = new Map<string, number>();

      for (const p of plays) {
        const tid = extractTrackId(p.trackUri);

        if (!tid) continue;

        const genres = trackGenres[tid] ?? [];

        for (const g of genres) {
          const key = String(g).trim().toLowerCase();

          if (!key) continue;

          genreStreams.set(
            key,
            (genreStreams.get(key) ?? 0) + 1
          );
        }
      }

      const topByStreams = [...genreStreams.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 25)
        .map(([genre, streams]) => ({
          genre,
          streams,
        }));

      /*
       * TASTE OVER TIME
       *
       * Metric: Monthly Plays by Primary Genre
       *
       * Each play is assigned to one primary genre and therefore counted
       * once in the monthly visualization.
       */
      const monthGenreCounts = new Map<
        string,
        Map<string, number>
      >();

      const primaryGenreTotals = new Map<string, number>();

      for (const p of plays) {
        const tid = extractTrackId(p.trackUri);

        if (!tid) continue;

        const genre = (
          trackPrimaryGenre[tid] || "unknown"
        ).toLowerCase();

        const month = monthKey(p.ts);

        if (!monthGenreCounts.has(month)) {
          monthGenreCounts.set(month, new Map());
        }

        const inner = monthGenreCounts.get(month)!;

        inner.set(
          genre,
          (inner.get(genre) ?? 0) + 1
        );

        primaryGenreTotals.set(
          genre,
          (primaryGenreTotals.get(genre) ?? 0) + 1
        );
      }

      const seriesCore = [...primaryGenreTotals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([genre]) => genre);

      const monthsSorted = [
        ...monthGenreCounts.keys(),
      ].sort((a, b) => a.localeCompare(b));

      const byMonth = monthsSorted.map((month) => {
        const inner = monthGenreCounts.get(month)!;

        let other = 0;

        const row: Record<string, string | number> = {
          month,
        };

        for (const [genre, count] of inner.entries()) {
          if (seriesCore.includes(genre)) {
            row[genre] = count;
          } else {
            other += count;
          }
        }

        for (const genre of seriesCore) {
          if (row[genre] === undefined) {
            row[genre] = 0;
          }
        }

        row.other = other;

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
      setData({
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/70 px-6 py-5 backdrop-blur-md md:px-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-white transition-opacity hover:opacity-60"
        >
          ← N0 1IMITS
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
          Tools / Spotify
        </p>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[16vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            DATA
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white">
            Public Tool
          </p>

          <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                Spotify All-Time Analyzer
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white md:text-base md:leading-8">
                Upload your Spotify streaming history JSON files and generate a
                dashboard of your top artists, tracks, genres, total hours, and
                how your taste evolved over time.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.02] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                Privacy Note
              </p>

              <p className="mt-4 text-sm leading-7 text-white">
                Your JSON files are parsed directly in your browser. The app
                only sends Spotify track IDs to the server for genre matching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD / INSTRUCTIONS */}
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <details className="border border-white/15 bg-white/[0.02] p-6">
            <summary className="cursor-pointer select-none text-sm font-semibold uppercase tracking-[0.25em] text-white">
              How to get your Spotify data
            </summary>

            <div className="mt-6 text-sm leading-7 text-white">
              <ol className="list-inside list-decimal space-y-3">
                <li>
                  Open{" "}
                  <a
                    href={spotifyDataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white underline underline-offset-4"
                  >
                    Spotify Account → Privacy
                  </a>
                </li>

                <li>
                  Scroll to Download your data.
                </li>

                <li>
                  Request Extended streaming history for the most complete
                  results.
                </li>

                <li>
                  Wait for Spotify to email your export.
                </li>

                <li>
                  Download the .zip, extract it, then upload the
                  Streaming_History_*.json files here.
                </li>
              </ol>

              <p className="mt-5 text-xs text-white">
                Tip: upload every JSON file from the export so the dashboard is
                accurate.
              </p>
            </div>
          </details>

          <div className="border border-white/15 bg-white/[0.02] p-6">
            <label className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Upload JSON files
            </label>

            <input
              type="file"
              multiple
              accept=".json,application/json"
              className="mt-6 block w-full cursor-pointer border border-white/15 bg-black p-4 text-sm text-white file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-black"
              onChange={(e) =>
                setFiles(
                  Array.from(e.target.files ?? [])
                )
              }
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white">
                {files.length
                  ? `${formatNumber(files.length)} file(s) selected`
                  : "No files selected yet"}
              </p>

              <button
                onClick={handleAnalyze}
                disabled={!files.length || loading}
                className="border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze"}
              </button>
            </div>
          </div>
        </div>

        {data?.error && (
          <div className="mx-auto mt-6 max-w-6xl border border-red-500/40 bg-red-500/10 p-5 text-sm leading-7 text-red-200">
            {data.error}
          </div>
        )}
      </section>

      {/* RESULTS */}
      {data?.metrics && (
        <section className="border-t border-white/10 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white">
                  Dashboard
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                  Your Listening Profile
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white">
                Generated from your Spotify streaming history export.
              </p>
            </div>

            {/* TOTALS */}
            <div className="grid gap-3 md:grid-cols-3">
              <StatCard
                label="Total Hours"
                value={data.metrics.totals.totalHours}
                sub="Total listening time across uploaded files."
              />

              <StatCard
                label="Total Plays"
                value={data.metrics.totals.totalPlays}
                sub="Every play included in the JSON export."
              />

              <StatCard
                label="Plays Over 30s"
                value={data.metrics.totals.playsOver30s}
                sub="Filtered listens used for top artist and track rankings."
              />
            </div>

            {/* CHART + GENRES */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {data.genres?.evolution && (
                <section className="border border-white/15 bg-white/[0.02] p-5">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                        Genre Evolution
                      </p>

                      <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white md:text-3xl">
                        Taste Over Time
                      </h3>
                    </div>

                    <div className="max-w-sm md:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
                        Metric: Monthly Plays
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white">
                        Each play is counted once using the track&apos;s primary
                        genre.
                      </p>
                    </div>
                  </div>

                  <div className="h-[420px]">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <AreaChart
                        data={
                          data.genres.evolution.byMonth
                        }
                      >
                        <XAxis
                          dataKey="month"
                          tick={{
                            fill: "#ffffff",
                            fontSize: 11,
                          }}
                          axisLine={{
                            stroke:
                              "rgba(255,255,255,0.35)",
                          }}
                          tickLine={false}
                        />

                        <YAxis
                          tick={{
                            fill: "#ffffff",
                            fontSize: 11,
                          }}
                          axisLine={{
                            stroke:
                              "rgba(255,255,255,0.35)",
                          }}
                          tickLine={false}
                          tickFormatter={(value) =>
                            formatNumber(
                              Number(value)
                            )
                          }
                        />

                        <Tooltip
                          content={
                            <GenreTooltip />
                          }
                        />

                        <Legend
                          wrapperStyle={{
                            color: "#ffffff",
                            fontSize: "12px",
                          }}
                          formatter={(value) =>
                            formatGenreLabel(
                              String(value)
                            )
                          }
                        />

                        {data.genres.evolution.series.map(
                          (key, index) => (
                            <Area
                              key={key}
                              type="monotone"
                              dataKey={key}
                              stackId="1"
                              stroke={
                                chartColors[
                                  index %
                                    chartColors.length
                                ]
                              }
                              fill={
                                chartColors[
                                  index %
                                    chartColors.length
                                ]
                              }
                              fillOpacity={0.55}
                            />
                          )
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              )}

              {/* TOP GENRES */}
              <section className="border border-white/15 bg-white/[0.02] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Top Genres
                </p>

                <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-white">
                  Genre-Tagged Plays
                </h3>

                <p className="mt-3 text-xs leading-5 text-white">
                  Metric: number of plays associated with each Spotify genre.
                  One play can count toward multiple genres.
                </p>

                <div className="mt-6 space-y-3">
                  {(data.genres?.topByStreams ?? [])
                    .slice(0, 12)
                    .map((genre, index) => (
                      <div
                        key={genre.genre}
                        className="grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-xs text-white">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="truncate text-sm capitalize text-white">
                          {genre.genre}
                        </span>

                        <span className="text-xs font-semibold text-white">
                          {formatNumber(
                            genre.streams
                          )}
                        </span>
                      </div>
                    ))}
                </div>
              </section>
            </div>

            {/* RANKINGS */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <RankedList
                title="Top Artists / Streams"
                items={
                  data.metrics.topByStreams
                    .artists
                }
                valueLabel="streams"
              />

              <RankedList
                title="Top Tracks / Streams"
                items={
                  data.metrics.topByStreams
                    .tracks
                }
                valueLabel="streams"
              />

              <RankedList
                title="Top Artists / Hours"
                items={
                  data.metrics.topByTime
                    .artists
                }
                valueLabel="hours"
              />

              <RankedList
                title="Top Tracks / Hours"
                items={
                  data.metrics.topByTime
                    .tracks
                }
                valueLabel="hours"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}