# Component snippets — copy/paste blocks for the Admin Panel design system

Every snippet below uses **only** classes from `allowed-classes.txt`. Use them verbatim; do not rename, do not add `style=`, do not substitute a class you invented.

Snippets reference asset paths relative to `generated/<slug>/index.html` (which sits two folders deep from project root). If you change the output depth, fix the `../../Designer UI/...` prefix everywhere.

---

## 1. Section title with end-side controls

Used as the top of any content section (list page, form page, detail page).

```html
<div class="section-title row gy-3">
  <div class="title col-auto">
    <h3 class="underline-title">قائمة الوكلاء</h3>
  </div>
  <div class="end-side col-auto">
    <div class="input-group">
      <input type="search" class="form-control" id="filterSearch" name="filterSearch" placeholder="إبحث ...">
      <button class="btn-input-search" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <button class="btn btn-tertiary d-flex gap-1 align-items-center">
      <i class="fa-solid fa-download"></i>تصدير
    </button>
  </div>
</div>
```

---

## 2. Stat-widget row (KPI tiles) — `widjets-theme-2`

Colors: `blue` / `success` / `warning` / `danger`. One `col-sm-6 col-md-6 col-lg-3` per tile. Do not invent new modifiers.

```html
<div class="widjets-theme-2">
  <div class="row g-3">
    <div class="col-sm-6 col-md-6 col-lg-3">
      <div class="neutral-widjet blue">
        <div class="widjet-body">
          <div class="icon"><img src="../../Designer UI/Admin.Panel.HTML_v21-04-2026/icons/agency.svg" alt=""></div>
          <div class="content">
            <p class="number">298</p>
            <p>إجمالي الوكلاء المسجلين</p>
          </div>
        </div>
      </div>
    </div>
    <!-- repeat .col block with .success / .warning / .danger -->
  </div>
</div>
```

---

## 3. Buttons

```html
<button class="btn btn-primary">حفظ</button>
<button class="btn btn-secondary">تأكيد</button>
<button class="btn btn-tertiary">تصدير</button>
<button class="btn btn-light">إلغاء</button>
<button class="btn btn-white">رجوع</button>

<!-- Outline / rounded / outline-rounded variants exist for every color -->
<button class="btn btn-primary-outline">مراجعة</button>
<button class="btn btn-primary-rounded">إجراء</button>
<button class="btn btn-primary-rounded-outline">إجراء</button>

<!-- Back button (arrow + label, square chip) -->
<a class="btn btn-back" href="javascript:history.back()">
  <i class="fa-solid fa-arrow-right"></i>
</a>

<!-- Close / dismiss buttons: .btn-x-xs .btn-x-sm .btn-x-md .btn-x-lg .btn-x-xxl -->
<button class="btn-x-sm"><i class="fa-solid fa-times"></i></button>
```

Rules:
- **Never** use a bare `<button>` without a `.btn` class.
- For icon-only actions inside a grid row, use `.grid-options-btn` with `.view-icon` / `.edit-icon` / `.delete-icon`, not a button.

---

## 4. Form field (text / email / password / select / textarea)

Every field follows the same pattern: `<label>` above, `.form-control` (or `.form-select`) below, sitting in a Bootstrap column.

```html
<div class="row g-3">
  <div class="col-md-6">
    <label for="agencyName">اسم الوكالة</label>
    <input type="text" class="form-control" id="agencyName" name="agencyName" placeholder="اسم الوكالة">
  </div>
  <div class="col-md-6">
    <label for="commercialReg">رقم السجل التجاري</label>
    <input type="text" class="form-control" id="commercialReg" name="commercialReg">
  </div>
  <div class="col-md-6">
    <label for="nationality">الجنسية</label>
    <select class="form-control form-select" id="nationality" name="nationality">
      <option value="">اختر الجنسية</option>
      <option value="eg">مصري</option>
    </select>
  </div>
  <div class="col-md-12">
    <label for="notes">ملاحظات</label>
    <textarea class="form-control" id="notes" name="notes" rows="3"></textarea>
  </div>
</div>
```

Password field (eye toggle uses `.show-hide-icon`):

```html
<div class="col-md-6 password">
  <label for="password">كلمة المرور</label>
  <div class="input-group">
    <input type="password" class="form-control" id="password" name="password">
    <span class="show-hide-icon"><i class="fa-regular fa-eye"></i></span>
  </div>
</div>
```

Checkbox:

```html
<div class="d-flex gap-2 align-items-center">
  <input type="checkbox" class="form-check-input" id="agreeTerms">
  <label for="agreeTerms">أوافق على الشروط والأحكام</label>
</div>
```

---

## 5. File upload — large (drag-drop) and inline

Large drop zone:

```html
<div class="input-group">
  <input type="file" class="custom-file-input" id="commercialRegFile">
  <label class="custom-file-label" for="commercialRegFile">
    <img src="../../Designer UI/Admin.Panel.HTML_v21-04-2026/icons/upload.svg" alt="">
    <span>اسحب الملف هنا أو انقر للتحميل</span>
  </label>
</div>
```

Inline button-style:

```html
<label class="custom-file-label-inline" for="passportFile">
  <span>تحميل جواز السفر</span>
  <div class="icon-container">
    <img src="../../Designer UI/Admin.Panel.HTML_v21-04-2026/icons/upload.svg" alt="">
  </div>
</label>
<input type="file" class="custom-file-input-inline" id="passportFile" hidden>
```

Progress / uploaded item:

```html
<div class="attachment-item uploaded">
  <div class="file-icon"><i class="fa-solid fa-file-pdf"></i></div>
  <div class="progress-title">
    <div class="details">
      <span class="title">commercial-reg.pdf</span>
      <span class="percentage">100%</span>
    </div>
    <div class="progress"><div class="progress-bar"></div></div>
  </div>
  <div class="close-button-container">
    <button class="close-button"><i class="fa-solid fa-times"></i></button>
  </div>
</div>
```

---

## 6. Data table — `custom-grid-list` (preferred)

Each row is visually a card. Action buttons use `.grid-options-btn` icons — never inline text buttons.

```html
<div class="table-responsive">
  <table class="table custom-grid-list">
    <thead>
      <tr>
        <th>رقم الطلب</th>
        <th>إسم المسافر</th>
        <th>الجنسية</th>
        <th>مصدر الطلب</th>
        <th>تاريخ التقديم</th>
        <th>الحالة</th>
        <th>الإجراء</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p class="tertiary-color">REQ-2024-001257</p>
          <p class="danger-color">أولوية عالية</p>
        </td>
        <td>
          <p>محمد أحمد السيد</p>
          <p>Mohamed Ahmed Elsayed</p>
        </td>
        <td><p>مصري</p></td>
        <td><div class="status-disabled-solid">فردي</div></td>
        <td class="text-dir-ltr">
          <p>2024-12-18</p>
          <p>02:30 PM</p>
        </td>
        <td><div class="status-blue-lamp"><div class="lamp"></div>جديد</div></td>
        <td>
          <a class="grid-options-btn view-icon" href="#"><i class="fa-regular fa-eye"></i></a>
          <a class="grid-options-btn edit-icon" href="javascript:;"><i class="fa-regular fa-pen-to-square"></i></a>
          <a class="grid-options-btn delete-icon" href="javascript:;"><i class="fa-regular fa-trash-can"></i></a>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <div class="row br-left">
            <div class="col-auto align-content-center">
              <label for="rowsCount" class="col-form-label rows-number-title">عدد السطــور</label>
            </div>
            <div class="col-auto">
              <select id="rowsCount" class="form-select rows-number">
                <option>6</option><option>8</option><option selected>10</option><option>16</option><option>20</option>
              </select>
            </div>
          </div>
        </td>
        <td colspan="4">
          <ul class="pagination">
            <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1"><i class="fa-solid fa-chevron-right"></i></a></li>
            <li class="page-item active"><a class="page-link" href="javascript:;">1</a></li>
            <li class="page-item"><a class="page-link" href="javascript:;">2</a></li>
            <li class="page-item"><a class="page-link" href="javascript:;">3</a></li>
            <li class="page-item"><a class="page-link" href="javascript:;"><i class="fa-solid fa-chevron-left"></i></a></li>
          </ul>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
```

Use `.table.custom-grid` (without `-list`) only when you need a dense tabular grid without card spacing between rows.

---

## 7. Status components

Three flavors. Pick the one that matches the designer's existing pattern for that domain.

**Pill badge (with icon):**
```html
<div class="status-created"><div class="icon"><i class="fa-solid fa-check"></i></div>منجز</div>
<div class="status-pending"><div class="icon"><i class="fa-solid fa-clock"></i></div>قيد المراجعة</div>
<div class="status-approved"><div class="icon"><i class="fa-solid fa-check"></i></div>تمت الموافقة</div>
<div class="status-rejected"><div class="icon"><i class="fa-solid fa-xmark"></i></div>مرفوض</div>
```

**Lamp (dot + label):**
```html
<div class="status-blue-lamp"><div class="lamp"></div>جديد</div>
<div class="status-active-lamp"><div class="lamp"></div>نشط</div>
<div class="status-warning-lamp"><div class="lamp"></div>قيد المعالجة</div>
<div class="status-danger-lamp"><div class="lamp"></div>مرفوض</div>
```

**Solid (filled chip):**
```html
<div class="status-blue-solid">وكيل</div>
<div class="status-active-solid">نشط</div>
<div class="status-warning-solid">تحذير</div>
<div class="status-danger-solid">موقوف</div>
<div class="status-disabled-solid">فردي</div>
```

---

## 8. Card containers — `custom-card` / `standard-card` / `standard-card-theme2`

```html
<div class="custom-card">
  <div class="card-header">
    <h4 class="card-title">تفاصيل الطلب</h4>
  </div>
  <div class="card-body">
    <!-- fields, rows -->
  </div>
  <div class="card-footer card-footer-bt">
    <button class="btn btn-secondary">حفظ</button>
    <button class="btn btn-light">إلغاء</button>
  </div>
</div>
```

Use `standard-card` when placing stat/info blocks; `standard-card-theme2` for the secondary emphasis variant.

---

## 9. Breadcrumb

```html
<nav class="breadcrumb">
  <ol>
    <li class="breadcrumb-item"><a href="#">الرئيسية</a></li>
    <li class="breadcrumb-item"><a href="#">إدارة الوكلاء</a></li>
    <li class="breadcrumb-item active">تفاصيل الوكيل</li>
  </ol>
</nav>
```

---

## 10. Section wrapper (every page section uses this)

```html
<section class="sm-padding">
  <div class="container-fluid">
    <!-- section content -->
  </div>
</section>
```

Use `md-padding` for the hero/top section if a bigger breathing room is needed.

---

## 11. Detail-grid (label/value rows)

For read-only detail views (e.g. inquiry-view). Compose with the card and a Bootstrap row.

```html
<div class="custom-card">
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-6">
        <label>رقم الطلب</label>
        <p class="tertiary-color">REQ-2024-001257</p>
      </div>
      <div class="col-md-6">
        <label>الجنسية</label>
        <p>مصري</p>
      </div>
      <div class="col-md-6">
        <label>تاريخ التقديم</label>
        <p class="text-dir-ltr">2024-12-18</p>
      </div>
      <div class="col-md-6">
        <label>الحالة</label>
        <div class="status-active-lamp"><div class="lamp"></div>تم الرد</div>
      </div>
    </div>
  </div>
</div>
```

---

## 12. Empty state (no data)

Compose from primitives; no dedicated class in the system.

```html
<div class="custom-card text-center">
  <div class="card-body">
    <img src="../../Designer UI/Admin.Panel.HTML_v21-04-2026/icons/empty.svg" alt="" class="icon-container">
    <h4 class="card-title">لا توجد بيانات</h4>
    <p>لم يتم العثور على سجلات تطابق البحث.</p>
  </div>
</div>
```

If the designer's folder has no `empty.svg`, pick the closest match (e.g. `no-data.svg`) and log that choice in `NOTES.md`.

---

## 13. Direction notes

- Arabic content flows RTL automatically from `<html dir="rtl">`.
- Dates, reference numbers, English names, phone numbers: wrap in `.text-dir-ltr` so the direction flips locally.
- Monetary amounts: use `.text-dir-ltr` and prefix the currency symbol per the designer's convention.
