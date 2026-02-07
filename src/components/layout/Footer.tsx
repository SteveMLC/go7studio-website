import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050510]">
      <div className="container-px grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/branding/go7studio-logo-square.png"
              alt="Go7Studio Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <p className="font-display text-sm font-semibold text-white">Go7Studio</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/70">
            We build fun-first games with satisfying progression, delightful
            polish, and replayable worlds that players love to return to.
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Go7Studio. All rights reserved.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Games</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/games/empire-tycoon" className="hover:text-white">
                Empire Tycoon
              </Link>
            </li>
            <li>
              <Link href="/games/slimeslip" className="hover:text-white">
                SlimeSlip: Don’t Die!
              </Link>
            </li>
            <li>
              <Link href="/games/pet-paradise" className="hover:text-white">
                Pet Paradise
              </Link>
            </li>
            <li>
              <Link href="/games" className="hover:text-white">
                View all
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Studio</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/#about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a href="https://discord.gg/pRCD6apa" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Discord
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <p className="text-sm font-semibold text-white">Social</p>
            <div className="mt-3 flex items-center gap-3">
              <a
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                href="https://discord.gg/pRCD6apa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                href="https://x.com/Steve_mlc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <Twitter className="h-4 w-4 text-white/80" />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                href="https://www.youtube.com/@Go7Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-white/80" />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                href="https://github.com/SteveMLC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-white/80" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Built with love (and a little chaos).</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
