<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

`Version 1.3 | Core execution rules for screen generation`

# Design System Rules

These rules apply to every component in `src/components/ui/`. They exist to keep the codebase clean, consistent, and scalable for handoff to developers.

## Token Usage

All design tokens are defined in `src/app/globals.css`. The `@theme inline` block maps them to Tailwind utility classes. Always use the semantic token layer — never bypass it with primitive values.

### Text color → always `text-text-*`
```
text-text-level1        dark body text (default)
text-text-level2        secondary text
text-text-level3        helper / supporting text
text-text-level4        placeholder / muted text
text-text-inverted      white text on dark backgrounds (flips to black in dark mode)
text-text-on-brand      fixed white on brand-primary-500/600 surfaces — NEVER inverts in dark mode
text-text-critical-3    error state text and labels
text-text-brand-primary brand links, active indicators, CTA labels on light bg
```
❌ Never: `text-gray-900`, `text-gray-400`, `text-critical-600`, `text-white`

> `text-text-on-brand` vs `text-text-inverted`: use `text-text-inverted` on dark surface tokens (e.g. `bg-surface-inverted`). Use `text-text-on-brand` on `bg-brand-primary-500`, `bg-brand-primary-600`, or custom brand backgrounds (e.g. `CollapsiblePageHeader` gradient) that do not change in dark mode. The common rule: if the background stays the same in dark mode, the label must not flip either — use `text-text-on-brand`.

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
Use `bg-surface-*` tokens where the name is semantically meaningful. Primitives are PROHIBITED when a surface token exists.

> **Resolved:** `Button` and `IconButton` now use only `bg-surface-*` tokens — state tokens were mapped from the existing semantic surface layer. No `bg-gray-*` or `bg-critical-*` primitives remain in interactive components.
> If a new component has no matching surface token, flag it — do not invent a primitive workaround.

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

> Phase 1 — Planning. Run this BEFORE writing any code.

Before building any new screen, Claude MUST follow this sequence — no exceptions:

1. **Identify the primary intent** of the screen using DS7 (COMPONENT_MAP.md):
   - Is the screen's primary intent Data display, User action, Selection input, Messaging, or Overlay?
   - The dominant intent category determines the correct pattern direction.
   - Intent categories map directly to patterns — use P1–P11 in PATTERNS.md to confirm the match.

2. **Select the layout type** based on the screen's structure (LAYOUT.md S10):
   - `full-stretch`, `centered`, `aside-panel`, or `proportional-split` (only for creation/editing flows requiring real-time live preview — see LAYOUT.md S14)

3. **Select the pattern** that matches the primary intent (PATTERNS.md P1–P11):
   - Use the Pattern Selection Decision Rules (P1–P11) to confirm the choice.

4. **State all three** — intent, layout, and pattern — with one sentence of reasoning
   for each. Wait for explicit user confirmation before writing any code.

5. **If no pattern fits**, state that explicitly and propose composing from scratch
   using LAYOUT.md + COMPONENT_MAP.md rules. Do not force-fit a pattern.

This protocol applies to every new screen prompt, regardless of how detailed
or brief the request is. It also applies when modifying or extending an existing screen — not just when building from scratch.

---

### Specification Source — Screens

When generating or modifying a screen, the MD files are the sole specification. Figma is NOT a reference. Claude derives intent, layout, pattern, and component selection entirely from the prompt and the MD files.

Figma inspection tools are only permitted when explicitly instructed to audit an existing design for a gap or discrepancy — never as a design reference during screen generation.

---

### Component and Primitive Builds

Phase 1 does NOT apply to component and primitive builds. The designer will provide a Figma reference and guide the build through prompting.

However, before any component or primitive is considered complete, Claude MUST verify the following compliance checklist — no exceptions:

- [ ] All token rules satisfied — no prohibited primitives (`text-gray-*`, `rounded-full`, `bg-white`, etc.)
- [ ] All props that are conditionally required by rule are implemented as conditional renders — not always-on
- [ ] Safe area insets applied where required (R15: any element fixed/sticky to top or bottom of viewport)
- [ ] COMPONENT_MAP.md entry exists or has been updated to reflect the component's conditional rendering rules
- [ ] Relevant rule references noted inline in the component file where the conditional logic lives

If any item is unchecked, the component is not complete.

---

### Execution Order

> Phase 2 — Build. Run this AFTER user confirms intent, layout, and pattern.

After pattern selection is confirmed, Claude MUST follow this sequence:

1. Determine structure using PATTERNS.md
2. Apply layout constraints using LAYOUT.md
3. Select components using COMPONENT_MAP.md
4. Apply UX_RULES.md — make UX decisions:
   - determine grouping and field arrangement
   - optimize layout efficiency
   - reduce cognitive load
5. Validate those decisions against UX_RULES.md Section 11 checks, and run the following additional checks:

   **Action duplication check:** If the screen's [page-header] slot contains CTA buttons (Save, Cancel, Publish, or equivalent), verify that [form-actions] does not repeat the same actions anywhere in the content area. If duplication is found, treat it as a FAIL — remove [form-actions] and rely on [page-header] as the sole action surface.

6. Validation outcomes:

   Each UX check must result in one of the following:

   - **PASS** → rule satisfied
   - **FAIL** → rule violated and fixable within system constraints
   - **CONSTRAINED PASS** → rule not fully satisfied due to a higher-priority rule (LAYOUT.md, COMPONENT_MAP.md, or PATTERNS.md). When the blocking rule is from LAYOUT.md, identify which internal tier caused the constraint (per LAYOUT.md Section 12). If a lower-tier layout rule is the blocker, explore whether UX can still be optimized before declaring CONSTRAINED PASS.
   - **DENSITY FLAG** → a slot's content count exceeds its hard maximum as defined in PATTERNS.md density rules. Cannot be resolved by Claude — requires a content or scope decision from the user.

   **Enforcement logic:**

   - If any check = FAIL:
     → Claude MUST revise the output — layout, component selection,
       or grouping as appropriate
     → Re-run validation
     → Repeat until all FAIL states are resolved
     → If a FAIL cannot be resolved within system constraints,
       reclassify as CONSTRAINED PASS and follow that protocol

   - If checks result in PASS or CONSTRAINED PASS only (and no DENSITY FLAG):
     → Claude MAY proceed to output

   - If any check = DENSITY FLAG:
     → Claude MUST NOT generate output
     → Claude MUST state: which slot exceeded its threshold, the current count, the hard maximum, and the specific recommended alternative from PATTERNS.md
     → Claude MUST wait for explicit user instruction before proceeding
     → The user decides whether to reduce content, accept the overflow, or update the threshold in PATTERNS.md

   **For CONSTRAINED PASS:**

   Claude MUST:
   - Identify which higher-priority rule caused the constraint
   - Explain why UX could not be fully optimized
   - Confirm that the current solution is the best possible within constraints
   - Surface this to the user before generating output
   - The user decides whether to accept the constraint or update the rule
     in the relevant MD file that caused it — either by adding an exception
     or modifying the constraint directly

7. Generate output

---

### Conflict Resolution Priority

If rules conflict:

1. LAYOUT.md
2. COMPONENT_MAP.md
3. PATTERNS.md
4. UX_RULES.md

Lower priority rules MUST NOT override higher priority rules.

If conflicts arise, Claude MUST surface them instead of silently degrading UX.

When the conflict is entirely within LAYOUT.md, apply the internal priority system in LAYOUT.md Section 12 to resolve it.
