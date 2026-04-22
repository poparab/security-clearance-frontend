# Security Clearance & Inquiry System — Project Instructions

## Project Overview

This project produces **structured user story documentation** for a Security Clearance & Inquiry System. The system screens travelers of designated nationalities before they finalize travel to Egypt. Output is formatted `.docx` files — one per module — containing user stories organized by persona, epic, and change request status.

### System Modules

Documentation is now organized by **release**, not module. Each release file is the authoritative source.

| Release File | Scope | Personas | Status |
|--------|-------|----------|--------|
| `docs/releases/MVP_User_Stories.md` | Agency registration, wallet-funded batch submission (web form — individual travelers only), admin config & wallet credit | Agency, Agency Representative, Admin, Operator | ✅ Complete (21 stories — wallet payment model, web form batch entry, draft saving) |
| `docs/releases/Release_1_User_Stories.md` | Auth safety nets, notifications, single inquiry, batch draft saving, shared-ticket groups, wallet history, outbound direction, full admin back-office | Agency, Agency Representative, Admin | ✅ Complete (31 stories — US-35 group moved from MVP, US-NEW-05/06 superseded by MVP CH-5) |
| `docs/releases/Release_2_User_Stories.md` | Individual traveler portal — registration, eligibility, inquiry, ESC payment, result tracking | Individual | ✅ Complete (23 stories) |
| Module 3 — Clearance Engine | Automated inquiry processing, red-flag evaluation, decision lifecycle, logging | System (Engine), Admin (view-only) | 🔲 Not started |
| Module 4 — Dashboards & Reporting | KPI dashboards, nationality analytics, agency performance, financial, batch monitoring, audit insights | Super Admin, Decision Makers | 🔲 Not started |

> Module 1 and Module 2 `.md` files have been retired. The release-based files above are canonical.

### Key Integrations

- **ESC Payment Gateway** — individual payments and agency wallet top-ups
- **External governmental entities** — clearance response retrieval (API-based, dynamically configurable)
- **QR verification** — approved inquiries generate a PDF with a scannable QR code linking to a public verification page

---

## User Story Authoring Rules

**Every user story must follow this exact structure. No exceptions.**

### 0. Language & Wording
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
- Must be unique enough to distinguish from similar stories in the backlog

### 2. User Story Statement
```
As a [specific user type],
I want to [perform a specific action],
So that [I achieve a concrete, valuable outcome].
```
- **As a…** — be specific: "an approved agency representative", not just "a user"
- **I want to…** — describe a capability, not an implementation ("submit an inquiry", not "call the API")
- **So that…** — state the business/user value; never restate the action

### 3. Acceptance Criteria
- Use **Given / When / Then** format exclusively
- Write **3–6 ACs** per story (more suggests the story is too large — split it)
- Each AC must be independently testable — one condition, one outcome
- Write ACs **before** development begins
- Include negative and edge cases, not just the happy path
- Avoid implementation language ("API returns 200 OK") — focus on observable behavior
- QA should be able to write a test directly from each AC without asking for clarification
- **AC table always has 5 columns in this exact order: `# | Scenario | Given | When | Then`.** The Scenario column is mandatory — it must contain a concise 3–7 word title that names the condition being tested (e.g. "Successful login and redirect", "Duplicate email rejection"). Never omit this column.
- **System messages** (any text that appears verbatim in the UI — error messages, toasts, warnings, dialog text) must be formatted as bold italic: `***message text***`. Do not use single quotes around them.
- **Never include story IDs (US-xx) or change request IDs (CH-x)** inside acceptance criteria text or user story statement bullets.
- **Multi-sentence Then cells:** when the Then statement contains more than one sentence, place each sentence on its own line using `<br>` inside the table cell.
- **Bullet-point packed assertions:** when a Then cell contains multiple checkable items (e.g. a screen shows field A, field B, field C, and two actions), format each item as a bullet using `<br>- ` so every assertion is visually distinct and individually verifiable.
- **Explicit field names — never vague categories:** never write "personal details" or "travel details" in an AC. Always list exact field names. If the field list is long, create a **Display Field Table** (Field Name | Source) or split into separate AC rows.
- **Negative requirements get their own AC row:** never bury a negative ("No fee breakdown is shown", "No rejection reason is displayed") inside a positive AC. Give it its own row with a clear Scenario name like "Fee details hidden from modal."
- **Complete edge-case coverage:** for every entity state the story touches, define behavior for ALL possible states. If a story handles login, specify what happens for every account status (Pending, Rejected, Suspended, Active). Do not leave gaps.

### 4. Form Validation Table
**Required whenever the story involves a form.** Include a table with these exact columns:

| Column | What to specify |
|--------|-----------------|
| **Field** | Label exactly as shown in UI — same name developers use in code |
| **Type** | HTML input type or component: text, email, password, number, date, select, checkbox, textarea |
| **Required** | Yes / No / Conditional (e.g., "Required if billing address differs") |
| **Constraints** | All rules: min/max length, format (regex), allowed characters, numeric range, file size |
| **Error Message** | Exact text shown to user. One message per rule violation. Must be specific and human-readable |

**Error message principles:**
- Be specific: "Email is required" not "Field is required"
- Be human: "Passwords do not match" not "Validation error: CONFIRM_PWD_MISMATCH"
- Tell the user what to do: "Must be at least 8 characters" not "Too short"
- Inline errors beside/below the field — never only a top-of-page banner
- Never clear a valid field because of an error in another field
- For security-sensitive fields, use neutral messages to prevent enumeration
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
Flag any story that violates any INVEST criterion:

| Letter | Property | Check Question |
|--------|----------|---------------|
| **I** | Independent | Can this story be pulled into any sprint without needing another story done first? |
| **N** | Negotiable | Is the team free to suggest alternative implementations for the same outcome? |
| **V** | Valuable | Would a non-technical stakeholder care if we shipped this? |
| **E** | Estimable | Can developers give a rough story-point estimate right now? |
| **S** | Small | Can this be built, reviewed, tested, and shipped in one sprint? |
| **T** | Testable | Can QA write a test case for every AC without asking for clarification? |

All six must hold simultaneously. The two most commonly violated are **V** (tasks masquerading as stories) and **T** (ACs written as intentions rather than conditions). A story that fails even one criterion goes back to refinement.

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

## MD → DOCX Shortcut

If the input is a `.md` file already structured as user stories, use the **`md-to-userstory-docx` skill** — it defines the expected markdown format, parsing rules, and guides the full build pipeline end-to-end. Do not hand-code the pipeline manually when this skill applies.

---

## Document Build Pipeline

Each module follows this exact pipeline:

### Step 1 — Data file
Create a Node.js file exporting a `STORIES` array (e.g., `m1_data.js`, `m2_data.js`).

Each story object contains: `id`, `title`, `priority`, `persona`, `epic`, `statement` (asA, iWantTo, soThat), `acceptanceCriteria[]`, optional `formValidation[]`, optional `changeRequest` metadata (type: "modified" | "new", crId: "CH-X").

### Step 2 — Build script
Write a Node.js build script using the `docx` library that imports the data array and generates the `.docx` file. Scripts live at `/home/claude/` (e.g., `build_m1_updated.js`, `build_m2_updated.js`).

### Step 3 — Generate
```bash
node build_script.js
```

### Step 4 — Validate
```bash
python /mnt/skills/public/docx/scripts/office/validate.py output.docx
```

### Step 5 — Render to PDF (visual check)
```bash
python /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf output.docx
```

### Step 6 — Convert to JPEG for inspection
```bash
pdftoppm -jpeg -r 120 output.pdf page
```

### Step 7 — Deliver
Copy final `.docx` to `/mnt/user-data/outputs/`.

---

## Document Formatting Standards

### Change Request Traceability
- **Modified stories** → amber badge: `✎ Change Request CH-X`
- **New stories** → green badge: `✔ New Story CH-X`
- Applied consistently across all modules on the story card

### Excluded Stories
Document excluded stories on the **cover page** with a note explaining the reason — never silently omit.

### Color Palette (per persona per module)
Each module uses a distinct color palette per persona to aid visual navigation while maintaining identical card structure across modules.

| Module | Persona | Color |
|--------|---------|-------|
| M1 | Individual User | (established in M1 build) |
| M1 | Agency User | (established in M1 build) |
| M2 | Admin | Steel teal |
| M2 | Super Admin | Deep indigo |

### Card Structure
All story cards share identical structure across modules:
- Story ID & title header
- Priority badge
- Persona label
- User Story Statement (As a / I want to / So that)
- Acceptance Criteria table (numbered, Given/When/Then)
- Form Validation table (when applicable)
- Change request badge (when applicable)

### Document Organization
- Stories grouped by **persona** section
- Within each persona, stories grouped by **epic**
- Epic divider pages separate groups within a persona section

---

## Approved Change Requests

| CR ID | Description | Affected Module(s) |
|-------|-------------|---------------------|
| CH-1 | From Egypt direction (travel origin context) | M1, M2 (US-M2-06, US-M2-07) |
| CH-2 | Structured transit fields | M1 |
| CH-3 | Manual traveler entry | M1 |
| CH-4 | Hide fees from agency-facing screens — balance-only validation | MVP, R1 |
| CH-5 | Web form replaces file upload — batch submission via 3-step wizard (name → travelers → review) | MVP, R1 |
| CH-6 | Agency-specific pricing per nationality — default and agency custom pricing consolidated in US-M2-07 | MVP |

---

## Open Items

### Six Deferred Logic Stoppers
These are catalogued and deferred explicitly — do **not** resolve with assumptions. Wait for stakeholder input.

1. **Clearance engine source undefined** — which external system provides the actual clearance decision?
2. **Pending Review ownership gap** — who owns inquiries in "Pending Review" status?
3. **Wallet pre-condition contradiction** — can agencies submit inquiries with zero wallet balance?
4. **Undefined optional documents** — what are the accepted optional document types for inquiry submission?
5. **Batch failed entry retry path** — how should failed entries within a batch be retried?
6. **Document pending notification gap** — when/how are users notified that their approval document is ready?

### Pending Stakeholder Confirmation
- Maximum transit stop count (currently assumed: 4)
- Egyptian airport list (for arrival airport dropdown)

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

---

## Inquiry Status Lifecycle

```
Submitted → Payment Pending → Under Processing → Approved / Rejected / Failed
```

- **Payment Pending** — inquiry saved but payment not yet completed
- **Under Processing** — payment confirmed, sent to Clearance Engine
- **Approved** — clearance granted, PDF document generated
- **Rejected** — clearance denied, reason stored
- **Failed** — system error during processing

---

## Technical Stack (Documentation Build)

- **Runtime:** Node.js
- **Document library:** `docx` (npm, installed globally)
- **Validation:** `python /mnt/skills/public/docx/scripts/office/validate.py`
- **PDF rendering:** `soffice.py` (LibreOffice headless) at `/mnt/skills/public/docx/scripts/office/soffice.py`
- **Image conversion:** `pdftoppm` (Poppler)
- **Working directory:** `/home/claude/`
- **Output directory:** `/mnt/user-data/outputs/`

### Existing Build Artifacts
- `m1_data.js` / `build_m1_updated.js` — original Module 1 docx build (historical reference)
- `m2_data.js` / `build_m2_updated.js` — original Module 2 docx build (historical reference)
- `Module1_User_Stories_Updated.docx` — original Module 1 docx output (historical reference)
- `Module2_User_Stories_Updated.docx` — original Module 2 docx output (historical reference)

### docx Library Critical Rules
- Set page size explicitly (defaults to A4) — use A4 for this project
- Never use `\n` — use separate `Paragraph` elements
- Never use unicode bullets — use `LevelFormat.BULLET` with numbering config
- Always set table `width` with `WidthType.DXA` — never `WidthType.PERCENTAGE`
- Tables need dual widths: `columnWidths` array AND cell `width`, both must match
- Use `ShadingType.CLEAR` — never `SOLID` for table shading
- Never use tables as dividers — use `border` on a `Paragraph` instead

---

## Project Reference Documents

These are the authoritative sources. When in doubt, defer to:

1. **docs/reference/BRD-v1.0.docx** — Business Requirements Document (scope, constraints, scenarios, module definitions)
2. **User_Story_Optimal_Format.docx** — Canonical user story structure reference
3. **docs/releases/MVP_User_Stories.md** — Canonical MVP story source (17 stories, wallet payment model)
4. **docs/releases/Release_1_User_Stories.md** — Canonical Release 1 source (30 stories)
5. **docs/releases/Release_2_User_Stories.md** — Canonical Release 2 source (23 stories — Individual portal)
6. **Module1_User_Stories_Updated.docx** — Historical M1 docx output (pattern reference for docx formatting)
7. **Module2_User_Stories_Updated.docx** — Historical M2 docx output (pattern reference for docx formatting)
5. **HTML mockups** (1–15, Portal series) — UI screen references for form fields and workflows
6. **HTML mockups** (1–5, eSecurity series) — Clearance Engine / inter-governmental screen references

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
