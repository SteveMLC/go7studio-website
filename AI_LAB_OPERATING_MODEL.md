# Go7Studio AI Lab — Operating Model

Date: 2026-04-19
Status: research-backed draft
Source inputs:
- internal strategy synthesis
- Kimi strategy memo (`workspace-winnie/go7studio-ai-lab-strategy-memo-v2.md`)
- Rex architecture memo (2026-04-19 reply)

## 1. Purpose

AI Lab is Go7Studio's builder/operator content engine.

It exists to:
- build trust for Go7Studio as a serious AI-enabled studio
- generate traffic from high-intent builder/operator search
- create future consulting, product, and media opportunities
- selectively feed role-based derivative traffic to Qualora when a post has a clean job-training angle

It is **not** a Qualora editorial lane.
It is **not** generic AI news.
It is **not** another "prompt hacks" content farm.

## 2. Editorial positioning

### Working title
**AI Lab by Go7Studio**

### Positioning sentence
Real-world AI operating guides for people actually building with these tools.

### Voice
- practical
- direct
- high-signal
- skeptical of hype
- honest about tradeoffs and failures
- useful first, impressive second

## 3. What AI Lab publishes

### Core content types
1. **Tool guides**
   - how to use Claude Code, Codex, Kimi, MiniMax, etc.
2. **Comparisons**
   - Codex vs Claude Code, Kimi vs GPT, etc.
3. **Field notes**
   - real lessons from Go7Studio work
4. **Workflow playbooks**
   - routing, review loops, harness patterns
5. **Safety / governance notes**
   - when not to automate, permission models, review rules

### Content that does NOT belong here
- generic AI news rewrites
- shallow benchmark summaries with no original perspective
- generic "AI will change everything" essays
- role-training pieces that belong on Qualora instead

## 4. Hub-and-spoke model

### Hub
**Go7Studio AI Lab** is the canonical source.
It owns:
- the technical/original version
- builder/operator framing
- workflow and harness depth

### Spokes
Derivative versions can be created when a topic maps cleanly to a role or training outcome.
Those derivative pieces can go to:
- Qualora blog
- Qualora career pages / bundle pages
- future role-specific newsletters or assets

### Routing rule
Publish on Go7Studio if the core question is:
- how do I build with this?
- which tool should I use?
- what broke and why?
- how do I structure the workflow?

Publish a derivative on Qualora only if the core question becomes:
- how does this help me in my job?
- how do people in a role use this safely?
- what do I need to learn to apply this at work?

## 5. AI Lab content engine

AI Lab should run as a staged content system.

### Roles
| Role | Purpose | Best-fit model |
|------|---------|----------------|
| **Scout** | research, source gathering, topic packets | Kimi or M2.7 |
| **Assembler** | first-draft composition | Kimi or M2.7 |
| **Critic** | factual and structural QC | M2.7 + human spot checks |
| **Polisher** | final voice, clarity, SEO polish | GPT / Claude / Codex |
| **Publisher** | formatting, scheduling, posting | scripts + human review |
| **Librarian** | taxonomy, memory, tracking | file/memory system |

### Recommended model split
#### Kimi is best for:
- research synthesis
- broad topic mapping
- first-pass article drafting
- comparison table generation
- fast multi-source summarization

#### M2.7 is best for:
- speed research
- first-pass structure
- critique / QC lens
- identifying missing claims, missing citations, weak framing

#### GPT / Claude / Codex are best for:
- final polish
- tone shaping
- article tightening
- code-example validation
- publishing-readiness checks

### Rule
**Kimi and M2.7 are research/drafting/QC engines, not final publishers.**

## 6. Pipeline stages

```
research -> draft -> qc -> polish -> publish -> live -> derivative-routing(optional)
```

### Stage 1: Research
Output:
- research packet

### Stage 2: Draft
Output:
- first article draft

### Stage 3: QC
Output:
- pass/fail review with issues

### Stage 4: Polish
Output:
- publish-ready draft

### Stage 5: Publish
Output:
- live Go7Studio AI Lab post

### Stage 6: Derivative routing
Question:
- should this become a Qualora job-aligned derivative?

## 7. Quality gates

### Research gate
Must have:
- at least 3 credible sources or first-hand field-note inputs
- explicit uncertainty section
- no fake citations

### Draft gate
Must have:
- clear angle
- audience defined
- original point of view
- not just documentation paraphrase

### QC gate
Must have:
- no hallucinated claims
- no obviously wrong version/model facts
- no uncited hard assertions presented as fact
- no brand-damaging hype framing

### Polish gate
Must have:
- clear title
- sharp intro
- clean CTA
- SEO metadata
- readable formatting

## 8. First operating cadence

### Weekly cadence
- **2 primary posts / week** to start
- one deep guide or comparison
- one field note or build-log post

### Monthly targets
Month 1:
- 4 cornerstone posts
- 3-5 supporting field notes
- basic CTA and tracking in place

Month 2:
- 8-10 more posts
- first lead magnet
- first cross-flow into Qualora where appropriate

Month 3:
- stable editorial loop
- first low-ticket product candidate identified
- first measurable contract/inquiry learning

## 9. Go7Studio business upside

This lane can support:
- general brand trust
- consulting and contract credibility
- future AI workflow products
- better authority for games/apps built with AI-assisted workflows
- long-term owned audience through email / downloads

## 10. Immediate recommendation

### What to build first
1. `/ai-lab` hub on Go7Studio
2. four cornerstone posts
3. file-based handoff workflow
4. one CTA pattern:
   - builder CTA
   - optional learner CTA to Qualora when relevant
5. UTM tracking for any Go7Studio → Qualora bridge links

### The first 4 cornerstone posts
1. Why harness engineering matters more than prompts
2. How to use Claude Code without drowning in context
3. Codex vs Claude Code for real software work
4. My model-routing stack for real work
