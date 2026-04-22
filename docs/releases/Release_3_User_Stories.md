# Security Clearance & Inquiry System
## Release 3 — User Stories

*Scope: Advanced agency lifecycle features — reapplication after rejection, profile & document updates, shared-ticket groups, print approval, admin document review*

*5 stories — 4 Agency + 1 Admin | All deferred from Release 1*

---

## Personas

| Persona | Scope | Description |
|---|---|---|
| **Agency** | Portal | The authorised account holder for a travel agency. Responsible for agency operations, profile management, and all portal functions. |
| **Admin** | Back-office | Full system access. Manages agency lifecycle, monitors inquiries, and reviews compliance documents. |

---

## Document Summary

| Category | Count |
|---|---|
| Total stories | 5 |
| Agency stories | 4 |
| Admin stories | 1 |
| Priority 1 — Critical | 0 |
| Priority 2 — High | 3 |
| Priority 3 — Medium | 2 |

---

## Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04-10 | Initial release — 5 stories deferred from Release 1. |

---

## Portal — Agency Stories

## Epic: Registration & Account Lifecycle

## US-24 | (Agency) reapplies after admin rejects registration

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 3 |
| **Epic** | Registration & Account Lifecycle |
| **Origin** | Deferred from Release 1. Depends on **(Admin) approves or rejects agency registration**. |

### User Story Statement

- **As a…** an agency whose registration was rejected by the admin
- **I want to…** correct my application and resubmit it for review
- **So that…** I can still gain access to the system after addressing the reasons for rejection

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Rejected agency sees rejection reason | the agency registration was rejected | the agency logs in with their original credentials | they see the rejection reason and a ***Resubmit Application*** button. |
| AC2 | Resubmission form pre-fills original data | the agency clicks ***Resubmit Application*** | the form loads | all fields from the original submission are pre-filled. The agency can edit any field. |
| AC3 | Updated application submitted for review | the agency corrects the flagged fields and submits | the resubmission is saved | the agency status changes to 'Pending Review'. The admin receives a notification about the resubmission. |
| AC4 | Resubmission without changes blocked | the agency attempts to resubmit without changing any field | they click submit | the system displays: ***Please update at least one field before resubmitting.*** |
| AC5 | Resubmission history tracked | the agency resubmits | the admin views the application | the admin can see both the original submission and the resubmission with a timestamp for each. |

### Form Validation Table

Same form as the original agency registration form (see **(Agency) registers and submits for approval**). All fields, types, constraints, and error messages apply. The form is pre-filled with the previous submission data.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Admin) approves or rejects agency registration** being complete. Schedule after Release 1 admin stories.

---

## US-28 | (Agency) updates profile and renews documents

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 2 — High |
| **Release** | Release 3 |
| **Epic** | Registration & Account Lifecycle |
| **Origin** | Deferred from Release 1. Paired with **(Admin) reviews and approves updated agency documents**. |

### User Story Statement

- **As a…** an approved agency representative
- **I want to…** update my agency's profile information and upload renewed documents
- **So that…** my agency's details remain current and my operating licence stays valid in the system

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Agency opens profile page | the agency is logged in | they navigate to the Agency Profile page | they see their current profile details and uploaded documents. An ***Edit Profile*** button is available. |
| AC2 | Profile fields editable | the agency clicks ***Edit Profile*** | the form becomes editable | the agency can update contact details, address, and authorised representative information. For all fields and validation rules, see the Form Validation table below. |
| AC3 | Document renewal upload | the agency has an expiring or expired document | they upload a replacement document | the old document is retained for audit. The new document status changes to 'Pending Review'. |
| AC4 | Profile update saves successfully | the agency submits valid changes | the update is saved | the system displays: ***Profile updated successfully. Document changes require admin review.*** |
| AC5 | No changes detected | the agency clicks save without modifying any field | they try to submit | the system displays: ***No changes detected. Please update at least one field.*** |

### Form Validation Table

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|
| **Agency Name** | text | Yes | 3–100 characters, Arabic and English letters, spaces, dashes | ***Agency name must be 3–100 characters.*** |
| **Contact Email** | email | Yes | Valid email format | ***Please enter a valid email address.*** |
| **Contact Phone** | text | Yes | Valid phone format, 7–15 digits | ***Please enter a valid phone number.*** |
| **Address** | textarea | Yes | 10–300 characters | ***Address must be 10–300 characters.*** |
| **Trade Licence** | file | Conditional (if expired) | PDF or image, max 5 MB | ***File must be PDF or image, max 5 MB.*** |
| **Tax Certificate** | file | Conditional (if expired) | PDF or image, max 5 MB | ***File must be PDF or image, max 5 MB.*** |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Paired with **(Admin) reviews and approves updated agency documents**. Both should be delivered in the same sprint.

---

## Epic: Batch Submission

## US-35 | (Agency) creates a shared-ticket group in a batch

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 3 |
| **Epic** | Batch Submission |
| **Change Request** | CH-5 |
| **Origin** | Deferred from Release 1. Shared-ticket groups add complexity; individual traveler entry covers the core batch need. |

### User Story Statement

- **As a…** an approved agency representative submitting a batch of travelers
- **I want to…** group travelers who share the same flight ticket into a shared-ticket group within a batch
- **So that…** travelers on the same booking are processed together and linked in the system for easier tracking

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Group creation option available | the agency is on the batch traveler entry step | they click ***Create Group*** | a group panel appears. The agency can name the group and add travelers to it. |
| AC2 | Travelers added to group | the agency selects existing travelers from the batch | they add them to the group | the travelers appear under the group header. Each traveler can only belong to one group. |
| AC3 | Shared flight details applied | the agency enters shared flight details for the group | the details are saved | all travelers in the group inherit the shared flight number, departure date, and arrival airport. |
| AC4 | Group removed | the agency deletes a group | the deletion is confirmed | the travelers return to the ungrouped list. Their individual data is preserved. |
| AC5 | Grouped travelers shown in review | the agency reaches the review step | the batch summary loads | grouped travelers are displayed together under their group name. Ungrouped travelers are listed separately. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Agency) builds batch inquiry via web form** being complete. Extends the existing batch entry step.

---

## Epic: Inquiry Results & Documents

## US-43 | (Agency) prints individual approval document from portal

| Field | Value |
|---|---|
| **Persona** | Agency |
| **Priority** | Priority 3 — Medium |
| **Release** | Release 3 |
| **Epic** | Inquiry Results & Documents |
| **Origin** | Deferred from Release 1. PDF download in **(Agency) downloads traveler PDF from batch** covers the core need; print is a convenience feature. |

### User Story Statement

- **As a…** an approved agency representative viewing an approved inquiry
- **I want to…** print the approval document directly from the portal without downloading it first
- **So that…** I can quickly produce a physical copy when needed at the office

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Print button available on approved inquiry | the agency is viewing an approved inquiry detail page | the page loads | a ***Print Approval*** button is visible next to the existing ***Download PDF*** button. |
| AC2 | Print dialog opens | the agency clicks ***Print Approval*** | the browser print dialog opens | the approval document is rendered in a print-friendly layout with the QR code, traveler details, and approval reference. |
| AC3 | Print layout is clean | the document is printed | the printout is reviewed | it contains only the approval content. No navigation, headers, footers, or portal chrome appear on the printed page. |
| AC4 | Print not available for non-approved inquiries | the agency is viewing a rejected or pending inquiry | the page loads | the ***Print Approval*** button is not shown. |

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ Depends on **(Agency) downloads traveler PDF from batch** being complete. Extends the inquiry detail page.

---

## Back-office — Admin Stories

## Epic: Agency Document Management

## US-M2-14 | (Admin) reviews and approves updated agency documents

| Field | Value |
|---|---|
| **Persona** | Admin |
| **Priority** | Priority 2 — High |
| **Release** | Release 3 |
| **Epic** | Agency Document Management |
| **Origin** | Deferred from Release 1. Paired with **(Agency) updates profile and renews documents**. |

### User Story Statement

- **As a…** an administrator responsible for agency compliance
- **I want to…** review updated documents submitted by agencies and approve or reject each document
- **So that…** only agencies with valid, verified documents remain active in the system

### Acceptance Criteria

| **#** | **Scenario** | **Given** | **When** | **Then** |
|---|---|---|---|---|
| AC1 | Pending documents queue visible | the admin opens the Agency Document Review screen | the page loads | all agencies with documents in 'Pending Review' status are listed. For columns and layout, see the Grid Specification below. |
| AC2 | Document comparison view | the admin clicks on an agency's pending document | the detail view opens | the admin sees the old document and the new document side by side for comparison. |
| AC3 | Document approved | the admin reviews a document and clicks ***Approve*** | the action is confirmed | the document status changes to 'Approved'. The agency receives an email confirmation. |
| AC4 | Document rejected with reason | the admin clicks ***Reject*** on a document | they enter a rejection reason and confirm | the document status changes to 'Rejected'. The agency receives an email with the rejection reason. |
| AC5 | Rejection reason required | the admin tries to reject without entering a reason | they click confirm | the system displays: ***A rejection reason is required before proceeding.*** |
| AC6 | Review action logged | any approve or reject action completes | the audit log is checked | it records the admin identity, the agency name, the document type, the action taken, and the timestamp. |

### Grid Specification

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Agency Name | Yes | Yes | Text search |
| Document Type | No | Yes | Dropdown: Trade Licence, Tax Certificate |
| Submitted Date | Yes | Yes | Date range |
| Status | No | Yes | Dropdown: Pending Review, Approved, Rejected |

**Pagination:** Yes — 20 rows per page, with page numbers and previous/next buttons.

### INVEST Check

| I — Independent | N — Negotiable | V — Valuable | E — Estimable | S — Small | T — Testable |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ |

> ⚠️ Independent: Paired with **(Agency) updates profile and renews documents** — both should ship together. Small: The side-by-side comparison view adds UI complexity; consider splitting if estimate exceeds 8 points.

---

## Dependencies Summary

| Story | Depends On | Notes |
|---|---|---|
| **(Agency) reapplies after admin rejects registration** | **(Admin) approves or rejects agency registration** | Admin rejection workflow must exist before agencies can reapply. |
| **(Agency) updates profile and renews documents** | **(Admin) reviews and approves updated agency documents** | Profile update and document review are paired. Ship together. |
| **(Agency) creates a shared-ticket group in a batch** | **(Agency) builds batch inquiry via web form** | Extends the batch wizard with grouping functionality. |
| **(Agency) prints individual approval document from portal** | **(Agency) downloads traveler PDF from batch** | Extends the inquiry detail page with print capability. |
| **(Admin) reviews and approves updated agency documents** | **(Agency) updates profile and renews documents** | Document review depends on agencies being able to update documents. |

---

## Deferred Logic Notes

These items from the master deferred list may affect Release 3 stories:

- **Optional documents** — what document types are accepted? (Affects **(Agency) updates profile and renews documents** and **(Admin) reviews and approves updated agency documents**.)
- **Batch retry path** — how should failed entries within a batch be retried? (May affect **(Agency) creates a shared-ticket group in a batch** grouped travelers.)
