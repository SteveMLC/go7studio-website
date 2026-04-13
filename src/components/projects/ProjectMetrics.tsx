import type { ProjectMetric } from "@/lib/content";

export function ProjectMetrics({ metrics, className }: { metrics?: ProjectMetric[]; className?: string }) {
  if (!metrics?.length) return null;

  return (
    <section className={className ?? "mt-10"}>
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Proof-safe framing</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">What this project proves</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">{metric.label}</p>
              <p className="mt-3 text-lg font-semibold text-white">{metric.value}</p>
              {metric.note ? <p className="mt-3 text-sm leading-6 text-white/60">{metric.note}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
