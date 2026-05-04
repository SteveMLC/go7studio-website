# Go7Studio Brand Content Reposition Plan

Date: 2026-05-04

## Decision

Go7Studio content should showcase technical skill, polished products, and high-end shipped outcomes. It should not expose internal bot names, awkward process stories, social automation setup, or drafts that read like operational cleanup.

## Removed From Public Site

The following posts were moved back to `status: "draft"`:

- `petra-reddit-signup`
- `scout-ivy-disabled-before-posting`
- `agent-job-description`
- `agents-lying-to-each-other`
- `fired-my-orchestrator-from-real-work`
- `work-orders-that-survive-agent-handoff`

These can be rewritten later into stronger public-facing pieces if the useful technical lesson survives without internal names or tacky automation framing.

## Public Content Standard

Keep or create content that does at least one of these:

- Shows a complex product shipped or improved.
- Explains a durable technical architecture.
- Demonstrates high-quality engineering judgment.
- Uses real product/game assets as proof.
- Helps builders make better implementation decisions.

Avoid:

- Internal bot names.
- Social posting automation as a public centerpiece.
- "We had a weak process and fixed it" framing unless the rewrite is elevated into a mature technical pattern.
- Content that makes the studio look experimental in a careless way.

## Current Public Direction

Keep the AI Lab focused on:

- harness engineering,
- model routing,
- coding workflow comparisons,
- context control,
- high-signal AI-assisted production systems.

Keep Studio content focused on:

- game launch results,
- monetization lessons,
- product iteration,
- real asset-backed visuals,
- what actually shipped.

## Empire Tycoon Asset Rule

The following Empire Tycoon source art is stale and unusable:

- maroon title-card artwork with the old ornate `Empire Tycoon` wordmark,
- flat blue square globe/crown/city icon artwork.

Do not use either image as source material, reference material, collage input, generated-image guidance, OG art, thumbnail art, or article art.

Empire Tycoon visuals on Go7Studio must use verified current project assets only. The accepted current app icon source is `play_store_icon_512.png` from `git@github.com:SteveMLC/empire_tycoon.git`; gameplay/article compositions should prefer real screenshots and shipped in-game assets from that repo.

## Next Visual/Content Batch

1. Rebuild `/blog` and `/ai-lab` cards with visual thumbnails and stronger editorial hierarchy.
2. Upgrade `ai-wrote-nine-courses-from-nothing` with a technical course-generation pipeline visual.
3. Upgrade `model-routing-stack-for-real-work` with a clean model-routing decision board.
4. Upgrade `shipped-4-games-with-ai-in-30-days` with a polished four-game production system visual.
5. Rebuild the Empire case study with current Empire art, timeline, retention/storefront changes, and measurable outcomes.
6. Add Rampart and Empire collage visuals using existing game art only.

## Verification

After every batch:

- `npm run lint`
- `npm run build`
- verify unpublished posts return `404`,
- verify sitemap/feed do not include draft posts,
- live mobile check for no horizontal overflow,
- `rg` published content for internal names before publishing.
