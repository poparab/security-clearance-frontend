# Admin Panel design system — reference

Canonical source: `Designer UI/Admin.Panel.HTML_v21-04-2026/`.

This file is the ground truth for generating new pages. If the designer ships a
new version, update this document and the four sibling files in `docs/design-system/`
before generating any more pages.

## The absolute rules

1. **Never edit** anything under `Designer UI/Admin.Panel.HTML_v21-04-2026/**`.
2. **Never** inline `style="..."` on any element.
3. **Never** add a `<style>` block to a generated HTML file.
4. Per-page styles go into `generated/<slug>/page.css`, linked **after** `css/styles.css`.
5. Every class used must appear in `allowed-classes.txt` **or** be defined in the page's own `page.css`.
6. Every page uses the full shell in `page-template.html` — `<html dir="rtl">`, Bootstrap RTL CSS, the `.wrapper > #sidebar + #content` layout, and the sidebar toggle script.
7. Bare `<button>` without a `.btn` class is a bug.
8. The SCG anti-patterns (flat `<header class="internal">`, invented `.stat-*`/`.portal-*`/`.filter-bar` classes, removing `_components.scss` from the import chain) are forbidden — the validator greps for them.

## Layout shell

```
<div class="wrapper">
  <nav id="sidebar"> ... </nav>
  <div id="content">
    <header> ... </header>
    <section class="sm-padding"> ... </section>
    <section class="sm-padding"> ... </section>
  </div>
</div>
<div class="overlay"></div>
<script>sidebar-toggle jQuery</script>
```

See `page-template.html` for the ready-to-fill version.

## Design tokens

From `scss-scg-admin-panel/_variables.scss` and `_colors.scss`.

### Colors (hex anchors — prefer utility classes over raw hex)

| Token          | Hex      | Usage                                          |
| -------------- | -------- | ---------------------------------------------- |
| Primary        | `#005FCC`| Main brand, active nav, links                  |
| Secondary      | `#4FB848`| Success, confirm, approve                      |
| Tertiary       | `#00AAFF`| Info, identifiers, reference chips             |
| Warning        | `#FF9500`| Caution, medium priority                       |
| Danger         | `#E50000`| Reject, delete, high priority                  |
| Neutral white  | `#FFFFFF`| Backgrounds, cards                             |

Each color has a 25/50/100/200/300/400/500/600/700/800/900 scale. In markup, prefer `.primary-color`, `.secondary-bg`, `.danger-color`, etc. over raw hex.

### Sizes / spacing

`_variables.scss` defines `$size-1` through `$size-160` in `0.0625rem` increments. Typical usage:
- `$size-8` = 0.5rem (small gap)
- `$size-16` = 1rem (default gap)
- `$size-24` = 1.5rem (section padding)
- `$size-32` = 2rem (larger padding)

Section padding: `.sm-padding` (16px vertical) or `.md-padding` (24px vertical).

### Radius

- `$standard-radius: $size-8` — cards, inputs, pills
- `$standard-btn-radius: $size-8` — buttons
- `$radius-16` — widget tiles
- `$radius-24` — icon containers
- `$rounded-btn: $size-32` — fully rounded buttons (`-rounded` variants)
- `$radius-50: 50%` — avatars

### Typography

Font families (loaded via `_fonts.scss`):
- Tajawal — Arabic primary, 7 weights: ExtraLight, Light, Regular, Medium, Bold, ExtraBold, Black.
- Font Awesome 7.0.1 via CDN for icons.

Headings are sized by the system (`h1` 40px through `h6` 14px). Body is Tajawal-Regular 16px / 32px line-height.

Font-size utilities: `.font-size-11` through `.font-size-160`. Use these instead of inventing a size.

## Component categories

See `component-snippets.md` for copy/paste HTML. Brief index here:

| Category           | Primary class(es)                                          | Notes                                    |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------- |
| Page shell         | `.wrapper`, `#sidebar`, `#content`, `.overlay`             | Mandatory on every page                  |
| Section            | `section.sm-padding`, `section.md-padding`                 | Always wraps in `.container-fluid`       |
| Section title      | `.section-title`, `.title`, `.underline-title`, `.end-side`| Page header within a section             |
| KPI tiles          | `.widjets-theme-2 > .neutral-widjet.{blue,success,warning,danger}` | Always 4 per row on lg                   |
| Buttons            | `.btn.btn-{primary,secondary,tertiary,light,white,back}`   | Outline / rounded variants available     |
| Icon action btn    | `.grid-options-btn.{view,edit,delete}-icon`                | Links, not buttons                       |
| Forms              | `.form-control`, `.form-select`, `.input-group`            | Labels sit above the field               |
| File upload        | `.custom-file-input` + `.custom-file-label` (large) / `.custom-file-input-inline` + `.custom-file-label-inline` (button-style) | |
| Tables             | `.table.custom-grid-list` (preferred) / `.table.custom-grid` | `.table-responsive` wrapper required    |
| Pagination         | `.pagination > .page-item > .page-link`                    | Bootstrap structure                      |
| Status — pill      | `.status-{created,pending,approved,rejected}`              | With `.icon` child                       |
| Status — lamp      | `.status-{blue,active,warning,danger}-lamp` + `.lamp`      | Dot + text                               |
| Status — solid     | `.status-{blue,active,warning,danger,disabled}-solid`      | Filled chip                              |
| Cards              | `.custom-card`, `.standard-card`, `.standard-card-theme2`  | Header / body / footer sections          |
| Breadcrumb         | `.breadcrumb > ol > .breadcrumb-item`                      |                                          |
| Attachment         | `.attachment-item.uploaded`                                | Progress bar + close button              |

## BEM-ish naming conventions

- Prefix by component role: `.btn-*`, `.status-*`, `.widjet-*`, `.custom-*`, `.card-*`, `.form-*`, `.grid-options-*`, `.text-*`, `.dropdown-*`.
- Modifiers use color words (`.blue`, `.success`, `.warning`, `.danger`) or semantic words (`.active`, `.disabled`, `.uploaded`).
- The word "widget" is spelled **widjet** throughout the designer's SCSS. Match the misspelling — don't "fix" it.

## RTL rules

- `<html dir="rtl">` on every page.
- Bootstrap RTL stylesheet (`bootstrap.rtl.min.css`) must be linked.
- Numeric, date, English-Latin content: wrap in `.text-dir-ltr` so it reads left-to-right inside the RTL page.

## JS patterns

The designer ships two inclusions:
- jQuery 4.0.0 (`js/jquery-4.0.0.min.js`)
- Bootstrap bundle (`js/bootstrap/bootstrap.bundle.min.js`)

Interactive behavior is driven by Bootstrap data attributes (`data-bs-toggle="dropdown"`, `aria-expanded`) and the tiny jQuery snippet for the sidebar collapse. Do not introduce a new framework in a generated page. If something needs real JS, add it to a `page.js` file and link it after the sidebar script.

## Gap handling protocol

When mapping business input to this system, categorize each mismatch:

**Minor gap — decide autonomously, log in NOTES.md:**
- Spacing tweak within the 1–32 size scale.
- Picking one of several equally valid color modifiers.
- Composition of two existing components (e.g. card + status lamp).
- One or two rules in `page.css` for alignment/layout specific to this page.

**Major gap — pause and ask the user:**
- No clearly matching component at all.
- Business rule is ambiguous in the user story (missing field, undefined status state, unclear persona).
- Two valid interpretations with different user impact.
- A new reusable pattern that belongs in the design system, not in `page.css`.

## Maintenance

When the designer ships `Admin.Panel.HTML_v<new-date>/`:
1. Skim the new HTML pages for new classes.
2. Diff `_components.scss`, `_variables.scss`, `_colors.scss` against the version in this repo.
3. Re-run the class extraction (`grep -rhoE '\.[a-zA-Z][a-zA-Z0-9_-]*' '...new folder.../scss-scg-admin-panel/' --include='*.scss' | sort -u`) and update `allowed-classes.txt`.
4. Add new components to `component-snippets.md`.
5. Update this file's tokens/components tables if anything changed.
