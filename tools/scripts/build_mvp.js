'use strict';
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, PageBreak
} = require('docx');
const fs = require('fs');
const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// ════════════════════════════════════════════════════
// CONSTANTS
// ════════════════════════════════════════════════════
const A4_W = 11906, A4_H = 16838, MAR = 1440;
const CW = A4_W - 2 * MAR; // 9026

const AGENCY    = '1B4F8A';
const AGENCY_LT = 'DCE8F5';
const ADMIN     = '2E7D7E';
const ADMIN_LT  = 'DCEEF0';
const RED       = 'C0392B';
const AMBER     = 'D4880A';
const GREEN     = '1D8348';
const WHITE     = 'FFFFFF';
const DARK      = '1C2833';
const MED_GRAY  = '7F8C8D';
const TABLE_HDR = '2C3E50';
const ROW_ALT   = 'F2F3F4';
const BORDER    = 'BDC3C7';

// ════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════
const sb = (c = BORDER) => ({ style: BorderStyle.SINGLE, size: 1, color: c });
const allBorders = (c = BORDER) => ({ top: sb(c), bottom: sb(c), left: sb(c), right: sb(c) });
const T = (text, opts = {}) => new TextRun({ text: String(text ?? ''), font: 'Arial', ...opts });
const emptyRow = (sp = 80) => new Paragraph({ children: [], spacing: { before: sp, after: sp } });

function makeCell(content, { w, bg, bold = false, align = AlignmentType.LEFT,
  vAlign = VerticalAlign.CENTER, color = DARK, size = 18 } = {}) {
  const para = new Paragraph({
    children: [T(String(content ?? ''), { bold, color, size })],
    alignment: align,
    spacing: { before: 60, after: 60 },
  });
  const props = {
    children: [para],
    borders: allBorders(),
    width: { size: w, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: vAlign,
  };
  if (bg) props.shading = { fill: bg, type: ShadingType.CLEAR };
  return new TableCell(props);
}

function hdrRow(cols) {
  return new TableRow({
    tableHeader: true,
    children: cols.map(c => makeCell(c.text, { w: c.w, bg: TABLE_HDR, bold: true, color: WHITE, size: 18 })),
  });
}

function groupByEpic(stories) {
  const map = new Map();
  for (const s of stories) {
    if (!map.has(s.epic)) map.set(s.epic, []);
    map.get(s.epic).push(s);
  }
  return map;
}

// ════════════════════════════════════════════════════
// STORY DATA
// ════════════════════════════════════════════════════
const STORIES = {
  agency: [
    // ── Epic: Account Registration & Onboarding ──────────────────────────────
    {
      id: 'US-22',
      title: 'Agency registers and submits for admin approval',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Account Registration & Onboarding',
      statement: {
        asA: 'a travel agency representative who wants to use the portal to submit security inquiries',
        iWantTo: 'register the agency by submitting its details and required documents for admin review and approval',
        soThat: 'the agency account is created in a pending state and the admin can review it before granting access',
      },
      acs: [
        { given: 'The representative navigates to Agency Registration and completes all required fields and uploads valid documents', when: 'The form is submitted', then: 'The system creates a pending agency account and sends a confirmation email to the representative' },
        { given: 'The form is submitted', when: '—', then: 'The admin receives a notification about the new pending registration' },
        { given: 'A required document is missing', when: 'The form is submitted', then: 'The system highlights the missing upload field and blocks submission' },
        { given: 'The email address used is already associated with an existing agency', when: '—', then: 'The system displays: "An account with this email already exists."' },
        { given: 'The registration is submitted', when: '—', then: 'The representative sees a status page: "Your registration has been submitted and is pending review. You will be notified once a decision is made."' },
      ],
      formValidation: [
        { field: 'Agency Name', type: 'Text', required: 'Yes', constraints: 'Min 3, Max 200 chars', trigger: 'On blur & submit', error: 'Agency name is required (3-200 characters).' },
        { field: 'Commercial Reg. Number', type: 'Text', required: 'Yes', constraints: 'Alphanumeric, unique in system', trigger: 'On blur & submit', error: 'Please enter a valid commercial registration number.' },
        { field: 'Representative Name', type: 'Text', required: 'Yes', constraints: 'Min 2, Max 150 chars', trigger: 'On blur & submit', error: 'Representative name is required.' },
        { field: 'Email Address', type: 'Email', required: 'Yes', constraints: 'Valid format, unique in system', trigger: 'On blur & submit', error: 'Please enter a valid, unique email address.' },
        { field: 'Mobile Number', type: 'Tel', required: 'Yes', constraints: 'Valid international format', trigger: 'On blur & submit', error: 'Please enter a valid mobile number.' },
        { field: 'Agency Document Upload', type: 'File', required: 'Yes', constraints: 'PDF, max 5 MB, official trade license', trigger: 'On submit', error: 'Please upload the required agency document.' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. Entry point of the agency flow.' },
    },
    {
      id: 'US-26',
      title: 'Agency representative logs in to dashboard',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Account Registration & Onboarding',
      statement: {
        asA: 'an approved travel agency representative',
        iWantTo: 'log in to the agency portal using my registered email and password',
        soThat: 'I can access the agency dashboard and submit and track inquiries for my agency\'s travelers',
      },
      acs: [
        { given: 'The representative enters a valid email and correct password', when: 'They click Login', then: 'The system authenticates and redirects to the agency dashboard' },
        { given: 'Invalid credentials are entered', when: '—', then: 'The system displays: "Incorrect email or password." without revealing which field is wrong' },
        { given: 'The agency account is not yet approved', when: 'Login is attempted', then: 'Login is blocked with: "Your account is pending approval. You will be notified once it is activated."' },
        { given: 'The representative logs in successfully', when: 'The dashboard loads', then: 'A Recent Inquiries panel shows the last 5 single and batch inquiries with reference number, type (Single/Batch), current status, and a direct link to each inquiry\'s detail page' },
        { given: 'Any inquiry in the Recent Inquiries panel has Payment Pending status', when: '—', then: 'A "Complete Payment" button is shown alongside it so the representative can immediately retry the ESC payment without losing the inquiry record' },
        { given: 'A successful login occurs', when: '—', then: 'The last login timestamp is updated and displayed in the dashboard header' },
      ],
      formValidation: [
        { field: 'Email Address', type: 'Email', required: 'Yes', constraints: 'Registered and approved agency email', trigger: 'On submit', error: 'Please enter a valid email address.' },
        { field: 'Password', type: 'Password', required: 'Yes', constraints: 'Min 8 chars, matching registered password', trigger: 'On submit', error: 'Incorrect email or password.' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. Core agency auth story. MVP revision: Added Recent Inquiries panel (AC4) and Payment Pending retry button (AC5) to resolve navigation and retry gaps.' },
    },

    // ── Epic: Eligibility & Submission ───────────────────────────────────────
    {
      id: 'US-29',
      title: 'Agency submits single traveler inquiry to Egypt with transit details',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Eligibility & Submission',
      changeRequest: { type: 'modified', crId: 'CH-2', label: 'Modified (inbound/transit structured fields)' },
      statement: {
        asA: 'an approved travel agency representative who needs to submit a security inquiry for one traveler coming to Egypt',
        iWantTo: 'enter the traveler\'s personal, passport, and inbound travel details including up to three structured transit stops, confirm the calculated fee, and complete direct payment via the ESC gateway',
        soThat: 'a single To Egypt inquiry is created under the agency\'s account, paid for, and submitted to the clearance engine without requiring a batch file',
      },
      acs: [
        { given: 'The representative opens the single inquiry form and selects the traveler\'s nationality', when: '—', then: 'The system checks whether that nationality requires a security inquiry for To Egypt travel; if not required it displays: "This nationality does not require a security inquiry for travel to Egypt." and prevents form submission' },
        { given: 'Nationality eligibility is confirmed', when: '—', then: 'The travel section shows: Departure Country (required), Arrival Airport in Egypt (required), and Travel Date — all scoped to inbound travel' },
        { given: 'The representative clicks Add Transit Stop', when: '—', then: 'A structured stop row appears with: Transit Country (required for that stop), Transit Airport (optional), Layover Duration in hours (optional), and Connecting Flight Number (optional) — up to 3 stops max; the Add button is hidden once 3 stops are added' },
        { given: 'All required fields are completed and the representative clicks Review', when: '—', then: 'A fee preview screen shows: traveler name, nationality, travel date, and the calculated fee for this inquiry before any payment is initiated' },
        { given: 'The representative confirms on the fee preview and is redirected to the ESC gateway', when: 'Payment is completed', then: 'The inquiry is created with Under Processing status and the representative is redirected to the payment confirmation screen' },
        { given: 'Payment fails or the gateway times out', when: '—', then: 'The inquiry is saved with Payment Pending status and is visible in the dashboard\'s Recent Inquiries panel with a "Complete Payment" button' },
      ],
      formValidation: [
        { field: 'Full Name', type: 'Text', required: 'Yes', constraints: 'Min 2, Max 150 chars', trigger: 'On blur & submit', error: 'Full name is required (2-150 characters).' },
        { field: 'Nationality', type: 'Select', required: 'Yes', constraints: 'Predefined list; must be eligibility-checked', trigger: 'On change & submit', error: 'Please select the traveler\'s nationality.' },
        { field: 'Passport Number', type: 'Text', required: 'Yes', constraints: '6-20 chars, alphanumeric, uppercase', trigger: 'On blur & submit', error: 'Passport number must be 6-20 alphanumeric characters.' },
        { field: 'Passport Expiry Date', type: 'Date', required: 'Yes', constraints: 'Future date, at least 6 months from travel date', trigger: 'On blur & submit', error: 'Passport must be valid for at least 6 months from the travel date.' },
        { field: 'Travel Date', type: 'Date', required: 'Yes', constraints: 'Today or future date', trigger: 'On blur & submit', error: 'Travel date must be today or a future date.' },
        { field: 'Departure Country', type: 'Select', required: 'Yes', constraints: 'Country list (all countries)', trigger: 'On submit', error: 'Please select the departure country.' },
        { field: 'Arrival Airport in Egypt', type: 'Select', required: 'Yes', constraints: 'Configured Egyptian airport list', trigger: 'On submit', error: 'Please select the arrival airport in Egypt.' },
        { field: 'Purpose of Travel', type: 'Select', required: 'Yes', constraints: 'Tourism, Business, Medical, Family, Education, Conference, Transit, Other', trigger: 'On submit', error: 'Please select the purpose of travel.' },
        { field: 'Flight Number', type: 'Text', required: 'No', constraints: 'Max 10 chars, alphanumeric', trigger: 'On blur', error: 'Flight number must be alphanumeric, max 10 characters.' },
        { field: 'Transit Country (per stop)', type: 'Select', required: 'Conditional', constraints: 'Required if stop row exists; max 3 stops', trigger: 'On submit', error: 'Please select the country for this transit stop.' },
        { field: 'Layover Duration (per stop)', type: 'Number', required: 'No', constraints: '0-72 hours, integer', trigger: 'On blur', error: 'Layover duration must be between 0 and 72 hours.' },
        { field: 'Connecting Flight No. (per stop)', type: 'Text', required: 'No', constraints: 'Max 10 chars, alphanumeric', trigger: 'On blur', error: 'Flight number must be alphanumeric, max 10 characters.' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. MVP revision: Direction selector removed (To Egypt only); transit stop cap 3; nationality eligibility check (AC1); fee preview step (AC4). Modified for CH-2.' },
    },

    // ── Epic: Payment ─────────────────────────────────────────────────────────
    {
      id: 'US-30',
      title: 'Agency receives payment confirmation for single inquiry',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Payment',
      statement: {
        asA: 'an approved agency representative who completed payment for a single inquiry',
        iWantTo: 'receive a payment confirmation record with transaction reference, amount, and inquiry reference, with a direct link to view the inquiry',
        soThat: 'the agency has documented financial proof and can immediately navigate to track the inquiry\'s processing status',
      },
      acs: [
        { given: 'Payment is confirmed', when: '—', then: 'The confirmation screen shows: inquiry reference, traveler name, amount, ESC transaction reference, timestamp, and a prominent "View Inquiry Details" button' },
        { given: '"Download Receipt" is clicked', when: '—', then: 'A PDF receipt is downloaded with all confirmation details' },
        { given: 'The representative navigates away and returns to the inquiry later', when: '—', then: 'Transaction details remain accessible from the inquiry detail view' },
        { given: 'The inquiry has Payment Pending status', when: 'The representative clicks "Complete Payment" from the dashboard Recent Inquiries panel', then: 'They are redirected to the ESC gateway pre-loaded with the same inquiry reference and outstanding fee amount' },
        { given: 'ESC confirms payment but inquiry creation fails on the system side', when: '—', then: 'The payment confirmation is still displayed and the case is flagged for manual reconciliation with a support reference number shown' },
        { given: 'Payment is successful', when: '—', then: 'A confirmation email is sent to the agency\'s registered email address within 5 minutes' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — directly follows US-29. Same sprint. MVP revision: Added "View Inquiry Details" button (AC1) and Payment Pending retry path (AC4).' },
    },

    // ── Epic: Inquiry Tracking & Results ──────────────────────────────────────
    {
      id: 'US-31',
      title: 'Agency views single inquiry result',
      priority: 'Priority 2 — High',
      persona: 'Agency User',
      epic: 'Inquiry Tracking & Results',
      statement: {
        asA: 'an approved agency representative who submitted a single inquiry',
        iWantTo: 'view the outcome of the single traveler inquiry including the decision status, decision date, and approval document when approved',
        soThat: 'the agency can communicate accurate results to the traveler without relying on manual follow-up',
      },
      acs: [
        { given: 'The inquiry has been decided', when: 'The representative opens the detail page', then: 'It shows: status (Approved / Rejected / Failed), decision date, and traveler details' },
        { given: 'The inquiry is rejected', when: '—', then: 'The status is displayed as "Rejected" with the decision date and a support contact note; no rejection reason is shown as automated decisions carry no reason code' },
        { given: 'The inquiry is approved', when: '—', then: 'The approval reference, valid-from and valid-to dates, and a "Download PDF" button are all shown on the detail page' },
        { given: '"Download PDF" is clicked on an approved inquiry', when: '—', then: 'The approval document PDF (including the QR code) is downloaded to the representative\'s device' },
        { given: 'The inquiry is still under processing', when: '—', then: 'The current processing stage is shown with a status indicator and no decision section is rendered' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — requires a decided inquiry from the clearance engine. Same MVP sprint. MVP revision: Title updated; AC2 clarifies no reason displayed; AC3-4 cover approval PDF download.' },
    },

    // ── Epic: Batch Inquiry ───────────────────────────────────────────────────
    {
      id: 'US-34',
      title: 'Agency downloads batch inquiry file template',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      changeRequest: { type: 'modified', crId: 'CH-2', label: 'Modified (structured transit stop columns)' },
      statement: {
        asA: 'an approved agency representative who wants to submit a batch inquiry for travelers coming to Egypt',
        iWantTo: 'download the official batch file template which includes all required inbound travel columns and 12 structured transit stop columns (3 stops x 4 fields each)',
        soThat: 'I have the complete column structure to prepare a valid To Egypt batch with full structured transit data',
      },
      acs: [
        { given: 'The representative navigates to Submit Batch Inquiry', when: 'The screen loads', then: 'A "Download Template" button is clearly visible before the file upload field' },
        { given: 'The representative clicks "Download Template"', when: 'The file downloads', then: 'It contains all 21 columns in order: Traveler_Name, Nationality, Passport_Number, Passport_Expiry, Travel_Date, Departure_Country, Arrival_Airport_Egypt, Purpose, Flight_Number, followed by 12 transit stop columns (3 stops x 4 fields each)' },
        { given: 'The template is opened', when: 'Row 2 is visible', then: 'It contains guidance notes: Arrival_Airport_Egypt reads "Select from Egyptian airport list"; transit country columns note "Required if stop exists"; all other transit columns note "Optional"' },
        { given: 'The admin has updated the configured batch fields', when: 'The representative downloads the template', then: 'The downloaded template reflects the latest configured fields' },
        { given: 'Both formats are available', when: 'The representative clicks Download', then: 'They can choose between .xlsx and .csv — both contain identical column structures and the guidance row' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. MVP revision: Direction column removed (To Egypt only). Transit columns reduced to 12 (3 stops). Total: 9 core + 12 transit = 21 columns. Modified for CH-2.' },
    },
    {
      id: 'US-35',
      title: 'Agency uploads batch file with per-row validation',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      changeRequest: { type: 'modified', crId: 'CH-2', label: 'Modified (transit stop field validation)' },
      statement: {
        asA: 'an approved agency representative who has prepared the batch template file for inbound travelers',
        iWantTo: 'upload the completed batch file and receive per-row validation results covering all required fields, inbound travel fields, and structured transit stop data',
        soThat: 'I can catch all data errors before fees are calculated and correct them before committing to payment',
      },
      acs: [
        { given: 'The representative navigates to Submit Batch Inquiry', when: 'The screen loads', then: 'A single file upload area is shown with an accepted format note (.xlsx or .csv) and the "Download Template" button' },
        { given: 'The representative uploads a file', when: '—', then: 'The system validates every row for: all required fields present and correctly formatted, Departure_Country not empty, Arrival_Airport_Egypt matching a configured Egyptian airport, Passport_Expiry at least 6 months from Travel_Date, and Travel_Date being today or in the future' },
        { given: 'A row contains transit stop data', when: '—', then: 'The system validates: Transit_Stop_N_Country is required for any stop where any of the four stop fields is filled; Transit_Stop_N_Hours must be 0-72 if provided; no more than 3 transit stops are filled (rows with stop 4 data or beyond are flagged)' },
        { given: 'Validation finds errors in one or more rows', when: '—', then: 'A per-row error table is displayed showing: Row Number, Column Name, and Error Description for each failure — the representative can correct and re-upload without losing the session' },
        { given: 'A row has valid data but the traveler\'s nationality is not configured as requiring an inquiry for To Egypt travel', when: '—', then: 'That row is flagged with: "Nationality [X] does not require an inquiry for To Egypt travel. Remove this row or verify the nationality."' },
        { given: 'All rows pass validation', when: '—', then: 'A success summary is shown with the total traveler count and "Proceed to Fee Calculation" is enabled' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — depends on US-34. Same sprint. MVP revision: Manual Entry tab (CH-3) removed — upload-only path. Transit stop cap enforced at 3 (AC3). Nationality eligibility check added per row (AC5).' },
    },
    {
      id: 'US-36',
      title: 'Agency re-uploads corrected batch file after validation failure',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      statement: {
        asA: 'an approved agency representative whose batch file failed validation',
        iWantTo: 'correct the errors and re-upload the file without losing the session or restarting the submission from scratch',
        soThat: 'the corrected file is revalidated and submission can proceed without navigating back through all previous steps',
      },
      acs: [
        { given: 'The validation report shows errors', when: '"Fix and Re-upload" is clicked', then: 'The upload field resets while the error report remains visible on screen for reference' },
        { given: 'A corrected file is uploaded', when: '—', then: 'A fresh validation report replaces the previous one completely' },
        { given: 'The corrected file passes all validations', when: '—', then: 'An updated success summary is shown and "Proceed to Fee Calculation" is enabled' },
        { given: 'The corrected file still has errors', when: '—', then: 'Only the remaining errors are reported, allowing iterative correction' },
        { given: '60 minutes pass without any file upload action', when: '—', then: 'The system displays a session expiry warning and preserves the last error report until the session ends' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — direct continuation of US-35 validation flow. Same sprint. No changes from Module 1 version.' },
    },
    {
      id: 'US-37',
      title: 'Agency views batch fee calculation before payment',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      statement: {
        asA: 'an approved agency representative whose batch file has passed validation',
        iWantTo: 'view the full fee breakdown by nationality before committing to payment',
        soThat: 'I can verify the calculated cost against my budget before any payment is processed, avoiding unexpected charges',
      },
      acs: [
        { given: 'The batch passes validation', when: '—', then: 'The fee summary screen shows a breakdown table with columns: Nationality, Traveler Count, Fee Per Traveler, and Subtotal per nationality group' },
        { given: 'The fee breakdown is shown', when: '—', then: 'A grand total is displayed prominently below the table with a non-refundable notice' },
        { given: 'The fee is derived from the admin fee configuration', when: '—', then: 'Each nationality\'s fee per traveler exactly matches the configured To Egypt fee for that nationality' },
        { given: 'The representative clicks "Cancel"', when: '—', then: 'The batch data is discarded, no payment is initiated, and the representative is returned to the batch submission screen' },
        { given: 'The representative clicks "Proceed to Payment"', when: '—', then: 'They are redirected to the ESC gateway pre-loaded with the batch reference and the total amount' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — follows US-35/36; fee calculation depends on US-M2-07. Same sprint. MVP revision: Direction column removed from fee breakdown table (all rows are To Egypt).' },
    },
    {
      id: 'US-38',
      title: 'Agency submits batch inquiry with direct payment',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      statement: {
        asA: 'an approved agency representative who has reviewed the batch fee',
        iWantTo: 'complete payment for the entire batch via the ESC payment gateway in a single transaction',
        soThat: 'the batch is paid for and all travelers in the batch are submitted to the clearance engine for processing',
      },
      acs: [
        { given: 'The representative clicks "Proceed to Payment" from the fee screen', when: '—', then: 'The ESC gateway opens pre-loaded with the batch reference and the total amount' },
        { given: 'Payment is completed successfully', when: '—', then: 'All travelers in the batch move to Under Processing status and the representative is redirected to the batch payment confirmation screen' },
        { given: 'Payment fails at the ESC gateway', when: '—', then: 'The batch is saved as Payment Pending and the representative is shown an error message with a "Retry Payment" button' },
        { given: 'The ESC gateway does not respond within the configured timeout', when: '—', then: 'The batch is saved as Payment Pending to prevent double-charging, and the representative is notified to check their payment status' },
        { given: 'Payment is successful', when: '—', then: 'The batch and all its travelers are immediately accessible from the agency dashboard\'s Recent Inquiries panel' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — requires US-37 (fee review) and ESC gateway integration. Same sprint. No material changes from Module 1 version.' },
    },
    {
      id: 'US-39',
      title: 'Agency receives payment confirmation for batch',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      statement: {
        asA: 'an approved agency representative who completed payment for a batch inquiry',
        iWantTo: 'receive a batch payment confirmation showing the transaction reference and traveler count, with a direct link to view the batch',
        soThat: 'the agency has documented financial proof for the batch payment and can immediately navigate to monitor each traveler\'s processing status',
      },
      acs: [
        { given: 'Batch payment is confirmed', when: '—', then: 'The confirmation screen shows: batch reference, traveler count, total amount, ESC transaction reference, timestamp, and a prominent "View Batch Details" button' },
        { given: '"Download Batch Receipt" is clicked', when: '—', then: 'A PDF receipt is downloaded with all batch payment details' },
        { given: 'The representative navigates away and returns later', when: '—', then: 'Batch payment details remain accessible from the batch detail view' },
        { given: 'The batch has Payment Pending status', when: 'The representative clicks "Complete Payment" from the dashboard Recent Inquiries panel', then: 'They are redirected to the ESC gateway pre-loaded with the batch reference and the outstanding total amount' },
        { given: 'ESC confirms payment but batch creation fails on the system side', when: '—', then: 'The payment confirmation is still displayed and the batch is flagged for manual reconciliation with a support reference number shown' },
        { given: 'Payment is successful', when: '—', then: 'A confirmation email is sent to the agency\'s registered email within 5 minutes' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — directly follows US-38. Same sprint. MVP revision: Added "View Batch Details" button (AC1) and Payment Pending retry path (AC4).' },
    },
    {
      id: 'US-40',
      title: 'Agency views batch details and per-traveler statuses',
      priority: 'Priority 1 — Critical',
      persona: 'Agency User',
      epic: 'Batch Inquiry',
      statement: {
        asA: 'an approved agency representative who has submitted and paid for a batch inquiry',
        iWantTo: 'view the full details of the batch including a per-traveler status breakdown and download individual approval documents',
        soThat: 'the agency can monitor clearance progress for each traveler and distribute approval documents as they become available',
      },
      acs: [
        { given: 'The representative opens a batch via the "View Batch Details" button or from the dashboard', when: '—', then: 'The batch detail screen shows: batch reference, submission date, traveler count, total fee paid, and a per-traveler table' },
        { given: 'The per-traveler table loads', when: '—', then: 'It shows for each row: traveler name, nationality, passport number, inquiry status (Submitted / Payment Pending / Under Processing / Approved / Rejected / Failed), and decision date when available' },
        { given: 'A traveler\'s inquiry is approved', when: '—', then: 'A "Download PDF" button is available in that traveler\'s row; clicking it downloads the individual approval document including the traveler\'s QR code' },
        { given: 'A traveler\'s inquiry is rejected', when: '—', then: 'The row shows "Rejected" status with the decision date; no download button and no rejection reason link are shown, as automated decisions carry no reason code' },
        { given: 'Multiple travelers share the same status', when: '—', then: 'The per-traveler table can be filtered by status to show only travelers in a selected state' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — requires confirmed batch payment (US-38/39). Same MVP sprint. MVP revision: Direction column removed; AC3 covers individual PDF download; AC4 corrected — no rejection reason shown.' },
    },
  ],

  admin: [
    // ── Epic: Authentication & Access ─────────────────────────────────────────
    {
      id: 'US-M2-01',
      title: 'Admin logs in to administration portal',
      priority: 'Priority 1 — Critical',
      persona: 'Admin',
      epic: 'Authentication & Access',
      statement: {
        asA: 'a system administrator who manages the Security Clearance & Inquiry System',
        iWantTo: 'log in to the administration portal using my registered credentials',
        soThat: 'I can access the admin control panel and perform my assigned administrative duties securely',
      },
      acs: [
        { given: 'The admin navigates to the portal login page and enters a valid email and correct password', when: 'They click Login', then: 'The system authenticates and redirects to the admin dashboard within 3 seconds' },
        { given: 'The admin enters a valid email but incorrect password', when: 'They submit', then: 'The system displays: "Incorrect email or password. Please try again." without revealing whether the email is registered' },
        { given: 'The admin is authenticated', when: 'Their session is idle for more than 30 minutes', then: 'The system automatically logs them out and displays a session expiry notification on the login page' },
        { given: 'The admin\'s account has been deactivated by another admin', when: 'They attempt to log in', then: 'The system displays: "Your account has been deactivated. Please contact your system administrator." and denies access' },
        { given: 'The admin logs in successfully', when: 'They navigate through the portal', then: 'The system displays only the menu items and modules permitted by their assigned role' },
      ],
      formValidation: [
        { field: 'Email Address', type: 'Email', required: 'Yes', constraints: 'Valid email format, must be registered as an admin account', trigger: 'On submit', error: 'Incorrect email or password. Please try again.' },
        { field: 'Password', type: 'Password', required: 'Yes', constraints: 'Non-empty', trigger: 'On submit', error: 'Incorrect email or password. Please try again.' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. Foundation story for all Module 2 access. No changes from Module 2 version.' },
    },

    // ── Epic: Nationality & Fee Configuration ─────────────────────────────────
    {
      id: 'US-M2-06',
      title: 'Admin configures nationalities for security inquiry requirement',
      priority: 'Priority 1 — Critical',
      persona: 'Admin',
      epic: 'Nationality & Fee Configuration',
      statement: {
        asA: 'an administrator acting on a government policy directive',
        iWantTo: 'enable or disable the "Security Inquiry Required" flag for specific nationalities',
        soThat: 'the portal immediately enforces the correct nationality eligibility rules for all new To Egypt inquiry submissions, ensuring compliance with current governmental policy without a system restart',
      },
      acs: [
        { given: 'The admin opens the Nationality Rules screen', when: 'The screen loads', then: 'It displays a searchable list of all nationalities showing: Nationality Name, Inquiry Required status (Enabled / Disabled), and the date of last change' },
        { given: 'The admin enables the inquiry requirement for a nationality and saves', when: 'The change is confirmed', then: 'All new inquiries submitted for that nationality require a security inquiry at the eligibility check; the change takes effect within 60 seconds without a page refresh' },
        { given: 'The admin disables the inquiry requirement for a nationality that has active pending inquiries', when: 'The change is saved', then: 'A warning is shown: "There are [X] active inquiries for this nationality. This change applies to new submissions only. Existing inquiries are not affected." before proceeding' },
        { given: 'Any nationality rule is changed', when: 'The change is saved', then: 'The audit log records: which admin made the change, the nationality affected, the previous state, the new state, and the timestamp' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. MVP revision: Direction Scope column removed — MVP supports To Egypt only. Full direction-scope configuration deferred to Release 1 when outbound travel is introduced.' },
    },
    {
      id: 'US-M2-07',
      title: 'Admin sets and updates inquiry fees per nationality',
      priority: 'Priority 1 — Critical',
      persona: 'Admin',
      epic: 'Nationality & Fee Configuration',
      statement: {
        asA: 'an administrator acting on a fee adjustment directive from government or internal policy',
        iWantTo: 'set, update, or review the inquiry fee amounts applied per nationality and per inquiry type (Individual or Batch) for inbound travel to Egypt',
        soThat: 'all future To Egypt inquiry submissions reflect the correct fee for each nationality and inquiry type, ensuring accurate billing',
      },
      acs: [
        { given: 'The admin opens Fee Management', when: 'The screen loads', then: 'It displays a table of all active pricing rules showing: Nationality, Inquiry Type (Individual / Batch), Fee Amount, Currency, Effective Date, and Status' },
        { given: 'The admin selects a nationality and inquiry type, enters a fee amount, and confirms', when: '—', then: 'The system saves the new fee as active for that nationality-type combination and applies it to all new submissions from that point forward' },
        { given: 'The admin attempts to save a fee with a value of zero, a negative number, or non-numeric input', when: 'They submit', then: 'The system displays: "Please enter a valid fee amount greater than zero." and blocks the save' },
        { given: 'The admin updates a fee for a nationality', when: 'The save is confirmed', then: 'The previous fee rule is retained in history with its effective date range and the new rule is marked as current' },
        { given: 'No fee is configured for a nationality', when: 'An inquiry is attempted for that nationality', then: 'The system flags: "No fee configured for [Nationality] — Individual. Submissions for this nationality will be blocked until a fee is set."' },
        { given: 'Any fee change is saved', when: 'The save completes', then: 'The audit log records: the admin identity, the nationality, the inquiry type, the previous fee, the new fee, and the timestamp' },
      ],
      formValidation: [
        { field: 'Nationality', type: 'Select', required: 'Yes', constraints: 'Must select from configured nationality list', trigger: 'On submit', error: 'Please select a nationality.' },
        { field: 'Inquiry Type', type: 'Select', required: 'Yes', constraints: 'Must select: Individual or Batch', trigger: 'On submit', error: 'Please select the inquiry type.' },
        { field: 'Fee Amount', type: 'Number', required: 'Yes', constraints: 'Positive number, greater than zero, max 2 decimal places', trigger: 'On blur & submit', error: 'Please enter a valid fee amount greater than zero.' },
        { field: 'Currency', type: 'Select', required: 'Yes', constraints: 'Must select from configured currency list (e.g. EGP, USD)', trigger: 'On submit', error: 'Please select a currency.' },
        { field: 'Effective From Date', type: 'Date', required: 'Yes', constraints: 'Must be today or a future date', trigger: 'On blur & submit', error: 'Effective date must be today or a future date.' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — nationality list depends on US-M2-06. MVP revision: Direction field removed — fees configured per nationality and inquiry type for To Egypt only. Full direction-based differentiation deferred to Release 1.' },
    },

    // ── Epic: Agency Management ───────────────────────────────────────────────
    {
      id: 'US-M2-09',
      title: 'Admin reviews and approves new agency registration',
      priority: 'Priority 1 — Critical',
      persona: 'Admin',
      epic: 'Agency Management',
      statement: {
        asA: 'an administrator responsible for onboarding travel agencies onto the platform',
        iWantTo: 'review a pending agency registration including their submitted documents and business details, and approve the application',
        soThat: 'only verified and legitimate travel agencies are granted access to the portal, protecting the system from fraudulent or unauthorized use',
      },
      acs: [
        { given: 'A new agency has submitted a registration', when: 'The admin opens the Agency Management screen', then: 'The pending registration appears in the Pending Review queue with: agency name, submission date, representative name, and a "Review" action' },
        { given: 'The admin opens a pending registration', when: 'The review screen loads', then: 'It displays all submitted details (agency name, commercial reg. number, representative name, email, mobile) and inline document previews for each uploaded file' },
        { given: 'The admin reviews the details and documents and is satisfied', when: 'They click "Approve" and confirm', then: 'The agency account status changes to Active, the agency receives an approval email with login instructions, and the registration moves to the Approved list' },
        { given: 'The admin approves the registration', when: 'Approval is confirmed', then: 'The agency representative can log in immediately using the email they registered with' },
        { given: 'An approval action is completed', when: 'It is saved', then: 'The audit log records the admin\'s identity, the agency name and ID, the approval action, and the timestamp' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. The approval action is independently deliverable as the core agency onboarding step. No changes from Module 2 version.' },
    },

    // ── Epic: Inquiry Monitoring & Operations ─────────────────────────────────
    {
      id: 'US-M2-15',
      title: 'Admin monitors all inquiries with multi-field filtering',
      priority: 'Priority 1 — Critical',
      persona: 'Admin',
      epic: 'Inquiry Monitoring & Operations',
      statement: {
        asA: 'an administrator responsible for daily operational oversight of the system',
        iWantTo: 'view a consolidated list of all inquiries across the system and filter them by status, nationality, agency, date range, inquiry type, and batch ID',
        soThat: 'I have complete operational visibility to detect processing delays, investigate specific cases, and respond proactively to any abnormal patterns without needing access to individual user accounts',
      },
      acs: [
        { given: 'The admin navigates to the Inquiry Monitoring screen', when: 'The screen loads', then: 'It displays all inquiries sorted by submission date descending, showing: reference number, traveler name, nationality, inquiry type, submission date, current status, and processing stage' },
        { given: 'The admin applies a status filter (e.g. Under Processing)', when: 'The filter is applied', then: 'Only inquiries in that status are shown and the total count updates to reflect the filtered result' },
        { given: 'The admin applies a date range filter with both start and end dates selected', when: 'The filter is applied', then: 'Only inquiries submitted within that range are displayed' },
        { given: 'The admin filters by Agency and selects a specific agency', when: '—', then: 'Only inquiries submitted by that agency (single and batch) are shown' },
        { given: 'The admin enters a Batch ID and searches', when: '—', then: 'Only the inquiries belonging to that batch are displayed with their individual statuses' },
      ],
      invest: { I: true, N: true, V: true, E: true, S: true, T: true, note: 'All INVEST criteria met. Independently deliverable read-only monitoring screen. No changes from Module 2 version.' },
    },
    {
      id: 'US-M2-16',
      title: 'Admin views full inquiry details and processing timeline',
      priority: 'Priority 2 — High',
      persona: 'Admin',
      epic: 'Inquiry Monitoring & Operations',
      statement: {
        asA: 'an administrator who needs to investigate a specific inquiry from the monitoring list',
        iWantTo: 'open a specific inquiry and view its complete details including all submitted data, payment record, and a full processing stage timeline',
        soThat: 'I can investigate any inquiry end-to-end without switching between systems, enabling fast resolution of user-reported issues and accurate status reporting',
      },
      acs: [
        { given: 'The admin clicks on any inquiry from the monitoring list', when: 'The detail screen opens', then: 'It displays: traveler personal details, passport details, travel details (including departure country, arrival airport, transit stops), inquiry type, submission timestamp, payment reference and amount, current status, and the full processing stage timeline' },
        { given: 'The detail screen loads', when: 'The processing timeline is shown', then: 'Each completed stage displays its start time, end time, and duration; the current active stage is highlighted' },
        { given: 'The inquiry is rejected', when: 'The admin views the detail screen', then: 'The inquiry is shown with "Rejected" status and the decision timestamp; no rejection reason is displayed as automated decisions carry no reason code' },
        { given: 'The inquiry has a Failed status', when: 'The admin views the detail screen', then: 'A "Flag for Investigation" action is available to escalate the case' },
        { given: 'The admin views an approved inquiry\'s detail screen', when: 'The approval document has been generated', then: 'A "Preview Document" link is available showing the PDF without downloading it to the admin\'s device' },
      ],
      invest: { I: false, N: true, V: true, E: true, S: true, T: true, note: 'Not fully Independent — depends on US-M2-15 for navigation. Same sprint. No material changes from Module 2 version.' },
    },
  ],
};

// ════════════════════════════════════════════════════
// BUILDERS
// ════════════════════════════════════════════════════

function buildCoverPage() {
  const els = [];

  // Title block
  els.push(emptyRow(1440));
  els.push(new Paragraph({
    children: [T('Security Clearance & Inquiry System', { bold: true, size: 52, color: DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
  }));
  els.push(new Paragraph({
    children: [T('MVP User Stories', { bold: true, size: 40, color: AGENCY })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
  }));
  els.push(new Paragraph({
    children: [
      T('Inbound (To Egypt) Only', { size: 18, color: DARK }),
      T('  |  ', { size: 18, color: MED_GRAY }),
      T('Direct ESC Payment', { size: 18, color: DARK }),
      T('  |  ', { size: 18, color: MED_GRAY }),
      T('File Upload Batch Path Only', { size: 18, color: DARK }),
      T('  |  ', { size: 18, color: MED_GRAY }),
      T('Transit Stops: Up to 3', { size: 18, color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 480 },
    shading: { fill: 'EBF5FB', type: ShadingType.CLEAR },
    indent: { left: 480, right: 480 },
  }));

  // Document Summary table
  els.push(new Paragraph({ children: [T('Document Summary', { bold: true, size: 24, color: DARK })], spacing: { before: 240, after: 100 } }));
  const summaryData = [
    ['Total MVP User Stories', '18'],
    ['Agency Stories', '12'],
    ['Admin Stories', '6'],
    ['Priority 1 — Critical', '15'],
    ['Priority 2 — High', '3'],
    ['Inbound (To Egypt) Scope', 'All travel stories'],
    ['Payment Model', 'ESC direct payment only'],
    ['Batch Entry Path', 'File upload only'],
    ['Max Transit Stops', '3'],
  ];
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [6500, 2526],
    rows: [
      hdrRow([{ text: 'Item', w: 6500 }, { text: 'Count / Value', w: 2526 }]),
      ...summaryData.map(([item, val], i) => new TableRow({ children: [
        makeCell(item, { w: 6500, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
        makeCell(val, { w: 2526, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true, align: AlignmentType.CENTER }),
      ]})),
    ],
  }));

  // Revisions table
  els.push(emptyRow(240));
  els.push(new Paragraph({ children: [T('Revisions Applied in This Document', { bold: true, size: 24, color: DARK })], spacing: { before: 80, after: 100 } }));
  const revisions = [
    ['US-22', '"Super Admin" changed to "Admin" in statement and AC2'],
    ['US-26', 'Added Recent Inquiries panel (AC4) and Payment Pending retry button (AC5) to fix navigation gap'],
    ['US-29', 'Fully revised: To Egypt only, direction selector removed, 3 transit stops max, nationality eligibility check (AC1), fee preview step (AC4)'],
    ['US-30', 'Added "View Inquiry Details" button (AC1) and Payment Pending retry guidance (AC4)'],
    ['US-31', 'Title updated (rejection reason removed); AC4 corrected (rejections carry no reason code)'],
    ['US-34', 'Direction column removed; 12 transit columns (3 stops x 4 fields = 21 total columns)'],
    ['US-35', 'Upload-only path: Manual Entry tab removed (CH-3 deferred); To Egypt validation only; 3 transit stops max'],
    ['US-37', 'Direction column removed from fee breakdown table'],
    ['US-39', 'Added "View Batch Details" button (AC1) and Payment Pending retry guidance (AC4)'],
    ['US-40', 'Direction column removed from per-traveler table; AC4 corrected (no rejection reason shown)'],
    ['US-M2-06', 'Direction Scope column removed — MVP configures Inquiry Required toggle per nationality for To Egypt only'],
    ['US-M2-07', 'Direction field removed — fees configured per nationality and inquiry type for To Egypt only'],
  ];
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1400, 7626],
    rows: [
      hdrRow([{ text: 'Story', w: 1400 }, { text: 'Change Applied', w: 7626 }]),
      ...revisions.map(([story, change], i) => new TableRow({ children: [
        makeCell(story, { w: 1400, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true, color: AGENCY }),
        makeCell(change, { w: 7626, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
      ]})),
    ],
  }));

  return els;
}

function buildSectionHeader(title, subtitle, color) {
  return [
    new Paragraph({ children: [new PageBreak()] }),
    emptyRow(1440),
    new Paragraph({
      children: [T(title, { bold: true, size: 60, color: WHITE })],
      shading: { fill: color, type: ShadingType.CLEAR },
      alignment: AlignmentType.CENTER,
      spacing: { before: 720, after: 240 },
      indent: { left: 480, right: 480 },
    }),
    new Paragraph({
      children: [T(subtitle, { size: 22, color: color })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 1440 },
    }),
  ];
}

function buildEpicDivider(epicName, color) {
  return [
    new Paragraph({ children: [new PageBreak()] }),
    emptyRow(1200),
    new Paragraph({
      children: [T('EPIC', { bold: true, size: 18, color: WHITE, allCaps: true })],
      shading: { fill: color, type: ShadingType.CLEAR },
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      indent: { left: 1440, right: 1440 },
    }),
    new Paragraph({
      children: [T(epicName, { bold: true, size: 44, color: color })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 2160 },
    }),
  ];
}

function buildStoryCard(story, pColor, pLtColor, isFirst) {
  const els = [];

  if (!isFirst) els.push(new Paragraph({ children: [new PageBreak()] }));

  // ── Header Bar ──
  els.push(new Paragraph({
    children: [T(`${story.id}  |  ${story.title}`, { bold: true, color: WHITE, size: 26 })],
    shading: { fill: pColor, type: ShadingType.CLEAR },
    spacing: { before: 0, after: 0 },
    indent: { left: 120, right: 120 },
  }));

  // ── Meta: priority + persona + CR badge ──
  const priorityColor = story.priority.includes('Critical') ? RED : story.priority.includes('High') ? AMBER : MED_GRAY;
  const metaChildren = [
    T('Priority: ', { size: 18, color: DARK }),
    T(story.priority, { bold: true, size: 18, color: priorityColor }),
    T('   |   Persona: ', { size: 18, color: DARK }),
    T(story.persona, { bold: true, size: 18, color: pColor }),
  ];
  if (story.changeRequest) {
    const crColor = story.changeRequest.type === 'new' ? GREEN : AMBER;
    const crSymbol = story.changeRequest.type === 'new' ? '\u2714 New Story' : '\u270E Change Request';
    metaChildren.push(T('   |   ', { size: 18, color: DARK }));
    metaChildren.push(T(`${crSymbol} ${story.changeRequest.crId}`, { bold: true, size: 18, color: crColor }));
  }
  els.push(new Paragraph({
    children: metaChildren,
    shading: { fill: pLtColor, type: ShadingType.CLEAR },
    spacing: { before: 0, after: 0 },
    indent: { left: 120, right: 120 },
  }));

  // ── User Story Statement ──
  els.push(emptyRow(120));
  els.push(new Paragraph({
    children: [T('User Story Statement', { bold: true, size: 22, color: pColor })],
    spacing: { before: 40, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: pColor } },
  }));

  const stmtLabels = ['As a\u2026', 'I want to\u2026', 'So that\u2026'];
  const stmtValues = [story.statement.asA, story.statement.iWantTo, story.statement.soThat];
  const stmtLabelBg = [pLtColor, 'F0F4F8', pLtColor];
  const stmtValueBg = ['FAFBFC', WHITE, 'FAFBFC'];
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1400, 7626],
    rows: stmtLabels.map((label, i) => new TableRow({ children: [
      makeCell(label, { w: 1400, bg: stmtLabelBg[i], bold: true, color: pColor }),
      makeCell(stmtValues[i], { w: 7626, bg: stmtValueBg[i] }),
    ]})),
  }));

  // ── Acceptance Criteria ──
  els.push(emptyRow(120));
  els.push(new Paragraph({
    children: [T('Acceptance Criteria', { bold: true, size: 22, color: pColor })],
    spacing: { before: 40, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: pColor } },
  }));
  // Cols: #(500) | Given(2800) | When(2200) | Then(3526)
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [500, 2800, 2200, 3526],
    rows: [
      hdrRow([{ text: '#', w: 500 }, { text: 'Given', w: 2800 }, { text: 'When', w: 2200 }, { text: 'Then', w: 3526 }]),
      ...story.acs.map((ac, i) => new TableRow({ children: [
        makeCell(String(i + 1), { w: 500, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true, align: AlignmentType.CENTER }),
        makeCell(ac.given, { w: 2800, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
        makeCell(ac.when || '\u2014', { w: 2200, bg: i % 2 === 0 ? ROW_ALT : WHITE, color: ac.when && ac.when !== '\u2014' ? DARK : MED_GRAY }),
        makeCell(ac.then, { w: 3526, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
      ]})),
    ],
  }));

  // ── Form Field Validation (if applicable) ──
  if (story.formValidation && story.formValidation.length > 0) {
    els.push(emptyRow(120));
    els.push(new Paragraph({
      children: [T('Form Field Validation', { bold: true, size: 22, color: pColor })],
      spacing: { before: 40, after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: pColor } },
    }));
    // Cols: Field(1400) | Type(800) | Required(800) | Constraints(1600) | Trigger(1100) | Error(3326)
    els.push(new Table({
      width: { size: CW, type: WidthType.DXA },
      columnWidths: [1400, 800, 800, 1600, 1100, 3326],
      rows: [
        hdrRow([
          { text: 'Field', w: 1400 }, { text: 'Type', w: 800 }, { text: 'Required', w: 800 },
          { text: 'Constraints', w: 1600 }, { text: 'Trigger', w: 1100 }, { text: 'Error Message', w: 3326 },
        ]),
        ...story.formValidation.map((fv, i) => new TableRow({ children: [
          makeCell(fv.field, { w: 1400, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true }),
          makeCell(fv.type, { w: 800, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
          makeCell(fv.required, { w: 800, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
          makeCell(fv.constraints, { w: 1600, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
          makeCell(fv.trigger, { w: 1100, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
          makeCell(fv.error, { w: 3326, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
        ]})),
      ],
    }));
  }

  // ── INVEST Check ──
  els.push(emptyRow(120));
  const letters = ['I', 'N', 'V', 'E', 'S', 'T'];
  const iw = [1504, 1504, 1504, 1504, 1504, 1506]; // sums to 9026
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: iw,
    rows: [new TableRow({ children: letters.map((letter, i) => {
      const passed = story.invest[letter];
      return makeCell(`${passed ? '\u2713' : '\u26A0'} ${letter}`, {
        w: iw[i],
        bg: passed ? 'E9F7EF' : 'FEF9E7',
        bold: true,
        align: AlignmentType.CENTER,
        color: passed ? GREEN : AMBER,
        size: 20,
      });
    })})],
  }));
  if (story.invest.note) {
    els.push(new Paragraph({
      children: [T(story.invest.note, { italics: true, size: 17, color: MED_GRAY })],
      spacing: { before: 60, after: 40 },
      shading: { fill: 'F8F9FA', type: ShadingType.CLEAR },
      indent: { left: 120, right: 120 },
    }));
  }

  els.push(emptyRow(160));
  return els;
}

function buildGapsSection() {
  const els = [];

  els.push(new Paragraph({ children: [new PageBreak()] }));
  emptyRow(240);
  els.push(new Paragraph({
    children: [T('Remaining Gaps After MVP Revisions', { bold: true, size: 36, color: RED })],
    spacing: { before: 480, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RED } },
  }));
  els.push(new Paragraph({
    children: [T('The following issues remain open after applying all revisions above. They are catalogued here for stakeholder resolution before sprint planning.', { size: 18, color: DARK })],
    spacing: { before: 120, after: 240 },
  }));

  // Resolved issues
  els.push(new Paragraph({ children: [T('Resolved in This Document', { bold: true, size: 22, color: GREEN })], spacing: { before: 80, after: 100 } }));
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [400, 2800, 5826],
    rows: [
      hdrRow([{ text: '#', w: 400 }, { text: 'Issue', w: 2800 }, { text: 'Resolution', w: 5826 }]),
      ...([
        ['1', 'No agency navigation to inquiry results', 'Fixed: US-26 dashboard Recent Inquiries panel (AC4); US-30 "View Inquiry Details" button (AC1); US-39 "View Batch Details" button (AC1)'],
        ['2', 'US-35 described two tabs (Manual Entry deferred)', 'Fixed: US-35 scoped to upload-only; CH-3 reference removed; single-tab screen'],
        ['3', 'No payment retry for Payment Pending single inquiry', 'Fixed: US-26 AC5 "Complete Payment" button on dashboard; US-30 AC4 retry path'],
      ]).map(([num, issue, res], i) => new TableRow({ children: [
        makeCell(num, { w: 400, bold: true, align: AlignmentType.CENTER, bg: i % 2 === 0 ? ROW_ALT : WHITE, color: GREEN }),
        makeCell(issue, { w: 2800, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true }),
        makeCell(res, { w: 5826, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
      ]})),
    ],
  }));

  els.push(emptyRow(240));

  // Open gaps
  els.push(new Paragraph({ children: [T('Open Gaps \u2014 Remaining', { bold: true, size: 22, color: RED })], spacing: { before: 80, after: 100 } }));
  const gaps = [
    ['1', 'Module 3 — Clearance Engine not yet authored', 'Critical', 'US-29 AC5, US-38 AC2, and US-M2-15/16 all depend on a clearance engine. No Module 3 stories exist. MVP cannot produce end-to-end results without this module.'],
    ['2', 'PDF document generation ownership undefined', 'Critical', 'US-31 AC3 and US-40 AC3 reference an approval document PDF with a QR code. No story specifies who generates it or when it is generated relative to the Approved decision.'],
    ['3', 'QR verification page not yet authored (QR-01)', 'High', 'The QR code links to a public verification page. QR-01 has been identified in Release_Plan.md but not written. Without the public page, the QR code has no destination.'],
    ['4', 'Payment Pending inquiry unreachable if browser closed before dashboard loads', 'Medium', 'The retry path relies on the dashboard Recent Inquiries panel (US-26 AC5). If the browser is closed before the confirmation screen loads, the inquiry is saved as Payment Pending but the representative may not reach the dashboard. US-33 (inquiry history list) is Release 1+. Document as accepted MVP limitation.'],
    ['5', 'No fee configured warning blocks submission silently', 'Medium', 'US-29 AC1 only checks nationality eligibility, not fee availability. If a nationality requires an inquiry but has no fee configured, the form passes eligibility and fails at the fee preview (US-29 AC4) without a clear pre-check message.'],
    ['6', 'Batch nationality eligibility vs fee gap', 'Low', 'US-35 AC5 flags ineligible nationalities. If a nationality is eligible but has no fee configured, US-37 would be blank for that group. US-37 AC3 assumes fees always exist for eligible nationalities — this assumption must be validated at the US-35 validation step or US-37 load time.'],
  ];
  const sevColor = s => s === 'Critical' ? RED : s === 'High' ? AMBER : s === 'Medium' ? '2471A3' : MED_GRAY;
  els.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [400, 2100, 1100, 5426],
    rows: [
      hdrRow([{ text: '#', w: 400 }, { text: 'Gap', w: 2100 }, { text: 'Severity', w: 1100 }, { text: 'Notes', w: 5426 }]),
      ...gaps.map(([num, gap, sev, notes], i) => new TableRow({ children: [
        makeCell(num, { w: 400, bold: true, align: AlignmentType.CENTER, bg: i % 2 === 0 ? ROW_ALT : WHITE, color: sevColor(sev) }),
        makeCell(gap, { w: 2100, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true }),
        makeCell(sev, { w: 1100, bg: i % 2 === 0 ? ROW_ALT : WHITE, bold: true, color: sevColor(sev), align: AlignmentType.CENTER }),
        makeCell(notes, { w: 5426, bg: i % 2 === 0 ? ROW_ALT : WHITE }),
      ]})),
    ],
  }));

  return els;
}

// ════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════
function buildDocument() {
  const children = [];

  children.push(...buildCoverPage());

  // Agency User section
  children.push(...buildSectionHeader('Agency User', '12 Stories  \u2022  5 Epics', AGENCY));
  for (const [epic, stories] of groupByEpic(STORIES.agency)) {
    children.push(...buildEpicDivider(epic, AGENCY));
    stories.forEach((s, i) => children.push(...buildStoryCard(s, AGENCY, AGENCY_LT, i === 0)));
  }

  // Admin section
  children.push(...buildSectionHeader('Admin', '6 Stories  \u2022  4 Epics', ADMIN));
  for (const [epic, stories] of groupByEpic(STORIES.admin)) {
    children.push(...buildEpicDivider(epic, ADMIN));
    stories.forEach((s, i) => children.push(...buildStoryCard(s, ADMIN, ADMIN_LT, i === 0)));
  }

  children.push(...buildGapsSection());

  return new Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 20 } } },
    },
    sections: [{
      properties: {
        page: {
          size: { width: A4_W, height: A4_H },
          margin: { top: MAR, right: MAR, bottom: MAR, left: MAR },
        },
      },
      children,
    }],
  });
}

const outPath = path.join(PROJECT_ROOT, 'docs', 'releases', 'MVP_User_Stories.docx');
const doc = buildDocument();
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log('Generated:', outPath);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
