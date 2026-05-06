import { NextResponse } from "next/server";
import { parseSpotifyStreamingHistoryFiles } from "@/lib/spotify/parse";
import { computeSpotifyMetrics } from "@/lib/spotify/metrics";
import { attachGenresToArtists } from "@/lib/spotify/genres";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
    }

    const plays = await parseSpotifyStreamingHistoryFiles(files);
    const metrics = computeSpotifyMetrics(plays);

    const genreResult = await attachGenresToArtists(plays);

    return NextResponse.json({
      metrics,
      genres: {
        topByStreams: genreResult.topGenresByStreams,
        evolution: genreResult.evolution,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Analyze failed." },
      { status: 500 }
    );
  }
}

