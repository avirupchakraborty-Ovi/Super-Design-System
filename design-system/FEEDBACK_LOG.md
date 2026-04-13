# FEEDBACK_LOG.md

This file captures issues raised by designers while testing the Super Design System.

Each entry is created by invoking the `/log-issue` skill in Claude Code after discussing an issue in conversation. The skill pulls context from the conversation, asks the designer for a proposed fix and priority, then appends a new entry to this file.

**Do not edit entries manually.** They are structured for later review and clustering.

---

## Entry Structure

Each entry has two sections:

- **📝 Section 1 — Designer Report:** what the designer was trying to do, what they found, where they hit it.
- **🔧 Section 2 — Claude Analysis:** issue type, exact root cause location, refined severity, recommended fix.

Issues may be of two types:
- **Rule / system issue** — traces to an MD file (LAYOUT, COMPONENT_MAP, PATTERNS, UX_RULES)
- **Component issue** — traces to a component in `src/components/ui/`

---
