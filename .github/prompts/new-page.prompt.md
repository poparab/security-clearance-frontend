---
description: "Scaffold a new HTML page with its SCSS partial for the Security Clearance frontend. Creates boilerplate HTML + SCSS file following project architecture."
mode: "agent"
tools: ["create_file", "read_file", "replace_string_in_file", "run_in_terminal"]
---

# New Page Scaffolding

Create a new page for the Security Clearance & Inquiry System frontend.

## Inputs

You need these from the user:
- **Page name** (e.g. "wallet", "inquiry-list", "batch-view")
- **Arabic page title** (e.g. "المحفظة", "قائمة الطلبات")
- **Portal type**: `agency` (public portal) or `admin` (admin panel)
- **Key sections** — brief list of what the page contains (e.g. "stats row, filter toolbar, data table")

## Steps

### 1. Create the SCSS partial

Create `app/styles/_{page-name}.scss` (agency portal) or `app/admin/styles/_{page-name}.scss` (admin panel).

**For agency portal pages**, use project tokens and this starter:

```scss
// ── {PAGE TITLE} ──────────────────────────────────────────
.{page-name}-section { padding: $size-48 0;
  .container { max-width: 1200px; margin: 0 auto; }
}

.{page-name}-header { @include flexCenter-z; margin-bottom: $size-24;
  h2 { font-size: $font-size-32; color: $primaryColor-800; font-family: 'Tajawal-Bold'; }
}
```

**For admin panel pages**, use the admin CSS conventions:

```scss
// ── {PAGE TITLE} ──────────────────────────────────────────
// Admin pages use admin.css class system: content-shell, admin-stats-row,
// admin-toolbar, admin-table-wrap, admin-btn, etc.
// Only add page-specific overrides here.
```

### 2. Import the partial

- Agency portal: Add `@import '{page-name}';` to `app/styles/main.scss` (or `scss-scg/styles.scss` if using the reference architecture).
- Admin panel: Styles go directly in `app/admin/styles/admin.css` or a new partial if the team has migrated to SCSS.

### 3. Create the HTML file

**Agency portal** — save to `app/{page-name}.html`:

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{Arabic Title} — نظام الموافقات الأمنية</title>
  <link rel="stylesheet" href="css/bootstrap/bootstrap.rtl.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <link href="css/styles.css" rel="stylesheet">
  <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
</head>
<body>

  <!-- ── HEADER ──────────────────────────────────────── -->
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="index.html">
          <img src="img/logo.png" alt="نظام الموافقات الأمنية">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="index.html">الرئيسية</a></li>
            <li class="nav-item"><a class="nav-link active" href="{page-name}.html">{Arabic Title}</a></li>
          </ul>
        </div>
        <a class="language col-auto d-none d-lg-flex float-end" href="#">
          <img class="icon" src="icons/language.svg" alt="">EN
        </a>
      </nav>
    </div>
  </header>

  <!-- ── MAIN CONTENT ────────────────────────────────── -->
  <section class="{page-name}-section">
    <div class="container">
      <h2>{Arabic Title}</h2>
      <!-- TODO: Add page content sections here -->
    </div>
  </section>

  <!-- ── FOOTER ──────────────────────────────────────── -->
  <footer>
    <div class="container">
      <!-- Standard 4-column footer -->
    </div>
  </footer>

  <script src="js/jquery-4.0.0.min.js"></script>
  <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Admin panel** — save to `app/admin/{page-name}.html`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Arabic Title} — لوحة الإدارة</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/admin.css">
</head>
<body class="admin-body">
<div class="admin-layout">

  <!-- ── SIDEBAR ─────────────────────────────────────── -->
  <aside class="admin-sidebar" id="sidebar">
    <div class="sidebar-top">
      <div class="sidebar-brand">
        <img src="../assets/shield-logo.svg" alt="logo">
        <div class="brand-text">
          <h1>نظام الموافقات الأمنية</h1>
          <p>لوحة التحكم</p>
        </div>
      </div>
      <nav class="sidebar-nav">
        <a class="sidebar-link" href="admin-index.html"><i class="fas fa-chart-pie"></i><span>لوحة المعلومات</span></a>
        <a class="sidebar-link" href="agencies.html"><i class="fas fa-building"></i><span>إدارة الوكلاء</span></a>
        <a class="sidebar-link" href="inquiries.html"><i class="fas fa-file-lines"></i><span>إدارة الطلبات</span></a>
        <a class="sidebar-link" href="nationalities.html"><i class="fas fa-globe"></i><span>الجنسيات</span></a>
        <a class="sidebar-link" href="pricing.html"><i class="fas fa-tags"></i><span>التسعير</span></a>
        <a class="sidebar-link active" href="{page-name}.html"><i class="fas fa-circle"></i><span>{Arabic Title}</span></a>
      </nav>
    </div>
    <div class="sidebar-bottom">
      <a class="sidebar-logout" href="login.html"><i class="fas fa-right-from-bracket"></i><span>تسجيل الخروج</span></a>
    </div>
  </aside>

  <!-- ── MAIN ────────────────────────────────────────── -->
  <main class="admin-content">
    <div class="admin-topbar">
      <div class="topbar-left">
        <div class="topbar-user">
          <img src="https://i.pravatar.cc/80?img=12" alt="admin">
          <div><div class="name">طلعت جادو</div><div class="role">مدير تنفيذي</div></div>
        </div>
        <div class="topbar-actions">
          <i class="fas fa-bell"></i>
          <span>EN</span>
          <i class="fas fa-globe"></i>
        </div>
      </div>
      <div class="topbar-right">
        <div class="search-wrap"><i class="fas fa-search"></i><input type="text" placeholder="إبحث هنا ..."></div>
        <i class="fas fa-bars" onclick="toggleSidebar()"></i>
      </div>
    </div>

    <div class="content-shell">
      <!-- TODO: Add page content here using admin component classes -->
      <!-- Stats: admin-stats-row > admin-stat.stat-blue/green/amber/red -->
      <!-- Toolbar: admin-toolbar > toolbar-group > admin-btn / admin-select / admin-input -->
      <!-- Table: admin-table-wrap > admin-table-head + admin-table -->
      <!-- Pagination: admin-pagination > pg-pages + pg-right -->
    </div>
  </main>

</div>

<script>
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
</script>
</body>
</html>
```

### 4. Verify

- Confirm **zero** inline CSS or `<style>` blocks in the HTML file.
- Confirm all class names match existing project conventions.
- Confirm the SCSS partial uses only `$size-*`, `$font-size-*`, and color variable tokens.
- Confirm the SCSS import was added to the main stylesheet.
