import {
  Download,
  Star,
  Timer,
  Layers,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

const stats: Array<{ label: string; value: string; icon: LucideIcon }> = [
  { label: "Total Downloads", value: "50K+", icon: Download },
  { label: "Average Rating", value: "4.6★", icon: Star },
  { label: "Total Sessions Played", value: "1M+", icon: Gamepad2 },
  { label: "Worlds in Development", value: "3", icon: Layers },
  { label: "Weekly Updates", value: "Active", icon: Timer },
];

export function StatsSection() {
  return (
    <section className="container-px pb-20">
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card p-6 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <s.icon className="h-5 w-5 text-brand-cyan" />
              </div>
              <div>
                <p className="text-sm text-white/70">{s.label}</p>
                <p className="font-mono text-2xl font-semibold text-white">
                  {s.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
