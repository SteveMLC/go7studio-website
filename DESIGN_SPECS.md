# Go7Studio.com — Design Specifications (DESIGN_SPECS)

## 1) Visual Direction
Dark, high-contrast, “glass-card” UI with energetic purple/blue gradients. Overall vibe: modern, playful, slightly sci‑fi, but still professional. Motion should feel smooth and premium.

Design keywords: **glow**, **glass**, **neon gradient**, **depth**, **juicy hover**, **fast readability**.

---

## 2) Color System

### Base Neutrals (Dark Theme)
- **Ink 950 (page bg):** `#060612`
- **Ink 900:** `#0B0B1A`
- **Ink 800 (surfaces):** `#11122A`
- **Ink 700 (borders):** `#1B1D3A`
- **Text Primary:** `#F5F7FF`
- **Text Secondary:** `#B9BCE3`
- **Text Muted:** `#8B8FBF`

### Brand Accents
- **Purple (primary):** `#8B5CF6`
- **Blue (secondary):** `#3B82F6`
- **Cyan (spark):** `#22D3EE`
- **Pink (highlight):** `#EC4899`

### Gradients (use liberally)
- **Brand Gradient (hero/CTA):** `linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #22D3EE 100%)`
- **Glow Gradient (cards):** `linear-gradient(135deg, rgba(139,92,246,0.35), rgba(59,130,246,0.25))`
- **Ambient Background:**
  - Radial 1: `radial-gradient(600px circle at 20% 10%, rgba(139,92,246,0.25), transparent 60%)`
  - Radial 2: `radial-gradient(700px circle at 80% 30%, rgba(59,130,246,0.22), transparent 55%)`
  - Radial 3: `radial-gradient(800px circle at 50% 90%, rgba(34,211,238,0.14), transparent 60%)`

### States
- **Success:** `#22C55E`
- **Warning:** `#F59E0B`
- **Danger:** `#EF4444`
- **Focus Ring:** `rgba(59,130,246,0.45)`

### Contrast Targets
- Body text contrast ≥ 4.5:1 on `Ink 950`.
- Muted text still readable (avoid going below `#7A7EB2`).

---

## 3) Typography

### Font Families
- **Headings / Display:** `Space Grotesk` (Google Font)
- **Body / UI:** `Inter` (Google Font)
- **Optional numeric/mono accent:** `JetBrains Mono` (for stats/counters)

### Type Scale (desktop defaults)
- **H1:** 56px / 1.05 / 700 (tracking -0.02em)
- **H2:** 40px / 1.10 / 700
- **H3:** 28px / 1.15 / 650
- **H4:** 22px / 1.20 / 650
- **H5:** 18px / 1.25 / 600
- **H6:** 16px / 1.30 / 600
- **Body (lg):** 18px / 1.65 / 450
- **Body:** 16px / 1.70 / 450
- **Small:** 14px / 1.60 / 450
- **Caption:** 12px / 1.50 / 500 (uppercase optional)

### Mobile Type Adjustments
- H1: 36–40px
- H2: 28–32px
- Body: 16px

### Link Styling
- Default link: `#9AA7FF` (or gradient underline)
- Hover: brighten + underline, transition 150ms.

---

## 4) Layout, Grid, Spacing

### Container Widths
- **Max content width:** 1120px
- **Wide sections (hero):** 1280px allowed
- **Horizontal padding:** 16px (mobile), 24px (tablet), 32px (desktop)

### Spacing Scale (Tailwind-friendly)
Use 4px base scale:
- 4, 8, 12, 16, 24, 32, 48, 64, 96

### Section Rhythm
- Section padding (Y): 64px (mobile), 96px (desktop)
- Section title to content: 24px
- Card grid gap: 16–24px

---

## 5) Components

### 5.1 Buttons
**Primary Button (Gradient):**
- Background: Brand Gradient
- Text: `#0B0B1A` or `#060612` (dark text for contrast against bright gradient)
- Radius: 14px
- Padding: 14px 18px (md), 16px 22px (lg)
- Shadow: `0 12px 30px rgba(139,92,246,0.18)`
- Hover: slight lift `translateY(-1px)`, increase saturation, glow ring
- Active: `translateY(0)`, reduce glow
- Focus: 2px focus ring `rgba(59,130,246,0.45)`

**Secondary Button (Glass):**
- Background: `rgba(255,255,255,0.06)`
- Border: `1px solid rgba(255,255,255,0.10)`
- Text: `#F5F7FF`
- Hover: background `rgba(255,255,255,0.09)`

**Tertiary (Link Button):**
- No background, gradient underline on hover.

### 5.2 Cards (Game / Feature / Stat)
**Glass Card Base:**
- Background: `rgba(17,18,42,0.55)`
- Backdrop blur: 12–16px
- Border: `1px solid rgba(255,255,255,0.10)`
- Radius: 18px
- Shadow: `0 18px 60px rgba(0,0,0,0.35)`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.06)`

**Hover State:**
- Border brightens to `rgba(139,92,246,0.35)`
- Background slightly lighter
- Subtle glow: `0 0 0 1px rgba(59,130,246,0.20)`
- Lift: `translateY(-2px)`

**Game Card Specifics:**
- Thumbnail: 16:9, rounded 14px
- Badges row: platform + status chips
- CTA: small button aligned bottom-right

### 5.3 Badges / Chips
- Background: `rgba(255,255,255,0.08)`
- Border: `1px solid rgba(255,255,255,0.10)`
- Radius: 999px
- Padding: 6px 10px
- Text: 12–13px, medium
- Status colors:
  - LIVE: `rgba(34,197,94,0.18)` border `rgba(34,197,94,0.35)`
  - COMING SOON: `rgba(245,158,11,0.18)` border `rgba(245,158,11,0.35)`

### 5.4 Navbar
- Sticky, translucent blur
- Height: 72px
- Background: `rgba(6,6,18,0.55)` + blur
- Bottom border: `1px solid rgba(255,255,255,0.08)`
- Active link: gradient underline

### 5.5 Footer
- Darker surface `#050510`
- 2–3 columns (Games, Studio, Legal)
- Subtle top border

### 5.6 Forms (Newsletter/Contact)
- Input bg: `rgba(255,255,255,0.06)`
- Border: `1px solid rgba(255,255,255,0.10)`
- Radius: 14px
- Focus: glow ring + border highlight
- Helper text: muted, 12–14px

---

## 6) Motion & Animation (Framer Motion)

### Principles
- Motion should be *short*, *smooth*, and *meaningful*.
- Prefer opacity/translate/scale; avoid excessive rotation.

### Recommended Timing
- Micro-interactions: 120–180ms
- Hover transitions: 150–220ms
- Section reveals: 400–650ms

### Easing
- Standard: `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo-ish)
- Hover: `easeOut` feel

### What Animates
- **Hero background:** slow animated gradient drift (CSS) + subtle particle/noise layer.
- **Section reveal:** fade in + y-translate (12–20px) on scroll.
- **Cards:** hover lift + glow.
- **Stats counters:** count-up when visible.
- **Buttons:** shimmer sweep on hover (optional).

### Reduce Motion
Respect `prefers-reduced-motion`:
- Disable background drift
- Use simple fade instead of translate

---

## 7) Responsive Breakpoints
Align to Tailwind defaults:
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### Layout Rules
- Mobile: single column, stacked CTAs, simplified hero media
- Tablet: 2-column grids for cards
- Desktop: 3-column game grid, hero split layout (copy + media)

---

## 8) Accessibility & SEO Notes (Design-related)
- Minimum tap targets: 44px
- Focus states always visible
- Ensure gradient text has fallback solid color
- Provide alt text patterns for game thumbnails
- Use semantic heading hierarchy (H1 once per page)
