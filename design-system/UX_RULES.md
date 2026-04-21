# UX_RULES.md
`Version 1.4 | Priority: Fourth — see AGENTS.md for full priority chain`

This file defines UX decision rules, anti-patterns, and validation logic.

It governs how UI is structured, grouped, and optimized for usability.

These rules apply AFTER pattern and layout selection.

---

## SYSTEM CONSTRAINT COMPLIANCE

UX rules MUST operate within system constraints:

- MUST NOT override LAYOUT.md rules
- MUST NOT override COMPONENT_MAP.md constraints
- MUST NOT change pattern structure defined in PATTERNS.md

UX rules are responsible for structure quality thresholds and UX optimization within pattern and layout constraints.

---

## UX SCOPE

UX_RULES.md governs:
- grouping
- hierarchy
- density
- usability
- interaction clarity

UX_RULES.md MUST NOT define:
- grid systems
- spacing tokens
- component selection
- layout structure

---

## SECTION 1 — CORE PRINCIPLES

### UX1. Optimize for Primary Intent

Every screen MUST optimize for its primary intent:

- Data display → fast scanning and comparison
- Form / builder → clarity, structure, and error prevention
- Dashboard → insight visibility

All layout and grouping decisions MUST support this.

---

### UX2. Minimize Cognitive Load

- Reduce visible decisions at once
- Group related inputs
- Avoid long uninterrupted forms
- Break dense sections into smaller chunks

Per-slot hard maximums are defined in PATTERNS.md density rules and MUST be used as the primary decision points. Do not rely on visual estimates alone.

As supplementary signals when no hard threshold is defined:
- Forms: flag when a single section has more fields than can be seen without scrolling
- Navigation: flag when tab count requires the user to scan rather than recognise
- Lists: flag when content volume requires more than 2 scrolls to reach the bottom of a section

When a slot's hard maximum is exceeded, issue a DENSITY FLAG — see AGENTS.md for enforcement protocol.

---

### UX3. Clear Information Hierarchy

Hierarchy MUST be obvious without reading.

Use:
- section headers
- sub-section headers
- spacing
- alignment

Avoid relying on color alone.

---

### UX4. Reduce Interaction Cost

- Minimize scrolling where possible
- Avoid unnecessary clicks
- Prefer efficient layouts when clarity is not compromised

---

### UX5. Progressive Disclosure

- Show essential inputs first
- Hide advanced settings behind:
  - accordions
  - expandable sections

---

### UX6. Consistency

- Similar problems MUST use similar structures
- Avoid introducing new interaction patterns unnecessarily

---

## SECTION 2 — GROUPING & STRUCTURE

### UX7. Sub-section Grouping

Related inputs MUST be grouped into sub-sections.

Each sub-section MUST have:
- a clear label
- logical grouping of fields

---

### UX8. Logical Chunking

Break complex screens into meaningful groups:
- e.g. personal info / preferences / billing
- e.g. targeting / budget / schedule

Avoid long continuous layouts.

---

### UX9. Spacing is NOT hierarchy

Spacing alone MUST NOT define grouping.

Use:
- headers
- alignment
- grouping

---

## SECTION 3 — LAYOUT DECISIONS

### UX10. Horizontal Grouping

Use horizontal layout when:
- fields are related
- inputs are compact
- sufficient horizontal space exists

> **Compact** means: single-line input, short label, no helper text required, and fits comfortably at half the container width.

Examples:
- budget type + amount
- min + max

Fields MAY wrap to the next row if space is constrained.

---

### UX11. Vertical Stacking

Use vertical layout when:
- inputs are complex
- inputs require explanation
- horizontal grouping reduces clarity

---

### UX12. Density Balance

- Reduce unnecessary scrolling
- BUT never sacrifice clarity

---

## SECTION 4 — COMPLEX COMPONENT STRUCTURE

### UX13. Accordion Structure

Accordion content MUST:
- contain sub-sections
- group related inputs
- maintain hierarchy

Accordion MUST NOT be a flat container.

---

### UX14. Section Separation

Sections within an accordion panel or form container MUST be visually separated by a named sub-section header or a horizontal divider. Component selection for sub-section headers MUST follow COMPONENT_MAP.md.

Spacing alone is not sufficient.

---

## SECTION 5 — INTERACTION & FEEDBACK

### UX15. Feedback for Actions

All user actions MUST provide feedback:

- loading → show indicator
- success → confirmation (toast / visual change)
- error → clear message with resolution

Loading and empty state behavior is governed by LAYOUT.md ST1–ST4.

*(UX16 removed — loading state behavior is governed by LAYOUT.md ST3–ST4)*

---

### UX17. Error Messaging

Errors MUST:
- explain what went wrong
- explain how to fix it

Avoid vague messages.

---

### UX18. Disabled & Interactive States

- Interactive elements MUST show hover/active states
- Disabled elements MUST be visually distinct

---

## SECTION 6 — NAVIGATION & WAYFINDING

### UX19. Orientation

User MUST always know:
- where they are
- what they can do next

---

### UX20. Active States

Current location MUST be clearly indicated.

---

### UX21. Action Clarity

- Primary action MUST be clear
- Avoid multiple competing primary actions

---

## SECTION 7 — ERROR PREVENTION & RECOVERY

### UX22. Prevent Errors

- Use constraints and defaults
- Group dependent inputs

---

### UX23. Validation Behavior

- Validate on blur
- Show inline feedback

---

### UX24. Recovery

- Focus first error field
- Provide retry or undo where possible

---

## SECTION 8 — ACCESSIBILITY (ESSENTIAL)

### UX25. Contrast & Readability

- Text must be readable
- Avoid low contrast

---

### UX26. Interaction Accessibility

- All interactive elements must be clearly identifiable
- Avoid relying only on color

---

### UX27. Labels & Guidance

- Every input MUST have a label
- Complex inputs SHOULD have helper text

---

## SECTION 9 — CONTENT & DATA CLARITY

### UX28. Data Readability

- Numbers should align properly
- Use consistent formatting

*(UX29 removed — empty state behavior is governed by LAYOUT.md ST1–ST2)*

---

### UX30. Content Clarity

- Use clear, meaningful labels
- Avoid technical/internal wording

---

## SECTION 10 — UX ANTI-PATTERNS

Claude MUST avoid:

---

### UX-AP1. Flat Layouts

No grouping, no hierarchy → MUST restructure

---

### UX-AP2. Inefficient Field Stacking

Stacking related compact fields vertically when horizontal grouping is feasible SHOULD be avoided.

Fields SHOULD be grouped horizontally when:
- they are related
- they are compact
- sufficient horizontal space exists within layout constraints

When horizontal space is limited:
- fields MAY wrap to the next row
- or continue vertically as needed

Do NOT force horizontal layouts that:
- break layout constraints (LAYOUT.md)
- reduce readability
- create awkward wrapping

Stacking is unnecessary when both fields satisfy the compact definition in UX10 and sufficient horizontal space exists. Stacking is acceptable when either field fails the compact definition or space is constrained.

Goal:
Optimize for clarity and efficient use of space, not rigid horizontal alignment.

---

### UX-AP3. Visual Ambiguity

Unclear section boundaries → MUST clarify

---

### UX-AP4. Equal Weight UI

Everything looks same → MUST create hierarchy

---

### UX-AP5. Cognitive Overload

Too many inputs visible → MUST reduce

---

### UX-AP6. Component Dumping

Using components without structure → MUST fix

---

### UX-AP7. Inefficient Layout

Excessive scrolling → MUST optimize

---

### UX-AP8. Uncollapsed Long Selection Lists

Displaying a full visible checklist for a selection group with more than 3 options increases scroll length without improving decision quality.

When a selection group contains more than 3 options, PREFER a collapsed selection pattern:
- Present the control in a closed state that expands on interaction
- The closed state MUST show a placeholder or a summary of the current selection

Exception: when the user MUST compare all options simultaneously to make a decision, a full visible list is acceptable.

Component selection for the collapsed selection pattern MUST follow COMPONENT_MAP.md.

---

### UX-AP9. Inconsistent Selection Patterns

Semantically equivalent selection controls within the same section or screen MUST use the same interaction pattern.

Do NOT:
- use a collapsed pattern for one control and a full checklist for a semantically equivalent control in the same view
- introduce a new pattern for one field without applying it to all equivalent fields in the same context

---

## SECTION 11 — PRE-DELIVERY VALIDATION

Before output, Claude MUST evaluate:

---

### UX-CHECK1. Structure clarity
Can user understand layout in 5 seconds?
PASS if major sections are visually distinct and reading order is clear without explanation.

---

### UX-CHECK2. Grouping
Are related elements grouped?
PASS if all related inputs are grouped under a sub-section header with no isolated fields adjacent to unrelated content.

---

### UX-CHECK3. Efficiency
Can layout be more efficient?
PASS if no related compact field pairs are unnecessarily stacked per UX10 and UX-AP2.

---

### UX-CHECK4. Cognitive load
Is screen overwhelming?
PASS if no slot exceeds its hard maximum as defined in PATTERNS.md density rules.
DENSITY FLAG if any slot's content count exceeds its hard maximum — do not proceed to output.

---

### UX-CHECK5. Flow
Is interaction flow clear?
PASS if primary action is unambiguous, navigation path is clear, and no step requires the user to re-orient mid-flow.

---

### UX-CHECK6. Component usage
Are components used structurally?
PASS if every component maps to a structural role (not decorative) and no raw HTML substitutes for an available system component.

---

### UX-CHECK7. Overall quality
Does UI feel intentional and structured?
PASS if UX-AP1 through UX-AP9 all pass.

---

### UX-CHECK8. Selection List Length

Does any visible checklist or option list contain more than 3 items?
PASS if all lists with 4+ items use a collapsed selection pattern, OR the full list is justified by a comparison requirement.
FAIL if a 4+ item checklist is used where a collapsed pattern would reduce scroll without reducing usability.

---

### UX-CHECK9. Selection Pattern Consistency

Do all semantically equivalent selection controls within the same section use the same pattern?
PASS if all equivalent selection controls share the same interaction pattern.
FAIL if one uses a collapsed pattern and an equivalent control uses a full checklist.

---

### UX-CHECK10. Related Selector Grouping

When two or more selection controls are semantically coupled (e.g. targeting dimensions, attribute pairs), is horizontal grouping applied?
PASS if coupled selectors satisfy the compact definition in UX10 and are grouped horizontally.
FAIL if coupled compact selectors are stacked vertically without justification.

---

Each check MUST result in PASS, FAIL, CONSTRAINED PASS, or DENSITY FLAG.
Follow enforcement logic defined in AGENTS.md Execution Order Step 6.

---

## Mobile UX Rules

These rules govern identity and navigation consistency across breakpoints for sidebar+content screens that use Browse mobile shell mode.

**U-Mobile-1 — User identity consistency across breakpoints**

The user identity data displayed in `MobilePageHeader` (name, avatar) MUST be the same object passed to `Sidebar`'s user prop.

- Passing different user data to `Sidebar` and `MobilePageHeader` on the same screen is PROHIBITED.
- If the user's name or avatar is loaded asynchronously, both components MUST receive the same loading/resolved state simultaneously — not independently.

_Rationale:_ The sidebar and the mobile header are the same conceptual surface rendered at different breakpoints. Showing inconsistent identity between them (e.g. different avatars, different names) creates a trust-eroding UX defect.

**U-Mobile-2 — Secondary link parity across breakpoints**

The `secondaryLinks` passed to `MobilePageHeader` MUST match `CollapsiblePageHeader`'s `secondaryLinks` exactly — same labels, same order, same onClick targets.

- Showing links in the mobile header that are absent from the desktop header (or vice versa) is PROHIBITED.
- If `CollapsiblePageHeader` renders no secondary links, `MobilePageHeader` MUST also receive no secondary links.

_Rationale:_ Secondary links are page-level sub-navigation. A user who switches from mobile to desktop (or vice versa) must find the same navigation options — any discrepancy is a navigational dead-end at one breakpoint.

---

## FINAL RULE

Claude MUST:
- think before placing UI
- optimize UX, not just structure
- evaluate and refine output

Claude MUST NOT:
- generate flat layouts
- rely only on stacking
- ignore grouping and hierarchy
