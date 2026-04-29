# Go7Studio AI Lab — Current Source Refresh for Posts 3 and 4

Date: 2026-04-19
Purpose: tighten the remaining AI Lab cornerstone posts against current official docs and make the publish versions more useful to real builders/operators.

## Post 3 — Codex vs Claude Code for Real Software Work

### Primary current sources
- OpenAI Codex CLI overview: https://developers.openai.com/codex/cli
- OpenAI Codex best practices: https://developers.openai.com/codex/learn/best-practices
- OpenAI Codex subagents: https://developers.openai.com/codex/subagents
- Claude Code overview: https://code.claude.com/docs/en/overview
- Claude Code permissions: https://code.claude.com/docs/en/agent-sdk/permissions
- Claude Code sessions: https://code.claude.com/docs/en/agent-sdk/sessions
- Claude Code agent loop: https://code.claude.com/docs/en/agent-sdk/agent-loop

### Safe claims
- Codex is a local coding agent that runs in the terminal, can read/change/run code locally, and supports subagents, scripting, transcripts/resume, and code review workflows.
- Claude Code is an agentic coding tool available across terminal/IDE/desktop/browser, with strong documented concepts around agent loop, permissions, sessions, hooks, and SDK deployment patterns.
- Both tools are more useful when given clear task context, constraints, and done criteria.
- Both products now have enough surface area that workflow and control-model differences matter more than raw model tribalism.

### Claims to caveat / date-stamp
- Any claim about which one is "better" for speed or quality overall
- Any strong claim about superior model intelligence rather than workflow fit
- Any feature-parity claim that could shift quickly
- Any statement that sounds like benchmark analysis instead of practitioner judgment

### Make the article more useful by adding
- a short "what the docs say right now" section
- a buyer/operator checklist: choose based on scripting, approvals, long-running governed workflows, or subagent-heavy work
- a practical default matrix by job type, not by brand preference
- an explicit note that this is an April 2026 field report and should age accordingly

### Recommendation for publish version
- keep the field-report framing in the title or intro
- add one section called `Start here if you're choosing today`
- make the practical table explicitly "my current default" rather than verdict

## Post 4 — My Model-Routing Stack for Real Work

### Primary current sources
- OpenAI Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Claude Code overview: https://code.claude.com/docs/en/overview
- Claude Code permissions: https://code.claude.com/docs/en/agent-sdk/permissions
- Claude Code sessions: https://code.claude.com/docs/en/agent-sdk/sessions
- Claude Code agent loop: https://code.claude.com/docs/en/agent-sdk/agent-loop
- Kimi pricing/docs hub: https://platform.kimi.ai/docs/pricing/chat

### Safe claims
- Routing by task stage is more durable than picking one permanent favorite model.
- Early-stage research/draft work and final-owner/polish work often reward different model traits.
- Context isolation is part of routing, not separate from it.
- Official docs from Codex and Claude Code both emphasize workflow framing, context, permissions, and session handling, which supports a role-based routing approach.
- Kimi's official platform docs clearly position K2.5/K2 class models as API models in a pricing/tool-calling context, which supports talking about them as fast research/drafting candidates without overcommitting to exact performance marketing.

### Claims to caveat / date-stamp
- exact price/performance numbers unless freshly checked per-provider
- naming one model as the permanent best scout/drafter/final-owner
- consensus-sounding statements like "the best way is..."

### Make the article more useful by adding
- a concrete starter routing table a solo builder could use today
- a section on "what to route by role vs what to route by context boundary"
- one mistake list: strongest model everywhere, cheapest model as final owner, one mega-session for everything
- one note that the routing questions are more stable than the product names

### Recommendation for publish version
- publish it as a practical framework, not a review roundup
- keep named models secondary to role labels
- add a short `If you are building solo, start with this` checklist

## Cross-cutting recommendation
Before publishing posts 3 and 4:
- keep explicit date stamps where the product landscape moves fast
- optimize for useful decisions a builder can make today
- avoid decorative hype and benchmark theater
- prefer official docs and workflow behavior over social-media sentiment

## Winnie supplemental memo incorporated (2026-04-19 21:12 ET)

### Additional publish guidance for Post 3
- Treat Codex pricing as less transparent than Claude Code pricing; avoid overclaiming exact Codex standalone economics.
- Add a short cost/ergonomics section only if framed as approximate and date-stamped.
- Keep Codex vs Claude Code explicitly framed as a builder field report, not a benchmark or universal verdict.
- Make the article more useful with a decision matrix tied to real task shape: small tasks, large refactors, production-sensitive work, subagent-heavy work.
- Caveat any rate-limit commentary as user-reported or field-observed rather than official product guarantee.

### Additional publish guidance for Post 4
- Keep routing logic framework-first and role-first: scout, drafter, critic, final owner.
- Date-stamp any pricing references; pricing changes frequently.
- Avoid exposing sensitive internal routing weights or overly specific operational breakdowns.
- Add practical guidance for when not to route: simple use cases, low-complexity teams, or regulated contexts without proper monitoring.
- If mentioning Kimi/MiniMax or similar providers, note data-residency/vendor-jurisdiction considerations without turning the piece into fear theater.

### Cross-cutting
- Distinguish fact from opinion clearly.
- Facts: official features, documented capabilities, public pricing where available.
- Opinion: current preferences, workflow defaults, what works for us.
- Optimize for useful decisions a builder can make today.
