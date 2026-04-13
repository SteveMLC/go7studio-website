# Go7Studio Projects Implementation Tracker

**Created:** 2026-04-13 10:35 EDT  
**Owner:** Walt  
**Repo:** `repos/go7studio-website`  
**Spec:** `PROJECTS_SCHEMA_PLAN.md`

---

## Goal

Ship a first-class `Projects` lane on go7studio.com for non-game products, starting with:
- Qualora
- NEALAC

This includes:
- IA update
- reusable project schema
- `/projects` index page
- `/projects/[slug]` detail pages
- structured project content
- homepage discoverability
- truthful, polished copy
- QA and readiness review

---

## Working Principles

- Do **not** place Qualora or NEALAC under `Games`
- Keep `/case-studies` as the deeper narrative / SEO layer
- Keep claims factual and non-inflated
- Do **not** describe Qualora as “AI-generated”
- Favor polished v1 with room to deepen later over bloated first pass

---

## Status Board

- [x] Spec document created (`PROJECTS_SCHEMA_PLAN.md`)
- [x] Execution tracker created
- [x] Implementation lane assigned
- [x] Copy/content lane assigned
- [x] Project content model added
- [x] `Projects` added to nav
- [x] `/projects` index page shipped
- [x] `/projects/[slug]` detail route shipped
- [x] Reusable project components shipped
- [x] Qualora project page drafted
- [x] NEALAC project page drafted
- [x] Homepage featured projects section shipped
- [x] Sitemap/content helpers updated
- [x] Build/lint verification complete
- [ ] Walt QA review complete
- [x] Ready for final polish / deploy handoff

---

## Workstreams

### A. IA + Content Model
**Owner:** Chip  
**Status:** Complete

Delivered:
- extended `src/lib/content.ts` with project parsing helpers
- added MDX-based project model under `src/content/projects/`
- added featured-project helpers for homepage/discovery

### B. Project Routes + Components
**Owner:** Chip  
**Status:** Complete

Delivered:
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- reusable project components for cards, hero, highlights, metrics, media, CTA, and structured data

### C. Site Integration
**Owner:** Chip  
**Status:** Complete

Delivered:
- `Projects` in header nav
- homepage featured projects section
- sitemap + homepage structured data updates

### D. Project Content
**Owner:** Winnie -> Walt -> Chip  
**Status:** Complete for v1

Delivered:
- truthful page copy for Qualora
- truthful page copy for NEALAC
- proof-safe highlights/metrics/CTA structure
- graceful no-broken-assets handling for missing media

### E. QA / Completion
**Owner:** Walt  
**Status:** Ready for Walt QA

Deliverables:
- structural review
- copy truthfulness review
- design/IA review
- build verification review (`npm run build`, `npm run lint` both passed)
- completion summary

---

## Immediate Execution Order

1. Assign Chip implementation lane
2. Assign Winnie copy lane
3. Receive initial copy blocks / implementation progress
4. Merge content into shipped project pages
5. Verify build and UX
6. Review gaps and finish remaining polish

---

## Completion Criteria

This project is complete when:
- Go7Studio has a real `/projects` section
- Qualora and NEALAC each have polished standalone pages
- pages clearly differ from games in framing and structure
- project content is factual and portfolio-strong
- homepage exposes the new section
- code/build pass checks appropriate to repo
- remaining polish items are documented, not hidden

---

## Notes

- Copy intake note (10:37 EDT): Winnie delivered strong raw positioning blocks. Walt performed a truth/scope pass before implementation handoff to avoid unverified counts and overclaims.

Walt is orchestrating this end to end. Chip handles implementation. Winnie supports copy. Walt owns QA, truthfulness, and final completion tracking.
