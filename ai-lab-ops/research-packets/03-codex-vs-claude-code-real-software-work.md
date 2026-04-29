# Research Packet — codex-vs-claude-code-real-software-work

- topic_slug: codex-vs-claude-code-real-software-work
- stage: research
- model_used: Walt synthesis
- confidence: 0.84
- source_count: 7
- derivative_candidate: no

## Sources
- title: CLI — Codex
  url: https://developers.openai.com/codex/cli
  type: official docs
  confidence: high
- title: Best practices — Codex
  url: https://developers.openai.com/codex/learn/best-practices
  type: official docs
  confidence: high
- title: Subagents — Codex
  url: https://developers.openai.com/codex/subagents
  type: official docs
  confidence: high
- title: Claude Code overview
  url: https://code.claude.com/docs/en/overview
  type: official docs
  confidence: high
- title: Configure permissions
  url: https://code.claude.com/docs/en/agent-sdk/permissions
  type: official docs
  confidence: high
- title: memory/tools/codex-cli.md
  url: /Users/venomspike/.openclaw/workspace/memory/tools/codex-cli.md
  type: internal field reference
  confidence: high
- title: AGENTS.md
  url: /Users/venomspike/.openclaw/workspace/AGENTS.md
  type: internal operating rules
  confidence: high

## Key findings
- Codex and Claude Code should be compared as workflows and control surfaces, not as raw-model horse races.
- Both tools are strongest when given clear context, constraints, and explicit completion criteria.
- Codex has strong positioning around local automation, resumable transcripts, subagents, and CLI/scriptability.
- Claude Code has strong positioning around agent-loop clarity, permissions, hooks, sessions, and broader deployment patterns through the Agent SDK.
- The most useful comparison axes are: repo exploration, implementation speed, long-session behavior, approvals, scripting, subagents, and review ergonomics.
- A trustworthy article should recommend by task shape, not by brand loyalty.

## Saturated angles to avoid
- benchmark-score arguments dressed up as product advice
- simplistic "X is better than Y" headlines with no workflow nuance
- comparing underlying models while ignoring tooling and approval boundaries
- pretending feature parity is stable over time

## Original angle to pursue
- Compare the lived experience of doing real work in each tool.
- Use a decision matrix by workflow: bug fix, feature build, code review, repo exploration, repeated automation, high-risk edits.
- Be explicit that both tools evolve quickly, so the recommendation is a dated field report, not eternal truth.
- Anchor part of the piece in Go7Studio's operator posture: use the best tool for the job, then keep human review where it matters.

## Suggested structure
1. Why this comparison is usually done badly
2. What to compare instead: workflow surfaces
3. Where Codex feels stronger
4. Where Claude Code feels stronger
5. Which one we would choose for 6 common tasks
6. The real answer: routing, not fandom

## Uncertain claims / verify before publish
- Run at least one same-repo side-by-side task before finalizing strong claims
- Verify any feature parity statements around subagents, approvals, and IDE support
- Avoid frozen judgments on speed unless tied to a date and workflow type

## Possible Qualora derivative
None recommended in wave one.
