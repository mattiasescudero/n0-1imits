export default function SpotifyToolPage() {
  const toolUrl = "https://example.com"; // replace later with your real tool link

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Spotify All-Time Analyzer</h1>
      <p className="mt-4 text-neutral-600">
        Upload your Spotify data export (.json) and get an all-time snapshot: top artists, top tracks, listening trends,
        and more.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 p-6">
        <p className="text-sm text-neutral-600">
          The tool runs as a separate app (Python) so uploads + charts work smoothly.
        </p>

        <a
          href={toolUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-neutral-800 transition"
        >
          Open Tool
        </a>

        <p className="mt-4 text-xs text-neutral-500">
          Privacy note: your files should be processed to generate results and not stored.
        </p>
      </div>
    </main>
  );
}
