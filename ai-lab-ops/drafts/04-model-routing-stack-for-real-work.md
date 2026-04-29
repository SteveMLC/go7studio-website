# Draft Packet — model-routing-stack-for-real-work

- topic_slug: model-routing-stack-for-real-work
- stage: draft
- research_packet: /Users/venomspike/.openclaw/workspace/repos/go7studio-website/ai-lab-ops/research-packets/04-model-routing-stack-for-real-work.md
- model_used: Walt
- audience: builders and operators using multiple models who want a sane routing strategy
- derivative_candidate: maybe

## Draft

# My Model-Routing Stack for Real Work

The most common AI question used to be:

> Which model is best?

That is not the main question anymore.

If you actually use these tools every day, the real question is:

> Which model should own which stage of work?

That is a routing problem.

And once you start treating it like a routing problem, a lot of the noise disappears.

You stop chasing a universal winner.
You stop rebuilding your workflow every time a new model drops.
You stop expecting one tool to be the best researcher, drafter, critic, coder, and final reviewer all at once.

That is the shift.

In real work, I do not want a favorite model.
I want a reliable stack.

## Why single-model thinking breaks down

Single-model thinking is attractive because it feels simple.
One model, one workflow, one habit.

The problem is that real work is not one thing.

A typical pipeline might involve:
- research
- synthesis
- outlining
- first drafting
- code generation
- review
- polish
- final approval

Those stages do not all reward the same traits.

For some stages, speed matters most.
For others, cost matters most.
For others, the only thing that matters is whether I trust the result enough to put my name on it.

That is why the right stack is usually a routed stack.

## The four routing questions I ask first

Before I assign work to a model, I try to answer four questions.

### 1. What is the real job here?

Not the headline job. The actual one.

Is this:
- research and source gathering?
- first-pass drafting?
- code implementation?
- critique and gap-finding?
- final polish?
- high-stakes final ownership?

A lot of routing mistakes happen because people label the whole workflow instead of the current stage.

### 2. What matters most right now: speed, cost, or trust?

Different stages have different priorities.

For example:
- research often rewards speed and breadth
- first-draft work rewards speed and cost-efficiency
- final publish decisions reward trust and judgment
- code changes with real downside reward validation and review discipline

If you do not define the priority, you will route emotionally instead of operationally.

### 3. Does this stage need a final owner or just a fast pass?

This question saves a lot of money and a lot of confusion.

Not every stage needs the model you trust most.
Sometimes you just need a fast scout.
Sometimes you need a rough draft.
Sometimes you need a critic that can point out missing pieces.

Reserve your strongest final-owner posture for the stages where it matters.
Do not waste it on everything.

### 4. Is context isolation part of the quality strategy?

This is the routing question people skip.

Sometimes the best move is not changing models.
It is splitting contexts.

A fresh session, separate subagent, or isolated review pass can outperform a single giant thread, even if the underlying model is identical.

Routing is not only about which model you use.
It is also about which context boundary you use.

## My current stack by role

I think about model use in roles, not in fandom terms.

### Scout
Purpose:
- gather sources
- read broadly
- synthesize raw material
- find patterns quickly

What I want:
- speed
- long context when useful
- strong first-pass synthesis
- low enough cost that I am not precious about usage

This is where fast research-oriented models can shine.

### Drafter
Purpose:
- turn research into a usable first pass
- create structure
- produce options
- reduce blank-page friction

What I want:
- speed
- reasonable coherence
- low enough cost for iteration
- decent formatting discipline

This stage is not about perfection.
It is about acceleration.

### Critic
Purpose:
- identify weak claims
- catch gaps
- flag unsupported assertions
- tell me where the draft is drifting

What I want:
- useful skepticism
- structural awareness
- ability to detect missing support or muddled framing

This is one reason I like having a separate critique step instead of asking the same run to generate and bless its own work.

### Final owner / polisher
Purpose:
- make the call on the version that is going out
- tighten language
- reduce ambiguity
- improve trustworthiness
- hold the quality bar for external output

What I want:
- judgment
- polish
- reliability
- stronger trust in the final wording or code review posture

This is where I am less interested in raw speed.
I care more about confidence in the output.

## The practical rule: cheap and fast early, trusted later

A lot of routing becomes simpler once you accept this rule:

**Use cheaper and faster models aggressively in early stages.
Use more trusted final-owner models in later stages.**

That does not mean cheap models are bad.
It means the stage determines the standard.

For example:
- a research packet can tolerate rough edges if it surfaces good material quickly
- a first draft can be imperfect if it is easy to rewrite
- a final published piece cannot rely on vibes
- a high-risk code change cannot be trusted just because the first pass looked clean

That is why, in my experience, one of the most valuable routing habits is separating generation from final ownership.

## A simple routing table

Here is the working shape I like.

| Stage | Primary priority | Typical best fit |
|---|---|---|
| Research / scanning | speed + breadth | fast research model |
| First-pass synthesis | speed + cost | fast drafting model |
| Draft critique | structural skepticism | separate critic model or isolated pass |
| Code implementation | task-dependent | coding agent matched to repo/workflow |
| Final polish | trust + clarity | stronger final-owner model |
| Publish-ready review | trust + caution | stronger final-owner model + human review |

The exact names can change over time.
The routing logic stays useful.

## How this looks in my current stack

I try to fill roles first, then pick tools:

- **Fast research role** for broad synthesis and early scanning
- **Fast draft or critic role** for first-pass structure, gap-finding, and QC support
- **Stronger final-owner role** for final polish, code-facing judgment, or higher-stakes output

At any given moment, specific products may fill those roles differently. That is why I prefer to anchor the workflow in roles instead of brand loyalty.

That is not a religion.
It is just a pragmatic routing posture.

The principle is:
- use speed where speed compounds
- use trust where trust is expensive to fake

## Where people waste money and quality

The two most common mistakes are opposite mistakes.

### Mistake 1: using the strongest model for everything

This wastes budget and time on work that did not need premium judgment.

If the stage is just:
- broad research
- idea generation
- first-pass organization
- rough drafting

then over-indexing on your most expensive final-owner model is often wasteful.

### Mistake 2: letting the cheapest model be the final owner

This is the other failure.

A fast cheap model can be excellent at generating motion.
That does not mean it should be the final decider for content, code, or business actions.

Speed is not the same as trust.

## Context contamination changes routing decisions

One reason routed systems work better is that they reduce contamination.

If one model or one thread does everything, early assumptions stick around too long.
A weak first draft can poison later reasoning.
An incorrect early conclusion can steer the whole run.

Separate roles help prevent that.
So do fresh sessions.
So do isolated review passes.

That is why I think of routing as both:
- model selection
- context boundary design

If quality matters, I think both are part of the system.

## The stack should evolve, but the questions stay stable

Specific model choices will change.
That is normal.

What matters is keeping the routing logic stable enough that you do not rebuild your whole process every week.

That means keeping a simple decision framework:
- what stage is this?
- what matters most here?
- does this stage need a final owner or just a fast pass?
- should I isolate context?

If you can answer those four questions well, your stack becomes a lot more resilient to model churn.

## My rule of thumb

If the work is:
- broad
- early
- cheap to revise
- mainly about speed and option generation

I route toward faster models.

If the work is:
- externally visible
- expensive to get wrong
- tied to code risk or brand trust
- close to a final decision

I route toward stronger final-owner models and keep human review in the loop.

That is the whole game.
Not finding the one perfect model.
Building a workflow where each model is asked to do the work it is actually good at.

## CTA direction

- Builder CTA: Follow AI Lab for more real-world workflow systems and routing playbooks.
- Optional learner CTA later if this becomes a job-aligned derivative, not in wave one.

## Open questions
- add one visual routing diagram with scout -> drafter -> critic -> final owner
- maybe add one concrete example pipeline for content and one for code
- verify any pricing references before turning this into a more specific buyer-style post
