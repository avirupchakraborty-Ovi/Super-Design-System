# PATTERNS.md
## Super Design System — Screen Composition Rules
`Version 1.0 | Depends on: LAYOUT.md, COMPONENT_MAP.md | Priority: Third`

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

---

### [global-banner]
- **Allowed:** `Alert`, `Nudge` (global type only)
- **Do NOT Allow:** `PromoBanner`, `Nudge` (contextual type), any other component
- **Constraints:** MUST appear before all other slots in the content area (per LAYOUT.md SC6). At most one `Alert` and one `Nudge` may appear simultaneously.
- **Ordering:** `Alert` MUST precede `Nudge` when both are present.

### [page-header]
- **Allowed:** Heading text, optional sub-text, `Button`, `IconButton`, `Badge`, `Tabs` (line variant only)
- **Do NOT Allow:** `StatCard`, `Card`, `DataTable`, `Modal`, form controls
- **Constraints:** MUST follow section header structure from LAYOUT.md SC5: `[Heading + optional subtext — left]` `[optional actions — right]`. Section-level action buttons MUST be right-aligned (per LAYOUT.md SC4). At most one `Button variant="primary"` or `variant="brand"` per page header. For `centered` layouts, the page header inner content MUST be constrained to `var(--layout-content-max-width)` with `mx-auto`. For `aside-panel` layouts, the page header inner content MUST mirror the column structure of the content block — heading in a `w-[var(--layout-content-max-width)] min-w-0` div, CTAs in a fixed-width div matching the aside panel width declared as an SP8 exception — both wrapped in `flex gap-300 w-fit mx-auto` (per LAYOUT.md S14).

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
- [metrics]
- [primary-chart]
- [activity]
- [quick-actions]

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
- **Constraints:** MUST be full-width. MUST be the sole component in this slot (per LAYOUT.md LB8). This slot is optional — omit entirely if no time-series analytics exist.

**[activity]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `MenuList`, `Card`, `StatCard`
- **Constraints:** MUST be full-width. Use `DataTable` when records require sort or filter. Use `TableList` when simple display with no controls is sufficient (per DS1).
- **Ordering:** Precede with a [section-header].

**[quick-actions]**
- **Preferred:** `ActionCard`
- **Alternative:** `Button` MAY be used as a fallback when `ActionCard` is not suitable
- **Do NOT Allow:** `Card`, `MenuList`, any other component
- **Constraints:** This slot is optional. SHOULD render at least 3 `ActionCard` components for visual balance. If fewer actions exist, MAY render available actions or fallback to `Button`-based actions. ActionCards MUST be placed in a grid.

---

#### Content Density Rules

- **[metrics]:** Minimum 2 components. Maximum 4 components. Grid configuration follows LAYOUT.md grid rules. If only 1 metric exists, use `StatCard` full-width without a grid wrapper (per LAYOUT.md LB8).
- **[primary-chart]:** Exactly 1 `ChartFullWidth` or omit slot entirely.
- **[activity]:** Show `EmptyState` when 0 records. Paginate when `DataTable` exceeds 10 rows. Paginate when `TableList` exceeds 20 rows.
- **[mobile]:** At Mobile breakpoint, DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.
- **[quick-actions]:** SHOULD render at least 3 `ActionCard` components for visual balance. Maximum 6. If fewer actions exist, MAY render available actions or fallback to `Button`-based actions.

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
- **Constraints:** Components MUST be arranged using a grid appropriate to the number of items (per LAYOUT.md grid rules). Column count MUST be determined by layout constraints, not pattern rules. MUST use `items-stretch`.

**[trend-chart]**
- **Allowed:** `ChartFullWidth`
- **Do NOT Allow:** `ChartCard`, `StatCard`, any other component
- **Constraints:** MUST be full-width. MUST be the sole component in this slot (per LAYOUT.md LB8).

**[breakdown]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `Card`, `StatCard`, `ChartCard`
- **Constraints:** MUST be full-width. Optional — omit if no breakdown data exists.

---

#### Content Density Rules

- **[metric-summary]:** Minimum 2 `ChartCard` components. Maximum 4. Grid configuration follows LAYOUT.md grid rules.
- **[trend-chart]:** Exactly 1 `ChartFullWidth`.
- **[breakdown]:** Show `EmptyState` when 0 records. Paginate when `DataTable` exceeds 10 rows.
- **[mobile]:** At Mobile breakpoint, DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.

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
- **Allowed:** `Tabs` (pill or line variant), `Button` (filter/sort controls), `DropdownMenu`, `Input` (search)
- **Do NOT Allow:** `StatCard`, `Card`, `DataTable`, `MenuList`
- **Constraints:** MUST appear above [content] (per LAYOUT.md SC3). `Tabs` in this slot MUST span full container width (per LAYOUT.md SC8).

**[content]**
- **Allowed:** `DataTable`, `TableList`
- **Do NOT Allow:** `Card`, `StatCard`, `MenuList`, `Accordion`
- **Constraints:** MUST be full-width. Use `DataTable` when records require sort, filter, or bulk action. Use `TableList` when display-only (per DS1).

**[pagination]**
- **Allowed:** `Pagination`
- **Do NOT Allow:** Any other component
- **Constraints:** MUST appear at the bottom of [content] (per LAYOUT.md SC7). MUST NOT appear above [content].

---

#### Content Density Rules

- **[filter-bar] tabs:** Minimum 2 tabs. Maximum 6 tabs. If more than 6 filter states exist, use `DropdownMenu` for overflow — do not render more than 6 tabs.
- **[content]:** Show `EmptyState` when 0 records. Show filtered-empty message inline when filters return 0 results without resetting the filter bar.
- **[pagination]:** Render `Pagination` when `DataTable` exceeds 10 rows. Render `Pagination` when `TableList` exceeds 20 rows. Hide `Pagination` when only 1 page exists.
- **[mobile]:** At Mobile breakpoint, DataTable toolbar and pagination controls adapt automatically (icon-only buttons, hidden "Items per page" label). No pattern-level change is required.

---

#### Behavior Rules

- Filter and sort controls in [filter-bar] MUST affect only [content] within the same section.
- Active filter state MUST be reflected in the [filter-bar] component (active tab, selected dropdown value).
- When [content] transitions to loading, skeleton loaders MUST occupy identical space to loaded content (per LAYOUT.md ST3, ST4).
- Error state MUST be localized to [content] — it MUST NOT replace the page (per LAYOUT.md ST5).

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
- **Constraints:** Fields MUST be stacked vertically in a single column. Each field MUST use `w-full`. MUST NOT place form fields in a multi-column grid. Sub-sections within a form MUST use a sub-heading above the field group.

**[media-upload]**
- **Allowed:** `CoverImageUpload`
- **Do NOT Allow:** Any other component
- **Constraints:** This slot is optional. MUST only be included when a media asset is required. MUST be full-width. MUST be preceded by a Label.

**[form-actions]**
- **Allowed:** `Button`
- **Do NOT Allow:** `IconButton`, `GradientButton`, any non-Button component
- **Constraints:** MUST contain exactly 1 primary submit `Button` and 1 cancel/secondary `Button`. MUST NOT contain more than 2 action buttons. Buttons MUST be right-aligned (per LAYOUT.md SC4).

---

#### Content Density Rules

- **[form-section]:** Minimum 1 field. Maximum 8 fields per section. If more than 8 fields are needed, split into multiple [form-section] slots with distinct sub-headings.
- **[form-section] (repeatable):** Maximum 4 form sections per page. If more sections are needed, use `Tabs` or `Accordion` to group them.
- **Accordion in forms:** Minimum 2 `Accordion` items when used. Never use a single-item Accordion.
- **[form-actions]:** Always exactly 2 buttons — 1 submit, 1 cancel. No exceptions.

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
- **Constraints:** `StatCard` MUST be placed in a grid with `items-stretch`. `FollowerCount` and `Badge` MUST be inline elements — MUST NOT stretch full-width.

**[section-nav]**
- **Allowed:** `Tabs` (line variant)
- **Do NOT Allow:** `MenuList`, `Button`, any other component
- **Constraints:** MUST span full width of its container (per LAYOUT.md SC8).

**[section-content]**
- **Allowed:** `DataTable`, `TableList`, `MenuList`, `ToggleRow`, `Card`, `StatCard`, `ChartCard`, `ChartFullWidth`, `EmptyState`
- **Do NOT Allow:** Another [section-nav] nested within section content
- **Constraints:** Content within this slot MUST follow the appropriate pattern for its data type. Full-width components (`DataTable`, `ChartFullWidth`) MUST NOT be placed in a multi-column grid.

---

#### Content Density Rules

- **[summary] StatCards:** Minimum 2. Maximum 4. If only 1 metric exists, use `StatCard` full-width without a grid wrapper (per LAYOUT.md LB8).
- **[section-nav] tabs:** Minimum 2 tabs. Maximum 6 tabs. If more than 6 sections exist, consolidate into broader categories — do not render more than 6 tabs.
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

- **[list-panel]:** Show `EmptyState` in the list panel when 0 items exist. Paginate when list exceeds 20 items.
- **[detail-panel]:** Exactly 1 `EmptyState` when no item is selected. When an item is selected, follow content density rules of the Detail Page pattern.

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

- [page-header]
- [settings-nav]
- [settings-section] *(repeatable — one per active category)*
- [section-actions]

---

#### Slot Definitions

**[settings-nav]**
- **Allowed:** `Tabs` (line variant), `MenuList` + `MenuListItem`
- **Do NOT Allow:** `DropdownMenu`, `Button`, any other component
- **Constraints:** Use `Tabs` (line variant) for horizontal settings navigation (≤6 categories). Use `MenuList` for vertical settings navigation (>6 categories or sidebar-style layout).

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

- **[settings-nav] tabs:** Minimum 2 categories. Maximum 6 tabs. If more than 6 categories exist, use `MenuList` for vertical navigation instead of `Tabs`.
- **[settings-section] groups:** Minimum 1 setting per group. Maximum 10 settings per group. If more than 10 settings exist in a group, split into sub-groups with sub-headings.
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
- **Constraints:** MUST be full-width (per LAYOUT.md ST2). MUST NOT be placed inside a multi-column grid. Center-alignment is permitted within `EmptyState` (per LAYOUT.md A3).

---

#### Content Density Rules

- **[empty-content]:** Exactly 1 `EmptyState` component. MUST NOT render multiple `EmptyState` components on the same page.
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
Follows LAYOUT.md S10 (`aside-panel`) and S12:
- Outer wrapper: `flex gap-300 w-fit mx-auto` or `flex gap-400 w-fit mx-auto` — `w-fit` shrinks the container to the natural width of its children so that `mx-auto` centers the combined layout as a unit
- Main column: `w-[var(--layout-content-max-width)] min-w-0` — fixed width using the content max-width token. MUST NOT use `flex-1`.
- Aside column: fixed width per Figma spec, declared as SP8 approved exception with inline comment, `sticky top-0`
- Aside hidden below xl breakpoint: `hidden xl:block`

---

#### Slot Architecture

- [page-header]
- [main-column]
- [aside-panel]

---

#### Slot Definitions

**[main-column]**
- **Allowed:** Form fields, rule builder groups, configuration sections — following Pattern 4 or Pattern 7 slot rules within this column. `SectionHeader` MUST be used for any named sub-section heading.
- **Do NOT Allow:** `DataTable`, `ChartFullWidth`, `StatCard` grid at the top level of this column
- **Constraints:** Fields and groups MUST be stacked vertically. Sub-sections MUST use `SectionHeader`.

**[aside-panel]**
- **Allowed:** Read-only summary content, `StatCard`, live preview component, contextual `Nudge`, `Badge`, text blocks using design tokens
- **Do NOT Allow:** Primary form controls (`Input`, `DropdownMenu`, `Toggle`) as the main interactive element. The aside MUST NOT be the primary task surface.
- **Constraints:** Width is a fixed SP8 approved exception. MUST be `sticky top-0`. MUST be hidden at Mobile and Tablet (`hidden lg:block`).

---

#### Behavior Rules

- Aside panel MUST update reactively when main column state changes (where applicable)
- At Mobile/Tablet, aside panel content that is critical to the task MUST be surfaced inline within [main-column] — do not permanently discard it
- [page-header] actions affect the entire builder, not a single column
- Page header inner content MUST mirror the column structure of the content block: outer wrapper `flex gap-300 w-fit mx-auto`, heading div `w-[var(--layout-content-max-width)] min-w-0`, CTA div at the aside panel fixed width (SP8 exception) with `flex-none flex items-center justify-end gap-100`. This left-aligns the heading with the main column and right-aligns the CTAs with the aside panel edge.

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
| Between conditions within a group | Render `OperatorChip` flush-left (`pl-[2px]`) directly below the preceding condition row, above the next condition row |
| Between groups within a section | Render `OperatorChip` centred between two horizontal divider lines: `flex items-center gap-[12px]` → divider / chip / divider |

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

`End of PATTERNS.md`
