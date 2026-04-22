# Security Clearance & Inquiry System
## Release 2 — User Stories

*Scope: Individual traveler self-service portal — registration, eligibility check, inquiry submission, ESC payment, result tracking, approval document download | To Egypt + From Egypt (CH-1) | Structured transit stops (CH-2)*

*23 stories — 23 Individual*

---

## Personas

| Persona | Scope | Description |
|---|---|---|
| **Individual** | Portal | A citizen or independent traveller who submits security inquiries directly through the portal, tracks their inquiry status, and downloads approval documents upon clearance. |

---

## Document Summary

| Item | Count |
|---|---|
| Total Release 2 Stories | 23 |
| Individual Stories | 23 |
| Priority 1 — Critical | 17 |
| Priority 2 — High | 4 |
| Priority 3 — Medium | 2 |

---

# Portal — Individual Stories

## Epic: Account Registration & Authentication

## US-01 | (Individual) registers portal account with OTP

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Account Registration & Authentication |

### User Story Statement

- **As a…** a first-time individual traveler who needs to submit a security inquiry
- **I want to…** register a new account on the portal by providing my basic details and verifying my identity via a one-time password (OTP)
- **So that…** I can access the portal and begin submitting security inquiries without visiting a physical office

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user opens the portal and clicks 'Create Account' | they enter a valid full name, email address, mobile number, and password that meets policy requirements | the system creates a pending account and sends an OTP to the provided email and mobile number within 60 seconds. |
| AC2 | the registration form is submitted | the OTP is entered correctly within the validity window | the account is activated and the user is redirected to the portal homepage with a success message. |
| AC3 | the user attempts to register | they enter an email or mobile number already associated with an existing account | the system displays: 'This email/mobile is already registered. Please log in or use a different address.' and does not create a duplicate account. |
| AC4 | the user submits the registration form | any required field is empty or in an invalid format | the system highlights the specific field and displays a field-level error message before submission proceeds. |
| AC5 | the registration form is submitted successfully | the user does not enter the OTP and the validity window expires | the account remains inactive and the user must request a new OTP to complete registration. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Full Name (Arabic)** | Text | Yes | Min 3 chars, Max 100 chars, Arabic characters only | Full name in Arabic is required and must contain Arabic characters only. |
| **Full Name (English)** | Text | Yes | Min 3 chars, Max 100 chars, Latin characters only | Full name in English is required and must contain English characters only. |
| **Email Address** | Email | Yes | Valid email format, Max 254 chars, unique in system | Please enter a valid email address. |
| **Mobile Number** | Tel | Yes | Valid international format, unique in system | Please enter a valid mobile number. |
| **Password** | Password | Yes | Min 8 chars, must include uppercase, lowercase, number, and special character | Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character. |
| **Confirm Password** | Password | Yes | Must match Password field exactly | Passwords do not match. Please re-enter your password. |
| **OTP Code** | Number | Yes | 6-digit numeric code, valid within configurable window (default 10 mins) | The code you entered is incorrect or has expired. Please request a new code. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. Story is independently deliverable as the auth foundation.

---

## US-02 | (Individual) handles OTP resend and expiry

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Account Registration & Authentication |

### User Story Statement

- **As a…** an individual traveler who has started account registration but did not receive or has an expired OTP
- **I want to…** request a new OTP to be resent to my email or mobile number
- **So that…** I can complete my account activation without having to restart the registration process from the beginning

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user is on the OTP entry screen | they click 'Resend OTP' | the system sends a new OTP to the registered email and mobile and displays a confirmation message, and the previous OTP is immediately invalidated. |
| AC2 | the user clicks 'Resend OTP' | the system has already sent an OTP within the last 60 seconds | the resend button is disabled and a countdown timer shows the remaining wait time. |
| AC3 | the user has requested more than 3 OTP resends within a single session | they attempt another resend | the system blocks further attempts for 15 minutes and displays: 'Too many attempts. Please wait 15 minutes before trying again.' |
| AC4 | the OTP validity window has expired | the user enters the expired OTP | the system displays: 'This code has expired. Please request a new one.' and does not activate the account. |
| AC5 | the user closes the browser before entering the OTP | they return to the portal | the system resumes the OTP entry screen for the same pending account rather than forcing a full re-registration. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — depends on **(Individual) registers portal account with OTP** being in scope. Recommend scheduling in the same sprint as **(Individual) registers portal account with OTP**.

---

## US-03 | (Individual) logs in to the portal

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Account Registration & Authentication |

### User Story Statement

- **As a…** a registered individual traveler
- **I want to…** log in to the portal using my registered email and password
- **So that…** I can access my dashboard and all inquiry management features that require authentication

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user enters a valid email and correct password | they click 'Login' | the system authenticates the session and redirects them to the individual dashboard. |
| AC2 | the user enters an incorrect password | they click 'Login' | the system displays: 'Incorrect email or password.' and increments the failed attempt counter without revealing which field is wrong. |
| AC3 | the user's account is inactive or unverified | they attempt to log in | the system displays: 'Account not activated. Please check your email for the OTP.' and does not grant access. |
| AC4 | a successful login | the user selects 'Remember me' | the session persists for 30 days before requiring re-authentication. |
| AC5 | the user is already logged in on another device | they log in on a second device | the session on the first device is invalidated. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Email Address** | Email | Yes | Registered and verified email | Please enter a valid email address. |
| **Password** | Password | Yes | Min 8 chars matching registered password | Incorrect email or password. |
| **Remember Me** | Checkbox | No | Extends session to 30 days if checked | N/A |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. Core auth story; independently deliverable.

---

## US-04 | (Individual) account locks after failed logins

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Account Registration & Authentication |

### User Story Statement

- **As a…** a registered individual traveler whose account has exceeded the maximum failed login attempts
- **I want to…** be notified that my account is temporarily locked and understand how to regain access
- **So that…** my account is protected from brute-force attacks and I can recover access through the official unlocking process

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user enters an incorrect password | the failed attempt count reaches 5 | the account is locked for 30 minutes and the system displays: 'Your account has been locked due to too many failed attempts. Please try again in 30 minutes or reset your password.' |
| AC2 | an account is locked | a login is attempted | the system blocks the attempt and shows the lockout message regardless of whether the correct password is entered. |
| AC3 | 30 minutes have passed since the lock | the user attempts to log in with the correct password | the account unlocks automatically and login succeeds. |
| AC4 | the account is locked | the user clicks 'Forgot Password' | they can initiate the password reset flow to regain access immediately without waiting for the lockout period. |
| AC5 | a failed login attempt has triggered a lockout event | a lockout event occurs | it is recorded in the system audit log with the user's email, timestamp, and IP address. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — depends on **(Individual) logs in to the portal** being implemented. Schedule in same sprint.

---

## US-05 | (Individual) resets forgotten password via OTP

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Account Registration & Authentication |

### User Story Statement

- **As a…** a registered individual traveler who has forgotten their password
- **I want to…** reset my password by verifying my identity via a one-time OTP sent to my registered email or mobile number
- **So that…** I can regain access to my account without requiring manual admin intervention

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user clicks 'Forgot Password' on the login page | they enter their registered email | the system sends an OTP to that email and mobile and confirms: 'A reset code has been sent.' |
| AC2 | the OTP is entered correctly within 10 minutes | the user submits a new password that meets policy requirements | the password is updated and the user is redirected to the login page with a success message. |
| AC3 | the user enters an incorrect OTP | they submit the reset form | the system displays: 'Incorrect or expired code.' and does not update the password. |
| AC4 | the OTP has expired | the user attempts to submit it | the system displays: 'This code has expired. Please request a new one.' |
| AC5 | the user has successfully entered a new password and completed the reset | the password reset is completed successfully | all existing sessions for that account are immediately invalidated. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Registered Email** | Email | Yes | Must match an existing registered account | No account found with that email address. |
| **OTP Code** | Number | Yes | 6-digit code, valid within 10 minutes | Incorrect or expired code. Please request a new one. |
| **New Password** | Password | Yes | Min 8 chars, uppercase, lowercase, number, special character | Password must meet complexity requirements. |
| **Confirm Password** | Password | Yes | Must match New Password exactly | Passwords do not match. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — requires **(Individual) registers portal account with OTP** and **(Individual) logs in to the portal** to be meaningful. Same sprint as auth stories.

---

## Epic: Eligibility & Submission

## US-NEW-01 | (Individual) selects inquiry direction before eligibility check *(✔ New Story — CH-1)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 — New Story |

### User Story Statement

- **As a…** an individual traveler who wants to initiate a security inquiry
- **I want to…** select whether my journey is To Egypt or From Egypt as the first step before the eligibility check
- **So that…** the system applies the correct eligibility rules, travel form fields, and fee structure for my specific direction of travel

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user is logged in to the individual portal | the user navigates to Submit Inquiry | two clearly labelled options are shown: 'Travelling To Egypt' and 'Travelling From Egypt' — no other steps are shown until a selection is made. |
| AC2 | the user is on the inquiry direction selection screen | the user selects 'To Egypt' | the system applies To Egypt eligibility rules and loads inbound travel fields in Step 3 of the form. |
| AC3 | the user is on the inquiry direction selection screen | the user selects 'From Egypt' | the system applies From Egypt eligibility rules and loads outbound travel fields (departure airport in Egypt, destination country) in Step 3. |
| AC4 | the user is on the direction selection screen with no option selected | no direction is selected and the user attempts to proceed | the system displays: 'Please select your direction of travel to continue.' and blocks progression. |
| AC5 | the user is on a later inquiry step | the user navigates back from a later step | the previously selected direction is retained and the eligibility screen reflects that selection. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Direction of Travel** | Radio / Select | Yes | "To Egypt" or "From Egypt" only | Please select your direction of travel to continue. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. New story for CH-1 — direction selection gate before eligibility check.

---

## US-06 | (Individual) checks nationality + direction eligibility before form *(✎ Change Request — CH-1 — Modified)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 — Modified |

### User Story Statement

- **As a…** an individual traveler intending to travel to or from Egypt
- **I want to…** check whether my nationality requires a security inquiry — for the direction I am travelling — before I start filling in the full submission form
- **So that…** I do not waste time completing a lengthy form or paying fees only to discover my nationality and travel direction are not subject to the security inquiry requirement

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user selects their direction of travel and nationality on the eligibility screen | they submit the eligibility check | the system evaluates the combination of nationality AND direction (To Egypt / From Egypt) against the Admin-configured direction-scope rules. |
| AC2 | the nationality is configured as requiring a security inquiry for the selected direction | the check completes | the system proceeds to the full inquiry form and pre-fills the nationality and direction context into the form steps. |
| AC3 | the nationality does not require an inquiry for the selected direction | the check completes | the system displays: 'Your nationality does not require a security inquiry for this direction of travel.' and does not proceed to the form. |
| AC4 | the user's nationality is not found in the configured nationality list | the check is run | the system displays: 'Nationality not recognised. Please contact support.' and blocks progression. |
| AC5 | the user has selected a direction and entered form data on subsequent steps | the user returns to the eligibility screen after entering form data and changes their nationality or direction | the system clears all previously entered form data and warns: 'Changing nationality or direction will clear your form data.' |
| AC6 | the user has selected 'From Egypt' and their nationality passes eligibility | they proceed to the inquiry form | the system loads the outbound travel fields in Step 3 instead of inbound fields. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Direction of Travel** | Radio / Select | Yes | "To Egypt" or "From Egypt" | Please select your direction of travel. |
| **Nationality** | Select | Yes | Predefined nationality list from Admin config | Please select your nationality. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. Modified for CH-1: direction + nationality combined eligibility; AC6 added for From Egypt routing.

---

## US-07 | (Individual) submits personal details — Step 1 *(✎ Change Request — CH-1 — Modified)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 — Modified |

### User Story Statement

- **As a…** an individual traveler who has passed the eligibility check and started the inquiry form
- **I want to…** enter my personal details in Step 1 with a read-only direction banner confirming whether I am submitting a To Egypt or From Egypt inquiry
- **So that…** my identity is accurately captured and I can confirm I am in the correct form path for my direction of travel throughout all form steps

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user enters Step 1 after passing eligibility | the step loads | a read-only direction banner is displayed at the top of the form: 'Direction: To Egypt' or 'Direction: From Egypt' — this banner persists across all form steps. |
| AC2 | the user is on Step 1 (Personal Details) of the inquiry form | all required personal fields are entered and 'Next' is clicked | the system validates and advances to Step 2. |
| AC3 | the user is on Step 1 (Personal Details) and the form has validation errors | any required field is empty or invalid | the system highlights it with an inline error and does not advance. |
| AC4 | the nationality was pre-filled from the eligibility check | Step 1 loads | the nationality field is displayed as read-only to prevent mismatch with the eligibility decision. |
| AC5 | the user has moved forward to Step 2 (Passport Details) | the user clicks 'Back' from Step 2 | all previously entered personal details are pre-populated. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Full Name** | Text | Yes | Min 2, Max 150 chars | Full name is required (2–150 characters). |
| **Date of Birth** | Date | Yes | Must be in the past; age ≥ 1 | Please enter a valid date of birth. |
| **Gender** | Select | Yes | Male / Female / Unspecified | Please select a gender. |
| **Nationality** | Select | Yes | Pre-filled from eligibility; read-only | N/A — field is locked. |
| **Country of Residence** | Select | Yes | Predefined country list | Please select your country of residence. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — follows **(Individual) checks nationality + direction eligibility before form**. Modified for CH-1: direction banner added across all form steps. No field changes to Step 1.

---

## US-08 | (Individual) submits passport details — Step 2

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |

### User Story Statement

- **As a…** an individual traveler completing the inquiry form
- **I want to…** enter my passport number, issuing country, issue date, and expiry date in Step 2
- **So that…** my travel document information is recorded accurately for clearance verification

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | all required passport fields are entered and valid | the user clicks 'Next' | the system validates and advances to Step 3. |
| AC2 | the passport expiry date entered is less than 6 months from the travel date entered in Step 3 | the user reaches the review step | the system displays a warning: 'Your passport expires within 6 months of your travel date. This may affect your entry.' |
| AC3 | the user is on Step 2 (Passport Details) | any field is empty or invalid (e.g. past issue date, non-future expiry) | the system highlights the specific field and displays an inline error. |
| AC4 | the user is on Step 3 (Travel Details) | the user navigates back from Step 3 | all passport details previously entered are pre-populated. |
| AC5 | the user is completing Step 2 (Passport Details) | the passport number field is submitted | leading/trailing whitespace is stripped before storage. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Passport Number** | Text | Yes | 6–20 chars, alphanumeric, uppercase | Passport number must be 6–20 alphanumeric characters. |
| **Issuing Country** | Select | Yes | Predefined country list | Please select the issuing country. |
| **Issue Date** | Date | Yes | Must be a past date | Issue date must be in the past. |
| **Expiry Date** | Date | Yes | Must be a future date; preferably 6+ months ahead | Please enter a valid future expiry date. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — follows **(Individual) submits personal details — Step 1**. Schedule in same sprint.

---

## US-NEW-04 | (Individual) declares structured transit stops for multi-leg journey *(✔ New Story — CH-2)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 2 — High |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-2 — New Story |

### User Story Statement

- **As a…** an individual traveler whose journey includes one or more stops between origin and destination
- **I want to…** add each transit stop as a structured entry in Step 3 — with country, airport, layover duration, and connecting flight number per stop
- **So that…** the clearance engine has precise stop-by-stop route data to assess risk across the full journey, not just a country name list

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user reaches the Transit Stops section in Step 3 | the page loads | an 'Add Transit Stop' button is visible alongside a note that transit stops are optional. |
| AC2 | the user is on Step 3 with 'Transit' selected as the travel purpose | the user clicks 'Add Transit Stop' | a structured row appears with four fields: Transit Country (select, required if stop exists), Transit Airport (text, optional), Layover Duration in hours + minutes (optional), Connecting Flight Number (optional, max 10 chars, alphanumeric). |
| AC3 | the user is adding transit stops on Step 3 | the user adds multiple stops | each stop is numbered sequentially (Stop 1, Stop 2, etc.); up to 4 stops maximum; each stop can be removed individually without affecting the others. |
| AC4 | the user has already added 4 transit stops | the user has reached 4 transit stops and attempts to add another | the 'Add Transit Stop' button is disabled and shows: 'Maximum of 4 transit stops allowed.' |
| AC5 | the user is completing the travel purpose section on Step 3 | no transit stops are added | the section is treated as optional and submission proceeds without error. |
| AC6 | a stop row exists and any field in that row is filled except Country | the user attempts to proceed | the system displays: 'Transit Country is required when other stop fields are provided for Stop N.' |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Transit Country (per stop)** | Select | Conditional | Required if stop row exists; predefined country list | Please select the country for this transit stop. |
| **Transit Airport (per stop)** | Text | No | Max 100 chars | Airport name or code must be under 100 characters. |
| **Layover Hours (per stop)** | Number | No | 0–72, integer only | Layover hours must be between 0 and 72. |
| **Connecting Flight (per stop)** | Text | No | Max 10 chars, alphanumeric | Flight number must be alphanumeric, max 10 characters. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. New story for CH-2 — replaces free-text transit countries field with structured, validated per-stop data.

---

## US-09 | (Individual) submits travel details — Step 3 (direction-aware + structured transit) *(✎ Change Request — CH-1 + CH-2 — Modified)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 + CH-2 — Modified |

### User Story Statement

- **As a…** an individual traveler completing the inquiry form who has selected either To Egypt or From Egypt as their direction
- **I want to…** enter travel details in Step 3 using direction-appropriate fields — and add structured transit stops (country, airport, layover, connecting flight) for each leg of my journey
- **So that…** the system has precise, complete journey data — origin, destination, route, and stop-by-stop details — to process my security clearance accurately

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | direction is 'To Egypt' | Step 3 loads | the form shows: Travel Date, Departure Country, Arrival Airport in Egypt (Egyptian airports only), Purpose of Travel, Flight Number (optional), and Transit Stops section. |
| AC2 | direction is 'From Egypt' | Step 3 loads | the form shows: Travel Date, Departure Airport in Egypt (Egyptian airports only), Destination Country, Purpose of Travel, Flight Number (optional), and Transit Stops section — Departure Country and Arrival Airport in Egypt are not shown. |
| AC3 | the user is on Step 3 (Travel Details) | the travel date entered is in the past | the system displays: 'Travel date must be today or a future date.' |
| AC4 | the user is on Step 3 (Travel Details) | 'Transit' is selected as the Purpose of Travel | at least one transit stop must be added or the system blocks progression with: 'Please add at least one transit stop for a transit journey.' |
| AC5 | the user is on Step 3 with 'Transit' selected | the user clicks 'Add Transit Stop' | a structured row appears per stop: Country (select), Airport (text, optional), Layover Duration hours+minutes (optional), Connecting Flight Number (optional); up to 4 stops maximum. |
| AC6 | the user has added 4 transit stops on Step 3 | the user has 4 transit stops and attempts to add another | the button is disabled and shows: 'Maximum of 4 transit stops allowed.' |
| AC7 | the user is on Step 4 reviewing the inquiry | the user navigates back from Step 4 | all travel details and transit stop rows are pre-populated exactly as entered. |
| AC8 | all required fields for the selected direction are completed | the user clicks 'Next' | the system advances to Step 4 (Review & Fee). |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Travel Date** | Date | Yes | Today or future date | Travel date must be today or a future date. |
| **Departure Country** | Select | Conditional | Shown for To Egypt only; predefined country list | Please select your departure country. |
| **Arrival Airport (Egypt)** | Select | Conditional | Shown for To Egypt only; Egyptian airports only | Please select your arrival airport in Egypt. |
| **Departure Airport (Egypt)** | Select | Conditional | Shown for From Egypt only; Egyptian airports only | Please select your departure airport in Egypt. |
| **Destination Country** | Select | Conditional | Shown for From Egypt only; predefined country list | Destination country is required. |
| **Purpose of Travel** | Select | Yes | Tourism, Business, Medical, Family, Education, Conference, Transit, Other | Please select the purpose of your travel. |
| **Flight Number** | Text | No | Max 10 chars, alphanumeric | Flight number must be alphanumeric, max 10 characters. |
| **Transit Country (per stop)** | Select | Conditional | Required if stop row exists | Please select the country for this transit stop. |
| **Transit Airport (per stop)** | Text | No | Max 100 chars | Airport name or code must be under 100 characters. |
| **Layover Hours (per stop)** | Number | No | 0–72, integer | Layover hours must be between 0 and 72. |
| **Connecting Flight (stop)** | Text | No | Max 10 chars, alphanumeric | Flight number must be alphanumeric, max 10 characters. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — Step 3 follows Steps 1–2. Modified for CH-1 (direction-conditional fields) + CH-2 (structured transit stops replace free-text). Consider splitting transit section into a separate ticket if sprint capacity is tight.

---

## US-10 | (Individual) views fee before confirming submission

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |

### User Story Statement

- **As a…** an individual traveler who has completed the 3-step form
- **I want to…** see the exact calculated inquiry fee based on my nationality and direction before I confirm and proceed to payment
- **So that…** I can make an informed decision to proceed with full knowledge of the cost before any charge is applied to my payment method

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has completed Steps 1–3 of the inquiry form | the user reaches Step 4 | the calculated fee is displayed prominently before any payment action is available. |
| AC2 | the user is on Step 4 (Fee Review) | the fee is displayed | a notice reads: 'Fees are non-refundable once payment is processed.' |
| AC3 | the user is on Step 4 (Fee Review) | the nationality + direction combination corresponds to a configured fee in the Admin Module | the displayed fee exactly matches the Admin-configured direction-specific fee. |
| AC4 | the user is on Step 4 (Fee Review) | the user clicks 'Back' and changes nationality or direction | the fee is recalculated and displayed again. |
| AC5 | the user is on Step 4 (Fee Review) | no fee configuration exists for the nationality and direction combination | the system blocks submission with: 'Fee configuration is unavailable for your nationality and direction. Please contact support.' |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — part of the multi-step inquiry flow. Schedule in same sprint as submission stories.

---

## US-11 | (Individual) reviews, declares and confirms submission *(✎ Change Request — CH-1 + CH-2 — Modified)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 + CH-2 — Modified |

### User Story Statement

- **As a…** an individual traveler who has completed all inquiry form steps and reviewed the calculated fee
- **I want to…** see a complete summary including direction label, direction-appropriate travel fields, and any structured transit stops — then declare accuracy and submit
- **So that…** I can verify everything is correct for my specific journey direction before payment is made and the inquiry is locked

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has completed all previous inquiry steps | Step 4 loads | it shows grouped sections: Personal Details, Passport Details, Travel Details (direction-labelled), Transit Stops, and Fee Summary — all in read-only form. |
| AC2 | the user is on Step 4 (Review & Declaration) | direction is 'To Egypt' | the Travel Details section shows: direction label, Travel Date, Departure Country, Arrival Airport in Egypt, Purpose, and Flight Number. |
| AC3 | the user is on Step 4 (Review & Declaration) | direction is 'From Egypt' | the Travel Details section shows: direction label 'From Egypt', Travel Date, Departure Airport in Egypt, Destination Country, Purpose, and Flight Number. |
| AC4 | the user is on Step 4 (Review & Declaration) | the user has added transit stops | each stop is shown as a numbered row — Stop 1, Stop 2, etc. — with Country, Airport, Layover Duration, and Connecting Flight per row. |
| AC5 | the user is on Step 4 (Review & Declaration) | no transit stops were added | the Transit Stops section shows: 'No transit stops declared.' |
| AC6 | the user ticks the accuracy declaration checkbox and clicks 'Confirm and Submit' | all form data is valid and fee is calculated | the inquiry is submitted and the user is navigated to the payment screen with a reference number. |
| AC7 | the user is on Step 4 (Review & Declaration) | the user clicks 'Edit' on any section | they are returned to that specific step with all data intact; on returning to Step 4 the review screen refreshes with updated values. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — final step of the submission flow. Modified for CH-1 (direction label + direction-appropriate travel fields) + CH-2 (structured transit stops display on review screen).

---

## Epic: Payment

## US-12 | (Individual) pays inquiry fee via ESC payment gateway

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Payment |

### User Story Statement

- **As a…** an individual traveler whose inquiry has been submitted and is awaiting payment
- **I want to…** complete payment of the inquiry fee through the ESC payment gateway
- **So that…** my payment is processed securely, my inquiry moves to active processing, and I have a transaction record

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has confirmed the inquiry details on Step 4 | the inquiry is submitted | the user is redirected to the ESC gateway pre-loaded with the reference number and exact fee. |
| AC2 | the user has been redirected to the ESC payment gateway | payment is completed | the inquiry status updates to 'Under Processing' and the user is redirected to a confirmation screen. |
| AC3 | payment has been successfully completed via the ESC gateway | the confirmation screen loads | it displays the reference number, amount, timestamp, and transaction reference. |
| AC4 | the user has been redirected to the ESC payment gateway | payment fails | the inquiry is set to 'Payment Pending' and the user is shown a retry message. |
| AC5 | a payment request has been sent to the ESC gateway | the gateway does not respond within the timeout period | the inquiry is set to 'Payment Pending' to prevent a double-charge. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — requires confirmed submission in **(Individual) reviews, declares and confirms submission**. Same sprint.

---

## US-13 | (Individual) receives payment confirmation record

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Payment |

### User Story Statement

- **As a…** an individual traveler who has completed payment
- **I want to…** receive and view a payment confirmation record with transaction reference, amount, date, and inquiry reference
- **So that…** I have documented proof of payment for dispute resolution if my inquiry is not created correctly after payment

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has completed payment via the ESC gateway | payment is completed | a confirmation screen shows: inquiry reference, amount, payment date/time, ESC transaction reference, and payment method. |
| AC2 | the payment confirmation screen is displayed | 'Download Receipt' is clicked | a PDF receipt is downloaded with all confirmation details. |
| AC3 | the inquiry has been submitted and payment has been completed | the user navigates away and returns to the inquiry | the payment reference remains accessible from the inquiry detail view. |
| AC4 | payment has been processed by the gateway | payment is received but inquiry creation fails | the confirmation is still issued and the case is flagged for manual reconciliation. |
| AC5 | the user has completed payment via the ESC gateway | payment is successful | a confirmation email is sent to the registered address within 5 minutes. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — directly follows **(Individual) pays inquiry fee via ESC payment gateway**. Same sprint.

---

## US-14 | (Individual) retries payment for Payment Pending inquiry

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Payment |

### User Story Statement

- **As a…** an individual whose inquiry payment was not completed
- **I want to…** retry payment for my existing inquiry directly from My Inquiries without resubmitting all data
- **So that…** I can complete payment and move my already-submitted inquiry to active processing without duplicate submission

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | an inquiry is in 'Payment Pending' status | 'Complete Payment' is clicked | the user is taken to the ESC gateway pre-loaded with the same reference and original fee. |
| AC2 | the user has clicked 'Complete Payment' on a Payment Pending inquiry | the retry payment is successful | the inquiry status changes to 'Under Processing'. |
| AC3 | the user has opened the retry payment screen | the fee has changed since original submission | the original fee at submission time is applied. |
| AC4 | the inquiry has been in Payment Pending status without being paid | the inquiry has expired due to non-payment | the system displays: 'This inquiry has expired. Please submit a new one.' |
| AC5 | a Payment Pending inquiry exists for this traveler and travel date | a new inquiry is submitted with the same passport and travel date as a pending inquiry | the system warns the user to complete the pending payment first. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — depends on **(Individual) pays inquiry fee via ESC payment gateway** and **(Individual) views their own inquiry list**. Schedule after payment and inquiry list stories.

---

## Epic: Inquiry Tracking & Results

## US-15 | (Individual) receives inquiry status change notifications

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 2 — High |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an individual traveler with an active inquiry
- **I want to…** receive automatic notifications via email and SMS whenever my inquiry status changes
- **So that…** I am immediately informed of decisions without manually checking the portal so I can act promptly

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has an active inquiry in the system | any status transition occurs | an email and SMS notification is sent to the registered contact within 5 minutes. |
| AC2 | the inquiry is under processing | the inquiry is approved | the notification includes a direct link to download the approval document. |
| AC3 | the inquiry is under processing | the inquiry is rejected | the notification includes the inquiry reference number and a link to view the inquiry status. |
| AC4 | an inquiry has been in Payment Pending status without action for 24 hours | a 'Payment Pending' inquiry has had no action for 24 hours | a payment reminder notification is sent. |
| AC5 | a notification has been triggered for a status change | email delivery fails | the system retries up to 3 times and logs the failure without blocking the inquiry. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

> All INVEST criteria met. Notification scope confirmed in BRD item 12.

---

## US-16 | (Individual) views their own inquiry list

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 2 — High |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** a registered individual traveler
- **I want to…** view a list of all my submitted inquiries with their current status in one place
- **So that…** I can quickly see the state of all my inquiries and navigate to any inquiry's detail view without contacting support

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user is logged in to the individual portal | the user navigates to 'My Inquiries' | a list of all their submitted inquiries is shown with: reference number, traveler name, submission date, travel date, direction, and current status. |
| AC2 | the user is on the My Inquiries page | multiple inquiries exist | the list is sorted by submission date descending (newest first) by default. |
| AC3 | the user is viewing the My Inquiries list | the user clicks on any inquiry row | the inquiry detail view for **(Individual) tracks inquiry status and processing stages** opens for that inquiry. |
| AC4 | the user is on the My Inquiries page with multiple inquiries listed | the user applies a status filter | only inquiries matching that status are displayed. |
| AC5 | the user is on the My Inquiries page | no inquiries exist for the account | the screen displays: 'You have no submitted inquiries yet.' |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — requires at least one submitted inquiry to be meaningful. Same sprint as **(Individual) pays inquiry fee via ESC payment gateway**.

---

## US-17 | (Individual) tracks inquiry status and processing stages

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 2 — High |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an individual traveler with a submitted inquiry
- **I want to…** view the detailed status and processing stage of my inquiry from the inquiry detail page
- **So that…** I have visibility into where my inquiry is in the process and can estimate when a decision will be made

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the user has opened an inquiry from My Inquiries | the inquiry detail page loads | it displays: reference number, direction of travel, submission date, travel date, traveler name, nationality, current status, and processing timeline. |
| AC2 | the user is viewing an inquiry in Under Processing status | the inquiry is 'Under Processing' | the current processing stage is shown (e.g. Stage 2 of 4) with stage labels. |
| AC3 | the user is viewing an approved inquiry's detail page | the inquiry is approved | the approval reference, valid-from date, valid-to date, and a 'Download Approval Document' button are displayed. |
| AC4 | the user is viewing a rejected inquiry's detail page | the inquiry is rejected | the inquiry detail page shows 'Rejected' status with the decision date. |
| AC5 | the user is on the inquiry detail page | the user clicks 'Back to My Inquiries' | the inquiry list is shown with the scroll position preserved. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — navigates from **(Individual) views their own inquiry list**. Same sprint.

---

## US-19 | (Individual) downloads approved PDF and QR code

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an individual traveler whose inquiry has been approved
- **I want to…** download the official approval document as a PDF containing a QR code for verification
- **So that…** I have the official clearance document to present to relevant authorities at the point of travel

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the inquiry is approved | the user clicks 'Download Approval Document' | a PDF is downloaded containing: traveler name, nationality, travel date, direction, approval reference, valid-from and valid-to dates, and a QR code. |
| AC2 | the approved PDF document has been downloaded | the QR code on the document is scanned | it links to the public verification page (US-XX Public QR) confirming the approval is genuine. |
| AC3 | the approved PDF document is available for download | the document is downloaded | the download is logged with timestamp and user ID for audit purposes. |
| AC4 | the user is viewing an approved inquiry whose validity has passed | the approval has expired (valid-to date passed) | the 'Download' button is replaced with: 'This approval has expired.' and the document is still downloadable for reference. |
| AC5 | the user is viewing an inquiry that is not yet approved | the user attempts to download an approval for an inquiry in any other status | the download button is not shown. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — requires the inquiry to be in Approved status. Navigate from **(Individual) tracks inquiry status and processing stages**.

---

## US-20 | (Individual) prints approval document from portal

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an individual traveler whose inquiry has been approved
- **I want to…** print the approval document directly from the portal without downloading a PDF file first
- **So that…** I can produce a physical copy of my clearance document immediately from any device with a connected printer

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the inquiry is approved | the user clicks 'Print' | the browser print dialog opens pre-loaded with a print-optimised version of the approval document. |
| AC2 | the user has clicked 'Print' on an approved inquiry | the print-optimised layout loads | all required fields are visible and the QR code is rendered at sufficient resolution for scanning. |
| AC3 | the print dialog is open | the user cancels the print dialog | they are returned to the inquiry detail page with no side effects. |
| AC4 | the user is viewing an inquiry that is not approved | the inquiry is not approved | the 'Print' button is not shown. |
| AC5 | the user is viewing an approved inquiry that has since expired | the approval has expired | the printed version includes a visible watermark: 'EXPIRED'. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — extends US-19 (PDF download capability). Schedule as a follow-on in Release 2.

---

## US-21 | (Individual) views approval validity and expiry warning

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 2 |
| **Epic** | Inquiry Tracking & Results |

### User Story Statement

- **As a…** an individual traveler with an active approval
- **I want to…** see the remaining validity period of my approval and receive a warning when it is approaching expiry
- **So that…** I can plan my travel to use the clearance before it expires and be alerted in time to reapply if needed

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | the inquiry has been approved by the clearance engine | the inquiry is approved | the detail page shows a validity bar displaying: 'Valid from [date] to [date] — [N] days remaining.' |
| AC2 | the user is viewing an approved inquiry near its expiry date | the approval is within 7 days of expiry | a yellow warning banner is displayed: 'Your approval expires in [N] days. Please plan your travel accordingly.' |
| AC3 | the user is viewing an approved inquiry that has passed its expiry date | the approval has expired | the validity bar shows: 'Expired on [date]' and the banner changes to red: 'This approval has expired.' |
| AC4 | the user is viewing an inquiry approaching its expiry | the user has an expiring approval | an automated notification is sent at 7 days and again at 1 day before expiry per US-15. |
| AC5 | the user is viewing an approved inquiry that has expired | the approval is expired | the user is shown an option: 'Submit a new inquiry' linking to the eligibility check. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — shown alongside US-19 (download). Same sprint in Release 2.

---

## Epic: Eligibility & Submission

## US-NEW-02 | (Individual) submits outbound travel details for From Egypt journey *(✔ New Story — CH-1)*

| Field | Value |
|---|---|
| **Persona** | Individual |
| **Priority** | Priority 1 — Critical |
| **Release** | Release 2 |
| **Epic** | Eligibility & Submission |
| **Change Request** | CH-1 — New Story |

### User Story Statement

- **As a…** an individual traveler who selected 'From Egypt' direction and passed the eligibility check
- **I want to…** enter outbound travel details in Step 3 — departure airport in Egypt, destination country, travel date, purpose, flight number, and any transit stops
- **So that…** the system has complete outbound journey context to process my security clearance before I depart Egypt

### Acceptance Criteria

| **#** | **Given** | **When** | **Then** |
|---|---|---|---|
| AC1 | direction is 'From Egypt' | Step 3 loads | the form shows: Departure Airport in Egypt (Egyptian airports only), Destination Country, Travel Date, Purpose of Travel, Flight Number (optional), and the Transit Stops section. |
| AC2 | the user is on Step 3 with 'From Egypt' direction selected | the user opens the Departure Airport dropdown | only Egyptian airports are listed — no international airports appear. |
| AC3 | the user is on Step 3 completing the outbound travel form | the user leaves Destination Country empty and attempts to proceed | the system displays: 'Destination country is required.' |
| AC4 | the user is completing the travel date field on Step 3 | the user enters a past travel date | the system displays: 'Travel date must be today or a future date.' |
| AC5 | the user has completed all required fields on Step 3 | the user completes all required fields and proceeds to Step 4 | the review screen shows direction as 'From Egypt' with the outbound field values — Departure Airport in Egypt and Destination Country — not the inbound fields. |

### Form Field Validation

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Departure Airport (Egypt)** | Select | Yes | Egyptian airports only; predefined list | Please select your departure airport in Egypt. |
| **Destination Country** | Select | Yes | Predefined country list | Destination country is required. |
| **Travel Date** | Date | Yes | Today or future date | Travel date must be today or a future date. |
| **Purpose of Travel** | Select | Yes | Tourism, Business, Medical, Family, Education, Conference, Transit, Other | Please select the purpose of your travel. |
| **Flight Number** | Text | No | Max 10 chars, alphanumeric | Flight number must be alphanumeric, max 10 characters. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Not fully Independent — depends on **(Individual) selects inquiry direction before eligibility check** and **(Individual) checks nationality + direction eligibility before form**. New story for CH-1.

---
