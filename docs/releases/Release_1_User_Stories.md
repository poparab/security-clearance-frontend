# Security Clearance & Inquiry System
## Release 1 — User Stories

*Scope: To Egypt + From Egypt | Email notifications only | Account safety flows | Single inquiry flow | Batch traveler edit and removal | Approval document downloads | Full admin back-office | Transit stops: max 3*

*22 active stories — 12 Agency + 10 Admin*

---

## Personas

| Persona | Scope | Description |
|---|---|---|
| **Agency** | Portal | The approved travel agency account that signs in to the portal, submits inquiries, tracks results, edits saved batch travelers before submission, and downloads approval documents. |
| **Admin** | Back-office | The back-office user who manages access, reviews agencies, monitors inquiries, and reviews audit activity. |

---

## Portal Story List

- US-21 — Agency account locks after failed logins
- US-22 — Agency resets forgotten portal password
- US-23 — Agency selects inquiry travel direction
- US-24 — Agency submits single traveler inquiry
- US-25 — Agency receives single inquiry confirmation
- US-26 — Agency views single inquiry result
- US-27 — Agency receives inquiry status emails
- US-28 — Agency views inquiry history list
- US-29 — Agency downloads traveler PDF from batch
- US-30 — Agency downloads batch PDFs as ZIP
- US-31 — Agency edits or removes batch travelers
- US-33 — Portal session expires after inactivity

## Admin Story List

- US-34 — Admin account locks after failed logins
- US-35 — Admin resets forgotten portal password
- US-36 — Admin creates and manages admin accounts
- US-37 — Admin deactivates and reactivates admin accounts
- US-39 — Admin suspends active agency account
- US-40 — Admin reactivates suspended agency account
- US-41 — Admin views live processing queue
- US-42 — Admin exports inquiry data as CSV
- US-43 — Admin views and filters system audit log
- US-44 — Admin exports audit log as CSV

---

# Portal — Agency Stories

## Epic: Authentication & Access

## US-21 | (Agency) account locks after failed logins

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an approved agency using the portal
- **I want to…** have the account lock after repeated failed sign-in attempts
- **So that…** the agency account is protected from repeated sign-in guessing attempts

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Fifth failed login locks account | the agency is on the sign-in page | the fifth consecutive password attempt fails | the account is locked for 30 minutes and the system displays: ***تم قفل الحساب مؤقتاً بسبب محاولات تسجيل الدخول غير الناجحة. يرجى المحاولة مرة أخرى بعد 30 دقيقة أو إعادة تعيين كلمة المرور. (Your account is temporarily locked due to failed sign-in attempts. Please try again after 30 minutes or reset your password.)*** |
| AC2 | Login blocked during lockout | the account is locked | the agency tries to sign in again, even with the correct password | access is blocked and the same lock message is shown. |
| AC3 | Auto unlock after wait | 30 minutes have passed since the lock started | the agency signs in with the correct password | access is restored and the failed-attempt counter resets. |
| AC4 | Forgot password still available | the account is locked | the agency chooses Forgot Password | the password reset request screen is still available. |
| AC5 | Lock event is recorded | a lock happens | the action completes | the event is recorded in the audit log with the account, time, and source details. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing agency sign-in flow from MVP.

---

## US-22 | (Agency) resets forgotten portal password

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an approved agency that no longer remembers the portal password
- **I want to…** request a password reset email and set a new password through a secure link
- **So that…** the agency can regain access without waiting for manual help

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Registered email gets reset email | the agency opens Forgot Password | a registered email address is submitted | the system displays: ***إذا كان هذا البريد الإلكتروني مسجلاً، فستصلك رسالة إعادة تعيين كلمة المرور خلال دقائق. (If this email address is registered, you will receive a password reset email within minutes.)*** and sends the EMAIL-PASSWORD-RESET email. |
| AC2 | Unknown email gets same response | the agency opens Forgot Password | an email address that is not registered is submitted | the same neutral message is shown and no account details are revealed. |
| AC3 | Valid reset link opens password form | the reset email was received | the agency opens a valid reset link before it expires | the Create New Password form is shown. |
| AC4 | Expired link is blocked | the reset email was received | the agency opens an expired or already used link | the system displays: ***انتهت صلاحية رابط إعادة التعيين أو تم استخدامه من قبل. يرجى طلب رابط جديد. (This reset link has expired or has already been used. Please request a new link.)*** |
| AC5 | Password reset succeeds | the agency opened a valid reset link | a new password that meets policy rules is submitted and confirmed | the password is updated, other active sessions are ended, and the system displays: ***تمت إعادة تعيين كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى. (Your password has been reset successfully. Please sign in again.)*** |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Valid email format | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| **New Password** | Password | Yes | Min 8 characters. Must include an uppercase letter, a lowercase letter, a number, and a special character | ***يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm New Password** | Password | Yes | Must exactly match New Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## Epic: Eligibility & Submission

## US-23 | (Agency) selects inquiry travel direction

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Eligibility & Submission |

### User Story Statement

- **As a…** an approved agency starting a new single inquiry
- **I want to…** choose the travel direction before I enter traveler details
- **So that…** the portal shows the correct travel fields for that journey

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Direction selector shown first | the agency opens the single inquiry page | the page loads | the travel direction selector is the first required field shown. |
| AC2 | To Egypt shows inbound section | the agency is on the direction step | To Egypt is selected | the portal shows the inbound travel section. |
| AC3 | From Egypt shows outbound section | the agency is on the direction step | From Egypt is selected | the portal shows the outbound travel section. |
| AC4 | No direction blocks progress | the agency did not choose a direction | Continue is selected | the system displays: ***يرجى اختيار اتجاه السفر قبل المتابعة. (Please select the travel direction before you continue.)*** |
| AC5 | Changing direction clears travel details | the agency already entered travel details | the travel direction is changed | the system displays: ***سيؤدي تغيير اتجاه السفر إلى مسح تفاصيل الرحلة. هل تريد المتابعة؟ (Changing the travel direction will clear the travel details. Do you want to continue?)*** and clears the travel fields after confirmation. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Direction of Travel** | Select | Yes | Must be either To Egypt or From Egypt | ***يرجى اختيار اتجاه السفر. (Please select the travel direction.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-24 | (Agency) submits single traveler inquiry

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Eligibility & Submission |

### User Story Statement

- **As a…** an approved agency creating a single security inquiry
- **I want to…** enter one traveler’s details, including direction-based travel details and up to three transit stops, and submit the inquiry
- **So that…** the traveler can be processed without joining a batch

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Ineligible nationality is blocked | the agency starts a single inquiry | a nationality that does not require inquiry is selected | the system displays: ***هذه الجنسية لا تحتاج إلى استعلام أمني لهذا المسار. (This nationality does not require a security inquiry for this travel direction.)*** |
| AC2 | Direction-based form is shown | the agency selected a valid direction and an eligible nationality | the agency continues to the form | the correct travel section is shown. For all fields, types, and constraints, see the Form Validation table below. |
| AC3 | Transit stops can be added | the agency is filling in travel details | Add Transit Stop is selected | one new transit row is added. Up to 3 rows can be added. |
| AC4 | Review screen shows summary only | all required details are valid | the agency selects Review | the review step shows the traveler name, nationality, direction, and travel date. No fee or wallet amounts are shown. |
| AC5 | Valid submission creates inquiry | all required details are valid and the wallet balance is sufficient | the agency confirms submission | the inquiry is created and the confirmation screen opens in the processing stage. |
| AC6 | Low balance blocks submission | the agency reaches the review step | the wallet balance is not sufficient | the system displays: ***رصيد المحفظة غير كاف. يرجى التواصل مع الدعم للمساعدة. (Insufficient wallet balance. Please contact support for assistance.)*** |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Traveler Full Name** | Text | Yes | Min 2 characters. Max 150 characters | ***اسم المسافر مطلوب. (Traveler name is required.)*** |
| **Nationality** | Select | Yes | Must be chosen from the available nationality list | ***يرجى اختيار جنسية المسافر. (Please select the traveler's nationality.)*** |
| **Passport Number** | Text | Yes | 6 to 20 letters or numbers | ***يجب أن يتكون رقم جواز السفر من 6 إلى 20 حرفاً أو رقماً. (Passport number must be 6 to 20 letters or numbers.)*** |
| **Passport Expiry Date** | Date | Yes | Must be at least 6 months after the travel date | ***يجب أن يكون جواز السفر صالحاً لمدة 6 أشهر على الأقل بعد تاريخ السفر. (Passport must be valid for at least 6 months after the travel date.)*** |
| **Travel Date** | Date | Yes | Must be today or a future date | ***يجب أن يكون تاريخ السفر اليوم أو تاريخاً مستقبلياً. (Travel date must be today or a future date.)*** |
| **Departure Country** | Select | Conditional | Required when Direction of Travel is To Egypt | ***يرجى اختيار بلد المغادرة. (Please select the departure country.)*** |
| **Arrival Airport in Egypt** | Select | Conditional | Required when Direction of Travel is To Egypt | ***يرجى اختيار مطار الوصول في مصر. (Please select the arrival airport in Egypt.)*** |
| **Departure Airport in Egypt** | Select | Conditional | Required when Direction of Travel is From Egypt | ***يرجى اختيار مطار المغادرة في مصر. (Please select the departure airport in Egypt.)*** |
| **Destination Country** | Select | Conditional | Required when Direction of Travel is From Egypt | ***يرجى اختيار بلد الوصول. (Please select the destination country.)*** |
| **Purpose of Travel** | Select | Yes | Must be chosen from the available purpose list | ***يرجى اختيار غرض السفر. (Please select the purpose of travel.)*** |
| **Flight Number** | Text | No | Max 10 letters or numbers | ***يجب ألا يزيد رقم الرحلة عن 10 أحرف أو أرقام. (Flight number must not exceed 10 letters or numbers.)*** |
| **Transit Country (per stop)** | Select | Conditional | Required when a transit row is added | ***يرجى اختيار بلد الترانزيت لهذه المحطة. (Please select the transit country for this stop.)*** |
| **Layover Duration (per stop)** | Number | No | Whole number from 0 to 72 hours | ***يجب أن تكون مدة التوقف بين 0 و72 ساعة. (Layover duration must be between 0 and 72 hours.)*** |
| **Connecting Flight Number (per stop)** | Text | No | Max 10 letters or numbers | ***يجب ألا يزيد رقم الرحلة التالية عن 10 أحرف أو أرقام. (Connecting flight number must not exceed 10 letters or numbers.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-25 | (Agency) receives single inquiry confirmation

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Eligibility & Submission |

### User Story Statement

- **As a…** an approved agency that just submitted a single inquiry
- **I want to…** see a confirmation page and receive a confirmation email
- **So that…** the agency has a clear record of the submission and a direct path to follow it

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Confirmation page opens after submit | the agency confirmed a valid inquiry | submission succeeds | the confirmation page shows the inquiry reference, traveler name, submission time, and an action to open inquiry details. No fee or wallet amounts are shown. |
| AC2 | Receipt can be downloaded | the confirmation page is open | Download Receipt is selected | a receipt file is downloaded with the inquiry reference, traveler name, direction, and submission time. |
| AC3 | Confirmation email is sent | the inquiry was submitted successfully | the page finishes loading | a confirmation email is sent to the agency’s registered email address. |
| AC4 | Submission error shows support reference | the agency confirmed the inquiry | the submission cannot be completed | the system displays: ***تعذر إكمال الإرسال الآن. يرجى المحاولة مرة أخرى أو التواصل مع الدعم مع رقم المرجع التالي. (We could not complete the submission right now. Please try again or contact support with the reference below.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Agency) submits single traveler inquiry**.

---

## Epic: Inquiry Tracking & Results

## US-26 | (Agency) views single inquiry result

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an approved agency that submitted a single inquiry
- **I want to…** open the inquiry details and see the current outcome
- **So that…** the agency can give the traveler an accurate update

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Decided inquiry shows outcome | the inquiry has a final decision | the agency opens the detail page | the page shows the decision status, decision date, traveler details, and journey details. |
| AC2 | Approved inquiry shows document action | the inquiry is approved | the detail page opens | the page shows the approval reference, validity dates, and a Download PDF action. |
| AC3 | Approved PDF can be downloaded | the inquiry is approved | Download PDF is selected | the approval PDF is downloaded with the QR code. |
| AC4 | Rejected inquiry stays read only | the inquiry is rejected | the detail page opens | the page shows the rejected status and a support note. No rejection reason is shown. |
| AC5 | Processing inquiry shows current stage | the inquiry is still being processed | the detail page opens | the current stage is shown and no decision section is displayed. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on a submitted inquiry reaching a viewable state.

---

## US-27 | (Agency) receives inquiry status emails

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an approved agency with active inquiries
- **I want to…** receive emails when inquiry statuses change
- **So that…** the agency does not need to keep checking the portal for every update

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Status change sends email | the inquiry is active | its status changes | an email is sent to the agency’s registered email address. |
| AC2 | Approval email includes document link | the inquiry is active | the inquiry is approved | the email includes the traveler name, inquiry reference, and a link to download the approval document. |
| AC3 | Rejection email includes status link | the inquiry is active | the inquiry is rejected | the email includes the traveler name, inquiry reference, and a link to open the inquiry details page. |
| AC4 | Batch completion sends one summary email | the agency has a batch in progress | all travelers in that batch reach a final state | one summary email is sent with the counts of approved, rejected, and failed travelers. |
| AC5 | Failed email delivery is retried | a status email should be sent | the first delivery attempt fails | the system retries delivery and logs the final outcome. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-28 | (Agency) views inquiry history list

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an approved agency
- **I want to…** view all single and batch inquiries from one list
- **So that…** I can monitor current and past activity in one place

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | History list loads | the agency is signed in | the agency opens Inquiry History | a combined list of single and batch inquiries is shown. For columns, sorting, filtering, and pagination, see the Grid Specification below. |
| AC2 | Newest records show first | the agency is on Inquiry History | the list loads with records | the default sort order is submission date descending. |
| AC3 | Search and filters narrow results | the agency is on Inquiry History | a search term or filter is applied | the list refreshes to show only matching records. |
| AC4 | Row opens inquiry details | the agency is viewing the list | a row is selected | the matching inquiry details page opens. |
| AC5 | Empty state is shown | the agency has no inquiries | Inquiry History opens | the system displays: ***لا توجد استعلامات مقدمة حتى الآن. (No inquiries have been submitted yet.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | Yes | Text search |
| Record Type | No | Yes | Dropdown: Single, Batch |
| Traveler / Batch Name | Yes | Yes | Text search |
| Submission Date | Yes | Yes | Date range |
| Traveler Count | Yes | No | — |
| Direction | No | Yes | Dropdown: To Egypt, From Egypt |
| Current Status | No | Yes | Dropdown: Submitted, Under Processing, Approved, Rejected, Failed |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the agency having submitted inquiries.

---

## Epic: Batch Inquiry

## US-29 | (Agency) downloads traveler PDF from batch

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Batch Inquiry |

### User Story Statement

- **As a…** an approved agency managing a batch with approved travelers
- **I want to…** download one traveler’s approval PDF from the batch details page
- **So that…** I can send the correct document to that traveler without downloading the full batch

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Approved traveler shows download action | the batch details page is open | a traveler row is approved | that row shows a Download PDF action. |
| AC2 | Downloaded PDF contains required details | an approved traveler row is shown | Download PDF is selected | the PDF includes the traveler name, nationality, direction, approval reference, validity dates, and QR code. |
| AC3 | Expired approval stays downloadable | the traveler was approved in the past | the approval validity has ended | the download action is still available and the PDF shows that the approval is expired. |
| AC4 | Unapproved traveler has no download action | the batch details page is open | a traveler row is not approved | no PDF download action is shown for that row. |
| AC5 | Download is recorded | an approved traveler row is shown | the PDF is downloaded | the download action is recorded in the audit log. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Traveler Name | No | No | — |
| Passport Number | No | No | — |
| Direction | No | No | — |
| Current Status | No | No | — |
| Decision Date | No | No | — |
| Approval Reference | No | No | — |
| Actions | No | No | — |

**Pagination:** No sorting, filtering, or pagination needed — the list shows only travelers in the current batch.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing batch details screen.

---

## US-30 | (Agency) downloads batch PDFs as ZIP

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Batch Inquiry |

### User Story Statement

- **As a…** an approved agency with approved travelers in one batch
- **I want to…** download all available approval PDFs as one ZIP file
- **So that…** I can distribute the documents with one download

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | ZIP contains one PDF per approved traveler | the batch has approved travelers | Download All Approved PDFs is selected | one ZIP file is created with one PDF for each approved traveler. |
| AC2 | File names follow one pattern | a ZIP download is requested | the ZIP file is created | each PDF inside uses the pattern [ReferenceNumber]_[TravelerName].pdf. |
| AC3 | No approvals disables download | the batch has no approved travelers | the agency opens the batch details page | the download action is disabled and the system displays: ***لا توجد موافقات جاهزة للتنزيل بعد. (There are no approved documents ready to download yet.)*** |
| AC4 | Slow generation shows progress | the ZIP request is running | file generation takes more than 5 seconds | the system displays: ***جارٍ تجهيز الملف المضغوط. يرجى الانتظار. (Your ZIP file is being prepared. Please wait.)*** |
| AC5 | ZIP download is recorded | the ZIP file is ready | the download completes | the ZIP download action is recorded in the audit log. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Traveler Name | No | No | — |
| Passport Number | No | No | — |
| Direction | No | No | — |
| Current Status | No | No | — |
| Decision Date | No | No | — |
| Approval Reference | No | No | — |
| Actions | No | No | — |

**Pagination:** No sorting, filtering, or pagination needed — the list shows only travelers in the current batch.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing batch details screen.

---

## US-31 | (Agency) edits or removes batch travelers

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Batch Inquiry |

### User Story Statement

- **As a…** an approved agency preparing a batch
- **I want to…** edit or remove saved travelers before I submit the batch
- **So that…** the batch contains only correct traveler records

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Saved traveler list shows count and actions | the agency is on the batch traveler step with saved travelers | the list loads | the page shows the current traveler count and each saved traveler row shows Edit and Remove actions. For columns, see the Grid Specification below. |
| AC2 | Edit opens current values | the agency is on the saved traveler list | Edit is selected for a traveler | the traveler form opens with the current values. For all editable fields, types, and constraints, see the Form Validation table below. |
| AC3 | Invalid edit save is blocked | the traveler edit form is open | the agency tries to save changes with missing or invalid values | the traveler is not updated, inline bilingual validation messages are shown, and the saved row keeps the previous valid values. |
| AC4 | Valid edit revalidates and updates draft | the traveler edit form is open | the agency saves valid changes | all traveler fields are checked again, the saved traveler row updates immediately, and the batch draft keeps the new values. |
| AC5 | Delete updates count and list | the agency is on the saved traveler list | Remove is selected and the deletion is confirmed | the system displays: ***سيتم حذف هذا المسافر من الدفعة. هل تريد المتابعة؟ (This traveler will be removed from the batch. Do you want to continue?)*** before deletion.<br>After confirmation, the traveler is removed, the traveler count drops immediately, and the saved traveler list refreshes.<br>If the last traveler is removed, the system displays: ***لا يوجد مسافرون محفوظون في هذه الدفعة بعد. (There are no saved travelers in this batch yet.)*** and the batch cannot be submitted until at least one traveler is saved again. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Direction of Travel** | Select | Yes | Must be either To Egypt or From Egypt | ***يرجى اختيار اتجاه السفر. (Please select the travel direction.)*** |
| **Traveler Full Name** | Text | Yes | Min 2 characters. Max 150 characters | ***اسم المسافر مطلوب. (Traveler name is required.)*** |
| **Nationality** | Select | Yes | Must be chosen from the available nationality list | ***يرجى اختيار جنسية المسافر. (Please select the traveler's nationality.)*** |
| **Passport Number** | Text | Yes | 6 to 20 letters or numbers | ***يجب أن يتكون رقم جواز السفر من 6 إلى 20 حرفاً أو رقماً. (Passport number must be 6 to 20 letters or numbers.)*** |
| **Passport Expiry Date** | Date | Yes | Must be at least 6 months after the travel date | ***يجب أن يكون جواز السفر صالحاً لمدة 6 أشهر على الأقل بعد تاريخ السفر. (Passport must be valid for at least 6 months after the travel date.)*** |
| **Travel Date** | Date | Yes | Must be today or a future date | ***يجب أن يكون تاريخ السفر اليوم أو تاريخاً مستقبلياً. (Travel date must be today or a future date.)*** |
| **Departure Country** | Select | Conditional | Required when Direction of Travel is To Egypt | ***يرجى اختيار بلد المغادرة. (Please select the departure country.)*** |
| **Arrival Airport in Egypt** | Select | Conditional | Required when Direction of Travel is To Egypt | ***يرجى اختيار مطار الوصول في مصر. (Please select the arrival airport in Egypt.)*** |
| **Departure Airport in Egypt** | Select | Conditional | Required when Direction of Travel is From Egypt | ***يرجى اختيار مطار المغادرة في مصر. (Please select the departure airport in Egypt.)*** |
| **Destination Country** | Select | Conditional | Required when Direction of Travel is From Egypt | ***يرجى اختيار بلد الوصول. (Please select the destination country.)*** |
| **Purpose of Travel** | Select | Yes | Must be chosen from the available purpose list | ***يرجى اختيار غرض السفر. (Please select the purpose of travel.)*** |
| **Flight Number** | Text | No | Max 10 letters or numbers | ***يجب ألا يزيد رقم الرحلة عن 10 أحرف أو أرقام. (Flight number must not exceed 10 letters or numbers.)*** |
| **Transit Country (per stop)** | Select | Conditional | Required when a transit row is added | ***يرجى اختيار بلد الترانزيت لهذه المحطة. (Please select the transit country for this stop.)*** |
| **Layover Duration (per stop)** | Number | No | Whole number from 0 to 72 hours | ***يجب أن تكون مدة التوقف بين 0 و72 ساعة. (Layover duration must be between 0 and 72 hours.)*** |
| **Connecting Flight Number (per stop)** | Text | No | Max 10 letters or numbers | ***يجب ألا يزيد رقم الرحلة التالية عن 10 أحرف أو أرقام. (Connecting flight number must not exceed 10 letters or numbers.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Traveler Name | No | No | — |
| Nationality | No | No | — |
| Passport Number | No | No | — |
| Travel Date | No | No | — |
| Direction | No | No | — |
| Actions | No | No | — |

**Pagination:** No sorting, filtering, or pagination needed — the list shows only saved travelers in the current batch draft.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing batch wizard from MVP.

---

## Epic: Session Management

## US-33 | (Agency) portal session expires after inactivity

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Session Management |

### User Story Statement

- **As a…** an approved agency using the portal on a shared or unattended device
- **I want to…** be signed out after a period of inactivity
- **So that…** the portal stays secure when I step away

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Warning appears before timeout | the agency has been inactive until 2 minutes before timeout | the warning point is reached | the system displays: ***ستنتهي جلستك قريباً بسبب عدم النشاط. (Your session will expire soon due to inactivity.)*** with a countdown and a Stay Signed In action. |
| AC2 | Stay Signed In resets timer | the inactivity warning is visible | Stay Signed In is selected | the warning closes and the full inactivity timer starts again. |
| AC3 | Timeout ends the session | the inactivity warning is visible | the countdown reaches zero | the session ends, the sign-in page opens, and the system displays: ***انتهت جلستك بسبب عدم النشاط. يرجى تسجيل الدخول مرة أخرى. (Your session expired due to inactivity. Please sign in again.)*** |
| AC4 | Expired session blocks the next action | the session already expired | the agency tries to open a protected page or submit a protected action | no protected data is shown and the sign-in page is opened. |
| AC5 | Sign-in returns the agency to the last page | the session expired while the agency was using the portal | the agency signs in again successfully | the agency returns to the page that was open before the timeout. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

# Back-office — Admin Stories

## Epic: Authentication & Access

## US-34 | (Admin) account locks after failed logins

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin using the back-office portal
- **I want to…** have the account lock after repeated failed sign-in attempts
- **So that…** sensitive back-office access is protected

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Warning appears before lock | the admin is on the sign-in page | one failed attempt remains before lockout and another incorrect password is entered | the system displays: ***تحذير: تبقى [X] محاولات قبل قفل الحساب. (Warning: [X] attempts remain before the account is locked.)*** |
| AC2 | Threshold reached locks account | the admin is on the sign-in page | the lockout threshold is reached | the system displays: ***تم قفل الحساب مؤقتاً بسبب محاولات تسجيل الدخول غير الناجحة. يرجى إعادة تعيين كلمة المرور أو التواصل مع مسؤول النظام. (The account has been temporarily locked due to failed sign-in attempts. Please reset your password or contact your system administrator.)*** |
| AC3 | Successful sign-in resets counter | the admin has failed sign-in attempts but is not locked | the admin signs in successfully | the failed-attempt counter resets to zero. |
| AC4 | Locked account can request password reset | the admin account is locked | Forgot Password is selected | the password reset request screen is still available. |
| AC5 | Unlock restores access | the admin account is locked | an authorized admin unlocks the account | the affected admin can sign in again and the failed-attempt counter resets. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing admin sign-in flow.

---

## US-35 | (Admin) resets forgotten portal password

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin who no longer remembers the back-office password
- **I want to…** request a password reset email and set a new password through a secure link
- **So that…** I can regain access without another admin changing my password for me

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Registered email gets reset email | the admin opens Forgot Password | a registered admin email address is submitted | the system displays: ***إذا كان هذا البريد الإلكتروني مسجلاً، فستصلك رسالة إعادة تعيين كلمة المرور خلال دقائق. (If this email address is registered, you will receive a password reset email within minutes.)*** and sends the EMAIL-PASSWORD-RESET email. |
| AC2 | Unknown email gets same response | the admin opens Forgot Password | an email address that is not registered is submitted | the same neutral message is shown and no account details are revealed. |
| AC3 | Valid reset link opens password form | the reset email was received | the admin opens a valid reset link before it expires | the Create New Password form is shown. |
| AC4 | Expired link is blocked | the reset email was received | the admin opens an expired or already used link | the system displays: ***انتهت صلاحية رابط إعادة التعيين أو تم استخدامه من قبل. يرجى طلب رابط جديد. (This reset link has expired or has already been used. Please request a new link.)*** |
| AC5 | Password reset succeeds | the admin opened a valid reset link | a new password that meets policy rules is submitted and confirmed | the password is updated, other active sessions are ended, and the system displays: ***تمت إعادة تعيين كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى. (Your password has been reset successfully. Please sign in again.)*** |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Valid email format | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| **New Password** | Password | Yes | Min 8 characters. Must include an uppercase letter, a lowercase letter, a number, and a special character | ***يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm New Password** | Password | Yes | Must exactly match New Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-36 | (Admin) creates and manages admin accounts

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin responsible for back-office access
- **I want to…** create admin accounts and manage their roles
- **So that…** only the right people can use the back-office portal

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Create form opens | the admin is on Admin User Management | Create Admin Account is selected | a form opens. For all fields, types, and constraints, see the Form Validation table below. |
| AC2 | Valid account is created | the create form is open | valid details are submitted | the new account is created, a welcome email is sent, and the new row appears in the admin user list. |
| AC3 | Duplicate email is blocked | the create form is open | an email address already used by another admin is submitted | the system displays: ***يوجد حساب مرتبط بهذا البريد الإلكتروني بالفعل. (An account with this email address already exists.)*** |
| AC4 | Role change is saved | an admin user row exists | the role is changed and saved | the new role is stored and applies at the user’s next sign-in. |
| AC5 | Create and update actions are logged | an admin account is created or updated | the action completes | the action is recorded in the audit log with the acting admin, target account, and time. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Full Name** | Text | Yes | Min 2 characters. Max 150 characters | ***الاسم الكامل مطلوب ويجب أن يكون بين حرفين و150 حرفاً. (Full name is required and must be between 2 and 150 characters.)*** |
| **Email Address** | Email | Yes | Valid email format. Must be unique | ***يرجى إدخال بريد إلكتروني صحيح وفريداً. (Please enter a valid and unique email address.)*** |
| **Role** | Select | Yes | Must be a valid admin role | ***يرجى اختيار الدور. (Please select the role.)*** |
| **Temporary Password** | Password | Yes | Min 8 characters. Must include an uppercase letter, a lowercase letter, a number, and a special character | ***يجب أن تكون كلمة المرور المؤقتة 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (The temporary password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Full Name | Yes | Yes | Text search |
| Email Address | Yes | Yes | Text search |
| Role | No | Yes | Dropdown: Admin, Super Admin |
| Status | No | Yes | Dropdown: Active, Inactive, Locked |
| Last Sign-In | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-37 | (Admin) deactivates and reactivates admin accounts

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin responsible for access control
- **I want to…** deactivate or reactivate another admin account
- **So that…** back-office access can be stopped or restored without recreating accounts

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Deactivation ends access | an admin account is active | Deactivate is selected and confirmed | the target account becomes inactive, current sessions end, and new sign-in is blocked. |
| AC2 | Inactive account sees clear message | an admin account is inactive | that admin tries to sign in | the system displays: ***تم إيقاف هذا الحساب. يرجى التواصل مع مسؤول النظام. (This account has been deactivated. Please contact your system administrator.)*** |
| AC3 | Reactivation restores access | an admin account is inactive | Reactivate is selected and confirmed | the target account becomes active again and can sign in with the existing password. |
| AC4 | Self-deactivation is blocked | the acting admin is viewing the user list | the acting admin tries to deactivate the same account they are using | the system displays: ***لا يمكنك إيقاف حسابك الشخصي. (You cannot deactivate your own account.)*** |
| AC5 | Access changes are logged | a deactivation or reactivation happens | the action completes | the action is recorded in the audit log with the acting admin, target account, and time. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Full Name | Yes | Yes | Text search |
| Email Address | Yes | Yes | Text search |
| Role | No | Yes | Dropdown: Admin, Super Admin |
| Status | No | Yes | Dropdown: Active, Inactive, Locked |
| Last Sign-In | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on admin accounts already existing.

---

## Epic: Agency Management

## US-39 | (Admin) suspends active agency account

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Agency Management |

### User Story Statement

- **As a…** an admin handling a compliance or misuse concern
- **I want to…** suspend an active agency account
- **So that…** the agency cannot keep using the portal while the issue is reviewed

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Suspension ends access | an agency account is active | Suspend is selected, a reason is entered, and the action is confirmed | the agency status becomes Suspended and current portal sessions end. |
| AC2 | Suspended agency cannot sign in | an agency account is suspended | the agency tries to sign in | the system displays: ***تم تعليق حساب الوكالة. يرجى التواصل مع الدعم لمزيد من المعلومات. (The agency account has been suspended. Please contact support for more information.)*** |
| AC3 | Submitted inquiries continue | an agency account is suspended | the agency already has submitted inquiries in progress | those inquiries continue through processing. |
| AC4 | Empty reason is blocked | the admin selected Suspend | confirmation is attempted without a reason | the system displays: ***سبب التعليق مطلوب قبل المتابعة. (A suspension reason is required before you continue.)*** |
| AC5 | Suspension is logged | a suspension is confirmed | the action completes | the suspension is recorded in the audit log with the acting admin, target agency, reason, and time. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Suspension Reason** | Textarea | Yes | Min 10 characters. Max 500 characters | ***يرجى إدخال سبب التعليق بحد أدنى 10 أحرف. (Please enter a suspension reason with at least 10 characters.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Agency Name | Yes | Yes | Text search |
| Agency ID | No | Yes | Text search |
| Registered Email | Yes | Yes | Text search |
| Current Status | No | Yes | Dropdown: Active, Suspended |
| Last Activity | Yes | Yes | Date range |
| Active Inquiries | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-40 | (Admin) reactivates suspended agency account

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Agency Management |

### User Story Statement

- **As a…** an admin who resolved the issue behind a suspension
- **I want to…** reactivate the suspended agency account
- **So that…** the agency can return to normal portal use without losing its data

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Reactivation restores active status | an agency account is suspended | Reactivate is selected and confirmed | the agency status becomes Active again. |
| AC2 | Agency can use portal again | an agency account was reactivated | the agency signs in | the portal opens with the agency’s existing data and access. |
| AC3 | Reactivation email is sent | an agency account was reactivated | the action completes | a reactivation email is sent to the agency’s registered email address. |
| AC4 | Reactivate action is limited to suspended accounts | the admin is viewing the agency list | a row is not in Suspended status | the Reactivate action is not shown for that row. |
| AC5 | Reactivation is logged | a reactivation is confirmed | the action completes | the reactivation is recorded in the audit log with the acting admin, target agency, and time. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Agency Name | Yes | Yes | Text search |
| Agency ID | No | Yes | Text search |
| Registered Email | Yes | Yes | Text search |
| Current Status | No | Yes | Dropdown: Active, Suspended |
| Last Activity | Yes | Yes | Date range |
| Active Inquiries | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on suspended agency accounts already existing.

---

## Epic: Inquiry Monitoring & Operations

## US-41 | (Admin) views live processing queue

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Inquiry Monitoring & Operations |

### User Story Statement

- **As a…** an admin monitoring daily operations
- **I want to…** see all inquiries that are currently under processing in one queue
- **So that…** I can track work in progress and open any record that needs attention

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Queue loads active processing records | the admin opens the Processing Queue screen | the screen loads | all inquiries that are currently under processing are shown. For columns, sorting, filtering, and pagination, see the Grid Specification below. |
| AC2 | Search and filters narrow the queue | the Processing Queue screen is open | a search term or filter is applied | the queue refreshes to show only matching records. |
| AC3 | Refresh updates current queue | the Processing Queue screen is open | the admin refreshes the queue | the latest processing records are shown and records that finished processing leave the queue. |
| AC4 | Row opens inquiry details | the queue is visible | a row is selected | the matching inquiry details page opens. |
| AC5 | Empty queue state is shown | there are no inquiries under processing | the Processing Queue screen opens | the system displays: ***لا توجد استعلامات قيد المعالجة حالياً. (There are no inquiries currently under processing.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | Yes | Text search |
| Traveler Name | Yes | Yes | Text search |
| Agency Name | Yes | Yes | Text search |
| Nationality | No | Yes | Dropdown: available nationalities |
| Direction | No | Yes | Dropdown: To Egypt, From Egypt |
| Submission Time | Yes | Yes | Date range |
| Last Updated | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 25 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-42 | (Admin) exports inquiry data as CSV

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Inquiry Monitoring & Operations |

### User Story Statement

- **As a…** an admin who needs a queue data extract
- **I want to…** export the current inquiry queue results as a CSV file
- **So that…** I can review or share the data outside the portal

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Export uses current filters | the admin is on the Processing Queue screen | Export is selected | the system creates a CSV file for the current filtered result set. |
| AC2 | Headers match visible columns | the export is requested | the CSV file is created | the CSV headers match the columns shown on screen. |
| AC3 | Large export runs in background | the export result set is very large | Export is selected | the system displays: ***سيصلك بريد إلكتروني عند جاهزية الملف للتنزيل. (You will receive an email when the file is ready to download.)*** |
| AC4 | Export excludes hidden data | the CSV file is created | the file is opened | it contains only the data that the admin can view from the queue screen. |
| AC5 | Export action is logged | a CSV export is completed | the action finishes | the export is recorded in the audit log with the acting admin, filters used, and time. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Reference Number | No | Yes | Text search |
| Traveler Name | Yes | Yes | Text search |
| Agency Name | Yes | Yes | Text search |
| Nationality | No | Yes | Dropdown: available nationalities |
| Direction | No | Yes | Dropdown: To Egypt, From Egypt |
| Submission Time | Yes | Yes | Date range |
| Last Updated | Yes | No | — |
| Actions | No | No | — |

**Pagination:** Yes — 25 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) views live processing queue**.

---

## Epic: Audit & Compliance

## US-43 | (Admin) views and filters system audit log

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Audit & Compliance |

### User Story Statement

- **As a…** an admin reviewing sensitive system activity
- **I want to…** view the audit log and filter it by key fields
- **So that…** I can trace important actions and investigate issues quickly

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Audit log loads newest first | the admin opens the Audit Log screen | the screen loads | audit records are shown in reverse chronological order. For columns, sorting, filtering, and pagination, see the Grid Specification below. |
| AC2 | Date range filter works | the Audit Log screen is open | a date range is applied | only records inside that date range are shown. |
| AC3 | Actor filter works | the Audit Log screen is open | an actor name or role filter is applied | only matching records are shown. |
| AC4 | Action filters can be combined | the Audit Log screen is open | action type, affected entity, or outcome filters are applied together | the list refreshes to show only matching records. |
| AC5 | Empty state is shown for no matches | the Audit Log screen is open | the current filters return no records | the system displays: ***لا توجد سجلات مطابقة لمرشحات البحث الحالية. (There are no audit records matching the current filters.)*** |
| AC6 | Long result sets are paged | more than 50 audit records match the current filters | the list loads | the results are split into pages of 50 rows. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Timestamp | Yes | Yes | Date range |
| Actor Name | Yes | Yes | Text search |
| Actor Role | No | Yes | Dropdown: Admin, Super Admin, System |
| Action Type | No | Yes | Dropdown: available action types |
| Affected Entity | Yes | Yes | Text search |
| Details | No | No | — |
| Outcome | No | Yes | Dropdown: Success, Failed |

**Pagination:** Yes — 50 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-44 | (Admin) exports audit log as CSV

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Audit & Compliance |

### User Story Statement

- **As a…** an admin preparing an audit extract
- **I want to…** export the current audit log results as a CSV file
- **So that…** I can share or review the audit data outside the portal

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Export uses current audit filters | the admin is on the Audit Log screen | Export Audit Log is selected | the system creates a CSV file for the current filtered result set, or the full log when no filters are applied. |
| AC2 | CSV matches screen columns | the export is requested | the CSV file is created | the file contains the same column set shown on screen. |
| AC3 | Large export runs in background | the export result set is very large | Export Audit Log is selected | the system displays: ***سيصلك بريد إلكتروني عند جاهزية ملف السجل للتنزيل. (You will receive an email when the audit file is ready to download.)*** |
| AC4 | CSV opens cleanly in spreadsheet tools | the CSV file was downloaded | the file is opened in a standard spreadsheet tool | the rows and columns appear in a clean table layout. |
| AC5 | Export is itself audited | an audit log export finishes | the action completes | the export action is recorded in the audit log with the acting admin, filters used, and time. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Timestamp | Yes | Yes | Date range |
| Actor Name | Yes | Yes | Text search |
| Actor Role | No | Yes | Dropdown: Admin, Super Admin, System |
| Action Type | No | Yes | Dropdown: available action types |
| Affected Entity | Yes | Yes | Text search |
| Details | No | No | — |
| Outcome | No | Yes | Dropdown: Success, Failed |

**Pagination:** Yes — 50 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) views and filters system audit log**.

---

## Email Templates

### Template: EMAIL-PASSWORD-RESET

- **Used In:** **(Agency) resets forgotten portal password**, **(Admin) resets forgotten portal password**
- **Subject (AR):** إعادة تعيين كلمة المرور | نظام الموافقات الأمنية والاستعلامات
- **Subject (EN):** Password Reset | Security Clearance & Inquiry System

- **Body (AR):**

عزيزي/عزيزتي [Display_Name]،

تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابكم.

رابط إعادة التعيين: [Reset_Link]  
صلاحية الرابط حتى: [Expiry_DateTime]

إذا لم تطلبوا ذلك، يرجى تجاهل هذه الرسالة.

نظام الموافقات الأمنية والاستعلامات

- **Body (EN):**

Dear [Display_Name],

We received a request to reset the password for your account.

Reset link: [Reset_Link]  
Link expiry: [Expiry_DateTime]

If you did not make this request, please ignore this email.

Security Clearance & Inquiry System

---

## Deferred Notes

| Item | Note |
|---|---|
| Agency profile update and document renewal | Deferred to a later release. |
| Shared-ticket group batch flow | Deferred to a later release. |
| Wallet history and batch draft saving | Covered in MVP and not repeated in Release 1. |