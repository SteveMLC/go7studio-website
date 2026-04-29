# Go7Studio AI Lab — Handoff Templates

Date: 2026-04-19
Purpose: standardized artifacts between AI Lab stages so the system can become progressively automated.

## 1. Topic brief

```md
# Topic Brief

- topic_slug:
- working_title:
- content_type: guide | comparison | field-note | workflow | governance
- audience:
- core_question:
- why_now:
- desired_outcome:
- possible_qualora_derivative: yes | no | maybe
- notes:
```

## 2. Research packet

```md
# Research Packet — {topic}

- topic_slug:
- stage: research
- model_used:
- confidence:
- source_count:
- derivative_candidate: yes | no | maybe

## Sources
- title:
- url:
- type:
- confidence:

## Key findings
- ...

## Saturated angles to avoid
- ...

## Original angle to pursue
- ...

## Uncertain claims / verify before publish
- ...

## Possible Qualora derivative
- if this becomes job-specific, what is the learner/career angle?
```

## 3. Draft packet

```md
# Draft Packet — {topic}

- topic_slug:
- stage: draft
- research_packet:
- model_used:
- audience:
- derivative_candidate: yes | no | maybe

## Draft
[paste article draft]

## Open questions
- ...
```

## 4. QC packet

```md
# QC Packet — {topic}

- topic_slug:
- stage: qc
- reviewer:
- result: pass | fail | revise

## Issues
- severity:
- section:
- issue:
- recommended fix:

## Decision
- publish-ready? yes/no
- needs human review? yes/no
- Qualora derivative still appropriate? yes/no/maybe
```

## 5. Polish packet

```md
# Polish Packet — {topic}

- topic_slug:
- stage: polish
- final_title:
- meta_description:
- target_keywords:
- CTA_type: builder | builder+learner
- qualora_bridge: none | optional | include

## Final copy
[publish-ready article]

## Assets needed
- thumbnail:
- diagrams/screenshots:
- code blocks validated: yes/no
```

## 6. Publish packet

```md
# Publish Packet — {topic}

- topic_slug:
- stage: publish
- canonical_url:
- publish_date:
- channels:
- utm_links_created: yes/no
- qualora_bridge_used: yes/no

## Distribution copy
### X / LinkedIn / HN / Reddit
- ...
```

## 7. Qualora derivative brief (optional spoke)

Use only when the AI Lab topic cleanly maps to a work/learning outcome.

```md
# Qualora Derivative Brief — {topic}

- source_hub_post:
- target_role:
- learner_problem:
- career angle:
- training CTA:
- what to remove from the builder version:
- what to add for the learner version:
```

## 8. Minimum viable queue states

Use these states from day one, even if managed manually:
- `idea`
- `research`
- `draft`
- `qc`
- `polish`
- `publish`
- `live`
- `derivative`
- `archive`

## 9. Rules

1. No stage advances without its artifact.
2. Kimi/M2.7 can research and draft, but not final-publish.
3. Every post must answer whether a Qualora derivative is warranted.
4. Do not force learner CTAs into posts that are purely builder/operator pieces.
