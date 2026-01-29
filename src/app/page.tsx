export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold tracking-tight">N0 1IMITS</h1>
        <p className="mt-6 text-lg text-neutral-600">
          A hub for music, tools, data, and creative work.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/tools"
            className="rounded-md bg-black px-6 py-3 text-white hover:bg-neutral-800 transition"
          >
            Tools
          </a>
          <a
            href="/about"
            className="rounded-md border border-black px-6 py-3 hover:bg-neutral-100 transition"
          >
            About
          </a>
        </div>
      </div>
    </main>
  );
}
