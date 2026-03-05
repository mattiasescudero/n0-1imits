export default function DropsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Drops</h1>
      <p className="mt-3 text-neutral-600">
        Drops + events + releases. Everything new lives here.
      </p>

      {/* Top section */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Next Drop */}
        <div className="rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold">Next Drop</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Coming soon. Join the list so you don’t miss it.
          </p>

          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
            <button className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 transition">
              Join
            </button>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Placeholder form for now — we’ll connect this later.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>

          <a
            href="https://posh.vip/e/ignite-indie-night"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block overflow-hidden rounded-lg border border-neutral-200 hover:bg-neutral-50 transition"
          >
            <img
              src="/images/ignitethenight.png"
              alt="IGNITE INDIE NIGHT"
              className="h-40 w-full object-cover"
              loading="lazy"
            />

            <div className="p-4">
              <p className="text-sm text-neutral-500">Upcoming Event</p>

              <h3 className="mt-1 font-medium">
                IGNITE INDIE NIGHT
              </h3>

              <p className="mt-2 text-sm text-neutral-600">
                Austin's Coffee · 4/4/26 · 8:00 PM
              </p>

              <div className="mt-3 inline-block text-sm font-medium text-black underline">
                View Event →
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Past Drops */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Past Drops</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Your first merch drop will show up here once it’s live.
        </p>

        <div className="mt-4 rounded-xl border border-neutral-200 p-6 text-sm text-neutral-600">
          Nothing here yet.
        </div>
      </section>
    </main>
  );
}
