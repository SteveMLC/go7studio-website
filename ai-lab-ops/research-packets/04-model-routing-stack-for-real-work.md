# Research Packet — model-routing-stack-for-real-work

- topic_slug: model-routing-stack-for-real-work
- stage: research
- model_used: Walt synthesis
- confidence: 0.87
- source_count: 6
- derivative_candidate: maybe

## Sources
- title: AGENTS.md
  url: /Users/venomspike/.openclaw/workspace/AGENTS.md
  type: internal operating rules
  confidence: high
- title: TOOLS.md
  url: /Users/venomspike/.openclaw/workspace/TOOLS.md
  type: internal platform notes
  confidence: high
- title: AI_LAB_OPERATING_MODEL.md
  url: /Users/venomspike/.openclaw/workspace/repos/go7studio-website/AI_LAB_OPERATING_MODEL.md
  type: internal strategy doc
  confidence: high
- title: Model Inference Pricing Explanation
  url: https://platform.kimi.ai/docs/pricing/chat
  type: official docs
  confidence: medium-high
- title: Best practices — Codex
  url: https://developers.openai.com/codex/learn/best-practices
  type: official docs
  confidence: high
- title: Claude Code overview
  url: https://code.claude.com/docs/en/overview
  type: official docs
  confidence: high

## Key findings
- The routing problem is no longer "which single model is best?" It is "which model owns which stage of work?"
- A useful routing stack separates scouts, drafters, critics, and polish/final-owner roles.
- Speed and cost models matter most in research, synthesis, and first-pass drafting. Trust, accuracy, and review quality matter most at final-output time.
- Kimi and M2.7 are especially attractive for fast research, broad synthesis, and early draft or QC support. GPT, Claude, and Codex are better candidates for final ownership in higher-stakes flows.
- Routing should also factor in context contamination. Separate sessions and separate agents often outperform one super-thread.
- The article can become one of AI Lab's most useful evergreen references if it stays task-shaped and date-stamped.

## Saturated angles to avoid
- generic tier lists with no workflow context
- fandom-based model takes
- cost-only or benchmark-only comparisons
- pretending routing decisions never change as models improve

## Original angle to pursue
- Publish a real routing table from studio operations.
- Show examples for research, drafting, coding, QC, and final polish.
- Explain why the fastest model is not always the final owner.
- Turn the article into a practical decision aid, not a review roundup.

## Suggested structure
1. Why single-model thinking breaks in real work
2. The 4 routing questions we ask before assigning a model
3. Our current routing table by task shape
4. Where we deliberately keep a stronger final owner
5. Where we use cheap/fast models aggressively
6. How this changes over time

## Uncertain claims / verify before publish
- Verify any exact model pricing or throughput claims before publication
- If sharing internal usage numbers, date-stamp them and confirm they are safe to publish
- Keep statements about MiniMax and Kimi grounded in actual workflow experience, not hype

## Possible Qualora derivative
Possible later derivative: a role-based guide to choosing AI tools for work, but only after the Go7Studio canonical version performs well.
