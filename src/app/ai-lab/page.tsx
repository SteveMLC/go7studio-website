import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/content";
import {
  ArrowRight,
  Bot,
  FileStack,
  GitBranch,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const liveAiLabPosts = getPublishedBlogPosts().filter((post) => post.pillar.toLowerCase() === "ai lab");
const liveAiLabSlugs = new Set(liveAiLabPosts.map((post) => post.slug));

const wave1Slugs = new Set([
  "harness-engineering-matters-more-than-prompts",
  "claude-code-without-drowning-in-context",
  "codex-vs-claude-code-real-software-work",
  "model-routing-stack-for-real-work",
]);

const newerAiLabPosts = liveAiLabPosts
  .filter((post) => !wave1Slugs.has(post.slug))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const cornerstonePosts: Array<{
  title: string;
  slug: string;
  description: string;
  status: string;
  ctaType: string;
  href?: string;
}> = [
  {
    title: "Why Harness Engineering Matters More Than Prompts",
    slug: "harness-engineering-matters-more-than-prompts",
    description:
      "A builder-first case for treating permissions, context control, review loops, and execution boundaries as the real system, not just the prompt.",
    status: liveAiLabSlugs.has("harness-engineering-matters-more-than-prompts") ? "Live now" : "Wave 1 draft",
    ctaType: "Builder + learner bridge",
    href: liveAiLabSlugs.has("harness-engineering-matters-more-than-prompts") ? "/ai-lab/harness-engineering-matters-more-than-prompts" : undefined,
  },
  {
    title: "How to Use Claude Code Without Drowning in Context",
    slug: "claude-code-without-drowning-in-context",
    description:
      "A practical field guide for keeping long-running coding sessions sharp through task framing, session boundaries, and approval discipline.",
    status: liveAiLabSlugs.has("claude-code-without-drowning-in-context") ? "Live now" : "Wave 1 draft",
    ctaType: "Builder",
    href: liveAiLabSlugs.has("claude-code-without-drowning-in-context") ? "/ai-lab/claude-code-without-drowning-in-context" : undefined,
  },
  {
    title: "Codex vs Claude Code for Real Software Work",
    slug: "codex-vs-claude-code-real-software-work",
    description:
      "A workflow-fit comparison based on real operating use, not benchmark theater. Where each tool helps, stalls, or needs supervision.",
    status: liveAiLabSlugs.has("codex-vs-claude-code-real-software-work") ? "Live now" : "Wave 1 draft",
    ctaType: "Builder",
    href: liveAiLabSlugs.has("codex-vs-claude-code-real-software-work") ? "/ai-lab/codex-vs-claude-code-real-software-work" : undefined,
  },
  {
    title: "My Model-Routing Stack for Real Work",
    slug: "model-routing-stack-for-real-work",
    description:
      "How Go7Studio routes research, drafting, QC, and final decisions across different models instead of pretending one model should own everything.",
    status: liveAiLabSlugs.has("model-routing-stack-for-real-work") ? "Live now" : "Wave 1 draft",
    ctaType: "Builder + learner bridge",
    href: liveAiLabSlugs.has("model-routing-stack-for-real-work") ? "/ai-lab/model-routing-stack-for-real-work" : undefined,
  },
];

const labAreas = [
  {
    title: "Tool Guides",
    description:
      "Practical tool guides for builders who want clean workflows, better boundaries, and less wasted context.",
    icon: Wrench,
  },
  {
    title: "Comparisons",
    description:
      "Side-by-side evaluations based on workflow fit, approval friction, reliability, and output quality in real projects.",
    icon: GitBranch,
  },
  {
    title: "Field notes",
    description:
      "What broke, what held up, and what changed after shipping with AI agents inside actual app, game, and automation work.",
    icon: FileStack,
  },
  {
    title: "Workflows",
    description:
      "Reusable playbooks for routing, review loops, subagents, coding sessions, and multi-step operator work.",
    icon: Bot,
  },
  {
    title: "Governance",
    description:
      "Permission models, human-review rules, and the safety rails we keep on purpose when the work actually matters.",
    icon: ShieldCheck,
  },
] as const;

export const metadata: Metadata = {
  title: "AI Lab | Go7Studio",
  description:
    "AI Lab is Go7Studio’s builder-first content hub for real-world AI guides, coding-agent comparisons, field notes, workflow playbooks, and governance lessons.",
  alternates: { canonical: "/ai-lab" },
  keywords: [
    "AI Lab",
    "Go7Studio AI Lab",
    "AI workflow guides",
    "coding agent comparisons",
    "harness engineering",
    "builder AI workflows",
    "Claude Code guide",
    "Codex vs Claude Code",
    "model routing",
  ],
  openGraph: {
    title: "AI Lab by Go7Studio",
    description:
      "Real-world AI operating guides for people actually building with these tools.",
    url: "https://go7studio.com/ai-lab",
    siteName: "Go7Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Lab by Go7Studio",
    description:
      "Builder-first AI guides, comparisons, field notes, workflows, and governance lessons from real studio work.",
  },
};

export default function AiLabPage() {
  return (
    <div className="container-px py-16 sm:py-24">
      <section className="mx-auto max-w-5xl">
        <div className="chip mb-6 inline-flex border-brand-teal/30 bg-brand-teal/10 text-white">
          AI Lab by Go7Studio
        </div>
        <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Real-world AI workflows for people actually building with these tools.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
          Go7Studio AI Lab is where we publish the systems, tradeoffs, and field notes behind real AI-enabled work,
          from coding-agent workflows and model routing to review loops, harness design, and operator playbooks.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#cornerstones" className="btn-primary inline-flex items-center justify-center gap-2 text-sm sm:text-base">
            Explore Wave 1
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-base"
          >
            Build with Go7Studio
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">
          Some AI Lab posts may include a light learner path when there is a clean Qualora fit,
          but builder/operator guidance stays primary here.
        </p>
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">What AI Lab covers</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">The operating layer, not the hype layer.</h2>
          <p className="mt-3 text-white/70">
            This lane is for builders, operators, and technical decision-makers who need clearer ways to use AI inside real work.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {labAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className="glass-card p-6 transition hover:border-brand-teal/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10 ring-1 ring-brand-teal/20">
                  <Icon className="h-5 w-5 text-brand-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{area.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="cornerstones" className="mt-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Featured wave 1</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">The first four cornerstone posts.</h2>
          <p className="mt-3 text-white/70">
            These are the first AI Lab cornerstone pieces. Live posts link out directly, and the remaining wave-one drafts stay clearly marked while they move through final polish.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {cornerstonePosts.map((post, index) => (
            <article key={post.slug} className="glass-card p-6 transition hover:border-brand-teal/30">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                <span className="chip border-brand-teal/20 bg-brand-teal/10 text-white">{post.status}</span>
                <span className="chip">Cornerstone #{index + 1}</span>
                <span className="chip">{post.ctaType}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{post.href ? <Link href={post.href} className="hover:text-brand-teal">{post.title}</Link> : post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{post.description}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{post.href ? "Live route" : "Planned slug"}</p>
                <p className="mt-1 break-all font-mono text-sm text-white/75">/ai-lab/{post.slug}</p>
              </div>
              {post.href ? (
                <div className="mt-4">
                  <Link href={post.href} className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-white">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {newerAiLabPosts.length > 0 ? (
        <section className="mt-20">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">More AI Lab</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">New writing as it lands.</h2>
            <p className="mt-3 text-white/70">
              Field notes, postmortems, and patterns from running AI agents in production. Each one is a real incident or working playbook from inside the studio.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {newerAiLabPosts.map((post) => (
              <article key={post.slug} className="glass-card p-6 transition hover:border-brand-teal/30">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-teal">AI Lab</p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug">
                  <Link href={`/ai-lab/${post.slug}`} className="hover:text-brand-teal">{post.title}</Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{post.excerpt}</p>
                <div className="mt-4">
                  <Link href={`/ai-lab/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-white">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Why this lives on Go7Studio</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">The right home for builder/operator content.</h2>
          <ul className="mt-5 space-y-4 text-white/70">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" /><span><strong className="text-white">Built by operators</strong> , this is builder content for people shipping real things.</span></li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" /><span><strong className="text-white">Closer to the work</strong> , apps, games, systems, workflows, not abstract AI commentary.</span></li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal" /><span><strong className="text-white">Trust before hype</strong> , practical guidance, tradeoffs, and failures included.</span></li>
          </ul>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Lane principles</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />Prompts are one layer, not the whole system.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />Context is a resource, not a dumping ground.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />Cheap and fast early, trusted later.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />Review loops stay in the workflow.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange" />Routing beats fandom.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <div className="glass-card p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Builder CTA</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Need help building the system, not just picking the model?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            If you need a studio partner for apps, workflows, AI-enabled product operations, or delivery systems that hold up under real use,
            Go7Studio is the primary path.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Talk to Go7Studio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              See studio services
            </Link>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/50">
            If you are here specifically to learn how these workflows translate into role-based work,
            some future AI Lab posts may include a small Qualora bridge. That stays secondary and only appears when the fit is real.
          </p>
        </div>
      </section>
    </div>
  );
}
