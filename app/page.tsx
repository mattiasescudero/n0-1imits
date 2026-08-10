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
              href="#records"
              className="font-medium uppercase tracking-[0.25em] text-xs transition-opacity duration-300 hover:opacity-60 sm:text-sm md:text-xl md:tracking-[0.35em]"
            >
              Records
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
        {/* About Header */}
        <h2 className="absolute top-8 left-8 z-20 font-semibold uppercase tracking-[0.35em] text-2xl md:top-10 md:left-10 md:text-4xl">
          About
        </h2>

        {/* Project Details */}
        <div className="absolute top-20 left-8 z-20 flex flex-wrap gap-x-6 gap-y-2 md:top-11 md:left-auto md:right-10 md:justify-end md:gap-x-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 md:text-xs">
            Orlando, FL
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 md:text-xs">
            Est. 2026
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 md:text-xs">
            Independent Music Project
          </p>
        </div>

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

        <div className="relative z-10 flex min-h-[calc(100vh-12rem)] items-center justify-center pt-10 md:h-full md:min-h-0 md:pt-0">
          <div className="w-full max-w-6xl">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
              {/* Main Statement */}
              <div>
                <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                  N0 1IMITS is an independent music project shaped by sound,
                  culture, and the belief that music has no borders.
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                  Founded in Orlando in 2026, N0 1IMITS was built as a platform
                  for live experiences, mixes, broadcasts, creative projects,
                  and music-driven ideas. The project exists to explore how
                  sound connects people across backgrounds, cities, cultures,
                  and scenes.
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 md:text-base md:leading-8">
                  From the dance floor to the internet, every part of N0 1IMITS
                  is built around discovering new sound, creating new
                  experiences, and bringing different worlds together through
                  music.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid gap-3">
                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em]">
                    Sound
                  </h3>

                  <p className="text-sm leading-6 text-white/55">
                    Live events, DJ sets, mixes, broadcasts, and listening
                    experiences built around discovery.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em]">
                    Culture
                  </h3>

                  <p className="text-sm leading-6 text-white/55">
                    Music as a bridge across communities, backgrounds, cities,
                    and global influences.
                  </p>
                </div>

                <div className="border border-white/15 bg-white/[0.02] p-5 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em]">
                    Data
                  </h3>

                  <p className="text-sm leading-6 text-white/55">
                    Music research, listening data, creative tools, and digital
                    projects that turn discovery into something interactive.
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
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:px-10 md:py-14"
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
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-screen items-center justify-center">
          <span className="select-none text-[16vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            LIVE
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl pt-16 md:pt-24">
          {/* Main N01SE Feature */}
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
            {/* Event Image / Posh Link */}
            <div>
              <a
                href="https://posh.vip/e/n01se-live-pop-orlando"
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-white/15 bg-white/[0.02] p-3 transition-opacity duration-300 hover:opacity-80"
              >
                <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[360px] items-center justify-center overflow-hidden bg-black md:max-w-none">
                  <Image
                    src="/n01se-live-posh.png"
                    alt="N01SE LIVE event flyer"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </a>

              <a
                href="https://posh.vip/e/n01se-live-pop-orlando"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between border-b border-white/15 pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-white md:text-xs"
              >
                <span>N01SE LIVE 01: ORLANDO</span>
                <span>View Event →</span>
              </a>
            </div>

            {/* N01SE Copy */}
            <div>
              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                N01SE is the live sound division of N0 1IMITS.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:mt-8 md:text-base md:leading-8">
                Built for live events, DJ mixes, nightlife, and sound-driven
                experiences, N01SE is where the brand turns music into a room,
                a crowd, and a moment.
              </p>

              {/* Metrics */}
              <div className="mt-10">
                <div className="grid grid-cols-3 border-y border-white/15">
                  <div className="py-5 pr-4 md:py-6">
                    <p className="text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
                      1
                    </p>
                    <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 md:text-xs">
                      Events
                    </p>
                  </div>

                  <div className="border-l border-white/15 px-4 py-5 md:px-6 md:py-6">
                    <p className="text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
                      252
                    </p>
                    <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 md:text-xs">
                      Attendance
                    </p>
                  </div>

                  <div className="border-l border-white/15 py-5 pl-4 md:py-6 md:pl-6">
                    <p className="text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
                      6
                    </p>
                    <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 md:text-xs">
                      DJs
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://posh.vip/e/n01se-live-pop-orlando"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-300 hover:bg-white hover:text-black"
              >
                View Event
              </a>
            </div>
          </div>

          {/* Recorded Sets */}
          <div className="mt-20 border-t border-white/10 pt-8 md:mt-28 md:pt-10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 md:text-xs">
                  N01SE LIVE 01: ORLANDO
                </p>

                <h3 className="mt-3 text-2xl font-medium uppercase tracking-[-0.02em] text-white md:text-4xl">
                  Recorded Live
                </h3>
              </div>

              <p className="max-w-md text-xs leading-6 text-white/40 sm:text-right md:text-sm">
                Three sets captured from the first N01SE LIVE event.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {/* Matti */}
              <div className="group">
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/ng_3YjnXwyE"
                      title="Matti — N01SE LIVE 01: Orlando"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55 md:text-xs">
                    Matti
                  </p>

                  <a
                    href="https://www.youtube.com/watch?v=ng_3YjnXwyE&t=3s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-xs"
                  >
                    YouTube →
                  </a>
                </div>
              </div>

              {/* Ridge */}
              <div className="group">
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/3QP9BHUmqbI"
                      title="Ridge — N01SE LIVE 01: Orlando"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55 md:text-xs">
                    Ridge
                  </p>

                  <a
                    href="https://www.youtube.com/watch?v=3QP9BHUmqbI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-xs"
                  >
                    YouTube →
                  </a>
                </div>
              </div>

              {/* Justin */}
              <div className="group">
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/6Cn0wp_9F8k"
                      title="Justin — N01SE LIVE 01: Orlando"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55 md:text-xs">
                    Justin
                  </p>

                  <a
                    href="https://www.youtube.com/watch?v=6Cn0wp_9F8k&t=371s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-xs"
                  >
                    YouTube →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECORDS SECTION */}
      <section
        id="records"
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:px-10 md:py-14"
      >
        {/* Records Header */}
        <h2 className="absolute top-8 left-8 z-20 font-semibold uppercase tracking-[0.35em] text-2xl md:top-10 md:left-10 md:text-4xl">
          Records
        </h2>

        {/* Radio Identifier */}
        <div className="absolute top-20 left-8 z-20 md:top-12 md:left-auto md:right-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 md:text-xs">
            N0 1IMITS RADIO
          </p>
        </div>

        {/* Faint Background Word */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-screen items-center justify-center">
          <span className="select-none text-[14vw] font-bold uppercase tracking-[0.12em] text-white/[0.025]">
            RADIO
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl pt-20 md:pt-24">
          {/* Records Introduction */}
          <div className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-14 md:pb-16">
            <div>
              <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                A living collection of sound, visuals, links, and moments from
                the N0 1IMITS world.
              </p>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
                Records brings together the mixes, clips, platforms, and
                creative traces connected to N0 1IMITS and N01SE.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35 md:text-base md:leading-8">
                N0 1IMITS RADIO is a rotating transmission of DJ sets, recorded
                sessions, and mixes from inside and around the project.
              </p>
            </div>
          </div>

          {/* N0 1IMITS RADIO */}
          <div className="pt-10 md:pt-14">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 md:text-xs">
                  Broadcasting From Orlando
                </p>

                <h3 className="mt-3 text-3xl font-medium uppercase tracking-[-0.03em] text-white md:text-5xl">
                  N0 1IMITS RADIO
                </h3>
              </div>

              <p className="max-w-sm text-xs uppercase leading-6 tracking-[0.18em] text-white/35 sm:text-right">
                Select a transmission.
                <br />
                Press play.
              </p>
            </div>

            {/* Radio Transmissions */}
            <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">
              {/* Transmission 01 */}
              <div>
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <iframe
                    width="100%"
                    height="360"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    loading="lazy"
                    title="MATTI — N01SE LIVE at POP Orlando"
                    src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fmatti-651038290%2Fmatti-no1se-live-pop-orlando&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                  />
                </div>

                <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30 md:text-[10px]">
                      Transmission 01
                    </p>

                    <h4 className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white md:text-base">
                      MATTI — N01SE LIVE @ POP ORLANDO
                    </h4>
                  </div>

                  <a
                    href="https://soundcloud.com/matti-651038290/matti-no1se-live-pop-orlando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-[10px]"
                  >
                    SoundCloud →
                  </a>
                </div>
              </div>

              {/* Transmission 02 */}
              <div>
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <iframe
                    width="100%"
                    height="360"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    loading="lazy"
                    title="RIDGE — N01SE LIVE at POP Orlando"
                    src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Flvrnridge%2Fn01selivepop&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                  />
                </div>

                <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30 md:text-[10px]">
                      Transmission 02
                    </p>

                    <h4 className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white md:text-base">
                      RIDGE — N01SE LIVE @ POP ORLANDO
                    </h4>
                  </div>

                  <a
                    href="https://soundcloud.com/lvrnridge/n01selivepop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-[10px]"
                  >
                    SoundCloud →
                  </a>
                </div>
              </div>

              {/* Transmission 03 */}
              <div>
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <iframe
                    width="100%"
                    height="360"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    loading="lazy"
                    title="JUSTIN — N01SE LIVE at POP Orlando"
                    src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjustins-wav%2Fno1se-live-pop-orlando&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                  />
                </div>

                <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30 md:text-[10px]">
                      Transmission 03
                    </p>

                    <h4 className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white md:text-base">
                      JUSTIN — N01SE LIVE @ POP ORLANDO
                    </h4>
                  </div>

                  <a
                    href="https://soundcloud.com/justins-wav/no1se-live-pop-orlando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-[10px]"
                  >
                    SoundCloud →
                  </a>
                </div>
              </div>

              {/* Transmission 04 */}
              <div>
                <div className="overflow-hidden border border-white/15 bg-white/[0.02]">
                  <iframe
                    width="100%"
                    height="360"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    loading="lazy"
                    title="MATTI — I Freestyle Mixed Tech House"
                    src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fmatti-651038290%2Fi-freestyled-mixed-tech-house&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                  />
                </div>

                <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30 md:text-[10px]">
                      Transmission 04
                    </p>

                    <h4 className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white md:text-base">
                      MATTI — I FREESTYLE MIXED TECH HOUSE
                    </h4>
                  </div>

                  <a
                    href="https://soundcloud.com/matti-651038290/i-freestyled-mixed-tech-house"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 hover:text-white md:text-[10px]"
                  >
                    SoundCloud →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="mt-20 border-t border-white/10 pt-8 md:mt-28 md:pt-10">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/35 md:text-xs">
                Follow The Project
              </p>

              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 md:text-[10px]">
                N0 1IMITS
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {/* SoundCloud */}
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

                    <p className="mt-3 text-xs leading-5 text-white/45 transition-colors duration-300 group-hover:text-black/60">
                      Mixes, sets, and audio transmissions.
                    </p>
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>

              {/* Instagram */}
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

                    <p className="mt-3 text-xs leading-5 text-white/45 transition-colors duration-300 group-hover:text-black/60">
                      Flyers, visuals, and project updates.
                    </p>
                  </div>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>

              {/* TikTok */}
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

                    <p className="mt-3 text-xs leading-5 text-white/45 transition-colors duration-300 group-hover:text-black/60">
                      Clips, edits, and short-form sound.
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