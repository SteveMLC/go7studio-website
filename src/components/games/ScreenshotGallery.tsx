"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export type ScreenshotItem = {
  src: string;
  alt?: string;
};
type ScreenshotSource = string | ScreenshotItem;

type ScreenshotGalleryProps = {
  screenshots: ScreenshotSource[];
  title?: string;
};

export function ScreenshotGallery({
  screenshots,
  title = "Screenshots",
}: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = screenshots.map((shot) =>
    typeof shot === "string" ? { src: shot } : shot,
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  if (!items.length) return null;

  return (
    <section className="glass-card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-brand-teal/20 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-52 w-52 rounded-full bg-brand-sky/20 blur-3xl" />
      </div>

      <h2 className="relative mb-4 text-lg font-semibold text-white">{title}</h2>

      <div className="relative -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 md:hidden">
        {items.map((shot, index) => (
          <motion.button
            key={`${shot.src}-${index}`}
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveIndex(index)}
            className="group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-xl ring-1 ring-white/10"
          >
            <Image
              src={shot.src}
              alt={shot.alt ?? `Game screenshot ${index + 1}`}
              width={1280}
              height={720}
              loading="lazy"
              sizes="(max-width: 768px) 82vw, 33vw"
              className="aspect-video h-auto w-full object-cover transition duration-300 group-active:scale-[1.02]"
            />
          </motion.button>
        ))}
      </div>

      <div className="relative hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {items.map((shot, index) => (
          <motion.button
            key={`${shot.src}-${index}`}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-[0_10px_30px_rgba(56,189,248,0.12)] transition-shadow hover:shadow-[0_16px_40px_rgba(45,212,191,0.22)]"
          >
            <Image
              src={shot.src}
              alt={shot.alt ?? `Game screenshot ${index + 1}`}
              width={1280}
              height={720}
              loading="lazy"
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="aspect-video h-auto w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl ring-1 ring-white/15"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={items[activeIndex].src}
                alt={
                  items[activeIndex].alt ??
                  `Game screenshot ${activeIndex + 1}`
                }
                width={1920}
                height={1080}
                loading="lazy"
                sizes="100vw"
                className="h-auto w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-black/80"
                aria-label="Close screenshot preview"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
