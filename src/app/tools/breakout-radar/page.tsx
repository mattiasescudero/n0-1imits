export default function BreakoutRadarPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Breakout Radar</h1>

      <p className="mt-4 text-neutral-600">
        A private analytics project I’m building to identify artists that are
        about to break — before the numbers fully reflect it.
      </p>

      <div className="mt-10 rounded-xl border border-neutral-200 p-8">
        <h2 className="text-lg font-semibold">Coming Soon</h2>

        <p className="mt-3 text-sm text-neutral-600">
          Breakout Radar is currently in development. It will combine streaming
          data, growth velocity, and audience behavior to surface early-stage
          momentum.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600">
          <li>Notability — how known an artist is</li>
          <li>Virality — how fast attention is accelerating</li>
          <li>Loyalty — how strong repeat listening is</li>
        </ul>

        <p className="mt-4 text-xs text-neutral-500">
          First public insights and reports will be shared here once available.
        </p>
      </div>
    </main>
  );
}
