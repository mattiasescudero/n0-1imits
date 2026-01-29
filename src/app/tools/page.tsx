import Link from "next/link";

const tools = [
  {
    title: "Spotify All-Time Analyzer",
    desc: "Upload your Spotify data export and get an all-time breakdown.",
    href: "/tools/spotify",
    tag: "Public Tool",
  },
  {
    title: "Breakout Radar",
    desc: "My private model for spotting artists that are about to pop.",
    href: "/tools/breakout-radar",
    tag: "Showcase",
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Tools</h1>
      <p className="mt-3 text-neutral-600">
        Interactive tools + models I’m building. Some are public, some are just a window into how I work.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="rounded-xl border border-neutral-200 p-6 hover:border-neutral-400 transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.title}</h2>
              <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700">
                {t.tag}
              </span>
            </div>
            <p className="mt-3 text-neutral-600">{t.desc}</p>
            <p className="mt-6 text-sm underline">Open</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
