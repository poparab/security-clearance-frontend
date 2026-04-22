# Security Clearance & Inquiry System
## MVP Test Cases

*Scope: All 20 MVP User Stories — 12 Agency (Portal) + 8 Admin (Back-office)*
*Test approach: Functional, form validation, negative, boundary, and end-to-end*

---

## Test Conventions

| Convention | Description |
|---|---|
| **TC ID format** | `TC-{StoryID}-{##}` — e.g. `TC-US22-01` |
| **Priority** | P1 = Must pass for release, P2 = High importance, P3 = Edge case |
| **Type** | Positive / Negative / Boundary / Validation / E2E |
| **Precondition** | State that must exist before execution |
| **Status columns** | Pass / Fail / Blocked — filled during execution |

---

# SECTION 1 — PORTAL TEST CASES

---

## US-22 | Agency Registration

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US22-01 | P1 | Positive | Successful agency registration | Portal registration page is open | 1. Fill all required fields with valid data<br>2. Upload a valid PDF document (≤ 5 MB)<br>3. Check Terms & Conditions<br>4. Click Submit | Account created in pending state. Confirmation screen shows agency name, commercial reg number, email, status 'قيد المراجعة', and the pending review message. Email `EMAIL-REG-SUBMITTED` is sent within 5 minutes. |
| TC-US22-02 | P1 | Negative | Submit with all fields empty | Registration page is open | 1. Click Submit without filling any field | Submission is blocked. Each required field shows its specific inline error message. No valid field is cleared. |
| TC-US22-03 | P1 | Negative | Duplicate email rejection | An agency with email `test@agency.com` already exists | 1. Fill all fields with valid data using `test@agency.com`<br>2. Click Submit | Submission blocked. Message: ***يوجد حساب مرتبط بهذا البريد الإلكتروني بالفعل. (An account with this email already exists.)*** |
| TC-US22-04 | P1 | Positive | Pending status confirmation screen content | Registration successfully submitted | 1. Observe the confirmation page | Screen shows: agency name, commercial registration number, email, status 'قيد المراجعة', and message: ***تم استلام طلب التسجيل وهو قيد المراجعة. سيتم إشعاركم عبر البريد الإلكتروني عند صدور القرار.*** |
| TC-US22-05 | P1 | Positive | Registration email sent | Registration successfully submitted | 1. Check the registered email inbox | Email received using template `EMAIL-REG-SUBMITTED` with subject, contact name, registration reference, and submission date. |

### Form Validation Tests

| TC ID | Priority | Type | Field Under Test | Input | Expected Result |
|---|---|---|---|---|---|
| TC-US22-V01 | P1 | Validation | Agency Name | Empty | ***اسم الوكالة مطلوب (3 أحرف على الأقل). (Agency name is required.)*** |
| TC-US22-V02 | P2 | Boundary | Agency Name | 2 characters ("AB") | Same error — min 3 characters required |
| TC-US22-V03 | P2 | Boundary | Agency Name | 3 characters ("ABC") | Accepted — no error |
| TC-US22-V04 | P1 | Validation | Commercial Reg. Number | Empty | ***يرجى إدخال رقم سجل تجاري صحيح. (Please enter a valid commercial registration number.)*** |
| TC-US22-V05 | P2 | Boundary | Commercial Reg. Number | 2 characters | Error — min 3 chars required |
| TC-US22-V06 | P2 | Positive | Commercial Reg. Number | "123-45/AB" (alphanumeric with `-` and `/`) | Accepted |
| TC-US22-V07 | P1 | Validation | Contact Person Name | Empty | ***اسم المسؤول مطلوب (حرفان على الأقل). (Contact person name is required.)*** |
| TC-US22-V08 | P2 | Boundary | Contact Person Name | 1 character | Error — min 2 characters |
| TC-US22-V09 | P1 | Validation | Email Address | "not-an-email" | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| TC-US22-V10 | P1 | Validation | Email Address | Empty | Same email error message |
| TC-US22-V11 | P1 | Validation | Password | Empty | ***كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص.*** |
| TC-US22-V12 | P2 | Boundary | Password | "Abcdef1" (7 chars) | Error — min 8 characters |
| TC-US22-V13 | P2 | Negative | Password | "abcdefgh1!" (no uppercase) | Error — must include uppercase |
| TC-US22-V14 | P2 | Negative | Password | "ABCDEFGH1!" (no lowercase) | Error — must include lowercase |
| TC-US22-V15 | P2 | Negative | Password | "Abcdefgh!" (no digit) | Error — must include digit |
| TC-US22-V16 | P2 | Negative | Password | "Abcdefg1" (no special char) | Error — must include special character |
| TC-US22-V17 | P2 | Boundary | Password | "Abcdef1!" (exactly 8 chars, all rules met) | Accepted |
| TC-US22-V18 | P1 | Validation | Confirm Password | Different from Password field | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |
| TC-US22-V19 | P1 | Positive | Confirm Password | Matches Password exactly | Accepted |
| TC-US22-V20 | P1 | Validation | Country Code | No selection | ***يرجى اختيار رمز الدولة. (Please select a country code.)*** |
| TC-US22-V21 | P1 | Validation | Mobile Number | "12345" (fewer than 8 digits) | ***يرجى إدخال رقم جوال صحيح. (Please enter a valid mobile number.)*** |
| TC-US22-V22 | P2 | Boundary | Mobile Number | 8 digits | Accepted |
| TC-US22-V23 | P2 | Boundary | Mobile Number | 15 digits | Accepted |
| TC-US22-V24 | P2 | Boundary | Mobile Number | 16 digits | Error — max 15 digits |
| TC-US22-V25 | P1 | Validation | Agency Document Upload | Upload a .docx file | ***نوع الملف غير مدعوم أو الحجم يتجاوز الحد. (Unsupported file type or file size too large.)*** |
| TC-US22-V26 | P2 | Boundary | Agency Document Upload | Upload a PDF > 5 MB | Same file error message |
| TC-US22-V27 | P2 | Positive | Agency Document Upload | Upload a PDF ≤ 5 MB | Accepted |
| TC-US22-V28 | P1 | Validation | Terms & Conditions | Unchecked | ***يجب الموافقة على الشروط والأحكام. (You must accept the terms and conditions.)*** |

---

## US-26 | Agency Login

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US26-01 | P1 | Positive | Successful login | Approved agency account exists | 1. Enter valid email and correct password<br>2. Click Login | System authenticates and redirects to agency dashboard. |
| TC-US26-02 | P1 | Negative | Invalid credentials | Agency account exists | 1. Enter valid email + wrong password<br>2. Click Login | Message: ***بيانات الدخول غير صحيحة. (Incorrect email or password.)*** — does not reveal which field is wrong. |
| TC-US26-03 | P1 | Negative | Unregistered email login | No account with this email | 1. Enter unregistered email + any password<br>2. Click Login | Same generic credentials error — no email enumeration. |
| TC-US26-04 | P1 | Negative | Pending account login blocked | Agency account status = Under Review | 1. Enter correct credentials<br>2. Click Login | Login blocked. Message: ***الحساب قيد المراجعة. (Your account is pending approval.)*** |
| TC-US26-05 | P2 | Positive | Remember Me persists session | Approved account | 1. Check "Remember Me"<br>2. Login<br>3. Close browser and reopen portal | Session is retained — user is not prompted to log in again. |
| TC-US26-06 | P2 | Negative | Empty email submission | Login page is open | 1. Leave email empty, enter password<br>2. Click Login | Inline error: ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| TC-US26-07 | P2 | Negative | Empty password submission | Login page is open | 1. Enter email, leave password empty<br>2. Click Login | Generic credentials error displayed. |
| TC-US26-08 | P3 | Negative | SQL injection in email field | Login page is open | 1. Enter `' OR 1=1 --` in email field<br>2. Click Login | Login fails with generic error. No data leakage. |

---

## US-26A | Agency Dashboard

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US26A-01 | P1 | Positive | Agency info card display | Agency logged in | 1. Observe dashboard | Agency info card shows: agency name, commercial registration number, status badge (Active), last login timestamp. |
| TC-US26A-02 | P1 | Positive | Wallet balance card is read-only | Agency logged in | 1. Observe wallet card | Wallet card shows current balance with label 'رصيد المحفظة'. No top-up button visible. |
| TC-US26A-03 | P1 | Positive | Monthly KPI tiles display | Agency has submitted inquiries this month | 1. Observe KPI tiles | Four tiles show current-month counts: Submitted (blue), Under Processing (amber), Approved (green), Rejected (red). |
| TC-US26A-04 | P1 | Positive | KPI tiles with zero data | Agency has no inquiries this month | 1. Observe KPI tiles | All four tiles display 0 with correct colors. |
| TC-US26A-05 | P1 | Positive | Recent activity table | Agency has submitted batches | 1. Observe Recent Activity table | Table shows last 5 batch records with: reference, submission date, traveler count, status badge, 'عرض التفاصيل' link. |
| TC-US26A-06 | P2 | Positive | Recent activity with no data | Agency is new with no submissions | 1. Observe Recent Activity table | Table shows empty state or "no recent activity" message. |
| TC-US26A-07 | P1 | Positive | Quick action cards | Agency logged in | 1. Observe quick actions | Two cards visible: 'رفع حزمة طلبات' and 'إدارة المحفظة' — each with CTA button. |
| TC-US26A-08 | P1 | Positive | Quick action card navigation | Agency logged in | 1. Click 'رفع حزمة طلبات' card<br>2. Click 'إدارة المحفظة' card | First navigates to batch wizard. Second navigates to wallet page. |
| TC-US26A-09 | P1 | Positive | Performance metrics display | Agency has inquiry history | 1. Observe performance section | Approval rate, total inquiries, and wallet data visible. |
| TC-US26A-10 | P1 | Positive | Nationality pie chart | Agency has submitted inquiries for multiple nationalities | 1. Observe charts section | Pie chart titled 'الطلبات حسب الجنسية' shows percentage breakdown with legend. |
| TC-US26A-11 | P1 | Positive | 7-day trend line chart | Agency has inquiry activity in last 7 days | 1. Observe charts section | Line chart titled 'اتجاه الطلبات — آخر 7 أيام' shows daily inquiry count for 7 days. |

---

## US-W-01 | Agency Wallet Balance & Transactions

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-USW01-01 | P1 | Positive | Wallet summary cards display | Agency has credits and debits | 1. Open wallet page | Three cards shown: Current Balance (USD), Total Deposits, Total Deductions. |
| TC-USW01-02 | P1 | Positive | Monthly transaction statistics | Agency has transactions this month | 1. Observe monthly stats row | Shows: transactions this month, deposits count, deductions count, last transaction date. |
| TC-USW01-03 | P1 | Positive | Transaction history table content | Agency has transaction history | 1. Scroll to transaction history | Each row shows: date, type (Credit/Debit), description, amount (USD), balance after, reference number. |
| TC-USW01-04 | P1 | Positive | Admin-managed funding notice | Wallet page loaded | 1. Observe funding notice | Notice states top-up is Admin-only, includes hotline contact number. |
| TC-USW01-05 | P1 | Positive | Credit/debit visual distinction | Agency has both credit and debit transactions | 1. Observe transaction rows | Credits and debits are visually distinct (e.g., green/red or +/- indicators). |
| TC-USW01-06 | P1 | Positive | Balance coverage table | Nationalities configured with fees | 1. Observe coverage section | Table shows each nationality, its fee per inquiry (USD), and number of inquiries the current balance can cover. |
| TC-USW01-07 | P2 | Boundary | Coverage calculation accuracy | Balance = $100, Nationality A fee = $25 | 1. Check coverage for Nationality A | Coverage shows 4 inquiries. |
| TC-USW01-08 | P2 | Boundary | Zero balance coverage | Balance = $0 | 1. Check coverage table | All nationalities show 0 inquiries coverable. |
| TC-USW01-09 | P2 | Positive | Empty transaction history | New agency with no transactions | 1. Open wallet page | Transaction table shows empty state. Summary cards show $0 for all values. |

---

## US-34 | Agency Builds Batch Inquiry via Web Form

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US34-01 | P1 | Positive | Batch naming step loads | Agency logged in | 1. Navigate to 'Submit Batch Inquiry' | Wizard loads on Step 1 with batch naming fields, guidance section. Next button disabled until batch name is entered. |
| TC-US34-02 | P1 | Positive | Proceed from Step 1 | Step 1 is displayed | 1. Enter valid batch name<br>2. Click Next | Wizard advances to Step 2 (Travelers). |
| TC-US34-03 | P1 | Negative | Blank batch name blocks proceed | Step 1 displayed, batch name empty | 1. Click Next | Error: ***اسم الدفعة مطلوب. (Batch name is required.)*** Next button remains disabled. |
| TC-US34-04 | P1 | Positive | Add Traveler form appears | On Step 2 | 1. Click 'Add Traveler' | Traveler entry form appears with all fields per Form Validation table. |
| TC-US34-05 | P1 | Positive | Save & Add Another | Valid traveler form filled | 1. Click 'Save & Add Another' | Traveler saved. Draft auto-updated in background. New empty form appears. Running total bar increments. |
| TC-US34-06 | P1 | Positive | Save only | Valid traveler form filled | 1. Click 'Save' | Traveler saved. Draft auto-updated. Form closes. Traveler card appears in list. |
| TC-US34-07 | P1 | Positive | Cancel adding | Traveler form open with data | 1. Click 'Cancel' | Form discarded. No traveler added. Existing travelers unaffected. |
| TC-US34-08 | P1 | Positive | Auto-draft on each save | Two travelers saved | 1. Save traveler 1<br>2. Save traveler 2 | After each save the draft is updated in the background. Navigating away and returning restores data. |
| TC-US34-09 | P1 | Positive | Proceed to review enabled | 1+ travelers saved, all have passport + ticket images | 1. Observe Next button | 'Next' button is enabled. |
| TC-US34-10 | P1 | Negative | Proceed blocked — missing documents | 1 traveler saved without passport image | 1. Observe Next button | 'Next' disabled. Message indicates which travelers need documents. |
| TC-US34-11 | P2 | Positive | Sticky running total bar | Multiple travelers added | 1. Add 5 travelers using Save & Add Another | Running total bar consistently shows correct count (1, 2, 3, 4, 5). |

### Form Validation Tests

| TC ID | Priority | Type | Field Under Test | Input | Expected Result |
|---|---|---|---|---|---|
| TC-US34-V01 | P1 | Validation | Batch Name | Empty | ***اسم الدفعة مطلوب. (Batch name is required.)*** |
| TC-US34-V02 | P2 | Boundary | Batch Name | 80 characters | Accepted |
| TC-US34-V03 | P2 | Boundary | Batch Name | 81 characters | Rejected — max 80 characters |
| TC-US34-V04 | P1 | Validation | Full Name | Empty | ***الاسم الكامل مطلوب (حرفان على الأقل).*** |
| TC-US34-V05 | P2 | Boundary | Full Name | 1 character | Error — min 2 characters |
| TC-US34-V06 | P2 | Boundary | Full Name | 80 characters | Accepted |
| TC-US34-V07 | P2 | Boundary | Full Name | 81 characters | Rejected — max 80 characters |
| TC-US34-V08 | P1 | Validation | Nationality | No selection | ***يرجى اختيار جنسية المسافر.*** |
| TC-US34-V09 | P1 | Validation | Passport Number | Empty | ***يجب أن يتكون رقم جواز السفر من 6 إلى 20 حرفا أو رقما.*** |
| TC-US34-V10 | P2 | Boundary | Passport Number | 5 characters | Error — min 6 |
| TC-US34-V11 | P2 | Boundary | Passport Number | 6 characters (alphanumeric) | Accepted |
| TC-US34-V12 | P2 | Boundary | Passport Number | 20 characters | Accepted |
| TC-US34-V13 | P2 | Boundary | Passport Number | 21 characters | Rejected — max 20 |
| TC-US34-V14 | P1 | Negative | Passport Number | Duplicate within same batch | ***يوجد مسافر بنفس رقم جواز السفر في هذه الدفعة.*** |
| TC-US34-V15 | P1 | Validation | Passport Expiry | Less than 6 months after Travel Date | ***يجب أن يكون جواز السفر صالحا لمدة 6 أشهر على الأقل بعد تاريخ السفر.*** |
| TC-US34-V16 | P2 | Boundary | Passport Expiry | Exactly 6 months after Travel Date | Accepted |
| TC-US34-V17 | P1 | Validation | Departure Country | No selection | ***يرجى اختيار بلد المغادرة.*** |
| TC-US34-V18 | P1 | Validation | Arrival Airport | No selection | ***يرجى اختيار مطار الوصول في مصر.*** |
| TC-US34-V19 | P1 | Validation | Travel Date | Past date | ***يجب أن يكون تاريخ السفر اليوم أو تاريخا مستقبليا.*** |
| TC-US34-V20 | P2 | Boundary | Travel Date | Today | Accepted |
| TC-US34-V21 | P2 | Boundary | Travel Date | Tomorrow | Accepted |
| TC-US34-V22 | P1 | Validation | Purpose of Travel | No selection | ***يرجى اختيار غرض السفر.*** |
| TC-US34-V23 | P2 | Positive | Flight Number | "EG1234" (valid) | Accepted |
| TC-US34-V24 | P2 | Boundary | Flight Number | 11 characters | Rejected — max 10 |
| TC-US34-V25 | P2 | Positive | Flight Number | Empty (optional field) | Accepted — no error |
| TC-US34-V26 | P1 | Validation | Passport Image | Upload .exe file | ***صيغة الملف غير مدعومة. يرجى استخدام JPG أو PNG أو PDF.*** |
| TC-US34-V27 | P2 | Positive | Passport Image | Upload valid JPG | Accepted |
| TC-US34-V28 | P2 | Positive | Passport Image | Upload valid PNG | Accepted |
| TC-US34-V29 | P2 | Positive | Passport Image | Upload valid PDF | Accepted |
| TC-US34-V30 | P1 | Validation | Ticket Image | Upload .exe file | ***صيغة الملف غير مدعومة. يرجى استخدام JPG أو PNG أو PDF.*** |
| TC-US34-V31 | P2 | Positive | Ticket Image | Upload valid JPG | Accepted |

---

## US-37 | Agency Reviews Batch Before Submission

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US37-01 | P1 | Positive | Batch data summary display | Wizard advanced to Step 3 (Review) with 3 travelers | 1. Observe review step | Shows batch name, notes, total traveler count (3). |
| TC-US37-02 | P1 | Positive | Collapsible traveler list | Review step loaded | 1. Observe traveler list | Collapsible section 'قائمة المسافرون' shows each traveler with: name, nationality, passport number, departure airport, arrival airport, travel date, flight number, purpose of visit. Edit and delete action buttons visible per row. |
| TC-US37-03 | P1 | Positive | Expand and collapse traveler list | Review step loaded | 1. Collapse the list<br>2. Expand the list | List toggles between collapsed and expanded states. |
| TC-US37-04 | P1 | Positive | Irreversibility warning displayed | Review step loaded | 1. Observe warning area | Warning states wallet deduction is automatic, irreversible, and non-refundable. |
| TC-US37-05 | P1 | Positive | Confirm button enabled — sufficient balance | Agency wallet balance covers all travelers | 1. Observe 'تأكيد وإرسال' button | Button is enabled and clickable. |
| TC-US37-06 | P1 | Negative | Confirm blocked — insufficient balance | Agency wallet balance = $0, batch has travelers | 1. Observe review step | Message: ***رصيد المحفظة غير كاف. يرجى التواصل مع مسؤول الجهة لشحن المحفظة.*** Confirm button is disabled. No fee amounts shown. |
| TC-US37-07 | P1 | Positive | Back to edit | Review step displayed | 1. Click 'العودة للتعديل' | Returns to Step 2 (Travelers) without submitting. All traveler data preserved. |
| TC-US37-08 | P2 | Positive | Edit traveler from review | Review step with travelers | 1. Click Edit on a traveler row | Traveler form opens pre-populated for editing. |
| TC-US37-09 | P2 | Positive | Delete traveler from review | Review step with 2+ travelers | 1. Click Delete on a traveler row | Traveler removed from list. Count updates. |
| TC-US37-10 | P2 | Negative | Delete last traveler from review | Review step with 1 traveler | 1. Click Delete on the only traveler | Traveler removed. User should be prevented from confirming with 0 travelers or redirected back to Step 2. |

---

## US-38 | Agency Confirms Batch & Sees Submission Result

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US38-01 | P1 | Positive | Successful batch submission | Review step displayed, sufficient balance, 3 travelers | 1. Click 'تأكيد وإرسال' | Atomic server-side operation: wallet deducted, batch submitted. Draft changes to submitted status. |
| TC-US38-02 | P1 | Positive | Success screen content | Submission succeeded | 1. Observe success screen | Shows: confirmation message, batch reference (format `BTH-YYYYMMDD-NNNN`), number of travelers submitted, total amount deducted, buttons to "View Batch Details" and "Go to Batch List". All travelers move to 'Under Processing' status. |
| TC-US38-03 | P1 | Positive | Success screen — View Batch Details button | Success screen displayed | 1. Click "View Batch Details" | Navigates to batch details page (US-40). |
| TC-US38-04 | P1 | Positive | Success screen — Go to Batch List button | Success screen displayed | 1. Click "Go to Batch List" | Navigates to batch list page (US-BL-01). |
| TC-US38-05 | P1 | Positive | Batch reference format validation | Success screen displayed | 1. Observe batch reference | Format matches `BTH-YYYYMMDD-NNNN` (e.g., BTH-20260409-0001). |
| TC-US38-06 | P1 | Negative | Failure screen on system error | Submission encounters a server error | 1. Observe failure screen | No batch saved. No wallet deduction. Failure screen shows: error message, support reference number, buttons to "Retry" and "Return to Dashboard". |
| TC-US38-07 | P1 | Positive | Failure screen — Retry button | Failure screen displayed | 1. Click "Retry" | Returns to review step with all data preserved. |
| TC-US38-08 | P1 | Positive | Failure screen — Return to Dashboard | Failure screen displayed | 1. Click "Return to Dashboard" | Navigates to agency dashboard. |
| TC-US38-09 | P1 | Positive | Wallet balance correctly deducted | 5 travelers, $25/each, balance was $200 | 1. Submit batch<br>2. Check wallet | Wallet balance = $75. Transaction logged as debit. |
| TC-US38-10 | P2 | Positive | Atomic operation — no partial deduction | Server error mid-processing | 1. Trigger error scenario | No wallet deduction occurs. No batch created. All-or-nothing. |

---

## US-40 | Agency Views Batch Details

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US40-01 | P1 | Positive | Batch detail screen metadata | Submitted batch exists | 1. Open batch from batch list | Shows: batch reference, submission date, destination, wallet used, last updated, total fee deducted, summary stat cards, per-traveler table. |
| TC-US40-02 | P1 | Positive | Per-traveler table columns | Batch detail loaded | 1. Observe traveler table | Each row: reference number, traveler name, nationality, passport number, submission date, inquiry status. |
| TC-US40-03 | P1 | Positive | Approved traveler — PDF download path | A traveler's inquiry is Approved | 1. Click row action | Opens inquiry detail view where approval PDF can be downloaded. |
| TC-US40-04 | P1 | Positive | Rejected traveler status display | A traveler's inquiry is Rejected | 1. Observe row | Status shows 'Rejected'. No rejection reason link (automated decisions carry no reason code). |
| TC-US40-05 | P2 | Positive | Under Processing traveler display | A traveler's inquiry is Under Processing | 1. Observe row | Status badge shows 'Under Processing'. No download action available. |
| TC-US40-06 | P2 | Positive | Summary stat cards correctness | Batch has 2 Approved, 1 Rejected, 2 Under Processing | 1. Observe stat cards | Cards reflect correct counts per status. |

---

## US-40A | Agency Exports Batch Report

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-US40A-01 | P1 | Positive | Export action visible | Batch details page loaded | 1. Observe page toolbar | 'Export Report' action is visible. |
| TC-US40A-02 | P1 | Positive | Export file content | Batch has 3 travelers with mixed statuses | 1. Click 'Export Report' | Downloaded file contains batch metadata (reference, submission date, total travelers, total fee deducted) and per-traveler rows (reference, name, nationality, passport, submission date, status). |
| TC-US40A-03 | P1 | Positive | Export filename convention | Batch ID = "BTH-20260409-0001" | 1. Export report | Filename: `batch-report-BTH-20260409-0001-20260409.xlsx` |
| TC-US40A-04 | P2 | Positive | Export with single traveler | Batch has 1 traveler | 1. Export report | File generated with 1 traveler row + batch metadata. |

---

## US-BL-01 | Agency Views Batch List & Drafts

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-USBL01-01 | P1 | Positive | Batch KPI summary cards | Agency has submitted batches | 1. Open batch list page | Three KPI cards: All Batches, Completed, Under Processing — with correct counts. |
| TC-USBL01-02 | P1 | Positive | Drafts excluded from KPI counts | Agency has 2 submitted + 1 draft batch | 1. Observe KPI cards | All Batches = 2 (drafts excluded). |
| TC-USBL01-03 | P1 | Positive | Search by batch reference | Batch list loaded | 1. Search by a known batch reference | Only matching batch(es) shown. |
| TC-USBL01-04 | P1 | Positive | Search by batch name | Batch list with named batches | 1. Search by batch name keyword | Matching batches displayed. |
| TC-USBL01-05 | P1 | Positive | Filter by status including Draft | Drafts and submitted batches exist | 1. Select 'Draft' in status filter | Only draft rows shown. |
| TC-USBL01-06 | P1 | Positive | Filter by date range | Batches from multiple dates | 1. Set date range filter | Only batches within range shown. |
| TC-USBL01-07 | P1 | Positive | Table row content | Batch list loaded | 1. Observe table rows | Each row: batch name or reference, traveler count, last activity date, status badge, action button. |
| TC-USBL01-08 | P1 | Positive | Open submitted batch details | Submitted batch in list | 1. Click action button on submitted row | Batch details page opens (US-40). |
| TC-USBL01-09 | P1 | Positive | Resume a draft batch | Draft batch in list | 1. Click action button on draft row | Batch wizard reopens with saved batch name, notes, and traveler records restored at last step. |
| TC-USBL01-10 | P2 | Positive | Pagination controls | More than one page of batches | 1. Observe pagination | Pagination and row-count controls available. Page navigation works. |
| TC-USBL01-11 | P2 | Positive | Draft shows correct metadata | Draft batch saved with 3 travelers | 1. Observe draft row | Shows batch name, 3 travelers, last activity date, "Draft" status badge. |
| TC-USBL01-12 | P2 | Positive | Empty batch list | New agency with no batches | 1. Open batch list page | Empty state displayed. KPI cards show 0. |

---

## US-IL-01 | Agency Views Inquiry List

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-USIL01-01 | P1 | Positive | Inquiry KPI summary cards | Agency has inquiries in various statuses | 1. Open inquiry list | KPI cards: All Inquiries, Under Processing, Approved, Rejected — correct counts. |
| TC-USIL01-02 | P1 | Positive | Search by reference | Inquiry list loaded | 1. Search by inquiry reference number | Matching inquiry shown. |
| TC-USIL01-03 | P1 | Positive | Search by traveler name | Inquiry list loaded | 1. Search by traveler name | Matching inquiries shown. |
| TC-USIL01-04 | P1 | Positive | Filter by status | Inquiries with mixed statuses | 1. Select 'Approved' in status filter | Only Approved inquiries shown. |
| TC-USIL01-05 | P1 | Positive | Filter by nationality | Inquiries for multiple nationalities | 1. Select specific nationality | Only matching inquiries shown. |
| TC-USIL01-06 | P1 | Positive | Table row content | Inquiry list loaded | 1. Observe table rows | Each row: reference, traveler name, nationality, submission date, status badge, view action. |
| TC-USIL01-07 | P1 | Positive | View action navigates to detail | Inquiry in list | 1. Click view action | Opens inquiry detail page (US-IV-01). |
| TC-USIL01-08 | P2 | Positive | Pagination controls | More entries than page size | 1. Observe pagination | Pagination controls displayed and functional. |
| TC-USIL01-09 | P2 | Positive | Empty inquiry list | New agency | 1. Open inquiry list | Empty state displayed. KPI cards show 0. |

---

## US-IV-01 | Agency Views Inquiry Details

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-USIV01-01 | P1 | Positive | Inquiry summary stat cards | Inquiry detail opened | 1. Observe stat cards | Shows: inquiry reference, submission date, traveler name, current status. |
| TC-USIV01-02 | P1 | Positive | Traveler and travel details | Inquiry detail loaded | 1. Observe sections | Personal info, passport info, travel details (departure country, arrival airport), and linked batch reference displayed. |
| TC-USIV01-03 | P1 | Positive | Processing timeline — Under Processing | Inquiry status = Under Processing | 1. Observe timeline | Shows stages: Submitted ✓, Payment Confirmed ✓, Under Processing (active), Final Decision (pending). |
| TC-USIV01-04 | P1 | Positive | Processing timeline — Approved | Inquiry status = Approved | 1. Observe timeline | All stages completed. Final Decision shows "Approved". |
| TC-USIV01-05 | P1 | Positive | Processing timeline — Rejected | Inquiry status = Rejected | 1. Observe timeline | All stages completed. Final Decision shows "Rejected". No reason code displayed. |
| TC-USIV01-06 | P1 | Positive | Back navigation | Navigated from inquiry list | 1. Click back | Returns to inquiry list or batch view. |
| TC-USIV01-07 | P2 | Positive | PDF download for approved inquiry | Inquiry is Approved and PDF generated | 1. Look for download action | Approval PDF is downloadable. |

---

# SECTION 2 — BACK-OFFICE TEST CASES

---

## US-M2-01 | Admin Login

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M201-01 | P1 | Positive | Successful admin login | Registered admin account exists | 1. Enter valid email + correct password<br>2. Click Login | Authenticated and redirected to admin dashboard. |
| TC-M201-02 | P1 | Negative | Invalid credentials | Admin account exists | 1. Enter valid email + wrong password<br>2. Click Login | Message: ***البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.*** — no email enumeration. |
| TC-M201-03 | P1 | Negative | Unregistered email | No admin with this email | 1. Enter unknown email + any password<br>2. Click Login | Same generic error message. |
| TC-M201-04 | P2 | Negative | Empty fields | Login page | 1. Submit with both fields empty | Inline validation errors for both fields. |
| TC-M201-05 | P3 | Negative | SQL injection attempt | Login page | 1. Enter `admin' OR '1'='1` in email<br>2. Submit | Login fails with generic error. No data leakage. |

---

## US-M2-01A | Admin Dashboard Overview

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M201A-01 | P1 | Positive | Dashboard summary cards | Admin logged in, system has data | 1. Observe dashboard | Summary cards: total inquiries, active agencies, agencies under review, total agency wallet balances (sum of all). |
| TC-M201A-02 | P1 | Positive | Quick action cards navigate correctly | Dashboard loaded | 1. Click each quick action card | Inquiry management, agency management, and nationality/pricing management pages open correctly. |
| TC-M201A-03 | P1 | Positive | Recent activity table | Recent admin actions exist | 1. Observe activity table | Rows show: event time, event type, user, reference. Tracked: agency approvals, wallet credits, nationality additions, fee changes. |
| TC-M201A-04 | P1 | Positive | Nationality pie chart | Inquiries submitted for multiple nationalities | 1. Observe charts | Pie chart 'الطلبات حسب الجنسية' shows breakdown with legend. |
| TC-M201A-05 | P1 | Positive | 7-day trend line chart | Inquiry activity in last 7 days | 1. Observe charts | Line chart 'اتجاه الطلبات — آخر 7 أيام' shows daily counts. |
| TC-M201A-06 | P2 | Positive | Dashboard with no data | Fresh system install | 1. Observe dashboard | All cards show 0. Charts show empty state. Activity table shows no records. |

---

## US-M2-06 | Admin Adds Nationality with Fee

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M206-01 | P1 | Positive | Add nationality with fee | Admin on nationality management screen | 1. Click "Add Nationality"<br>2. Select nationality from dropdown<br>3. Enter fee (e.g., $25.00)<br>4. Save | Nationality added with fee. Fee active immediately. Appears in nationality list. |
| TC-M206-02 | P1 | Negative | Save without fee | Nationality selected, fee empty | 1. Try to save | Error: ***يجب إدخال رسوم الاستعلام عند إضافة جنسية.*** Save blocked. |
| TC-M206-03 | P1 | Negative | Duplicate nationality | "Syrian" already exists | 1. Select "Syrian" from dropdown<br>2. Enter fee<br>3. Save | Error: ***هذه الجنسية مضافة بالفعل. يرجى تعديلها من القائمة.*** Save blocked. |
| TC-M206-04 | P1 | Positive | Edit existing nationality fee | Nationality with $25 fee exists | 1. Click Edit<br>2. Change fee to $30<br>3. Save | Fee updated to $30 immediately. Previous $25 fee retained in history with timestamp. |
| TC-M206-05 | P1 | Positive | Searchable dropdown works | Admin on add form | 1. Type "Syr" in dropdown | Dropdown filters to show matching nationalities (e.g., Syrian). |
| TC-M206-06 | P2 | Positive | New fee applies to new submissions | Fee changed from $25 to $30 | 1. Submit a new inquiry for that nationality | New inquiry billed at $30. |

### Form Validation Tests

| TC ID | Priority | Type | Field Under Test | Input | Expected Result |
|---|---|---|---|---|---|
| TC-M206-V01 | P1 | Validation | Nationality Name | No selection | ***يرجى اختيار الجنسية. (Please select a nationality.)*** |
| TC-M206-V02 | P1 | Validation | Individual Inquiry Fee | Empty | ***يجب إدخال رسوم الاستعلام عند إضافة جنسية.*** |
| TC-M206-V03 | P1 | Negative | Individual Inquiry Fee | 0 | ***يرجى إدخال قيمة رسوم صحيحة أكبر من صفر.*** |
| TC-M206-V04 | P1 | Negative | Individual Inquiry Fee | -5 | Same error — must be greater than zero |
| TC-M206-V05 | P2 | Boundary | Individual Inquiry Fee | 0.01 | Accepted — minimal valid value |
| TC-M206-V06 | P2 | Boundary | Individual Inquiry Fee | 25.999 (3 decimal places) | Rejected — max 2 decimal places |
| TC-M206-V07 | P2 | Positive | Individual Inquiry Fee | 25.50 | Accepted |

---

## US-M2-07 | Admin Views Pricing Lists & Details

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M207-01 | P1 | Positive | Nationality list loads | Admin opens nationality management | 1. Observe screen | Summary cards (total nationalities, active fees, fee changes this month, last update) and table with: Nationality Name, Individual Inquiry Fee (USD), Last Fee Update. |
| TC-M207-02 | P1 | Positive | Search by nationality name | Multiple nationalities configured | 1. Type "Syr" in search | Table filters to matching nationalities only. |
| TC-M207-03 | P2 | Positive | Paginated results | 20+ nationalities configured | 1. Observe pagination | Table paginates. Page navigation works. |
| TC-M207-04 | P1 | Positive | Agency override pricing view | Agency record opened | 1. Observe agency pricing table | Pre-populated table with all system nationalities: nationality, default fee, agency fee (if set), last update date, type (Custom/Default), edit action. |
| TC-M207-05 | P1 | Positive | Save agency-specific fee | Agency detail page, edit action clicked | 1. Set custom fee for a nationality<br>2. Save | Custom fee saved. Active immediately. Type changes to "Custom". |
| TC-M207-06 | P2 | Positive | Agency uses custom fee after override | Agency has custom fee $20, default is $25 | 1. Agency submits inquiry for that nationality | Billed at $20 (custom fee). |
| TC-M207-07 | P2 | Positive | Summary cards accuracy | 10 nationalities, 3 fee changes this month | 1. Observe summary cards | Total = 10, Active fees = 10, Fee changes = 3, Last update shows correct date. |

---

## US-M2-09 | Admin Approves Agency Registration

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M209-01 | P1 | Positive | Agency list with review action | Pending agencies exist | 1. Open Agency Management | List shows: agency name, agency code, wallet balance, registration date, last activity, status (Under Review / Active), 'Review' action. |
| TC-M209-02 | P1 | Positive | Agency detail and document review | Admin clicks Review on a pending agency | 1. Observe review screen | Shows: agency name, commercial reg number, email, mobile, status. Document view actions for uploaded files. |
| TC-M209-03 | P1 | Positive | Approve agency | Admin reviewed documents, satisfied | 1. Click 'Approve'<br>2. Confirm | Status changes to 'Active'. Email `EMAIL-REG-APPROVED` sent. Agency moves to Approved list. |
| TC-M209-04 | P1 | Positive | Immediate login after approval | Agency just approved | 1. Agency navigates to portal login<br>2. Enters registered credentials | Login succeeds — redirected to dashboard. |
| TC-M209-05 | P1 | Positive | Approval email content | Agency approved | 1. Check agency's email | Email from template `EMAIL-REG-APPROVED` with login URL, registered email, and agency ID. |
| TC-M209-06 | P2 | Positive | Agency list filters | Multiple agencies in different statuses | 1. Filter by "Under Review" | Only pending agencies shown. |
| TC-M209-07 | P2 | Positive | Document viewer opens uploaded file | Agency has uploaded PDF document | 1. Click view action on document | Document opens in viewer or downloads for review. |

---

## US-M2-W1 | Admin Credits Agency Wallet Balance

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M2W1-01 | P1 | Positive | Wallet section displays on agency page | Active agency account opened | 1. Observe Wallet section | Shows: current balance, last credit date, 'Credit Wallet' button. |
| TC-M2W1-02 | P1 | Positive | Credit wallet modal opens | Admin clicks 'Credit Wallet' | 1. Observe modal | Modal with: Amount (required), Payment Method (Cheque/Bank Transfer/Cash), Payment Proof (optional), Reference/Note (optional), Confirm button. |
| TC-M2W1-03 | P1 | Positive | Successful wallet credit | Admin enters $500, selects Bank Transfer | 1. Enter $500<br>2. Select Bank Transfer<br>3. Click Confirm | Balance updated immediately. Transaction logged. Updated balance visible on agency page. |
| TC-M2W1-04 | P1 | Positive | Balance reflects on agency portal | Admin credits $500 | 1. Agency logs in<br>2. Checks dashboard and wallet page | Dashboard wallet card and wallet page both show updated balance. |
| TC-M2W1-05 | P2 | Positive | Credit with payment proof | Admin uploads proof PDF | 1. Enter amount<br>2. Upload PDF proof<br>3. Confirm | Credit recorded with proof attached. |
| TC-M2W1-06 | P2 | Positive | Credit with reference note | Admin adds "Cheque #12345" | 1. Enter amount<br>2. Type reference<br>3. Confirm | Transaction recorded with reference note. |

### Form Validation Tests

| TC ID | Priority | Type | Field Under Test | Input | Expected Result |
|---|---|---|---|---|---|
| TC-M2W1-V01 | P1 | Validation | Credit Amount | Empty | ***يرجى إدخال قيمة إيداع صحيحة أكبر من صفر.*** |
| TC-M2W1-V02 | P1 | Negative | Credit Amount | 0 | Same error — must be > 0 |
| TC-M2W1-V03 | P1 | Negative | Credit Amount | -100 | Same error — must be > 0 |
| TC-M2W1-V04 | P2 | Boundary | Credit Amount | 0.01 | Accepted |
| TC-M2W1-V05 | P2 | Boundary | Credit Amount | 100.999 (3 decimal places) | Rejected — max 2 decimal places |
| TC-M2W1-V06 | P1 | Validation | Payment Method | No selection | ***يرجى اختيار طريقة الدفع.*** |
| TC-M2W1-V07 | P2 | Validation | Payment Proof | Upload .exe file | ***صيغة الملف غير مدعومة أو حجمه يتجاوز 5 ميجابايت.*** |
| TC-M2W1-V08 | P2 | Boundary | Payment Proof | Upload PDF > 5 MB | Same file error |
| TC-M2W1-V09 | P2 | Validation | Reference / Note | 201 characters | ***يجب ألا يتجاوز المرجع 200 حرف.*** |
| TC-M2W1-V10 | P2 | Boundary | Reference / Note | 200 characters | Accepted |

---

## US-M2-15 | Admin Monitors & Filters Inquiries

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M215-01 | P1 | Positive | Inquiry list default display | Inquiries exist | 1. Open Inquiry Monitoring | Listed by submission date descending. Columns: request number, traveler name, nationality, submission date-time, status. |
| TC-M215-02 | P1 | Positive | Filter by status | Mixed-status inquiries | 1. Select specific status filter | Only matching inquiries shown. |
| TC-M215-03 | P1 | Positive | Filter by date range | Inquiries from multiple dates | 1. Set date range | Only inquiries within range shown. |
| TC-M215-04 | P1 | Positive | Filter by agency | Multiple agencies have inquiries | 1. Select agency filter | Only that agency's inquiries shown. |
| TC-M215-05 | P1 | Positive | Free-text search by request number | Known request number | 1. Search by request number | Matching inquiry shown. |
| TC-M215-06 | P1 | Positive | Free-text search by traveler name | Known traveler name | 1. Search by name | Matching inquiries shown. |
| TC-M215-07 | P2 | Positive | Paginated results | More inquiries than page size | 1. Navigate between pages | Pagination works correctly. |
| TC-M215-08 | P2 | Positive | Combined filters | Status + date range + agency | 1. Apply multiple filters | Only inquiries matching all filters shown. |
| TC-M215-09 | P2 | Positive | No results | Filters with no match | 1. Apply non-matching filter | Empty state displayed. |

---

## US-M2-16 | Admin Views Inquiry Details

### Functional Tests

| TC ID | Priority | Type | Title | Precondition | Steps | Expected Result |
|---|---|---|---|---|---|---|
| TC-M216-01 | P1 | Positive | Full inquiry detail view | Admin clicks inquiry from list | 1. Observe detail screen | Shows: traveler/passport details, travel details (departure country, arrival airport), payment reference and amount, processing timeline. |
| TC-M216-02 | P1 | Positive | Processing timeline with timestamps | Inquiry has progressed through stages | 1. Observe timeline | Each completed stage shows timestamp. Current active stage is highlighted. |
| TC-M216-03 | P1 | Positive | Rejected inquiry display | Inquiry status = Rejected | 1. Observe detail screen | Shows 'Rejected' status with decision timestamp. No rejection reason displayed. |
| TC-M216-04 | P1 | Positive | Approved inquiry display | Inquiry status = Approved (Replied) | 1. Observe detail screen | Shows 'Replied' status with decision timestamp. |
| TC-M216-05 | P2 | Positive | Under Processing inquiry display | Inquiry still processing | 1. Observe timeline | Timeline shows Submitted and Payment Confirmed as completed, Under Processing as active. |

---

# SECTION 3 — EMAIL NOTIFICATION TESTS

---

## Email Cycle Tests

| TC ID | Priority | Type | Title | Trigger | Expected Result |
|---|---|---|---|---|---|
| TC-EMAIL-01 | P1 | Positive | Registration submitted email | Agency submits registration (US-22 AC1) | `EMAIL-REG-SUBMITTED` sent within 5 minutes. Contains: Contact Name, Registration Reference, Submission DateTime. Subject in AR + EN. |
| TC-EMAIL-02 | P1 | Positive | Registration approved email | Admin approves agency (US-M2-09 AC3) | `EMAIL-REG-APPROVED` sent within 5 minutes. Contains: Contact Name, Portal Login URL, Registered Email, Agency ID. Subject in AR + EN. |
| TC-EMAIL-03 | P1 | Positive | Email bilingual content | Any email sent | 1. Check email body | Body includes both Arabic and English versions. |
| TC-EMAIL-04 | P2 | Positive | Email placeholder replacement | Registration submitted | 1. Inspect email body | `[Contact_Name]`, `[Registration_Reference]`, `[Submission_DateTime]` all replaced with actual values. No raw placeholders visible. |
| TC-EMAIL-05 | P2 | Negative | Email to invalid address | Registration with malformed email (should be caught at form level) | Form validation catches it before submission. No email sent to invalid address. |

---

# SECTION 4 — END-TO-END SCENARIOS

---

## E2E-01 | Full Agency Onboarding to Batch Submission

| Step | Action | Expected |
|---|---|---|
| 1 | Agency registers on portal | Pending account created. `EMAIL-REG-SUBMITTED` sent. |
| 2 | Agency tries to log in (pending) | Login blocked: ***الحساب قيد المراجعة.*** |
| 3 | Admin logs into back-office | Redirected to admin dashboard. |
| 4 | Admin opens Agency Management | Pending agency visible with 'Under Review' status. |
| 5 | Admin reviews and approves agency | Status → Active. `EMAIL-REG-APPROVED` sent. |
| 6 | Agency logs in (now approved) | Login succeeds. Dashboard loads with all sections. |
| 7 | Admin credits agency wallet ($500) | Balance updated. Visible on agency dashboard and wallet page. |
| 8 | Agency starts batch wizard | Step 1 loads. Enters batch name. Proceeds to Step 2. |
| 9 | Agency adds 3 travelers with documents | Each save auto-updates draft. Running total shows 3. |
| 10 | Agency proceeds to review (Step 3) | Review shows batch name, 3 travelers, warning, Confirm enabled. |
| 11 | Agency confirms submission | Success screen: batch reference, 3 travelers, amount deducted. |
| 12 | Agency views batch in batch list | Submitted batch with 3 travelers, correct status. |
| 13 | Agency opens batch details | All 3 travelers listed with 'Under Processing' status. |
| 14 | Agency checks wallet | Balance reduced by total fee amount. Transaction logged. |

## E2E-02 | Draft Save and Resume Flow

| Step | Action | Expected |
|---|---|---|
| 1 | Agency starts batch wizard, names batch | Step 1 completed. |
| 2 | Agency adds 2 travelers, saves each | Draft auto-saved after each save. |
| 3 | Agency navigates away (e.g., goes to dashboard) | No data loss. |
| 4 | Agency opens batch list | Draft row visible with batch name, 2 travelers, "Draft" badge. |
| 5 | Agency clicks draft row action | Wizard reopens at Step 2 with batch name, notes, and 2 travelers restored. |
| 6 | Agency adds 1 more traveler | Total now 3. Draft updated. |
| 7 | Agency proceeds to review and submits | Draft becomes submitted batch. Success screen shown. |
| 8 | Agency opens batch list again | Former draft now shows as submitted batch. |

## E2E-03 | Insufficient Balance Blocks Submission

| Step | Action | Expected |
|---|---|---|
| 1 | Agency has $0 wallet balance | — |
| 2 | Agency builds batch with 2 travelers | Draft saved successfully. |
| 3 | Agency proceeds to review step | Warning displayed. Confirm button disabled. Message: ***رصيد المحفظة غير كاف.*** |
| 4 | Admin credits $100 to agency wallet | Balance updated. |
| 5 | Agency returns to review step | Confirm button now enabled. |
| 6 | Agency confirms submission | Success — batch submitted, wallet deducted. |

## E2E-04 | Admin Nationality & Pricing Full Cycle

| Step | Action | Expected |
|---|---|---|
| 1 | Admin adds nationality "Sudanese" with fee $20 | Nationality appears in list. Fee active immediately. |
| 2 | Admin verifies nationality list | Summary cards updated. "Sudanese" in table with $20 fee. |
| 3 | Admin edits fee to $25 | Fee updated. History shows $20 → $25 with timestamps. |
| 4 | Admin opens agency detail page | Agency pricing table shows "Sudanese" with default $25. |
| 5 | Admin sets agency custom fee at $18 | Saved immediately. Type shows "Custom". |
| 6 | Agency submits inquiry for Sudanese traveler | Billed at $18 (custom fee, not default $25). |

## E2E-05 | Status Vocabulary Cross-Surface Verification

| Step | Action | Expected |
|---|---|---|
| 1 | Agency submits batch | All travelers show "Submitted" on portal. |
| 2 | Admin opens Inquiry Monitoring | Same inquiries show status "New (جديد)". |
| 3 | Clearance engine processes inquiry | Portal shows "Under Processing". Admin shows "Under Processing". |
| 4 | Decision: Approved | Portal shows "Approved". Admin shows "Replied (تم الرد)". Detail view shows approval. |
| 5 | Decision: Rejected | Portal shows "Rejected". Admin shows "Replied (تم الرد)". Detail view shows rejection. |

---

# SECTION 5 — TEST SUMMARY

| Category | Test Count |
|---|---|
| **US-22** — Registration | 5 functional + 28 validation = 33 |
| **US-26** — Login | 8 |
| **US-26A** — Dashboard | 11 |
| **US-W-01** — Wallet | 9 |
| **US-34** — Batch Builder | 11 functional + 31 validation = 42 |
| **US-37** — Batch Review | 10 |
| **US-38** — Batch Confirm | 10 |
| **US-40** — Batch Details | 6 |
| **US-40A** — Batch Export | 4 |
| **US-BL-01** — Batch List | 12 |
| **US-IL-01** — Inquiry List | 9 |
| **US-IV-01** — Inquiry Details | 7 |
| **US-M2-01** — Admin Login | 5 |
| **US-M2-01A** — Admin Dashboard | 6 |
| **US-M2-06** — Add Nationality | 6 functional + 7 validation = 13 |
| **US-M2-07** — Pricing Lists | 7 |
| **US-M2-09** — Approve Agency | 7 |
| **US-M2-W1** — Credit Wallet | 6 functional + 10 validation = 16 |
| **US-M2-15** — Inquiry Monitoring | 9 |
| **US-M2-16** — Inquiry Details | 5 |
| **Email** | 5 |
| **End-to-End** | 5 scenarios |
| **TOTAL** | **233 test cases + 5 E2E scenarios** |
