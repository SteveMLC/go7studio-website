# Codex Visual Plan

Date: 2026-05-04
Source: `CODEX_VISUAL_HANDOFF.md` plus live MDX inventory.

Inventory command used:

```bash
for f in src/content/blog/*.mdx; do
  if ! grep -q "MermaidDiagram\|<img\|<Image\|HeroCallout\|KeyTakeaways\|DecisionMatrix" "$f"; then
    echo "NEEDS: $(basename "$f" .mdx)"
  fi
done
```

## agent-job-description

- pillar: AI Lab
- summary: A published field note reframing agent system prompts as job descriptions.
- core thesis: If an agent role cannot be written as a job description, the system prompt is not operationally clear enough.
- visual choices (in order):
  1. HeroCallout - make the JD framing explicit above the first failure table.
  2. DecisionMatrix - preserve the five JD questions as a compact role-contract matrix.
  3. ChecklistBlock - final "write the JD before the prompt" operator checklist.
- estimated effort: small
- risk / blockers: none; use existing examples and code fences already in the post.

## agents-lying-to-each-other

- pillar: AI Lab
- summary: Published postmortem on replacing free-form agent chat with a file-backed CLI harness.
- core thesis: Chat is not a coordination primitive when the system needs proof of delivery, replay, and audit.
- visual choices (in order):
  1. HeroCallout - "files beat chat" thesis near the top.
  2. KeyTakeaways - five lies converted into scan cards.
  3. Existing Mermaid sequence diagrams - keep and let the current renderer handle them.
- estimated effort: small
- risk / blockers: none; avoid changing the failure examples.

## ai-wrote-nine-courses-from-nothing

- pillar: AI Lab
- summary: Published postmortem on zero-source content generation and halt-on-zero remediation.
- core thesis: A stronger model cannot fix a pipeline step that accepts empty source material.
- visual choices (in order):
  1. HeroCallout - zero input means halt, not generate.
  2. KeyTakeaways - bypass, missing halt, smell test, catalog audit.
  3. DecisionMatrix - old continue-on-zero behavior vs new halt-on-zero contract.
- estimated effort: small
- risk / blockers: none; do not name course IDs beyond what the article already states.

## blog-bundle-premium-flywheel-auto-promotes

- pillar: Studio
- summary: Draft about a blog-to-bundle monetization loop with audit and tier-flip scripts.
- core thesis: The monetization flywheel works because audit, queue, and flip are separated into small scripts.
- visual choices (in order):
  1. HeroCallout - separate observation from action.
  2. Existing Mermaid flow - keep as the primary funnel visual.
  3. DecisionMatrix - audit script vs flip script vs seed pipeline responsibilities.
- estimated effort: medium
- risk / blockers: no fabricated conversion numbers; only use values already in body.

## bloom-tagged-question-bank-beats-llm-on-demand

- pillar: Case Study
- summary: Draft on replacing runtime LLM quiz generation with a Bloom-tagged bank.
- core thesis: Compliance-grade quizzes need reproducible selection, not fresh runtime generation.
- visual choices (in order):
  1. HeroCallout - bank beats vibes for auditability.
  2. DecisionMatrix - LLM-on-demand vs tagged bank vs distribution-aware selector.
  3. Existing Mermaid diagrams - keep for feeding/selection architecture.
- estimated effort: medium
- risk / blockers: keep Dr. Ann/NEALAC references intact; no new claims about audit scope.

## career-match-quizzes-onet-implementation

- pillar: Studio
- summary: Draft on O*NET-backed career assessment and cosine matching.
- core thesis: Career quizzes become useful when they use a real occupational standard and verifiable scoring.
- visual choices (in order):
  1. HeroCallout - assessment beats engagement.
  2. DecisionMatrix - vibes quiz vs O*NET implementation.
  3. Existing Mermaid flow - keep scoring/matching architecture.
- estimated effort: medium
- risk / blockers: no external O*NET claims beyond article body unless separately sourced.

## compliance-via-architecture-not-surveillance

- pillar: Studio
- summary: Draft on enforcing CE compliance through player state and certificate signatures.
- core thesis: Compliance can be proven by architecture before it has to become surveillance.
- visual choices (in order):
  1. HeroCallout - state beats cameras for this compliance tier.
  2. Mermaid sequence - student progress, quiz pass, certificate issue, QR verify.
  3. DecisionMatrix - surveillance route vs architecture route.
- estimated effort: medium
- risk / blockers: avoid legal overstatement; keep "when surveillance is warranted" section.

## cost-and-quality-routing-five-model-families

- pillar: AI Lab
- summary: Draft model-routing matrix across five families and six call types.
- core thesis: Best-model-per-call beats best-model-overall for a fixed-budget studio.
- visual choices (in order):
  1. HeroCallout - route by call type, not vendor preference.
  2. DecisionMatrix - call type, primary, fallback, reasoning effort.
  3. Existing Mermaid diagrams - keep harness, quadrant, and fallback visuals.
- estimated effort: small
- risk / blockers: current model names/prices are time-sensitive; do not add new prices.

## custom-game-art-lora-228

- pillar: Studio
- summary: Draft on training a reusable game-art LoRA from existing Empire/Rampart work.
- core thesis: A cheap style LoRA pays for itself when it turns repeated art direction into reusable infrastructure.
- visual choices (in order):
  1. Real image collage - use existing Empire Tycoon screenshots and Rampart art assets.
  2. HeroCallout - style consistency is infrastructure, not decoration.
  3. DecisionMatrix - use LoRA vs skip LoRA.
- estimated effort: medium
- risk / blockers: only use existing project art; no generated fake training outputs.

## daily-memory-file

- pillar: AI Lab
- summary: Draft on timestamped daily memory files for agent session continuity.
- core thesis: The audience for a daily memory file is tomorrow's agent session, not future nostalgia.
- visual choices (in order):
  1. HeroCallout - bigger context is not memory.
  2. TimelineSteps - five event triggers that earn an entry.
  3. Existing Mermaid compounding loop - keep.
- estimated effort: small
- risk / blockers: none.

## decide-ship-or-pause-ai-tool

- pillar: AI Lab
- summary: Draft decision filter for adopting or rejecting AI tools.
- core thesis: Operability beats projected ROI when a tool becomes part of a production system.
- visual choices (in order):
  1. HeroCallout - "can I describe how this fails?"
  2. Existing Mermaid decision tree - keep as primary visual.
  3. DecisionMatrix - shipped, rejected, kept-on-tap outcomes.
- estimated effort: small
- risk / blockers: no extra tool recommendations.

## empire-tycoon-first-dollar

- pillar: Studio
- summary: Published founder story about the first paid Empire Tycoon purchase.
- core thesis: The first buyer broke the assumption that nobody was out there.
- visual choices (in order):
  1. Real image collage - existing Empire Tycoon screenshots/icon, inserted near the build story.
  2. HeroCallout - first buyer as proof of a pattern.
  3. DecisionMatrix - IAP shelf and why premium dominated.
- estimated effort: medium
- risk / blockers: use existing game assets only; do not fabricate store screenshots.

## fired-my-orchestrator-from-real-work

- pillar: AI Lab
- summary: Published post on moving Walt from executor to coordinator.
- core thesis: The orchestrator should route work orders, not become the biggest context sink.
- visual choices (in order):
  1. HeroCallout - Walt writes work orders, not production SQL.
  2. KeyTakeaways - role split, token budget, escalation, fire-able signal.
  3. Existing Mermaid - keep coordinator flow.
- estimated effort: small
- risk / blockers: none.

## five-game-portfolio

- pillar: Studio
- summary: Draft explaining the five-game portfolio as variance reduction with shared infrastructure.
- core thesis: Multiple games are viable only when shared infrastructure keeps the marginal operating cost low.
- visual choices (in order):
  1. Real portfolio collage - existing Empire, Sortbloom, SlimeSlip, Pet Paradise, Rampart assets.
  2. Existing Mermaid quadrant/mindmap/gantt - keep.
  3. DecisionMatrix - cost controls by layer.
- estimated effort: medium
- risk / blockers: no generated art needed; existing assets cover the portfolio.

## government-disclaimers-hiding-32-percent-published-courses

- pillar: Studio
- summary: Draft postmortem on TAACCCT/DOL boilerplate contamination in published courses.
- core thesis: Boilerplate contamination is a pipeline-contract failure, not a copyediting issue.
- visual choices (in order):
  1. HeroCallout - contamination needs a scanner and a stop, not manual cleanup.
  2. Existing SQL/code panels - keep.
  3. Mermaid pipeline - show scan, classify, strip, audit, publish.
- estimated effort: medium
- risk / blockers: do not add extra regulatory claims.

## hand-off-live-project-without-losing-sleep

- pillar: Studio
- summary: Draft checklist for client handoff of a live CE platform.
- core thesis: Handoff confidence comes from reproducibility and credential discipline, not a nice farewell email.
- visual choices (in order):
  1. HeroCallout - live handoff is an engineering checklist.
  2. ChecklistBlock - nine-item launch handoff checklist.
  3. Mermaid sequence - operator handoff, client test, credential rotation, final signoff.
- estimated effort: medium
- risk / blockers: no screenshots unless real client-approved visuals exist.

## hello-world

- pillar: Studio
- summary: Short published blog launch note.
- core thesis: The blog exists to document practical lessons from building and shipping.
- visual choices (in order):
  1. Real brand image - use existing Go7Studio banner.
  2. HeroCallout - "building in public, with receipts."
- estimated effort: small
- risk / blockers: keep it lightweight because the post is intentionally short.

## nineteen-bugs-failure-pattern-atlas

- pillar: Studio
- summary: Draft atlas of recurring pipeline failure patterns and canary tests.
- core thesis: Failure patterns become assets when every postmortem produces a guard.
- visual choices (in order):
  1. HeroCallout - every bug should leave a canary.
  2. DecisionMatrix - failure pattern, symptom, guard, canary.
  3. Existing Mermaid diagrams - keep as pattern flows.
- estimated effort: medium
- risk / blockers: do not invent extra bugs; use the 19 already in body.

## ninety-days-of-compounding

- pillar: Studio
- summary: Draft on slow AdMob/IAP compounding for Empire Tycoon.
- core thesis: The slope matters more than the spike for a one-person studio.
- visual choices (in order):
  1. Real image collage - Empire Tycoon screenshots plus existing revenue tables.
  2. HeroCallout - respect the slope.
  3. DecisionMatrix - product levers vs network tailwinds.
- estimated effort: medium
- risk / blockers: no fake charts; use article's actual numbers and text sparkline only.

## one-config-line-slowed-the-studio

- pillar: AI Lab
- summary: Draft postmortem on a global reasoning-effort config slowing studio throughput.
- core thesis: Reasoning effort is a per-call budget decision, not a global preference.
- visual choices (in order):
  1. HeroCallout - global `xhigh` is a tax.
  2. DecisionMatrix - global config vs per-call routing.
  3. Existing diff/code/Mermaid - keep.
- estimated effort: small
- risk / blockers: do not add new benchmark numbers.

## pet-paradise-on-hold

- pillar: Studio
- summary: Draft explaining why a high-upside unshipped Roblox project remains frozen.
- core thesis: A project can be frozen deliberately when the resume gate is explicit.
- visual choices (in order):
  1. Real project art - use `pet-paradise-promo.jpg` inline.
  2. HeroCallout - freeze, do not drift.
  3. Existing Mermaid bottleneck/quadrant - keep.
- estimated effort: small
- risk / blockers: no generated replacement art; use current promo.

## petra-reddit-signup

- pillar: AI Lab
- summary: Published post on building a posting agent before the account surface existed.
- core thesis: Credentials before code; gates turn missing surfaces into safe idle.
- visual choices (in order):
  1. HeroCallout - accounts before agents.
  2. DecisionMatrix - gate before signup vs after signup.
  3. Existing Mermaid timeline - keep.
- estimated effort: small
- risk / blockers: do not suggest automating platform signup.

## picking-mobile-game-names

- pillar: Studio
- summary: Draft on ASO-driven mobile game naming decisions.
- core thesis: Name for the player search surface before the package identifier gets expensive to change.
- visual choices (in order):
  1. Real portfolio image strip - Empire/Sortbloom/Rampart icons where relevant.
  2. HeroCallout - name for the feeling, then test search.
  3. DecisionMatrix - pre-launch vs post-launch rename cost.
- estimated effort: medium
- risk / blockers: no live ASO volume lookup unless separately verified; use existing article figures.

## reading-audit-logs-highest-roi-habit

- pillar: AI Lab
- summary: Draft on audit-log reading as an operator habit.
- core thesis: Audit logs compound because they reveal the work that chat summaries flatten.
- visual choices (in order):
  1. HeroCallout - logs are the operator dashboard.
  2. TimelineSteps - morning scan loop.
  3. Existing Mermaid/code - keep.
- estimated effort: small
- risk / blockers: none.

## scout-ivy-disabled-before-posting

- pillar: AI Lab
- summary: Published post on disabling two SEO agents before they had valid output surfaces.
- core thesis: Correct code without a real destination is still an agent that should stay offline.
- visual choices (in order):
  1. HeroCallout - surface first, cron second.
  2. DecisionMatrix - pre-flight questions and pass/fail status.
  3. Existing Mermaid flow - keep.
- estimated effort: small
- risk / blockers: none.

## shipped-4-games-with-ai-in-30-days

- pillar: thought-leadership
- summary: Published case-study style post on shipping four games with three AI agents in 30 days.
- core thesis: AI agents removed repeatable bottlenecks, but the human still owned game feel, taste, and platform judgment.
- visual choices (in order):
  1. Existing real screenshots - keep Stakd, Empire Tycoon, and Rampart images already in the article.
  2. HeroCallout - frame the sprint as role separation, not crunch.
  3. KeyTakeaways - where AI helped, where the human remained load-bearing, what changed after the sprint.
- estimated effort: small
- risk / blockers: keep older result figures exactly as written.

## six-hundred-sixty-two-courses-silent-exclusion-bug

- pillar: Studio
- summary: Draft postmortem on an `.imscc` recursion bug hiding source files from the extractor.
- core thesis: A dashboard can show motion while the actual content is unreachable.
- visual choices (in order):
  1. HeroCallout - queue visibility is not extractability.
  2. Mermaid flow - visible queue state vs hidden archive recursion.
  3. DecisionMatrix - tracked, extractable, processable, publishable.
- estimated effort: medium
- risk / blockers: no extra course counts beyond body.

## sixteen-extractors-eight-formats-cost-matrix

- pillar: Studio
- summary: Draft format/extractor cost matrix for public-domain course ingestion.
- core thesis: Extraction safety comes from routing by format and cost, not one universal parser.
- visual choices (in order):
  1. HeroCallout - dispatcher order is safety.
  2. Existing cost matrix/table - keep and improve with a DecisionMatrix if needed.
  3. Existing Mermaid dispatcher diagrams - keep.
- estimated effort: small
- risk / blockers: preserve known Storyline gap language.

## sixty-python-script-factory-cleans-real-public-courses

- pillar: Studio
- summary: Draft tour of the Qualora ingestion factory and its state machine.
- core thesis: Sixty scripts only work when the pipeline is a state machine with refusal rights.
- visual choices (in order):
  1. HeroCallout - scripts hang off a contract.
  2. Existing Mermaid phase/state diagrams - keep.
  3. DecisionMatrix - phase, contract, halt condition, canary.
- estimated effort: medium
- risk / blockers: keep phase counts consistent with article.

## standalone-backfill-scripts-pipeline-gaps

- pillar: Studio
- summary: Draft on one-off backfill scripts becoming invisible pipeline dependencies.
- core thesis: A script that quietly carries production value belongs in the pipeline.
- visual choices (in order):
  1. HeroCallout - standalone scripts are hidden pipeline steps.
  2. Existing Mermaid wire-in flow - keep.
  3. ChecklistBlock - audit pattern for finding hidden scripts.
- estimated effort: small
- risk / blockers: none.

## state-file-architecture-memory

- pillar: AI Lab
- summary: Draft on state files, dated memory, topic memory, and the boot index.
- core thesis: Load-bearing state belongs in files that sessions can read, grep, and commit.
- visual choices (in order):
  1. HeroCallout - context windows are scratch paper.
  2. Existing Mermaid three-layer memory diagram - keep.
  3. DecisionMatrix - state file vs dated memory vs topic memory.
- estimated effort: small
- risk / blockers: none.

## three-conversations-stopped-having

- pillar: AI Lab
- summary: Draft on replacing common AI-ops reflexes with operational discipline.
- core thesis: The upgrade is usually discipline, not more agents, larger models, or parallelism.
- visual choices (in order):
  1. HeroCallout - discipline beats capacity.
  2. DecisionMatrix - old conversation, reframe, discipline added, failure prevented.
  3. Existing Mermaid handoff comparison - keep.
- estimated effort: small
- risk / blockers: fix any stale internal links while editing if found.

## transcript-aware-lesson-player-client-signoff

- pillar: Studio
- summary: Draft on a transcript-aware CE video player that closed client signoff.
- core thesis: Learning video UX needs searchable, clickable transcript behavior, not entertainment-player defaults.
- visual choices (in order):
  1. HeroCallout - learner control won the demo.
  2. Mermaid sequence - transcript click, seek, progress, compliance update.
  3. DecisionMatrix - default player vs transcript-aware player.
- estimated effort: medium
- risk / blockers: no client screenshots unless approved assets exist.

## two-pipelines-generated-garbage-two-generated-gold

- pillar: Studio
- summary: Draft comparing skeleton modernization and content-first rebuild outcomes.
- core thesis: The source-material threshold decides whether skeleton generation is safe or detached.
- visual choices (in order):
  1. HeroCallout - route by source depth.
  2. DecisionMatrix - thin source vs rich source, skeleton vs content-first.
  3. Existing Mermaid threshold flow - keep.
- estimated effort: medium
- risk / blockers: do not name unmentioned courses.

## views-vs-buyers

- pillar: Studio
- summary: Published Empire Tycoon metrics post replacing vanity views with buyer metrics.
- core thesis: Buyer metrics change what gets built; view metrics only change what gets posted.
- visual choices (in order):
  1. Real Empire image - existing gameplay screenshot near the buyer funnel.
  2. HeroCallout - count buyers, not views.
  3. Existing Mermaid funnel and tables - keep.
- estimated effort: small
- risk / blockers: use existing stated numbers only.

## visual-archetype-system-ai-generated-lessons

- pillar: Studio
- summary: Draft on eight visual archetypes and validators for AI-generated lessons.
- core thesis: AI-generated visuals stop looking generic when the system chooses a pedagogical archetype before layout.
- visual choices (in order):
  1. HeroCallout - visual structure is pedagogy, not decoration.
  2. DecisionMatrix - eight archetypes, intended use, validator.
  3. Existing Mermaid validation flows - keep.
- estimated effort: medium
- risk / blockers: no generated lesson screenshots.

## whisper-three-pass-quiz-generator-21-questions

- pillar: Studio
- summary: Draft on Whisper transcription plus three quiz-generation passes.
- core thesis: Multiple cognitive passes prevent quiz-shape collapse.
- visual choices (in order):
  1. HeroCallout - one prompt yields one cognitive shape.
  2. Existing Mermaid 3-pass architecture - keep.
  3. DecisionMatrix - factual, application, slide-specific pass roles.
- estimated effort: small
- risk / blockers: keep stated cost figures unchanged.

## work-orders-that-survive-agent-handoff

- pillar: AI Lab
- summary: Draft field manual for four-line agent work orders.
- core thesis: A work order survives handoff when objective, acceptance, files, and branching are explicit.
- visual choices (in order):
  1. HeroCallout - goals are not contracts.
  2. DecisionMatrix - Objective, Acceptance, Files, Branching.
  3. Existing Mermaid handoff sequence - keep.
- estimated effort: small
- risk / blockers: none.
