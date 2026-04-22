# Security Clearance & Inquiry System — Release Plan

*Updated: 2026-03-16 | Single Admin Persona | Wallet Payment MVP (admin-funded) | Agency direct ESC payment removed | Inbound (To Egypt) MVP | Outbound (From Egypt) Release 1 | Transit stops: max 3*

---

## Release Overview

| Release | Theme | Story Count |
|---------|-------|-------------|
| **MVP** | Minimum working agency cycle: register → configure → fund wallet → submit batch → result (To Egypt inbound only) | 17 |
| **Release 1** | Full agency capability (auth safety nets, notifications, wallet history, single inquiry, batch manual entry, document management, From Egypt outbound) + full admin operations | 29 + 1 gap |
| **Release 2** | Individual traveler portal | 23 |

---

## MVP

> Goal: The smallest set of stories that produces a complete, working cycle. An admin can configure the system, approve an agency, and credit the agency's wallet. The agency can submit a batch inbound inquiry (To Egypt only), with fees deducted from the wallet balance, and view results.
>
> Auth edge cases (lockout, forgot password, OTP resend), notifications, audit log, manual batch entry, admin account management, and outbound (From Egypt) travel direction are all deferred to Release 1. Agency self-service wallet top-up is not in scope — wallet is admin-funded only. Transit stops capped at 3. Batch entry is file-upload-only path.

### Agency Stories — 8 stories

| Story ID | Title | Epic |
|----------|-------|------|
| US-22 | Agency registers and submits for admin approval | Account Registration & Onboarding |
| US-26 | Agency representative logs in to dashboard (with Recent Inquiries panel) | Account Registration & Onboarding |
| US-34 | Agency downloads batch inquiry file template *(CH-2 — To Egypt, 21 columns, 3 transit stops)* | Batch Inquiry |
| US-35 | Agency uploads batch file with per-row validation *(CH-2 — To Egypt, upload-only path)* | Batch Inquiry |
| US-36 | Agency re-uploads corrected batch file after validation failure | Batch Inquiry |
| US-37 | Agency views batch fee calculation before payment | Batch Inquiry |
| US-38 | Agency submits batch inquiry with wallet deduction | Batch Inquiry |
| US-39 | Agency receives payment confirmation for batch | Batch Inquiry |
| US-40 | Agency views batch details and per-traveler statuses | Batch Inquiry |

### Admin Stories — 6 stories

| Story ID | Title | Epic |
|----------|-------|------|
| US-M2-01 | Admin logs in to administration portal | Authentication & Access |
| US-M2-06 | Admin configures nationalities for security inquiry requirement *(To Egypt only in MVP)* | Nationality & Fee Configuration |
| US-M2-07 | Admin sets and updates inquiry fees per nationality *(To Egypt only in MVP)* | Nationality & Fee Configuration |
| US-M2-09 | Admin reviews and approves new agency registration | Agency Management |
| US-M2-15 | Admin monitors all inquiries with multi-field filtering | Inquiry Monitoring & Operations |
| US-M2-16 | Admin views full inquiry details and processing timeline | Inquiry Monitoring & Operations |
| US-M2-W1 | Admin credits agency wallet balance | Agency Management |

---

## Release 1

> Goal: Complete the agency experience (auth safety nets, notifications, manual batch entry, wallet balance & transaction history, document management, inquiry history). Add outbound (From Egypt) travel direction — US-NEW-03 direction selector, US-M2-06/07 direction scope and direction-based fees, and direction-aware batch validation (CH-1). Complete the admin back-office (account management, agency controls, audit, SLA monitoring, CSV exports). Transit stops remain capped at 3. Note: agency self-service wallet top-up is not introduced in Release 1 — wallet funding remains admin-initiated.

### Agency Stories — 17 stories

| Story ID | Title | Epic | Note |
|----------|-------|------|------|
| US-23 | Agency handles OTP resend during registration | Account Registration & Onboarding | Moved from MVP |
| US-24 | Agency reapplies after admin rejects registration | Account Registration & Onboarding | Moved from MVP |
| US-25 | Agency account locks after failed logins | Account Registration & Onboarding | Moved from MVP |
| US-27 | Agency representative resets forgotten password | Account Registration & Onboarding | Moved from MVP |
| US-28 | Agency updates profile and renews documents | Account Registration & Onboarding | |
| US-32 | Agency receives notifications on inquiry status changes | Inquiry Tracking & Results | Moved from MVP |
| US-33 | Agency views their full inquiry history list | Inquiry Tracking & Results | |
| US-29 | Agency submits single traveler inquiry to Egypt with transit details *(CH-2)* | Eligibility & Submission | Moved from MVP |
| US-30 | Agency receives payment confirmation for single inquiry | Payment | Moved from MVP |
| US-31 | Agency views single inquiry result | Inquiry Tracking & Results | Moved from MVP |
| US-41 | Agency downloads individual traveler PDF from batch | Batch Inquiry | |
| US-42 | Agency downloads all approved batch PDFs as ZIP | Batch Inquiry | |
| US-43 | Agency prints individual approval document from portal | Batch Inquiry | |
| US-NEW-03 | Agency selects inquiry direction for single outbound submission *(CH-1)* | Eligibility & Submission | Moved from MVP — direction selector not needed when MVP is To Egypt only |
| US-NEW-05 | Agency adds travelers one by one to manual batch *(CH-3)* | Batch Inquiry | Moved from MVP |
| US-NEW-06 | Agency edits or removes travelers from manual batch list *(CH-3)* | Batch Inquiry | Moved from MVP |
| US-NEW-07 | Agency saves partial manual batch as draft to resume later *(CH-3)* | Batch Inquiry | |

### Agency Gap Stories — 1 story to be authored

| Suggested ID | Title | Epic |
|---|---|---|
| US-W2 | Agency views wallet balance and transaction history | Wallet |

### Admin Stories — 13 stories

| Story ID | Title | Epic | Note |
|----------|-------|------|------|
| US-M2-02 | Admin account locks after failed login attempts | Authentication & Access | Moved from MVP |
| US-M2-03 | Admin resets forgotten password via OTP | Authentication & Access | Moved from MVP |
| US-M2-04 | Admin creates and manages admin accounts | Authentication & Access | Moved from MVP |
| US-M2-05 | Admin deactivates and reactivates admin accounts | Authentication & Access | Moved from MVP |
| US-M2-08 | Admin deactivates a pricing rule without deleting it | Nationality & Fee Configuration | Moved from MVP |
| US-M2-10 | Admin rejects a pending agency registration | Agency Management | Moved from MVP |
| US-M2-12 | Admin suspends an active agency account | Agency Management | Moved from MVP |
| US-M2-13 | Admin reactivates a suspended agency account | Agency Management | Moved from MVP |
| US-M2-14 | Admin reviews and approves updated agency documents | Agency Management | |
| US-M2-17 | Admin monitors processing queue and SLA compliance | Inquiry Monitoring & Operations | |
| US-M2-18 | Admin exports inquiry data as CSV from monitoring screen | Inquiry Monitoring & Operations | |
| US-M2-19 | Admin views and filters the system audit log | Audit & Compliance | Moved from MVP |
| US-M2-20 | Admin exports audit log as CSV for compliance reporting | Audit & Compliance | |

---

## Release 2

> Goal: Individual traveler self-service — registration, eligibility check, multi-step inquiry form, ESC payment, result tracking, and approval document download.

### Individual Stories — 23 stories

| Story ID | Title | Epic |
|----------|-------|------|
| US-01 | Individual registers portal account with OTP | Account Registration & Authentication |
| US-02 | Individual handles OTP resend and expiry | Account Registration & Authentication |
| US-03 | Individual logs in to the portal | Account Registration & Authentication |
| US-04 | Individual account locks after failed logins | Account Registration & Authentication |
| US-05 | Individual resets forgotten password via OTP | Account Registration & Authentication |
| US-NEW-01 | Individual selects inquiry direction before eligibility check *(CH-1)* | Eligibility & Submission |
| US-06 | Individual checks nationality + direction eligibility before form *(CH-1)* | Eligibility & Submission |
| US-07 | Individual submits personal details — Step 1 *(CH-1)* | Eligibility & Submission |
| US-08 | Individual submits passport details — Step 2 | Eligibility & Submission |
| US-NEW-04 | Individual declares structured transit stops for multi-leg journey *(CH-2)* | Eligibility & Submission |
| US-09 | Individual submits travel details — Step 3 *(CH-1 + CH-2)* | Eligibility & Submission |
| US-10 | Individual views fee before confirming submission | Eligibility & Submission |
| US-11 | Individual reviews, declares and confirms submission *(CH-1 + CH-2)* | Eligibility & Submission |
| US-NEW-02 | Individual submits outbound travel details for From Egypt journey *(CH-1)* | Eligibility & Submission |
| US-12 | Individual pays inquiry fee via ESC payment gateway | Payment |
| US-13 | Individual receives payment confirmation record | Payment |
| US-14 | Individual retries payment for Payment Pending inquiry | Payment |
| US-15 | Individual receives inquiry status change notifications | Inquiry Tracking & Results |
| US-16 | Individual views their own inquiry list | Inquiry Tracking & Results |
| US-17 | Individual tracks inquiry status and processing stages | Inquiry Tracking & Results |
| US-19 | Individual downloads approved PDF and QR code | Inquiry Tracking & Results |
| US-20 | Individual prints approval document from portal | Inquiry Tracking & Results |
| US-21 | Individual views approval validity and expiry warning | Inquiry Tracking & Results |

---

## Removed Stories

| Story ID | Title | Reason |
|----------|-------|--------|
| US-18 | Individual views rejection reason | Inquiries do not carry a rejection reason. Rejection status is surfaced in US-17. |

---

## Open Gaps — Not Yet Authored

| Suggested ID | Title | Release | Trigger |
|---|---|---|---|
| US-M2-21 | Admin changes temporary password on first login | MVP | US-M2-04 AC1 requires it — but US-M2-04 is now Release 1, so this moves to Release 1 as well |
| US-W2 | Agency views wallet balance and transaction history | Release 1 | Agency needs visibility of deduction history; balance-only view is on dashboard (US-26A); full history deferred to Release 1 |
| QR-01 | Public QR code verification page for approved inquiries | Release 2 | US-19 AC2 references "US-XX Public QR" |

---

## MVP Scope — Known Issues

> All four issues from the previous revision are resolved in docs/releases/MVP_User_Stories.md.

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | **No agency inquiry navigation** — no dashboard to reach US-31 and US-40 after confirmation | Critical | ✅ Resolved — US-26 AC4 (Recent Inquiries panel) + US-30 AC1 ('View Inquiry Details' button) + US-39 AC1 ('View Batch Details' button) |
| 2 | **US-35 two-tab description** — Manual Entry tab deferred but AC1 still described two tabs | Critical | ✅ Resolved — US-35 scoped to upload-only; CH-3 reference removed |
| 3 | **No agency single-inquiry payment retry** — Payment Pending single inquiry had no recovery path | High | ✅ Resolved — US-26 AC5 'Complete Payment' button on dashboard; US-30 AC4 ESC retry path |
| 4 | **No fee preview step for agency single inquiry** | Low | ✅ Resolved — US-29 AC4 adds fee preview screen before ESC redirect |

---

## Applied Changes in This Revision

| Change | Detail |
|--------|--------|
| MVP reduced from 36 → 19 stories | Removed auth edge cases, notifications, manual batch entry, account management, agency controls, audit log from MVP |
| US-35 scoped to upload-only in MVP | Manual Entry tab deferred with US-NEW-05/06 to Release 1 |
| US-M2-21 (first-login password change) | Moved to Release 1 since US-M2-04 (which triggers it) is now Release 1 |
| MVP reduced from 19 → 18 stories | US-NEW-03 (direction selector) moved to Release 1 — not needed when MVP is To Egypt only |
| MVP scoped to inbound (To Egypt) only | Direction selector, direction-scope config, and direction-based fees all deferred to Release 1; US-M2-06 and US-M2-07 simplified accordingly |
| Transit stops capped at 3 | Reduced from 4; batch template updated from 16 transit columns to 12; batch now has 21 total columns |
| All four critical/high MVP issues resolved | Navigation gap, US-35 two-tab gap, payment retry gap, and fee preview gap all fixed in docs/releases/MVP_User_Stories.md |
| **Agency direct ESC payment removed from MVP** | Wallet deduction is the only agency payment method. Agency self-service top-up (US-W1) removed from all releases. Admin credits wallet from back-office (US-M2-W1) added to MVP. MVP grows from 18 → 20 stories (US-M2-W1 added; US-30 and US-39 revised). US-38 renamed from "direct payment" to "wallet deduction". |
