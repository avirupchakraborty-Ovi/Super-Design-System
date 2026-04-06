<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Design System Rules

These rules apply to every component in `src/components/ui/`. They exist to keep the codebase clean, consistent, and scalable for handoff to developers.

## Token Usage

All design tokens are defined in `src/app/globals.css`. The `@theme inline` block maps them to Tailwind utility classes. Always use the semantic token layer — never bypass it with primitive values.

### Text color → always `text-text-*`
```
text-text-level1      dark body text (default)
text-text-level2      secondary text
text-text-level3      helper / supporting text
text-text-level4      placeholder / muted text
text-text-inverted    white text on dark backgrounds
text-text-critical-3  error state text and labels
```
❌ Never: `text-gray-900`, `text-gray-400`, `text-critical-600`

### Border / Ring color → always `ring-border-color-*` or `border-border-color-*`
```
ring-border-color-level2    subtle border (disabled state)
ring-border-color-level3    default border
ring-border-color-primary   focus / active / brand border
ring-border-color-critical  error state border
```
❌ Never: `ring-gray-100`, `ring-brand-primary-600`, `border-gray-200`

### Border radius → always use design system radius tokens
```
rounded-500    pill / full-rounded  (9999px)
rounded-150    semi-rounded         (12px)
rounded-100    card / modal         (8px)
rounded-050    small element        (4px)
```
❌ Never: `rounded-full`, `rounded-xl`, `rounded-lg`

### Background color
Use `bg-surface-*` tokens where the name is semantically meaningful.
Use `bg-gray-*` / `bg-brand-*` / `bg-critical-*` primitives only when no surface token applies (e.g. disabled button backgrounds — the design system does not yet define component-state surface tokens).

> **Design system gap:** `surface-button-disabled`, `surface-button-hover`, and similar component-state tokens are not yet defined. When the design team adds them, update the Button, IconButton, and Input components to use them.

## Component Structure

- One component per file in `src/components/ui/`
- One stories file per component in `src/stories/`
- Story titles follow the pattern: `Components/<Category>/<Component Name>`
- Each component exports its props interface (e.g. `ButtonProps`, `InputProps`)
- Use a single unified component with a `shape` prop rather than separate Full Rounded / Semi Rounded components (matches the Button and Input pattern)

## Before Adding Any New Tailwind Class

Ask: does a semantic token already exist for this value?
Check `src/app/globals.css` → `@theme inline` before reaching for a primitive.
If a token is missing, flag it — don't invent a workaround.

---

## Screen Generation Protocol

Before building any new screen, Claude MUST follow this sequence — no exceptions:

1. **Identify the primary intent** of the screen using DS7 (COMPONENT_MAP.md):
   - Is the screen primarily displaying data, enabling a user action, collecting input,
     delivering a message, or presenting an overlay?
   - The dominant intent category determines the correct pattern direction.

2. **Select the layout type** based on the screen's structure (LAYOUT.md S10):
   - `full-stretch`, `centered`, or `aside-panel`

3. **Select the pattern** that matches the primary intent (PATTERNS.md P1–P11):
   - Use the Pattern Selection Decision Rules (P1–P11) to confirm the choice.

4. **State all three** — intent, layout, and pattern — with one sentence of reasoning
   for each. Wait for explicit user confirmation before writing any code.

5. **If no pattern fits**, state that explicitly and propose composing from scratch
   using LAYOUT.md + COMPONENT_MAP.md rules. Do not force-fit a pattern.

This protocol applies to every new screen prompt, regardless of how detailed
or brief the request is.
