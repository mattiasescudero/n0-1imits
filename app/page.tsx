import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black text-white scroll-smooth">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Corner Navigation */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-6 left-6 md:top-10 md:left-10">
            <a
              href="#about"
              className="font-medium uppercase tracking-[0.25em] text-xs transition-opacity duration-300 hover:opacity-60 sm:text-sm md:text-xl md:tracking-[0.35em]"
            >
              About
            </a>
          </div>

          <div className="absolute top-6 right-6 text-right md:top-10 md:right-10">
            <a
              href="#n01se"
              className="font-medium uppercase tracking-[0.25em] text-xs transition-opacity duration-300 hover:opacity-60 sm:text-sm md:text-xl md:tracking-[0.35em]"
            >
              N01SE
            </a>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <a
              href="#archive"
              className="font-medium uppercase tracking-[0.25em] text-xs transition-opacity duration-300 hover:opacity-60 sm:text-sm md:text-xl md:tracking-[0.35em]"
            >
              Archive
            </a>
          </div>

          <div className="absolute bottom-6 right-6 text-right md:bottom-10 md:right-10">
            <a
              href="#tools"
              className="font-medium uppercase tracking-[0.25em] text-xs transition-opacity duration-300 hover:opacity-60 sm:text-sm md:text-xl md:tracking-[0.35em]"
            >
              Tools
            </a>
          </div>
        </div>

        {/* Centered Logo */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <Image
            src="/logo-full-white.png"
            alt="N0 1IMITS full logo"
            width={1000}
            height={300}
            priority
            className="h-auto w-auto max-w-[80%] md:max-w-[60%] lg:max-w-[500px]"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:h-screen md:px-10 md:py-10"
      >
        <h2 className="absolute top-8 left-8 font-semibold uppercase tracking-[0.35em] text-2xl md:top-10 md:left-10 md:text-4xl">
          About
        </h2>

        {/* Faint Background Word */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[18vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            N01
          </span>
        </div>

        {/* Subtle Symbol Watermark */}
        <Image
          src="/logo-symbol-white.png"
          alt="N0 1IMITS symbol watermark"
          width={240}
          height={240}
          className="pointer-events-none absolute bottom-10 right-10 hidden h-auto w-32 opacity-[0.05] md:block lg:w-44"
        />

        <div className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center justify-center md:h-full md:min-h-0">
          <div className="w-full max-w-6xl">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
              {/* Main Statement */}
              <div>
                <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                  N0 1IMITS is a music company shaped by sound, culture, and the
                  belief that music has no borders.
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                  Built as a platform for live experiences, mixes, creative
                  projects, and music-driven ideas, N0 1IMITS exists to explore
                  how sound connects people across backgrounds, cities, and
                  scenes.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid gap-3">
                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      Sound
                    </h3>
                    <span className="text-xs text-white/35">01</span>
                  </div>
                  <p className="text-sm leading-6 text-white/55">
                    Live events, DJ sets, mixes, and listening experiences.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      Culture
                    </h3>
                    <span className="text-xs text-white/35">02</span>
                  </div>
                  <p className="text-sm leading-6 text-white/55">
                    Music as a bridge across communities, backgrounds, and
                    global influences.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      Data
                    </h3>
                    <span className="text-xs text-white/35">03</span>
                  </div>
                  <p className="text-sm leading-6 text-white/55">
                    Music research, creative tools, and digital projects built
                    around discovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* N01SE SECTION */}
      <section
        id="n01se"
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:h-screen md:px-10 md:py-10"
      >
        {/* N01SE Logo Header */}
        <div className="absolute top-8 right-8 z-20 md:top-10 md:right-10">
          <Image
            src="/N01SE_logo_transparent.png"
            alt="N01SE logo"
            width={600}
            height={180}
            priority
            className="h-auto w-36 sm:w-44 md:w-64 lg:w-80"
          />
        </div>

        {/* Faint Background Word */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[16vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            LIVE
          </span>
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center justify-center pt-10 md:h-full md:min-h-0 md:pt-20">
          <div className="grid w-full max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            {/* Event Image / Flyer */}
            <a
              href="https://posh.vip/e/n01se-live-pop-orlando"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-white/15 bg-white/[0.02] p-3 transition-opacity duration-300 hover:opacity-80"
            >
              <div className="relative flex aspect-[4/5] w-full max-w-[360px] items-center justify-center overflow-hidden bg-black mx-auto md:max-w-none">
                <Image
                  src="/n01se-live-posh.png"
                  alt="N01SE LIVE event flyer"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </a>

            {/* N01SE Copy */}
            <div className="md:pl-8">
              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                N01SE is the live sound division of N0 1IMITS.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                Built for live events, DJ mixes, nightlife, and sound-driven
                experiences, N01SE is where the brand turns music into a room,
                a crowd, and a moment.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 md:mt-8">
                <div className="border border-white/15 bg-white/[0.02] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    Live
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-white/50">
                    Events and in-person music experiences.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    Mixes
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-white/50">
                    DJ sets, edits, and curated sound.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    Nightlife
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-white/50">
                    Music built for energy, movement, and atmosphere.
                  </p>
                </div>
              </div>

              <a
                href="https://posh.vip/e/n01se-live-pop-orlando"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-300 hover:bg-white hover:text-black md:mt-8"
              >
                View Event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE SECTION */}
      <section
        id="archive"
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:h-screen md:px-10 md:py-10"
      >
        <h2 className="absolute bottom-8 left-8 z-20 font-semibold uppercase tracking-[0.35em] text-2xl md:bottom-10 md:left-10 md:text-4xl">
          Archive
        </h2>

        {/* Faint Background Word */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[14vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            MEDIA
          </span>
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center justify-center md:h-full md:min-h-0">
          <div className="grid w-full max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10">
            {/* Archive Statement */}
            <div>
              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                A living collection of sound, visuals, links, and moments from
                the N0 1IMITS world.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                Archive brings together the mixes, clips, platforms, and
                creative traces connected to N0 1IMITS and N01SE.
              </p>

              {/* Featured Audio */}
              <a
                href="https://soundcloud.com/matti-651038290/i-freestyled-mixed-tech-house"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 block border border-white/15 bg-white/[0.02] p-5 transition-colors duration-300 hover:bg-white hover:text-black md:mt-8"
              >
                <div className="mb-5 flex items-center justify-between gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55 transition-colors duration-300 group-hover:text-black/55">
                    Featured Audio
                  </p>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:text-black/45">
                    SoundCloud
                  </span>
                </div>

                <h3 className="text-xl font-medium tracking-[-0.03em] md:text-3xl">
                  I Freestyled / Mixed Tech House
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-black/60">
                  Listen to the latest featured mix.
                </p>
              </a>
            </div>

            {/* Platform Links */}
            <div className="grid gap-3">
              <a
                href="https://on.soundcloud.com/2VwsuloIEHZ0ulaHbb"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/15 bg-white/[0.02] p-5 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      SoundCloud
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-black/60">
                      Mixes, sets, and audio experiments.
                    </p>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/n01imits.project/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/15 bg-white/[0.02] p-5 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      Instagram
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-black/60">
                      Visual updates, flyers, and moments.
                    </p>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@itsmattiiii"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/15 bg-white/[0.02] p-5 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.35em]">
                      TikTok
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-black/60">
                      Clips, edits, and short-form music content.
                    </p>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section
        id="tools"
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:h-screen md:px-10 md:py-10"
      >
        <h2 className="absolute bottom-8 right-8 z-20 text-right font-semibold uppercase tracking-[0.35em] text-2xl md:bottom-10 md:right-10 md:text-4xl">
          Tools
        </h2>

        {/* Faint Background Word */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[14vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            DATA
          </span>
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center justify-center md:h-full md:min-h-0">
          <div className="grid w-full max-w-6xl gap-8 md:grid-cols-[1fr_1fr] md:items-center md:gap-10">
            {/* Tools Statement */}
            <div>
              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                Tools built around music, discovery, and creative data.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                A growing space for interactive projects from the N0 1IMITS
                world — starting with a Spotify All-Time Analyzer built to turn
                listening history into a personal music dashboard.
              </p>
            </div>

            {/* Tool Cards */}
            <div className="grid gap-3">
              <a
                href="/tools/spotify"
                className="group border border-white/15 bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <div className="mb-6 flex items-center justify-between gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55 transition-colors duration-300 group-hover:text-black/55">
                    Public Tool
                  </p>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:text-black/45">
                    Spotify
                  </span>
                </div>

                <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">
                  Spotify All-Time Analyzer
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/50 transition-colors duration-300 group-hover:text-black/60">
                  Upload your Spotify streaming history JSON files and generate
                  an all-time dashboard of top artists, tracks, genres, hours
                  listened, and listening evolution.
                </p>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em]">
                  Launch Analyzer →
                </p>
              </a>

              <div className="border border-white/10 bg-white/[0.015] p-6 opacity-60">
                <div className="mb-6 flex items-center justify-between gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                    Showcase
                  </p>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/30">
                    Soon
                  </span>
                </div>

                <h3 className="text-2xl font-medium tracking-[-0.03em] text-white/80 md:text-3xl">
                  Breakout Radar
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/40">
                  A private model for spotting emerging artists through growth,
                  virality, and fanbase signals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}