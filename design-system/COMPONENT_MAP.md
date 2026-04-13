# COMPONENT_MAP.md
## Super Design System — Component Selection Rules
`Version 1.7 | Depends on: LAYOUT.md | Priority: Second — see AGENTS.md for full priority chain`

---

## 1. Purpose

### What this file controls
- Which component MUST be used for a given UI need
- When a component MUST NOT be used
- Component-level constraints, variants, and composition rules
- Typography token usage across all components

### What this file explicitly does NOT control
- Grid layout, spacing, or breakpoints → LAYOUT.md
- How components are composed into screen patterns → PATTERNS.md
- Component-internal implementation
- Content, copy, or data

---

## 2. Typography Tokens

Typography token selection MUST follow these rules exactly. These rules apply across all components.

### Size Tokens

| Token | Size | MUST be used for |
|-------|------|-----------------|
| `text-h0` | 36px | Hero headings, full-page marketing banners only |
| `text-h1` | 26px | Primary KPI values, large display numbers |
| `text-h2` | 24px | `[page-header]` screen-level headings. Rare for content-area sections — prefer `text-h3` for section headings within content. |
| `text-h3` | 20px | Primary section headings within content area |
| `text-h4` | 18px | Secondary section headings, card group labels |
| `text-title` | 16px | Card titles, modal headings, page sub-titles |
| `text-body` | 14px | All body content, list items, form field values |
| `text-supporting` | 12px | Field labels, captions, metadata, helper text, badges |

**T1.** Each text element MUST use exactly one size token. Mixing tokens within a single text element is PROHIBITED.

**T2.** `text-h0` MUST NOT be used inside cards, tables, or form components.

**T3.** All field labels above components that do not have a built-in `label` prop MUST use the `Label` component. Variant selection MUST reflect the label's hierarchy within its surrounding context — see the Label Variants table. `variant="supporting-caps"` MUST NOT be used as a direct field label above an input or control.

**T4.** Uppercase (`uppercase`) MUST only be applied to: stat card headings, table column headers, and `Label variant="supporting-caps"`. Applying uppercase to any other text is PROHIBITED.

### Color Tokens

| Token | MUST be used for |
|-------|-----------------|
| `text-text-level1` | Primary content, headings, values |
| `text-text-level2` | Secondary content, descriptions |
| `text-text-level3` | Helper text, placeholders, disabled labels |
| `text-text-level4` | Muted/faint text, ghost placeholders |
| `text-text-inverted` | Text on dark/inverted backgrounds |
| `text-text-critical-3` | Error messages, destructive state labels |
| `text-text-brand-primary` | Brand links, active indicators, CTA labels on light bg |

**T5.** All text MUST use a `text-text-*` semantic token. Primitive color values on text are PROHIBITED.

### Font Weight

| Weight | Token | MUST be used for |
|--------|-------|-----------------|
| Regular | `font-normal` | Body content, descriptions |
| Medium | `font-medium` | Labels, navigation items, secondary CTAs |
| Semibold | `font-semibold` | Headings, card titles, primary values, CTA labels |
| Bold | `font-bold` | Reserved — use only when semibold is insufficient for contrast |

---

## 3. Component Catalogue

---

### Button

**Purpose**
Triggers a user action or navigation event. The primary interactive control for all non-icon-only actions.

**Use When**
- An action requires a visible text label
- Submitting a form
- Triggering a primary, secondary, or destructive workflow
- Rendering an inline text link within content

**Do NOT Use When**
- The action requires an icon only → use `IconButton`
- The action is navigation between pages → use a link element
- The button is inside a table row action group → use `IconButton` with `TableActionGroup`
- Rendering a gradient CTA → use `GradientButton`

**Constraints**
- Shape MUST always be `full-rounded` (pill). `semi-rounded` is PROHIBITED.
- Exception: `shape="semi-rounded"` is permitted exclusively for filter/sort action buttons rendered inside `ChartFullWidth` headers, where the button sits directly adjacent to a semi-rounded input. This is the only approved exception to the `full-rounded` shape rule.
- Every `<button>` element in the UI MUST use the `Button` component. Raw styled `<button>` or `<span>` elements are PROHIBITED.
- Size MUST match the context density: `lg`/`md` for primary actions, `sm`/`xs` for compact areas, `inline` for text-embedded actions.
- A section MUST contain at most one `variant="primary"` Button unless explicitly differentiated in scope (per LAYOUT.md SC2).

**Variants**

| Variant | MUST be used for | MUST NOT be used for |
|---------|-----------------|---------------------|
| `brand` | Highest-priority CTA (one per screen) | Secondary or supporting actions |
| `primary` | Primary section action | Multiple actions at the same level |
| `secondary` | Supporting action alongside a primary | Standalone primary action |
| `tertiary` | Low-emphasis action, tertiary flow | Any action requiring visual prominence |
| `ghost` | Contextual actions inside containers | Standalone page-level CTAs |
| `outline` | Neutral actions, cancel/dismiss | Primary or brand-emphasis actions |
| `blue-outline` | Brand-tinted secondary action | Destructive actions |
| `dash-primary` | Upload zones, add-item affordances | Any filled or solid context |
| `dash-outline` | Secondary dashed affordance | Primary action contexts |
| `link` | Inline text actions within prose or form labels | Standalone button contexts |
| `destructive` (modifier) | Delete, remove, revoke actions | Any non-destructive action |

**Sizes**

| Size | Height | MUST be used for |
|------|--------|-----------------|
| `lg` | 48px | Hero CTAs, landing/onboarding screens |
| `md` | 40px | Default page-level actions |
| `sm` | 36px | Compact sections, card footers |
| `xs` | 32px | Dense UI, table toolbars, inline rows |
| `inline` | auto | Embedded within text content or tight component slots |

**Status:** stable

---

### IconButton

**Purpose**
Triggers an action using an icon only, without a text label.

**Use When**
- An action is representable by a universally understood icon (close, edit, delete, copy)
- Space is too constrained for a text label
- Actions within table rows (via `TableActionGroup`)
- Dismiss/close controls on overlays and banners

**Do NOT Use When**
- The action needs a text label for clarity → use `Button`
- The icon alone is ambiguous for the use case
- Rendering a navigation link

**Constraints**
- MUST always include an `aria-label` describing the action.
- Raw `<button>` elements styled as icon buttons are PROHIBITED.
- MUST NOT be used as a primary CTA — use `Button` instead.
- Minimum size is `xs` (32×32px) to satisfy touch target requirements.
- `shape="semi-rounded"` MUST only be used when the button is visually attached to or directly adjacent to a semi-rounded input or search field. Using it in isolation is PROHIBITED.

**Variants**
Identical variant set to `Button`: `brand`, `primary`, `secondary`, `tertiary`, `ghost`, `outline`, `blue-outline`. Apply the same variant selection logic as Button.

**Shape**
- `circle` — default. Use in all standalone contexts: table row actions, overlay dismiss controls, toolbars.
- `semi-rounded` — use only when the icon button is paired with or embedded inside a `semi-rounded` input or search field, so the corner radius matches its container.

**Sizes**

| Size | Dimension |
|------|-----------|
| `lg` | 44×44px |
| `md` | 40×40px |
| `sm` | 36×36px |
| `xs` | 32×32px |
| `inline` | 28×28px |

**Status:** stable

---

### GradientButton

**Purpose**
High-emphasis CTA with a gradient fill. Used for upgrade prompts, plan upsells, and premium feature entry points.

**Use When**
- Promoting a paid plan upgrade
- Premium or Pro feature CTA
- A single high-emphasis action that must stand apart visually from standard buttons

**Do NOT Use When**
- Standard page actions — use `Button variant="brand"` or `variant="primary"`
- More than one gradient button appears in the same section
- Inside compact/dense UI contexts (tables, form rows)

**Constraints**
- MUST NOT appear more than once per screen.
- MUST NOT be used for destructive actions.
- Shape is always pill (full-rounded) — no override.

**Status:** stable

---

### Input

**Purpose**
Single-line or multiline text entry field for user data input.

**Use When**
- Collecting free-form text, email, URL, phone, or password
- Displaying a read-only copyable value (use `copyable` prop)
- Multiline text entry (use `multiline` prop)

**Do NOT Use When**
- Selecting from a predefined list → use `DropdownMenu`
- A boolean on/off choice → use `Toggle` or `Checkbox`
- Rendering a search field inside a data table → use `DataTable` with `onSearch` prop

**Constraints**
- MUST use `w-full` within its container. Fixed pixel widths are PROHIBITED.
- MUST use the `label` prop for all form field labels. Raw `<label>` elements outside the component are PROHIBITED.
- Label hierarchy MUST be set via the `labelVariant` prop. Default is `body-medium`. `supporting-caps` is PROHIBITED — it MUST NOT be used as a direct field label per T3.
- Error state MUST be communicated via the `error` prop — not by external text below the field.
- `copyable` inputs are automatically read-only — MUST NOT allow user editing.

**Label Variants**

| Variant | When to use |
|---------|-------------|
| `body-regular` | Lowest visual weight — secondary or descriptive labels |
| `body-medium` | DEFAULT. Standard field label — use in most forms |
| `supporting-medium` | Dense or compact forms where labels are de-emphasised |
| `supporting-semibold` | Compact but prominent — stands out at small size |

`supporting-caps` is excluded. It MUST NOT be used as a direct field label above a control (T3).

**Variants (Shape)**

`semi-rounded` is the default shape for all inputs. `full-rounded` is only permitted when explicitly specified in the screen design.

| Shape | Rule |
|-------|------|
| `semi-rounded` | DEFAULT. MUST be used for all inputs unless explicitly overridden. |
| `full-rounded` | ONLY permitted when explicitly specified — standalone hero inputs, referral link fields, or any context where the design explicitly calls for a pill-shaped input. |

**Sizes**

| Size | Height | MUST be used for |
|------|--------|-----------------|
| `lg` | 44px | Prominent single-field forms (e.g. referral link) |
| `md` | 40px | Default form fields |
| `sm` | 36px | Compact filter bars, inline search |

**Status:** stable

---

### PhoneInput

**Purpose**
Single-line phone number input with an integrated country selector. Combines a flag icon, dial code, and a native dropdown for country selection with a standard text input for the phone number.

**Use When**
- Collecting a phone number that may have an international dial code
- The phone field requires country code selection alongside the number

**Do NOT Use When**
- A plain number field with no country selection is sufficient → use `Input type="tel"`
- The field is not specifically for phone numbers

**Constraints**
- MUST use `w-full` within its container. Fixed pixel widths are PROHIBITED.
- MUST use the `label` prop for all form field labels. Raw `<label>` elements outside the component are PROHIBITED.
- Error state MUST be communicated via the `error` prop — not by external text below the field.
- Default country is India (`"IN"`) — override via `defaultCountryCode` for other markets.
- `countryCode` puts the country selector in controlled mode — MUST provide `onCountryChange` when using it.

**Variants (Shape)**

`semi-rounded` is the default shape. `full-rounded` is only permitted when explicitly specified.

| Shape | Rule |
|-------|------|
| `semi-rounded` | DEFAULT. MUST be used for all phone inputs unless explicitly overridden. |
| `full-rounded` | ONLY permitted when explicitly specified in the screen design. |

**Sizes**

| Size | Height | MUST be used for |
|------|--------|-----------------|
| `lg` | 44px | Prominent single-field forms |
| `md` | 40px | Default form fields |
| `sm` | 36px | Compact filter bars, inline search |

**Status:** stable

---

### Label

**Purpose**
Standalone field label row with an optional mandatory asterisk and optional tooltip icon. Used when a label is needed above a component that does not have a built-in `label` prop.

**Use When**
- A label is needed above a component that does not accept a `label` prop (e.g. `DropdownMenu`, `CoverImageUpload`, a custom input, or a grouped field set)

**Do NOT Use When**
- Labelling an `Input` or `PhoneInput` → use the built-in `label` prop on those components directly
- The label is a sub-section heading → use `SectionHeader`

**Props**
- `label` — label text (defaults to `"Label"`)
- `variant` — typography style (see Variants table). Defaults to `"body-medium"`.
- `mandatory` — shows a `*` asterisk when `true`
- `tooltip` — shows an info icon when `true`
- `onTooltipClick` — click handler for the tooltip icon

**Variants**

| Variant | Size | Weight | Case | Character |
|---------|------|--------|------|-----------|
| `body-regular` | 14px | Regular | Normal | Lowest visual weight — descriptive, secondary |
| `body-medium` | 14px | Medium | Normal | Standard label weight — clear, neutral |
| `supporting-medium` | 12px | Medium | Normal | Compact, receded — de-emphasised |
| `supporting-semibold` | 12px | Semibold | Normal | Compact but prominent — stands out at small size |
| `supporting-caps` | 12px | Medium | Uppercase | Category and metadata marker — not a field label |

**Constraints**
- Variant MUST be selected based on the label's hierarchy within its surrounding context.
- Custom typography via `className` is PROHIBITED.
- `variant="supporting-caps"` MUST NOT be used as a direct field label above a single input or control.
- Mandatory asterisk MUST use `text-text-critical-3`.
- MUST NOT be used as a section heading — use `SectionHeader` for that purpose.

**Status:** stable

---

### CoverImageUpload

**Purpose**
Drag-and-drop upload zone for cover images and videos, with an optional URL entry fallback. Used in forms where the user must provide a media asset.

**Use When**
- Collecting a cover image, thumbnail, or video asset in a form
- The upload supports both file selection (drag-and-drop or click) and URL input

**Do NOT Use When**
- Uploading an avatar or profile photo — different sizing and crop behavior required
- General file upload with no media preview context — use a standard file input

**Constraints**
- MUST use `w-full` within its container. The component carries a minimum width derived from the Figma spec — override via container constraint, not a fixed prop.
- Error state renders below the upload zone using `text-text-critical-3`.
- MUST NOT be placed inside a multi-column grid.

**Composition Rules**
- MUST be preceded by a Label or field label.
- MUST be placed as a full-width field within a form section.

**Variants:** `showUrlInput={true|false}`

**Status:** stable

---

### DropdownMenu

**Purpose**
Presents a contextual list of selectable options, actions, or settings triggered by a user interaction.

**Use When**
- Selecting one option from a predefined list (single or multi-select)
- Presenting contextual actions for a row or element (action menu)
- Filtering or sorting via a trigger button

**Do NOT Use When**
- The list has 2 or fewer options — use `Toggle` or `Checkbox` instead
- Options require a text input alongside selection → use `Input` with suggestions
- Navigation between pages — use `Tabs` or sidebar navigation

**Trigger Selection**

| Trigger | Use When |
|---------|----------|
| `DropdownMenuChevronTrigger` | Form fields, single-select inputs, settings dropdowns. Full-width, bordered. Designed for vertical form layouts. Use `variant="form"` when placed alongside Input fields. |
| `DropdownMenuCompactTrigger` | Filter bars, toolbar controls, inline sort/export. Content-width, ghost style. Designed for horizontal rows. |
| `OperatorChip` | Inline logical connectors (AND / OR) between conditions or groups in a rule builder. Compact height (~24px). Use when `DropdownMenuCompactTrigger` (36px) is too tall for the surrounding context. |

**`DropdownMenuChevronTrigger` Variants**

| Variant | Border | Radius | Use When |
|---------|--------|--------|----------|
| `"default"` | `border-color-level2` (outer border) | 5px (hardcoded) | Standalone dropdowns outside of form layouts. |
| `"form"` | `border-color-level3` (ring-inset) | `rounded-100` (8px) | Inside form layouts alongside `Input` fields. Matches Input border treatment. |

**Constraints**
- MUST be triggered using the provided trigger components — raw trigger elements are PROHIBITED.
- MUST NOT be used as a full-page navigation menu.
- `DropdownMenuChevronTrigger` size MUST be `"sm"` by default. Only use `"md"` when explicitly specified by the design.
- `DropdownMenuChevronTrigger` variant MUST be `"form"` when placed inside a form layout alongside `Input` fields.

**Status:** stable

---

### OperatorChip

**Purpose**
An inline interactive chip for selecting between a small set of short text options. Self-contained — wraps `DropdownMenu` internally. Communicates interactivity via a border and rotating chevron.

**Use When**
- Connecting conditions within a rule group (condition-level AND / OR operator)
- Connecting rule groups within a builder section (group-level AND / OR operator)
- Any inline context where a short option must be toggled with clear interactive affordance and `DropdownMenuCompactTrigger` (36px) is too large

**Do NOT Use When**
- The options are not a logical operator — use `DropdownMenuCompactTrigger` or `Toggle` instead
- The chip can be static / non-interactive — use `Badge` instead
- More than 3 options are needed — use `DropdownMenuCompactTrigger`

**Props**
- `value` — currently selected option (e.g. `"AND"`)
- `options` — array of choices (default: `["AND", "OR"]`)
- `onChange` — called when a new option is selected

**Tokens**
- Padding: `px-100 py-50` (8px / 4px)
- Border radius: `rounded-050` (4px)
- Border: `border-border-color-level2` → open: `border-border-color-level3`
- Background: transparent → `hover:bg-surface-level2` → open: `bg-surface-level2`
- Text: `text-supporting font-semibold text-text-level2`
- Chevron: `Icon size="sm"` (16px), rotates 180° when open

**Height:** ~24px

**Constraints**
- `onChange` is always required — never render `OperatorChip` without a handler
- Minimum 2 options required
- Do not suppress the border or chevron — both are required for interactive affordance

**Status:** stable

---

### SectionHeader

**Purpose**
Renders a sub-section heading row within a content area, card, or panel. Combines a label, optional subtext, optional leading icon or image, and optional trailing action button in a single pre-composed primitive. Intentionally matches `MenuListItem` in spacing, typography, and icon sizing for visual consistency.

**Use When**
- Starting any named sub-section within a content area, card, or aside panel
- A sub-section needs a leading icon or image alongside its label
- A sub-section needs a trailing action button (e.g. "Add group", "Clear all", "Configure")

**Do NOT Use When**
- It is the primary page-level heading → use raw heading text within the [page-header] slot
- No label is needed → use a divider or omit the heading entirely
- The trailing action is destructive → use a dedicated section-level `Button` in [page-header] instead
- The row is part of a navigable list → use `MenuListItem`
- Multiple trailing actions are needed → compose manually

**Props**
- `label` — required. Primary heading text.
- `subText` — optional. Supporting description below the label.
- `icon` — optional. Leading Tabler icon. Ignored if `image` is also provided.
- `image` — optional. Leading image URL (32×32px). Takes precedence over `icon`.
- `imageAlt` — optional alt text for `image`.
- `trailingButton` — optional. Label for the trailing action button.
- `trailingButtonIcon` — optional. Leading icon for the trailing button.
- `onTrailingButtonClick` — optional. Click handler for the trailing button.

**Constraints**
- `icon` and `image` are mutually exclusive — if both are provided, `image` takes precedence
- Trailing button is hardcoded to `Button variant="outline" shape="full-rounded" size="sm"` — do not attempt to override size to `xs` or `md`
- Icon is always rendered at `size="md"` via the `Icon` component — do not pass raw SVG props
- `SectionHeader` has no border or background — the wrapping container controls those
- Padding MUST NOT be applied to `SectionHeader`'s root element — spacing is controlled by the parent container's `gap` (per LAYOUT.md SP6)
- The `SectionHeader` component MUST be used for all [section-header] slots — composing a raw `<h*>` + `<Button>` row is PROHIBITED

**Status:** stable

---

### Checkbox / CheckboxRow

**Purpose**
`Checkbox` — standalone binary selection control.
`CheckboxRow` — checkbox combined with a label and optional sub-text, for settings lists.

**Use When**
- `Checkbox`: Multi-select scenarios, form agreement fields, table row selection
- `CheckboxRow`: Settings panels where each option needs a descriptive label and sub-text

**Do NOT Use When**
- A single on/off setting → use `Toggle` or `ToggleRow`
- Selecting from mutually exclusive options → use `DropdownMenu`
- The checkbox is the only control on a row with no label — always pair with a label

**Constraints**
- `Checkbox` MUST NOT be rendered without an associated label (either via `CheckboxRow` or an explicit `<label>`).
- `CheckboxRow` MUST NOT be placed inside a data table row — use table-level selection patterns instead.
- Toggle position (`start`/`end`) in `CheckboxRow` MUST be consistent across all rows in the same list.

**Status:** stable

---

### Toggle / ToggleRow

**Purpose**
`Toggle` — standalone binary switch for immediate on/off state.
`ToggleRow` — toggle combined with label, sub-text, and optional leading icon or image, for settings lists.

**Use When**
- `Toggle`: Immediate binary state change with no confirmation required
- `ToggleRow`: Settings panels, feature flags, notification preferences — any setting that needs a descriptive row

**Do NOT Use When**
- Multi-select scenarios → use `Checkbox`
- The setting requires confirmation before applying → use a form with a `Button`
- Selecting from more than two states → use `DropdownMenu`

**Constraints**
- `Toggle` MUST NOT be used without context — always use `ToggleRow` or pair with an explicit label.
- `ToggleRow` size (`sm`/`lg`) MUST be consistent across all rows in the same list.
- `ToggleRow` position (`start`/`end`) MUST be consistent across all rows in the same list.
- `ToggleRow` MUST NOT be placed inside a data table cell.
- `ToggleRow` has built-in padding (`px-150 py-100`) and background (`bg-surface-level1`) by default (`padding="default"`).
- When placing `ToggleRow` inside a bordered card, form section, or any container that already provides padding and background, use `padding="none"` to suppress the built-in padding and background. This prevents double-padding and misaligned inset.
- `padding="none"` MUST NOT be used in standalone settings lists — the default padding is required for correct tap target and visual rhythm.

**Composition Rules**
- `ToggleRow` MAY use the `slot` prop to reveal additional configuration content when toggled ON.
- Slot content MUST be relevant to the toggle setting — MUST NOT contain unrelated controls.

**Status:** stable

---

### Card

**Purpose**
Generic content container with optional image, title, body, and footer. Used for editorial content, product listings, and media previews.

**Use When**
- Displaying a content item with an image, title, and optional action
- Grouping related information into a bounded visual unit
- Building product, article, or media grids

**Do NOT Use When**
- Displaying a KPI metric → use `StatCard`
- Displaying a quick action → use `ActionCard`
- The content is a data row → use `TableList` or `DataTable`
- The container has no visual boundary requirement — use a plain `div`

**Constraints**
- MUST use `w-full` within a grid column.
- Standalone cards MUST declare `max-w-[668px]` or smaller.
- Card `footer` slot MUST only contain action controls (buttons, links). Body content in the footer slot is PROHIBITED.

**Variants**

| Prop | Options | Rule |
|------|---------|------|
| `orientation` | `vertical`, `horizontal` | Use `horizontal` only when image and content sit side-by-side |
| `imageType` | `stretched`, `padded` | `padded` for inset images with rounded corners; `stretched` for edge-to-edge |
| `imagePosition` | `top`, `below`, `left`, `right` | `left`/`right` only with `orientation="horizontal"` |
| `compact` | boolean | Use for dense grid contexts (e.g. course or product thumbnail grids) |

**Status:** stable

---

### ActionCard

**Purpose**
Compact interactive card for quick actions. Displays an icon in a circle and a single-line label.

**Use When**
- Presenting a set of navigable quick actions (e.g. "Create product", "View analytics")
- Building a quick-action grid on dashboard or home screens

**Do NOT Use When**
- The item has a description or sub-text → use `MenuListItem` or `Card`
- The item is a form control → use `ToggleRow` or `CheckboxRow`
- ActionCard is designed for grouped quick actions — grouping rules are defined in PATTERNS.md

**Constraints**
- MUST have `min-w-[212px]` — approved Figma spec exception.
- Label MUST use `whitespace-nowrap`. Label text MUST NOT wrap or truncate.
- MUST use `shadow-pill-tab` shadow token.
- Icon circle MUST use `w-500 h-500` (40×40px) with `rounded-500`.

**Status:** stable

---

### StatCard

**Purpose**
Displays a single KPI metric with a value, heading, trend indicator, and optional delta.

**Use When**
- Displaying a numeric performance metric (followers, revenue, clicks, reach)
- Showing trend direction (up, down, neutral) for a metric

**Do NOT Use When**
- Displaying non-numeric content → use `Card`
- The metric requires a chart or sparkline → use `ChartCard`
- StatCard represents a single KPI metric — grouping and count rules are defined in PATTERNS.md

**Constraints**
- `trend` prop MUST always be provided. Rendering a StatCard without a trend value is PROHIBITED.
- `value` MUST use `text-h1` `font-semibold`.
- `heading` MUST use `text-supporting` `font-medium` `uppercase` `text-text-level1`.
- Trend circles: up = `bg-surface-success-1`, down = `bg-surface-critical-1`.
- MUST be placed in a grid with `items-stretch` (equal height required per LAYOUT.md LB4).

**Status:** stable

---

### ChartCard

**Purpose**
Compact KPI card with a sparkline area chart. Displays a metric value, optional heading, optional delta indicator, and a 60px-tall area chart.

**Use When**
- Displaying a single metric that has a time-series trend (followers, revenue, clicks)
- Multiple metrics are shown side-by-side in a grid for comparison
- A sparkline is sufficient — full date axis is not needed

**Do NOT Use When**
- A full analytics chart with date axis and filters is needed → use `ChartFullWidth`
- The metric has no chart data → use `StatCard`
- Displaying non-numeric or non-trend content → use `Card`

**Constraints**
- MUST use `w-full` inside a grid column. MUST NOT be used as a standalone full-width component.
- Chart height is fixed at 60px — do not override.
- Background MUST use `bg-surface-level1` with `shadow-chart`.
- Multiple ChartCards on the same row MUST use `items-stretch` (per LAYOUT.md LB4 — comparable data).
- MUST be placed in a 2-column or 3-column grid. Grid gap MUST be `gap-200`.

**Variants**

| `type` | MUST be used for |
|--------|-----------------|
| `uptrend` | Positive growth direction |
| `downtrend` | Negative growth direction |
| `neutral-up` | Flat trend with positive delta |
| `neutral-down` | Flat trend with negative delta |
| `no-data` | No historical data available — renders a flat baseline |

**Status:** stable

---

### ChartFullWidth

**Purpose**
Full-width analytics chart with a date-labeled X axis, metric heading, delta row, and product/time filter controls. The primary chart component for analytics sections.

**Use When**
- Displaying a primary analytics trend (revenue over time, follower growth)
- The user needs to filter the chart by product or time range
- A date axis is required for the data to be interpretable

**Do NOT Use When**
- Compact KPI comparison in a grid → use `ChartCard`
- No time series data or no chart is needed → use `StatCard`

**Constraints**
- MUST be full-width (`w-full`). MUST NOT be placed inside a multi-column grid.
- MUST be the sole component in its section container (per LAYOUT.md LB8).
- Chart height is fixed at 252px — do not override.
- Filter buttons MUST use `Button variant="outline" shape="semi-rounded" size="xs"` — this is the only approved exception to the `full-rounded` shape rule, limited to filter dropdowns in chart headers.
- Share action MUST use `IconButton` — raw icon buttons in this slot are PROHIBITED.

**Variants**
Same `type` options as `ChartCard`: `uptrend`, `downtrend`, `neutral-up`, `neutral-down`, `no-data`.

**Status:** stable

---

### ChartComparison

**Purpose**
Composite layout component that pairs a `ChartCard` (fixed-width metric summary) with a `ChartFullWidth` (expanding trend chart) in a single horizontal row. Used when a KPI metric and its corresponding trend chart are conceptually paired and belong together visually.

**Use When**
- A metric card and its corresponding full-width trend chart must appear together in the same row
- The Analytics or Dashboard pattern requires a card + chart combination as a single unit

**Do NOT Use When**
- The metric and chart are independent → use `ChartCard` and `ChartFullWidth` separately in their own grid slots
- Only a chart is needed without a paired metric → use `ChartFullWidth` directly
- Only a metric is needed without a chart → use `ChartCard` directly

**Props**
- `card` — required. `ChartCardProps` passed directly to the internal `ChartCard`.
- `chart` — required. `ChartFullWidthProps` passed directly to the internal `ChartFullWidth`.

**Constraints**
- The internal `ChartCard` is fixed at `w-[280px]` — this is a Figma-spec approved exception (SP8). Do not override.
- The internal `ChartFullWidth` fills all remaining width via `flex-1`.
- MUST be placed full-width (`w-full`) within its container.
- MUST NOT be placed inside a multi-column grid — this component is itself a two-column layout.

**Status:** stable

---

### DataTable

**Purpose**
Full-featured tabular data display with built-in search, filter, sort, export toolbar, column headers, and pagination.

**Use When**
- Use when structured data requires sorting, filtering, or bulk actions
- Exporting or acting on data records

**Do NOT Use When**
- The list is simple with no sorting/filtering → use `TableList`
- Displaying a settings list → use `ToggleRow` or `MenuList`
- The data is a single KPI → use `StatCard`

**Constraints**
- MUST be full-width (`w-full`). Placing DataTable inside a multi-column grid is PROHIBITED.
- `type="line"` — use for dense data tables. `type="spaced"` — use for card-style rows with visual breathing room.
- Column `render` function MUST NOT contain layout-breaking elements (e.g. full-width blocks).
- Pagination behavior is defined in PATTERNS.md.

**Mobile behavior (below 600px)**
- Toolbar search bar height reduces to 32px.
- Filter, Sort, and Export collapse to `IconButton size="xs" shape="semi-rounded" variant="outline"`. `shape="semi-rounded"` is required — these buttons sit directly adjacent to the semi-rounded search bar.
- Pagination: "Items per page" label is hidden; the page size dropdown remains visible.
- Pagination Previous / Next collapse to `IconButton size="sm" shape="semi-rounded" variant="outline"`. `shape="semi-rounded"` is required — these buttons sit adjacent to the semi-rounded page number display.
- Table structure (columns, rows, spaced cards) is unchanged at mobile.

**Default usage — `fillHeight` is the standard**
Use `fillHeight` by default on every page-level DataTable. Only omit it when the table is embedded inside a card, modal, or side sheet where the parent already controls height.

```tsx
// ✅ Default — page-level table (fills remaining viewport height)
<DataTable fillHeight columns={columns} data={data} pagination={...} />

// ✅ Exception — table inside a Card or Modal (parent controls height)
<DataTable columns={columns} data={data} />
```

`fillHeight` requires the parent to have a determined height. The standard pattern is:
```tsx
// Parent page layout
<main className="flex flex-col flex-1 overflow-hidden">
  {/* non-scrolling top section */}
  <div className="flex-none ...">...</div>
  {/* DataTable fills remaining height */}
  <div className="flex-1 min-h-0 overflow-hidden px-400">
    <DataTable fillHeight ... className="flex-1 min-h-0" />
  </div>
</main>
```

**Composition Rules**
- MAY contain in column cells: `Badge`, `Thumbnail`, `TableActionGroup`, `FollowerCount`, `Lock`, `Progress`, `TableList`
- MUST NOT contain in column cells: `Card`, `StatCard`, `Modal`, `SideSheet`

**Status:** stable

---

### TableList

**Purpose**
Rich list item for data rows — displays image/thumbnail, title, subtitle, platform info, badge, and actions. Used as a row within `DataTable` or as a standalone list row.

**Use When**
- Rendering a data row with an image, primary title, and supporting metadata
- Product, post, or contact list rows

**Do NOT Use When**
- The row is a simple label-only item → use `MenuListItem`
- The row is a setting with a toggle → use `ToggleRow`
- The row needs a full card layout → use `Card`

**Constraints**
- `title` is required. All other props are optional.
- `actions` slot MUST only contain `TableActionGroup` or `IconButton` elements.
- MUST NOT be used as a standalone page section — always placed within a list container or `DataTable`.

**Status:** stable

---

### MenuList / MenuListItem

**Purpose**
`MenuList` — bordered list container.
`MenuListItem` — single row with icon/image, label, sub-text, and optional trailing element (counter, badge, button).

**Use When**
- Navigation menus, contextual option lists
- Settings lists without toggle controls
- Building molecular components (e.g. IntegrationCard, AppCard) that follow a list-row anatomy

**Do NOT Use When**
- The row needs a toggle control → use `ToggleRow`
- The row is a data record with image + metadata → use `TableList`
- Rendering inside a `DropdownMenu` → use the appropriate dropdown item component

**Constraints**
- `trailingButton` in `MenuListItem` MUST use `Button variant="outline" shape="full-rounded" size="xs"`. Raw styled buttons in this slot are PROHIBITED.
- `state` prop (`hover`, `selected`, `disabled`) is for static visual demos only. Interactive state MUST be driven by event handlers.
- `MenuListItem` MUST NOT be used outside of a `MenuList` wrapper or a clearly defined list container.

**Status:** stable

---

### Tabs

**Purpose**
Horizontal tab navigation for switching between content panels or page sections.

**Use When**
- Switching between multiple content views at the same level of hierarchy
- Page-level section navigation (use `line` variant)
- Filter-style tab groups (use `pill` or `pill2` variant)

**Do NOT Use When**
- Navigation between distinct pages — use sidebar or topbar navigation
- A single view with no alternatives
- Tab count exceeds the layout — count and overflow rules are defined in PATTERNS.md

**Constraints**
- MUST span full width of its container (per LAYOUT.md SC8).
- `TabsList` MUST NOT be placed inside a multi-column grid.
- Each `TabsTrigger` MUST have a corresponding `TabsContent`.

**Variants**

| Variant | MUST be used for |
|---------|-----------------|
| `pill` | Default filter/group tabs, inverted active state |
| `line` | Page-level section navigation, underline indicator |
| `blue-gradient` | Brand-highlighted tab selection |
| `purple-gradient` | Pro/secondary brand tab selection |
| `pill2` | Segmented control style, contained pill group |

**Status:** stable

---

### Accordion

**Purpose**
Vertically collapsible content sections. Reveals detail on demand.

**Use When**
- FAQ sections, help content, or detailed settings that are secondary to the primary view
- Progressively disclosing configuration options
- Reducing visual noise when content density is high

**Do NOT Use When**
- All sections are equally important and should always be visible — use stacked sections
- The content is a navigation menu — use `Sidebar` or `DropdownMenu`
- Minimum item count rules are defined in PATTERNS.md

**Constraints**
- `type="single"` — only one panel open at a time. Use for mutually exclusive content.
- `type="multiple"` — multiple panels can be open. Use for independent content sections.
- MUST NOT nest an `Accordion` inside another `Accordion`.

**Status:** stable

---

### Modal

**Purpose**
Focused overlay dialog for confirmations, detail views, and short-form tasks that require the user's full attention before returning to the main flow.

**Use When**
- Confirming a destructive action (delete, revoke)
- Presenting a short form (2–4 fields) that doesn't warrant a new page
- Displaying a media item (image, video) in context

**Do NOT Use When**
- The task is complex (more than 4 fields) → use `SideSheet`
- The content is contextual help → use `TooltipCard`
- The user must frequently switch between the modal and the page behind it

**Constraints**
- `max-width` MUST NOT exceed 560px (per LAYOUT.md CC8).
- Modal MUST NOT be triggered by another Modal. Nested modals are PROHIBITED.
- Close control MUST always be present — MUST use `IconButton variant="ghost"` for the dismiss action.
- The primary action button inside a Modal MUST be `Button variant="primary"` or `variant="brand"`.

**Composition Rules**
- MAY contain: `Input`, `Checkbox`, `Toggle`, `Button`, `Badge`, `Thumbnail`, `Image`, `Tabs`, `Accordion`
- MUST NOT contain: `DataTable`, `SideSheet`, another `Modal`

**Variants**

| Prop | Options | Rule |
|------|---------|------|
| `orientation` | `vertical`, `horizontal` | `horizontal` only for image+content side-by-side layouts |
| `imageType` | `stretched`, `padded` | Same rules as Card imageType |
| `closePosition` | `inside`, `outside` | `outside` for image-led modals where inside close obscures content |

**Status:** stable

---

### SideSheet

**Purpose**
Full-height side panel that slides in from the right. Used for extended tasks, detail views, and multi-step flows that require more space than a Modal.

**Use When**
- Editing a record with more than 4 fields
- Viewing detailed information for a selected row without leaving the page
- Multi-step configuration flows

**Do NOT Use When**
- The task requires 2 fields or fewer → use `Modal`
- The content is a navigation menu → use `Sidebar`
- The user must interact with the main content behind the panel simultaneously

**Constraints**
- MUST have a fixed width — fluid or percentage-based widths are PROHIBITED (per LAYOUT.md CC9).
- Close control MUST always be present using `IconButton variant="ghost"`.
- `slot` type: `stretched` — content fills height. `padded` — content has internal padding. MUST NOT mix within the same SideSheet.

**Composition Rules**
- MAY contain: `Input`, `Select`, `Checkbox`, `ToggleRow`, `Button`, `Tabs`, `Accordion`, `DataTable`
- MUST NOT contain: `Modal`, another `SideSheet`

**Status:** stable

---

### TooltipCard

**Purpose**
Rich positioned tooltip panel with an optional tip arrow, heading, body text, leading image or icon, action links, and a content slot for nested elements. Used for contextual education, feature announcements, and onboarding popovers.

**Use When**
- Explaining a feature or concept in context (walkthroughs, onboarding)
- Showing rich contextual information anchored to a UI element
- Displaying a popover with action links (not a simple one-line tooltip)

**Do NOT Use When**
- Simple one-line text tooltip → use `Tooltip`
- The information requires full-screen focus → use `Modal`
- Inline informational text that doesn't require a pointer → use plain text with `text-text-level3`

**Constraints**
- MUST NOT be placed inside a grid or flow layout as a block element — it is a positioned overlay.
- Width is component-defined: `"md"` = 400px, `"sm"` = 344px, `"label"` = auto (hugs content) — do not override.
- `children` slot MUST only contain `TooltipCard`-specific sub-content. Do not inject arbitrary layout into this slot.
- `"label"` size MUST only use `body` prop — never `heading`, `icon`, `image`, or action props.

**Variants**

| Prop | Options |
|------|---------|
| `color` | `"black"` (dark bg) \| `"white"` (light bg) |
| `size` | `"md"` \| `"sm"` \| `"label"` (content-hugging, body only) |
| `tipSide` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` |
| `tipAlign` | `"start"` \| `"center"` \| `"end"` |

**Status:** stable

---

### Tooltip

**Purpose**
Radix-powered hover/focus trigger that wraps any element and displays a positioned `TooltipCard` on hover.

**Use When**
- Adding a label to an icon-only control (e.g. `IconButton`, `TableActionGroup` action)
- Providing short contextual help anchored to a UI element
- Showing rich contextual information on hover with heading, body, image, or actions

**Do NOT Use When**
- The information requires user interaction (links, buttons inside) → use a `Popover` or `Modal`
- The label is already visible as text alongside the control

**Constraints**
- Default `size` MUST be `"label"` unless the design explicitly requires a richer tooltip (`"sm"` or `"md"`). Never use `"sm"` or `"md"` for simple text labels.
- `"label"` size MUST only pass `body` — never `heading`, `icon`, `image`, or action props.
- `tipSide` describes which edge of the card the arrow sits on. The card appears on the opposite side of the trigger (e.g. `tipSide="top"` → arrow on top of card → card appears below the trigger).
- Default tip position for icon button labels: `tipSide="top" tipAlign="center"` (card below trigger, arrow centered).

**Status:** stable

---

### Nudge

**Purpose**
Inline informational or action bar for contextual system messages, warnings, and prompts. Persistent (not auto-dismissed).

**Use When**
- Informing the user of a system state that requires attention (plan limit, unpublished items)
- Displaying a persistent contextual tip or warning within a section
- Prompting an optional action without blocking the workflow

**Do NOT Use When**
- The message is time-sensitive or requires immediate action → use `Alert`
- The message is promotional with an image → use `PromoBanner`
- The message is a form validation error → use `Input` error state

**Constraints**
- MUST be full-width within its container.
- Global Nudge MUST appear at the top of the content area before all sections (per LAYOUT.md SC6).
- Contextual Nudge MUST appear at the top of its section before that section's content.
- `dismissible` defaults to `true` — MUST always provide `onDismiss` when `dismissible={true}`.
- Action link MUST use `Button variant="link"`.

**Variants**

| Type | MUST be used for |
|------|-----------------|
| `normal` | Informational prompts, tips, neutral system messages |
| `warning` | Non-critical issues requiring user awareness |
| `critical` | Issues that may impact user's account or data |

| Size | MUST be used for |
|------|-----------------|
| `md` | Default — all standard nudge placements |
| `sm` | Slim bars (plan status strips, social proof bars) |

**Status:** stable

---

### Alert

**Purpose**
High-visibility system notification, optionally with a countdown timer. Typically used for time-sensitive or platform-wide states.

**Use When**
- System-wide alerts (maintenance, outage, deadline)
- Countdown scenarios with a visible timer
- Critical account states requiring immediate user action

**Do NOT Use When**
- The message is section-specific and persistent → use `Nudge`
- The message is promotional → use `PromoBanner`
- The message is a form error → use `Input` error state

**Constraints**
- MUST be full-width within its container.
- MUST appear at the top of the content area before all section content.
- `timer` prop accepts a formatted string only (`HH:MM:SS`). Countdown logic MUST be managed externally.
- `dismissible` defaults to `true` — MUST always provide `onDismiss` when `dismissible={true}`.

**Variants**

| Type | MUST be used for |
|------|-----------------|
| `critical` | Urgent platform-wide issues, account suspension risk |
| `warning` | Approaching limits, upcoming changes, expiry warnings |
| `warning-subtle` | Soft warnings on light backgrounds |
| `info` | Neutral informational system messages |

**Status:** stable

---

### PromoBanner

**Purpose**
Visually prominent promotional strip with a 3D/illustrative icon, title, optional subtitle, and CTA. Used for upsell and upgrade prompts.

**Use When**
- Promoting a plan upgrade or premium feature
- Announcing a time-limited offer
- Drawing attention to an actionable opportunity (not a system warning)

**Do NOT Use When**
- The message is a system warning → use `Nudge` or `Alert`
- There is no clear CTA or promotional angle → use `Nudge type="normal"`
- More than one PromoBanner appears on the same screen

**Constraints**
- MUST be full-width within its container.
- MUST include the `image` prop — PromoBanner without a leading image is PROHIBITED.
- CTA MUST use `Button variant="primary" shape="full-rounded" size="sm"`.

**Status:** stable

---

### EmptyState

**Purpose**
Placeholder displayed when a section has no data to show. Communicates the zero-data condition and optionally prompts action.

**Use When**
- A section contains zero data records
- A search or filter returns no results
- A feature has not yet been set up by the user

**Do NOT Use When**
- The section has at least one item — even partial data MUST render actual content
- A loading state is in progress → render skeleton loaders instead
- An error has occurred → render an error state instead

**Constraints**
- MUST be full-width within its container (per LAYOUT.md ST2).
- MUST NOT be placed inside a multi-column grid.
- The section heading MUST remain visible above the EmptyState (per LAYOUT.md ST1).
- CTA button (if present) MUST use `Button variant="primary" shape="full-rounded"`.
- Illustration or icon MUST be centered. Text MUST be centered.

**Composition Rules**
- MUST contain: a heading and at least one supporting line of text
- MAY contain: an illustration/icon, a single CTA `Button`
- MUST NOT contain: `DataTable`, `Card`, `StatCard`, form controls

**Status:** draft *(component to be built)*

---

### Badge

**Purpose**
Small inline label conveying status, category, or count. Non-interactive.

**Use When**
- Labelling the status of a record (active, inactive, pending)
- Conveying a category or tag
- Showing a count or numeric indicator

**Do NOT Use When**
- The label requires user interaction → use `Button variant="outline"`
- The label is a plan gate → use `Lock`
- The badge needs to contain more than 3 words

**Constraints**
- MUST NOT be interactive (no `onClick`). Clickable badges MUST use `Button` instead.
- Text inside Badge MUST use `text-supporting` (12px).
- MUST NOT be used as a navigation element.
- `shadow` MUST be `false` by default. Only set `shadow={true}` when the design explicitly specifies a drop shadow (e.g. a badge floating over imagery or on a dark overlay).

**Variants**

| Colour | MUST be used for |
|--------|-----------------|
| `neutral` | Draft, inactive, archived states |
| `critical` | Error, failed, rejected states |
| `warning` | Pending, expiring, attention-needed states |
| `success` | Active, published, completed states |
| `primary` | Brand-highlighted categories, featured labels |

| Fill | MUST be used for |
|------|-----------------|
| `light` | Default — subtle background, colored text |
| `dark` | High-contrast — colored background, white text |
| `no-fill` | Text-only with no background |

**Status:** stable

---

### BadgeWithText

**Purpose**
Composite of a `Badge` + a body text label on the same horizontal row. Used for feature announcements, status + title pairings, and inline callouts.

**Use When**
- A badge label needs accompanying body text on the same baseline (e.g. "New · Feature name", "Pro · Unlock access")
- Feature launch headlines and announcement rows

**Do NOT Use When**
- A badge alone is sufficient → use `Badge`
- The badge is inside a list row → use `MenuListItem` `badge` prop

**Constraints**
- The `Badge` inside `BadgeWithText` inherits all Badge constraints — colour MUST use semantic Badge colour tokens.
- Body text MUST use `text-body font-semibold text-text-level1`.
- Gap between badge and text is fixed at 12px — do not override.
- MUST be used inline — do not stretch it to full-width inside a grid cell.

**Status:** stable

---

### FollowerCount

**Purpose**
Compact pill displaying a follower or subscriber count with state-dependent visual treatment. Three states: zero, positive (fire emoji + count + up arrow), and N/A (count unknown).

**Use When**
- Displaying a follower, subscriber, or audience count in a compact space
- Inside a profile card, stat row, table cell, or content header

**Do NOT Use When**
- A large metric display is needed in a KPI section → use `StatCard`
- The metric requires a chart trend → use `ChartCard`

**Constraints**
- MUST use the `state` prop to control visual variant: `"zero"` | `"positive"` | `"na"` — do not simulate states via `className`.
- Background MUST use `bg-surface-level2` with `border-border-color-level2`.
- MUST be treated as an inline element — MUST NOT stretch to full-width.
- `count` prop is required when `state="positive"` or `state="zero"`.

**Variants:** `state`: `"zero"` | `"positive"` | `"na"`

**Status:** stable

---

### Pagination

**Purpose**
Navigates between pages of a data set.

**Use When**
- A data list or table has more records than the visible page limit
- Explicit page-by-page navigation is needed

**Do NOT Use When**
- The list uses infinite scroll — do not mix pagination and scroll loading
- Visibility threshold rules are defined in PATTERNS.md

**Constraints**
- MUST be placed at the bottom of the content it controls (per LAYOUT.md SC7).
- MUST NOT appear above a list or table.
- MUST NOT be placed inside a `Modal` — paginated content in a modal is PROHIBITED.
- Page size and total count MUST be provided — Pagination MUST NOT render with unknown bounds.

**Status:** stable

---

### Progress

**Purpose**
Horizontal bar showing completion percentage of a process or task.

**Use When**
- Indicating upload or processing progress
- Showing profile or onboarding completion
- Displaying a quota usage level

**Do NOT Use When**
- The value is a KPI metric → use `StatCard`
- The user needs to interact with the bar → use a range input

**Constraints**
- `value` MUST be between 0 and 100. Values outside this range are PROHIBITED.
- `showLabel` should be `true` when exact percentage matters for the user's decision.
- MUST NOT be placed inside a `Badge` or inline within body text.

**Status:** stable

---

### Thumbnail

**Purpose**
Fixed-size image display in square or circle shape.

**Use When**
- User avatars (`type="circle"`)
- Content thumbnails in list rows or table cells (`type="square"`)
- Platform or brand icons

**Do NOT Use When**
- The image needs a caption or overlay → use `Card`
- The image is decorative and not content-relevant → use a plain `<img>`

**Constraints**
- MUST use a defined size token: `lg` (52px), `md` (44px), `sm` (36px), `xs` (24px). Arbitrary pixel sizes are PROHIBITED.
- `type="circle"` MUST only be used for user avatars and profile images.
- `type="square"` MUST use `rounded-050` (4px) border radius — overriding the radius is PROHIBITED.

**Status:** stable

---

### Lock

**Purpose**
Inline plan-gate badge. Signals that a feature requires a plan upgrade.

**Use When**
- A feature, setting, or action is restricted by plan tier
- Displaying an upgrade prompt inline within a list row or card

**Do NOT Use When**
- The restriction is a permission error (not plan-related) → use `Nudge type="critical"`
- The lock needs to be a standalone CTA → use `Button` or `GradientButton`

**Constraints**
- MUST NOT be interactive on its own — pair with a click handler on the parent row or a `Button`.
- Colour MUST match the plan gate: `blue` for primary plan, `purple` for Pro plan.
- Size MUST match the surrounding text density: `sm` alongside `text-body`, `xs` alongside `text-supporting`.

**Status:** stable

---

### TableActionGroup

**Purpose**
Horizontal group of icon-only action buttons rendered within a table row.

**Use When**
- A data table row has multiple discrete actions (edit, delete, duplicate, view)

**Do NOT Use When**
- Only one action exists → use a single `IconButton`

**Constraints**
- MUST only contain `IconButton` elements — no `Button` components.
- MUST NOT be used outside of table row contexts.
- Each action MUST have an `aria-label`.

**Overflow Rules**
- When 3 or fewer actions are provided: all actions render inline as `IconButton` elements.
- When more than 3 actions are provided: the first 2 render inline, and the 3rd slot is always an `IconButton variant="ghost"` showing a vertical dots icon (`IconDotsVertical`). Clicking it opens a `DropdownMenu` containing all remaining actions (3rd onwards).
- The overflow `IconButton` MUST use `variant="ghost"` and `aria-label="More actions"`.
- Each item in the overflow `DropdownMenu` MUST use `DropdownMenuItem` with the action's icon and label.
- The visible inline actions MUST always be the highest-priority actions — order your `actions` array with the most important actions first.

**Status:** stable

---

### Sidebar / SidebarNavItem

**Purpose**
`Sidebar` — full-height navigation shell for the `sidebar + content` shell type. Composed of a logo bar, nav sections, optional upgrade card, and optional user row. Composes `SidebarNavItem` internally.
`SidebarNavItem` — individual navigation item within the Sidebar (icon + label, active/inactive state).

**Use When**
- The screen uses `sidebar + content` shell type (per LAYOUT.md S1)
- Rendering primary persistent app navigation

**Do NOT Use When**
- The shell type is `topbar + content` or `content-only`
- Rendering secondary or contextual navigation within content — use `Tabs`

**Constraints**
- Sidebar width MUST use `var(--layout-sidebar-width)` — hardcoded pixel widths are PROHIBITED (per LAYOUT.md S2).
- Sidebar MUST NOT flex, shrink, or grow at any breakpoint where it is visible (per LAYOUT.md S2).
- Sidebar MUST be hidden at Mobile and Tablet breakpoints — MUST NOT collapse to an icon rail (per LAYOUT.md R5).
- Background MUST use `bg-surface-sidebar`.
- Logo MUST be passed as a `ReactNode` via the `logo` prop — do not hardcode branding inside the component.
- Nav items MUST use `SidebarNavItem` — raw `<button>` or `<a>` elements styled as nav items are PROHIBITED.
- `SidebarNavItem` MUST NOT be used outside of a `Sidebar` or equivalent nav container.
- Active state MUST be driven by the current route — never hardcoded.

**Composition Rules**
- `sections` prop MUST contain at least one section with at least one nav item.
- `upgradeCard` and `user` are optional slots — include only when applicable to the product and plan tier.
- Section dividers render automatically between sections — do not add manual separators.

**Status:** stable

---

## 4. Component Selection Decision Rules

**DS1.** When displaying a list of items:
- Simple label list → `MenuList` + `MenuListItem`
- Settings list with toggles → `ToggleRow` (stacked)
- Data records with images → `TableList`
- Data records requiring sort/filter/search → `DataTable`

**DS2.** When displaying a message or alert:
- System-wide time-sensitive → `Alert`
- Section-specific persistent prompt → `Nudge`
- Promotional upsell → `PromoBanner`
- Zero-data state → `EmptyState`
- Form validation → `Input` error prop

**DS3.** When displaying an action:
- Labeled action → `Button`
- Icon-only action → `IconButton`
- Premium/upgrade CTA → `GradientButton`
- Row-level actions in a table → `TableActionGroup`

**DS4.** When displaying a selection control:
- Immediate binary state → `Toggle` / `ToggleRow`
- Multi-select → `Checkbox` / `CheckboxRow`
- Select from a list → `DropdownMenu`
- Mutually exclusive from a list → `DropdownMenu` with radio items

**DS5.** When an overlay is needed:
- Short confirmation or 1–3 field form → `Modal`
- Extended form or detail view → `SideSheet`
- Contextual options triggered by a button → `DropdownMenu`
- Rich contextual tooltip or popover → `TooltipCard`

**DS6.** Component Conflict Resolution

When multiple components can satisfy a use case:
- Prefer the most specialized component over a generic one
- Avoid using a generic container (e.g., `Card`) when a purpose-built component exists (e.g., `StatCard`, `TableList`)
- Do NOT combine multiple components that solve the same problem

**DS7.** Decision Priority Order

When multiple decision rules apply, resolve in this order:

1. Data display (`DataTable`, `TableList`, `StatCard`)
2. User action (`Button`, `IconButton`, `GradientButton`)
3. Selection input (`Input`, `DropdownMenu`, `Checkbox`, `Toggle`)
4. Messaging (`Alert`, `Nudge`, `PromoBanner`, `EmptyState`)
5. Overlay (`Modal`, `SideSheet`, `DropdownMenu`)

Higher priority categories MUST take precedence.

**DropdownMenu classification:** When used as a form selector or filter control → category 3 (Selection input). When used as a contextual action menu triggered by a button → category 5 (Overlay). Classify by the primary purpose on the screen being built.

DS7's intent categories serve three purposes:
1. Component selection priority within COMPONENT_MAP.md
2. Slot ordering within PATTERNS.md
3. Planning intent detection — the 5 categories above are the same categories used in AGENTS.md Phase 1 Step 1 when identifying the primary intent of a screen

After components are selected:
- UX_RULES.md MUST be applied for grouping and layout optimization

DS7 does NOT control layout, density, or grouping.

---

`End of COMPONENT_MAP.md`
