---
applyTo: "**/*.scss"
---

# SCSS Editing Rules — Security Clearance System

You are editing SCSS files for the Security Clearance & Inquiry System (نظام الموافقات الأمنية). Follow these rules strictly on every edit.

## Token Usage — Mandatory

### Spacing & Sizing
- **NEVER use raw `px` values.** Use `$size-*` variables from `_variables.scss`.
- Token scale: `$size-0` (0) through `$size-160` (10rem), all rem-based.
- Common mappings: `$size-4` = 0.25rem, `$size-8` = 0.5rem, `$size-12` = 0.75rem, `$size-16` = 1rem, `$size-24` = 1.5rem, `$size-32` = 2rem, `$size-48` = 3rem, `$size-64` = 4rem.
- Use tokens for: margin, padding, gap, width, height, top/right/bottom/left, border-width, border-radius.

### Typography
- **NEVER use raw `font-size` values.** Use `$font-size-*` variables.
- Font sizes use fluid `calc(Xrem + Yvw)` for responsive scaling.
- Scale: `$font-size-4` through `$font-size-160`.
- Common: `$font-size-12`, `$font-size-14`, `$font-size-16`, `$font-size-20` (body default), `$font-size-24`, `$font-size-32`, `$font-size-48`.

### Colors
- **NEVER use raw hex/rgb colors.** Use `$primaryColor`, `$secondaryColor`, `$tertiaryColor`, `$neutralColor` and their shade scales.
- Primary palette: `$primaryColor` (#005FCC), shades `$primaryColor-25` through `$primaryColor-900`.
- Secondary palette: `$secondaryColor` (#4FB848), shades `$secondaryColor-25` through `$secondaryColor-900`.
- Tertiary: `$tertiaryColor` (#00AAFF) with shades.
- Neutral: `$neutralColor` (#ffffff) with shades.
- Alerts: `$alertColor-success`, `$alertColor-danger`, `$alertColor-warning`, `$alertColor-info` with shades.
- The ONLY exception is `transparent`, `inherit`, `currentColor`, and `0` for shadows.

### Border Radius
- Cards: `$standard-radius` (`$size-8`)
- Buttons: `$standard-btn-radius` (`$size-16`)
- Pill/rounded: `$rounded-btn` (`$size-32`)

### Transitions
- Use `@include easeAnimation` (0.27s) or `@include easeAnimation-5s` (0.5s).
- Never write raw `transition` with hardcoded duration unless the existing codebase has a specific exception.

## Mixins — Use Before Inventing

Check `_mixins.scss` before writing new CSS. These mixins already exist:
- `flexCenter` — flex centered both axes
- `flexCenter-c` — flex centered, column direction
- `flexCenter-x` — flex centered horizontal only
- `flexCenter-z` — flex centered with space-between
- `photoBgCover` — background cover + center
- `photoResponsive` — responsive image (100% width, auto height)
- `textOverflow` — single-line ellipsis
- `position-absolute` — shorthand for absolute positioning
- `before-after` — pseudo-element base
- `custom-card` — standard card pattern (background, radius, padding, shadow)
- `custom-card-radius` — card border-radius only
- `custom-btn-radius` — button border-radius only
- `dark-icon` / `white-icon` / `secondary-icon` / `disable-icon` — CSS filter tricks for SVG icon coloring
- `easeAnimation` / `easeAnimation-5s` — transitions

## Formatting Style

Follow the project's compact single-line format:
```scss
// ✅ Correct — compact, nested, single-line properties
.component { display: flex; align-items: center; gap: $size-8;
  .child { font-size: $font-size-14; color: $primaryColor;
    &:hover { color: $primaryColor-700; @include easeAnimation; }
  }
  @media (max-width: 767px) { flex-direction: column; }
}

// ❌ Wrong — expanded multi-line (do NOT use this style)
.component {
  display: flex;
  align-items: center;
  gap: $size-8;
}
```

## File Organization

- Add component styles to the appropriate existing partial (`_variables.scss`, `_colors.scss`, `_mixins.scss`, `_reset.scss`).
- For new page-specific styles, create a new partial: `_page-name.scss` and import it in `styles.scss`.
- Never put styles in `_variables.scss` or `_colors.scss` — those are tokens only.
- Never modify Bootstrap source.

## Selector Rules

- Maximum nesting depth: **3 levels**.
- Use `&` for pseudo-classes, pseudo-elements, and modifier classes.
- Use `inset-inline-start` / `inset-inline-end` / `padding-inline` / `margin-inline` for RTL compatibility — never `left`/`right` for layout positioning.
- Avoid `!important` unless overriding Bootstrap defaults (and only when the existing codebase already does so).

## Responsive Breakpoints

Use these project breakpoints consistently:
- `1399px` — large desktop
- `1199px` — desktop
- `991px` — tablet landscape
- `767px` — tablet portrait
- `567px` — mobile landscape
- `480px` — mobile portrait

## Checklist Before Saving

1. No raw `px` values — all converted to `$size-*` tokens
2. No raw hex colors — all using color variables
3. No raw font sizes — all using `$font-size-*` tokens
4. Compact single-line format maintained
5. Appropriate mixin used where available
6. RTL-safe logical properties used (no `left`/`right`)
7. New partial imported in `styles.scss` if created
