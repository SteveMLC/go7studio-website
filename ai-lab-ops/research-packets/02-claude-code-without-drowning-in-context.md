# Research Packet — claude-code-without-drowning-in-context

- topic_slug: claude-code-without-drowning-in-context
- stage: research
- model_used: Walt synthesis
- confidence: 0.9
- source_count: 5
- derivative_candidate: no

## Sources
- title: Claude Code overview
  url: https://code.claude.com/docs/en/overview
  type: official docs
  confidence: high
- title: Work with sessions
  url: https://code.claude.com/docs/en/agent-sdk/sessions
  type: official docs
  confidence: high
- title: Configure permissions
  url: https://code.claude.com/docs/en/agent-sdk/permissions
  type: official docs
  confidence: high
- title: How the agent loop works
  url: https://code.claude.com/docs/en/agent-sdk/agent-loop
  type: official docs
  confidence: high
- title: AGENTS.md
  url: /Users/venomspike/.openclaw/workspace/AGENTS.md
  type: internal operator rules / field notes
  confidence: high

## Key findings
- Context overload is rarely solved by "better prompting" alone. It is mostly a task-shaping and session-management problem.
- Persistent sessions are useful, but they should not become one endless kitchen-sink thread. Fresh sessions, forks, and scoped follow-ups matter.
- A good default structure is: clear goal, relevant context only, constraints, and explicit done criteria.
- Approval rules and permission boundaries are part of context hygiene because they force clearer separations between exploration, editing, and risky actions.
- The strongest article angle is operational: how to keep Claude Code useful in a real repo after the honeymoon period.

## Saturated angles to avoid
- beginner installation walkthroughs
- generic "10 prompts for Claude Code" content
- surface-level IDE feature tours
- pretending the answer is to dump more context into the tool

## Original angle to pursue
- Make this a field guide for staying out of the context swamp.
- Use anti-pattern framing: giant asks, mixed tasks, stale sessions, no done criteria, no subagent isolation.
- Pair each anti-pattern with a replacement habit.
- Include a compact checklist that developers can paste into their own workflow.

## Suggested structure
1. What "drowning in context" actually looks like
2. The 6 habits that keep Claude Code sharp
3. When to continue, when to fork, when to start fresh
4. How approvals and permissions protect focus
5. A sample task brief template
6. A short context-hygiene checklist

## Uncertain claims / verify before publish
- Verify any current keyboard shortcuts or command names before publication
- Distinguish clearly between Claude Code product behavior and Agent SDK documentation when citing concepts
- If referencing specific IDE flows, test them first

## Possible Qualora derivative
None recommended in wave one. This is a builder/operator guide first.
