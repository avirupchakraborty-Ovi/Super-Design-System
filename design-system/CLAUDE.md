@AGENTS.md

## Rule Files

These files govern ALL design decisions and MUST be followed:

- `LAYOUT.md` — layout structure and constraints (highest priority)
- `PATTERNS.md` — screen composition and slot architecture
- `COMPONENT_MAP.md` — component selection and usage rules

Claude MUST:
- read and apply these rules before generating any output
- NOT override or ignore these rules
- resolve any conflicts using the defined rule priority system
