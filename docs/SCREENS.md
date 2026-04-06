# SCREENS.md
## SuperProfile Design System — Screen Reference for Designers
`Quick reference only. Full rules in LAYOUT.md, PATTERNS.md, COMPONENT_MAP.md.`

---

## Step 1 — Pick a Layout

| Layout | When to use | Example screens |
|--------|-------------|-----------------|
| `full-stretch` | Data-heavy screens, dashboards, lists — content fills the full width | Home, Analytics, Payments, Store |
| `centered` | Settings, account, focused forms — content has a natural max-width | Account Settings, Profile |
| `aside-panel` | Builder or config screens with a supplementary info/preview panel on the right | Audience Builder, Store Settings |

---

## Step 2 — Pick a Pattern

| Pattern | When to use | Example screens |
|---------|-------------|-----------------|
| **Dashboard** | Overview of metrics, activity, and quick actions across multiple domains | Home |
| **Analytics** | Time-series chart analysis for a single data domain | Analytics |
| **Data List** | Browsable, filterable collection of records | Store, Payments, Audience list |
| **Form / Configuration** | Collecting or editing structured data with a clear submit action | Product creation, Lead Magnet setup |
| **Detail Page** | All information about a single entity, tabbed sub-data | Product detail, Order detail |
| **Split View** | Browse a list and view item detail simultaneously | Inbox, AutoDM conversations |
| **Settings Page** | User-configurable preferences organised into categories | Account Settings |
| **Empty / Zero State** | Full-page empty state when a feature has no data yet | First-time Audience, empty Store |
| **Builder / Aside-Panel** | Primary creation or rule-building task with a supplementary panel (preview, estimator) | Audience Builder, Store Settings |

---

## Step 3 — Write your prompt

Start every new screen prompt with:

```
Layout: [layout type]
Pattern: [pattern name]

[Describe what the screen should do and what content it needs]
```

**Example:**
```
Layout: aside-panel
Pattern: Builder / Aside-Panel

Build an automation rule builder. The main column has trigger and action
configuration. The aside panel shows a live summary of the rule.
```

Claude will confirm the layout and pattern choice before building anything.

---

## When you're not sure

Just describe what the screen needs to do in plain language. Claude will propose the layout and pattern and wait for your approval before proceeding.
