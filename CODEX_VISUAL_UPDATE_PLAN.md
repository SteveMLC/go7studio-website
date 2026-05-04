# Go7Studio Visual Update Plan

Date: 2026-05-04

## Phase 0 - Already Done

- Hardened mobile article layout so MDX visuals cannot force horizontal page scroll.
- Removed duplicate rendered H1 titles when MDX starts with the same title as frontmatter.
- Re-verified representative blog routes locally at `390px` mobile width: all sampled article overflows are `0px`.

## Phase 1 - Global Blog Polish

Goal: make every post feel intentionally designed before generating new art.

1. Add thumbnail support to `BlogCard`.
   - Use post `ogImage` when it exists and resolves.
   - Fall back to generated OG route for posts without inline art.
   - Add pillar color treatment: AI Lab teal, Studio orange, Case Study pink, Qualora blue.

2. Rebuild `/blog` as an editorial index.
   - Add a large featured post card for the newest or strongest post.
   - Keep the remaining posts as a 2-column card grid with thumbnails.
   - Add compact filters, not oversized marketing sections.

3. Rebuild `/ai-lab` cards to surface article visual quality.
   - Cornerstones should preview their internal diagram style.
   - Recent field reports should show a small "artifact type" chip: matrix, timeline, control plane, case note.

4. Tighten mobile article details.
   - Keep article card padding at `p-6` on mobile.
   - Make footer newsletter form stack on mobile.
   - Confirm no article route reports horizontal overflow after each batch.

## Phase 2 - Blog Article Upgrade Batch

Goal: bring every published article up to the Petra standard where it matters.

| Priority | Post | Upgrade |
|---:|---|---|
| 1 | `scout-ivy-disabled-before-posting` | Replace generic flow/code blocks with a "pre-flight control board": surface, routing, visibility, brand readiness. Add disabled-agent state panel. |
| 2 | `agent-job-description` | Add an "agent role contract" visual: responsibilities, forbidden surfaces, escalation path, output receipt. |
| 3 | `agents-lying-to-each-other` | Add a message-receipt ledger visual and a failure taxonomy board. |
| 4 | `work-orders-that-survive-agent-handoff` | Add a work-order anatomy panel and handoff pipeline visual. |
| 5 | `ai-wrote-nine-courses-from-nothing` | Add a course-generation pipeline visual and source-to-lesson evidence panel. |
| 6 | `fired-my-orchestrator-from-real-work` | Add role-boundary diagram showing Walt routing, specialists executing, Rex auditing. |
| 7 | `claude-code-without-drowning-in-context` | Add context-budget stack visual, session hygiene checklist, and before/after context window. |
| 8 | `codex-vs-claude-code-real-software-work` | Add comparison dashboard with task classes, failure modes, and routing recommendation. |
| 9 | `harness-engineering-matters-more-than-prompts` | Add harness architecture panel: permissions, file gates, review loops. |
| 10 | `model-routing-stack-for-real-work` | Add model-router decision board and cost/quality lane diagram. |

## Phase 3 - Game And Case Study Visuals

Goal: use real game/product art first, generated art second.

1. Empire Tycoon article/page visuals.
   - Build a current-logo-only art kit from `icon-new.jpg`.
   - Create a reusable collage component for Empire posts: phone frame, IAP shelf, icon, store/revenue tiles.
   - Upgrade `empire-tycoon-first-dollar` with a price-shelf visual and "first buyer path" timeline.
   - Upgrade `views-vs-buyers` with a buyer-funnel dashboard visual.

2. Rampart visuals.
   - Use `public/images/games/rampart/hero-bg.png`, castle states, and troop sprites.
   - Create one hero collage for `/games/rampart`.
   - Add a smaller Rampart art strip for any future Rampart-related posts.

3. Case studies.
   - Rebuild `/case-studies` as proof cards, not text cards.
   - Rebuild `/case-studies/empire-tycoon-growth` with:
     - launch timeline,
     - retention/storefront change board,
     - metric cards,
     - current Empire art.

4. Project pages.
   - NEALAC: add a learning-platform screen collage or generated clean LMS mock based on the actual product story.
   - Qualora: add career-path / lesson-player panels, plus a small SEO/site-architecture diagram.

## Phase 4 - Satellite Pages

Goal: decide whether these are public brand surfaces or utility surfaces.

1. `/education`
   - Replace placeholder screenshot block with real app screenshot or a generated app-frame visual.
   - Keep the page simple, but remove the unfinished feel.

2. `/tiktok-demo`
   - Style as a utility auth page intentionally: compact card, clearer Go7Studio/TikTok connection, less empty space.

3. `/play/stakd`
   - If Stakd is retired/rebranded, redirect to `/games/sortbloom`.
   - If it is live, update the Play Store destination and restore the page.

4. `/hire`
   - Either keep as a redirect to `/services`, or create a distinct hire-intent page with a tighter one-screen funnel.

## Verification Checklist Per Batch

- `npm run lint`
- `npm run build`
- Desktop screenshot of changed pages.
- Mobile screenshot at `390x844`.
- Browser check: `document.documentElement.scrollWidth - document.documentElement.clientWidth === 0`.
- Confirm no old Empire Tycoon logo appears in new assets.
- If generated art is used, save prompts and source references beside the image asset.

