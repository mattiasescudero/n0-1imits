import Script from "next/script";

export default function MediaPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Load TikTok embed script once */}
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      <h1 className="text-3xl font-semibold">Media</h1>
      <p className="mt-3 text-neutral-600">
        Music, clips, and visuals. More coming as things drop.
      </p>

      {/* Profiles */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Profiles</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="https://soundcloud.com/matti-651038290"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 transition"
          >
            SoundCloud →
          </a>
          <a
            href="https://www.instagram.com/itsmattias/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 transition"
          >
            Instagram →
          </a>
          <a
            href="https://tiktok.com/@itsmattiiii"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 transition"
          >
            TikTok →
          </a>
        </div>
      </section>

      {/* SoundCloud */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Featured Audio</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2234884286&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
        </div>
      </section>

      {/* TikTok Clips */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Clips</h2>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {/* TikTok 1 */}
          <div className="rounded-xl border border-neutral-200 p-4 overflow-hidden flex justify-center">
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@itsmattiiii/video/7598802673873210679"
              data-video-id="7598802673873210679"
              style={{ maxWidth: "605px", minWidth: "325px" }}
            >
              <section>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@itsmattiiii?refer=embed"
                  rel="noreferrer"
                >
                  @itsmattiiii
                </a>{" "}
                Aperture – Harry Styles x Timeless – The Weeknd
              </section>
            </blockquote>
          </div>

          {/* TikTok 2 */}
          <div className="rounded-xl border border-neutral-200 p-4 overflow-hidden flex justify-center">
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@itsmattiiii/video/7592039002484641055"
              data-video-id="7592039002484641055"
              style={{ maxWidth: "605px", minWidth: "325px" }}
            >
              <section>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@itsmattiiii?refer=embed"
                  rel="noreferrer"
                >
                  @itsmattiiii
                </a>{" "}
                Mimosa 2000 (Pallace Remix) x São Paulo (DENRO x ENEL Remix)
              </section>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
