# PATTERNS.md
## Super Design System — Screen Composition Rules
`Version 2.2 | Depends on: LAYOUT.md, COMPONENT_MAP.md | Priority: Third — see AGENTS.md for full priority chain`

---

## 1. Purpose

### What this file controls
- How screens are composed using components
- Slot architecture and slot responsibilities for each pattern
- Content density rules (min/max counts, pagination thresholds, grouping)
- Pattern selection logic — when to use which pattern

### What this file explicitly does NOT control
- Grid system, spacing tokens, or breakpoints → LAYOUT.md
- Which component to use for a given UI need → COMPONENT_MAP.md
- Component-internal behavior or variants → COMPONENT_MAP.md
- Visual styling or theming

### Governing rules
- Patterns MUST NOT override any rule in LAYOUT.md
- Patterns MUST NOT override any rule in COMPONENT_MAP.md
- Patterns MUST NOT define grid behavior, spacing values, or breakpoints
- All component selection within patterns MUST follow DS1–DS7
- Density, grouping, and usability MUST follow UX_RULES.md

---

## 2. Shared Slot Definitions

The following slots appear in multiple patterns. Their definitions are canonical — do NOT redefine them per pattern.

### Primary Slot Rule

- Each pattern MUST define exactly one primary content slot
- The primary content slot MUST appear first after [page-header]
- All other slots MUST follow DS7 intent priority:
  → Primary content
  → Actions
  → Selection
  → Messaging
  → Overlay
- Lower priority slots MUST NOT appear before higher priority slots
- When a pattern's Behavior Rules define a specific slot ordering that differs from DS7 intent priority, the Behavior Rules take precedence within that pattern
- [global-banner] and [section-banner] are messaging infrastructure slots — they are exempt from DS7 intent priority ordering and may appear outside the DS7 sequence at any position in the Slot Architecture

---

### [global-banner]
- **Allowed:** `Alert`, `Nudge` (global type only)
- **Do NOT Allow:** `PromoBanner`, `Nudge` (contextual type), any other component
- **Constraints:** MUST appear before all other slots in the content area (per LAYOUT.md SC6). At most one `Alert` and one `Nudge` may appear simultaneously. For `content-only` shell type (LAYOUT.md S1), global-banner MUST appear as the topmost element within the content area, before any [page-header] or section content — no shell navigation is present to serve as an anchor, the content area itself is the full viewport.
- **Ordering:** `Alert` MUST precede `Nudge` when both are present.

### [page-header]
- **Allowed:** Heading text, optional sub-text, `Button`, `IconButton`, `Badge`, `Tabs` (line variant only)
- **Do NOT Allow:** `StatCard`, `Card`, `DataTable`, `Modal`, form controls
- **Constraints:** MUST follow section header structure from LAYOUT.md SC5: `[Heading + optional subtext — left]` `[optional actions — right]`. Section-level action buttons MUST be right-aligned (per LAYOUT.md SC4). At most one `Button variant="primary"` or `variant="brand"` per page header. For `centered` layouts, the page header inner content MUST be constrained to `var(--layout-content-max-width)` with `mx-auto`. For `aside-panel` layouts, the page header inner content MUST follow the responsive rules in LAYOUT.md S13 — column mirroring applies only at Wide where the aside panel is visible; at Desktop, a full-width flex row is used instead. Heading text MUST use `text-h2 font-semibold text-text-level1`. Sub-text (when present) MUST use `text-body font-normal text-text-level3`. Vertical padding MUST use `py-250` (20px top and bottom). Horizontal padding MUST follow the responsive breakpoint scale: `px-200` at Mobile, `sm:px-300` at Tablet, `md:px-400` at Desktop, `lg:px-400` at Wide. These heading and sub-text rules apply to standard `PageHeader`. When `CollapsiblePageHeader` is used, its own phase-specific constraints in COMPONENT_MAP.md take precedence (per conflict resolution priority: COMPONENT_MAP.md overrides PATTERNS.md).
- **Responsive visibility:** The [page-header] outer container MUST be hidden at Mobile and Tablet for Task-mode patterns (Pattern 4, Pattern 9, and any other Task-mode pattern per Section 6) — `TaskHeader` (LAYOUT.md R13) replaces it at those breakpoints. The responsive visibility class is `hidden md:block` (per LAYOUT.md R16). For Browse-mode patterns, the [page-header] is visible at all breakpoints. Page header inner-content responsive structure by layout type MUST follow LAYOUT.md S13 and S15.
- **Component options:** `PageHeader` (static — Task-mode patterns at Desktop/Wide, or Browse-mode patterns without collapsible behavior), `CollapsiblePageHeader` (scroll-responsive, Browse-mode patterns at all breakpoints). Selection follows COMPONENT_MAP.md decision rules.
- **FAB pairing (Browse mode, Mobile and Tablet):** When [page-header] includes a primary CTA (`Button variant="primary"` or `variant="brand"`), Claude MUST automatically include a FAB at Mobile and Tablet per LAYOUT.md R19 — no explicit instruction is required. The FAB is the mobile/tablet equivalent of the desktop CTA — same action, condensed to icon-only. Omitting the FAB when a desktop CTA is present is a rule violation.

### [section-banner]
- **Allowed:** `Nudge` (contextual type), `PromoBanner`
- **Do NOT Allow:** `Alert`, `Nudge` (global type)
- **Constraints:** MUST appear at the top of its section before section content (per LAYOUT.md SC6). At most one section banner per section.

### [section-header]
- **Allowed:** `SectionHeader` component
- **Do NOT Allow:** Raw heading + button compositions, `StatCard`, `Card`, `DataTable`, form controls
- **Constraints:** MUST use the `SectionHeader` component — do NOT compose a raw `<h*>` + `<Button>` row. The `SectionHeader` component accepts `label`, `subText`, `icon`, `image`, `trailingButton`, and `trailingButtonIcon` props. Actions MUST be right-aligned via `trailingButton` (per LAYOUT.md SC4). MUST follow LAYOUT.md SC5 structure.

---

## 3. Patterns

---

### Pattern 1: Dashboard

---

#### Intent
Provides an at-a-glance overview of key metrics, performance trends, recent activity, and primary quick actions for a product, account, or workspace.

---

#### Pattern Selection Rules

**Use When**
- The screen is the primary entry point for a product or workspace
- The screen aggregates metrics, activity, and actions from multiple data domains
- The user's primary goal is situational awareness, not task execution

**Do NOT Use When**
- The screen is focused on a single data entity → use Detail Page pattern
- The screen is primarily for data browsing and filtering → use Data List pattern
- Charts are the primary focus and primary content type of the screen → use Analytics pattern. Use Dashboard only when charts are supporting metrics alongside other content types.

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [section-banner]
- [quick-actions]
- [metrics]
- [primary-chart]
- [activity]

---

#### Slot Definitions

**[metrics]**
- **Allowed:** `StatCard`, `ChartCard`
- **Do NOT Allow:** `ChartFullWidth`, `DataTable`, `Card`, `ActionCard`
- **Constraints:** Components MUST be arranged using a grid appropriate to the number of items (per LAYOUT.md grid rules). Column count MUST be determined by layout constraints, not pattern rules. MUST use `items-stretch` (per LAYOUT.md LB4). MUST NOT mix `StatCard` and `ChartCard` in the same grid instance.
- **Ordering:** No prescribed order within the grid.

**[primary-chart]**
- **Allowed:** `ChartFullWidth`
- **Do NOT Allow:** `ChartCard`, `StatCard`, any other component
- **Constraints:** Layout MUST follow LAYOUT.md. MUST be the sole component in this slot (per LAYOUT.md LB8). This slot is optional — omit entirely if no time-series analytics exist.

**[activity]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `MenuList`, `Card`, `StatCard`
- **Constraints:** Layout MUST follow LAYOUT.md. Use `DataTable` when records require sort or filter. Use `TableList` when simple display with no controls is sufficient (per DS1).
- **Ordering:** Precede with a [section-header].

**[quick-actions]**
- **Preferred:** `ActionCard`
- **Alternative:** `Button` MAY be used as a fallback when `ActionCard` is not suitable
- **Do NOT Allow:** `Card`, `MenuList`, any other component
- **Constraints:** This slot is optional. If fewer actions exist, MAY render available actions or fallback to `Button`-based actions. Layout MUST follow LAYOUT.md.

---

#### Content Density Rules

- **[metrics]:** Recommended 2–3 items. Hard maximum: 4 items. If the requested content exceeds 4, issue a DENSITY FLAG before generating output (see AGENTS.md). If only 1 metric exists, use `StatCard` full-width without a grid wrapper (per LAYOUT.md LB8). Grid configuration follows LAYOUT.md grid rules.
- **[primary-chart]:** Exactly 1 `ChartFullWidth` or omit slot entirely.
- **[activity]:** Show `EmptyState` when 0 records. Paginate when `DataTable` exceeds 10 rows. Paginate when `TableList` exceeds 20 rows.
- **[mobile]:** At Mobile and Tablet breakpoints (0–1023px), DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.
- **[quick-actions]:** Recommended 2–3 items. Hard maximum: 4 items. If the requested content exceeds 4, issue a DENSITY FLAG before generating output (see AGENTS.md). If fewer actions exist, MAY render available actions or fallback to `Button`-based actions.

---

#### Behavior Rules

- If [primary-chart] is present, it MUST appear between [metrics] and [activity].
- If [quick-actions] is present, it MUST appear before [metrics].
- [activity] filter controls (if any) MUST appear above the content they affect (per LAYOUT.md SC3).
- When [activity] has no records, `EmptyState` MUST replace the table — the section heading MUST remain visible (per LAYOUT.md ST1).
- Loading states MUST use skeleton loaders that match grid position and dimensions (per LAYOUT.md ST3, ST4).

---

### Pattern 2: Analytics

---

#### Intent
Displays detailed performance trends and breakdowns for a single data domain (e.g. revenue, audience, engagement). Focused on chart-driven analysis, not broad situational awareness.

---

#### Pattern Selection Rules

**Use When**
- The screen's primary purpose is time-series trend analysis
- The user needs to filter by product, time range, or segment
- Chart data is the primary content and primary focus of the screen, not a supporting metric strip alongside other content types

**Do NOT Use When**
- Multiple unrelated data domains are combined → use Dashboard pattern
- No chart data exists → use Data List pattern
- The screen is a simple KPI summary → use Dashboard pattern

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [section-banner]
- [metric-summary]
- [trend-chart]
- [breakdown]

---

#### Slot Definitions

**[metric-summary]**
- **Allowed:** `ChartCard`
- **Do NOT Allow:** `StatCard`, `ChartFullWidth`, `DataTable`
- **Constraints:** Components MUST be arranged using a grid appropriate to the number of items (per LAYOUT.md grid rules). Column count MUST be determined by layout constraints, not pattern rules. MUST use `items-stretch` for alignment.

**[trend-chart]**
- **Allowed:** `ChartFullWidth`
- **Do NOT Allow:** `ChartCard`, `StatCard`, any other component
- **Constraints:** Layout MUST follow LAYOUT.md. MUST be the sole component in this slot (per LAYOUT.md LB8).

**[breakdown]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `Card`, `StatCard`, `ChartCard`
- **Constraints:** Layout MUST follow LAYOUT.md. Optional — omit if no breakdown data exists.

---

#### Content Density Rules

- **[metric-summary]:** Recommended 2–3 items. Hard maximum: 4 items. If the requested content exceeds 4, issue a DENSITY FLAG before generating output (see AGENTS.md). Grid configuration follows LAYOUT.md grid rules.
- **[metric-summary] (single card):** If only 1 ChartCard exists, render it full-width without a grid wrapper (per LAYOUT.md LB8). The 2-or-3-column grid requirement applies only when 2 or more ChartCards are present.
- **[trend-chart]:** Exactly 1 `ChartFullWidth`.
- **[breakdown]:** Show `EmptyState` when 0 records. Paginate when `DataTable` exceeds 10 rows.
- **[mobile]:** At Mobile and Tablet breakpoints (0–1023px), DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.

---

#### Behavior Rules

- [metric-summary] MUST appear before [trend-chart].
- [trend-chart] MUST appear before [breakdown].
- Filter controls on `ChartFullWidth` affect only the [trend-chart] slot.
- When [breakdown] has no records, `EmptyState` replaces the table — section heading MUST remain visible.

---

### Pattern 3: Data List

---

#### Intent
Displays a browsable, filterable, and optionally sortable set of data records. The user's primary goal is to find, review, or act on individual records.

---

#### Pattern Selection Rules

**Use When**
- The screen presents a collection of records of a single type (products, posts, contacts, orders)
- The user needs to search, filter, or sort records
- The user may take action on individual records (edit, delete, duplicate)

**Do NOT Use When**
- The list is a navigation menu → use `MenuList` within a different pattern
- The list is a settings preference list → use Settings pattern
- The data is part of a larger entity view → use Detail Page pattern

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [section-banner]
- [filter-bar]
- [content]
- [pagination]

---

#### Slot Definitions

**[filter-bar]**
- **Allowed:** `Tabs` (`pill` variant only), `Button` (filter/sort controls), `DropdownMenu`, `Input` (search)
- **Do NOT Allow:** `StatCard`, `Card`, `DataTable`, `MenuList`
- **Constraints:** MUST appear above [content] (per LAYOUT.md SC3). `Tabs` in this slot MUST span full container width (per LAYOUT.md SC8).

**[content]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `Card`, `StatCard`, `MenuList`, `Accordion`
- **Constraints:** Layout MUST follow LAYOUT.md. Use `DataTable` when records require sort, filter, or bulk action. Use `TableList` when display-only (per DS1).

**[pagination]**
- **Allowed:** `Pagination`
- **Do NOT Allow:** Any other component
- **Constraints:** MUST appear at the bottom of [content] (per LAYOUT.md SC7). MUST NOT appear above [content].

---

#### Content Density Rules

- **[filter-bar] tabs:** Recommended 3–5 tabs. Hard maximum: 7 tabs. If the requested tab count exceeds 7, issue a DENSITY FLAG before generating output — recommended alternative is to collapse overflow tabs into a `DropdownMenu` (see AGENTS.md).
- **[content]:** Show `EmptyState` when 0 records. Show filtered-empty message inline when filters return 0 results without resetting the filter bar.
- **[pagination]:** Render `Pagination` when `DataTable` exceeds 10 rows. Render `Pagination` when `TableList` exceeds 20 rows. Hide `Pagination` when only 1 page exists.
- **[mobile]:** At Mobile and Tablet breakpoints (0–1023px), DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.

---

#### Behavior Rules

- Filter and sort controls in [filter-bar] MUST affect only [content] within the same section.
- Active filter state MUST be reflected in the [filter-bar] component (active tab, selected dropdown value).
- When [content] transitions to loading, skeleton loaders MUST occupy identical space to loaded content (per LAYOUT.md ST3, ST4).
- Error state MUST be localized to [content] — it MUST NOT replace the page (per LAYOUT.md ST5).
- [page-header] MAY use `CollapsiblePageHeader` instead of standard `PageHeader` when the screen benefits from a prominent branded header with scroll-to-compact behavior (per LAYOUT.md R17). The collapsed state satisfies the [page-header] slot requirements — title, optional actions, fixed-position persistence. Any [metrics] or [summary] slot is independent of `CollapsiblePageHeader` — rendered after it in normal document flow, optionally using the `bottomOverhang` prop on `CollapsiblePageHeader` to visually overlap the hero background.
- **Mobile sticky panel (Browse mode):** At Mobile and Tablet, [filter-bar] and [content] MUST be co-located inside the sticky panel structure defined in LAYOUT.md R12c. The DataTable inside the panel MUST use `fillHeight`. A separate `hidden lg:flex` [filter-bar] and `hidden lg:block` [content] wrapper MUST be rendered for Desktop and Wide — these are independent of the mobile panel and follow standard layout rules. Rendering a single combined filter bar and a non-`fillHeight` DataTable for all breakpoints is PROHIBITED when toolbar and column-header pinning is required at Mobile and Tablet.

---

### Pattern 4: Form / Configuration

---

#### Intent
Collects user input across one or more fields and submits it as a complete data object. Used for creation, editing, and configuration flows.

---

#### Pattern Selection Rules

**Use When**
- The user must input or edit structured data (create product, edit profile, configure settings)
- Submission requires validation before saving
- The flow has a clear submit/cancel outcome

**Do NOT Use When**
- Configuration is a list of on/off preferences → use Settings pattern
- The form is embedded inside a modal (2–4 fields) → no pattern needed, use Modal directly
- The form is inside a SideSheet → no pattern needed, use SideSheet directly

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [section-banner]
- [form-section] *(repeatable)*
- [media-upload]
- [form-actions]

---

#### Slot Definitions

**[form-section]**
- **Allowed:** `Input`, `PhoneInput`, `DropdownMenu`, `Checkbox`, `CheckboxRow`, `Toggle`, `ToggleRow`, `Label`, `Badge`, `SectionHeader`
- **Do NOT Allow:** `DataTable`, `StatCard`, `Card`, `ChartCard`, `Modal`
- **Constraints:** Fields MUST follow a vertical flow by default. Field arrangement MUST be optimized: related compact fields SHOULD be grouped horizontally, complex fields SHOULD remain vertical. Each field MUST use `w-full`. Sub-sections within a form MUST use a sub-heading above the field group.

**[media-upload]**
- **Allowed:** `CoverImageUpload`
- **Do NOT Allow:** Any other component
- **Constraints:** This slot is optional. MUST only be included when a media asset is required. Layout MUST follow LAYOUT.md. MUST be preceded by a Label.

**[form-actions]**
- **Allowed:** `Button`
- **Do NOT Allow:** `IconButton`, `GradientButton`, any non-Button component
- **Constraints:** MUST include a primary action `Button`. SHOULD include a secondary action `Button`. MAY include additional actions if needed. Buttons MUST be right-aligned (per LAYOUT.md SC4).
- [form-actions] MUST NOT repeat CTA buttons that already appear in [page-header] for the same operation. If [page-header] contains action buttons (e.g. Save, Cancel, Publish) scoped to the same task, [form-actions] MUST NOT be included. This applies to Pattern 9 specifically — Pattern 4 and Pattern 7 are unaffected as their [page-header] carries only a title and description, not action buttons.

---

#### Content Density Rules

- **[form-section]:** Recommended 3–6 fields per sub-section. Hard maximum: 8 fields per sub-section. Fields count individually toward the sub-section maximum regardless of whether they are grouped horizontally. If the requested field count exceeds 8 in a single sub-section, issue a DENSITY FLAG before generating output — recommended alternative is to split into multiple [form-section] slots with distinct `SectionHeader` labels (see AGENTS.md).
- **[form-section] (repeatable):** Section count SHOULD remain manageable. If more sections are needed, use `Tabs` or `Accordion` to group them.
- **Accordion in forms:** Use multiple `Accordion` items to avoid single-item accordions.
- **[form-actions]:** See Slot Definitions.

---

#### Behavior Rules

- Validation errors MUST be displayed inline using the `error` prop on each `Input` — MUST NOT use a standalone `Alert` for field-level errors.
- A form-level error summary (when multiple fields fail) MUST use `Alert` placed above [form-section] within the affected section.
- The submit button MUST be disabled or show a loading state during submission — do not allow double-submit.
- [form-actions] MUST remain in the viewport at all times on long forms — do not bury actions below the fold without a sticky footer.

---

### Pattern 5: Detail Page

---

#### Intent
Displays all information about a single entity (product, post, contact, order) with contextual metrics, tabbed data sections, and entity-level actions.

---

#### Pattern Selection Rules

**Use When**
- The screen is focused on one specific entity
- The entity has multiple categories of related data best separated by tabs
- The user may take actions specific to this entity (edit, delete, publish)

**Do NOT Use When**
- Multiple entities are shown at the same level → use Data List pattern
- The screen is purely metric/analytics → use Analytics pattern
- The entity has no related sub-data and only a handful of fields → use Form pattern

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [section-banner]
- [summary]
- [section-nav]
- [section-content]

---

#### Slot Definitions

**[summary]**
- **Allowed:** `StatCard`, `FollowerCount`, `Badge`, `Thumbnail`
- **Do NOT Allow:** `ChartCard`, `DataTable`, `Card`, `ActionCard`
- **Constraints:** Layout MUST follow LAYOUT.md. Use `items-stretch` for `StatCard` alignment. `FollowerCount` and `Badge` MUST be inline elements — MUST NOT stretch full-width.

**[section-nav]**
- **Allowed:** `Tabs` (line variant)
- **Do NOT Allow:** `MenuList`, `Button`, any other component
- **Constraints:** MUST span full width of its container (per LAYOUT.md SC8).

**[section-content]**
- **Allowed:** `DataTable`, `TableList`, `MenuList`, `ToggleRow`, `Card`, `StatCard`, `ChartCard`, `ChartFullWidth`, `EmptyState`
- **Do NOT Allow:** Another [section-nav] nested within section content
- **Constraints:** Content within this slot MUST follow the appropriate pattern for its data type. Layout MUST follow LAYOUT.md.

---

#### Content Density Rules

- **[summary] items:** Recommended 2–4 items. Hard maximum: 6 items. Threshold applies to all components in the slot combined. If the requested count exceeds 6, issue a DENSITY FLAG before generating output — recommended alternative is to prioritize key metrics and move secondary ones into [section-content] (see AGENTS.md). If only 1 metric exists, use `StatCard` full-width without a grid wrapper (per LAYOUT.md LB8).
- **[section-nav] tabs:** Recommended 4–6 tabs. Hard maximum: 8 tabs. If the requested tab count exceeds 8, issue a DENSITY FLAG before generating output — recommended alternative is to consolidate into broader categories (see AGENTS.md).
- **[section-content]:** Show `EmptyState` when the active tab has no data — the section heading and [section-nav] MUST remain visible.

---

#### Behavior Rules

- The active tab state in [section-nav] MUST determine which content renders in [section-content].
- Entity-level actions in [page-header] affect the entire entity, not a specific tab.
- Tab-specific actions MUST appear in a [section-header] within [section-content], not in [page-header].
- Loading state for [section-content] MUST use skeleton loaders that match the expected content dimensions (per LAYOUT.md ST3).

---

### Pattern 6: Split View

---

#### Intent
Allows the user to browse a list of items while viewing the detail of a selected item simultaneously, without navigating away from the list.

---

#### Layout
Uses `full-stretch` layout type (LAYOUT.md S10).
Structure: outer wrapper `flex w-full`, list panel at a fixed width declared as an SP8 approved exception with inline comment, detail panel fills remaining space with `flex-1 min-w-0`.
At Mobile: collapse to single column — list panel visible by default; selecting an item navigates to the detail panel as a full-screen view.

---

#### Pattern Selection Rules

**Use When**
- The user needs to compare or sequentially review multiple items
- Navigating to a separate detail page would disrupt the browsing flow
- The list and detail are strongly related (e.g. inbox, product catalog with preview)

**Do NOT Use When**
- The detail view is complex and requires full-screen focus → use Detail Page pattern with navigation
- The list is short (fewer than 5 items) and detail is minimal → use a simple list with a Modal
- Mobile breakpoint is the primary target — Split View MUST collapse to sequential navigation at Mobile

---

#### Slot Architecture

- [global-banner]
- [list-panel]
- [detail-panel]

*[page-header] is intentionally omitted — Split View occupies the full content area and uses the [list-panel] as its primary navigation surface.*

---

#### Slot Definitions

**[list-panel]**
- **Allowed:** `MenuList` + `MenuListItem`, `TableList`, `Input` (search), `Tabs` (filter)
- **Do NOT Allow:** `DataTable`, `StatCard`, `ChartCard`, `Card`
- **Constraints:** Sizing and layout MUST follow LAYOUT.md constraints. List items MUST be selectable — active/selected state MUST be reflected via `state="selected"` on `MenuListItem`.

**[detail-panel]**
- **Allowed:** Any component appropriate to the entity type, following Detail Page slot definitions
- **Do NOT Allow:** Another `MenuList` or list-browsing component
- **Constraints:** When no item is selected, MUST render an `EmptyState` with instruction text. MUST NOT be empty or blank without an `EmptyState`.

---

#### Content Density Rules

- **[list-panel]:** Show `EmptyState` in the list panel when 0 items exist. Paginate when list becomes unmanageable for usability.
- **[detail-panel]:** Show `EmptyState` when no item is selected. When an item is selected, follow content density rules of the Detail Page pattern.

---

#### Behavior Rules

- Selecting an item in [list-panel] MUST update [detail-panel] without a page navigation.
- At Mobile breakpoint, Split View MUST collapse: [list-panel] shows first; selecting an item navigates to [detail-panel] as a full-screen view.
- At Tablet breakpoint, Split View MAY remain side-by-side if space allows, otherwise collapse to sequential navigation.
- Filter or search in [list-panel] MUST affect only [list-panel] content.

---

### Pattern 7: Settings Page

---

#### Intent
Allows users to view and modify account, product, or application configuration preferences, organized into logical groups.

---

#### Pattern Selection Rules

**Use When**
- The screen presents user-configurable preferences, feature flags, or account settings
- Settings are organized into multiple named categories
- Each setting has an immediate or deferred effect

**Do NOT Use When**
- The screen is a one-time setup flow → use Form pattern
- Settings are a sub-section of a Detail Page → embed within Detail Page [section-content]
- The screen has only 1–3 settings → embed directly in a form section, no pattern needed

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [settings-nav]
- [section-banner]
- [settings-section] *(repeatable — one per active category)*
- [section-actions]

---

#### Slot Definitions

**[settings-nav]**
- **Allowed:** `Tabs` (line variant), `MenuList` + `MenuListItem`
- **Do NOT Allow:** `DropdownMenu`, `Button`, any other component
- **Constraints:** Use `Tabs` (line variant) for horizontal settings navigation when category count is manageable. Use `MenuList` for vertical settings navigation when tabs become unmanageable.

**[settings-section]**
- **Allowed:** `ToggleRow`, `CheckboxRow`, `Input`, `DropdownMenu`, `Button`, `Badge`, `Lock`, `Nudge` (contextual)
- **Do NOT Allow:** `DataTable`, `StatCard`, `ChartCard`, `Card`, `ActionCard`
- **Constraints:** `ToggleRow` and `CheckboxRow` MUST be stacked vertically in a single column — MUST NOT be placed in a multi-column grid. Each settings group MUST have a sub-heading above it.

**[section-actions]**
- **Allowed:** `Button`
- **Do NOT Allow:** Any other component
- **Constraints:** This slot is optional. Include only for settings sections that require explicit save (deferred effect). Immediate-effect settings (ToggleRow) MUST NOT have a save button. When present: 1 primary save `Button` + 1 cancel `Button`, right-aligned.

---

#### Content Density Rules

- **[settings-nav] tabs:** Recommended 3–5 tabs. Hard maximum: 6 tabs. If the requested tab count exceeds 6, issue a DENSITY FLAG before generating output — recommended alternative is to switch to `MenuList` vertical navigation (see AGENTS.md).
- **[settings-section] groups:** Recommended 3–6 settings per group. Hard maximum: 7 settings per group. If the requested setting count exceeds 7 in a single group, issue a DENSITY FLAG before generating output — recommended alternative is to split into sub-groups each with a distinct sub-heading (see AGENTS.md).
- **[settings-section] (repeatable):** Only 1 [settings-section] is active/visible at a time, determined by [settings-nav] selection.

---

#### Behavior Rules

- Active category in [settings-nav] MUST determine which [settings-section] is rendered.
- `ToggleRow` settings MUST take effect immediately — no save button required.
- `Input` and `DropdownMenu` settings in a section with [section-actions] MUST NOT save until the save button is clicked.
- `Lock` components on restricted settings MUST prevent interaction — clicking a locked setting MUST trigger an upgrade flow (Modal or navigation), not silent failure.

---

### Pattern 8: Empty / Zero State Page

---

#### Intent
Handles the full-page case where a product, feature, or workspace has no data yet. Guides the user toward their first meaningful action.

---

#### Pattern Selection Rules

**Use When**
- An entire page has no data because the feature has not been set up
- First-time user experience for a specific product area
- The zero-state is a permanent structural state, not a transient loading state

**Do NOT Use When**
- Only a section within a page has no data → use `EmptyState` component within the appropriate pattern's [content] slot
- The data is loading → use skeleton loaders within the active pattern
- An error caused the empty state → use error state within the active pattern (per LAYOUT.md ST5)

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [empty-content]

---

#### Slot Definitions

**[empty-content]**
- **Allowed:** `EmptyState`
- **Do NOT Allow:** Any other component as a primary element
- **Constraints:** Layout MUST follow LAYOUT.md. Center-alignment is permitted within `EmptyState` (per LAYOUT.md A3).

---

#### Content Density Rules

- **[empty-content]:** MUST NOT render multiple `EmptyState` components on the same page.
- **[empty-content] CTA:** At most 1 `Button variant="primary"` inside `EmptyState`. If a secondary link action is needed, use `Button variant="link"` — not a second primary button.

---

#### Behavior Rules

- [page-header] MUST remain visible above [empty-content] — the heading provides context for the empty state (per LAYOUT.md ST1).
- The `EmptyState` CTA MUST trigger either a Modal (for short creation flows) or navigate to a Form pattern (for complex creation flows).
- When data is created, the page MUST transition to the appropriate pattern (Dashboard, Data List, etc.) — it MUST NOT remain on the Empty State pattern with data present.

---

### Pattern 9: Builder / Aside-Panel

---

#### Intent
A primary content area (form, rule builder, or configuration flow) with a supplementary fixed-width panel to the right that provides contextual information, a live preview, or a running summary. The aside panel is supplementary — it MUST NOT contain the primary task content.

---

#### Pattern Selection Rules

**Use When**
- The screen has a primary creation, configuration, or rule-building task AND a contextual panel (live preview, estimator, referral info, app preview)
- The aside panel content updates reactively in response to changes in the main column

**Do NOT Use When**
- Both columns contain primary, peer-level content → use Split View (Pattern 6)
- The supplementary content can be collapsed below the main content at desktop without loss — use a stacked single-column layout instead
- Mobile is the primary target — aside-panel collapses to hidden at Mobile/Tablet

---

#### Layout
Follows LAYOUT.md S10 (`aside-panel`), S12, and S15 (responsive matrix):
- Outer wrapper (Desktop/Wide): `flex gap-300 w-fit mx-auto` or `flex gap-400 w-fit mx-auto` — `w-fit` shrinks the container to the natural width of its children so that `mx-auto` centers the combined layout as a unit. At Mobile/Tablet: `w-full` (with `sm:w-fit sm:mx-auto` at Tablet) per LAYOUT.md S15.
- Main column (Desktop/Wide): `w-[var(--layout-content-max-width)] min-w-0` — fixed width using the content max-width token. At Mobile: `w-full`. At Tablet: `sm:w-[var(--layout-content-max-width)] min-w-0`. MUST NOT use `flex-1`.
- Aside column: fixed width per Figma spec, declared as SP8 approved exception with inline comment, `sticky top-0`
- Aside hidden below lg breakpoint (Wide): `hidden lg:block`

---

#### Slot Architecture

- [global-banner]
- [page-header]
- [main-column]
- [aside-panel]

---

#### Slot Definitions

**[main-column]**
- **Allowed:** Form fields, rule builder groups, configuration sections — following Pattern 4 or Pattern 7 slot rules within this column. `SectionHeader` MUST be used for any named sub-section heading.
- **Do NOT Allow:** `DataTable`, `ChartFullWidth`, `StatCard` grid at the top level of this column
- **Constraints:** Fields MUST follow a vertical flow by default. Field arrangement MUST be optimized per UX_RULES.md. Sub-sections MUST use `SectionHeader`. Width MUST be responsive: `w-full` at Mobile, `sm:w-[var(--layout-content-max-width)] min-w-0` at Tablet and above. Fixed-width-only (no mobile fallback) is PROHIBITED — it causes horizontal overflow below 768px. The outer wrapper containing both [main-column] and [aside-panel] MUST use `flex gap-300 w-full sm:w-fit sm:mx-auto items-start` — `w-full` at Mobile, `w-fit mx-auto` from Tablet onward (per LAYOUT.md S15 aside-panel matrix).

**[aside-panel]**
- **Allowed:** Read-only summary content, `StatCard`, live preview component, contextual `Nudge`, `Badge`, text blocks using design tokens
- **Do NOT Allow:** Primary form controls (`Input`, `DropdownMenu`, `Toggle`) as the main interactive element. The aside MUST NOT be the primary task surface.
- **Constraints:** Width is a fixed SP8 approved exception. MUST be `sticky top-0`. MUST be hidden below the lg breakpoint (`hidden lg:block`). When aside panel content is critical to the task (e.g. live reach estimate, running total, pricing summary), it MUST be accessible at Mobile and Tablet via an `Alert type="info"` trigger positioned immediately after `TaskHeader`, before the scrollable content area. The Alert MUST use `dismissible={false}` and an `actionLabel` that opens a `BottomSheet` containing the aside content. The Alert is visible at Mobile/Tablet only (`md:hidden`). Critical content MUST NOT be permanently discarded. Non-critical aside content (supplementary tips, contextual nudges) MAY be omitted at Mobile and Tablet.

---

#### Content Density Rules

- **[main-column]:** Density rules for this column follow Pattern 4 (Form / Configuration) or Pattern 7 (Settings Page) density rules as applicable to the content type being built. DENSITY FLAG triggers from those patterns apply here.
- **[aside-panel]:** No hard maximum — aside panel content is supplementary and read-only by definition. Keep concise for usability.

---

#### Behavior Rules

- Aside panel MUST update reactively when main column state changes (where applicable)
- At Mobile/Tablet, aside panel content that is critical to the task MUST be surfaced inline within [main-column] — do not permanently discard it
- [page-header] actions affect the entire builder, not a single column
- Page header inner content MUST follow LAYOUT.md S13 responsive rules: hidden at Mobile/Tablet (`hidden md:block`), full-width flex at Desktop, column-mirrored at Wide. Column mirroring applies ONLY at Wide where the aside panel is visible. See also LAYOUT.md S15 matrix.
- **[form-actions] MUST NOT be rendered inside [main-column] for Pattern 9.** Actions for the builder belong exclusively in [page-header]. This overrides the [form-actions] slot inherited from Pattern 4 — Pattern 9's [page-header] replaces the bottom form-actions row entirely at all breakpoints. The persistent [page-header] satisfies the "actions must remain in viewport" requirement from Pattern 4 Behavior Rules — a duplicate [form-actions] row is PROHIBITED.

---

## 4. Interaction Patterns

Interaction patterns define how specific repeated interactions MUST be implemented regardless of which screen pattern is active.

---

### Operator connector in rule builders

**Use When**
A screen contains a rule builder where conditions or groups are connected by a logical operator (AND / OR).

**Component**
Always use `OperatorChip`. Never use a raw `<button>`, a static text label, or `Badge` for this purpose.

**Placement**

| Context | Placement |
|---------|-----------|
| Between conditions within a group | Render `OperatorChip` flush-left (`pl-[2px]` *(SP8 exception — Figma spec value; must be commented in code)*) directly below the preceding condition row, above the next condition row |
| Between groups within a section | Render `OperatorChip` centred between two horizontal divider lines: `flex items-center gap-[12px]` *(SP8 exception — Figma spec value; must be commented in code)* → divider / chip / divider |

**Behavior**
- A single `OperatorChip` controls all connections at its level (all within-group connectors share one operator per group; all between-group connectors share one operator per section)
- Changing the chip updates the operator for every connector at that level simultaneously
- The chip MUST always be interactive — a rule builder with a static connector is PROHIBITED

---

## 5. Pattern Selection Decision Rules

**P1.** When the screen aggregates metrics, activity, and actions from multiple domains → **Dashboard**

**P2.** When the screen is focused on time-series chart analysis for a single domain → **Analytics**

**P3.** When the screen is a browsable, filterable collection of records → **Data List**

**P4.** When the screen collects user input for creation or editing → **Form / Configuration**

**P5.** When the screen displays all information about a single entity with tabbed sub-data → **Detail Page**

**P6.** When the user must browse a list and view item detail simultaneously → **Split View**

**P7.** When the screen presents user-configurable preferences organized into categories → **Settings Page**

**P8.** When an entire page has no data and the user must take a first action → **Empty / Zero State Page**

**P9.** When a screen combines characteristics of two patterns (e.g. a dashboard with a drill-down list), apply the dominant pattern for the primary content area and use the secondary pattern's slots within the appropriate [section-content] slot.

**P10.** When no pattern matches, compose from scratch using LAYOUT.md shell and grid rules + COMPONENT_MAP.md component selection. Do not force-fit an existing pattern.

**P11.** When the screen has a primary creation, configuration, or rule-building task alongside a fixed supplementary panel (preview, estimator, summary) → **Builder / Aside-Panel (Pattern 9)**

---

## 6. Mobile Shell Mode Assignment

At Mobile and Tablet breakpoints, each pattern MUST use the mobile shell mode defined below (per LAYOUT.md R11).

| Pattern | Mobile shell mode | Notes |
|---------|-------------------|-------|
| Pattern 1 — Dashboard | Browse | |
| Pattern 2 — Analytics | Browse | |
| Pattern 3 — Data List | Browse | |
| Pattern 4 — Form / Configuration | Task | Multi-step flows show step indicator in `TaskHeader`. Single-step flows omit it. |
| Pattern 5 — Detail Page | Browse | |
| Pattern 6 — Split View | Browse | At Mobile, list/detail sequential navigation still uses `BottomNavBar` — the navigation collapse is handled within the pattern, not by switching shell mode. |
| Pattern 7 — Settings Page | Browse | |
| Pattern 8 — Empty / Zero State | Browse | |
| Pattern 9 — Builder / Aside-Panel | Task | |

**M1.** When a screen uses `proportional-split` layout (LAYOUT.md S14), the `TaskHeader` MUST include a Preview secondary action that opens the hidden preview column as a full-screen overlay. This is the only layout type where the Preview action is permitted.

**M2.** When a pattern is assigned Task mode, the `BottomNavBar` MUST NOT be rendered. When a pattern is assigned Browse mode, the `TaskHeader` and sticky [form-actions] footer MUST NOT be rendered.

**M3.** If a screen does not match any defined pattern (P10 — compose from scratch), default to Browse mode unless the screen's primary intent is creation or editing, in which case use Task mode.

---

`End of PATTERNS.md`
