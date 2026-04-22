# Batch Inquiry Page — Design Spec
**Date:** 2026-03-16
**Status:** Approved by user

---

## Overview

A multi-step wizard page for Agency Representatives to submit batch security inquiries. Covers the full flow from downloading the Excel template to wallet deduction confirmation. Built as a single HTML file referencing a shared SCSS/CSS design system extracted from the existing codebase.

---

## Source Stories

| Story | Description |
|---|---|
| US-34 | Agency downloads batch inquiry file template |
| US-35 | Agency uploads batch file with per-row validation |
| US-36 | Agency re-uploads corrected batch file after validation failure |
| US-37 | Agency views batch fee calculation before payment |
| US-38 | Agency submits batch inquiry with wallet deduction |
| US-39 | Agency receives submission confirmation for batch |

---

## File Structure

```
project root/
├── app/
│   ├── styles/
│   │   ├── _tokens.scss        ← design tokens
│   │   ├── _reset.scss         ← box-sizing, margin/padding reset
│   │   ├── _layout.scss        ← header, nav, breadcrumb, page wrapper
│   │   ├── _components.scss    ← buttons, badges, cards, tables, alerts, inputs
│   │   ├── _wizard.scss        ← stepper bar + step panels
│   │   ├── main.scss           ← entry point importing all partials
│   │   └── main.css            ← pre-compiled output (no build step required)
│   ├── index.html              ← refactored to use main.css
│   ├── registration.html       ← refactored to use main.css
│   ├── batch-inquiry.html      ← new wizard page
│   └── assets/
│       └── batch-template.xlsx ← 21-column Excel template (3 transit stops)
```

---

## Design Tokens

Extracted from `app/index.html`. No new values introduced.

- **Primary:** `#1d4ed8` / dark `#1e3a8a` / light bg `#eff6ff`
- **Semantic:** success `#16a34a`, warning `#d97706`, danger `#dc2626`
- **Neutrals:** text `#0f172a`, secondary `#475569`, muted `#94a3b8`, bg `#f1f5f9`, card `#fff`, border `#e2e8f0`
- **Font:** Tajawal (Google Fonts), sizes 11–20px
- **Direction:** RTL Arabic only

---

## Wizard Steps

The stepper bar is always visible at the top of the content area. Steps are locked/dimmed until the previous step completes. Completed steps show a checkmark and are click-navigable (read-only review).

### Step 1 — تحميل النموذج (Download Template)

- Instruction card explaining the 21-column format and 3-transit-stop structure
- Two download buttons: `.xlsx` and `.csv`
- Column reference table collapsed under a "عرض أعمدة النموذج" toggle
- "التالي" button becomes active immediately (template download is not enforced as a gate — user may already have the template)

### Step 2 — رفع الملف والتدقيق (Upload & Validate)

**Upload state:**
- Drag-and-drop zone + click-to-browse, accepts `.xlsx` / `.csv` only
- File size limit: 10 MB
- "رفع الملف" button triggers validation

**Loading state:**
- Spinner overlay on the dropzone with "جارٍ التحقق من الملف…"

**Success state (all rows valid):**
- Green success banner: traveler count, all rows accepted
- Summary chip: total rows
- "التالي" unlocks

**Partial validation state (some rows fail):**
- Amber alert banner: "X صفوف تحتوي على أخطاء — يجب تصحيح جميع الأخطاء قبل المتابعة"
- Per-row error table for failed rows only
- Summary chips: total rows / accepted / failed
- "التالي" remains locked — all errors must be corrected before proceeding (no partial batch submission)
- "إعادة رفع الملف المصحح" button replaces the dropzone

**Error state (Option B — dedicated error state):**
- Red alert banner: "فشل التحقق — يرجى تصحيح الأخطاء وإعادة الرفع"
- Per-row error table: Row # | Column | Error Description
- "إعادة رفع الملف المصحح" button replaces the dropzone
- Step 3 and 4 remain locked

### Step 3 — مراجعة الرسوم (Fee Review)

- Fee breakdown table: Nationality | Traveler Count | Fee Per Traveler | Subtotal
- Grand total row (bold)
- Non-refundable notice badge
- Wallet balance chip: "رصيد المحفظة: [amount]"
- **Insufficient balance state:** amber alert — "رصيد غير كافٍ. الرصيد الحالي: X. المطلوب: Y. يرجى التواصل مع المسؤول." — Confirm button disabled
- "تأكيد والمتابعة" button (enabled only if balance ≥ total)

### Step 4 — تأكيد الخصم (Confirm & Deduct)

**Pre-confirmation state:**
- Summary card: batch reference, traveler count, total to deduct, wallet balance after deduction
- Warning note: "العملية غير قابلة للاسترداد"
- "تأكيد الخصم وإرسال الطلبات" primary button
- "إلغاء والعودة" secondary link

**Confirmation loading state:**
- Button spinner: "جارٍ معالجة الطلب…"

**Success state (replaces wizard entirely):**
- Large success icon
- Batch reference number
- Traveler count submitted
- Amount deducted + remaining wallet balance
- Timestamp
- "عرض تفاصيل الدفعة" primary button → links to batch detail page
- "تحميل إيصال الدفعة" secondary button → PDF download
- "إرسال دفعة جديدة" text link

**System error state:**
- Red alert with support reference number
- "التواصل مع الدعم" link

---

## Excel Template

File: `app/assets/batch-template.xlsx`

21 columns in order:
1. `Traveler_Name`
2. `Nationality`
3. `Passport_Number`
4. `Passport_Expiry`
5. `Travel_Date`
6. `Departure_Country`
7. `Arrival_Airport_Egypt`
8. `Purpose`
9. `Flight_Number`
10. `Transit_Stop_1_Country`
11. `Transit_Stop_1_Airport`
12. `Transit_Stop_1_Hours`
13. `Transit_Stop_1_Flight`
14. `Transit_Stop_2_Country`
15. `Transit_Stop_2_Airport`
16. `Transit_Stop_2_Hours`
17. `Transit_Stop_2_Flight`
18. `Transit_Stop_3_Country`
19. `Transit_Stop_3_Airport`
20. `Transit_Stop_3_Hours`
21. `Transit_Stop_3_Flight`

Row 1: Headers (bold, blue fill `#1d4ed8`, white text)
Row 2: Guidance notes (italic, gray fill)
Rows 3+: Data entry rows

---

## Shared Stylesheet Refactor

`app/index.html` and `app/registration.html` will have their `<style>` blocks removed and replaced with:
```html
<link rel="stylesheet" href="styles/main.css">
```
All existing styles are migrated into the SCSS partials with no visual changes.

---

## Static Mockup Notes

- **Wallet balance:** Hardcoded to a demo value (e.g., 12,500 EGP) — no API call. The insufficient balance state is triggered by a JS toggle/demo button for review purposes.
- **Fee breakdown:** Hardcoded demo rows (3 nationalities × sample counts) — no calculation logic.
- **Validation:** Simulated via a JS timer — no real file parsing. Error table uses sample data.
- **PDF receipt download:** Button present but triggers a browser `alert()` placeholder — actual PDF generation is backend scope.

---

## Out of Scope

- Single inquiry form (separate page, later)
- Backend integration (static HTML mockup only)
- SCSS compilation pipeline / build tooling (main.css shipped pre-compiled)
- Mobile responsiveness (desktop-first, consistent with existing files)
