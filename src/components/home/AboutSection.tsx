import { Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="glass-card grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/70">
            <Sparkles className="h-4 w-4 text-primary" />
            [About Go7Studio]
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            [About headline goes here]
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            [Brief studio story goes here. Mention focus on fun gameplay loops,
            polished UX, and community-driven updates.]
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">[Value prop #1]</p>
            <p className="mt-1 text-sm text-white/60">[Details go here]</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">[Value prop #2]</p>
            <p className="mt-1 text-sm text-white/60">[Details go here]</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">[Value prop #3]</p>
            <p className="mt-1 text-sm text-white/60">[Details go here]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
