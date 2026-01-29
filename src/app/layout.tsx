import "./globals.css";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "N0 1IMITS",
  description: "Music, tools, data, and creative work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-white text-black`}>
        {/* Header / Nav */}
        <header className="border-b border-neutral-200">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              N0 1IMITS
            </Link>

            <div className="flex gap-6 text-sm">
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/tools" className="hover:underline">
                Tools
              </Link>
              <Link href="/media" className="hover:underline">
                Media
              </Link>
              <Link href="/drops" className="hover:underline">
                Drops
              </Link>
            </div>
          </nav>
        </header>

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-600 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} N0 1IMITS</p>

            <div className="flex gap-5">
              <a
                className="hover:underline"
                href="https://soundcloud.com/matti-651038290"
                target="_blank"
                rel="noreferrer"
              >
                SoundCloud
              </a>
              <a
                className="hover:underline"
                href="https://tiktok.com/@itsmattiiii"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
              <a
                className="hover:underline"
                href="https://www.instagram.com/itsmattias/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
