export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">About</h1>

      {/* Platform intro */}
      <p className="mt-6 text-lg text-neutral-700">
        N0 1IMITS is a personal hub for what I’m building — music, tools,
        data-driven projects, and creative experiments.
      </p>

      <p className="mt-4 text-neutral-600">
        This site exists as a place to share work publicly while giving me room
        to explore ideas privately. Some tools are interactive, some projects
        are still in progress, and some things simply document the process as
        it unfolds.
      </p>

      <p className="mt-4 text-neutral-600">
        I’m especially interested in the intersection of music, analytics, and
        culture — whether that’s through DJ mixes, data tools, or experimental
        models like Breakout Radar.
      </p>

      <p className="mt-8 text-neutral-600">
        N0 1IMITS isn’t about perfection or finished products. It’s about
        momentum, curiosity, and building things that feel authentic over time.
      </p>

      {/* About me */}
      <h2 className="mt-12 text-xl font-medium">About Me</h2>

      <p className="mt-4 text-neutral-600">
        My name is Mattias, and I’m a senior at the University of Central Florida majoring in Data
        Science with a minor in Psychology. I’ve always had a strong interest
        in music, analytics, and understanding patterns — both creative and
        quantitative.
      </p>

      <p className="mt-4 text-neutral-600">
        I played the viola for eight years, and during the COVID period I
        started rating albums and building my own predictions for the
        Billboard Hot 100 and UK Official Charts. Those early experiments were
        what sparked my interest in combining music with data and analytics in
        more intentional ways.
      </p>

      <p className="mt-4 text-neutral-600">
        N0 1IMITS gives me a place to build on those interests — to create,
        test ideas, and house projects that sit somewhere between music,
        data, and culture.
      </p>

      {/* Timeline */}
      <h2 className="mt-12 text-xl font-medium">Timeline</h2>

      <div className="mt-6 border-l border-neutral-200 pl-6">
        <ul className="space-y-4">
          <li>
            <span className="text-sm text-neutral-500">
              Fall 2022
            </span>
            <p className="font-medium">Started at the University of Central Florida</p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Spring 2023
            </span>
            <p className="font-medium">
              Helped establish Black & Gold Analytics
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Summer 2024
            </span>
            <p className="font-medium">
              Prospect to Pro Project (Black & Gold Analytics)
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Fall 2024
            </span>
            <p className="font-medium">
              Selected for the Billboard Elite 40 Focus Group
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Spring 2025
            </span>
            <p className="font-medium">
              Spotify Data Project (AmStat @ UCF)
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Summer 2025
            </span>
            <p className="font-medium">
              Commercial Strategy Intern at Virgin Music Group
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Summer 2025
            </span>
            <p className="font-medium">
              Started DJ TikTok and began building “MATTI” as a DJ alias
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Fall 2025
            </span>
            <p className="font-medium">
              Joined the Executive Board of the American Statistical Association at UCF
            </p>
          </li>

          <li>
            <span className="text-sm text-neutral-500">
              Spring 2026
            </span>
            <p className="font-medium">
              Launched the N0 1IMITS website
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
}

