import type { Project } from "@/lib/content";

export function ProjectProofPoints({ proofPoints, className }: { proofPoints?: Project["proofPoints"]; className?: string }) {
  if (!proofPoints?.length) return null;

  return (
    <section className={className}>
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Proof-safe bullets</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">What we can say clearly</h2>
        </div>

        <ul className="space-y-3 text-sm leading-7 text-white/72">
          {proofPoints.map((point) => (
            <li key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
