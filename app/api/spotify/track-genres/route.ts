import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
      "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local (and in your deployed env vars)"
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

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Input: { trackIds: string[] }
 * Output: { trackGenres: Record<trackId, string[]>, trackPrimaryGenre: Record<trackId, string> }
 *
 * - trackGenres: genres for the track's PRIMARY artist (from Spotify)
 * - trackPrimaryGenre: first genre (or "unknown")
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { trackIds?: string[] };
    const trackIds = (body.trackIds ?? []).filter(Boolean);

    if (!trackIds.length) {
      return NextResponse.json({ error: "No trackIds provided." }, { status: 400 });
    }

    // safety cap
    const capped = trackIds.slice(0, 5000);

    const token = await getSpotifyAccessToken();

    // 1) tracks -> primary artist ids
    const trackToArtist = new Map<string, string | null>();

    for (const batch of chunk(capped, 50)) {
      const res = await fetch(
        `https://api.spotify.com/v1/tracks?ids=${batch.join(",")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        for (const id of batch) trackToArtist.set(id, null);
        continue;
      }

      const data = await res.json();
      for (const t of data.tracks ?? []) {
        const id: string | undefined = t?.id;
        const primaryArtistId: string | null = t?.artists?.[0]?.id ?? null;
        if (id) trackToArtist.set(id, primaryArtistId);
      }
    }

    // 2) unique artist ids -> genres
    const artistIds = Array.from(
      new Set(Array.from(trackToArtist.values()).filter(Boolean) as string[])
    );

    const artistToGenres = new Map<string, string[]>();

    for (const batch of chunk(artistIds, 50)) {
      const res = await fetch(
        `https://api.spotify.com/v1/artists?ids=${batch.join(",")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        for (const id of batch) artistToGenres.set(id, []);
        continue;
      }

      const data = await res.json();
      for (const a of data.artists ?? []) {
        if (!a?.id) continue;
        const genres: string[] = (a.genres ?? []).map((g: any) =>
          String(g).trim().toLowerCase()
        );
        artistToGenres.set(a.id, genres);
      }
    }

    // 3) build track -> genres maps
    const trackGenres: Record<string, string[]> = {};
    const trackPrimaryGenre: Record<string, string> = {};

    for (const trackId of capped) {
      const artistId = trackToArtist.get(trackId) ?? null;
      const genres = artistId ? artistToGenres.get(artistId) ?? [] : [];

      trackGenres[trackId] = genres;
      trackPrimaryGenre[trackId] = genres[0] || "unknown";
    }

    return NextResponse.json({ trackGenres, trackPrimaryGenre });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to fetch track genres." },
      { status: 500 }
    );
  }
}
