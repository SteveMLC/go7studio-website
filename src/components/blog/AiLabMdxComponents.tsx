import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileCode2,
  GitBranch,
  Lightbulb,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";

type TakeawayItem = { title: string; body: string };
type ChecklistItem = string | { label: string; note?: string };
type MatrixRow = { label: string; values: string[]; note?: string };
type TimelineStep = { title: string; body: string; meta?: string };
type ComparisonCard = {
  title: string;
  bestFor: string;
  strengths: string[];
  cautions?: string[];
};

type Tone = "insight" | "caution" | "field-note" | "current";

const toneStyles: Record<
  Tone,
  { icon: React.ComponentType<{ className?: string }>; label: string; className: string }
> = {
  insight: {
    icon: Lightbulb,
    label: "Insight",
    className: "border-brand-teal/30 bg-brand-teal/10 text-white/85",
  },
  caution: {
    icon: AlertTriangle,
    label: "Caution",
    className: "border-brand-orange/30 bg-brand-orange/10 text-white/85",
  },
  "field-note": {
    icon: ShieldAlert,
    label: "Field note",
    className: "border-fuchsia-400/30 bg-fuchsia-400/10 text-white/85",
  },
  current: {
    icon: Clock3,
    label: "Current as of",
    className: "border-sky-400/30 bg-sky-400/10 text-white/85",
  },
};

function parseJsonProp<T>(value: T | string | undefined | null): T {
  if (value == null) return [] as T;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return [] as T;
  }
}

export function HeroCallout({
  eyebrow = "Thesis",
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative my-10 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.14),transparent_38%),rgba(255,255,255,0.04)] p-6 sm:p-8">
      <div className="absolute -right-16 top-0 h-36 w-36 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h2 className="max-w-3xl font-display text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}

export function CalloutBox({
  tone = "insight",
  title,
  children,
}: {
  tone?: Tone;
  title: string;
  children: React.ReactNode;
}) {
  const toneMeta = toneStyles[tone];
  const Icon = toneMeta.icon;
  return (
    <aside className={`my-8 rounded-3xl border p-5 sm:p-6 ${toneMeta.className}`}>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
        <Icon className="h-4 w-4" />
        {toneMeta.label}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold text-white">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-7 text-white/75">{children}</div>
    </aside>
  );
}

export function KeyTakeaways({
  title = "Key takeaways",
  items,
}: {
  title?: string;
  items?: TakeawayItem[] | string;
}) {
  const parsedItems = parseJsonProp<TakeawayItem[]>(items);
  return (
    <section className="my-10">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-teal/15 ring-1 ring-brand-teal/20">
          <CheckCircle2 className="h-5 w-5 text-brand-teal" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {parsedItems.map((item) => (
          <article key={item.title} className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DecisionMatrix({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[] | string;
  rows: MatrixRow[] | string;
}) {
  const parsedColumns = parseJsonProp<string[]>(columns);
  const parsedRows = parseJsonProp<MatrixRow[]>(rows);
  return (
    <section className="my-10">
      <h2 className="mb-5 font-display text-2xl font-semibold text-white">{title}</h2>
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.24)]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-white/80">
            <thead className="bg-white/[0.04]">
              <tr>
                {parsedColumns.map((column) => (
                  <th key={column} className="px-4 py-4 font-semibold text-white/90 first:w-[220px]">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedRows.map((row) => (
                <tr key={row.label} className="border-t border-white/10 align-top">
                  <th className="px-4 py-4 font-semibold text-white">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={`${row.label}-${index}`} className="px-4 py-4 leading-7 text-white/70">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ToolComparisonGrid({
  title,
  items,
}: {
  title: string;
  items: ComparisonCard[] | string;
}) {
  const parsedItems = parseJsonProp<ComparisonCard[]>(items);
  return (
    <section className="my-10">
      <h2 className="mb-5 font-display text-2xl font-semibold text-white">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {parsedItems.map((item) => (
          <article key={item.title} className="glass-card p-6 transition hover:border-brand-teal/30">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              <GitBranch className="h-3.5 w-3.5" />
              {item.bestFor}
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Strengths</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
                  {item.strengths.map((strength) => (
                    <li key={strength} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Watch for</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
                  {(item.cautions?.length
                    ? item.cautions
                    : ["Best fit depends on task shape, controls, and workflow design."]
                  ).map((caution) => (
                    <li key={caution} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                      {caution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ChecklistBlock({
  title,
  items,
}: {
  title: string;
  items: ChecklistItem[] | string;
}) {
  const parsedItems = parseJsonProp<ChecklistItem[]>(items);
  return (
    <section className="my-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-5 space-y-3">
        {parsedItems.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const note = typeof item === "string" ? undefined : item.note;
          return (
            <li key={label} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/75">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <div>
                <div>{label}</div>
                {note ? <div className="mt-1 text-xs text-white/45">{note}</div> : null}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function TimelineSteps({
  title,
  steps,
}: {
  title: string;
  steps: TimelineStep[] | string;
}) {
  const parsedSteps = parseJsonProp<TimelineStep[]>(steps);
  return (
    <section className="my-6">
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-4">
        {parsedSteps.map((step, index) => (
          <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-sm font-semibold text-brand-teal ring-1 ring-brand-teal/20">
              {index + 1}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-display text-lg font-semibold text-white">{step.title}</h4>
                {step.meta ? <span className="chip text-[11px] text-white/70">{step.meta}</span> : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/70">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AiLabSubscribePanel({
  title = "Get the next AI Lab post",
  body = "One post every couple of weeks from a one-person studio working through real agent design, routing, and production systems.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="my-12 overflow-hidden rounded-[28px] border border-brand-teal/25 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">AI Lab</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/68">{body}</p>
        </div>
        <Link
          href="/ai-lab"
          className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#2DD4BF_0%,#38BDF8_100%)] px-5 py-3 text-sm font-semibold text-[#061016] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(45,212,191,0.25)]"
        >
          Subscribe to AI Lab
        </Link>
      </div>
    </section>
  );
}

export function DiagramFrame({
  title,
  eyebrow = "System visual",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-10 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  const className = String(props.className || "");
  if (className.includes("language-")) {
    return <code {...props} className={`block font-mono text-sm text-white/85 ${className}`.trim()} />;
  }
  return <code {...props} className={`rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.92em] text-brand-teal ${className}`.trim()} />;
}

function extractTextFromChildren(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromChildren).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractTextFromChildren(node.props.children);
  }
  return "";
}

function slugifyHeading(node: React.ReactNode): string {
  return extractTextFromChildren(node)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, id, ...rest } = props;
  return (
    <h2
      {...rest}
      id={id ?? slugifyHeading(props.children)}
      className={`mt-10 scroll-mt-24 font-display text-3xl font-semibold text-white ${className ?? ""}`.trim()}
    />
  );
}

function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, id, ...rest } = props;
  return (
    <h3
      {...rest}
      id={id ?? slugifyHeading(props.children)}
      className={`mt-8 scroll-mt-24 font-display text-2xl font-semibold text-white ${className ?? ""}`.trim()}
    />
  );
}

function PremiumPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const child = React.Children.toArray(props.children)[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
  const className = child?.props?.className || "";
  const language = className.replace("language-", "") || "code";

  if (language === "mermaid") {
    const chart = extractTextFromChildren(child?.props?.children).trim();
    return <MermaidDiagram chart={chart} />;
  }

  return (
    <div className="my-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#060912] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-brand-teal" />
          <span>{language}</span>
        </div>
        <span className="text-white/35">AI Lab</span>
      </div>
      <pre {...props} className="overflow-x-auto px-4 py-5 text-sm leading-7 text-white/85" />
    </div>
  );
}

function StyledTable(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
      <div className="overflow-x-auto">
        <table {...props} className={`min-w-full border-collapse text-left text-sm text-white/80 ${props.className ?? ""}`.trim()} />
      </div>
    </div>
  );
}

function StyledTh(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} className={`px-4 py-3 font-semibold text-white/90 ${props.className ?? ""}`.trim()} />;
}

function StyledTd(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={`px-4 py-3 align-top leading-7 text-white/70 ${props.className ?? ""}`.trim()} />;
}

function StyledImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className={`my-8 w-full rounded-[24px] border border-white/10 bg-[#060912] shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${props.className ?? ""}`.trim()}
      loading={props.loading ?? "lazy"}
    />
  );
}

export const aiLabMdxComponents = {
  HeroCallout,
  KeyTakeaways,
  DecisionMatrix,
  ChecklistBlock,
  DiagramFrame,
  TimelineSteps,
  CalloutBox,
  ToolComparisonGrid,
  AiLabSubscribePanel,
  Link,
  h2: H2,
  h3: H3,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mt-4 text-base leading-8 text-white/80" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-white/80" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="font-medium text-brand-teal underline decoration-brand-teal/40 underline-offset-4 hover:text-white" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => <blockquote className="my-8 rounded-[24px] border border-brand-teal/20 bg-brand-teal/10 px-5 py-5 text-base leading-8 text-white/80" {...props} />,
  code: InlineCode,
  pre: PremiumPre,
  table: StyledTable,
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} className="bg-white/[0.04]" />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} className="divide-y divide-white/10" />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} className="border-t border-white/10 align-top" />,
  th: StyledTh,
  td: StyledTd,
  img: StyledImg,
};
