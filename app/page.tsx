"use client";

import Image from "next/image";
import { useState } from "react";

type SocialPlatform = "soundcloud" | "instagram" | "tiktok" | "youtube";

type FamilyMember = {
  name: string;
  location?: string;
  origins: { country: string; code: "AR" }[];
  favoriteGenre: string;
  bio: string;
  image?: string;
  links: Partial<Record<SocialPlatform, string>>;
};

const familyMembers: FamilyMember[] = [
  {
    name: "MATTI",
    location: "Orlando, FL",
    origins: [{ country: "Argentina", code: "AR" }],
    favoriteGenre: "Brazilian Funk, Trance & Jersey Club",
    bio: "MATTI is an Orlando-based open-format EDM DJ and the founder of N0 1IMITS. With Argentine roots and a wide-ranging taste in electronic music, he builds his sets around energy and instinct instead of staying tied to one sound. Through N0 1IMITS, he is creating events, sharing new music, and building a community for the people who love it.",
    image: "/matti.JPG",
    links: {
      soundcloud: "https://soundcloud.com/matti-651038290",
      instagram: "https://www.instagram.com/itsmattias/",
      tiktok: "https://www.tiktok.com/@itsmattiiii",
      youtube: "https://www.youtube.com/@itsmattiiii",
    },
  },
];

const socialPlatforms: { key: SocialPlatform; label: string }[] = [
  { key: "soundcloud", label: "SoundCloud" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.4" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M15.5 3c.3 2.4 1.7 3.9 4.1 4.1v3.1a8.2 8.2 0 0 1-4.1-1.3v6.2a5.9 5.9 0 1 1-5-5.8v3.2a2.8 2.8 0 1 0 1.9 2.6V3h3.1Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M1.5 14.3h1v4h-1v-4Zm2-2h1v6h-1v-6Zm2-1.7h1v7.7h-1v-7.7Zm2-1h1v8.7h-1V9.6Zm2.2 1.4h1v7.3h-1V11Zm2.1-2.3a5.6 5.6 0 0 1 5.4 4.3 3.6 3.6 0 1 1 .8 7.1h-6.2V8.7Z"
      />
    </svg>
  );
}

function CountryFlag({ code }: { code: "AR" }) {
  if (code === "AR") {
    return (
      <svg
        viewBox="0 0 60 40"
        aria-hidden="true"
        className="h-full w-full"
      >
        <rect width="60" height="40" fill="#ffffff" />
        <rect width="60" height="13.34" fill="#74ACDF" />
        <rect y="26.66" width="60" height="13.34" fill="#74ACDF" />
        <g transform="translate(30 20)" fill="#F6B40E" stroke="#85340A">
          <circle r="3.4" strokeWidth="0.45" />
          {Array.from({ length: 12 }).map((_, index) => (
            <path
              key={index}
              d="M0-4.3 0.75-7.2 0-6.2-0.75-7.2Z"
              strokeWidth="0.2"
              transform={`rotate(${index * 30})`}
            />
          ))}
        </g>
      </svg>
    );
  }

  return null;
}

export default function Home() {
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0);
  const [familyDirection, setFamilyDirection] = useState<"next" | "previous">(
    "next",
  );
  const [familyAnimation, setFamilyAnimation] = useState<
    "idle" | "exit" | "enter"
  >("idle");

  const activeFamilyMember = familyMembers[activeFamilyIndex]!;
  const familyDoorAnimationClass =
    familyAnimation === "idle"
      ? ""
      : `family-door-${familyAnimation}-${familyDirection}`;

  const rotateFamily = (direction: "next" | "previous") => {
    if (familyAnimation !== "idle") return;

    setFamilyDirection(direction);
    setFamilyAnimation("exit");

    window.setTimeout(() => {
      setActiveFamilyIndex((currentIndex) => {
        const change = direction === "next" ? 1 : -1;
        return (
          (currentIndex + change + familyMembers.length) % familyMembers.length
        );
      });
      setFamilyAnimation("enter");

      window.setTimeout(() => setFamilyAnimation("idle"), 620);
    }, 360);
  };

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
        className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:px-10 md:py-28"
      >
        {/* Atmospheric Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="pointer-events-none absolute top-0 left-[14%] h-full w-px bg-white/[0.04]" />
        <div className="pointer-events-none absolute top-0 right-[14%] h-full w-px bg-white/[0.04]" />

        {/* About Header */}
        <h2 className="absolute top-8 left-8 z-20 font-semibold uppercase tracking-[0.35em] text-2xl md:top-10 md:left-10 md:text-4xl">
          About
        </h2>

        <div className="absolute top-9 right-8 z-20 hidden items-center gap-8 md:top-12 md:right-10 md:flex">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
            Orlando, FL
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
            Since 2026
          </p>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Motto + Project Introduction */}
          <div className="relative grid gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-[1.22fr_0.78fr] lg:items-end lg:gap-20 lg:pt-20 lg:pb-24">
            <span className="pointer-events-none absolute -top-2 right-0 select-none text-[30vw] font-black leading-none tracking-[-0.12em] text-white/[0.025] md:text-[20vw]">
              01
            </span>

            <div className="relative">
              <h3 className="max-w-4xl text-[clamp(2.65rem,5.6vw,5.7rem)] font-medium leading-[0.98] tracking-[-0.055em] text-white">
                For the love of music, the people it brings together &amp;
                wherever it takes us.
              </h3>

              <div className="mt-9 flex items-center gap-4 md:mt-12">
                <div className="h-px w-16 bg-white/40 md:w-24" />
                <Image
                  src="/logo-symbol-white.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-auto w-7 opacity-70 md:w-8"
                />
              </div>
            </div>

            <div className="relative border-l border-white/15 pl-6 md:pl-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white md:text-xs">
                The project
              </p>

              <p className="mt-5 text-xl font-medium leading-snug tracking-[-0.025em] text-white md:text-2xl">
                N0 1IMITS is an independent music community built around the
                moments that sound creates.
              </p>

              <p className="mt-6 text-sm leading-7 text-white md:text-base md:leading-8">
                Started in Orlando in 2026, the project lives through DJ sets,
                live experiences, broadcasts, creative work, and the people
                who continue to shape it. Different sounds, backgrounds, and
                ideas meet here without boundaries.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white md:text-[10px]">
                  Sound
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white md:text-[10px]">
                  Culture
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white md:text-[10px]">
                  Community
                </span>
              </div>
            </div>
          </div>

          {/* N0 1IMITS Family */}
          <div className="border-t border-white/15 pt-12 md:pt-16">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-14">
              <div>
                <h3 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl md:text-7xl">
                  N0 1IMITS Family
                </h3>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-[10px] font-semibold tracking-[0.35em] text-white">
                  {String(activeFamilyIndex + 1).padStart(2, "0")} /{" "}
                  {String(familyMembers.length).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => rotateFamily("previous")}
                    disabled={familyAnimation !== "idle"}
                    aria-label="Previous N0 1IMITS family member"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition duration-300 hover:border-white hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                    >
                      <path
                        d="m14.5 5-7 7 7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => rotateFamily("next")}
                    disabled={familyAnimation !== "idle"}
                    aria-label="Next N0 1IMITS family member"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition duration-300 hover:border-white hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="m9.5 5 7 7-7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
              {/* Rotating Door Portrait */}
              <div className="relative mx-auto w-full max-w-xl px-4 py-6 [perspective:1600px] lg:mx-0">
                <div className="pointer-events-none absolute top-12 bottom-12 left-0 w-[92%] border border-white/[0.07] bg-white/[0.015] [transform:rotateY(10deg)_translateX(-2%)]" />
                <div className="pointer-events-none absolute top-9 right-0 bottom-9 w-[92%] border border-white/[0.06] bg-white/[0.01] [transform:rotateY(-9deg)_translateX(2%)]" />

                <div
                  key={`${activeFamilyIndex}-${familyAnimation}-${familyDirection}`}
                  className={`family-door relative aspect-[3/4] overflow-hidden border border-white/20 bg-[#080808] shadow-[0_35px_100px_rgba(0,0,0,0.55)] ${familyDoorAnimationClass}`}
                >
                  {activeFamilyMember.image ? (
                    <Image
                      src={activeFamilyMember.image}
                      alt={`${activeFamilyMember.name} performing`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      className="family-floating-photo object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-9xl font-medium tracking-[-0.08em] text-white/[0.08]">
                        {activeFamilyMember.name.slice(0, 2)}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                </div>
              </div>

              {/* Member Information */}
              <div className="relative">
                <h4 className="text-[clamp(4.5rem,10vw,9.5rem)] font-medium leading-[0.76] tracking-[-0.075em] text-white">
                  {activeFamilyMember.name}
                </h4>

                <div className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-3 md:mt-14">
                  <div className="min-h-28 bg-black p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white">
                      From
                    </p>
                    <p className="mt-4 text-base font-medium text-white md:text-lg">
                      {activeFamilyMember.location}
                    </p>
                  </div>

                  <div className="flex min-h-28 items-center justify-center bg-black p-5">
                    <div className="flex items-center gap-3">
                      {activeFamilyMember.origins.map((origin, index) => (
                        <span
                          key={origin.country}
                          title={origin.country}
                          aria-label={origin.country}
                          className="family-origin-flag inline-flex h-9 w-14 overflow-hidden rounded-sm border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                          style={{ animationDelay: `${index * 0.6}s` }}
                        >
                          <CountryFlag code={origin.code} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="min-h-28 bg-black p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white">
                      Favorite genre
                    </p>
                    <p className="mt-4 text-sm font-medium leading-5 text-white">
                      {activeFamilyMember.favoriteGenre}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/15 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white">
                    About
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white md:text-base md:leading-8">
                    {activeFamilyMember.bio}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-7">
                  {socialPlatforms.map((platform) => {
                    const url = activeFamilyMember.links[platform.key];

                    return url ? (
                      <a
                        key={platform.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${activeFamilyMember.name} on ${platform.label}`}
                        title={platform.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
                      >
                        <SocialIcon platform={platform.key} />
                      </a>
                    ) : (
                      <span
                        key={platform.key}
                        aria-label={`${platform.label} link coming soon`}
                        title={`${platform.label} link coming soon`}
                        className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-white/20"
                      >
                        <SocialIcon platform={platform.key} />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .family-door {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            transform-origin: center left;
          }

          .family-door-exit-next {
            animation: family-door-exit-next 360ms cubic-bezier(0.55, 0, 1, 0.45)
              forwards;
          }

          .family-door-exit-previous {
            transform-origin: center right;
            animation: family-door-exit-previous 360ms
              cubic-bezier(0.55, 0, 1, 0.45) forwards;
          }

          .family-door-enter-next {
            animation: family-door-enter-next 620ms
              cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          .family-door-enter-previous {
            transform-origin: center right;
            animation: family-door-enter-previous 620ms
              cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          .family-floating-photo {
            animation: family-photo-float 8s ease-in-out infinite;
          }

          .family-origin-flag {
            display: inline-block;
            animation: family-flag-float 4.5s ease-in-out infinite;
            filter: grayscale(0.15);
          }

          @keyframes family-door-exit-next {
            from {
              opacity: 1;
              transform: rotateY(0deg) translateX(0);
            }
            to {
              opacity: 0;
              transform: rotateY(72deg) translateX(10%);
            }
          }

          @keyframes family-door-exit-previous {
            from {
              opacity: 1;
              transform: rotateY(0deg) translateX(0);
            }
            to {
              opacity: 0;
              transform: rotateY(-72deg) translateX(-10%);
            }
          }

          @keyframes family-door-enter-next {
            from {
              opacity: 0;
              transform: rotateY(-72deg) translateX(-10%);
            }
            to {
              opacity: 1;
              transform: rotateY(0deg) translateX(0);
            }
          }

          @keyframes family-door-enter-previous {
            from {
              opacity: 0;
              transform: rotateY(72deg) translateX(10%);
            }
            to {
              opacity: 1;
              transform: rotateY(0deg) translateX(0);
            }
          }

          @keyframes family-photo-float {
            0%,
            100% {
              transform: scale(1.025) translate3d(0, 0, 0);
            }
            50% {
              transform: scale(1.055) translate3d(-0.75%, -0.8%, 0);
            }
          }

          @keyframes family-flag-float {
            0%,
            100% {
              transform: translateY(0) rotate(-1deg);
            }
            50% {
              transform: translateY(-4px) rotate(2deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .family-door-exit-next,
            .family-door-exit-previous,
            .family-door-enter-next,
            .family-door-enter-previous,
            .family-floating-photo,
            .family-origin-flag {
              animation: none;
            }
          }
        `}</style>
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
