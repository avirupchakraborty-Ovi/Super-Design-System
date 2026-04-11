@design-system/AGENTS.md
`Version 1.1 | Project rule index and execution instructions`

## Rule Files

These files govern ALL design decisions and MUST be followed:

- `design-system/LAYOUT.md` — layout structure and constraints (highest priority)
- `design-system/PATTERNS.md` — screen composition and slot architecture
- `design-system/COMPONENT_MAP.md` — component selection and usage rules
- `design-system/UX_RULES.md` — UX decision rules, grouping, density, and validation

These files together define the complete design system:

- LAYOUT.md → layout physics and constraints
- COMPONENT_MAP.md → component selection and rules
- PATTERNS.md → screen structure and composition
- UX_RULES.md → UX optimization, grouping, and usability refinement

Claude MUST:
- read and apply ALL of these files before generating any output
- follow the execution order defined in AGENTS.md
- NOT override or ignore any rule
- resolve conflicts using the defined priority system
- when UX cannot be fully optimized due to system constraints,
  surface a CONSTRAINED PASS to the user — do not silently accept reduced UX
- increment the version number at the top of any rule file that is modified
- when a slot's content count exceeds its hard maximum as defined in PATTERNS.md, issue a DENSITY FLAG — do not generate output; state the slot, count, maximum, and recommended alternative, then wait for user instruction
