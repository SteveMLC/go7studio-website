export function TableOfContents({ items }: { items: { id: string; text: string; level: number }[] }) {
  if (!items.length) return null;

  return (
    <aside className="glass-card p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-teal">On this page</h3>
      <ul className="space-y-2 text-sm text-white/70">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a href={`#${item.id}`} className="hover:text-white">{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
