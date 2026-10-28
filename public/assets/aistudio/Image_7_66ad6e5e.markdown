---
name: SmartTable QR
colors:
  surface: '#f9f9fc'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#a73a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd651e'
  on-secondary-container: '#571a00'
  tertiary: '#005f29'
  on-tertiary: '#ffffff'
  tertiary-container: '#087a38'
  on-tertiary-container: '#a3ffb2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#95f8a7'
  tertiary-fixed-dim: '#79db8d'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.02em
  price-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system defines a high-end dining and contactless hospitality experience. It bridges intuitive digital interactions with the tactile refinement of physical fine-dining collateral. The interface balances high operational efficiency for table turnover and kitchen tracking with a serene, luxurious guest browsing flow.

The design language balances **Modern Minimalism** with **Warm Tactile Elements** and selective **Glassmorphism**:
- Generous, breathable negative space reminiscent of editorial tasting menus.
- Rich, earthy emerald accents evoking organic ingredients and fresh culinary artistry.
- Appetite-inducing amber-orange pops for dynamic actions, pairings, and urgent table-side states.
- Polished, frosted overlays for sticky ordering bars, category drawers, and cart sheets that maintain spatial context without cluttering the screen.

## Colors

The palette grounds the interface in culinary sophistication.

### Roles and Application
- **Canvas Base (`#FAF9F6`):** Warm Ivory. Used as the underlying screen surface to eliminate clinical digital glare and mimic premium textured paper stock.
- **Card/Container Surface (`#FFFFFF`):** Crisp pure white for cards, elevated bottom sheets, modal overlays, and focused list modules.
- **Primary Accent (`#0F766E`):** Deep Emerald Green. Dedicated to brand presence, order confirmation actions, primary active navigation elements, and verified states.
- **Secondary Highlight (`#EA580C`):** Warm Amber/Flame. Drives appetite appeal, time-sensitive calls to action ("Order Now", "Chef's Special"), modifier add-buttons, and payment triggers.
- **Tertiary Accent (`#15803D`):** Vivid Leaf Green. Exclusively reserved for dietary markers (Veg icons) and successful kitchen acknowledgments.
- **Neutral Foreground (`#1E2022`):** Deep Charcoal. High-contrast typography for crisp legibility under dimmed restaurant lighting conditions.
- **Neutral Subdued (`#6B7280` / `#9CA3AF`):** Muted slate tones for secondary descriptions, grammages, and ingredient disclosures.
- **Dietary Distinction:**
  - *Vegetarian:* Pure green border (`#15803D`) with centered circular dot.
  - *Non-Vegetarian:* Earthy crimson/brown border (`#991B1B`) with inscribed equilateral triangle.
  - *Contains Alcohol / Signature:* Rich Amber tint (`#FFFBEB`) with deep amber stroke (`#B45309`).

## Typography

The type hierarchy uses **Plus Jakarta Sans** throughout all screen tiers. Its geometric precision combined with subtle humanist curves ensures high readability for dish descriptions, multilingual allergen notices, and rapid bill reconciliation.

- **Display & Section Titles:** Emphasize generous line heights and tight negative tracking (`-0.02em` to `-0.03em`) for a premium editorial presence.
- **Dish Names:** Set in `headline-sm` with semi-bold weighting (`600`) to guarantee instant visual capture in scanning passes.
- **Prices:** Treated with deliberate tabular-like spacing and distinct bold styling to avoid alignment jitter during live recalculations.
- **Nutritional & Allergen Meta:** Uses `body-sm` and `label-sm` with increased letter spacing to remain legible at compact sizes.

## Layout & Spacing

The layout is built on an adaptable 8pt spacing system with fluid container grids:
- **Mobile (Guest QR scan view, <768px):** Single-column fluid stream with fixed `margin` (16px) and `space-md` (16px) gaps between dish cards. Critical interactive components (floating order summary, waiter call button) occupy safe-area-aware sticky anchors.
- **Tablet (Server POS / Kitchen Display, 768px - 1024px):** 6-column grid with `1.5rem` gutters. Splits menu browsing on the left with a persistent real-time running bill drawer on the right.
- **Desktop (Manager Portal / Table Overview, >1024px):** 12-column responsive layout with max-width containment at `1440px`.

Vertical card paddings adhere to `space-md` for standard items and `space-lg` for curated daily specials, preventing dense, utilitarian cafeteria-style clustering.

## Elevation & Depth

Visual hierarchy uses warm, diffuse ambient drop shadows combined with translucent glass layers:

1. **Flat Level (Canvas):** Pure `#FAF9F6` base without shadow.
2. **Surface Layer (Menu Cards, Table Grid Blocks):** `#FFFFFF` paired with an ultra-soft, warm-tinted shadow: `0 2px 8px -2px rgba(30, 32, 34, 0.04), 0 1px 3px 0 rgba(30, 32, 34, 0.02)`. Bordered by a hairline stroke: `1px solid rgba(30, 32, 34, 0.05)`.
3. **Floating Interactive (Category Tabs, Add Steppers):** Slightly lifted: `0 8px 16px -4px rgba(30, 32, 34, 0.08), 0 2px 4px -1px rgba(30, 32, 34, 0.04)`.
4. **Docked Overlays (Bottom Sticky Cart, Order Drawer, Live Bill Sheet):** Glassmorphic treatment with `backdrop-filter: blur(16px); background: rgba(250, 249, 246, 0.88); border-top: 1px solid rgba(255, 255, 255, 0.6)`. Shadows cast upward: `0 -10px 25px -5px rgba(30, 32, 34, 0.06)`.
5. **Modal Confirmation (Payment, Waiter Assist, Wine Details):** Centered presentation with `0 20px 30px -10px rgba(15, 118, 110, 0.12), 0 10px 15px -3px rgba(30, 32, 34, 0.08)`.

## Shapes

The design system adopts **Level 2 (Rounded)** curvature:
- Standard buttons, text inputs, dietary badges, and quantity selectors utilize `0.5rem` (`8px`) corner radiuses.
- Menu dish cards, category highlight tiles, and order summary blocks use `rounded-lg` (`1rem` / `16px`).
- Modal sheets, persistent bottom drawers, and featured chef banners use `rounded-xl` (`1.5rem` / `24px`).
- Category filter pills, counter triggers, and status chips leverage full pill styling (`9999px`) to invite thumb taps.

## Components

### Buttons
- **Primary Action (Checkout, Place Order):** Solid `#0F766E` fill, `#FFFFFF` text, `rounded-md`, 48px mobile touch height. On press: deepens to `#115E59` with subtle tactile scale reduction (`0.98`).
- **Accent Highlight (Add to Cart, Reorder):** Crisp `#EA580C` fill or white container with a 1.5px `#EA580C` border and matching text.
- **Secondary / Ghost (Modifiers, View Allergen):** Transparent background with `1px solid rgba(30, 32, 34, 0.12)`, text `#1E2022`.

### Menu Item Cards
- Rendered on pure `#FFFFFF` with `rounded-lg` boundaries and hairline border.
- Layout features dish title and price pinned at top, description clamped to two lines, dietary icon placed adjacent to the title, and a 1:1 rounded photography frame (`rounded-md`) alongside or above.
- Floating `+ Add` button positioned at the card's bottom-right corner, converting into an increment/decrement stepper upon item addition.

### Dietary Badges & Indicators
- **Vegetarian Badge:** Square (`16px × 16px`) with rounded edges (`3px`), `#15803D` border (1.5px), containing a solid `#15803D` central circle (`7px`).
- **Non-Vegetarian Badge:** Square (`16px × 16px`) with rounded edges (`3px`), `#991B1B` border (1.5px), containing a solid `#991B1B` equilateral triangle.
- **Live Status Chips:** Pill-shaped markers (`rounded-full`) with glowing dot indicators:
  - *Order Placed:* Pale Amber background (`#FEF3C7`), text `#92400E`.
  - *In the Kitchen:* Pale Blue background (`#E0F2FE`), text `#075985`.
  - *Served:* Soft Emerald background (`#D1FAE5`), text `#065F46`.

### Inputs & Quantity Steppers
- **Search & Special Instructions:** Warm ivory fill (`#FAF9F6`), `1px solid rgba(30, 32, 34, 0.1)`, `rounded-md`, focused border transitions to emerald `#0F766E`.
- **Quantity Steppers:** Compact horizontal pill capsule (`36px` height) featuring tactile `-` and `+` triggers with center value display in `label-md`.

### Table & Order Management Grid
- Server-facing view presents table nodes in high-contrast tiles: active occupied tables show elapsed dining duration and total run balance; available tables remain clean white with faint emerald boundary lines.