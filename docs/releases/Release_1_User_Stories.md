# Security Clearance & Inquiry System
## Release 1 — User Stories

*Scope: To Egypt + From Egypt | Email notifications only | Account safety flows | Batch traveler edit and removal | Agency profile page | Admin 2FA and session management | Operator read-only back-office access | Agency Representative portal access | Localization & RTL/LTR | Password management & first-login enforcement | System health monitoring | Full admin back-office | Transit stops: max 3*

*30 active stories — 11 Agency + 1 Representative + 17 Admin + 1 Operator*

---

## Personas

| Persona | Scope | Description |
|---|---|---|
| **Agency** | Portal | The approved travel agency account that signs in to the portal, submits inquiries, tracks results, edits saved batch travelers before submission, and downloads approval documents. |
| **Representative** | Portal | An account created by the agency owner. Can access batch list, batch view, batch actions, and inquiry list. Cannot access wallet, profile, or dashboard. |
| **Admin** | Back-office | The back-office user who manages access, reviews agencies, monitors inquiries, and reviews audit activity. |
| **Operator** | Back-office | Read-only access to the inquiry list and inquiry details. Cannot create, edit, export, or access agency, pricing, or audit screens. |

---

## Portal Story List

- US-21 — Agency account locks after failed logins
- US-22 — Agency resets forgotten portal password
- US-27 — Agency receives inquiry status emails
- US-31 — Agency edits or removes batch travelers
- US-32 — Agency views agency profile details
- US-33 — Portal session expires after inactivity
- US-61 — Agency views representative list and actions
- US-52 — Agency creates representative login
- US-53 — Agency activates and deactivates representative
- US-54 — Representative signs in with restricted portal menu
- US-55 — Agency switches portal language and direction
- US-58 — Agency and representative change own password

## Admin Story List

- US-34 — Admin account locks after failed logins
- US-35 — Admin resets forgotten portal password
- US-62 — Admin views user list and actions
- US-36 — Admin creates and manages admin accounts
- US-37 — Admin deactivates and reactivates admin accounts
- US-39 — Admin suspends active agency account
- US-40 — Admin reactivates suspended agency account
- US-43 — Admin views and filters system audit log
- US-44 — Admin exports audit log as CSV
- US-45 — Admin back-office session expires after inactivity
- US-46 — Admin enrolls authenticator app for 2FA
- US-47 — Admin signs in with 2FA code
- US-48 — Super Admin resets another admin's 2FA device
- US-59 — Admin changes own password while signed in
- US-60 — New User sets new password on first login
- US-56 — Admin switches back-office language and direction
- US-57 — Admin views system health check page

## Operator Story List

- US-49 — Operator logs in to back-office portal

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

## US-58 | (Agency) and representative change own password

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an approved agency or representative signed in to the portal
- **I want to…** change my password from the account settings page
- **So that…** my credentials are up to date without needing the forgotten-password reset flow

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Successful change terminates sessions and redirects | the agency or representative is on the Change Password form | valid values are submitted for all three fields | the password is updated.<br>All active sessions for this account are terminated immediately.<br>The user is redirected to the portal login page with the message: ***تم تغيير كلمة المرور. يرجى تسجيل الدخول مرة أخرى. (Your password has been changed. Please sign in again.)*** |
| AC2 | Wrong current password is blocked | the Change Password form is open | an incorrect Current Password is submitted | the system displays: ***كلمة المرور الحالية غير صحيحة. (Current password is incorrect.)*** and the form is not submitted. |
| AC3 | New password same as current is blocked | the Change Password form is open | the New Password value matches the Current Password | the system displays: ***يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمة المرور الحالية. (New password must be different from the current password.)*** and the form is not submitted. |
| AC4 | Confirm password mismatch is blocked | the Change Password form is open | Confirm New Password does not match New Password | the system displays: ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** and the form is not submitted. |
| AC5 | Password policy not met is blocked | the Change Password form is open | a New Password that does not meet the policy is submitted | the policy error message is displayed and the form is not submitted. For field constraints and error messages, see the Form Validation table below. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Current Password** | Password | Yes | Required. No format constraints are shown to protect account security | ***كلمة المرور الحالية غير صحيحة. (Current password is incorrect.)*** |
| **New Password** | Password | Yes | Min 8 characters. Must include one uppercase letter, one lowercase letter, one number, and one special character | ***يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm New Password** | Password | Yes | Must exactly match New Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |

### Scope Boundaries

This story covers the portal password change for Agency and Representative accounts. The back-office equivalent is **(Admin) changes own password while signed in**. First-login forced password change is covered in **(New User) sets new password on first login**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on an active Agency or Representative session being in place.

---

## Epic: Inquiry Tracking & Results

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

## Epic: Batch Inquiry

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

## Epic: Profile Management

## US-32 | (Agency) views agency profile details

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Profile Management |

### User Story Statement

- **As a…** an approved agency owner maintaining the portal account
- **I want to…** view my agency profile details on a dedicated page
- **So that…** I can quickly check the current agency information saved in the portal

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Profile page shows saved details | the agency is signed in to the portal | the Agency Profile page is opened | the page shows the saved values for:<br>- Agency Name<br>- Contact Person Name<br>- Contact Email<br>- Contact Phone<br>- Country<br>- City<br>- Office Address |
| AC2 | Profile page is read-only | the agency is on the Agency Profile page | the page loads | no Edit Profile button, Save button, Cancel button, or editable input fields are shown. |
| AC3 | Missing optional data shows clear placeholder | the agency is on the Agency Profile page | a profile field has no saved value | the page shows a clear empty placeholder for that field instead of a broken or blank layout. |
| AC5 | Representative access remains blocked | a representative is signed in | the representative navigates to the Agency Profile page | the system displays: ***ليس لديك صلاحية الوصول لهذه الصفحة. (You do not have permission to access this page.)*** and the representative is redirected to Batch List. |

### Scope Boundaries

This story covers viewing agency profile details only. Representative creation and status management are defined in **(Agency) creates representative login** and **(Agency) activates and deactivates representative**. Portal password change is defined in **(Agency) and representative change own password**. Profile editing and document renewal remain deferred to a later release.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on the existing approved agency portal session from MVP.

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
| AC1 | Warning appears before timeout | the agency has been inactive for 10 minutes until 2 minutes before timeout | the warning point is reached | the system displays: ***ستنتهي جلستك قريباً بسبب عدم النشاط. (Your session will expire soon due to inactivity.)*** with a countdown and a Stay Signed In action. |
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

## Epic: Account & Representative Management

## US-61 | (Agency) views representative list and actions

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Account & Representative Management |

### User Story Statement

- **As a…** an approved agency owner managing portal access
- **I want to…** open a representative page that shows my representative accounts and their row actions
- **So that…** I can review access quickly and start the right action for each representative

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Representative page loads with grid | the agency owner opens Representative Management | the page loads | the representative grid is shown. For columns and row actions, see the Grid Specification below. |
| AC2 | Add action is available from page | the representative grid is open | Add Representative is selected | the Add Representative form opens. |
| AC3 | Active row shows active-account action | a representative row has Active status | the row is shown | the row shows the action to deactivate that representative and does not show a Reactivate action. |
| AC4 | Inactive row shows inactive-account action | a representative row has Inactive status | the row is shown | the row shows the action to reactivate that representative and does not show a Deactivate action. |
| AC5 | Empty list shows clear next step | the agency has no representative accounts | the page loads | the system displays: ***لا يوجد ممثلون مرتبطون بهذه الوكالة حالياً. (There are no representatives linked to this agency yet.)*** and keeps the Add Representative action visible. |
| AC6 | Representative access remains blocked | a representative is signed in | the representative opens the Representative Management page directly | the system displays: ***ليس لديك صلاحية الوصول لهذه الصفحة. (You do not have permission to access this page.)*** and the representative is redirected to Batch List. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Full Name | No | No | — |
| Username | No | No | — |
| Email Address | No | No | — |
| Status | No | No | — |
| Last Sign-In | No | No | — |
| Actions | No | No | — |

**Pagination:** No sorting, filtering, or pagination needed — the grid shows a maximum of 5 representative accounts.

### Scope Boundaries

This story covers the representative list page and the action entry points only. Representative account creation is defined in **(Agency) creates representative account**. Representative activation and deactivation outcomes are defined in **(Agency) activates and deactivates representative**. Representative sign-in restrictions are defined in **(Representative) signs in with restricted portal menu**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-52 | (Agency) creates representative account

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Account & Representative Management |

### User Story Statement

- **As a…** an approved agency owner managing their portal account
- **I want to…** create a representative login from my account settings
- **So that…** a representative can access the portal on behalf of the agency

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Valid form creates account and sends email | the agency owner is on the Add Representative form | all fields are completed with valid values and the form is submitted | the representative account is created.<br>A welcome email is sent to the representative's email address with their login credentials and instructions to change the password on first login.<br>The new representative appears in the representative list. |
| AC2 | Duplicate email is blocked | the Add Representative form is open | an email address already used by another representative in the same agency is submitted | the system displays: ***يوجد حساب مرتبط بهذا البريد الإلكتروني بالفعل. (An account with this email address already exists.)*** and the form is not submitted. |
| AC3 | Duplicate username is blocked | the Add Representative form is open | a username already used by another representative in the same agency is submitted | the system displays: ***اسم المستخدم هذا مستخدم بالفعل. يرجى اختيار اسم آخر. (This username is already taken. Please choose a different one.)*** and the form is not submitted. |


### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Full Name** | Text | Yes | Min 2 characters. Max 100 characters | ***الاسم الكامل مطلوب ويجب أن يكون بين حرفين و100 حرف. (Full name is required and must be between 2 and 100 characters.)*** |
| **Email** | Email | Yes | Valid email format. Must be unique within the agency | ***يرجى إدخال بريد إلكتروني صحيح وفريد. (Please enter a valid and unique email address.)*** |
| **Username** | Text | Yes | 4 to 30 characters. Letters and numbers only. Must be unique within the agency | ***اسم المستخدم مطلوب ويجب أن يكون بين 4 و30 حرفاً وأرقاماً فقط. (Username is required and must be 4 to 30 alphanumeric characters.)*** |
| **Temporary Password** | Password | Yes | Min 8 characters. Must include one uppercase letter, one lowercase letter, one number, and one special character | ***يجب أن تكون كلمة المرور المؤقتة 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (The temporary password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm Temporary Password** | Password | Yes | Must exactly match Temporary Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |


### Scope Boundaries

This story covers account creation only. The representative list page and action entry points are defined in **(Agency) views representative list and actions**. Status changes for existing representative accounts are defined in **(Agency) activates and deactivates representative**. Representative sign-in behavior and menu restrictions are defined in **(Representative) signs in with restricted portal menu**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-53 | (Agency) activates and deactivates representative

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Account & Representative Management |

### User Story Statement

- **As a…** an approved agency owner managing representatives
- **I want to…** toggle a representative's status between Active and Inactive
- **So that…** I can control portal access for representatives without deleting their accounts or history

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Confirmation required before toggle | the agency owner is on the representative list | the status toggle is selected for a representative | the system displays: ***سيتم تغيير حالة هذا الحساب. هل أنت متأكد؟ (This account status will be changed. Are you sure?)*** before any change is applied. |
| AC2 | Toggle to Inactive blocks representative login | the confirmation modal is open | the agency owner confirms the toggle to Inactive | the representative's status changes to Inactive in the grid.<br>The representative cannot sign in until the status is set back to Active. |
| AC3 | Toggle to Active restores representative access | a representative account is Inactive | the agency owner confirms the toggle to Active | the representative's status changes to Active in the grid.<br>The representative can sign in again. |
| AC4 | Inquiry history is not affected by toggle | a representative has inquiry history | the agency owner toggles the representative to Inactive or Active | all previous inquiry history linked to the representative remains unchanged after the toggle. |
| AC5 | Grid shows current status after toggle | the agency owner confirmed a status toggle | the representative list reloads | the row for the changed representative shows the updated status. |


### Scope Boundaries

This story covers status toggling only. The representative list page and action entry points are defined in **(Agency) views representative list and actions**. Account creation is defined in **(Agency) creates representative account**. Representative sign-in behavior and menu restrictions are defined in **(Representative) signs in with restricted portal menu**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on at least one representative account existing, created via **(Agency) creates representative login**.

---

## US-54 | (Representative) signs in with restricted portal menu

| Field | Value |
|---|---|
| **Persona** | Representative |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Account & Representative Management |

### User Story Statement

- **As a…** a representative with a portal account created by the agency
- **I want to…** sign in to the portal and see only the screens I am allowed to access
- **So that…** I can work on batch and inquiry tasks without seeing agency-sensitive screens

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Login succeeds and shows restricted menu | the representative is on the portal login screen | valid credentials are submitted | the representative is signed in.<br>The portal menu shows only:<br>- Batch List<br>- Inquiry List |
| AC2 | Restricted pages absent from navigation | the representative is signed in | the portal navigation is visible | Dashboard, Wallet, and Profile links are not visible in the navigation. |
| AC3 | Direct URL to restricted page is blocked | the representative is signed in | the representative navigates directly to /dashboard, /wallet, or /profile | the system displays: ***ليس لديك صلاحية الوصول لهذه الصفحة. (You do not have permission to access this page.)*** and the representative is redirected to Batch List. |
| AC4 | Inactive representative login is blocked | the representative account has Inactive status | the representative tries to sign in with valid credentials | the system displays: ***هذا الحساب غير نشط حالياً. يرجى التواصل مع مدير الوكالة. (This account is currently inactive. Please contact your agency manager.)*** |
| AC5 | Invalid credentials show generic error | the representative is on the portal login screen | an incorrect password or unknown username is submitted | the system displays: ***البريد الإلكتروني أو كلمة المرور غير صحيحة. (Email or password is incorrect.)*** |

### Scope Boundaries

This story covers representative login and menu restrictions only. Account creation is defined in **(Agency) creates representative login**. Account activation and deactivation are defined in **(Agency) activates and deactivates representative**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on a representative account existing, created via **(Agency) creates representative login**.

---

## Epic: Localization

## US-55 | (Agency) switches portal language and direction

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 1 |
| **Epic** | Localization |

### User Story Statement

- **As a…** an approved agency or representative using the portal
- **I want to…** switch the portal language between Arabic and English
- **So that…** I can use the portal in the language I am most comfortable with

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Language toggle is visible on all pages | the agency or representative is signed in | any portal page is open | a language toggle is visible in the portal header. |
| AC2 | Switching to Arabic applies RTL layout | the portal is currently in English | Arabic (AR) is selected from the language toggle | all UI text switches to Arabic.<br>The page layout direction changes to right-to-left. |
| AC3 | Switching to English applies LTR layout | the portal is currently in Arabic | English (EN) is selected from the language toggle | all UI text switches to English.<br>The page layout direction changes to left-to-right. |
| AC4 | Language preference persists after logout | the user switched the portal language | the user logs out and signs in again | the portal opens in the last selected language with the matching layout direction. |


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
| AC2 | Threshold reached locks account (5 Attempts) | the admin is on the sign-in page | the lockout threshold is reached | the system displays: ***تم قفل الحساب مؤقتاً بسبب محاولات تسجيل الدخول غير الناجحة. يرجى إعادة تعيين كلمة المرور أو التواصل مع مسؤول النظام. (The account has been temporarily locked due to failed sign-in attempts. Please reset your password or contact your system administrator.)*** |
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

## US-62 | (Admin) views user list and actions

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin responsible for back-office access control
- **I want to…** open a user management page that lists admin and operator accounts with row actions
- **So that…** I can review account access and start the correct action from one place

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | User management page loads | the admin opens User Management | the page loads | admin and operator accounts are shown in a grid. For columns, filters, and pagination, see the Grid Specification below. |
| AC2 | Create action is available from page | the user grid is open | Create User is selected | the user creation form opens. |
| AC3 | Search and filters narrow rows | the user grid is open | a name search, role filter, or status filter is applied | only matching rows remain in the grid. |
| AC4 | Active and inactive rows show correct actions | a user row has Active or Inactive status | the row is shown | Active rows show Deactivate and role management actions.<br>Inactive rows show Reactivate and role management actions. |
| AC5 | Locked rows show locked-account action | a user row has Locked status | the row is shown | the row shows the Unlock action and does not show Deactivate or Reactivate. |
| AC6 | No-match filters show empty state | the user grid is open | the current search and filters return no rows | the system displays: ***لا توجد حسابات مطابقة لمرشحات البحث الحالية. (There are no user accounts matching the current filters.)*** |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Full Name | Yes | Yes | Text search |
| Email Address | Yes | Yes | Text search |
| Role | No | Yes | Dropdown: Admin, Operator |
| Account Status | No | Yes | Dropdown: Active, Inactive, Locked |
| Last Sign-In | Yes | Yes | Date range |
| Actions | No | No | — |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### Scope Boundaries

This story covers the user list page and the action entry points only. User creation and role changes are defined in **(Admin) creates and manages admin accounts**. Deactivation and reactivation are defined in **(Admin) deactivates and reactivates admin accounts**. Locked-account behavior is defined in **(Admin) account locks after failed logins**.

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


### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Full Name** | Text | Yes | Min 2 characters. Max 150 characters | ***الاسم الكامل مطلوب ويجب أن يكون بين حرفين و150 حرفاً. (Full name is required and must be between 2 and 150 characters.)*** |
| **Email Address** | Email | Yes | Valid email format. Must be unique | ***يرجى إدخال بريد إلكتروني صحيح وفريداً. (Please enter a valid and unique email address.)*** |
| **Role** | Select | Yes | Admin or Operator | ***يرجى اختيار الدور. (Please select the role.)*** |
| **Temporary Password** | Password | Yes | Min 8 characters. Must include an uppercase letter, a lowercase letter, a number, and a special character | ***يجب أن تكون كلمة المرور المؤقتة 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (The temporary password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |

### Scope Boundaries

This story covers user creation and role management only. The user list page and action entry points are defined in **(Admin) views user list and actions**. Deactivation and reactivation are defined in **(Admin) deactivates and reactivates admin accounts**.


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
| AC2 | Inactive account sees clear message | an admin account is inactive, including after five wrong 2FA codes | that admin tries to sign in | the system displays: ***تم إيقاف هذا الحساب. يرجى التواصل مع مسؤول النظام. (This account has been deactivated. Please contact your system administrator.)*** |
| AC3 | Reactivation restores access | an admin account is inactive, including after five wrong 2FA codes | Reactivate is selected and confirmed | the target account becomes active again and can sign in with the existing password. |
| AC4 | Self-deactivation is blocked | the acting admin is viewing the user list | the acting admin tries to deactivate the same account they are using | the system displays: ***لا يمكنك إيقاف حسابك الشخصي. (You cannot deactivate your own account.)*** |


### Scope Boundaries

This story covers deactivation and reactivation only, including accounts that became inactive after five wrong 2FA codes. The user list page and action entry points are defined in **(Admin) views user list and actions**. User creation and role management are defined in **(Admin) creates and manages admin accounts**.


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
| AC1 | Children representitive suspension | an agency account is active | Suspend is selected, a reason is entered, and the action is confirmed | all agency representitves status becomes Suspended and current portal sessions end. |
| AC2 | Suspended agency cannot sign in | an agency account is suspended | the agency tries to sign in | the system displays: ***تم تعليق حساب الوكالة. يرجى التواصل مع الدعم لمزيد من المعلومات. (The agency account has been suspended. Please contact support for more information.)*** |
| AC3 | Submitted inquiries continue | an agency account is suspended | the agency already has submitted inquiries in progress | those inquiries continue through processing. |
| AC4 | Empty reason is blocked | the admin selected Suspend | confirmation is attempted without a reason | the system displays: ***سبب التعليق مطلوب قبل المتابعة. (A suspension reason is required before you continue.)*** |
| AC6 | Active session ends on suspension | the agency has an active portal session at the time of suspension | an admin confirms the suspension | the agency's active session is terminated immediately.<br>The next portal request from that session shows: ***تم تعليق حساب الوكالة. يرجى التواصل مع الدعم لمزيد من المعلومات. (The agency account has been suspended. Please contact support for more information.)*** |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Suspension Reason** | Textarea | Yes | Min 10 characters. Max 500 characters | ***يرجى إدخال سبب التعليق بحد أدنى 10 أحرف. (Please enter a suspension reason with at least 10 characters.)*** |



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



### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on suspended agency accounts already existing.

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

## Epic: Authentication & Access

## US-45 | (Admin) back-office session expires after inactivity

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** a back-office user (Admin or Operator) on a shared or unattended device
- **I want to…** be signed out after 30 minutes of no activity
- **So that…** the back-office stays secure if I step away from my desk

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Inactivity timeout redirects to login | a back-office user has been inactive for 30 minutes | the timeout is reached | the session ends and the user is redirected to the login page with the message: ***جلسة العمل انتهت. يرجى تسجيل الدخول مرة أخرى. (Your session has expired. Please sign in again.)*** |
| AC2 | Re-login returns user to last page | the session expired while the user was on a back-office page | the user signs in again successfully | the user returns to the page they were on before the timeout. |
| AC3 | Interaction resets inactivity timer | a back-office user is active | the user moves the mouse, presses a key, or navigates to a page | the 30-minute inactivity timer resets. |
| AC4 | Operator role is also affected | an Operator user has been inactive for 30 minutes | the timeout is reached | the Operator session ends and the same redirect and message apply. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## US-46 | (Admin) enrolls authenticator app for 2FA

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin setting up the back-office account for the first time
- **I want to…** enroll an authenticator app for two-factor authentication
- **So that…** my back-office account is protected by a second verification step

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | QR code and manual key are shown | the admin has reached the 2FA enrollment in registration step | the enrollment screen loads | a QR code and a manual entry key are both shown for TOTP setup. |
| AC2 | First valid code confirms enrollment | the admin scanned the QR code | the admin enters the correct 6-digit code and submits | the enrollment is verified and 2FA becomes active on the account. |
| AC3 | Invalid code blocks enrollment | the admin is on the enrollment verification step | an incorrect 6-digit code is entered | the system displays: ***الرمز الذي أدخلته غير صحيح. يرجى التحقق من التطبيق والمحاولة مرة أخرى. (The code you entered is not correct. Please check your app and try again.)*** |
| AC4 | Backup codes shown with acknowledgement required | enrollment verification succeeds | the backup code screen loads | 8 one-time backup codes are shown.<br>The Continue button stays disabled until the admin checks: ***لقد حفظت هذه الرموز في مكان آمن. (I have saved these codes in a safe place.)*** |
| AC5 | Enrollment cannot be skipped | the admin is on the 2FA enrollment screen | the admin tries to leave without completing enrollment | the admin stays on the enrollment screen and cannot access the back-office until enrollment is complete. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **6-Digit Verification Code** | Text | Yes | Exactly 6 digits. Numbers only | ***يرجى إدخال رمز مكوّن من 6 أرقام. (Please enter a 6-digit code.)*** |
| **Backup Code Acknowledgement** | Checkbox | Yes | Must be checked before the Continue button is enabled | ***يجب تأكيد حفظ الرموز الاحتياطية قبل المتابعة. (You must confirm you have saved the backup codes before continuing.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on an admin account existing, created via **(Admin) creates and manages admin accounts**.

---

## US-47 | (Admin) signs in with 2FA code

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an admin with 2FA enrolled on the back-office account
- **I want to…** enter a 6-digit code from my authenticator app after my password is accepted
- **So that…** back-office access requires proof of identity beyond just a password

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | 2FA prompt shown after correct password | the admin entered the correct username and password | the system confirms the password | the 2FA code entry screen is shown. |
| AC2 | Valid TOTP code grants access | the admin is on the 2FA code entry screen | a valid 6-digit TOTP code is entered | the admin is signed in and the back-office home screen opens. |
| AC3 | Invalid code shows error | the admin is on the 2FA code entry screen | an incorrect 6-digit code is entered | the system displays: ***رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى. (Verification code is incorrect. Please try again.)*** and the failed-attempt count increases by one. |
| AC4 | Five consecutive failures make account inactive | the admin has entered 4 incorrect codes already | a fifth incorrect code is entered | the admin account becomes Inactive and the system displays: ***تم إيقاف هذا الحساب بعد محاولات متكررة لرمز تحقق غير صحيح. يرجى التواصل مع مسؤول آخر لإعادة تفعيل الحساب. (This account has been deactivated after repeated incorrect verification code attempts. Please contact another administrator to reactivate the account.)*** |
| AC5 | Backup code accepted as alternative | the admin is on the 2FA code entry screen | a valid one-time backup code is entered | the admin is signed in and the used backup code is marked as consumed. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Verification Code** | Text | Yes | Exactly 6 digits. Numbers only | ***يرجى إدخال رمز مكوّن من 6 أرقام. (Please enter a 6-digit code.)*** |

### Scope Boundaries

This story covers the 2FA sign-in step and the account inactivation that happens after five consecutive wrong 2FA codes. Authenticator enrollment is defined in **(Admin) enrolls authenticator app for 2FA**. Account reactivation after the inactivation is defined in **(Admin) deactivates and reactivates admin accounts**. Lost-device recovery is defined in **(Super Admin) resets another admin's 2FA device**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) enrolls authenticator app for 2FA** and **(Admin) deactivates and reactivates admin accounts**.

---

## US-48 | (Super Admin) resets another admin's 2FA device

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** a Super Admin managing back-office accounts
- **I want to…** reset the 2FA device for another admin account
- **So that…** an admin who lost access to their authenticator app can re-enroll and regain access

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Reset 2FA action hidden from non-Super Admins | an admin account row is visible in the admin user list | a user with the Admin role views the row | the Reset 2FA Device action is not shown. |
| AC2 | Reset 2FA action visible to Super Admin | an admin account row is visible in the admin user list | a Super Admin views the row | the Reset 2FA Device action is shown. |
| AC3 | Confirmation required before reset applies | a Super Admin selects Reset 2FA Device for a target admin | the action is triggered | a confirmation modal is shown before the reset is applied. |
| AC4 | Affected admin must re-enroll on next login | a Super Admin confirms the 2FA reset | the reset completes | the target admin's 2FA enrollment is removed.<br>On the next login, the target admin is taken through the 2FA enrollment flow before accessing the back-office. |
| AC5 | Reset recorded in audit log | a 2FA device reset is confirmed | the action completes | the audit log records the acting Super Admin's name, the target admin's name, and the timestamp. |

### Scope Boundaries

This story covers only the 2FA device reset action for lost-device recovery. Wrong-code 2FA inactivation behavior is defined in **(Admin) signs in with 2FA code**. Account reactivation after that inactivation is defined in **(Admin) deactivates and reactivates admin accounts**. Admin account creation and management are defined in **(Admin) creates and manages admin accounts**. The re-enrollment flow the affected admin goes through after the reset is defined in **(Admin) enrolls authenticator app for 2FA**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) creates and manages admin accounts** and **(Admin) enrolls authenticator app for 2FA**.

---

## US-59 | (Admin) changes own password while signed in

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** an Admin or Operator signed in to the back-office
- **I want to…** change my password from the account settings page
- **So that…** my credentials are up to date without needing the forgotten-password reset flow

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Successful change terminates session and redirects | the Admin or Operator is on the Change Password form | valid values are submitted for all three fields | the password is updated.<br>The current session is terminated immediately.<br>The user is redirected to the back-office login page with the message: ***تم تغيير كلمة المرور. يرجى تسجيل الدخول مرة أخرى. (Your password has been changed. Please sign in again.)*** |
| AC2 | Wrong current password is blocked | the Change Password form is open | an incorrect Current Password is submitted | the system displays: ***كلمة المرور الحالية غير صحيحة. (Current password is incorrect.)*** and the form is not submitted. |
| AC3 | New password same as current is blocked | the Change Password form is open | the New Password value matches the Current Password | the system displays: ***يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمة المرور الحالية. (New password must be different from the current password.)*** and the form is not submitted. |
| AC4 | Confirm password mismatch is blocked | the Change Password form is open | Confirm New Password does not match New Password | the system displays: ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** and the form is not submitted. |
| AC5 | Password policy not met is blocked | the Change Password form is open | a New Password that does not meet the policy is submitted | the policy error message is displayed and the form is not submitted. For field constraints and error messages, see the Form Validation table below. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Current Password** | Password | Yes | Required. No format constraints are shown to protect account security | ***كلمة المرور الحالية غير صحيحة. (Current password is incorrect.)*** |
| **New Password** | Password | Yes | Min 8 characters. Must include one uppercase letter, one lowercase letter, one number, and one special character | ***يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm New Password** | Password | Yes | Must exactly match New Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |

### Scope Boundaries

This story covers the back-office password change for Admin and Operator accounts. The Agency portal equivalent is **(Agency) changes own password while signed in**. First-login forced password change is covered in **(New User) sets new password on first login**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on an active Admin or Operator session being in place.

---

## US-60 | (New User) sets new password on first login

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Authentication & Access |

### User Story Statement

- **As a…** a newly created Admin, Operator, or Agency Representative signing in for the first time
- **I want to…** be required to set a new password right after my temporary credentials are accepted
- **So that…** my account is protected with a password only I know before I access any features

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Password-change screen shown immediately on first login | a new account is being used for the first time | the temporary credentials are accepted | the system shows the mandatory password-change screen immediately.<br>No dashboard or other protected page is shown until the new password is set. |
| AC2 | Navigation blocked until password is set | the first-login password-change screen is open | the user tries to navigate to any other page | the user stays on the password-change screen. No protected page is accessible. |
| AC3 | Temporary password cannot be reused | the first-login password-change screen is open | a New Password matching the temporary password is submitted | the system displays: ***لا يمكن إعادة استخدام كلمة المرور المؤقتة. يرجى اختيار كلمة مرور جديدة. (The temporary password cannot be reused. Please choose a new password.)*** and the form is not submitted. |
| AC4 | Password policy is enforced | the first-login password-change screen is open | a New Password that does not meet policy rules is submitted | the policy error message is displayed and the form is not submitted. For field constraints and error messages, see the Form Validation table below. |
| AC5 | Successful change continues the session | the first-login password-change screen is open | a valid New Password is submitted and confirmed | the password is updated and the session continues normally.<br>The user lands on the home screen for their role. |
| AC6 | Incomplete change re-appears on next login | the first-login password-change screen is open | the user closes the browser before completing the change | on the next login with the temporary credentials, the password-change screen is shown again immediately. The dashboard is not shown. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **New Password** | Password | Yes | Min 8 characters. Must include one uppercase letter, one lowercase letter, one number, and one special character | ***يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص. (Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.)*** |
| **Confirm New Password** | Password | Yes | Must exactly match New Password | ***كلمتا المرور غير متطابقتين. (Passwords do not match.)*** |

### Scope Boundaries

This story covers the first-login forced password change for Admin, Operator, and Agency Representative accounts. Voluntary password changes after first login are covered in **(Agency) changes own password while signed in** and **(Admin) changes own password while signed in**.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on a new account being created with a temporary password via **(Agency) creates representative login** or **(Admin) creates and manages admin accounts**.

---

## Epic: System Settings

## US-56 | (Admin) switches back-office language and direction

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 1 |
| **Epic** | System Settings |

### User Story Statement

- **As a…** an Admin or Operator using the back-office portal
- **I want to…** switch the back-office language between Arabic and English
- **So that…** I can work in the language I am most comfortable with

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Language toggle visible on all back-office pages | the Admin or Operator is signed in | any back-office page is open | a language toggle is visible in the back-office header. |
| AC2 | Switching language flips direction | any back-office page is open | a language is selected from the toggle | all UI text switches to the selected language.<br>The page layout direction changes to match: right-to-left for Arabic, left-to-right for English. |
| AC3 | Operator preference also persists | an Operator switched the back-office language | the Operator logs out and signs in again | the back-office opens in the last selected language with the matching layout direction. |
| AC4 | New accounts default to Arabic | a new Admin or Operator account is used for the first time | the user signs in for the first time | the back-office opens in Arabic with right-to-left layout. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

## Epic: System Monitoring

## US-57 | (Admin) views system health check page

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 1 |
| **Epic** | System Monitoring |

### User Story Statement

- **As a…** an Admin responsible for system operations
- **I want to…** open a system health check page that shows the status of all key services
- **So that…** I can quickly identify which service is causing a problem

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Page shows all 6 service rows | the Admin opens the System Health Check page | the page loads | the page shows one row for each of the following services:<br>- Application Server<br>- Database<br>- ESC Payment Gateway<br>- Clearance Engine API<br>- Email Service<br>- File Storage<br>Each row shows: Status badge (Online / Degraded / Offline), Last Checked timestamp, and Response Time in milliseconds. |
| AC2 | Degraded or Offline service triggers banner | the System Health Check page is open | at least one service shows a Degraded or Offline status | a banner is shown at the top of the page: ***أحد أنظمة التشغيل يعاني من مشكلة. تحقق من التفاصيل أدناه. (One or more systems are experiencing issues. Check the details below.)*** |
| AC3 | All services Online hides the banner | the System Health Check page is open | all 6 services show an Online status | no alert banner is shown on the page. |
| AC4 | Auto-refresh countdown is visible | the System Health Check page is open | the page is active | a visible countdown shows the time until the next automatic page refresh.<br>The page refreshes every 60 seconds and the countdown resets to 60 after each refresh. |
| AC5 | Operator access is blocked | an Operator is signed in | the Operator tries to open the System Health Check page | the system displays: ***ليس لديك صلاحية الوصول لهذه الصفحة. (You do not have permission to access this page.)*** and the Operator is redirected to the Inquiry List. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Service Name | No | No | — |
| Status | No | No | — |
| Last Checked | No | No | — |
| Response Time (ms) | No | No | — |

No sorting, filtering, or pagination needed — the page always shows exactly 6 service rows.

### Scope Boundaries

This is a standalone Admin diagnostics page. Operator access denial is enforced by the role guard. No adjacent workflow stories.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met.

---

# Back-office — Operator Stories

## Epic: Inquiry Monitoring

## US-49 | (Operator) logs in to back-office portal

| Field | Value |
|---|---|
| **Persona** | Operator |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 1 |
| **Epic** | Inquiry Monitoring |

### User Story Statement

- **As a…** an Operator with a back-office account
- **I want to…** sign in to the back-office portal using the same login screen as Admin
- **So that…** I can access the inquiry list with the correct read-only access

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Operator login succeeds | the Operator is on the back-office login screen | valid credentials are submitted | the Operator is signed in and the Inquiry List page is shown. |
| AC2 | Only Inquiries appears in the menu | the Operator is signed in | the back-office menu is visible | only the Inquiries menu item is shown.<br>The following items are absent: Agencies, Pricing, Audit Log, Admin Accounts, Agency Approval Queue. |
| AC3 | Direct URL to a hidden page is blocked | the Operator is signed in | the Operator navigates directly to a URL for Agencies, Pricing, Audit Log, Admin Accounts, or Agency Approval Queue | the system displays: ***ليس لديك صلاحية الوصول لهذه الصفحة. (You do not have permission to access this page.)*** and the Operator is redirected to the Inquiry List. |
| AC4 | Inquiry pages open in read-only mode | the Operator is signed in | the Operator opens the Inquiry List page or an Inquiry Details page | both pages are available to the Operator in read-only mode.<br>No Export button, no row-level edit controls, and no override or reassignment actions are shown. |
| AC5 | Role is identified correctly | the Operator is signed in | the user role label is viewed in the back-office | the role shown is Operator, not Admin or Super Admin. |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Valid email format | ***يرجى إدخال بريد إلكتروني صحيح. (Please enter a valid email address.)*** |
| **Password** | Password | Yes | Required. Not blank | ***كلمة المرور مطلوبة. (Password is required.)*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on an Operator account existing, created via **(Admin) creates and manages admin accounts**.

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
| Agency document renewal | Deferred to a later release. |
| Shared-ticket group batch flow | Deferred to a later release. |
| Wallet history and batch draft saving | Covered in MVP and not repeated in Release 1. |