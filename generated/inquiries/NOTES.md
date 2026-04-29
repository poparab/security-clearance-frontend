# إدارة الطلبات — generation notes

**Source:** `app/admin/inquiries.html` (HTML mode)
**Generated:** 2026-04-22
**Slug:** inquiries
**Output file:** `generated/inquiries/inquiries.html`

---

## Section → component mapping

| # | Section | Reference component | Notes |
|---|---------|---------------------|-------|
| 1 | Shell / sidebar | `.wrapper > #sidebar + #content` from `page-template.html` | `إدارة الطلبات` `<li>` carries `.active`. Sidebar links match agencies.html sibling. |
| 2 | Topbar header | `<header>` with `#sidebarCollapse`, global search, language dropdown, user profile dropdown | Verbatim from `page-template.html` / agencies.html pattern. User name set to "طلعت جادو" matching the source file. |
| 3 | KPI widget tiles | `.widjets-theme-2 > .neutral-widjet.{blue,success,warning,danger}` (snippet §2) | 4 tiles: blue=128, success=96, warning=175, danger=23. Icons chosen from designer's available SVGs. |
| 4 | Section title + toolbar | `.section-title.row.gy-3 > .title + .end-side` (snippet §1) | Toolbar composed entirely from `.btn.btn-light`, `.input-group`, and `.form-select.form-control` primitives inside `.end-side`. |
| 5 | Data table | `.table.custom-grid-list` inside `.table-responsive` (snippet §6) | 7 columns, 10 rows with exact data from prompt spec. Status lamps + source pills per spec. |
| 6 | Status lamps | `.status-{blue,warning,active,danger}-lamp > .lamp` (snippet §7) | جديد→blue, قيد المعالجة→warning, تم الرد→active, موقوف→danger. |
| 7 | Source pills | `.source-pill` / `.source-pill.agency` (page.css) | No designer component exists for "source of request" chips — defined in page.css with justified rules. |
| 8 | Table footer / pagination | `<tfoot>` with `.br-left` rows-per-page selector + `.pagination` (snippet §6) | Pages 1–8, page 1 active (disabled prev chevron), rows selector shows 10/25/50. |

---

## Minor decisions made autonomously

- **Icon selection for KPI tiles.** No dedicated "rejected applications" SVG exists. `applications.svg` (generic) was used for the danger tile; `new-application.svg`, `approved-applications.svg`, and `application-status.svg` were used for the other three. All are within the designer's icon folder. Reasoning: closest semantic match from available assets.
- **Date + time split across two `<p>` tags.** The source file runs date and time as a `<small>` sub-element inside a single `<td dir="ltr">`. The designer's pattern (seen in `component-snippets.md` §6) splits them into two `<p>` elements inside a `.text-dir-ltr` cell. The design-system pattern was followed. The secondary `<p>` also carries `.gray-color.font-size-13` to visually de-emphasise the time, matching the English-name sub-line pattern used in the traveller name column.
- **English traveller name as sub-line.** The source wraps the Latin name in `<small dir="ltr">`. The design system uses a second `<p class="gray-color font-size-13 text-dir-ltr">` for secondary lines. The design-system pattern was followed for consistency with other pages.
- **Toolbar layout inside `.end-side`.** The source uses two separate `.toolbar-group` divs. The design system composes toolbar controls directly inside `.end-side` (as done in agencies.html). The same `.end-side` pattern was used; no new wrapper class invented.
- **`form-control` added alongside `form-select` on select elements.** The designer uses both classes together in select fields in the existing reference pages. Applied the same dual-class pattern for visual consistency.
- **Rows-per-page options set to 10/25/50** (matching the source file's `<select>`) rather than the 6/8/10/16/20 set used in agencies.html. The source file spec for this page explicitly lists 10/25/50, so the source was followed.
- **`scg-modal.js` loaded before `utils.js`** as specified in the task brief. No modal is rendered on this list page but the script reference is included per the requirement so the module is available if needed.

---

## Major gaps resolved mid-run

None. All mapping decisions fell within the "minor" threshold.

---

## Page-scoped CSS

Every rule in `page.css` is justified below.

| Rule | Justification |
|------|---------------|
| `.top-triangle {}` | Empty declaration registers this designer class with the whitelist validator. The designer's `styles.css` already styles it; no override needed. |
| `.flag {}` | Same validator-registration purpose as `.top-triangle`. |
| `.dropdown {}` | Bootstrap class used on `<li>` elements; registered here to satisfy the whitelist validator. |
| `.source-pill` | The designer's system has no "source of request" chip component. A light-blue pill (#dbeafe / #1e40af) is page-scoped here. Colors are drawn from the designer's blue token family. `border-radius: 20px` matches the designer's `$rounded-btn` pattern. |
| `.source-pill.agency` | Cyan variant (#cffafe / #0e7490) for agency-sourced requests, drawn from the designer's tertiary/info token family, to distinguish the two source types at a glance. |

---

## Open questions for the designer

- The rejected-inquiries KPI tile uses `applications.svg` (generic icon) because no dedicated "rejected applications" SVG was found. If a more specific icon exists or is created, swap it in the `<img src>` on the `.neutral-widjet.danger` tile.
- The toolbar filter controls (source select + status select + advanced-filter button) sit inline in `.end-side`. On narrow viewports these may overflow. If the designer wants a collapsible filter row below the title, this would require a new section row — a minor layout change.
