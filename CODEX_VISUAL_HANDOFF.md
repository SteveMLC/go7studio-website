# Codex Handoff — Blog Visual Production

Date: 2026-05-04
Owner: Steve / Walt (Anthropic side)
Executor: Codex (GPT-side coding agent)
Repo: `github.com/SteveMLC/go7studio-website` (`main` branch, Vercel auto-deploys)

## Goal

Bring every blog post on go7studio.com up to the AI Lab visual bar. Today only 8 of 47 posts have inline visuals. The other ~38 are walls of text. Your job is to read each visual-poor post, decide what kind of visual would serve it, produce that visual, and commit it through a PR (one per post or batched in groups of 5–10, your call). The brand and component layer already exist — you are not inventing the system, you are populating it.

## What "done" looks like, per post

Every post should clear at least **one** of these bars after your work:

- a meaningful diagram (Mermaid via `<MermaidDiagram>`)
- a structural MDX visual (callout / table / decision matrix / role cards built from the existing primitives in `src/components/blog/AiLabMdxComponents.tsx`)
- a real screenshot or photo from the project the post discusses (game art, dashboard screenshot, terminal output)
- a generated illustration when none of the above fit (last resort, see "Generated images")

If a post is short and concept-light (e.g. `hello-world.mdx`), one well-placed visual is enough. Long technical posts (most of AI Lab and the Qualora Studio writeups) should hit visual breakup roughly every 3–4 paragraphs per the visual spec.

## Read these first, in order

1. `AI_LAB_VISUAL_SYSTEM_SPEC.md` — full visual brand: tone, do/don't, component vocabulary
2. `AI_LAB_VISUAL_RETROFIT_MAP.md` — concrete example of how visuals were planned for the 4 cornerstone AI Lab posts (use as a template for your own per-post plans)
3. `src/components/blog/AiLabMdxComponents.tsx` — the actual component map MDX uses; every component you can reference is here
4. `src/components/blog/MermaidDiagram.tsx` — Mermaid wrapper, dark-theme initialized
5. `src/app/globals.css` — `.markdown-alert` styles (note/tip/important/warning/caution scoped to `.ai-lab-mdx`)
6. `tailwind.config.ts` — brand color tokens (see "Palette" below)
7. Any 2–3 of the 8 already-shipped posts to feel the bar:
   - `src/content/blog/harness-engineering-matters-more-than-prompts.mdx`
   - `src/content/blog/six-seo-bugs-six-days-doubled-ctr.mdx` (Mermaid example)
   - `src/content/blog/sitemap-244-to-15602-without-spam.mdx` (Mermaid example)

## Inventory — the 38 visual-poor posts

Ground truth comes from running this in repo root:

```bash
for f in src/content/blog/*.mdx; do
  if ! grep -q "MermaidDiagram\|<img\|<Image\|HeroCallout\|KeyTakeaways\|DecisionMatrix" "$f"; then
    echo "NEEDS: $(basename $f .mdx)"
  fi
done
```

Pillars break down (as of 2026-05-04):

- **AI Lab** (10 visual-poor): `cost-and-quality-routing-five-model-families`, `daily-memory-file`, `decide-ship-or-pause-ai-tool`, `one-config-line-slowed-the-studio`, `petra-reddit-signup`, `reading-audit-logs-highest-roi-habit`, `scout-ivy-disabled-before-posting`, `state-file-architecture-memory`, `three-conversations-stopped-having`, `work-orders-that-survive-agent-handoff` (plus the 6 published AI Lab posts that don't have rich MDX yet)
- **Studio** (~20 visual-poor): the Qualora technical writeups (`nineteen-bugs-failure-pattern-atlas`, `sixteen-extractors-eight-formats-cost-matrix`, etc), the founder-narrative posts (`empire-tycoon-first-dollar`, `picking-mobile-game-names`, `pet-paradise-on-hold`, `five-game-portfolio`), and the Sortbloom/Stakd/Rampart/Slimeslip writeups
- **Case Study** (1): `bloom-tagged-question-bank-beats-llm-on-demand`

Re-run the grep — it's the source of truth, not this list.

## Two-phase delivery

### Phase A — Per-post visual plan (do this first, ship as a doc)

Before generating anything, walk through every visual-poor post and write a plan. Format:

```md
## <slug>

- pillar:
- summary:
- core thesis (one sentence):
- visual choices (in order):
  1. <type> — <one-line spec>
  2. <type> — <one-line spec>
- estimated effort:
- risk / blockers:
```

Drop the full plan at `CODEX_VISUAL_PLAN.md` in the repo root. This is your handoff to yourself for Phase B and lets Steve sanity-check the direction before you spend cycles on image generation.

Visual types you can pick from (preference order, cheapest-and-most-on-brand first):

1. **Mermaid diagram** — flowchart, sequence, state diagram. Most posts that describe a process, decision, or pipeline benefit from one. Embed via:
   ````mdx
   ```mermaid
   flowchart TD
     A[start] --> B[next]
   ```
   ````
   The `MermaidDiagram` component auto-renders any code block with `language="mermaid"`. Already wired.

2. **Decision matrix / structured table** — when the post compares options, configurations, or trade-offs. Plain Markdown tables render with the GFM remark plugin already installed.

3. **GitHub-flavored alert callouts** — `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`, `> [!IMPORTANT]`. Already styled in `globals.css` for the dark theme. Use sparingly: one or two per long post, for the line that matters most.

4. **Code panel** — for posts that reference real code (most AI Lab posts). Use real, attributable snippets. Use language tags so syntax highlighting picks it up.

5. **Real screenshots / project art** — game posts should pull from existing `/public/images/games/<game>/` directories before generating anything new. Empire Tycoon has `art/` and `screenshots/` subfolders already. Pet Paradise, Slimeslip have promo images. Sortbloom, Stakd, Rampart have folders.

6. **Generated illustration** — last resort. Only when the post benefits from atmosphere or hero art and none of the above fit. See "Generated images" below for tooling and constraints.

### Phase B — Execute the plan

For each post in `CODEX_VISUAL_PLAN.md`:

1. Edit `src/content/blog/<slug>.mdx` directly. Bump `modified:` to today.
2. If you need to add new image files, place them in `/public/images/blog/<slug>/<name>.{png,jpg,svg}` and reference with `![alt text](/images/blog/<slug>/<name>.png)`.
3. If you need a new MDX component (rare — the existing set should cover most cases), add it to `src/components/blog/AiLabMdxComponents.tsx` and document it in `AI_LAB_VISUAL_SYSTEM_SPEC.md`.
4. Run `npm run build` after each batch of 5–10 posts. The MDX prerender catches missing components and broken JSX in production builds that dev mode hides — a green build is part of "done."
5. Commit in batches with messages like `feat(blog): add visuals to <pillar> batch — <count> posts`.
6. Push to `main`. Vercel auto-deploys. Spot-check on go7studio.com.

## Palette and component vocabulary

Brand tokens (from `tailwind.config.ts`):

| Token | Hex | Use |
| --- | --- | --- |
| `ink-950` | `#070B12` | base background |
| `ink-900` | `#0B1220` | card background |
| `text-primary` | `#F2F7FF` | body |
| `text-muted` | `#7E8CA8` | secondary |
| `brand-teal` | `#2DD4BF` | **AI Lab** accent |
| `brand-orange` | `#FB923C` | **Studio** accent |
| `brand-pink` | `#E879F9` | **Case Study** accent |
| `brand-blue` | `#3B82F6` | **Qualora** accent |

Pillar-color mapping is consistent across OG images, badges, and admin UI — keep it consistent in any new visuals you generate.

## Generated images — when, how, what to ship

Use generated images sparingly. Most posts should *not* need them. When they do:

- Use the OpenAI `gpt-image-1` API or DALL-E 3 (whichever is wired up in your environment).
- Aspect ratio: 16:9 for hero, 4:3 for inline.
- Style prompt template (use literally, then append the post-specific subject):
  > "Dark editorial illustration, premium technical aesthetic, deep navy and ink-black background (#070B12), accent in [PILLAR_COLOR], minimal geometric shapes, no text, no logos, no faces, no stock-photo people, subtle glow not gamer neon, suitable for a high-end developer blog. Subject: ..."
- Save as `.png`, target ~1200px wide.
- Place in `/public/images/blog/<slug>/`.
- Add an `ogImage:` frontmatter entry pointing to it if it's the post's hero (the per-post `opengraph-image.tsx` already auto-generates OG cards, so a post-specific `ogImage` only matters if you want a designed-for-this-post share image).

**Do not** generate:
- generic stock-illustration "team of devs at laptop" energy
- emoji-heavy hero art
- fake dashboards or fake metric screenshots (real screenshots are fine; fabricated ones are not)
- anything with text rendered into the image (text models do this poorly and it'll embarrass us)

## Per-post recipes by post type

**Founder-narrative Studio posts** (Empire Tycoon, mobile games, business decisions):
- One real screenshot from the game/project, in-line near the relevant section
- A simple Mermaid timeline or a callout for the "what changed" moment
- No generated heroes unless the post genuinely lacks any visual artifact

**Technical pipeline / debugging posts** (Qualora bug stories, extractor writeups):
- A pipeline-stage diagram (Mermaid `flowchart` works well)
- A "before / after" code panel showing the fix
- A `> [!CAUTION]` or `> [!NOTE]` for the gotcha

**Comparison / decision posts** (model routing, codex vs claude code, tool choice):
- A decision matrix table
- A `> [!TIP]` for the operator-style takeaway
- Optionally a Mermaid sequence diagram for the workflow

**SEO / data posts** (we have 4 already done — match that bar):
- Mermaid diagram of the system or fix
- Real numbers in a table (don't fabricate numbers — pull from the article body)

## What you do *not* touch

- Don't edit posts already marked `status: "published"` aggressively. If you add visuals, keep the existing copy intact and bump `modified:` to today. Steve reviews live posts on go7studio.com.
- Don't change the publish queue (`scripts/publish-queue.txt`) — that's a calendar, not a visual concern.
- Don't modify the OG image generators (`src/app/blog/[slug]/opengraph-image.tsx`, `src/app/ai-lab/[slug]/opengraph-image.tsx`) — they auto-generate per-post share cards already.
- Don't introduce new dependencies without checking — the existing stack (Next 14.2, MDX, Tailwind, Framer, Mermaid 11.14) covers everything you should need.
- Don't fabricate metrics or screenshots. Real or nothing.

## Priority order

1. **Top-of-funnel published posts first** — `empire-tycoon-first-dollar`, `agents-lying-to-each-other`, `agent-job-description`, `ai-wrote-nine-courses-from-nothing`, `fired-my-orchestrator-from-real-work`, `shipped-4-games-with-ai-in-30-days`. These are live now and getting traffic.
2. **Then the AI Lab cornerstones not yet retrofitted** — see `AI_LAB_VISUAL_RETROFIT_MAP.md` for the spec on the 4 cornerstones; apply the same shape to the others.
3. **Then the publish queue order** — read `scripts/publish-queue.txt`. Posts go live in the order listed at 14:00 UTC daily. Visuals should land before the post does, so work the queue in order.
4. **Drafts that aren't queued** can wait until after the queued posts are caught up.

## Verification per batch

- `npm run build` returns green
- `grep -L "MermaidDiagram\|<img\|<Image\|HeroCallout\|KeyTakeaways\|DecisionMatrix" src/content/blog/*.mdx` shrinks
- Spot-check the rendered post on the dev server (`npm run dev`, then load the post URL)
- Commit message describes the batch concretely (which posts, what visual type added)

## Reporting

When you finish a batch, write a one-paragraph status into `CODEX_VISUAL_PROGRESS.md` (create if it doesn't exist): which posts were touched, what visual type was added, any blockers or judgment calls Steve should review.

If you hit ambiguity that warrants a human call (post needs a screenshot you don't have access to, an idea benefits from a diagram you can't fact-check, etc), note it in `CODEX_VISUAL_PROGRESS.md` as a `[QUESTION]` line and skip the post. Don't guess.

## Tone reminder

Go7Studio's voice is technical, direct, founder-first, allergic to corporate fluff. The visuals should match: sharp, dark, deliberate. If you find yourself reaching for a "vibrant team collaboration" stock illustration, stop — find a diagram or a real screenshot instead.
