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
              <a href="mailto:hello@go7studio.com" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Discord
              </a>
            </li>
          </ul>

          <div className="pt-2">
            <p className="text-sm font-semibold text-white">Social</p>
            <div className="mt-3 flex items-center gap-3">
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
