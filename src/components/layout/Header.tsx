"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/55 backdrop-blur-xl">
      <div className="container-px flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/branding/go7studio-logo-square.png"
            alt="Go7Studio Logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            Go7Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <a
            href="#"
            className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/15 sm:inline-flex"
          >
            Discord
          </a>
          <Link href="/games" className="btn-primary inline-flex items-center">
            Play
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
