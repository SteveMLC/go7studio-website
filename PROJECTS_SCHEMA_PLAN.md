# Go7Studio Projects Schema + Rollout Plan

**Date:** 2026-04-13  
**Purpose:** Create a first-class way to showcase non-game products on go7studio.com, starting with **Qualora** and **NEALAC**.

---

## 1. Core Decision

**Do not place Qualora or NEALAC under `Games`.**

They are not game projects, and forcing them into the game IA would make the site feel confused. Go7Studio should present them as serious, polished product work with strong UX and visual identity.

### Recommended structure
- `/games` = games only
- `/projects` = non-game products, platforms, client systems, tools
- `/case-studies` = long-form story / SEO / process breakdowns

### Working model
- `/projects/qualora` = polished product showcase page
- `/projects/nealac` = polished product showcase page
- `/case-studies/qualora-platform` = deeper narrative page
- `/case-studies/nealac-learning-hub` = deeper narrative page

This gives us:
1. a clean portfolio / showcase layer
2. a strong SEO / storytelling layer
3. room for future non-game work without polluting the Games section

---

## 2. IA Changes

### Main nav
Add:
- `Projects`

Recommended top-level nav:
- Home
- Games
- Projects
- Services
- Insights
- About
- Contact

### Homepage changes
Add a new homepage section:
- **Featured Projects**

This section should sit alongside, not inside, the games presentation. The tone should feel like:
- polished digital products
- design-forward builds
- real systems with thoughtful UX

Initial featured entries:
- Qualora
- NEALAC

### Cross-linking
Each project page should link to:
- related case study
- related insight/blog posts
- services/contact page
- live site if appropriate

---

## 3. Positioning Rules

### Qualora
Frame as:
- a modern workforce education platform
- polished delivery for restructured, real-source training content
- career-aware, catalog-driven, trust-conscious learning UX

**Important copy rule:** do **not** describe Qualora as “AI-generated.”  
Qualora content should be positioned as reshaped from real human source material, with provenance handled carefully.

### NEALAC
Frame as:
- a polished learning hub / continuing education platform
- strong course player UX
- rich transcript, chapter, quiz, flashcard, and video experience

### Tone for both
The site should make these feel:
- healthy
- modern
- visually strong
- useful
- credible
- fun to explore without becoming childish

---

## 4. New Content Model

## 4.1 Folder structure

```text
src/content/projects/
  qualora.mdx
  nealac.mdx

src/app/projects/page.tsx
src/app/projects/[slug]/page.tsx

src/components/projects/
  ProjectCard.tsx
  ProjectHero.tsx
  ProjectHighlights.tsx
  ProjectMetrics.tsx
  ProjectMediaGallery.tsx
  ProjectTechStack.tsx
  ProjectCtaBand.tsx
  ProjectStructuredData.tsx
```

## 4.2 TypeScript schema

Add a new project content type in `src/lib/content.ts`.

```ts
export type ProjectStatus =
  | "live"
  | "beta"
  | "in-development"
  | "client-work"
  | "internal";

export type ProjectCategory =
  | "education-platform"
  | "learning-hub"
  | "client-platform"
  | "internal-product"
  | "creative-tool"
  | "saas";

export type ProjectMediaType = "image" | "video" | "embed";

export type ProjectMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ProjectHighlight = {
  title: string;
  description: string;
  icon?: string;
};

export type ProjectMedia = {
  type: ProjectMediaType;
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  aspectRatio?: "16:9" | "4:3" | "3:2" | "1:1" | "phone";
  featured?: boolean;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "case-study" | "live" | "contact";
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  date: string;
  modified?: string;
  excerpt: string;
  status?: "published" | "draft";
  projectStatus: ProjectStatus;
  category: ProjectCategory;
  client?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  tags: string[];
  roles?: string[];
  platforms?: string[];
  industries?: string[];
  featuredVideo?: string;
  links?: ProjectLink[];
  metrics?: ProjectMetric[];
  highlights?: ProjectHighlight[];
  media?: ProjectMedia[];
  stack?: string[];
  relatedCaseStudySlug?: string;
  relatedPostSlugs?: string[];
};

export type Project = ProjectFrontmatter & {
  content: string;
  readingTime: string;
};
```

## 4.3 MDX frontmatter example

```mdx
---
title: "Qualora"
slug: "qualora"
date: "2026-04-13"
modified: "2026-04-13"
excerpt: "A workforce learning platform built to turn real training material into a modern, career-aware learning experience."
status: "published"
projectStatus: "live"
category: "education-platform"
featured: true
seoTitle: "Qualora Project Showcase | Go7Studio"
seoDescription: "See how Go7Studio designed and built Qualora, a modern workforce education platform with strong UX, trust, and learning structure."
ogImage: "/images/projects/qualora/og.jpg"
tags:
  - education
  - workforce-training
  - learning-platform
  - ux
roles:
  - Product Design
  - Frontend UX
  - Content Systems
  - Platform Architecture
platforms:
  - Web
industries:
  - Education
  - Workforce Training
featuredVideo: "/videos/qualora/hero.mp4"
links:
  - label: "Visit Qualora"
    href: "https://qualora.io"
    kind: "primary"
  - label: "Read Case Study"
    href: "/case-studies/qualora-platform"
    kind: "case-study"
metrics:
  - label: "Published Courses"
    value: "34"
  - label: "Active Career Tracks"
    value: "32"
highlights:
  - title: "Career-aware learning UX"
    description: "Courses, pathways, and positioning designed around real learner outcomes."
stack:
  - Next.js
  - TypeScript
  - MDX
  - Postgres
  - R2
---
```

---

## 5. Page Template for `/projects/[slug]`

Each project page should use the same visual structure so the section feels intentional.

### Section order
1. **Hero**
   - project title
   - one-line positioning
   - status + category badges
   - CTA buttons

2. **Hero media**
   - Qualora should feature the Remotion video near the top
   - NEALAC should feature strong screenshots or a UI walkthrough clip

3. **What it is**
   - what the product does
   - who it is for
   - why it matters

4. **Highlights**
   - 3 to 6 feature/design cards
   - product-level benefits, not random feature dumping

5. **Design decisions**
   - clarity
   - navigation
   - accessibility
   - motion
   - trust / information architecture

6. **Media gallery**
   - screenshots
   - device frames
   - short clips
   - before/after visuals if useful

7. **Build notes / stack**
   - tech stack
   - systems thinking
   - content architecture
   - integrations

8. **Proof / outcomes**
   - verified metrics only
   - if hard metrics are limited, use validated product facts instead

9. **Related links**
   - case study
   - live site
   - insights/blog posts
   - contact CTA

10. **Final CTA band**
   - “Want something like this for your product?”
   - drives service/contact discovery

---

## 6. Visual Direction

These pages should feel like **product showcases**, not generic agency portfolio entries.

### Visual ingredients
- strong hero gradients
- glass / layered cards
- big visual media blocks
- tasteful motion
- device framing where helpful
- short, punchy UI explanation cards
- clear CTA bands

### Design goal
Make the site communicate:
- Go7Studio builds games **and** serious digital products
- the team has taste
- the work is structured
- the work is modern
- the work is alive

---

## 7. Qualora Page Plan

## 7.1 Positioning
**Qualora** should read like a flagship education product.

### Hero message direction
Possible angle:
> Workforce learning, rebuilt for clarity, trust, and momentum.

### Best hero media
- the Remotion brand/product video
- fallback: polished screenshot montage if video is not ready

## 7.2 Sections to include
1. Hero + video
2. What Qualora is
3. Trust + provenance + structure
4. Catalog / pathways / careers UX
5. Course experience highlights
6. Platform stack + systems notes
7. Verified proof / product facts
8. Related case study + visit Qualora CTA

## 7.3 Good highlight card ideas
- Career-aware catalog structure
- Trust-conscious course framing
- Clean course flow and learning progression
- Modern workforce training design language
- Content system shaped from real source material
- Scalable media + content delivery pipeline

## 7.4 Qualora content guardrails
- Do not call it “AI-generated”
- Do not overclaim accreditation or institutional ownership
- Emphasize product design, clarity, delivery, structure, and UX
- Where provenance matters, describe it carefully and truthfully

---

## 8. NEALAC Page Plan

## 8.1 Positioning
**NEALAC** should read like a polished professional learning platform / learning hub.

### Hero message direction
Possible angle:
> A cleaner, more usable learning hub built for serious course consumption.

## 8.2 Sections to include
1. Hero
2. What the platform does
3. Course player UX decisions
4. Video + transcript + chapter system
5. Quiz / flashcard / accessibility polish
6. Design system notes
7. Outcomes / shipped improvements
8. Case study + contact CTA

## 8.3 Good highlight card ideas
- Transcript-first course player UX
- Sticky navigation and reduced friction layout
- Custom video controls with chapter-aware behavior
- Quiz and flashcard usability improvements
- Accessibility and keyboard support
- Performance / DB polish

## 8.4 NEALAC proof points already known
Use validated product improvements such as:
- transcript auto-scroll fix
- sticky sidebar
- duplicate header cleanup
- glossary formatting cleanup
- flashcard shuffle + keyboard accessibility
- multi-select quiz submission fix
- DB indexes
- custom video controls
- interactive progress bar
- caption CSS polish

These are strong “shipped product improvement” signals even without external growth metrics.

---

## 9. Relationship to Case Studies

Projects and case studies should be related but not identical.

### Project page = showcase
- polished
- visually driven
- short-to-medium length
- conversion-oriented

### Case study page = deep dive
- challenge
- constraints
- decisions
- implementation
- outcomes
- lessons

### Recommendation
Each project should eventually get a matching long-form case study.

Initial targets:
- `qualora-platform`
- `nealac-learning-hub`

---

## 10. SEO + Structured Data

## 10.1 Metadata
Each project page should include:
- unique title
- unique description
- OG image
- canonical URL
- project-specific keywords

## 10.2 Sitemap / feed
Update the content pipeline so projects are included in:
- sitemap
- any XML/feed logic where relevant

## 10.3 Structured data
Add a dedicated project structured data component.

Recommended direction:
- `SoftwareApplication` or `WebPage` + `CreativeWork`, depending on truthfulness and page framing
- avoid overcomplicating this on v1

## 10.4 Internal linking
Project pages should receive links from:
- homepage
- services page
- related insights/blog posts
- case studies page

---

## 11. Implementation Plan

## Phase 1 — Foundation
1. Add `Projects` to nav
2. Create `src/content/projects/`
3. Extend `src/lib/content.ts` with project parsing helpers:
   - `getAllProjects()`
   - `getPublishedProjects()`
   - `getProjectBySlug()`
4. Create:
   - `/projects`
   - `/projects/[slug]`
5. Add initial entries:
   - Qualora
   - NEALAC

## Phase 2 — Reusable UI
Build:
- `ProjectCard`
- `ProjectHero`
- `ProjectHighlights`
- `ProjectMediaGallery`
- `ProjectTechStack`
- `ProjectCtaBand`
- `ProjectStructuredData`

Reuse the strongest parts of the current game detail layout where useful, but do **not** force game-specific assumptions into project pages.

## Phase 3 — Homepage + discoverability
1. Add a **Featured Projects** section to homepage
2. Link projects from Services
3. Link project pages to related case studies and insights
4. Include projects in sitemap

## Phase 4 — Content polish
1. Add Qualora Remotion video
2. Add real screenshots/media galleries
3. Add long-form supporting case studies
4. Tune copy for SEO and conversion

---

## 12. Initial Content Requirements

## Qualora assets needed
- Remotion showcase video
- homepage screenshot
- catalog screenshot
- course detail screenshot
- careers/pathways screenshot
- trustworthy OG image

## NEALAC assets needed
- course player screenshot
- transcript/chapter screenshot
- quiz or flashcard screenshot
- video controls screenshot
- OG image

## Copy inputs needed
For each project:
- one-line positioning
- who it serves
- product purpose
- 3 to 6 highlights
- verified proof points
- live URL / CTA target

---

## 13. Acceptance Criteria

This project is successful when:
- Go7Studio has a real `/projects` section
- Qualora and NEALAC each have polished standalone pages
- those pages feel distinct from games
- each page supports both design showcase and trust
- each page can grow into deeper case-study SEO content
- the site can add future non-game projects without IA debt

---

## 14. Recommended First Build Order

1. Create the project schema and parser
2. Create `/projects` index page
3. Create `/projects/[slug]` page
4. Add nav link
5. Publish Qualora project page first
6. Publish NEALAC project page second
7. Add homepage featured projects block
8. Add matching case studies after the showcase pages exist

---

## 15. Final Recommendation

**Games stay games.**  
**Qualora and NEALAC become first-class Projects.**  
**Case studies remain the deep narrative layer behind them.**

This gives Go7Studio a healthier structure, stronger portfolio credibility, and a better way to showcase design-forward non-game work.
