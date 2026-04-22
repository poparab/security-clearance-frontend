# US-26A Agency Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add US-26A (Agency Main Dashboard) as a dedicated user story and build its frontend screen under `app/` using the registration-page design system.

**Architecture:** Left dark-navy sidebar (same gradient language as registration hero) + scrollable main content area. Dashboard content mirrors the approved `6-Portal - Agency Dashboard.html` mockup: agency info, wallet, 4 KPI stat cards, quick stats, primary actions, Payment Pending alert strip, and recent activity table.

**Tech Stack:** Vanilla HTML/CSS/JS · Tajawal font · Font Awesome 6.4 · No frameworks · RTL Arabic

---

### Task 1: Write US-26A into MVP_User_Stories.md

**Files:**
- Modify: `docs/releases/MVP_User_Stories.md` — insert after US-26 block, before US-29

**Content to insert:** Full user story with ID US-26A, Persona Agency User, Priority 1 Critical, Release MVP, Epic: Agency Dashboard. Statement + 5 ACs derived from the approved mockup sections. No form, no validation table. INVEST check.

---

### Task 2: Mirror US-26A into Module1_User_Stories.md

**Files:**
- Modify: `Module1_User_Stories.md` — insert after US-26 block, before US-27

**Same story content** as Task 1.

---

### Task 3: Create frontend folder structure

**Files:**
- Use: `app/` directory
- Create: `app/index.html`
- Create: `shared/` (future shared assets placeholder — empty for now)

---

### Task 4: Build app/index.html

**Files:**
- Create: `app/index.html`

**Layout:** Two-column full-viewport
- Left: `260px` fixed sidebar — dark navy gradient (`#040c22 → #091535 → #0b1e50`) with grid overlay (identical to registration hero)
- Right: scrollable main content (`calc(100vw - 260px)`) — `#f8fafc` background

**Sidebar contains:**
- System logo (same SVG lockup as registration)
- Agency name + status badge
- Navigation links: لوحة التحكم · الاستعلامات · رفع ملف · المحفظة · الإعدادات
- Last login timestamp
- Language toggle (AR/EN)
- Logout button

**Main content sections (top → bottom):**
1. **Top bar** — breadcrumb + welcome greeting + notification bell
2. **Payment Pending alert strip** — amber, dismissible, with "إتمام الدفع" CTA
3. **Agency overview row** — 4 cards: Agency Info, Wallet Balance (+ top-up), Total Inquiries, Approval Rate
4. **Quick stats row** — 4 colored stat tiles: Submitted / Under Processing / Approved / Rejected (this month)
5. **Primary actions** — 3 action cards: New Inquiry · Batch Upload · Wallet Management
6. **Recent Activity** — table: Ref No · Date · Traveler Count · Type · Status · Actions
7. **Footer** — slim, dark, matches registration page brand

**Design tokens from registration.html:**
- Primary blue: `#1a3a8f`
- Button: `background #1a3a8f, hover #152e78, shadow rgba(26,58,143,.3)`
- Card border: `1.5px solid #dde3ee`
- Card radius: `10px`
- Font: Tajawal weights 400/500/700/800
- Status badges: green `#dcfce7/#16a34a`, amber `#fef3c7/#d97706`, red `#fee2e2/#dc2626`, blue `#dbeafe/#1d4ed8`

---

### Task 5: Validate output

Open `app/index.html` in a browser. Verify:
- Sidebar renders with dark navy gradient identical to registration hero
- All 4 overview cards visible without horizontal scroll
- Payment Pending alert strip is dismissible
- Recent activity table shows 5 rows with correct status badges
- RTL layout correct throughout
