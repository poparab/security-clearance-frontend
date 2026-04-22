# Security Clearance & Inquiry System — Copilot Instructions

## Project Overview

This project produces structured user story documentation for a Security Clearance & Inquiry System. The system screens travelers of designated nationalities before they finalize travel to Egypt. Output is formatted `.docx` files — one per module — containing user stories organized by persona, epic, and change request status.

---

## Release Files (Canonical Sources)

| Release File | Scope | Status |
|---|---|---|
| `docs/releases/MVP_User_Stories.md` | Agency registration, wallet-funded batch submission (individual travelers only), admin config & wallet credit | ✅ Complete |
| `docs/releases/Release_1_User_Stories.md` | Auth, notifications, single inquiry, shared-ticket groups, manual batch entry, wallet history, full admin back-office | ✅ Complete |
| `docs/releases/Release_2_User_Stories.md` | Individual traveler portal — registration, eligibility, inquiry, ESC payment, result tracking | ✅ Complete |
| Module 3 — Clearance Engine | Automated inquiry processing, decision lifecycle | 🔲 Not started |
| Module 4 — Dashboards & Reporting | KPI dashboards, agency/financial/audit reporting | 🔲 Not started |

---

## User Story Authoring Rules

Every user story must follow this exact structure. No exceptions.

### Language & Wording
- **Write in plain language.** Use simple, everyday words. Avoid jargon and technical terms.
- **Keep sentences short.** One idea per sentence. If a sentence needs a comma, consider splitting it.
- **Be specific, not vague.** "Submit a batch file" not "manage the upload process".
- These rules apply to titles, story statements, acceptance criteria, and error messages — everywhere.

### 1. Title
- 5–8 words
- Format: `(Persona) + [Action/Outcome]` — wrap the persona name in parentheses
- Example: `(Agency) submits batch inquiry`, `(Admin) approves agency registration`
- Use the actor's perspective, not the system's
- Avoid vague verbs: "Manage", "Handle", "Fix" without context

### 2. User Story Statement
```
As a [specific user type],
I want to [perform a specific action],
So that [I achieve a concrete, valuable outcome].
```
- **As a…** — be specific: "an approved agency representative", not just "a user"
- **I want to…** — describe a capability, not an implementation
- **So that…** — state the business value; never restate the action

### 3. Acceptance Criteria
- Use **Given / When / Then** format exclusively
- Write **3–6 ACs** per story (more = story too large, split it)
- Each AC must be independently testable — one condition, one outcome
- Include negative and edge cases, not just the happy path
- Avoid implementation language — focus on observable behavior
- QA must be able to write a test from each AC without asking for clarification
- **AC table always has 5 columns in this exact order: `# | Scenario | Given | When | Then`.** The Scenario column is mandatory — it must contain a concise 3–7 word title that names the condition being tested (e.g. "Successful login and redirect", "Duplicate email rejection"). Never omit this column.
- **System messages** (any text that appears verbatim in the UI — error messages, toasts, warnings, dialog text) must be formatted as bold italic: `***message text***`. Do not use single quotes around them.
- **Never include story IDs (US-xx) or change request IDs (CH-x)** inside acceptance criteria text or user story statement bullets.
- **Multi-sentence Then cells:** when the Then statement contains more than one sentence, place each sentence on its own line using `<br>` inside the table cell.
- **Bullet-point packed assertions:** when a Then cell contains multiple checkable items (e.g. a screen shows field A, field B, field C, and two actions), format each item as a bullet using `<br>- ` so every assertion is visually distinct and individually verifiable.
- **Explicit field names — never vague categories:** never write "personal details" or "travel details" in an AC. Always list exact field names. If the field list is long, create a **Display Field Table** (Field Name | Source) or split into separate AC rows.
- **Negative requirements get their own AC row:** never bury a negative ("No fee breakdown is shown", "No rejection reason is displayed") inside a positive AC. Give it its own row with a clear Scenario name like "Fee details hidden from modal."
- **Complete edge-case coverage:** for every entity state the story touches, define behavior for ALL possible states. If a story handles login, specify what happens for every account status (Pending, Rejected, Suspended, Active). Do not leave gaps.

### 4. Form Validation Table
Required whenever the story involves a form. Columns:

| Field | Type | Required | Constraints | Error Message |
|---|---|---|---|---|

**Error message rules:**
- Specific: "Email is required" not "Field is required"
- Human: "Passwords do not match" not "Validation error: CONFIRM_PWD_MISMATCH"
- Actionable: "Must be at least 8 characters" not "Too short"
- Inline beside/below the field — never only a top-of-page banner
- Never clear a valid field because of an error in another field
- Security-sensitive fields: use neutral messages to prevent enumeration
- **MVP-only bilingual rule:** every error message must include Arabic and English in the same message, with Arabic first and English in parentheses. Example: `***رسالة الخطأ. (Error message.)***`

### 5. Grid Specification
Required whenever the story shows a data table, list, or grid to the user. Place immediately after the AC table (or after the Form Validation table if present).

| Column | Sortable | Filterable | Filter Type |
|---|---|---|---|
| Example Column | Yes/No | Yes/No | Text search / Dropdown: values / Date range / — |

**Rules:**
- List every column the user sees.
- For each column, state whether it is sortable and filterable.
- If filterable, specify how: text search, dropdown (list all options), date range, numeric range.
- State whether the grid has pagination and the page size.
- If the grid does NOT need sorting, filtering, or pagination, say so explicitly.

### 6. Scope Boundaries
Required whenever a story is part of a multi-story workflow (e.g. wizard steps, list → detail → action chains).

Add a short note after the AC table that states:
- What this story covers (its start and end points).
- What the adjacent stories cover.
- Example: *"This story covers the confirmation modal only. The submission result screen is defined in **(Agency) sees batch submission result**. The traveler entry form is defined in **(Agency) builds batch inquiry via web form**."
- **Always reference adjacent stories by their bold title — never by story ID.** Story IDs in this document may not match ticket numbers in your project management tool. Never write "US-7" or any story number in a cross-reference.

This prevents developers from building behavior that belongs to a different story.

### 7. Sprint Alignment
- Sprint backlog item titles must match story titles exactly. No abbreviation, no merging of multiple stories into one backlog item.
- If the story title is "(Agency) views batch list and drafts," the sprint item must say the same thing.
- When two stories must ship together (e.g. **(Agency) reviews batch in confirmation modal** and **(Agency) sees batch submission result**), create separate sprint items for each but tag them as a deliverable pair.

### 8. INVEST Check
A story must pass all six criteria before it is accepted.

| Letter | Property | Check Question |
|---|---|---|
| **I** | Independent | Can this be pulled into any sprint without a prerequisite? |
| **N** | Negotiable | Can the team suggest alternative implementations? |
| **V** | Valuable | Would a non-technical stakeholder care if we shipped this? |
| **E** | Estimable | Can developers estimate it now? |
| **S** | Small | Can it be built, reviewed, tested, and shipped in one sprint? |
| **T** | Testable | Can QA write a test for every AC without asking for clarification? |

### 9. Story Quality Gate — Pre-Approval Checklist

Run this checklist against every story before marking it complete. Every item must pass.

| # | Check |
|---|---|
| 1 | **Explicit fields only** — No AC uses vague categories like “personal details” or “travel details.” Every field is named explicitly. |
| 2 | **Grid Specification present** — If the story shows a table, list, or grid, a Grid Specification section exists with columns, sortable, filterable, filter type, and pagination. |
| 3 | **Scope Boundaries present** — If the story is part of a multi-story workflow, a Scope Boundaries note states where this story starts, ends, and what adjacent stories cover. |
| 4 | **No buried negatives** — Every “No X is shown” or “X is not available” has its own AC row with a clear Scenario name. |
| 5 | **All entity states covered** — For every entity the story touches (account status, inquiry status, batch status), behavior is defined for ALL possible states, not just the happy path. |
| 6 | **Empty state defined** — If the story shows a list or count, an AC defines what appears when there is zero data. |
| 7 | **Bullet-point packed assertions** — When a Then cell contains multiple checkable items, each is on its own line using `<br>- ` formatting. |
| 8 | **INVEST passes** — All six INVEST criteria hold. |
| 9 | **Sprint title = Story title** — The sprint backlog item title matches the story title exactly. |
| 10 | **AC count 3–6** — If more than 6, evaluate whether the story should be split. |

---

## Key Business Rules

- All approval/rejection decisions are **fully automated** — no human intervention in Phase 1
- Payment integration is **ESC gateway only**
- Mobile applications are **out of scope** for Phase 1
- The system operates in **Arabic and English**
- Nationalities requiring inquiry are **dynamically configurable** by Super Admin
- Agencies use a **wallet model** — balance is deducted per inquiry; top-ups via ESC gateway
- Individual users pay **per inquiry** via ESC gateway at submission time
- Batch uploads process each traveler as an **independent inquiry** with individual decisions
- Approved inquiries generate a **PDF with QR code** for verification at airports/borders

## Inquiry Status Lifecycle

```
Submitted → Payment Pending → Under Processing → Approved / Rejected / Failed
```

---

## Change Request Traceability

- **Modified stories** → amber badge: `✎ Change Request CH-X`
- **New stories** → green badge: `✔ New Story CH-X`
- Every modified or new story must carry its badge. No exceptions.

### Approved Change Requests

| CR ID | Description |
|---|---|
| CH-1 | From Egypt direction (travel origin context) |
| CH-2 | Structured transit fields |
| CH-3 | Manual traveler entry |
| CH-4 | Hide fees from agency-facing screens — balance-only validation |
| CH-5 | Web form replaces file upload — batch submission via 3-step wizard |
| CH-6 | Agency-specific pricing per nationality — default and agency custom pricing consolidated in US-M2-07 |

---

## Deferred Logic Stoppers

Do **not** resolve these with assumptions. Wait for stakeholder input.

1. **Clearance engine source** — which external system provides the clearance decision?
2. **Pending Review ownership** — who owns inquiries in "Pending Review" status?
3. **Wallet pre-condition** — can agencies submit with zero wallet balance?
4. **Optional documents** — what document types are accepted for inquiry submission?
5. **Batch retry path** — how should failed entries within a batch be retried?
6. **Document ready notification** — when/how are users notified that their approval PDF is ready?

---

## Document Build Pipeline

1. Create a Node.js data file exporting a `STORIES` array
2. Write a Node.js build script using the `docx` npm library
3. Run: `node build_script.js`
4. Validate: `python /mnt/skills/public/docx/scripts/office/validate.py output.docx`
5. Render PDF: `python /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf output.docx`
6. Convert to JPEG: `pdftoppm -jpeg -r 120 output.pdf page`
7. Copy final `.docx` to `/mnt/user-data/outputs/`

### docx Library Critical Rules
- Set page size explicitly to A4
- Never use `\n` — use separate `Paragraph` elements
- Never use unicode bullets — use `LevelFormat.BULLET` with numbering config
- Always set table `width` with `WidthType.DXA` — never `WidthType.PERCENTAGE`
- Tables need dual widths: `columnWidths` array AND cell `width`, both must match
- Use `ShadingType.CLEAR` — never `SOLID` for table shading
- Never use tables as dividers — use `border` on a `Paragraph` instead

---

## Guiding Principles

1. **Change request traceability is a first-class concern.** Every modified or new story must carry its badge.
2. **Logic stoppers are catalogued and deferred, not assumed away.** Preserve decision integrity for stakeholders.
3. **Each module uses distinct persona colors** but identical card structure.
4. **Excluded stories are documented on the cover page** with explanation.
5. **User stories describe outcomes, not implementations.** The "how" is negotiable; the "what" is fixed.
6. **Acceptance criteria are conditions, not intentions.** If QA can't write a test from it, rewrite it.
7. **Form validation tables are mandatory for any story involving a form.** No exceptions.
8. **Plain language is mandatory.** Simple words. Short sentences. One idea at a time.
9. **Scope boundaries are mandatory for workflow stories.** Every story in a multi-step flow must state where it starts, where it ends, and what the adjacent stories cover.
10. **Grid specifications are mandatory for any story showing a data table.** No exceptions.
11. **Negative requirements are always separate ACs.** Never bury "No X is shown" inside a positive AC.
12. **Edge cases are explicit.** Define behavior for every possible state of the entity the story touches.
