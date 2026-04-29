# Go7Studio AI Lab — Hub Page Spec

Date: 2026-04-19
Status: implementation handoff
Purpose: define the first `/ai-lab` landing page so the site can ship the AI Lab lane with a clear builder/operator identity.

## Page goal

Make `/ai-lab` feel like:
- the home for Go7Studio's builder/operator AI content
- a serious but approachable field-manual space
- a trust-building surface for future contracts, collaborations, and productized operator assets

This page should not feel like:
- a generic AI blog
- a hype page
- a Qualora landing page in disguise

## Core positioning

### Eyebrow
**AI Lab by Go7Studio**

### Hero headline options
Preferred:
**Real-world AI workflows for people actually building with these tools**

Backup:
**Builder-first guides, field notes, and workflow playbooks for real AI work**

### Hero body copy
Go7Studio AI Lab is where we publish the systems, tradeoffs, and field notes behind real AI-enabled work, from coding-agent workflows and model routing to review loops, harness design, and operator playbooks.

### Primary CTA
- **Explore Wave 1**

### Secondary CTA
- **Work with Go7Studio**

Optional tertiary text link:
- **Learning this for work? Explore role-specific training on Qualora**

Keep the Qualora link visually secondary and conditional.

## Suggested sections

### 1. Hero
Elements:
- eyebrow
- headline
- short body copy
- CTA buttons
- visual motif: network / cards / workflow diagram style

### 2. What AI Lab covers
Use 5 cards:
- **Tool Guides** — how we actually use Claude Code, Codex, Kimi, MiniMax, and related tooling
- **Comparisons** — tool-vs-tool and workflow-vs-workflow tradeoffs grounded in real use
- **Field Notes** — build logs, failures, lessons, and post-mortems from live work
- **Workflow Playbooks** — routing systems, review loops, subagent patterns, and repeatable operating structures
- **Governance** — permissions, approval boundaries, context control, and when not to automate

### 3. Why this lives on Go7Studio
Short section with 3 bullets:
- **Built by operators** — this is builder content for people shipping real things
- **Closer to the work** — apps, games, systems, workflows, not abstract AI commentary
- **Trust before hype** — practical guidance, tradeoffs, and failures included

### 4. Featured Wave 1
Show 4 feature cards, marked clearly as first-wave pieces if not live yet.

Suggested cards:
1. **Why Harness Engineering Matters More Than Prompts**
   - Prompts matter, but reliable AI work comes from the system around the model.
2. **How to Use Claude Code Without Drowning in Context**
   - A practical guide to task framing, session boundaries, and context hygiene.
3. **Codex vs Claude Code for Real Software Work**
   - A field report on workflow fit, not a brand-war benchmark post.
4. **My Model-Routing Stack for Real Work**
   - A routing framework for assigning the right model to the right stage of work.

If the cards are not yet live, label them as:
- `Wave 1`
- `In progress`
- `Publishing soon`

Avoid fake dates.

### 5. Operator principles
A compact section with short bullets:
- prompts are one layer, not the whole system
- context is a resource, not a dumping ground
- cheap and fast early, trusted later
- review loops stay in the workflow
- routing beats fandom

### 6. CTA band
Primary angle:
- Want help designing AI workflows that survive real use?
- Work with Go7Studio

Secondary angle:
- Want the role-specific learning version?
- Explore Qualora only when the training link is genuinely relevant

## Tone
- confident but not chest-thumping
- practical
- high-signal
- builder-first
- skeptical of hype
- no fake authority theater

## Design notes
- keep existing Go7Studio dark / glass / gradient language
- should feel like a sibling to Insights and Blog, not a disconnected microsite
- feature cards should look believable even before the 4 posts are fully wired live
- if needed, a subtle “Wave 1” frame can make the page feel intentional rather than incomplete

## SEO / metadata
Suggested title:
**AI Lab | Go7Studio**

Suggested description:
**Go7Studio AI Lab shares builder-first AI guides, comparisons, field notes, and workflow playbooks for real-world coding, automation, and operator systems.**

Suggested keywords:
- AI workflows
- coding agents
- model routing
- harness engineering
- Claude Code
- Codex
- AI automation systems

## Implementation preference
If possible:
- create `src/app/ai-lab/page.tsx`
- optionally add small local-presentational components only if they reduce clutter
- add header/footer visibility if tasteful

Keep it simple enough to ship this week.
