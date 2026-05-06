export type Play = {
  ts: string;
  msPlayed: number;
  trackName: string | null;
  artistName: string | null;
  albumName: string | null;
  trackUri: string | null;
};

function normalizeRow(row: any): Play | null {
  if (!row) return null;

  const ts = row.ts;
  const msPlayed = Number(row.ms_played ?? 0);

  return {
    ts,
    msPlayed,
    trackName: row.master_metadata_track_name ?? null,
    artistName: row.master_metadata_album_artist_name ?? null,
    albumName: row.master_metadata_album_album_name ?? null,
    trackUri: row.spotify_track_uri ?? null,
  };
}

export async function parseSpotifyStreamingHistoryFiles(
  files: FormDataEntryValue[]
): Promise<Play[]> {
  const all: Play[] = [];

  for (const f of files) {
    if (!(f instanceof File)) continue;

    const text = await f.text();
    const json = JSON.parse(text);

    if (!Array.isArray(json)) {
      throw new Error(`File "${f.name}" is not an array of plays.`);
    }

    for (const row of json) {
      const p = normalizeRow(row);
      if (p && p.ts) all.push(p);
    }
  }

  return all;
}
