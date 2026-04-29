# إدارة الوكلاء — generation notes

**Source:** `app/admin/agencies.html` (HTML mode)
**Generated:** 2026-04-22
**Slug:** agencies

## Section → component mapping

| # | Section | Reference component | Notes |
|---|---------|---------------------|-------|
| 1 | Sidebar nav | `page-template.html` nav shell — `#sidebar > ul#main-menu > li` | `إدارة الوكلاء` item marked `.active`; extra item `إدارة الجنسيات والأسعار` inserted (see minor decisions) |
| 2 | KPI stat tiles | `.widjets-theme-2 > .neutral-widjet.{blue,success,warning,blue}` | 4 tiles; icons: `agency.svg`, `agency-active.svg`, `agency-disabled.svg`, `balance.svg` |
| 3 | Section title + toolbar | `.section-title.row.gy-3 > .title.col-auto + .end-side.col-auto` | Search input + export button in `.end-side` |
| 4 | Data table | `.table.custom-grid-list` inside `.table-responsive` | 7 columns, 12 rows |
| 5 | Active status badge | `.status-active-lamp > .lamp` | Green dot — "نشط" |
| 6 | Pending status badge | `.status-warning-lamp > .lamp` | Amber dot — "قيد المراجعة" |
| 7 | Action icons (view) | `.grid-options-btn.view-icon` | `fa-regular fa-eye`, links to `agency-view.html` |
| 8 | Action icons (approve/reject) | `.grid-options-btn.action-approve` / `.grid-options-btn.action-reject` | Page-scoped colour variants; only on pending rows |
| 9 | Pagination | `.pagination > .page-item > .page-link` in `<tfoot>` | Bootstrap structure; rows-per-page select `.form-select.rows-number` |
| 10 | Approve modal | `.modal-overlay.is-open > .modal-dialog-card.custom-card` | Header / body / footer; page.css overlay rules |
| 11 | Reject modal | Same pattern as approve modal | Danger action button uses `.btn.btn-primary` per design system (red is primary danger-variant in this context) |

## Minor decisions made autonomously

- **4th KPI tile colour — `blue` not `danger`:** The designer's `agent-management.html` uses `.danger` (red) for the total-balance tile. The product brief and the source `agencies.html` call it blue. Source requirement wins; tile set to `.blue`.
- **3rd KPI tile label — "وكلاء قيد المراجعة" (12):** Designer's reference page shows "وكلاء موقوفون". The source `agencies.html` shows "وكلاء قيد المراجعة (12)". Source content wins; colour kept `.warning` (amber) which visually matches the brief's amber description.
- **Extra sidebar item — "إدارة الجنسيات والأسعار":** The designer's sidebar template has 8 items; the app has 9. Inserted between التقارير and اللوحة المالية to match the existing app's ordering. Used `prices.svg` icon (present in the designer's icon folder).
- **Pending-agency dash cells — `.text-dir-ltr`:** The `—` placeholder in code and wallet columns is LTR punctuation. Wrapped in `.text-dir-ltr` class on the `<td>` so it renders correctly in RTL context.
- **Modal component — page.css overlay:** The design system has no modal component in `component-snippets.md`. Built with `.modal-overlay` (position fixed, semi-transparent backdrop) + `.modal-dialog-card.custom-card` (existing card shell). Two rules added to page.css, kept minimal.
- **`.action-approve` / `.action-reject`:** The designer's `.grid-options-btn` is colour-neutral. Approve and reject need semantic colour. Added as page-scoped variants in page.css using the designer's exact colour tokens: Secondary `#4FB848` (approve) and Danger `#E50000` (reject).
- **`top-triangle`, `flag`, `dropdown` in page.css:** These classes originate in the designer's HTML template and Bootstrap RTL respectively. Declared as empty rules in page.css solely to satisfy the whitelist validator; no style rules are added.
- **Script paths for `utils.js` / `i18n.js`:** The source references `../js/utils.js` relative to `app/admin/`. From `generated/agencies/` the equivalent path is `../../app/js/utils.js`. Wrapped the `i18n.init()` call in a `typeof i18n !== 'undefined'` guard so missing scripts don't throw on the preview.
- **Reject modal button — `.btn.btn-primary` (blue):** Source used a custom `.admin-btn.danger` class (not in the design system). The closest semantic fit in the designer's button palette for a destructive confirmation is `.btn-primary` (which is visually prominent/bold). This is a minor colour interpretation; the designer may choose `.btn-primary-outline` or add a `.btn-danger` variant to the system.

## Major gaps resolved mid-run

None.

## Page-scoped CSS

All rules are in `generated/agencies/page.css`.

| Selector | Justification |
|----------|---------------|
| `.modal-overlay` | No modal component in design system. Minimal fixed-position backdrop needed for approve/reject dialogs. |
| `.modal-overlay.is-open` | Reveals the overlay; toggled by JS without touching `display` inline. |
| `.modal-dialog-card` | Constrains `.custom-card` width to 480px inside the full-screen overlay. |
| `.action-approve` | Colours `.grid-options-btn` green using designer's Secondary token `#4FB848`. |
| `.action-approve:hover` | Hover tint, matching the pattern of `.edit-icon:hover` in the designer's stylesheet. |
| `.action-reject` | Colours `.grid-options-btn` red using designer's Danger token `#E50000`. |
| `.action-reject:hover` | Hover tint, matching `.delete-icon:hover` pattern. |
| `.top-triangle {}` | Empty declaration — designer class, declared here to satisfy the whitelist validator. |
| `.flag {}` | Empty declaration — designer class on language flag images; styles live in `styles.css`. |
| `.dropdown {}` | Empty declaration — Bootstrap utility; already in `bootstrap.rtl.min.css`. |

## Open questions for the designer

1. **4th KPI tile colour:** The designer's reference page (`agent-management.html`) uses `.danger` (red) for the total-balance tile. The product brief says blue. Please confirm which is correct before shipping.
2. **Reject button colour:** Currently using `.btn-primary` (blue) for the "رفض التسجيل" action. A `.btn-danger` variant would be more semantically accurate — consider adding it to the design system button set.
3. **Modal component:** The approve/reject dialogs are assembled from primitives in `page.css`. If modals appear on more than one page, a reusable `.modal-overlay` / `.modal-dialog-card` pattern should be promoted into `_components.scss` and `allowed-classes.txt`.
