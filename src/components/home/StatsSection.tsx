import { Users, Download, Star } from "lucide-react";

const stats = [
  {
    label: "[Players]",
    value: "[123K]",
    icon: Users,
  },
  {
    label: "[Downloads]",
    value: "[1.2M]",
    icon: Download,
  },
  {
    label: "[Average rating]",
    value: "[4.8]",
    icon: Star,
  },
];

export function StatsSection() {
  return (
    <section className="container-px pb-20">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/60">{s.label}</p>
                <p className="text-2xl font-semibold text-white">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
