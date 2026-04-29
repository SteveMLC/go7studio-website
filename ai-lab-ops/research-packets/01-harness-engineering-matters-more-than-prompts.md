# Research Packet — harness-engineering-matters-more-than-prompts

- topic_slug: harness-engineering-matters-more-than-prompts
- stage: research
- model_used: Walt synthesis
- confidence: 0.88
- source_count: 5
- derivative_candidate: maybe

## Sources
- title: Building Claude Code with Harness Engineering
  url: https://levelup.gitconnected.com/building-claude-code-with-harness-engineering-d2e8c0da85f0
  type: external article
  confidence: medium
- title: How the agent loop works
  url: https://code.claude.com/docs/en/agent-sdk/agent-loop
  type: official docs
  confidence: high
- title: Configure permissions
  url: https://code.claude.com/docs/en/agent-sdk/permissions
  type: official docs
  confidence: high
- title: AGENTS.md
  url: /Users/venomspike/.openclaw/workspace/AGENTS.md
  type: internal field notes / operating rules
  confidence: high
- title: AI_LAB_OPERATING_MODEL.md
  url: /Users/venomspike/.openclaw/workspace/repos/go7studio-website/AI_LAB_OPERATING_MODEL.md
  type: internal strategy doc
  confidence: high

## Key findings
- The real leverage in agentic systems comes from the loop around the model: task framing, tool access, approval boundaries, memory, session handling, and review logic.
- Prompts still matter, but prompt quality is downstream of system design once work becomes recurring, stateful, or safety-sensitive.
- The most durable differentiators are not one-off prompt tricks. They are reusable operator patterns: permissions, staged handoffs, subagent isolation, and context control.
- Small teams can adopt harness thinking without enterprise overhead. A lightweight file-based workflow plus review rules already changes outcomes.
- This article should establish AI Lab's thesis: "prompting" is one component, not the system.

## Saturated angles to avoid
- "Prompts are dead" clickbait
- vague wrapper-as-moat claims with no operating detail
- empty philosophy about agents replacing developers
- over-indexing on a single vendor success story without showing transferable lessons

## Original angle to pursue
- Write from the perspective of a small studio actually operating multiple agent workflows.
- Show the concrete harness layers that matter: instructions, loop, permissions, memory, routing, review.
- Use one simple control-plane diagram and one "before vs after harness" example.
- Explain why this matters for apps, games, content systems, and internal ops, not just coding demos.

## Suggested structure
1. The mistake: treating AI quality as a prompt-writing contest
2. What a harness actually is
3. The 5 layers that make workflows reliable
4. Where prompts still matter and where they do not
5. A small-studio example from Go7Studio-style operations
6. What to build first if you are still prompt-centric

## Uncertain claims / verify before publish
- Verify any revenue claims about Claude Code before using them
- Do not imply direct knowledge of Anthropic internals beyond what public docs and the article support
- Keep any "moat" language grounded and avoid overclaiming reproducibility

## Possible Qualora derivative
If adapted later, the derivative angle is not "builder infrastructure" but "AI workflow governance for technical teams using AI at work." That is a maybe, not a first-wave priority.
