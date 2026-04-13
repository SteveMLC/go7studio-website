export function ProjectTechStack({ stack, className }: { stack?: string[]; className?: string }) {
  if (!stack?.length) return null;

  return (
    <section className={className ?? "mt-10"}>
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-5 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Build notes</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Systems behind the experience</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {stack.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
