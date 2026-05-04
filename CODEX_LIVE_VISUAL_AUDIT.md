# Go7Studio Live Visual Audit

Date: 2026-05-04
Scope: live `go7studio.com` sitemap URLs plus reachable app routes that are not in the sitemap (`/insights`, `/hire`, `/education`, `/tiktok-demo`, `/play/*`, `/empire/invite/demo`).

## What I Checked

- 42 live routes.
- Desktop viewport: `1440x1100`.
- Mobile viewport: `390x844`.
- Above-the-fold screenshots for every route.
- Mobile overflow checks on the article templates.
- Route status checks for sitemap and non-sitemap pages.

## Immediate Fixes Applied

- Blog and AI Lab articles no longer horizontally overflow on mobile.
- Article grid wrappers now use `min-w-0`; blog content cards now cap at `max-w-full`.
- Duplicate first `# Title` headings are stripped at content-parse time when they exactly match frontmatter title. Public article pages now render one H1, not two.

## Best Looking Areas

| Area | Grade | Notes |
|---|---:|---|
| Petra article | A | Now has a real control-plane visual language: system overview, timeline, readiness panel, gate matrix, and CTA. This is the current article bar. |
| Empire Tycoon game page | A- | Strong product signal, current logo, real assets, clear CTA. Could use a richer gameplay collage lower on page. |
| Rampart game page | A- | Real troop/castle art gives it the best game-page texture. Hero could be more cinematic with the existing assets. |
| Insights page | A- | The dashboard look feels technical and distinctive. It belongs on the site. |
| Views vs Buyers article | B+ | Good inline Empire visual, strong thesis. Could be pushed to A with one more metric-dashboard visual. |
| Empire First Dollar article | B+ | Strong use of existing Empire art and screenshots. Needs one more revenue/price-shelf visual to feel complete. |

## Good But Visually Under-Leveraged

| Area | Grade | What Holds It Back |
|---|---:|---|
| Homepage | B | Clean and coherent, but first viewport is mostly text. A tech/game studio should show more actual product texture above the fold. |
| AI Lab hub | B | Good structure and theme. Needs stronger editorial cards and more visible post visuals. |
| Games hub | B | Functional and attractive. Cards could use more dynamic cropping, platform/status badges, and richer hover states. |
| Project pages | B- | Clean, but NEALAC and Qualora feel more like portfolio copy than proof. Need product screenshots, diagrams, or UI mock panels. |
| Services/contact | B- | Solid and professional. Could use one compact "studio operating model" visual instead of only cards/form fields. |
| SlimeSlip, Pet Paradise, Sortbloom pages | B- | Good enough, but too dependent on one promo image or icon. Need lightweight game-art montages. |

## Poor / Needs Work

| Area | Grade | Problem |
|---|---:|---|
| Blog hub | C+ | Reads like a text index. No thumbnails, no featured lead card, weak distinction between pillars. |
| Case studies hub | C | Very sparse. It does not sell the depth of the work. |
| Empire case study page | C | Too thin visually for a case study. Needs timeline, before/after, metrics, screenshots, and game-art proof. |
| Non-Petra AI Lab articles | C+ to B- | Many are readable, but top folds are text plus repeated generic components. They need custom diagrams, matrices, and article-specific visuals. |
| Hello World article | C+ | Fine as a launch note, but visually shallow. Could be archived lower or given a small studio-origin visual. |
| Education page | C | Has a placeholder app screenshot block. Needs a real screenshot or generated clean app-frame. |
| TikTok demo page | C+ | Functional, but it feels like a utility callback page rather than a polished branded surface. |
| `/play/stakd` | D | The deep link lands on a Google Play not-found style page. If Stakd is now Sortbloom, this should redirect to the current game page or current store listing. |

## Navigation And Layout

- Desktop header is clean and compact.
- Mobile header is usable; menu/Discord icons are small but acceptable.
- Footer is coherent, but the newsletter input/subscribe layout is cramped on mobile. Stack the button below the input on narrow screens.
- `/hire` redirects into `/services`; fine technically, but there is no distinct visual promise for hire traffic.
- `/insights` is in the header but missing from the live sitemap. Not visual, but it affects discoverability.

## Blog-Specific Findings

- Petra is the new target bar.
- Published articles now need fewer generic `HeroCallout` blocks and more purpose-built visuals.
- Article pages should use one of these visual patterns every 2-3 sections:
  - Control-plane panels for agent/process posts.
  - Before/after matrices for operational lessons.
  - Timeline strips for build stories.
  - Product-art collages for game posts.
  - Screenshot-backed "evidence" panels for case studies and growth posts.
  - Code or config panels only when the snippet is essential.
- The current blog hub does not show the effort put into article visuals because `BlogCard` does not render thumbnails.

## Asset Direction

- Empire Tycoon: use `public/images/games/empire-tycoon/icon-new.jpg` and existing gameplay/blog images only. Do not use the old logo.
- Rampart: use the existing castle and troop sprite files in `public/images/games/rampart/` for collage-style artwork.
- Pet Paradise, SlimeSlip, Sortbloom: use current promo/icon art as the source, then build simple editorial collages instead of stock-style illustrations.
- AI Lab: prefer designed diagrams, terminal/control-plane UI, and structured matrices. Use generated images only when the post needs a unique conceptual cover and no real artifact exists.

