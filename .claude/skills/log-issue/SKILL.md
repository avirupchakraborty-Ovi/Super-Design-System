---
name: log-issue
description: Log a Super Design System issue to design-system/FEEDBACK_LOG.md based on the current conversation. Use when a designer says "log this issue" or invokes /log-issue while testing the design system.
disable-model-invocation: true
---

# Log Issue — Design System Feedback

The designer is testing the Super Design System by building a screen. When this skill is invoked, log an issue they encountered to `design-system/FEEDBACK_LOG.md`.

## Step 1 — Pull context from the conversation

Infer these fields from the prior conversation (do NOT ask the designer for them — pull them from what was already discussed):

- **Screen name + route** (e.g. `Ad Set Builder` at `/ad-set-builder`)
- **Intent** — what the designer was trying to build or do
- **What they found** — the specific problem in plain language
- **Where they hit it** — component, section, or screen area where the issue surfaced
- **Expected vs actual** — what they expected vs what they got

If the conversation does not contain enough detail to infer any of these fields, ASK clarifying questions first. Do not log incomplete entries.

## Step 2 — Analyse the issue

Determine:

- **Issue type** — `Rule / system issue` OR `Component issue`
- **Root cause** — the exact location of the source of the problem:
  - For `Rule / system issue`: file name, section, line number, exact rule text
  - For `Component issue`: component name, variant (if applicable), file path
- **One-line reframe** — a clear analytical statement of the problem
- **Recommended fix** — before / after with exact text or code

## Step 3 — Ask the designer two questions

1. **Proposed fix?** (optional — they can skip this)
2. **Priority?** (High / Medium / Low)

## Step 4 — Append a new entry to `design-system/FEEDBACK_LOG.md`

Use this exact two-section format:

```
---

## Issue #[next sequential number] — [Short descriptive title]

**Date:** [YYYY-MM-DD]

### 📝 Section 1 — Designer Report

- **Screen:** [Screen name]
- **Route:** [/route-path]
- **Intent:** [What they were trying to build / do]
- **What they found:** [The problem in plain language]
- **Where they hit it:** [Component / section / screen area]
- **Expected vs actual:**
  - Expected: [...]
  - Got: [...]
- **Proposed fix (optional):** [Their suggestion or "—"]
- **Priority (reported):** [High / Medium / Low]

### 🔧 Section 2 — Claude Analysis

- **Issue type:** [Rule / system issue | Component issue]
- **Root cause:**
  - [For rule issues] File: [...] · Section: [...] · Line: [...] · Exact rule: "[...]"
  - [For component issues] Component: [...] · Variant: [...] · File: [...]
- **Issue:** [One-line analytical reframe]
- **Severity (refined):** [Critical / High / Medium / Low]
- **Recommended fix:**
  - Before: `[exact text / code]`
  - After:  `[exact text / code]`

```

Append to the bottom of the file. Do not overwrite existing entries.

## Rules

- Never fabricate details. If you're uncertain about any inferred field, ask.
- Never skip Step 3 — always ask the two designer questions.
- Never log incomplete entries to avoid polluting the log.
- Never commit or push to git after logging — the designer will handle that.
