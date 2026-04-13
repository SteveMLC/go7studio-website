import { Sparkles } from "lucide-react";
import type { ProjectHighlight } from "@/lib/content";

export function ProjectHighlights({ highlights }: { highlights?: ProjectHighlight[] }) {
  if (!highlights?.length) return null;

  return (
    <section className="mt-10">
      <div className="mb-5 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.22em] text-white/45">Highlights</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Product decisions people can feel</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="glass-card p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{highlight.title}</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">{highlight.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
