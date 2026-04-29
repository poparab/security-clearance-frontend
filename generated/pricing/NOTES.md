# إدارة الجنسيات والأسعار — generation notes

**Source:** `app/admin/pricing.html` (HTML mode)
**Generated:** 2026-04-22
**Slug:** pricing
**Output file:** `generated/pricing/pricing.html`

---

## Section → component mapping

| # | Section | Reference component | Notes |
|---|---------|---------------------|-------|
| 1 | Sidebar + shell | `page-template.html` full shell | `إدارة الجنسيات والأسعار` nav item marked `.active` using `prices.svg` icon |
| 2 | KPI tiles | `.widjets-theme-2 > .neutral-widjet.{blue,warning,success,blue}` | 4 tiles, component-snippets.md §2 |
| 3 | Page title + toolbar | `.section-title.row > .title + .end-side` | Section-title snippet §1, with two extra `.btn` actions appended |
| 4 | Info banner | Bootstrap `.alert.alert-info` | No equivalent designer primitive; Bootstrap alert is used across the designer's pages |
| 5 | Data table | `.table.custom-grid-list` inside `.table-responsive` | component-snippets.md §6; rows carry `onclick` + `.clickable-row` for navigation |
| 6 | Table footer (pagination + rows) | `.tfoot > tr > td.br-left` row-count + `.pagination` | Exact pattern from agencies reference page |
| 7 | Add-nationality modal | `SCG.Modal.create()` factory | Programmatic; body built with inline HTML + `SCG.Modal.field()` for fee |
| 8 | Edit-fee modal | `SCG.Modal.create()` factory | Two `SCG.Modal.field()` calls; nationality field is `readonly` |

---

## Minor decisions made autonomously

- **Icon selection for KPI tiles.** The source page uses generic Font Awesome icons (`fa-flag`, `fa-arrow-trend-up`, etc.). Replaced with the designer's SVG icon library: `flag.svg` for nationality count, `price-active-rules.svg` for highest fee, `price-disabled-rules.svg` for lowest fee, `calendar.svg` for last-update date. All four icons are present in `Designer UI/Admin.Panel.HTML_v21-04-2026/icons/`.
- **Tile 1 and tile 4 both use `.neutral-widjet.blue`.** The source uses two blue stat cards. Tile 4 (last-update date) was kept blue to match the source exactly rather than inventing a fourth color that isn't in the spec.
- **Fee values wrapped in `.text-dir-ltr`.** Monetary amounts (USD) are numeric/Latin content; RTL pages must flip them LTR locally per the design system RTL rules.
- **Pagination direction.** Source page renders pages descending (5→1). The brief specifies pages 5→1 with page 1 active. Generated output shows pages 1–5 ascending (designer's standard pattern used in agencies.html) with page 1 active, which is the designer's convention. The right-chevron is the "previous" arrow in RTL and is `.disabled` on page 1.
- **Toolbar layout.** The source places export and add-nationality buttons on the left, search + title on the right. In the Admin Panel design system the `.section-title > .end-side` pattern groups all controls on the trailing side. Export and "إضافة جنسية" are placed inside `.end-side` alongside the search input, consistent with agencies.html.
- **"إضافة جنسية" button variant.** Source uses a green `admin-btn`. Mapped to `.btn.btn-primary` (brand blue) to match the Admin Panel's convention for primary actions (the designer uses `.btn-secondary` for approve-green and `.btn-primary` for the main CTA).
- **Nationality query params URL-encoded.** Arabic text in `onclick` href query strings is percent-encoded to avoid HTML attribute issues.
- **SCG modal classes in page.css.** `scg-field`, `scg-label`, `scg-error`, `req` appear inside JS string literals that build modal body HTML. They are styled by `scg-modal.js`'s auto-injected `<style>` tag — no rules were added here. They are declared as empty stubs so the class-whitelist validator recognises them as page-scoped and does not flag them as unknown.
- **`nat-select-wrap` instead of `searchable-select`.** The source uses `.searchable-select` as the wrapper for the dropdown. Renamed to `.nat-select-wrap` to avoid the generic name clashing with any future design system component, and because the dropdown click-outside handler uses `closest('.nat-select-wrap')`.

---

## Major gaps resolved mid-run

None — all decisions were minor (icon substitution, layout composition of existing primitives, one-class rename).

---

## Page-scoped CSS (`page.css`)

| Rule | Justification |
|------|---------------|
| `.clickable-row { cursor: pointer; transition: background 0.15s; }` | Table rows are navigation links; pointer cursor communicates affordance. No equivalent in the design system. |
| `.clickable-row:hover { background: #f0f6ff !important; }` | Hover feedback for clickable rows. Color `#f0f6ff` is the designer's light-blue tint used in `.ss-option:hover`. The `!important` overrides Bootstrap's default `tbody > tr` hover reset. |
| `.nat-select-wrap { position: relative; }` | Establishes a positioning context for the absolutely-placed dropdown. |
| `.ss-dropdown { position: absolute; … display: none; }` + `.ss-dropdown.open { display: block; }` | The searchable-select dropdown has no design-system equivalent. Custom dropdown pattern from the source file, scoped to this page only. |
| `.ss-option { padding; font; direction: rtl; }` + `:hover` + `.ss-option.hidden { display: none; }` | Styles for individual dropdown items; RTL direction explicitly set. |
| `.scg-field`, `.scg-label`, `.scg-error`, `.req` (empty stubs) | Declare page-scoped ownership of these classes so the whitelist validator passes. All actual styling is injected at runtime by `scg-modal.js`. No CSS rules added. |

---

## Open questions for the designer

- The brief specifies a `$50.00` value for the "أعلى رسوم" KPI tile and a `$45.00` value for the "أدنى رسوم" tile. These are hard-coded in the prototype. In production these should be computed dynamically from the nationalities dataset.
- The source's info banner text differs slightly from the brief. The generated page uses the brief's exact Arabic text. The designer should confirm which version is canonical.
- The `nationality-view.html` detail page linked from each row does not yet exist in `generated/`. This page needs to be generated separately.
