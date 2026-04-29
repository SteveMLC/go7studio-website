# Go7Studio AI Lab — Visual System Spec

Date: 2026-04-19
Status: implementation brief
Goal: make AI Lab posts feel high-end, technical, visually broken up, and exciting enough that builders want to stay, share, and trust Go7Studio.

## Core creative direction

We are not building a dry docs site.
We are building a **technical editorial product**.

Every AI Lab post should feel like:
- a field manual from a studio that actually builds with these systems
- technically credible
- visually premium
- fast to scan
- worth sharing
- exciting without becoming cringe

## Non-negotiable outcomes

1. **Every AI Lab post gets visual breakup**
   - no long walls of text
   - visual rhythm every few sections
2. **Every post should look technically skilled**
   - code, diagrams, tables, callouts, matrices, timelines, system cards
3. **Excitement is part of the product**
   - strong contrast, sharp hierarchy, premium code treatment, polished cards
4. **Facts still need to be defensible**
   - hotter framing is fine, fake specifics are not

## Design references (spirit, not copy)
- Vercel docs/blog
- Stripe engineering/editorial surfaces
- Linear blog/product docs
- high-end infra/product launch pages

## Visual principles

### 1. Proof over promise
Use visual evidence:
- decision matrices
- workflow diagrams
- code blocks
- routing tables
- checklists
- timelines
- metrics / context windows / pricing strips when current and cited

### 2. Break rhythm aggressively
Target: no more than 3-4 paragraphs without a visual interruption.

### 3. Premium dark-mode technical aesthetic
- glass / subtle panels
- strong typographic hierarchy
- restrained glow, not gamer sludge
- monospace used as a trust signal, not everywhere
- tasteful motion only where it helps

### 4. Reusable component system
Do not hand-style every post from scratch.
Build composable AI Lab MDX components.

## Required component set (phase 1)

### 1. `HeroCallout`
Use near the top of posts for the main thesis / positioning pull-quote.

### 2. `KeyTakeaways`
3-6 compact cards for the main useful points.

### 3. `DecisionMatrix`
For tool comparisons, routing choices, buyer/operator selection.

### 4. `MetricStrip`
For current signals like:
- context window
- pricing range
- rate-limit note
- date-stamp

Should support caveat footnotes.

### 5. `CodePanel`
Premium code block treatment:
- filename / label bar
- optional language tag
- copy button if practical
- strong mono styling

### 6. `DiagramFrame`
Container for Mermaid, SVG, or styled diagram content.
Needs to make diagrams feel deliberate, not pasted.

### 7. `ToolComparisonGrid`
Rich side-by-side product comparison cards.

### 8. `ChecklistBlock`
For “start here”, “what to ask”, “what not to do”.

### 9. `TimelineSteps`
For process / workflow / daily rhythm / rollout sequence.

### 10. `CalloutBox`
Variants:
- insight
- caution
- field-note
- current-as-of

## Optional phase 2 components

### 11. `QuoteCard`
For bold thesis / memorable line / pull-quote.

### 12. `StatCard`
For visually strong metric display when we have current numbers.

### 13. `CrossLinkRail`
Styled internal links to other AI Lab posts.

### 14. `ChartCard`
If charting becomes easy and clean.
Only add if it looks premium and can be maintained.

## Content-shape requirements per post

### Every AI Lab post should include at least:
- 1 hero callout or thesis block
- 1 key-takeaways block
- 1 decision matrix or comparison table
- 1 checklist / action framework
- 1 code block OR diagram OR process timeline
- 1 date-stamp/current-as-of callout if the topic moves fast

### For tool-comparison posts
Must include:
- decision matrix
- documented capability vs current preference separation
- current-as-of callout
- practical buyer/operator checklist

### For workflow/routing posts
Must include:
- routing table
- role cards
- checklist
- “when not to do this” block
- one system/process diagram

## Implementation recommendation

### Preferred approach
Implement AI Lab post visuals as reusable React components inside the MDX render layer.

### Keep current stack friendly
Use the existing Next.js + MDX + Tailwind + Framer Motion stack.
Avoid turning this into a dependency carnival unless a dependency clearly upgrades quality.

### Acceptable dependency additions if needed
If it materially improves the result, acceptable additions include:
- syntax-highlighting / pretty code tooling
- Mermaid support

But the default should be: build as much as possible with existing React/Tailwind primitives.

## First retrofit targets
Retrofit all 4 current AI Lab cornerstone posts:

1. `harness-engineering-matters-more-than-prompts`
   - key takeaways
   - 5-layer system visual
   - prompt-vs-harness comparison block

2. `claude-code-without-drowning-in-context`
   - context-swamp warning callout
   - six-habits card grid
   - continue vs fork vs fresh-session visual
   - practical checklist block

3. `codex-vs-claude-code-real-software-work`
   - current-as-of callout
   - capabilities vs preferences split block
   - buyer/operator checklist
   - decision matrix

4. `model-routing-stack-for-real-work`
   - role cards: scout / drafter / critic / implementer / final owner
   - routing table
   - solo-builder checklist
   - when-not-to-route block
   - system flow diagram

## Tone guidance for visuals
Visuals should make Go7Studio look:
- serious
- sharp
- current
- technically confident
- aesthetically intentional

Avoid:
- emoji-heavy decoration
- fake dashboards
- gratuitous neon sludge
- motion for motion’s sake
- generic stock-illustration SaaS look

## Success criteria
We should be able to open any AI Lab post and feel:
- “this is easier to read”
- “this looks like a serious technical studio made it”
- “there’s enough structure here that I want to keep going”
- “I learned something useful quickly”
- “this is more exciting than a normal AI article”

## Immediate build order
1. Build AI Lab MDX component layer
2. Retrofit all 4 live cornerstone posts
3. Verify visual consistency on `/ai-lab`
4. Run build
5. Later, optionally add custom OG images and richer diagrams

## Supplemental visual recommendation integrated (2026-04-19 21:38 ET)

A second-pass recommendation refined the visual direction further.

### Keep
- dense but scannable layout
- visual breakup every 3-4 paragraphs
- proof over promise
- progressive disclosure (summary -> detail -> deep dive)
- premium code treatment
- decision matrices, stat cards, and comparison grids
- dark-mode-native technical editorial feel

### Blend carefully with existing Go7Studio brand
Go7Studio already uses a dark / glass / gradient language.
Do NOT throw that out entirely.
Instead:
- keep the dark premium base
- keep subtle glass surfaces where they add quality
- reduce any overly soft/glowy treatment inside post bodies
- use sharper editorial surfaces for the AI Lab content blocks

### Strong implementation recommendation
Preferred immediate stack:
- existing Next.js + Tailwind + Framer Motion base
- improved MDX component layer
- prettier code blocks / syntax treatment
- reusable AI Lab components first
- charts only where they add real value

### Required visual components now
- `HeroCallout`
- `KeyTakeaways`
- `DecisionMatrix`
- `StatCard`
- `QuoteCallout` / `CalloutBox`
- `ChecklistBlock`
- `DiagramFrame`
- `ToolComparisonGrid`

### Post-level rule
Every AI Lab post should include at least:
- 1 hero/thesis block
- 1 key takeaways block
- 1 decision matrix or rich comparison table
- 1 checklist or action block
- 1 diagram / process frame / code treatment section

### Anti-patterns to avoid
- decorative particles
- generic stock illustrations
- emoji-heavy styling
- flashy motion that does not help comprehension
- walls of text with no visual interruption

### Visual ambition level
The site should feel:
- premium
- technical
- sharp
- exciting
- shareable
- credible to builders

Not gimmicky, but definitely not plain.
