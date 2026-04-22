# Security Clearance & Inquiry System
## MVP User Stories

*Scope: To Egypt only | Wallet payment only (Admin-funded) | Web form batch entry*

*32 stories — 18 Agency + 14 Admin*

---

## Personas

| Persona | Description |
|---|---|
| **Agency** | The main account holder for a registered travel agency. The Agency registers, logs in, submits batch inquiries, checks wallet activity, and monitors inquiry progress in the portal. |
| **Admin** | The back-office user who manages nationality pricing, agency approval, wallet credit, and system-wide inquiry monitoring. |

---

## Inquiry Status Lifecycle

Submitted → Under Processing → Approved / Rejected / Failed

---

# Portal User Stories

## Portal Story List

- US-1 — Agency registers and submits for approval
- US-2 — Agency logs in to the portal
- US-3A — Agency views account and wallet summary
- US-3B — Agency views monthly inquiry KPIs
- US-3C — Agency views recent batch activity
- US-3D — Agency uses dashboard quick action cards
- US-3E — Agency views inquiry analytics charts
- US-4A — Agency views wallet balance and transactions
- US-4B — Agency views balance coverage by nationality
- US-5 — Agency builds batch inquiry via web form
- US-6 — Agency reviews batch in confirmation modal
- US-7 — Agency sees batch submission result
- US-8 — Agency views batch details and statuses
- US-9 — Agency exports batch status report
- US-10 — Agency views batch list and drafts
- US-11 — Agency monitors full inquiry list
- US-12 — Agency views detailed inquiry record
- US-21 — Agency logs out of portal

## Epic: Account Registration & Onboarding

---

## US-1 | (Agency) registers and submits for approval

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Account Registration & Onboarding |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an agency setting up the portal account for the first time
- **I want to…** register the agency by submitting its details and required documents for Admin review and approval
- **So that…** the agency account is created in a pending state and Admin can review it before granting access

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Successful registration submission | the agency user opens the registration page | they complete all required fields and upload valid documents | the system creates a pending agency account and sends a confirmation email to the registered email using template `EMAIL-REG-SUBMITTED`. |
| AC2 | Missing field blocks submission | a required field is missing | the form is submitted | the system highlights the missing field and blocks submission. |
| AC3 | Duplicate email rejection | the email address is already linked to an existing agency | the agency user submits the form | the system displays: ***يوجد حساب مرتبط بهذا البريد الإلكتروني بالفعل. (An account with this email already exists.)*** |
| AC4 | Pending status confirmation screen | the registration is submitted | the confirmation page loads | the agency user sees a pending status screen showing agency summary details and the message: ***تم استلام طلب التسجيل وهو قيد المراجعة. سيتم إشعاركم عبر البريد الإلكتروني عند صدور القرار. (Your registration is pending review. You will be notified by email once a decision is made.)*** |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Agency Name** | Text | Yes | Min 3 characters | ***اسم الوكالة مطلوب (3 أحرف على الأقل). (Agency name is required.)*** |
| **Commercial Reg. Number** | Text | Yes | Minimum 3 characters. Letters, numbers, `-`, and `/` allowed | ***يرجى إدخال رقم سجل تجاري صحيح. (Please enter a valid commercial registration number.)*** |
| **Contact Person Name** | Text | Yes | Min 2 characters | ***اسم المسؤول مطلوب (حرفان على الأقل). (Contact person name is required.)*** |
| **Email Address** | Email | Yes | Valid email format | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| **Password** | Password | Yes | Min 8 characters. Must include one uppercase letter, one lowercase letter, one digit, and one special character | ***كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a digit, and a special character.)*** |
| **Confirm Password** | Password | Yes | Must exactly match Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |
| **Country Code** | Select | Yes | Must select from configured list | ***يرجى اختيار رمز الدولة. (Please select a country code.)*** |
| **Mobile Number** | Tel | Yes | 8 to 15 digits | ***يرجى إدخال رقم جوال صحيح. (Please enter a valid mobile number.)*** |
| **Agency Document Upload** | File | Yes | PDF only. Max 5 MB | ***نوع الملف غير مدعوم أو الحجم يتجاوز الحد. (Unsupported file type or file size too large.)*** |
| **Terms & Conditions** | Checkbox | Yes | Must be checked before submit | ***يجب الموافقة على الشروط والأحكام. (You must accept the terms and conditions.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. This is the entry point of the agency flow.

---

## US-2 | (Agency) logs in to the portal

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Account Registration & Onboarding |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** log in to the portal using my registered email and password
- **So that…** I can access the dashboard and manage agency work

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Successful login and redirect | the agency user enters a valid email and correct password | they submit the form | the system authenticates the account and redirects to the agency dashboard. |
| AC2 | Invalid credentials error | invalid credentials are entered | the agency user submits the form | the system displays the neutral login error message from the Form Field Validation table below and does not reveal which field is wrong. |
| AC3 | Pending account login blocked | the agency account is not yet approved | the agency user attempts to log in | login is blocked with: ***الحساب قيد المراجعة. (Your account is pending approval.)*** |
| AC4 | Rejected account login blocked | the agency account has been rejected | the agency user attempts to log in | login is blocked with: ***تم رفض طلب التسجيل. (Your registration has been rejected.)*** |


### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Registered agency email format | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| **Password** | Password | Yes | Non-empty and must match registered credentials | ***بيانات الدخول غير صحيحة. (Incorrect email or password.)*** |
| **Remember Me** | Checkbox | No | Optional session persistence | — |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. The landing dashboard is covered in **(Agency) dashboard views account and wallet summary**, **(Agency) dashboard views monthly inquiry KPIs**, **(Agency) dashboard views recent batch activity**, **(Agency) dashboard uses dashboard quick action cards**, and **(Agency) dashboard views inquiry analytics charts**.

### Scope Boundaries

> This story covers authentication and session creation only. The dashboard that loads after login is defined in **(Agency) dashboard views account and wallet summary**, **(Agency) dashboard views monthly inquiry KPIs**, **(Agency) dashboard views recent batch activity**, **(Agency) dashboard uses dashboard quick action cards**, and **(Agency) dashboard views inquiry analytics charts**.

---

## US-3A | (Agency) dashboard views account and wallet summary

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency that just logged in
- **I want to…** see my agency details and current wallet balance on the dashboard
- **So that…** I can confirm my account status and available balance at a glance

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Agency info card | the agency logs in | the dashboard loads | an agency info card shows the agency name, commercial registration number, account status, and last login timestamp. |
| AC2 | Wallet balance card | the dashboard loads | the overview section renders | a wallet card is shown with:<br>- Current balance in USD.<br>- Read-only display with no top-up action.<br>- A note stating that wallet funding is managed by Admin. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-3B | (Agency) dashboard views monthly inquiry KPIs

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** see a count of my inquiries by status for the current month and my overall approval rate
- **So that…** I can monitor performance without opening the full inquiry list

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Monthly status tiles | the dashboard loads | KPI widgets render | five status tiles show the current-month counts for Submitted, Under Processing, Approved, Rejected, and Failed inquiries. |
| AC2 | Approval rate metric | the KPI section renders | performance metrics are displayed | the approval rate is shown as a percentage alongside the total inquiry count for the current month. |
| AC3 | Zero inquiries this month | the agency has not submitted any inquiries in the current month | the KPI section renders | all status tiles show zero counts and the approval rate shows 0%. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-3C | (Agency) dashboard views recent batch activity

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** see my last 5 batch submissions on the dashboard
- **So that…** I can quickly check recent activity and jump to a batch that needs attention

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Recent activity table | the dashboard loads | the activity section renders | a table shows the last 5 batch records. For column details see the Grid Specification below. |
| AC2 | View details action | a batch row is shown | the agency selects the view details action | the batch details page opens for that batch. |
| AC3 | No batches yet | the agency has not submitted any batches | the activity section renders | a message indicates no batch activity is available yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | No | — |
| Submission Date | No | No | — |
| Traveler Count | No | No | — |
| Status | No | No | — |
| Actions | No | No | — |

**Pagination:** No — fixed to last 5 records only.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on batches existing from the MVP batch submission flow.

---

## US-3D | (Agency) dashboard uses dashboard quick action cards

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** see two clear action cards on the dashboard for my main tasks
- **So that…** I can reach batch inquiry or wallet management in one click

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Quick action cards visible | the dashboard loads | the quick actions section renders | two action cards are shown: one for Batch Inquiry and one for Wallet Management. Each card has a label and a clear action button. |
| AC2 | Batch inquiry card navigates | the agency selects the Batch Inquiry card action | the action is triggered | the batch inquiry page opens. |
| AC3 | Wallet management card navigates | the agency selects the Wallet Management card action | the action is triggered | the wallet page opens. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. Navigation only — no data dependency.

---

## US-3E | (Agency) dashboard views inquiry analytics charts

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** see a nationality breakdown and a 7-day inquiry trend on the dashboard
- **So that…** I can spot patterns in my inquiry activity without running a report

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Nationality pie chart | the dashboard loads | the analytics section renders | a pie chart titled الطلبات حسب الجنسية shows the percentage of inquiries submitted per nationality for the current month. |
| AC2 | Trend line chart | the dashboard loads | the analytics section renders | a line chart titled اتجاه الطلبات — آخر 7 أيام shows the daily inquiry count for the last 7 days. |
| AC3 | No inquiry data for charts | the agency has not submitted any inquiries | the analytics section renders | charts show an empty state with a message that data will appear after inquiries are submitted. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-4A | (Agency) views wallet balance and transactions

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** open a wallet page that shows my balance, totals, and transaction history
- **So that…** I can verify deductions and track Admin credits

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Wallet summary cards | the agency opens the wallet page | the page loads | three summary cards are displayed:<br>- Current Balance (USD).<br>- Total Deposits (USD).<br>- Total Deductions (USD). |
| AC2 | Monthly transaction statistics | the wallet page loads | summary statistics are rendered | a monthly statistics row is displayed showing:<br>- Transactions this month (count).<br>- Deposits count.<br>- Deductions count.<br>- Last transaction date. |
| AC3 | Transaction history table | the transaction history table is shown | rows are listed | each row displays the columns defined in the Grid Specification below. |
| AC4 | Credit and debit distinction | the page includes both credits and debits | transactions are displayed | credit amounts and debit amounts are visually distinct for quick review. |
| AC5 | Admin-managed funding notice | wallet funding is Admin-managed in MVP | the agency opens the wallet page | the page displays a notice that wallet top-up is completed only by Admin, with a hotline number for top-up requests. |
| AC6 | No transactions yet | the agency has no wallet transactions | the wallet page loads | the transaction table shows a message that no transactions are available yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Date | Yes | Yes | Date range |
| Transaction Type | No | Yes | Dropdown: Credit, Debit |
| Description | No | No | — |
| Amount (USD) | Yes | No | — |
| Balance After (USD) | No | No | — |
| Reference Number | No | Yes | Text search |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the wallet summary cards, monthly statistics, and transaction history table. Balance coverage by nationality is defined in **(Agency) views balance coverage by nationality**. Admin wallet credit is defined in **(Admin) credits agency wallet balance**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-4B | (Agency) views balance coverage by nationality

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Agency Dashboard |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency checking how far the wallet balance can go
- **I want to…** see a table that shows each configured nationality with its inquiry fee and how many inquiries the current balance can cover
- **So that…** I can plan batch submissions without running out of funds

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Coverage table displays | the wallet page loads | the coverage section is rendered | a table shows each configured nationality with the columns defined in the Grid Specification below. |
| AC2 | Zero balance coverage | the agency wallet balance is zero | the coverage table renders | all nationalities show zero coverable inquiries. |
| AC3 | No nationalities configured | no nationalities have been configured in the system | the coverage section renders | the table shows a message that no nationalities have been configured yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Nationality | Yes | Yes | Text search |
| Inquiry Fee (USD) | Yes | No | — |
| Inquiries Coverable | Yes | No | — |

**Pagination:** No — all configured nationalities are shown.

### Scope Boundaries

> This story covers the nationality balance coverage section of the wallet page. Wallet summary and transaction history are defined in **(Agency) views wallet balance and transactions**. Admin wallet credit is defined in **(Admin) credits agency wallet balance**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## Epic: Batch Inquiry

---

## US-5 | (Agency) builds batch inquiry via web form

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency preparing a batch inquiry for travelers coming to Egypt
- **I want to…** enter batch information in Step 1 and add travelers one by one in Step 2 with automatic draft saving each time a traveler is saved
- **So that…** I can complete the batch directly in the portal and return later without losing saved traveler records

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Batch info step loads | the agency opens the batch inquiry page | the wizard opens | Step 1 shows the batch information fields and guidance for the two-step flow. The agency cannot move forward until a batch name is entered. |
| AC2 | Traveler step opens | Step 1 is completed | the agency moves to Step 2 | Step 2 shows the add-traveler action and the current saved travelers list. For all traveler fields, types, constraints, and inline errors, see the Form Field Validation table below. |
| AC3 | Traveler save blocked until complete | the traveler form is open | any required traveler field, passport image, or ticket image is missing or invalid | the traveler is not saved. The system highlights the invalid field and shows the inline validation message. |
| AC4 | Save and add another | a valid traveler form is completed | the agency chooses the save and add another action | the traveler is saved, the draft is updated automatically, and a new empty traveler form opens. |
| AC5 | Save and close | a valid traveler form is completed | the agency chooses the save action | the traveler is saved, the draft is updated automatically, and the saved traveler appears in the Step 2 list. |
| AC6 | Confirmation starts from Step 2 | at least one traveler has been saved | the agency chooses to submit the batch | the wizard stays on Step 2 and opens a confirmation modal. No separate review page is shown. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Batch Name** | Text | Yes | Min 1 character. Max 80 characters | ***اسم الدفعة مطلوب. (Batch name is required.)*** |
| **Notes** | Textarea | No | Free text | — |
| **First Name (English)** | Text | Yes | Min 2 characters. Max 50 characters. English letters only | ***الاسم الأول باللغة الإنجليزية مطلوب. (First name in English is required.)*** / ***يرجى استخدام أحرف إنجليزية فقط. (Please use English letters only.)*** |
| **Last Name (English)** | Text | Yes | Min 2 characters. Max 50 characters. English letters only | ***اسم العائلة باللغة الإنجليزية مطلوب. (Last name in English is required.)*** / ***يرجى استخدام أحرف إنجليزية فقط. (Please use English letters only.)*** |
| **First Name (Arabic)** | Text | No | If entered, min 2 characters. Max 50 characters. Arabic letters only | ***يرجى إدخال الاسم الأول باللغة العربية بحروف عربية فقط. (Please enter the first name in Arabic using Arabic letters only.)*** |
| **Last Name (Arabic)** | Text | No | If entered, min 2 characters. Max 50 characters. Arabic letters only | ***يرجى إدخال اسم العائلة باللغة العربية بحروف عربية فقط. (Please enter the last name in Arabic using Arabic letters only.)*** |
| **Date of Birth** | Date | Yes | Must be a valid past date | ***يرجى إدخال تاريخ ميلاد صحيح في الماضي. (Please enter a valid past date of birth.)*** |
| **Gender** | Select | Yes | Must select a supported value | ***يرجى اختيار الجنس. (Please select a gender.)*** |
| **Nationality** | Select | Yes | Must be a configured nationality | ***يرجى اختيار جنسية المسافر. (Please select the traveler's nationality.)*** |
| **Passport Number** | Text | Yes | Alphanumeric. 6 to 20 characters. Must be unique within the batch | ***يجب أن يتكون رقم جواز السفر من 6 إلى 20 حرفا أو رقما. (Passport number must be 6–20 alphanumeric characters.)*** / ***يوجد مسافر بنفس رقم جواز السفر في هذه الدفعة. (A traveler with this passport number already exists in this batch.)*** |
| **Passport Expiry** | Date | Yes | Must be at least 6 months after the travel date | ***يجب أن يكون جواز السفر صالحا لمدة 6 أشهر على الأقل بعد تاريخ السفر. (Passport must be valid for at least 6 months after the travel date.)*** |
| **Departure Country** | Select | Yes | Must be selected from the configured country list | ***يرجى اختيار بلد المغادرة. (Please select the departure country.)*** |
| **Arrival Airport** | Select | Yes | Must be a configured Egyptian airport | ***يرجى اختيار مطار الوصول في مصر. (Please select the arrival airport in Egypt.)*** |
| **Travel Date** | Date | Yes | Today or a future date | ***يجب أن يكون تاريخ السفر اليوم أو تاريخا مستقبليا. (Travel date must be today or a future date.)*** |
| **Purpose of Travel** | Select | Yes | Must be selected from the supported list | ***يرجى اختيار غرض السفر. (Please select the purpose of travel.)*** |
| **Flight Number** | Text | No | Max 10 characters. Letters, numbers, and separators allowed | ***يجب أن يكون رقم الرحلة حروفا أو أرقاما وبحد أقصى 10 أحرف. (Flight number must be alphanumeric, max 10 characters.)*** |
| **Passport Image** | File | Yes | JPG, PNG, or PDF. Required before the traveler can be saved | ***صورة جواز السفر مطلوبة قبل حفظ المسافر. (A passport image is required before saving the traveler.)*** / ***صيغة الملف غير مدعومة. يرجى استخدام JPG أو PNG أو PDF. (Unsupported file format. Please use JPG, PNG, or PDF.)*** |
| **Ticket Image** | File | Yes | JPG, PNG, or PDF. Required before the traveler can be saved | ***صورة التذكرة مطلوبة قبل حفظ المسافر. (A ticket image is required before saving the traveler.)*** / ***صيغة الملف غير مدعومة. يرجى استخدام JPG أو PNG أو PDF. (Unsupported file format. Please use JPG, PNG, or PDF.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. The draft is created or updated automatically each time a traveler is saved.

### Scope Boundaries

> This story covers batch info entry (Step 1) and traveler entry (Step 2) including draft saving. The confirmation modal is defined in **(Agency) reviews batch in confirmation modal**. The submission result screen is defined in **(Agency) sees batch submission result**.

---

## US-6 | (Agency) reviews batch in confirmation modal

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency with saved travelers in the batch wizard
- **I want to…** review the batch summary and confirm submission from a modal at the end of Step 2
- **So that…** I can verify the batch before it is sent for processing without leaving the traveler step

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Confirmation modal summary | at least one traveler has been saved in Step 2 | the confirmation modal opens | the modal shows the batch name, notes, total traveler count, and a summary of the saved travelers. |
| AC2 | Warning shown before confirm | the confirmation modal is open | the agency reviews the modal | a warning explains that submission starts processing immediately and wallet deduction cannot be reversed. |
| AC3 | Confirm enabled on sufficient balance | the agency wallet balance is sufficient | the modal opens | the confirm action is enabled. |
| AC4 | Confirm blocked on insufficient balance | the agency wallet balance is insufficient | the modal opens | the system displays: ***رصيد المحفظة غير كاف. يرجى التواصل مع مسؤول الجهة لشحن المحفظة. (Insufficient wallet balance. Please contact your administrator to top up the wallet.)*** and the confirm action is disabled. |
| AC5 | Close returns to Step 2 | the confirmation modal is open | the agency closes the modal without confirming | the wizard returns to Step 2 with all saved travelers still available. |
| AC6 | Fee details hidden from modal | the confirmation modal is open | the agency reviews the content | no fee breakdown or per-traveler cost is shown in the modal. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ This story depends on **(Agency) builds batch inquiry via web form** and should be planned in the same sprint.

### Scope Boundaries

> This story covers the confirmation modal only. Traveler entry in the wizard is defined in **(Agency) builds batch inquiry via web form**. The submission result screen is defined in **(Agency) sees batch submission result**.

---

## US-7 | (Agency) sees batch submission result

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency that confirmed a batch submission
- **I want to…** see the result of the submission immediately after I confirm it
- **So that…** I know whether the batch moved forward for processing or ended in a failed state

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Submission runs as one action | the confirmation modal is displayed and the balance is sufficient | the agency confirms submission | the system deducts the applicable amount from the wallet and submits the batch in one server-side action. |
| AC2 | Success result screen | the agency confirmed the batch | the submission succeeds | a success screen shows a confirmation message, the batch reference number, the number of travelers submitted, the total amount deducted from the wallet, and actions to open batch details or the batch list.<br>The batch is saved with `Submitted` status and becomes available for tracking. |
| AC3 | Failed result screen | the agency confirmed the batch | the submission cannot be completed | a failure screen shows: ***تعذر إكمال إرسال الدفعة. يرجى المحاولة مرة أخرى أو التواصل مع الدعم. (The batch submission could not be completed. Please try again or contact support.)***, a support reference, and actions to open batch details or return to the batch list.<br>The batch is shown with `Failed` status. No traveler inquiry moves to `Under Processing`, and no wallet amount is deducted. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ This story depends on **(Agency) reviews batch in confirmation modal** and should be planned in the same sprint.

### Scope Boundaries

> This story covers the submission result screen only. The confirmation modal is defined in **(Agency) reviews batch in confirmation modal**. The batch details view is defined in **(Agency) views batch details and statuses**.

---

## US-8 | (Agency) views batch details and statuses

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency that submitted a batch inquiry
- **I want to…** view the batch details and each traveler's current status
- **So that…** I can monitor progress and open the right inquiry when an approval document is ready

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Batch detail screen with metadata | the agency opens a batch from the dashboard or batch list | the batch details page loads | the screen shows:<br>- Batch reference.<br>- Batch name.<br>- Submission date.<br>- Last updated timestamp.<br>- Summary cards showing counts by status (Submitted, Under Processing, Approved, Rejected, Failed).<br>- A per-traveler table. For column details see the Grid Specification below. |
| AC2 | Per-traveler table columns | the per-traveler table loads | traveler rows are rendered | each row shows the columns defined in the Grid Specification below. |
| AC3 | inquiry details view (only link covered in this story) | a traveler inquiry is submitted | the agency clicks the view action | the action leads to the inquiry detail page . |
| AC4 | Rejected or failed inquiry display | a traveler inquiry is rejected or failed | the row is displayed | the row shows `Rejected` or `Failed` status clearly. |


### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | Yes | Text search |
| Traveler Name | Yes | Yes | Text search |
| Nationality | No | Yes | Dropdown: configured nationalities |
| Passport Number | No | No | — |
| Submission Date | Yes | No | — |
| Status | No | Yes | Dropdown: Submitted, Under Processing, Approved, Rejected, Failed |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the batch detail view and per-traveler status table only. Exporting the batch report is defined in **(Agency) exports batch status report**. The batch list and draft navigation is defined in **(Agency) views batch list and drafts**. The individual inquiry detail view is defined in **(Agency) views detailed inquiry record**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ This story follows **(Agency) sees batch submission result** because the batch must exist before it can be viewed.

---

## US-9 | (Agency) exports batch status report

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency reviewing a submitted batch
- **I want to…** export the batch details and traveler statuses as a downloadable report
- **So that…** I can archive batch records and share status with internal stakeholders

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Export action availability | the agency opens a batch details page | the page loads | an export action is visible on the page toolbar. |
| AC2 | Export content scope | the agency triggers export | the report is generated | the file contains batch metadata and per-traveler rows with reference number, traveler name, nationality, passport number, submission date, and inquiry status. |
| AC3 | Export filename convention | the report is generated successfully | the download starts | the filename follows `batch-report-{BatchID}-{YYYYMMDD}.xlsx`. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. This story isolates export behavior from **(Agency) views batch details and statuses** for clearer scope and testing.

---

## US-10 | (Agency) views batch list and drafts

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** browse submitted batches and saved drafts with search and filtering
- **So that…** I can find a batch quickly, resume an unfinished draft, or open a submitted batch status view

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Batch KPI summary cards | the agency opens the batch list page | the page loads | three KPI cards are shown with these definitions: **All Batches** means all submitted batches, **Completed** means batches where all traveler inquiries reached a final state of Approved, Rejected, or Failed, and **Under Processing** means batches that still contain one or more inquiries that are not yet in a final state.<br>Drafts do not affect these KPI counts. |
| AC2 | Search and filter controls | the filter bar is used | filter values are applied | the agency can search by batch reference or batch name, filter by status including Draft, Submitted, Under Processing, Completed, and Failed, and apply a date range. |
| AC3 | Batch table row content | the table is loaded | rows are rendered | each row shows the batch name or batch reference, traveler count, last activity date, status, and an action button. |
| AC4 | Open non-draft batch details | the agency clicks the action button on a non-draft row | the action is triggered | the batch details page opens for that batch. |
| AC5 | Resume a draft batch | the agency clicks the action button on a draft row | the action is triggered | the batch wizard reopens with the saved batch name, notes, and traveler records restored in Step 2. |
| AC6 | Pagination controls | there are many records | the result set exceeds one page | pagination and row-count controls are available. |
| AC7 | No batches or drafts exist | the agency has not created any batches or drafts | the batch list loads | the table shows a message that no batches are available yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Batch Name / Reference | Yes | Yes | Text search |
| Traveler Count | No | No | — |
| Last Activity Date | Yes | Yes | Date range |
| Status | No | Yes | Dropdown: Draft, Submitted, Under Processing, Completed, Failed |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the batch list and draft resume navigation. Draft creation and the batch wizard are defined in **(Agency) builds batch inquiry via web form**. Batch details are defined in **(Agency) views batch details and statuses**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-11 | (Agency) monitors full inquiry list

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** view all inquiries in one list with filters
- **So that…** I can monitor progress for all traveler inquiries submitted through batches

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Inquiry KPI summary cards | the inquiry list screen loads | summary widgets render | KPI cards show totals for all inquiries, Submitted, Under Processing, Approved, Rejected, and Failed. |
| AC2 | Search and filter controls | filtering is required | search and dropdown filters are applied | the agency can filter by search term, status, and nationality. |
| AC3 | Inquiry table row content | the inquiry table is shown | rows are rendered | each row displays reference number, traveler name, nationality, submission date, status, and a view action. |
| AC4 | Pagination controls | there are multiple pages of results | the result count exceeds one page | pagination controls are displayed. |
| AC5 | No inquiries exist | the agency has not submitted any inquiries | the inquiry list loads | the table shows a message that no inquiries are available yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | Yes | Text search |
| Traveler Name | Yes | Yes | Text search |
| Nationality | No | Yes | Dropdown: configured nationalities |
| Submission Date | Yes | Yes | Date range |
| Status | No | Yes | Dropdown: Submitted, Under Processing, Approved, Rejected, Failed |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the inquiry list view and filters. The inquiry detail view is defined in **(Agency) views detailed inquiry record**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-12 | (Agency) views detailed inquiry record

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Batch Inquiry |
| **Sprint** | Sprint 1 |

### User Story Statement

- **As a…** an approved agency
- **I want to…** open a single inquiry and review the full traveler, travel, and processing details
- **So that…** I can track progress accurately and download approval documents when they are generated

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Inquiry summary cards | the detail screen opens | the page renders | summary cards show inquiry reference, submission date, traveler name, and current status. |
| AC2 | Traveler and travel details | traveler details are shown | the detail sections are rendered | the following fields are displayed:<br>- **Traveler:** first name (EN), last name (EN), first name (AR), last name (AR), date of birth, gender, nationality.<br>- **Passport:** passport number, passport expiry, passport image.<br>- **Travel:** departure country, arrival airport, travel date, purpose of travel, flight number, ticket image.<br>- **Batch:** linked batch reference. |
| AC3 | Processing timeline stages | the processing timeline is shown | timeline data is rendered | stages are displayed in order as Submitted, Under Processing, and the final decision stage.<br>When a final decision exists, it is shown as Approved, Rejected, or Failed. |
| AC4 | Approved document download | the inquiry is approved | the agency views the detail screen | a download action is available for the approval PDF. |

### Scope Boundaries

> This story covers the single inquiry detail view. Navigation comes from **(Agency) monitors full inquiry list** or **(Agency) views batch details and statuses**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## Epic: Session Management

---

## US-21 | (Agency) logs out of portal

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Session Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an approved agency that finished working in the portal
- **I want to…** sign out with one clear action
- **So that…** nobody else can use the open session

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Logout ends session | the agency is signed in | Logout is selected | the session ends, the sign-in page opens, and the system displays: ***تم تسجيل الخروج بنجاح. (You have signed out successfully.)*** |
| AC2 | Browser back does not reopen portal | the agency just signed out | the browser Back action is used | the previous signed-in page does not reopen. |
| AC3 | Portal requires sign-in again | the agency just signed out | the portal URL is opened again in the same browser | the sign-in page is shown. |
| AC4 | Logged-out requests show no protected data | the agency just signed out | the agency tries to open a portal page using a saved URL | no protected data is shown.<br>The agency is redirected to the login page. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

# Back-office User Stories

## Back-office Story List

- US-13 — Admin logs into back-office portal
- US-14A — Admin views platform KPI summary cards
- US-14B — Admin uses dashboard quick action navigation
- US-14C — Admin views inquiry analytics charts
- US-15 — Admin adds nationality with fee
- US-16 — Admin views pricing list and details
- US-17 — Admin views agency list
- US-17A — Admin reviews agency registration details
- US-17B — Admin approves or rejects agency registration
- US-17C — Admin sets agency-specific inquiry fee
- US-18 — Admin credits agency wallet balance
- US-19 — Admin monitors and filters inquiries
- US-20 — Admin views detailed inquiry record
- US-22 — Admin logs out of back-office portal

## Epic: Authentication & Access

---

## US-13 | (Admin) logs into back-office portal

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Authentication & Access |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin who manages the Security Clearance & Inquiry System
- **I want to…** log in to the back-office using my registered credentials
- **So that…** I can access the admin control panel and perform my duties securely

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Successful login and redirect | the Admin opens the back-office login page | they enter a valid email and correct password and submit | the system authenticates the account and redirects to the admin dashboard. |
| AC2 | Invalid credentials error | invalid credentials are entered | the user submits the form | the system displays the neutral login error message from the Form Field Validation table below and does not reveal whether the email is registered. |
| AC3 | Empty fields block submission | the email or password field is blank | the Admin submits the form | submission is blocked and the empty field shows its inline error from the Form Field Validation table below. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Valid email format. Must be registered as an admin account | ***البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى. (Incorrect email or password. Please try again.)*** |
| **Password** | Password | Yes | Non-empty | ***البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى. (Incorrect email or password. Please try again.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. This is the foundation story for admin access.

---

## US-14A | (Admin) dashboard views platform KPI summary cards

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Authentication & Access |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an authenticated Admin
- **I want to…** see four platform-wide summary numbers at the top of the dashboard
- **So that…** I can assess overall platform health the moment I log in

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | KPI cards render | the Admin logs in | the dashboard loads | four summary cards are shown: Total Inquiries, Active Agencies, Agencies Under Review, and Total Agency Wallet Balances in USD. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-14B | (Admin) dashboard uses dashboard quick action navigation

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Authentication & Access |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an authenticated Admin
- **I want to…** see three navigation cards on the dashboard for my main back-office areas
- **So that…** I can reach any core module in one click

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Three action cards visible | the dashboard loads | the quick actions section renders | three cards are shown: Inquiry Management, Agency Management, and Nationality & Pricing Management. Each has a label, a short description, and a navigation action. |
| AC2 | Each card navigates correctly | the Admin selects any action card | the action is triggered | the correct management screen opens for that card. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. Navigation only — no data dependency.

---

## US-14C | (Admin) dashboard views inquiry analytics charts

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Authentication & Access |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an authenticated Admin
- **I want to…** see a nationality breakdown and a 7-day inquiry trend on the dashboard
- **So that…** I can spot system-wide patterns without running a full report

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Nationality pie chart | the dashboard loads | the analytics section renders | a pie chart titled الطلبات حسب الجنسية shows the percentage breakdown of all inquiries by nationality for the current month. |
| AC2 | Trend line chart | the dashboard loads | the analytics section renders | a line chart titled اتجاه الطلبات — آخر 7 أيام shows the total daily inquiry count across all agencies for the last 7 days. |
| AC3 | No inquiry data for charts | no inquiries have been submitted across any agency | the analytics section renders | charts show an empty state with a message that data will appear after inquiries are submitted. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## Epic: Nationality & Fee Configuration

---

## US-15 | (Admin) adds nationality with fee

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Nationality & Fee Configuration |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin responsible for nationality and fee policy
- **I want to…** add a new nationality by selecting it from a searchable list and setting its inquiry fee at the same time
- **So that…** every nationality has a valid fee from the moment it is created

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Add nationality with mandatory fee | the Admin opens the add form | the form is shown | the Admin selects the nationality from a searchable list and enters the inquiry fee amount.<br>The fee is mandatory and becomes active immediately when the nationality is saved. |
| AC2 | Fee required on save | the Admin selects a nationality but leaves the fee empty | they try to save | the save is blocked and the fee field shows the inline error from the Form Field Validation table below. |
| AC3 | Edit existing nationality fee | the Admin opens an existing nationality for editing | the edit form loads with the current fee | the Admin can update the fee amount and save.<br>The previous fee is kept in the fee history section below the fee field, showing the old amount and its effective date.<br>The new fee applies immediately to new inquiry submissions. |
| AC4 | Duplicate nationality prevention | the Admin tries to add a nationality that already exists | they try to save | the save is blocked and the nationality field shows the inline error from the Form Field Validation table below. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Nationality Name** | Searchable Dropdown | Yes | Must select from the predefined nationality list. Must not duplicate an existing configured nationality | ***يرجى اختيار الجنسية. (Please select a nationality.)*** / ***هذه الجنسية مضافة بالفعل. يرجى تعديلها من القائمة. (This nationality already exists. Please edit it from the list.)*** |
| **Individual Inquiry Fee (USD)** | Number | Yes | Positive number greater than zero. Max 2 decimal places | ***يجب إدخال رسوم الاستعلام عند إضافة جنسية. (Inquiry fee is required when adding a nationality.)*** / ***يرجى إدخال قيمة رسوم صحيحة أكبر من صفر. (Please enter a valid fee amount greater than zero.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. Fees become active immediately when saved.

### Scope Boundaries

> This story covers adding a new nationality and editing the fee of an existing nationality. Viewing the full nationality pricing list is defined in **(Admin) views pricing list and details**.

---

## US-16 | (Admin) views pricing list and details

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Nationality & Fee Configuration |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin overseeing nationality pricing
- **I want to…** view default nationality fees and agency-specific fee overrides with their history
- **So that…** I can review the current setup quickly and track fee changes over time

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Nationality list loads | the Admin opens the nationality management screen | the screen loads | the system displays:<br>- **Configured Nationalities** card: total count.<br>- **Highest Inquiry Fee** card: amount and nationality name.<br>- **Lowest Inquiry Fee** card: amount and nationality name.<br>- **Last Fee Updated** card: date and nationality name.<br>- A table with columns defined in the Grid Specification below. |
| AC2 | Search by name | the Admin types a keyword in the search field | the results update | the table filters to show only nationalities that match the search text. |
| AC3 | Paginated results | more nationalities exist than the page size allows | the Admin navigates between pages | the table paginates with page numbers and previous and next controls. |
| AC4 | No nationalities configured | no nationalities have been added to the system | the Admin opens the nationality management screen | the table shows a message that no nationalities have been configured yet and the summary cards show zero values. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Nationality Name | Yes | Yes | Text search |
| Individual Inquiry Fee (USD) | Yes | No | — |
| Last Fee Update | Yes | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.


### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

### Scope Boundaries

> This story covers viewing the nationality pricing list and searching. Adding or editing default nationality fees is defined in **(Admin) adds nationality with fee**. Setting agency-specific fee overrides is defined in **(Admin) sets agency-specific inquiry fee**.

---

## Epic: Agency Management

---

## US-17 | (Admin) views agency list

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin managing travel agency accounts
- **I want to…** view all registered agencies in a searchable list
- **So that…** I can find any agency quickly and take the right action from one place

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | List loads with KPI cards | the Admin opens the agency management screen | the screen loads | four summary cards are shown: Total Registered Agencies, Active Agencies, Agencies Under Review, and Total Wallet Balances. |
| AC2 | Table row content | the list is loaded | rows are rendered | each row shows agency name, agency code, wallet balance, registration date, last activity, status, and an action column. |
| AC3 | Search by name or code | the Admin types in the search field | results update | the table filters to show only agencies matching the search text. |
| AC4 | Pending row shows Approve and Reject actions | a row has Pending status | the row is displayed | Approve and Reject action buttons appear in the action column alongside the View action. |
| AC5 | Active row shows View action only | a row has Active status | the row is displayed | only the View action is shown in the action column. |
| AC6 | Pagination controls | there are more agencies than the page size | the Admin navigates pages | pagination controls are shown with page numbers and previous and next buttons. |
| AC7 | Rejected row shows View action only | a row has Rejected status | the row is displayed | only the View action is shown in the action column. |


### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Agency Name | Yes | Yes | Text search |
| Agency Code | No | No | — |
| Wallet Balance | Yes | No | — |
| Registration Date | Yes | Yes | Date range |
| Last Activity | Yes | No | — |
| Status | No | Yes | Dropdown: Active, Pending, Rejected |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the agency list view and search. Clicking View on a row opens the agency detail screen defined in **(Admin) reviews agency registration details**. Clicking Approve or Reject triggers the confirmation modal defined in **(Admin) approves or rejects agency registration**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

## US-17A | (Admin) reviews agency registration details

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin reviewing a submitted agency registration
- **I want to…** open an agency record and view all submitted business details and uploaded documents
- **So that…** I can assess the registration before making a decision

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Detail screen shows agency information | the Admin opens an agency record from the list | the detail screen loads | the screen shows the agency name, commercial registration number, contact person name, email, mobile number, registration date, and current status. |
| AC2 | Uploaded documents are accessible | the detail screen loads | the documents section is shown | a view action is available for each uploaded document. |
| AC3 | Approve and Reject visible for pending agency | the agency status is Pending | the detail screen loads | Approve and Reject action buttons are visible on the screen. |
| AC4 | No decision actions for non-pending agency | the agency status is Active or Rejected | the detail screen loads | no Approve or Reject buttons are shown. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) views agency list** for navigation.

### Scope Boundaries

> This story covers the agency detail view layout and document access. Clicking Approve or Reject opens the confirmation modal defined in **(Admin) approves or rejects agency registration**. The fee override section on this screen is defined in **(Admin) sets agency-specific inquiry fee**. Navigation to this screen comes from **(Admin) views agency list**.

---

## US-17B | (Admin) approves or rejects agency registration

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin who has reviewed a pending agency registration
- **I want to…** approve or reject the registration from the agency list or the agency detail screen
- **So that…** only verified agencies gain access and rejected applicants receive a clear decision

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Approve opens a confirmation modal | the Admin selects Approve from the list or the detail screen | the modal opens | the modal asks the Admin to confirm the approval before the action is submitted. |
| AC2 | Approval activates the account | the Admin confirms the approval | the action completes | the agency status changes to Active.<br>An approval email is sent using template `EMAIL-REG-APPROVED`.<br>The modal closes and the list refreshes with the updated status.<br>The agency can log in immediately. |
| AC3 | Reject opens a confirmation modal | the Admin selects Reject from the list or the detail screen | a modal opens | the modal asks the Admin to confirm the rejection before the action is submitted. |
| AC4 | Rejection updates the agency status | the Admin confirms the rejection | the action completes | the agency status changes to Rejected.<br>The modal closes and the list refreshes with the updated status. |
| AC5 | Rejected agency cannot sign in | the agency status is Rejected | the agency tries to sign in | login is blocked. |
| AC6 | No notification email on rejection | the Admin confirms a rejection | the action completes | no notification email is sent to the agency. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) views agency list** or **(Admin) reviews agency registration details** for the navigation entry point. Rejection moved from Release 1 US-38.

### Scope Boundaries

> This story covers the approval and rejection confirmation modals and their outcomes. The agency list where the actions originate is defined in **(Admin) views agency list**. The agency detail screen is defined in **(Admin) reviews agency registration details**.

---

## US-17C | (Admin) sets agency-specific inquiry fee *(✔ New Story — CH-6)*

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | MVP |
| **Epic** | Agency Management |
| **Change Request** | ✔ New Story — CH-6 |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin managing agency pricing agreements
- **I want to…** set a custom inquiry fee per nationality for a specific agency, or clear it to use the default fee
- **So that…** agencies with negotiated rates are billed correctly on every inquiry

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Fee override table loads | the Admin opens an active agency's detail page | the fee override section is rendered | a table shows all configured nationalities with the columns defined in the Grid Specification below. |
| AC2 | Set a custom fee | the Admin selects Edit on a nationality row | they enter a valid custom fee and save | the custom fee is saved and takes effect immediately for new inquiries from this agency.<br>The Fee Type column changes from **Default** to **Custom**.<br>A success confirmation is shown. |
| AC3 | Custom fee takes priority in billing | the agency has a Custom fee set for a nationality | the agency submits a new inquiry for that nationality | the wallet deduction matches the custom fee amount, not the default fee amount. |
| AC4 | Clear custom fee reverts to default | the Admin selects Edit on a row showing **Custom** fee type | they clear the custom fee amount and save | the custom fee is removed.<br>The Fee Type changes back to **Default**.<br>The default fee applies to new inquiries from this agency for that nationality. |
| AC5 | Fee section hidden for non-active agency | the agency status is Pending or Rejected | the Admin opens the agency detail page | the fee override section is not shown. |
| AC6 | No nationalities configured | no nationalities have been added to the system | the fee override section renders | the section shows a message that no nationalities have been configured yet. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Custom Fee (USD)** | Number | Conditional — required when a value is entered | Positive number greater than zero. Max 2 decimal places. Leave empty to revert to the default fee. | ***يرجى إدخال قيمة رسوم صحيحة أكبر من صفر، أو اتركها فارغة للرجوع إلى السعر الافتراضي. (Please enter a valid fee amount greater than zero, or leave it empty to revert to the default fee.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Nationality | No | No | — |
| Default Fee (USD) | No | No | — |
| Agency Fee (USD) | No | No | — |
| Fee Type | No | No | — |
| Last Updated | No | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the fee override section on the agency detail page. Viewing and editing default nationality fees is defined in **(Admin) adds nationality with fee**. The agency detail page layout is defined in **(Admin) reviews agency registration details**. Navigation to the agency detail page comes from **(Admin) views agency list**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) reviews agency registration details** for the agency detail page. Nationalities must be configured via **(Admin) adds nationality with fee** before this section shows any rows.

---

## US-18 | (Admin) credits agency wallet balance

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Agency Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin managing platform financial operations
- **I want to…** credit a specific agency wallet by entering an amount and optional payment details, then confirming the transaction
- **So that…** the agency has enough wallet balance to submit inquiries

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Wallet section with credit action | the Admin opens an active agency account page | the page loads | a wallet section displays the current balance, the date of the last credit, and a credit action. |
| AC2 | Credit wallet modal form | the Admin opens the credit action | the modal is shown | the modal includes Amount, Payment Method, optional Payment Proof, optional Reference or Note, and a confirm action. |
| AC3 | Balance updated on successful credit | the Admin enters a valid credit amount and confirms | the credit transaction succeeds | the following occurs:<br>- The modal closes.<br>- A success confirmation is shown.<br>- The agency wallet balance is updated immediately.<br>- The new balance is visible on the account page.<br>- A new credit transaction appears in the agency wallet history. |
| AC4 | Credit blocked for non-active agency | the agency status is Pending or Rejected | the Admin opens the agency account page | the credit wallet action is not available. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Credit Amount** | Number | Yes | Positive number greater than zero. Max 2 decimal places | ***يرجى إدخال قيمة إيداع صحيحة أكبر من صفر. (Please enter a valid credit amount greater than zero.)*** |
| **Payment Method** | Select | Yes | Options: Cheque, Bank Transfer, Cash | ***يرجى اختيار طريقة الدفع. (Please select a payment method.)*** |
| **Payment Proof** | File | No | PDF, JPG, or PNG. Max 5 MB | ***صيغة الملف غير مدعومة أو حجمه يتجاوز 5 ميجابايت. (Unsupported file format or size exceeds 5 MB.)*** |
| **Reference / Note** | Text | No | Max 200 characters | ***يجب ألا يتجاوز المرجع 200 حرف. (Reference must not exceed 200 characters.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. Agency dashboard and wallet views in **(Agency) dashboard views account and wallet summary** and **(Agency) views wallet balance and transactions** should reflect the updated balance.

### Scope Boundaries

> This story covers the credit wallet action from the agency account page. The agency account page layout is defined in **(Admin) reviews agency registration details**. The agency-side wallet view is defined in **(Agency) views wallet balance and transactions** and **(Agency) views balance coverage by nationality**.

---

## Epic: Inquiry Monitoring & Operations

---

## US-19 | (Admin) monitors and filters inquiries

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Inquiry Monitoring & Operations |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin responsible for monitoring inquiry progress across the system
- **I want to…** view a consolidated list of all inquiries and filter or search them by status, date, and agency
- **So that…** I can quickly locate relevant inquiries and monitor workload

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Inquiry list display | the Admin opens the inquiry monitoring screen | the screen loads | inquiries are listed by submission date descending. For column details see the Grid Specification below. |
| AC2 | Filter and search | the Admin uses the toolbar filters or search field | a filter or search term is applied | the list updates to show only matching inquiries. Available filters include status, date range, agency, and free-text search by request number or traveler name. |
| AC3 | Paginated results | the inquiry list exceeds the page size | the Admin views the list | the list is paginated and the Admin can move between pages. |
| AC4 | No inquiries exist | no inquiries have been submitted in the system | the inquiry monitoring screen loads | the table shows a message that no inquiries are available yet. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Request Number | No | Yes | Text search |
| Traveler Name | Yes | Yes | Text search |
| Nationality | No | Yes | Dropdown: configured nationalities |
| Submission Date/Time | Yes | Yes | Date range |
| Status | No | Yes | Dropdown: Submitted, Under Processing, Approved, Rejected, Failed |
| Agency | No | Yes | Dropdown: registered agencies |
| Actions | No | No | — |

**Pagination:** Yes — 10 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

> This story covers the inquiry list view and filtering. Opening an inquiry row leads to the detail screen defined in **(Admin) views detailed inquiry record**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met. This story matches the admin inquiry monitoring controls and column model.

---

## US-20 | (Admin) views detailed inquiry record

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Inquiry Monitoring & Operations |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin who needs to investigate a specific inquiry from the monitoring list
- **I want to…** open a specific inquiry and view its full details, payment record, and processing timeline
- **So that…** I can investigate any inquiry end to end without switching between systems

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Full inquiry detail view | the Admin opens an inquiry from the monitoring list | the detail screen opens | the screen displays:<br>- **Traveler:** first name (EN), last name (EN), first name (AR), last name (AR), date of birth, gender, nationality.<br>- **Passport:** passport number, passport expiry, passport image.<br>- **Travel:** departure country, arrival airport, travel date, purpose of travel, flight number, ticket image.<br>- **Payment:** payment reference, payment amount.<br>- **Batch:** linked batch reference.<br>- Processing timeline section. |
| AC2 | Processing timeline with timestamps | the detail screen loads | the processing timeline is shown | stages are displayed in order as Submitted, Under Processing, and the final decision stage.<br>Each completed stage displays its timestamp, and the current active stage is highlighted. |
| AC3 | Rejected inquiry display | the inquiry is rejected | the Admin views the detail screen | the inquiry is shown with `Rejected` status and the decision timestamp. |
| AC4 | Rejection reason not shown | the inquiry is rejected | the Admin views the detail screen | no rejection reason or detail text is displayed. |
| AC5 | Failed inquiry display | the inquiry is failed | the Admin views the detail screen | the inquiry is shown with `Failed` status and any available failure reference. |
| AC6 | In-progress timeline display | the inquiry is still in Submitted or Under Processing state | the Admin views the processing timeline | completed stages show their timestamps and the current active stage is highlighted.<br>No final decision stage is shown. |

### Scope Boundaries

> This story covers the inquiry detail view. The inquiry list and filters are defined in **(Admin) monitors and filters inquiries**. The agency-side inquiry detail view is defined in **(Agency) views detailed inquiry record**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ This story depends on **(Admin) monitors and filters inquiries** for navigation.

---

## Epic: Session Management

---

## US-22 | (Admin) logs out of back-office portal

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | MVP |
| **Epic** | Session Management |
| **Sprint** | Sprint 2 |

### User Story Statement

- **As a…** an Admin that finished working in the back-office
- **I want to…** sign out with one clear action
- **So that…** nobody else can use the open session

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Logout ends session | the Admin is signed in | Logout is selected | the session ends, the sign-in page opens, and the system displays: ***تم تسجيل الخروج بنجاح. (You have signed out successfully.)*** |
| AC2 | Browser back does not reopen back-office | the Admin just signed out | the browser Back action is used | the previous signed-in page does not reopen. |
| AC3 | Back-office requires sign-in again | the Admin just signed out | the back-office URL is opened again in the same browser | the sign-in page is shown. |
| AC4 | Logged-out requests show no protected data | the Admin just signed out | the Admin tries to open a back-office page using a saved URL | no protected data is shown.<br>The Admin is redirected to the login page. |


### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria are met.

---

# MVP Email Notification Templates

## Email Events

| Step | Trigger Event | Email Template ID | Recipient |
|---|---|---|---|
| 1 | Agency registration submitted in **(Agency) registers and submits for approval** | `EMAIL-REG-SUBMITTED` | Agency |
| 2 | Agency registration approved in **(Admin) approves or rejects agency registration** | `EMAIL-REG-APPROVED` | Agency |

## Email Templates

### Template: `EMAIL-REG-SUBMITTED`

- **Subject (EN):** Agency Registration Received — Pending Review
- **Subject (AR):** تم استلام تسجيل الوكالة — قيد المراجعة

- **Body (EN):**
  
  Dear [Contact_Name],
  
  Your agency registration has been submitted successfully and is now pending Admin review.
  
  Reference: [Registration_Reference]  
  Submission Date: [Submission_DateTime]
  
  We will notify you by email once your account is approved.
  
  Security Clearance & Inquiry System

- **Body (AR):**
  
  عزيزي/عزيزتي [Contact_Name]،
  
  تم استلام طلب تسجيل الوكالة بنجاح وهو الآن قيد مراجعة الإدارة.
  
  الرقم المرجعي: [Registration_Reference]  
  تاريخ التقديم: [Submission_DateTime]
  
  سيتم إشعاركم عبر البريد الإلكتروني عند اعتماد الحساب.
  
  نظام الموافقات الأمنية والاستعلامات

### Template: `EMAIL-REG-APPROVED`

- **Subject (EN):** Agency Registration Approved — Account Activated
- **Subject (AR):** تمت الموافقة على تسجيل الوكالة — تم تفعيل الحساب

- **Body (EN):**
  
  Dear [Contact_Name],
  
  Your agency registration has been approved. Your account is now active.
  
  Login URL: [Portal_Login_URL]  
  Registered Email: [Registered_Email]  
  Agency ID: [Agency_ID]
  
  You can now sign in and submit batch inquiries.
  
  Security Clearance & Inquiry System

- **Body (AR):**
  
  عزيزي/عزيزتي [Contact_Name]،
  
  تمت الموافقة على تسجيل الوكالة وتم تفعيل الحساب.
  
  رابط تسجيل الدخول: [Portal_Login_URL]  
  البريد الإلكتروني المسجل: [Registered_Email]  
  رقم الوكالة: [Agency_ID]
  
  يمكنكم الآن تسجيل الدخول وإرسال الاستعلامات الدفعية.
  
  نظام الموافقات الأمنية والاستعلامات