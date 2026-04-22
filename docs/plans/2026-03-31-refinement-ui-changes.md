# Refinement Meeting — UI Changes Pending User Story Update

> These changes have been applied to the frontend HTML files.
> User stories will be updated once the team is satisfied with the UI.

---

## app/wallet.html

**Feature: Wallet Coverage by Nationality**

- Added a new section between the stats row and transaction history
- Section title: "تغطية الرصيد حسب الجنسية"
- Section subtitle shows the current wallet balance: "الرصيد الحالي: 2,100.00 جنيه"
- Displayed as a 3-column fixed-layout table:
  - Column 1: الجنسية (Nationality)
  - Column 2: الرسوم لكل طلب (Fee per inquiry)
  - Column 3: الطلبات الممكن تمويلها (Inquiries fundable with current balance)
- Column widths locked with `table-layout: fixed` and `colgroup` (34% / 33% / 33%)
- All headers and data cells are center-aligned
- Sample rows (static/mock data — to be replaced with dynamic feed from admin-configured fees):
  - السودان / 100 جنيه / 21 طلب
  - اليمن / 200 جنيه / 10 طلبات
  - الهند / 250 جنيه / 8 طلبات
  - الأردن / 275 جنيه / 7 طلبات
  - باكستان / 350 جنيه / 6 طلبات
  - إثيوبيا / 400 جنيه / 5 طلبات
- Affected file: `app/wallet.html`
- Linked user story to update: **US-W-01** (or whichever wallet story covers the balance display page)

---

## app/batch-inquiry.html

**Feature: Web Batch Builder — Option A (Group Concept)**

- Replaced the Excel-upload wizard with a full web-based group builder
- Wizard is now 3 steps: (1) تسمية الحزمة → (2) المجموعات والمسافرون → (3) المراجعة والتأكيد
- **Step 1**: Batch name (required) + optional notes + "how it works" info box
- **Step 2**: Group builder:
  - Each group = one shared flight ticket + multiple travelers
  - Groups are created inline (no modal) via an inline form card: departure country, arrival airport, travel date, purpose, flight number, group name
  - Once saved, group collapses to a compact pill strip showing flight details
  - Each group has a ticket image upload zone (drag-drop + simulate button for demo)
  - Travelers are added inline per group via a compact form row below the traveler table
  - Each traveler has: full name, nationality, passport number, passport expiry + passport image upload button in the table row
  - Duplicate passport detection: blocks adding the same passport number twice in one batch
  - Running total bar (sticky bottom): shows group count, traveler count, estimated fee
  - Demo controls: "load demo data" fills 2 groups with 5 travelers; "clear all" resets
- **Step 3**: Review:
  - Each group shown as a card with flight pill strip + traveler table (with fee per row + passport upload status)
  - Fee breakdown table aggregated by nationality
  - Wallet sufficiency check (balance 12,500 vs. total fee)
  - Summary card with batch name, ref ID, totals
  - Confirm + deduct → loading → success / failure states
- Navigation: "Next" is only enabled when: step 1 has a batch name; step 2 has ≥1 group with flight details + ticket + ≥1 traveler
- Affected file: `app/batch-inquiry.html`
- Linked user stories to update: **US-34, US-35, US-36** (or equivalent batch submission stories — to be rewritten to reflect the new group-based model)

---

*Last updated: 2026-03-31*
