import Link from "next/link";
import { Github, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  { href: "/games", label: "Games" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container-px grid gap-6 py-10 sm:grid-cols-2 sm:items-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Go7Studio</p>
          <p className="text-sm text-white/60">
            [Short studio tagline goes here]
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Go7Studio. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
              href="#"
              aria-label="X / Twitter"
            >
              <Twitter className="h-4 w-4 text-white/80" />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
              href="#"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4 text-white/80" />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
              href="#"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-white/80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
