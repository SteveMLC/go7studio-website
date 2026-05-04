import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  FileCode2,
  Gauge,
  GitBranch,
  KeyRound,
  Lightbulb,
  Link2Off,
  MailCheck,
  MessageSquareOff,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCheck,
  Workflow,
  XCircle,
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

const petraMetrics = [
  { label: "Dry-run window", value: "3 weeks", note: "Scheduled runs, zero public output" },
  { label: "Warmup ceiling", value: "3/day", note: "Comments only, no posts, no links" },
  { label: "Launch state", value: "Gated", note: "Capability unlocks one credential at a time" },
];

const petraGates = [
  { label: "Signup", before: false, after: true, icon: UserCheck },
  { label: "Email", before: false, after: true, icon: MailCheck },
  { label: "Profile", before: false, after: true, icon: ShieldCheck },
  { label: "Links", before: false, after: false, icon: Link2Off },
  { label: "Posts", before: false, after: false, icon: MessageSquareOff },
  { label: "Warmup", before: false, after: true, icon: Gauge },
];

function StatusChip({ value, label }: { value: boolean; label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        value
          ? "border-brand-teal/30 bg-brand-teal/12 text-brand-teal"
          : "border-white/12 bg-white/[0.04] text-white/45"
      }`}
    >
      {value ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label ?? (value ? "true" : "false")}
    </span>
  );
}

export function PetraSystemOverview() {
  return (
    <section className="my-10 overflow-hidden rounded-[30px] border border-brand-teal/20 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/25 bg-brand-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            <Bot className="h-3.5 w-3.5" />
            Petra control plane
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
            <span className="h-2 w-2 rounded-full bg-brand-teal shadow-[0_0_14px_rgba(45,212,191,0.8)]" />
            Live in warmup
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            The agent was not broken. It was waiting for the real world to catch up.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Petra could run safely before the Reddit account existed because every outbound behavior passed through explicit credential gates.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#060912]/80 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Gate state</div>
            <KeyRound className="h-4 w-4 text-brand-teal" />
          </div>
          <div className="space-y-3">
            {petraGates.map((gate) => {
              const Icon = gate.icon;
              return (
                <div key={gate.label} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                  <div className="flex min-w-0 items-center gap-2 text-sm text-white/78">
                    <Icon className="h-4 w-4 shrink-0 text-brand-teal" />
                    <span className="truncate">{gate.label}</span>
                  </div>
                  <StatusChip value={gate.after} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid gap-3 border-t border-white/10 p-5 sm:grid-cols-3 sm:p-6">
        {petraMetrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/18 p-4">
            <div className="text-3xl font-semibold text-white">{metric.value}</div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">{metric.label}</div>
            <div className="mt-2 text-xs leading-5 text-white/55">{metric.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PetraTimeline() {
  const phases = [
    {
      title: "Build complete",
      meta: "Architecture ready",
      accent: "border-sky-400/30 bg-sky-400/10 text-sky-200",
      items: ["poster.py gate function", "rate-limits.json warmup profile", "persona env template"],
    },
    {
      title: "Weeks 1-2",
      meta: "Dry-run only",
      accent: "border-white/15 bg-white/[0.04] text-white/70",
      items: ["Scheduled runs continue", "All outbound gates false", "Automated signup blocked by CAPTCHA"],
    },
    {
      title: "Week 3",
      meta: "Human repair",
      accent: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100",
      items: ["Manual verification completed", "Profile walk finished", "Warmup subreddits joined"],
    },
    {
      title: "Now",
      meta: "Warmup live",
      accent: "border-brand-teal/35 bg-brand-teal/12 text-brand-teal",
      items: ["Email verified", "One reviewed warmup action", "3 comments/day cap"],
    },
  ];

  return (
    <DiagramFrame title="Three weeks of dry-run, shown as an operator timeline" eyebrow="Launch sequence">
      <div className="relative grid gap-4 sm:grid-cols-2">
        {phases.map((phase, index) => (
          <div key={phase.title} className="relative rounded-2xl border border-white/10 bg-[#070b12]/86 p-4 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <span className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${phase.accent}`}>
                {phase.meta}
              </span>
            </div>
            <h3 className="mt-0 font-display text-lg font-semibold text-white">{phase.title}</h3>
            <ul className="mt-4 space-y-2">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2 text-xs leading-5 text-white/64">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function PetraReadinessPanel() {
  const limits = [
    ["comments_per_day", "3"],
    ["posts_per_day", "0"],
    ["links_per_day", "0"],
    ["max_subreddits/day", "2"],
  ];

  return (
    <section className="my-10 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(220px,0.7fr)]">
      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#060912] shadow-[0_18px_40px_rgba(0,0,0,0.32)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-brand-teal" />
            poster.py
          </div>
          <span className="text-white/35">Gate check</span>
        </div>
        <pre className="whitespace-pre-wrap break-words px-4 py-5 text-[11px] leading-6 text-white/82 sm:text-[12px]"><code>{`def check_brand_account_gates() -> GateState:
    return GateState(
        SIGNUP_COMPLETE=env_bool("SIGNUP_COMPLETE"),
        EMAIL_VERIFIED=env_bool("EMAIL_VERIFIED"),
        PROFILE_SETUP_COMPLETE=env_bool("PROFILE_SETUP_COMPLETE"),
        LINK_SHARING_APPROVED=env_bool("LINK_SHARING_APPROVED"),
        POSTING_APPROVED=env_bool("POSTING_APPROVED"),
        INTERNAL_ONLY=env_bool("INTERNAL_ONLY"),
        PHASE=env_str("PHASE"),
    )`}</code></pre>
      </div>

      <div className="rounded-[26px] border border-brand-teal/20 bg-brand-teal/8 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Warmup envelope</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">Allowed output stays tiny</h3>
          </div>
          <Gauge className="h-5 w-5 text-brand-teal" />
        </div>
        <div className="space-y-3">
          {limits.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
              <span className="font-mono text-[12px] text-white/62">{label}</span>
              <span className="text-lg font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PetraProfileWalk() {
  const groups = [
    {
      title: "Identity",
      icon: UserCheck,
      items: ["Display name set", "About text matches brand voice", "Canonical brand URL attached"],
    },
    {
      title: "Context",
      icon: Network,
      items: ["7 warmup subreddits joined", "Initial account state captured", "1 karma, 0 contributions, 0d account age"],
    },
    {
      title: "Gates flipped",
      icon: ShieldCheck,
      items: ["SIGNUP_COMPLETE=true", "PROFILE_SETUP=true", "EMAIL_VERIFIED=true", "PHASE=warmup"],
    },
  ];

  return (
    <section className="my-10 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Manual repair checklist</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">Human verification, agent discipline</h3>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-3">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-[#070b12]/82 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-teal/12 ring-1 ring-brand-teal/25">
                  <Icon className="h-4 w-4 text-brand-teal" />
                </div>
                <h4 className="font-display text-lg font-semibold text-white">{group.title}</h4>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 break-words text-sm leading-5 text-white/68">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PetraGateMatrix() {
  const rows = [
    ["SIGNUP_COMPLETE", false, true, "Account-aware logging"],
    ["EMAIL_VERIFIED", false, true, "First warmup comment eligible"],
    ["PROFILE_SETUP_COMPLETE", false, true, "Profile-aware draft generation"],
    ["LINK_SHARING_APPROVED", false, false, "Link sharing remains gated"],
    ["POSTING_APPROVED", false, false, "Posting remains gated"],
    ["INTERNAL_ONLY", true, false, "Outbound action allowed"],
    ["PHASE", false, true, "Warmup-tier rate limits apply"],
  ] as const;

  return (
    <section className="my-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#070b12]/86 shadow-[0_18px_42px_rgba(0,0,0,0.28)]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Gate transition matrix</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white">Capability unlocks one gate at a time</h3>
          </div>
          <Workflow className="h-5 w-5 text-brand-teal" />
        </div>
      </div>
      <div className="divide-y divide-white/10">
        {rows.map(([gate, before, after, action]) => (
          <div key={gate} className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[minmax(160px,1.1fr)_100px_100px_minmax(0,1.5fr)] md:items-center">
            <div className="font-mono text-[12px] text-white/80">{gate}</div>
            <div className="flex items-center gap-2">
              <span className="md:hidden text-xs uppercase tracking-[0.14em] text-white/35">Before</span>
              <StatusChip value={before} label={gate === "PHASE" ? "unset" : undefined} />
            </div>
            <div className="flex items-center gap-2">
              <span className="md:hidden text-xs uppercase tracking-[0.14em] text-white/35">After</span>
              <StatusChip value={after} label={gate === "PHASE" ? "warmup" : undefined} />
            </div>
            <div className="text-white/65">{action}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PetraSequencingProtocol() {
  const steps = [
    { title: "Destination", body: "Name the account, page, or channel before agent work starts." },
    { title: "Credential surface", body: "Create the profile, verify email, document the gate file." },
    { title: "Routing layer", body: "Wire approved output to a real surface with review and rate limits." },
    { title: "Agent", body: "Build the worker last, with every output path passing through gates." },
  ];

  return (
    <section className="my-10 overflow-hidden rounded-[28px] border border-brand-teal/20 bg-[linear-gradient(135deg,rgba(45,212,191,0.11),rgba(59,130,246,0.06)_45%,rgba(255,255,255,0.025))] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-teal/15 ring-1 ring-brand-teal/25">
          <Workflow className="h-5 w-5 text-brand-teal" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Correct build order</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-white">The sequencing rule as a protocol</h3>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-2xl border border-white/10 bg-black/18 p-4">
            {index % 2 === 0 ? (
              <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-teal/60 sm:block" />
            ) : null}
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-brand-teal/30 bg-brand-teal/15 text-sm font-bold text-brand-teal">
              {index + 1}
            </div>
            <h4 className="font-display text-lg font-semibold text-white">{step.title}</h4>
            <p className="mt-2 text-xs leading-5 text-white/62">{step.body}</p>
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
  PetraSystemOverview,
  PetraTimeline,
  PetraReadinessPanel,
  PetraProfileWalk,
  PetraGateMatrix,
  PetraSequencingProtocol,
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
