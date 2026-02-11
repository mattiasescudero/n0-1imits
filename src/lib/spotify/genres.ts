import type { Play } from "./parse";

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local"
    );
  }

  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 30_000) return cachedToken.token;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!res.ok) throw new Error("Failed to get Spotify access token.");

  const data = (await res.json()) as SpotifyTokenResponse;

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.token;
}

function extractTrackId(uri: string | null) {
  if (!uri) return null;
  const parts = uri.split(":");
  if (parts.length === 3 && parts[1] === "track") return parts[2];
  return null;
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function monthKey(ts: string) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

type TrackArtistMap = Record<string, string | null>; // trackId -> primaryArtistId
type ArtistGenresMap = Record<string, string[]>;      // artistId -> genres[]

async function fetchPrimaryArtistIdsByTrackId(trackIds: string[], token: string) {
  const trackToPrimaryArtist: TrackArtistMap = {};

  for (const batch of chunk(trackIds, 50)) {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${batch.join(",")}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      for (const id of batch) trackToPrimaryArtist[id] = null;
      continue;
    }

    const data = await res.json();

    for (const t of data.tracks ?? []) {
      const id: string | undefined = t?.id;
      const primaryArtistId: string | null = t?.artists?.[0]?.id ?? null;
      if (id) trackToPrimaryArtist[id] = primaryArtistId;
    }
  }

  return trackToPrimaryArtist;
}

async function fetchGenresByArtistId(artistIds: string[], token: string) {
  const artistToGenres: ArtistGenresMap = {};

  for (const batch of chunk(artistIds, 50)) {
    const res = await fetch(
      `https://api.spotify.com/v1/artists?ids=${batch.join(",")}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      for (const id of batch) artistToGenres[id] = [];
      continue;
    }

    const data = await res.json();
    for (const a of data.artists ?? []) {
      if (!a?.id) continue;
      artistToGenres[a.id] = a.genres ?? [];
    }
  }

  return artistToGenres;
}

/**
 * Returns:
 * - topGenresByStreams: top genres by total streams (counts ALL genres of primary artist)
 * - evolution: stacked chart dataset where each play is assigned to ONE primary genre
 *   primary genre = first genre Spotify returns for the primary artist
 */
export async function attachGenresToArtists(plays: Play[]) {
  const token = await getSpotifyAccessToken();

  const uniqueTrackIds = Array.from(
    new Set(
      plays
        .map((p) => extractTrackId(p.trackUri))
        .filter(Boolean) as string[]
    )
  );

  const cappedTrackIds = uniqueTrackIds.slice(0, 5000);

  const trackToPrimaryArtist = await fetchPrimaryArtistIdsByTrackId(
    cappedTrackIds,
    token
  );

  const artistIds = Array.from(
    new Set(Object.values(trackToPrimaryArtist).filter(Boolean) as string[])
  );

  const artistToGenres = await fetchGenresByArtistId(artistIds, token);

  // (A) Top Genres (by streams) - counts ALL genres on primary artist
  const genreStreamCountsAll = new Map<string, number>();

  // (B) Genre evolution chart - ONE genre per play
  const primaryGenreCountsAll = new Map<string, number>();
  const monthGenreCounts = new Map<string, Map<string, number>>();

  for (const p of plays) {
    const trackId = extractTrackId(p.trackUri);
    if (!trackId) continue;

    const primaryArtistId = trackToPrimaryArtist[trackId] ?? null;
    if (!primaryArtistId) continue;

    const genres = artistToGenres[primaryArtistId] ?? [];
    if (!genres.length) continue;

    // A) Top genres by streams
    for (const g of genres) {
      const key = String(g).trim().toLowerCase();
      if (!key) continue;
      genreStreamCountsAll.set(key, (genreStreamCountsAll.get(key) ?? 0) + 1);
    }

    // B) Assign ONE primary genre for evolution chart
    const primaryGenre =
      String(genres[0] ?? "unknown").trim().toLowerCase() || "unknown";

    primaryGenreCountsAll.set(
      primaryGenre,
      (primaryGenreCountsAll.get(primaryGenre) ?? 0) + 1
    );

    const m = monthKey(p.ts);
    if (!monthGenreCounts.has(m)) monthGenreCounts.set(m, new Map());
    const inner = monthGenreCounts.get(m)!;
    inner.set(primaryGenre, (inner.get(primaryGenre) ?? 0) + 1);
  }

  const topGenresByStreams = [...genreStreamCountsAll.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([genre, streams]) => ({ genre, streams }));

  // Top series for chart (keep readable)
  const K = 8;
  const seriesCore = [...primaryGenreCountsAll.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, K)
    .map(([genre]) => genre);

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

    // ensure all series keys exist on each row
    for (const g of seriesCore) {
      if (row[g] === undefined) row[g] = 0;
    }

    row["other"] = other;
    return row;
  });

  return {
    topGenresByStreams,
    evolution: {
      series: [...seriesCore, "other"],
      byMonth,
    },
  };
}

