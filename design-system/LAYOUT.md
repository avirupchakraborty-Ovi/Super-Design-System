# LAYOUT.md
## Super Design System — Layout Constraint Rules
`Version 1.2 | Priority: Highest | Overrides: All other files`

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

**S5.** The sidebar background MUST use `bg-surface-level1`.

**S6.** Scroll behavior:
- The content area MUST be vertically scrollable.
- Sidebar scroll behavior depends on configuration:
  - Fixed sidebar → MUST NOT scroll with the content area
  - Scrollable sidebar → MUST scroll independently of the content area

**S7.** The content area MUST have `px-400` (32px) horizontal padding at Desktop and Wide breakpoints.

**S8.** The content area MUST have `pt-400` (32px) top padding.

**S9.** Horizontal scrolling at the page shell level is PROHIBITED at all breakpoints.

**S10.** Three layout types are permitted within the content area:

| Type | Rule |
|------|------|
| `full-stretch` | Content fills the full available width. No max-width applied. |
| `centered` | Content MUST use `var(--layout-content-max-width)` as its max-width constraint and MUST be horizontally centered. Hardcoded pixel values MUST NOT be specified alongside this token. |
| `aside-panel` | The combined layout (main column + aside panel) is centered as a unit within the content area using `w-fit mx-auto` on the outer wrapper — this shrinks the container to the natural width of its children so auto margins can distribute equally on both sides. The main content column uses `w-[var(--layout-content-max-width)] min-w-0` — a fixed width set by the content max-width token. A secondary panel sits to the right at a fixed width declared as an SP8 approved exception with an inline comment. The aside panel MUST be hidden below the `xl` breakpoint. See S12 for full structural rules. |

**S11.** The layout type for a screen MUST be declared once and applied uniformly. A screen MUST NOT mix `full-stretch`, `centered`, and `aside-panel` for its primary content sections.

**S12.** Aside-panel layout structure:
- Outer wrapper: `flex gap-300 w-fit mx-auto` or `flex gap-400 w-fit mx-auto` — `w-fit` shrinks the container to the natural width of its children so that `mx-auto` can distribute remaining space equally on both sides, centering the combined layout as a unit
- Main column: `w-[var(--layout-content-max-width)] min-w-0` — fixed width using the content max-width token. MUST NOT use `flex-1`. Hardcoded pixel values MUST NOT be used in place of this token.
- Aside column: fixed width declared as an SP8 approved exception with an inline comment stating the Figma-specified value
- Aside MUST be `sticky top-0` — it MUST NOT scroll with the main content
- Aside MUST be hidden below the `xl` breakpoint (1280px): `hidden xl:block` or equivalent
- The aside panel is supplementary content — it MUST NOT contain the primary content of the screen
- Aside width MUST be consistent across all aside panels on the same screen — varying widths on a single screen are PROHIBITED

**S14.** Page header content alignment by layout type:
- `full-stretch`: Page header inner content spans the full content area width. No constraint applied.
- `centered`: Page header inner content MUST be constrained to `var(--layout-content-max-width)` with `mx-auto`, so the heading and CTAs align with the content below.
- `aside-panel`: The page header inner content MUST mirror the column structure of the content block below. The inner wrapper uses `flex gap-300 w-fit mx-auto` — inside it, the heading occupies a div of `w-[var(--layout-content-max-width)] min-w-0` matching the main column width, and the CTAs occupy a div at the same fixed width as the aside panel declared as an SP8 exception with an inline comment, right-aligned via `justify-end`. This ensures the heading left-aligns with the main column and the CTAs right-align with the aside panel edge.

**S13.** Proportional split layout (creation flows with live preview only):
- Permitted only in creation and editing flows where a real-time live preview is required alongside the form
- Structure: `grid grid-cols-2` at Desktop and Wide — both columns equal width (satisfies G4 and G7)
- At Tablet and Mobile: collapse to 1-column — form column visible, preview column hidden
- This layout is PROHIBITED on data display screens, dashboards, and settings screens

---

## 3. Grid System

**G1.** Permitted grid configurations: `1-column`, `2-column`, `3-column`. No other column counts are allowed.

**G2.** All grid gap values MUST use spacing tokens. Permitted values: `gap-200` (16px), `gap-300` (24px), `gap-400` (32px). No other values are permitted.

**G3.** The default grid gap is `gap-200` (16px).

**G4.** All columns in a content grid MUST be equal width. Asymmetric column widths are PROHIBITED. Exception: aside-panel layouts (defined in S10) are exempt — the main column and aside panel are intentionally asymmetric by design and are not subject to this rule.

**G5.** A grid MUST NOT mix column counts within the same instance. Every item in a grid instance uses the same column span.

**G6.** A 3-column grid MUST be declared as `grid grid-cols-3`. It MUST NOT be simulated with flex and hardcoded widths.

**G7.** A 2-column content grid MUST be declared as `grid grid-cols-2`. It MUST NOT be simulated with flex and hardcoded widths. Exception: aside-panel layouts (defined in S10) MUST use `flex` — the main column uses `flex-1`, the aside uses its fixed declared width. This is the only permitted use of `flex` for a 2-column page-level layout.

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

**SP3.** Spacing between components within a section MUST be `gap-200` (16px).

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

**CC4.** Banner components (Nudge, PromoBanner, HeroBanner, Alert) MUST be full-width. They MUST NOT be placed inside a multi-column grid.

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

**R7.** Horizontal scrolling is PROHIBITED at the page level at all breakpoints.

**R8.** Explicit horizontal scroll containers MUST use `overflow-x-auto`. Using `overflow-x-scroll` is PROHIBITED.

**R9.** Typography behavior (including scaling across breakpoints) is defined outside LAYOUT.md and MUST NOT be overridden here.

**R10.** A `centered` layout container maintains `var(--layout-content-max-width)` at Desktop and Wide. At Tablet and Mobile it becomes full-width with breakpoint-appropriate padding from R6.

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

**SC4.** Section-level action buttons MUST be right-aligned within the section header row. Left-aligned or centered section actions are PROHIBITED.

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
| 1 | Component constraints (Section 5) | Overrides all other rules |
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
