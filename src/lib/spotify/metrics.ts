import type { Play } from "./parse";

const MS_30_SECONDS = 30_000;

function toHours(ms: number) {
  return ms / (1000 * 60 * 60);
}

function topN(map: Map<string, number>, n: number) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, value]) => ({ name, value }));
}

function groupCount(items: (string | null)[]) {
  const m = new Map<string, number>();
  for (const v of items) {
    if (!v) continue;
    m.set(v, (m.get(v) ?? 0) + 1);
  }
  return m;
}

function groupSum(plays: Play[], keyFn: (p: Play) => string | null) {
  const m = new Map<string, number>();
  for (const p of plays) {
    const k = keyFn(p);
    if (!k) continue;
    m.set(k, (m.get(k) ?? 0) + p.msPlayed);
  }
  return m;
}

export function computeSpotifyMetrics(playsRaw: Play[]) {
  // Filter to meaningful listens (>= 30 seconds)
  const plays30 = playsRaw.filter((p) => p.msPlayed >= MS_30_SECONDS);

  // Total listening time (using all plays, like your notebook)
  const totalMs = playsRaw.reduce((acc, p) => acc + (p.msPlayed || 0), 0);

  // Top by stream count (>=30s plays)
  const topArtistsByStreams = topN(groupCount(plays30.map((p) => p.artistName)), 25);
  const topTracksByStreams = topN(groupCount(plays30.map((p) => p.trackName)), 25);

  // Top by time listened (>=30s plays)
  const topArtistsByTime = topN(groupSum(plays30, (p) => p.artistName), 25).map((x) => ({
    name: x.name,
    hours: Number(toHours(x.value).toFixed(2)),
  }));

  const topTracksByTime = topN(groupSum(plays30, (p) => p.trackName), 25).map((x) => ({
    name: x.name,
    hours: Number(toHours(x.value).toFixed(2)),
  }));

  return {
    totals: {
      totalHours: Number(toHours(totalMs).toFixed(2)),
      totalPlays: playsRaw.length,
      playsOver30s: plays30.length,
    },
    topByStreams: {
      artists: topArtistsByStreams,
      tracks: topTracksByStreams,
    },
    topByTime: {
      artists: topArtistsByTime,
      tracks: topTracksByTime,
    },
  };
}
