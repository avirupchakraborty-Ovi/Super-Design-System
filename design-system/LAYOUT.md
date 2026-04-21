# LAYOUT.md
## Super Design System — Layout Constraint Rules
`Version 2.6 | Priority: Highest | Overrides: All other files`

---

### System Priority

LAYOUT.md has highest priority.

No rule from:
- PATTERNS.md
- COMPONENT_MAP.md
- UX_RULES.md

may override layout constraints.

---

## 1. Purpose

### What this file controls
- Page shell structure and regions
- Grid system definitions and column rules
- Spacing token enforcement
- Component dimension constraints
- Responsive breakpoints and collapse logic
- Section composition hierarchy and alignment
- Layout state behavior (empty, loading, error)
- Rule priority and conflict resolution

### What this file explicitly does NOT control
- Which component to use → COMPONENT_MAP.md
- How components are composed, ordered, or populated → PATTERNS.md
- Typography tokens, font sizes, or text styling → COMPONENT_MAP.md
- Content density thresholds and pagination rules → PATTERNS.md
- UX grouping, density optimization, and usability → UX_RULES.md
- Visual styling, color, or theming
- Component-internal spacing
- Content, copy, icons, or labels

---

## 2. Page Shell

**S1.** The page shell MUST use exactly one of the following structures:

| Shell Type | Description |
|------------|-------------|
| `sidebar + content` | Fixed or scrollable sidebar on the left, content area on the right |
| `topbar + content` | Fixed topbar across the top, full-width content area below |
| `content-only` | No navigation shell — content occupies the full viewport |

A screen MUST use exactly one shell type. Mixing shell types within the same screen is PROHIBITED.

**S2.** The sidebar MUST use `var(--layout-sidebar-width)` as its fixed width. Hardcoded pixel values MUST NOT be specified alongside this token. It MUST NOT flex, shrink, or grow at any breakpoint where it is visible.

**S3.** The content area MUST fill all remaining horizontal space using `flex-1`. It MUST NOT have a fixed width.

**S4.** The content area background MUST use either `bg-surface-level1` or `bg-surface-level2`. The choice is determined by the screen design — do not default to either without explicit specification.

**S5.** Scroll behavior:
- The content area MUST be vertically scrollable.
- Sidebar scroll behavior depends on configuration:
  - Fixed sidebar → MUST NOT scroll with the content area
  - Scrollable sidebar → MUST scroll independently of the content area

**S6.** The content area MUST use responsive horizontal padding matching R6:
- Mobile: `px-200` (16px)
- Tablet: `sm:px-300` (24px)
- Desktop: `md:px-400` (32px)
- Wide: `lg:px-400` (32px)

The full class string is therefore `px-200 sm:px-300 md:px-400`. `lg:px-400` is redundant (inherits from `md:`) and MUST NOT be added. R6 remains the primary reference for breakpoint values.

**S7.** The content area MUST have `pt-400` (32px) top padding. Applies at all breakpoints. No responsive variation defined.

Exception 1 — `MobilePageHeader` clearance (Mobile and Tablet, Browse mode): The scroll container MUST add additional top padding equal to `var(--layout-mobile-header-height)` so content is not obscured by the fixed header. This is additive — `pt-400` still applies. The combined top offset is `calc(var(--layout-mobile-header-height) + 32px)`.

Exception 2 — `CollapsiblePageHeader` (Desktop and Wide, Browse mode): The collapsed fixed bar sits above the content. The content area below the hero MUST NOT apply `pt-400` — the hero's own internal padding provides the offset. See R17 for full clearance rules.

**S8.** Horizontal scrolling at the page shell level is PROHIBITED at all breakpoints.

*(S9 removed — numbering preserved from S10 onward to maintain external citations)*

**S10.** Four layout types are permitted within the content area:

| Type | Rule |
|------|------|
| `full-stretch` | Content fills the full available width. No max-width applied. |
| `centered` | Content MUST use `var(--layout-content-max-width)` as its max-width constraint and MUST be horizontally centered. Hardcoded pixel values MUST NOT be specified alongside this token. |
| `aside-panel` | At Desktop and Wide, the combined layout (main column + aside panel) is centered as a unit within the content area using `w-fit mx-auto` on the outer wrapper — this shrinks the container to the natural width of its children so auto margins can distribute equally on both sides. The main content column uses `w-[var(--layout-content-max-width)] min-w-0` — a fixed width set by the content max-width token. A secondary panel sits to the right at a fixed width declared as an SP8 approved exception with an inline comment. The aside panel MUST be hidden below the `lg` breakpoint (Wide). At Mobile and Tablet, the outer wrapper and main column use responsive widths — see S15 for the full breakpoint matrix. See S12 for structural rules. |
| `proportional-split` | Equal-width two-column split using `grid grid-cols-2`. Permitted only in creation and editing flows where a real-time live preview is required alongside the form. PROHIBITED on data display screens, dashboards, and settings screens. See S14 for full rules. |

**S11.** The layout type for a screen MUST be declared once and applied uniformly. A screen MUST NOT mix `full-stretch`, `centered`, `aside-panel`, or `proportional-split` for its primary content sections.

**S12.** Aside-panel layout structure (Desktop and Wide — for Mobile/Tablet responsive behavior see S15):
- Outer wrapper: `flex gap-300 w-fit mx-auto` or `flex gap-400 w-fit mx-auto` — `w-fit` shrinks the container to the natural width of its children so that `mx-auto` can distribute remaining space equally on both sides, centering the combined layout as a unit. At Mobile and Tablet, the outer wrapper MUST use `w-full` (with `sm:w-fit sm:mx-auto` at Tablet) per S15.
- Main column: `w-[var(--layout-content-max-width)] min-w-0` — fixed width using the content max-width token at Desktop and Wide. At Mobile, MUST use `w-full`; at Tablet, MUST use `sm:w-[var(--layout-content-max-width)] min-w-0` per S15. MUST NOT use `flex-1`. Hardcoded pixel values MUST NOT be used in place of this token.
- Aside column: fixed width declared as an SP8 approved exception with an inline comment stating the Figma-specified value
- Aside MUST be `sticky top-0` — it MUST NOT scroll with the main content
- Aside MUST be hidden below the `lg` breakpoint (1440px): `hidden lg:block` or equivalent
- The aside panel is supplementary content — it MUST NOT contain the primary content of the screen
- Aside width MUST be consistent across all aside panels on the same screen — varying widths on a single screen are PROHIBITED

**S13.** Page header content alignment by layout type:
- `full-stretch`: Page header inner content spans the full content area width. No constraint applied.
- `centered`: Page header inner content MUST be constrained to `var(--layout-content-max-width)` with `mx-auto`, so the heading and CTAs align with the content below.
- `aside-panel`: The page header inner content's structure varies by breakpoint because the aside panel is hidden below the `lg` breakpoint (S12). Column mirroring only applies when the aside is visible.
  - **Mobile/Tablet:** Page header is hidden entirely — `TaskHeader` replaces it (see R13, Pattern 9 Mobile Shell Mode). The outer container MUST use `hidden md:block`.
  - **Desktop:** Aside is hidden. Page header inner content MUST be constrained to `var(--layout-content-max-width)` with `mx-auto` — matching the centered main column width. Inside, heading uses `flex-1 min-w-0 flex flex-col gap-50`, actions use `flex-none flex items-center justify-end gap-100`. This ensures the header aligns perfectly with the form content below. Column mirroring MUST NOT be applied at Desktop — the aside is not visible, so there is no column to mirror.
  - **Wide:** Aside is visible. Page header inner content MUST mirror the column structure of the content block below. The inner wrapper uses `flex gap-300 w-fit mx-auto` — inside it, the heading occupies a div of `w-[var(--layout-content-max-width)] min-w-0` matching the main column width, and the CTAs occupy a div at the same fixed width as the aside panel declared as an SP8 exception with an inline comment, using `flex-none flex items-center justify-end gap-100`. This ensures the heading left-aligns with the main column and the CTAs right-align with the aside panel edge.
  - The responsive class string for the `aside-panel` page header inner wrapper is therefore `flex gap-300 items-center w-full md:w-[var(--layout-content-max-width)] md:mx-auto lg:w-fit`, with the heading div `flex-1 min-w-0 lg:w-[var(--layout-content-max-width)] lg:flex-none flex flex-col gap-50`, and the actions div `flex-none flex items-center justify-end gap-100 lg:w-[<aside-width>]`.
- `proportional-split`: Page header spans the full content area width, same as `full-stretch`. No column mirroring or max-width constraint applied.

**S14.** Proportional split layout (creation flows with live preview only):
- Permitted only in creation and editing flows where a real-time live preview is required alongside the form
- Structure: `grid grid-cols-2` at Desktop and Wide — both columns equal width (satisfies G4 and G7)
- At Tablet and Mobile: collapse to 1-column — form column visible, preview column hidden
- This layout is PROHIBITED on data display screens, dashboards, and settings screens

**S15.** Responsive behavior matrix by layout type.

For each layout type, the following behavior is MANDATORY at each breakpoint. Screens MUST NOT deviate from this matrix unless a CONSTRAINED PASS is surfaced.

**`full-stretch`**

| Slot | Mobile | Tablet (`sm:`) | Desktop (`md:`) | Wide (`lg:`) |
|------|--------|----------------|-----------------|--------------|
| Content width | `w-full` | `w-full` | `w-full` | `w-full` |
| [page-header] | hidden (`TaskHeader` replaces if Task mode) | hidden (`TaskHeader` replaces if Task mode) | full-width flex, heading `flex-1 min-w-0`, actions `flex-none` right | same as Desktop |

**`centered`**

| Slot | Mobile | Tablet (`sm:`) | Desktop (`md:`) | Wide (`lg:`) |
|------|--------|----------------|-----------------|--------------|
| Content width | `w-full` | `w-full` | `w-[var(--layout-content-max-width)] mx-auto` | same as Desktop |
| [page-header] inner | hidden (`TaskHeader` replaces if Task mode) | hidden (`TaskHeader` replaces if Task mode) | `w-[var(--layout-content-max-width)] mx-auto`, full-width flex inside, actions right | same as Desktop |

**`aside-panel`**

| Slot | Mobile | Tablet (`sm:`) | Desktop (`md:`) | Wide (`lg:`) |
|------|--------|----------------|-----------------|--------------|
| Outer wrapper | `w-full` | `w-full sm:w-fit sm:mx-auto` | `w-fit mx-auto` | `w-fit mx-auto` |
| [main-column] width | `w-full` | `sm:w-[var(--layout-content-max-width)] min-w-0` | `w-[var(--layout-content-max-width)] min-w-0` | same as Desktop |
| [aside-panel] | hidden; critical content surfaced inline in [main-column] | hidden; same rule as Mobile | hidden | visible at declared SP8 width (e.g. `w-[260px]`), `sticky top-0` |
| [page-header] | hidden (`TaskHeader` replaces) | hidden (`TaskHeader` replaces) | constrained to `w-[var(--layout-content-max-width)] mx-auto`, flex inside: heading `flex-1 min-w-0`, actions `flex-none` right — aligns with main column below; column mirroring DOES NOT apply because aside is hidden | mirrors column structure per S13: `w-fit mx-auto`, heading `w-[var(--layout-content-max-width)]`, actions at aside-width, right-aligned |

**`proportional-split`**

| Slot | Mobile | Tablet (`sm:`) | Desktop (`md:`) | Wide (`lg:`) |
|------|--------|----------------|-----------------|--------------|
| Grid | 1-column (form only; preview hidden) | 1-column (form only; preview hidden) | `grid grid-cols-2` equal width | `grid grid-cols-2` equal width |
| [page-header] | hidden (`TaskHeader` replaces; Preview permitted as secondary action) | hidden (`TaskHeader` replaces; Preview permitted as secondary action) | full-width flex | full-width flex |

**Shell assignment (applies to all layout types):**

| Breakpoint | Browse mode | Task mode |
|------------|-------------|-----------|
| Mobile | `MobilePageHeader` + content + `BottomNavBar` | `TaskHeader` + content + sticky `FormFooter` |
| Tablet | `MobilePageHeader` + content + `BottomNavBar` | `TaskHeader` + content + sticky `FormFooter` |
| Desktop | `Sidebar` + content | `Sidebar` + content |
| Wide | `Sidebar` + content | `Sidebar` + content |

---

## 3. Grid System

**G1.** Permitted grid configurations: `1-column`, `2-column`, `3-column`. No other column counts are allowed.

**G2.** All grid gap values MUST use spacing tokens. Permitted values: `gap-200` (16px), `gap-300` (24px), `gap-400` (32px). No other values are permitted.

**G3.** The default grid gap is `gap-200` (16px).

**G4.** All columns in a content grid MUST be equal width. Asymmetric column widths are PROHIBITED. Exception: aside-panel layouts (defined in S10) are exempt — the main column and aside panel are intentionally asymmetric by design and are not subject to this rule.

**G5.** A grid MUST NOT mix column counts within the same instance. Every item in a grid instance uses the same column span.

**G6.** A 3-column grid MUST be declared as `grid grid-cols-3`. It MUST NOT be simulated with flex and hardcoded widths.

**G7.** A 2-column content grid MUST be declared as `grid grid-cols-2`. It MUST NOT be simulated with flex and hardcoded widths. Exception (a): aside-panel layouts (defined in S10) MUST use `flex` — the main column uses `w-[var(--layout-content-max-width)] min-w-0`, the aside uses its fixed declared width (SP8 approved exception). Exception (b): Pattern 6 Split View (full-stretch layout) MUST use `flex w-full` — the list panel uses a fixed width declared as an SP8 approved exception, the detail panel uses `flex-1 min-w-0`. These are the only two permitted uses of `flex` for 2-column page-level layouts.

**G8.** A 1-column layout MUST use `w-full` on its child. It MUST NOT use a grid wrapper with `grid-cols-1`.

**G9.** Grid nesting is permitted ONLY when all of the following conditions are met:
- The inner grid is fully confined within a single component boundary
- The outer grid defines page-level layout structure
- The inner grid defines component-level internal structure only

Nested grids MUST NOT create competing layout hierarchies.

**G10.** If grid items carry a declared minimum width and the container cannot satisfy all columns at that minimum width, reduce the column count by one. Apply iteratively until the constraint is satisfied. Minimum width MUST NOT be removed to satisfy the grid.

**G11.** Flex layout is permitted only for single-row horizontal groups: button rows, tab bars, filter bars, icon-label pairs, inline form rows. Flex MUST NOT be used as a substitute for multi-row grid layouts.

---

## 4. Spacing System

**SP1.** All spacing values MUST use spacing tokens. Arbitrary pixel values are PROHIBITED except approved exceptions declared in SP8.

**SP2.** Spacing between top-level sections within the content area MUST be `gap-400` (32px).

**SP3.** Spacing between components within a section MUST be a minimum of `gap-150` (12px). `gap-200` (16px) is the standard value. `gap-300` (24px) is permitted when greater visual separation between distinct sub-sections is required.

**SP4.** Spacing between elements within a single component MUST be `gap-100` (8px) or less.

**SP5.** Section heading-to-content spacing MUST be `gap-200` (16px).

**SP6.** NEVER apply margin directly to a component's root element. All spacing between components MUST be controlled by the parent container using `gap`.

**SP7.** `mt-`, `mb-`, `ml-`, `mr-` on a component root element are PROHIBITED.

**SP8.** Approved hardcoded exceptions — MUST be commented in code:
- Absolute-positioned decorative elements (e.g. background shapes, overlays)
- Component minimum widths derived from Figma spec where no token maps to the exact value
- Any value explicitly approved in a build session and recorded in build notes

---

## 5. Component Constraints

**CC1.** Cards MUST use `w-full` within their grid column. Cards MUST NOT carry a fixed pixel width when placed inside a grid.

**CC2.** Standalone cards (outside a grid) MUST declare a `max-w-*` value. Maximum permitted standalone card width: 668px.

**CC3.** Data table components MUST be full-width (`w-full`). They MUST NOT be placed inside a multi-column grid.

**CC4.** Banner components (Nudge, PromoBanner, Alert) MUST be full-width. They MUST NOT be placed inside a multi-column grid.

**CC5.** All interactive elements MUST have a minimum touch target of 32×32px.

**CC6.** Icon-only buttons MUST use `IconButton`. Raw `<button>` elements styled as icon buttons are PROHIBITED.

**CC7.** Form inputs MUST use `w-full` within their container. Fixed pixel widths on inputs are PROHIBITED.

**CC8.** Modal content MUST have a declared max-width not exceeding 560px. Modal width MUST NOT exceed `calc(100vw - 64px)`.

**CC9.** SideSheet panels MUST have a fixed width. Fluid or percentage-based SideSheet widths are PROHIBITED.

**CC10.** Component constraints defined in this section MUST take precedence over any pattern-level or layout-level decisions. No pattern or layout rule may override a component constraint.

---

## 6. Responsive Behavior

**R1.** Breakpoint ranges — use these exact values. No intermediate breakpoints are permitted.

| Name | Range |
|------|-------|
| Mobile | 0px – 767px |
| Tablet | 768px – 1023px |
| Desktop | 1024px – 1439px |
| Wide | 1440px and above |

**R1a.** Tailwind CSS breakpoint tokens MUST align to these ranges. The required mapping:

| Tailwind prefix | Min-width | Maps to |
|-----------------|-----------|---------|
| *(default)* | 0px | Mobile |
| `sm:` | 768px | Tablet |
| `md:` | 1024px | Desktop |
| `lg:` | 1440px | Wide |

Only these three breakpoint tokens (`sm`, `md`, `lg`) are permitted. `xs` and `xl` MUST NOT be defined or used. The `globals.css` `@theme inline` block MUST reflect these values exactly. Any code using a breakpoint prefix not listed here is a rule violation.

**R2.** At Mobile: ALL grids MUST collapse to 1-column. No exceptions.

**R3.** At Tablet: 3-column grids MUST collapse to 2-column. 2-column grids remain 2-column unless component min-width cannot be satisfied — in that case collapse to 1-column.

**R4.** At Desktop and Wide: grid behavior follows Section 3 as defined.

**R5.** The sidebar MUST be hidden at Mobile and Tablet breakpoints. It MUST NOT collapse to a narrow icon rail — it is either fully visible (Desktop/Wide) or fully hidden (Mobile/Tablet).

**R6.** Content area horizontal padding by breakpoint:

| Breakpoint | Padding |
|-----------|---------|
| Mobile | `px-200` (16px) |
| Tablet | `px-300` (24px) |
| Desktop | `px-400` (32px) |
| Wide | `px-400` (32px) |

**R7.** Horizontal scrolling is PROHIBITED at the page level at all breakpoints — see S8.

**R8.** Explicit horizontal scroll containers MUST use `overflow-x-auto`. Using `overflow-x-scroll` is PROHIBITED.

**R9.** Typography behavior (including scaling across breakpoints) is defined outside LAYOUT.md and MUST NOT be overridden here.

**R10.** A `centered` layout container maintains `var(--layout-content-max-width)` at Desktop and Wide. At Tablet and Mobile it becomes full-width with breakpoint-appropriate padding from R6.

**R11.** At Mobile and Tablet breakpoints where the sidebar is hidden (R5), the application MUST use one of two mobile shell modes:

| Mode | Structure | When |
|------|-----------|------|
| Browse | Fixed `MobilePageHeader` (top) + content area + fixed `BottomNavBar` (bottom) | Screens where the user is browsing, viewing, or managing content. Pattern-to-mode mapping is defined in PATTERNS.md. |
| Task | Fixed `TaskHeader` + content area + sticky [form-actions] footer | Screens where the user is completing a focused creation, editing, or multi-step flow. Pattern-to-mode mapping is defined in PATTERNS.md. |

A screen MUST use exactly one mobile shell mode at a given time. Mixing Browse and Task mode elements on the same screen is PROHIBITED.

**R12.** Browse mode — `BottomNavBar` rules:
- MUST be fixed to the bottom of the viewport. MUST NOT scroll with content.
- MUST be visible at Mobile and Tablet breakpoints only — hidden at Desktop and Wide where the sidebar is visible.
- Content area MUST include bottom padding equal to the `BottomNavBar` height to prevent content from being obscured.
- `BottomNavBar` height MUST use `var(--layout-bottom-nav-height)`. Hardcoded pixel values MUST NOT be specified alongside this token.
- Elevation MUST use `shadow-bottom-nav` (two-layer upward shadow defined in `globals.css`). A `border-t` divider MUST NOT be used — the shadow provides visual separation from content.

**R12a.** Browse mode — `MobilePageHeader` rules:
- MUST be fixed to the top of the viewport (`fixed top-0 left-0 right-0 z-30`). MUST NOT scroll with content.
- MUST be visible at Mobile and Tablet breakpoints only — hidden at Desktop and Wide where `CollapsiblePageHeader` or `PageHeader` handles the top area: `md:hidden`.
- MUST include safe area inset padding at the top: `pt-[env(safe-area-inset-top)]` per R15.
- Height is dynamic: approximately 52px without secondary links, approximately 89px with secondary links. The exact rendered height MUST be tracked via the `--layout-mobile-header-height` CSS variable. This variable MUST be written synchronously before the first paint using `useLayoutEffect` (not `useEffect`) and kept in sync with a `ResizeObserver`. `useEffect` is PROHIBITED — it fires after paint and causes broken sticky positions on first render.
- Content area MUST include top padding equal to `var(--layout-mobile-header-height)` to prevent content from being obscured (see S7 Exception 1). Hardcoded pixel values MUST NOT be specified alongside this token.
- Structure: logo (left) → title (center, `flex-1`) → user avatar (right), with an optional secondary-links row below.
- Background of the dark bar MUST use `bg-surface-inverted`.

**R12b. Browse mode — sticky element `top` offset**

Any element using `position: sticky` inside the Browse-mode scroll container MUST use `top-0` at Mobile and Tablet breakpoints.

**Why:** `main` has `padding-top: var(--layout-mobile-header-height)` to offset the fixed `MobilePageHeader`. The browser calculates sticky `top` relative to the scroll container's *content area* (below the padding), not its padding-box edge. Using `top: var(--layout-mobile-header-height)` adds the offset twice: content-area-start is already at y≈89px from the viewport, so adding another 89px pushes the sticky threshold to y≈178px — visually 89px below `MobilePageHeader`. `top-0` resolves to the content-area edge, which is visually flush with the bottom of `MobilePageHeader`.

PROHIBITED: `top-[var(--layout-mobile-header-height)]` on any sticky element inside the Browse-mode scroll container at Mobile and Tablet.

At Desktop and Wide, the scroll container has no `padding-top` offset. Apply the mobile rule via breakpoint scoping only — for example: `top-0 lg:top-[var(--layout-collapsed-bar-height)]`.

---

**R12c. Browse mode — mobile sticky panel (Data List screens)**

On Data List screens at Mobile and Tablet, when [filter-bar] precedes a [content] DataTable and toolbar + column-header pinning is required, BOTH slots MUST be co-located inside a single sticky panel container:

- **Panel:** `lg:hidden sticky top-0 z-20 flex flex-col h-[calc(100vh_-_var(--layout-mobile-header-height)_-_var(--layout-bottom-nav-height))]`
- **[filter-bar] wrapper:** `flex-none` — renders at intrinsic height; sticks directly below `MobilePageHeader` once content above scrolls away
- **[content] wrapper:** `flex-1 min-h-0` — DataTable MUST use `fillHeight className="h-full"` — toolbar and column header pin to the top of this container; only data rows scroll internally

A separate `hidden lg:flex` [filter-bar] and `hidden lg:block` [content] wrapper MUST be rendered for Desktop and Wide — these are independent of the mobile panel and follow standard layout rules (S7, R17).

Non-`fillHeight` DataTable MUST NOT be used in the mobile sticky panel. Without `fillHeight`, the DataTable renders in normal flow with no inner scroll container, making toolbar and column-header pinning impossible.

---

**R13.** Task mode — `TaskHeader` rules:
- MUST be fixed or sticky at the top of the viewport. MUST NOT scroll with content.
- MUST be visible at Mobile and Tablet breakpoints only — hidden at Desktop and Wide where the standard [page-header] and sidebar are visible.
- Structure: `[Close button + Title — left]` `[Optional step indicator + Optional secondary action — right]`
- The Preview button is permitted as a secondary action ONLY for screens using `proportional-split` layout (S14). It MUST NOT appear for `aside-panel`, `centered`, or `full-stretch` layout types.
- Content area MUST include top padding equal to the `TaskHeader` height to prevent content from being obscured.
- `TaskHeader` height MUST use `var(--layout-task-header-height)`. Hardcoded pixel values MUST NOT be specified alongside this token.

**R14.** Task mode — Sticky form-actions footer:
- [form-actions] MUST be fixed or sticky at the bottom of the viewport at Mobile and Tablet breakpoints.
- Structure: `[Optional back action — left]` `[Primary CTA — right]`
- Back action MUST appear only when there is a previous step to return to (step 2 onward in multi-step flows). On step 1 or single-step flows, the primary CTA is the sole element.
- The footer MUST NOT scroll with content.
- Component selection for actions within the footer follows COMPONENT_MAP.md and PATTERNS.md [form-actions] slot rules.

**R15.** Safe area insets:
- `BottomNavBar`, sticky [form-actions] footers, and any other element fixed to the bottom of the viewport MUST include safe area inset padding: `pb-[env(safe-area-inset-bottom)]` or equivalent.
- `TaskHeader` and any other element fixed to the top of the viewport MUST include safe area inset padding: `pt-[env(safe-area-inset-top)]` or equivalent.
- Safe area padding is additive — it MUST NOT replace the component's standard internal padding.

**R16.** Breakpoint-scoped shell components. Certain components are only active at specific breakpoints and MUST be applied via the exact responsive visibility classes listed below. Screens MUST NOT invent alternative visibility logic (e.g. JS-based breakpoint detection, manual media queries).

| Component | Active breakpoints | Required visibility class |
|-----------|--------------------|---------------------------|
| `Sidebar` | Desktop, Wide | `hidden md:flex` |
| `MobilePageHeader` | Mobile, Tablet (Browse mode only) | `md:hidden` |
| `BottomNavBar` | Mobile, Tablet (Browse mode only) | `md:hidden` |
| `TaskHeader` | Mobile, Tablet (Task mode only) | `md:hidden` |
| `FormFooter` | Mobile, Tablet (Task mode only) | `md:hidden` |
| `PageHeader` (screen-level heading + CTAs) | Desktop, Wide | `hidden md:block` |
| `AsidePanel` slot content (Pattern 9) | Wide only | `hidden lg:block` |

Pairing rule: within a single screen, mobile shell mode is either Browse or Task (R11). The corresponding shell component pair MUST be used — mixing `BottomNavBar` with `FormFooter`, or `TaskHeader` with `BottomNavBar`, on the same screen is PROHIBITED.

**R17.** Collapsible page header behavior:
- A `CollapsiblePageHeader` has three visual phases controlled by scroll position.
- **Phase 1 — Expanded (at rest):** Custom background (gradient, image, or other ReactNode), large title (`text-display font-semibold text-text-on-brand`) centered, optional secondary links (`text-title font-medium text-text-on-brand`) below title, optional content slot (children), CTA always-fixed top-right (see CTA rule below). The compact bar content (title + secondary links) is hidden. Scrolls normally — NOT sticky.
- **Phase 2 — Collapsed on gradient:** Triggered the moment `scrollTop > 0` (any scroll at all). The compact bar content slides down into view. Bar positioning: `fixed top-0 right-0 z-20`, `left-0 lg:left-[var(--layout-sidebar-width)]` — on desktop (lg+) the left edge MUST be offset by the sidebar width so the title is not hidden behind the sidebar. Background is **transparent** (gradient still visible behind it). Title uses `text-h3 font-semibold text-text-on-brand`, count Badge adjacent, secondary links right-aligned using `text-body font-medium text-text-on-brand`. Text remains white because the gradient is still behind the bar. MUST include safe area inset: `pt-[env(safe-area-inset-top)]` per R15. NOTE: `position: fixed` is required over `sticky` — `sticky` is bounded by its containing block (the hero wrapper) and disappears once the hero fully scrolls away; `fixed` persists across the entire page scroll.
- **Phase 3 — Collapsed on white:** When 50% of the gradient/hero background has scrolled out of the scroll container (≤ 50% still visible), the compact bar background transitions to opaque: `bg-surface-level1 border-b border-border-color-level2`. Title switches to `text-text-level1`, secondary links switch to `text-text-level2`. CTA unchanged. MUST include safe area inset: `pt-[env(safe-area-inset-top)]` per R15.
- **CTA rule:** The `actions` slot (CTA buttons) is rendered inside the fixed bar container at all times and is ALWAYS visible — it does NOT participate in any phase transition. The bar wrapper MUST use `pointer-events-none`; the CTA and the sliding bar content each use `pointer-events-auto` individually. This eliminates the Phase 1→2 CTA glitch caused by two separate CTAs fading in/out at different positions.
- **Transition mechanism:** A passive `scroll` event listener on the auto-detected scrollable ancestor drives all phase transitions, throttled with `requestAnimationFrame`. `IntersectionObserver` is NOT used — it proved unreliable when the scroll container is a nested `overflow-y: auto` element (`root: null` fires on document scroll only, not on a nested container). Auto-detection: walk up the DOM from the hero element using `getComputedStyle` traversal until an ancestor with `overflowY === 'auto' || 'scroll'` is found. No `scrollContainerRef` prop is required or accepted — the component is self-contained.
- **Transition style:** Phase 1 → 2: bar content (title + secondary links) slides down from above (`-translate-y-4 opacity-0` → `translate-y-0 opacity-100`). Expanded hero content (centered title + secondary links) slides down and fades out (`translate-y-0 opacity-100` → `translate-y-4 opacity-0`). Phase 2 → 3: bar background transitions (`bg-transparent` → `bg-surface-level1`), text color transitions. All transitions MUST use CSS `transition` with `duration-300 ease-in-out`. Hard show/hide or abrupt switches are PROHIBITED.
- Content below the expanded header (metrics, filters, data table) MUST NOT be obscured by the fixed collapsed bar.
- `CollapsiblePageHeader` is permitted for Browse-mode patterns only. It MUST NOT be used on Task-mode patterns where `TaskHeader` + `PageHeader` handle header responsibilities.
- Visible at Desktop and Wide. Mobile and Tablet behavior to be defined separately.
- Horizontal padding in all phases MUST follow S6.

**R19. Browse mode — primary CTA FAB (Mobile and Tablet)**

When a Browse-mode screen has a primary CTA in the [page-header] (`CollapsiblePageHeader.actions` or `PageHeader` actions), Claude MUST automatically include a floating `IconButton` FAB at Mobile and Tablet breakpoints. No explicit instruction from the user is required — the presence of a [page-header] primary CTA is sufficient to trigger this rule.

FAB specification:

| Property | Value |
|----------|-------|
| Component | `IconButton variant="brand" size="lg" shape="circle"` |
| Position | `fixed lg:hidden` |
| Bottom offset | `calc(var(--layout-bottom-nav-height) + 16px)` — 16px clearance above `BottomNavBar` |
| Right offset | `right-200` (16px) — aligned to mobile edge padding |
| Z-index | `z-30` — above page content and sticky panels (z-20); sits below `BottomNavBar` (z-40) without overlap due to bottom offset |
| Shadow | `shadow-dropdown` |
| Icon | MUST match the leading icon of the desktop CTA (e.g. `IconPlus` for a create action) |
| `aria-label` | MUST be set to the full desktop CTA label (e.g. `aria-label="Create Campaign"`) |

The FAB MUST NOT be rendered on screens that have no primary CTA in [page-header].
The FAB MUST NOT be rendered on Task-mode screens — Task mode uses a sticky [form-actions] footer (R14) for primary actions.

---

**R18. Shell root div — `overflow-hidden` PROHIBITED**

The root `<div>` of the sidebar+content shell MUST NOT carry `overflow-hidden` on either axis.

`overflow-hidden` on any ancestor of `main` severs the sticky positioning chain. `position: sticky` descendants require an unbroken chain of scroll-capable ancestors — any `overflow: hidden` ancestor between a sticky element and the scroll container causes the sticky element to treat that ancestor's edge as its containing block and fail to stick.

Permitted overflow values on the root shell div: none (default), `overflow-visible`.
Only `main` (the actual scroll container) MUST carry `overflow-y-auto`.

---

## 7. Layout Behavior Rules

**LB1.** Overflowing content within a section MUST wrap to the next row. Clipping or hiding overflow without an explicit scroll container is PROHIBITED.

**LB2.** A grid with fewer items than its declared column count MUST left-align items. Remaining columns MUST stay empty — stretching items to fill vacant columns is PROHIBITED.

**LB3.** Under-filled grids MUST NOT reflow into a different column count. A 3-column grid with 2 items renders 2 items in the first row, not a 2-column grid.

**LB4.** Equal height for components within a grid row is PREFERRED but NOT mandatory.

Equal height (`items-stretch`) is REQUIRED ONLY when:
- Components are comparing similar data (e.g. stat cards, KPI cards)
- Visual alignment is critical for readability and comparison

In all other cases, components MAY use intrinsic height.

**LB5.** Vertically stacked sections on the same page MUST use the same gap token throughout. Mixed section gap values on a single page are PROHIBITED.

**LB6.** Text content inside components MUST wrap. Truncation is only permitted when explicitly declared as component behavior. Truncation MUST always render an ellipsis.

**LB7.** A component with `whitespace-nowrap` MUST be in a container wide enough for its full rendered width. If not, remove `whitespace-nowrap`.

**LB8.** If a section contains a single component, a grid wrapper MUST NOT be used. The component MUST be full-width within the section container.

---

## 8. Section Composition Constraints

**SC1.** Each section MUST contain one primary heading. Additional sub-headings are permitted ONLY within clearly separated sub-sections. Multiple headings at the same hierarchy level within a single section are PROHIBITED.

**SC2.** A section SHOULD contain at most one primary action. Multiple primary actions are permitted ONLY when they are clearly differentiated in scope (e.g. two independent task flows within the same section).

**SC3.** Filter controls and sort controls MUST be placed above the content they affect. Placing them below or beside content is PROHIBITED.

**SC4.** Section-level and form-level action buttons MUST be right-aligned within their container row. Left-aligned or centered section or form actions are PROHIBITED.

**SC5.** Section header structure MUST follow this exact pattern:
`[Heading + optional subtext — left]` `[optional actions — right]`
No other arrangement is permitted.

**SC6.** Banner placement rules:
- Global banners (system-wide: Nudge, Alert) MUST appear at the top of the content area, before all section content.
- Contextual banners (section-specific: PromoBanner, inline Nudge) MUST appear at the top of their respective section, before that section's content.

Placing any banner mid-content without a clear contextual anchor is PROHIBITED.

**SC7.** Pagination MUST be placed at the bottom of the content it controls. Pagination above a list or table is PROHIBITED.

**SC8.** Tab components used for section-level navigation MUST span the full width of their container. Inline or right-aligned tabs are PROHIBITED.

**SC9.** Multiple data tables within a section are permitted ONLY when they represent distinct data groups and are visually separated.

---

## 9. State Handling

**ST1.** When a section contains no data, an EmptyState component MUST be rendered in place of the content. The section heading MUST remain visible.

**ST2.** EmptyState MUST be full-width within its container. Placing EmptyState inside a multi-column grid is PROHIBITED.

**ST3.** Loading states MUST preserve the layout structure. Skeleton loaders MUST match the dimensions and grid position of the components they replace.

**ST4.** Loading skeletons MUST NOT shift layout. They MUST occupy identical space to the loaded content.

**ST5.** Error states MUST be localized to the affected section. A section error MUST NOT replace the entire page layout.

**ST6.** An error state within a section MUST use the same container width as the content it replaces.

**ST7.** NEVER replace individual grid cells with error states. If a grid section errors, replace the entire grid with the error state.

---

## 10. Alignment & Rhythm

**A1.** All content within the content area MUST be left-aligned by default.

**A2.** Right-alignment is permitted only for: action buttons in section headers, numeric values in table columns, trailing controls in row components (e.g. toggles, icon buttons).

**A3.** Center-alignment is permitted only in: empty states, modal dialogs, standalone auth/confirmation screens (no shell present).

**A4.** Mixing left-aligned and center-aligned content within the same section is PROHIBITED.

**A5.** Vertical rhythm between all top-level sections MUST be uniform. Varying `gap` values between sections on the same page is PROHIBITED.

**A6.** Icon and text in the same row MUST be vertically centered (`items-center`). Top-aligned icon+text (`items-start`) is permitted only when the text spans more than 2 lines.

**A7.** Inline elements (badges, locks, counters) alongside text MUST be vertically centered with the text.

**A8.** Section headings MUST be left-aligned. Center-aligned headings are permitted only inside empty states and modal dialogs.

---

## 11. Pattern Boundary Enforcement

**PB1.** Patterns defined in PATTERNS.md MUST NOT override any rule in LAYOUT.md.

**PB2.** If a pattern conflicts with a layout rule:
- LAYOUT.md MUST take precedence
- The pattern MUST adapt to comply with LAYOUT.md
- The pattern MUST NOT be treated as an exception to LAYOUT.md

**PB3.** Patterns MAY define structure (slots, composition order) but MUST NOT redefine:
- Grid behavior
- Spacing rules
- Component constraints

**PB4.** Patterns MUST NOT override component constraints defined in Section 5. If a pattern conflicts with a component constraint:
- The component constraint MUST take precedence
- The pattern MUST adapt to comply

---

## 12. Rule Priority System

### Priority Order

| Priority | Layer | Scope |
|----------|-------|-------|
| 1 | Component constraints (Section 5) | Overrides all other layout rules within this file |
| 2 | Container constraints (Section 2) | Overrides grid, spacing, visual |
| 3 | Grid system (Section 3) | Overrides spacing and visual |
| 4 | Spacing system (Section 4) | Overrides visual preference only |
| 5 | Visual preference | Yields to all rules above |

Pattern-level rules and component usage rules MUST always defer to this priority system.

**When two rules conflict: apply the higher-priority rule in full. Do not blend, average, or partially apply.**

---

### Conflict Example 1 — Component min-width vs. grid column count

**Situation:** A 3-column grid is placed in a 480px-wide container. ActionCard carries `min-w-[212px]` (approved Figma exception per SP8). Required width: 3 × 212px + 2 × 16px = 668px > 480px.

**Rule G10** (grid, Priority 3) requires reducing column count when min-width cannot be satisfied.
**CC1 + SP8** (component constraint, Priority 1) require that min-width is an approved exception and MUST NOT be removed.

**Resolution:** Priority 1 overrides Priority 3. Reduce grid to 2-column. Recheck: 2 × 212px + 1 × 16px = 440px < 480px — satisfied. Apply 2-column. Do not remove min-width.

---

### Conflict Example 2 — Section spacing vs. banner internal padding

**Situation:** A PromoBanner (`py-200` internal padding) is directly followed by a StatCard section. The parent applies `gap-400` between sections. Rendered gap between PromoBanner's last pixel and the StatCard heading appears as 48px (16px internal + 32px gap).

**Rule SP2** (spacing, Priority 4) requires `gap-400` between sections.
No rule permits adjusting component internal padding to correct perceived visual spacing.

**Resolution:** `gap-400` is applied at the parent container level as written. Component internal padding MUST NOT be modified to compensate. The 48px perceived gap is the correct output.

---

## 13. Enforcement Rules

**E1.** When a layout decision is not covered by any rule in this file, apply this default: **1-column, full-width, `gap-200` between components, left-aligned, breakpoint-appropriate padding per R6.**

**E2.** When two equally valid interpretations of a rule exist, choose the interpretation that produces less visual complexity (fewer columns, less nesting, simpler alignment).

**E3.** A rule violation MUST NOT be resolved by adding a new exception. It MUST be resolved by applying the rule as written, or escalating to the Rule Priority System (Section 12).

**E4.** Any hardcoded value not declared as an approved exception in SP8 is a rule violation. Flag it before implementation — do not proceed until resolved.

**E5.** Any layout requiring a breakpoint or behavior not defined in Section 6 MUST default to the nearest defined breakpoint's behavior. Interpolating between defined breakpoints is PROHIBITED.
