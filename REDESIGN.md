# Go7Studio Website Redesign (Direction + Implementation Notes)

Goal: keep the current “dark, premium, glassy” vibe but make it **cleaner + more professional**, broaden the positioning beyond “games only”, and remove **all purple**. Also fix product truth (LIVE vs Coming Soon) and add real links.

---

## 1) New Design Direction

### A. Brand positioning (what Go7Studio is)
**Go7Studio builds:**
- **Games** (Android + Roblox)
- **Apps** (e.g. metronome)
- **Services** (design + development for clients/partners)

**Tone:** modern, confident, friendly. “We ship.” Not hypey. Not overly childish.

### B. Tagline / messaging options (pick one)
1. **Games, apps, and playful digital products—built to ship.**
2. **We build fun products: games, apps, and experiences.**
3. **A small studio crafting games, apps, and design-driven experiences.**

### C. Hero section copy (recommended)
**Badge (small pill):**
> Games • Apps • Design/Dev Services

**Headline:**
> We build playful products that feel polished.

**Subhead:**
> Go7Studio creates mobile + Roblox games, handy apps, and design-driven development for partners. Fast iterations, clean UX, satisfying motion, and shipping over talking.

**Primary CTA:**
> View Projects

**Secondary CTA:**
> Work With Us

(If you don’t want a “services” CTA yet, use “About the Studio”.)

### D. About section copy (recommended)
**Title:**
> Small studio. High polish. Built for momentum.

**Body (shorter, more professional):**
> Go7Studio is a small, hands-on team building games and apps with an obsessive focus on usability, performance, and feel. We also partner with creators and teams who need product design and development support—from prototypes to production.

**Principles (replace game-only language):**
- **Fun + UX First** — delightful experiences that still respect the user.
- **Polish Matters** — motion, feedback, and clarity.
- **Ship, Learn, Improve** — launch early, iterate fast.

### E. Information architecture (simple + clear)
- Home
- **Projects** (games + apps)
- **Services**
- About

If keeping scope small for now: Home, Projects, About, Contact.

---

## 1) New Color Palette (NO PURPLE)

### Recommended palette: “Deep Navy + Teal + Lime”
A modern dark base (professional) with a fresh teal and a playful lime highlight.

**Base / surfaces**
- `ink-950` **#070B12** (page background)
- `ink-900` **#0B1220** (header / deep surfaces)
- `ink-800` **#0F1A2E** (cards)
- `ink-700` **#172443** (borders / elevated surfaces)

**Text**
- `text-primary` **#F2F7FF**
- `text-secondary` **#B7C3D6**
- `text-muted` **#7E8CA8**
- `text-link` **#38BDF8** (sky)

**Brand accents**
- `brand-teal` **#2DD4BF**
- `brand-cyan` **#22D3EE** (optional secondary)
- `brand-sky` **#38BDF8**
- `brand-lime` **#A3E635** (sparingly for “live”, highlights)

**States**
- `success` **#22C55E**
- `warning` **#F59E0B**
- `danger` **#EF4444**

**Gradients (allowed, but subtle)**
- Primary gradient: `teal → sky` (`#2DD4BF` → `#38BDF8`)
- Optional “fun” gradient: `teal → sky → lime` (keep opacity low, used only in highlights)

**What to avoid**
- Any purple hues: `#8B5CF6`, `#7C3AED`, etc.
- Heavy multi-stop neon gradients across large areas.

---

## 1) Content Updates (truth + links)

### Empire Tycoon (Android)
- **Status:** LIVE
- **Primary link:** https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon
- **Copy tweak (short):**
  > Build businesses, automate income, and scale from your first shop to a booming empire.

### Pet Paradise (Roblox)
- **Status:** LIVE (not coming soon)
- **Primary link:** Roblox experience URL (recommended format):
  - `https://www.roblox.com/games/<PLACE_ID>/Pet-Paradise`

If you can provide the place id, replace `<PLACE_ID>`.

### SlimeSlip: Don’t Die! (Roblox)
- **Status:** Coming Soon (OK)
- **CTA:** “Follow development” / “Get updates” (avoid fake “notify me” unless there’s a real signup)

### Add APPS section (new)
Add at least one app card:
- **Go7 Metronome** (or actual product name)
  - Status: Live (if live) or Coming Soon
  - Links: App Store / Google Play if available (else placeholder)
  - One-liner: “A clean, musician-first metronome with tap tempo and presets.”

### Add SERVICES section (new)
Simple 3-card layout:
- **Product Design** (UI/UX, design systems)
- **App Development** (React Native / native / web)
- **Game Development** (Roblox / Unity / prototyping)

Include a single CTA: `Contact` (email link or simple form).

---

## 2) Specific Component / File Changes (exactly what to change)

### `tailwind.config.ts`
**Goal:** remove purple from tokens and from component styles.

1) Replace `brand.purple` with new accents:
- Remove:
  - `brand.purple: "#8B5CF6"`
- Add:
  - `brand.teal: "#2DD4BF"`
  - `brand.sky: "#38BDF8"`
  - `brand.lime: "#A3E635"` (optional)

2) Update back-compat aliases:
- Change:
  - `primary` from purple → **teal** `#2DD4BF`
  - `accent` from blue → **sky** `#38BDF8`

3) Update `.btn-primary` gradient + shadow:
- Replace the gradient string with:
  - `linear-gradient(90deg, #2DD4BF 0%, #38BDF8 100%)`
  - (Optional 3-stop) `#2DD4BF 0%, #38BDF8 60%, #A3E635 100%`
- Replace glow/shadow values so they’re teal/sky-based, e.g.:
  - `boxShadow: "0 12px 30px rgba(45,212,191,0.18)"`

4) Update `boxShadow.glow`:
- From purple glow → teal glow

### `src/app/globals.css`
1) Update body background radial gradients:
- Remove any `rgba(139, 92, 246, ...)` purple blobs
- Use subtle teal/sky blobs instead, e.g.:
  - teal: `rgba(45, 212, 191, 0.18)`
  - sky: `rgba(56, 189, 248, 0.16)`

2) Update `.text-gradient`:
- Replace purple→blue→cyan with **teal→sky** (optionally add lime as a small highlight)

3) Update link color in `@layer base a { color: ... }`:
- Set to `#38BDF8` or a `text.link` token

4) Update focus ring color:
- Prefer a teal/sky ring: `rgba(45,212,191,0.45)` or `rgba(56,189,248,0.45)`

### `src/components/home/HeroSection.tsx`
1) Update badge copy:
- From “Fun-first mobile & Roblox games” → **“Games • Apps • Design/Dev Services”**

2) Update headline + subhead to broader scope (see recommended hero copy above).

3) Update ambient background elements:
- Replace the inline gradient and `bg-brand-purple` blob with teal/sky blobs:
  - Replace `bg-brand-purple/25` with `bg-brand-teal/20`
  - Keep one blue/sky blob and one cyan/teal blob for depth

4) Update CTAs:
- “Play Our Games” → “View Projects” (and route should become `/projects` if you rename pages)
- Secondary CTA: “Work With Us” (route to `/#services` or `/contact`)

### `src/components/home/FeaturedGames.tsx`
**Rename recommended:** `FeaturedGames.tsx` → `FeaturedProjects.tsx`

1) Component copy changes:
- Title: “Featured Projects”
- Description: mention games + apps, not only games

2) Data model change (recommended):
- Replace `GAMES` with a more general `PROJECTS` list.
  - Option A (fast): keep `GAMES` but add a second list `APPS`, render two rows.
  - Option B (clean): create `src/lib/projects.ts` with a unified type:
    - `kind: "game" | "app"`
    - `platforms: ("android" | "ios" | "roblox" | "web")[]`

3) Link text:
- “View all games” → “View all projects”

### `src/components/home/AboutSection.tsx`
1) Replace the “games feel alive” framing with broader product framing (apps + services).
2) Update icon color:
- `text-brand-purple` → `text-brand-teal` (or `text-brand-sky`)
3) Update button:
- From “Explore the games” → “See projects” (or “Our work”)

### Game detail pages + data
#### `src/lib/games.ts`
1) Empire Tycoon:
- Keep `status: "released"`
- Update `primaryCtaHref` to the **real** Google Play link:
  - `https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon`

2) Pet Paradise:
- Change `status` to `"released"`
- Change CTA label to something real:
  - `"Play Pet Paradise on Roblox"`
- Set `primaryCtaHref` to the Roblox URL (placeholder until confirmed)

3) SlimeSlip:
- Keep as `coming-soon`
- Replace “Notify me” CTA unless there is a real notify mechanism.
  - Suggested CTA: `"Follow progress"` → link to a devlog page/Discord (once real)

#### `src/app/games/[slug]/page.tsx`
- Replace any purple background blobs:
  - `bg-brand-purple/20` → `bg-brand-teal/20` (or `bg-brand-sky/20`)

#### `src/components/games/GameCard.tsx`
- Hover blobs currently use `bg-primary/20` and `bg-accent/20`.
  - After updating Tailwind aliases (`primary` teal, `accent` sky), this becomes correct automatically.
- Consider changing the status badge text:
  - Released → “LIVE” (more aligned with Roblox/mobile language)

---

## 3) Visual Inspiration (vibe references)
These references match the target: **clean, modern, dark, high-polish**, but still approachable.

1) **Linear** (product-led, clean dark UI): https://linear.app/
2) **Vercel** (minimal, developer-friendly, premium): https://vercel.com/
3) **Raycast** (dark, crisp typography, playful accents): https://www.raycast.com/

(Use these for spacing, typography scale, restrained gradients, and “simple sections with strong hierarchy”.)

---

## Notes / quick wins
- Keep animations subtle and purposeful (fade/slide on load, gentle hover lift).
- Reduce marketing fluff; emphasize shipping and real links.
- Ensure every “Coming Soon” has a real next step (wishlist, Discord, waitlist, or remove).
