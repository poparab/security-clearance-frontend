(function (window, document) {
  const ORIGINAL_TEXT = new WeakMap();
  const ORIGINAL_ATTRS = new WeakMap();

  const state = {
    defaultLang: 'ar',
    localePath: '',
    currentLang: 'ar',
    dictionaries: {},
    currentDictionary: {},
    currentPhrases: {},
    ready: false,
  };

  const FALLBACK_PORTAL_EN = {
    lang: 'en',
    dir: 'ltr',
    dictionary: {
      'login.error.invalidEmail': 'Please enter a valid email address.',
      'login.error.passwordRequired': 'Password is required.',
      'login.error.credentials': 'Invalid email or password.',
      'common.close': 'Close',
      'common.cancel': 'Cancel',
      'common.search': 'Search',
      'common.reset': 'Reset',
      'common.brand.name': 'Security Approval System',
      'common.brand.subtitle': 'Security Approval System',
      'portal.nav.dashboard': 'Dashboard',
      'portal.nav.inquiries': 'Inquiries',
      'portal.nav.batch': 'Batch Requests',
      'portal.nav.wallet': 'Wallet',
      'portal.nav.agency': 'Agency',
      'portal.nav.help': 'Help',
      'portal.notifications.title': 'Notifications',
      'portal.notifications.markAllRead': 'Mark all as read',
      'portal.user.name': 'Nile Travel Agency',
      'portal.user.role': 'Approved Agency',
      'portal.user.profile': 'Agency Profile',
      'portal.user.logout': 'Sign out',
      'portal.agencyDashboard.breadcrumb.current': 'Dashboard',
      'portal.agencyDashboard.hero.title': 'Agency Dashboard',
      'portal.agencyDashboard.hero.subtitle': 'Manage and monitor security requests · December 2024',
      'portal.inquiryList.breadcrumb.current': 'Inquiries List',
      'portal.inquiryList.hero.title': 'Security Inquiries List',
      'portal.inquiryList.hero.subtitle': 'Review and track security inquiry requests and coordination with authorities',
      'portal.batchList.breadcrumb.current': 'Batch Requests',
      'portal.batchList.hero.title': 'Batch Requests List',
      'portal.batchList.hero.subtitle': 'Review and track security request batches and coordination with authorities',
      'portal.batchInquiry.breadcrumb.parent': 'Batch Requests',
      'portal.batchInquiry.breadcrumb.current': 'New Batch Request',
      'portal.batchInquiry.hero.title': 'New Batch Request',
      'portal.batchInquiry.hero.subtitle': 'Follow the steps to upload travelers file and complete submission',
      'portal.batchView.breadcrumb.parent': 'Batch Requests',
      'portal.batchView.breadcrumb.current': 'Batch Details',
      'portal.batchView.hero.title': 'Batch Details',
      'portal.batchView.hero.subtitle': 'View travelers inside the batch and track the status of each request',
      'portal.inquiryView.breadcrumb.parent': 'Inquiries',
      'portal.inquiryView.breadcrumb.current': 'Inquiry Details',
      'portal.inquiryView.hero.title': 'Inquiry Details',
      'portal.inquiryView.hero.subtitle': 'View inquiry status and full traveler/trip details',
      'portal.wallet.breadcrumb.current': 'Wallet',
      'portal.wallet.hero.title': 'Wallet Balance & Transactions',
      'portal.wallet.hero.subtitle': 'View current balance and deposit/deduction history',
      'portal.footer.quickLinks': 'Quick Links',
      'portal.footer.services': 'Services',
      'portal.footer.contact': 'Contact Us',
      'portal.footer.copyright': 'All rights reserved © 2024 Security Approval System'
    },
    phrases: {
      'نظام الموافقات الأمنية': 'Security Approval System',
      'لوحة التحكم': 'Dashboard',
      'الاستعلامات': 'Inquiries',
      'حزمة طلبات': 'Batch Requests',
      'المحفظة': 'Wallet',
      'الوكالة': 'Agency',
      'المساعدة': 'Help',
      'الإشعارات': 'Notifications',
      'تعليم الكل كمقروء': 'Mark all as read',
      'رصيد المحفظة منخفض': 'Low wallet balance',
      'منذ 12 دقيقة': '12 minutes ago',
      'منذ 2 ساعة': '2 hours ago',
      'أمس، 6:30 م': 'Yesterday, 6:30 PM',
      'بيانات الوكالة': 'Agency Profile',
      'تسجيل الخروج': 'Sign out',
      'قائمة الاستعلامات': 'Inquiries List',
      'قائمة الطلبات الأمنية': 'Security Inquiries List',
      'مراجعة ومتابعة طلبات الموافقات الأمنية والتنسيق مع الجهات الأمنية المختصة': 'Review and track security inquiry requests and coordination with authorities',
      'حساب نشط': 'Active Account',
      'إجمالي الاستعلامات': 'Total Inquiries',
      'قيد المعالجة': 'Under Processing',
      'موافق عليها': 'Approved',
      'مرفوضة': 'Rejected',
      'منذ بداية الحساب': 'Since account creation',
      'تحت الفحص الأمني': 'Under security screening',
      'موافق عليها بالكامل': 'Fully approved',
      'مرفوضة أو فاشلة': 'Rejected or failed',
      'البحث': 'Search',
      'حالة الطلب': 'Request Status',
      'جميع الحالات': 'All statuses',
      'تم الإرسال': 'Submitted',
      'تمت الموافقة': 'Approved',
      'مرفوض': 'Rejected',
      'قيد المراجعة': 'Pending Review',
      'دفع معلّق': 'Payment Pending',
      'الجنسية': 'Nationality',
      'جميع الجنسيات': 'All nationalities',
      'بحث': 'Search',
      'إعادة تعيين': 'Reset',
      'قائمة الطلب': 'Requests List',
      'نتائج': 'results',
      'رقم المرجع': 'Reference ID',
      'إسم المسافر': 'Traveler Name',
      'تاريخ الإرسال': 'Submission Date',
      'الحالة': 'Status',
      'الإجراء': 'Action',
      'عرض التفاصيل': 'View Details',
      'عرض': 'Showing',
      'من أصل': 'of',
      'عدد': 'Rows',
      'عرض سريع للاستعلام': 'Quick Inquiry Preview',
      'اسم المسافر': 'Traveler Name',
      'فتح الصفحة الكاملة': 'Open Full Page',
      'إغلاق': 'Close',
      'روابط سريعة': 'Quick Links',
      'عن النظام': 'About System',
      'حقوق الوصول': 'Access Rights',
      'الاستعلام': 'Inquiry',
      'خدمات': 'Services',
      'طلب جديد': 'New Request',
      'متابعة الطلب': 'Track Request',
      'الخط الساخن': 'Hotline',
      'لوحة تحكم الوكالة': 'Agency Dashboard',
      'إدارة ومتابعة طلبات الموافقات الأمنية · ديسمبر 2024': 'Manage and monitor security requests · December 2024',
      'لديك 2 استعلام بانتظار إتمام الدفع': 'You have 2 inquiries waiting for payment',
      'هذه الاستعلامات موقوفة عند مرحلة "دفع معلّق" — يرجى إتمام الدفع لمتابعة المعالجة': 'These inquiries are paused at "Payment Pending" — complete payment to continue processing',
      'إتمام الدفع': 'Complete Payment',
      'نظرة عامة على الوكالة': 'Agency Overview',
      'نشط': 'Active',
      'منذ تسجيل الوكالة': 'Since agency registration',
      'موافق': 'Approved',
      'عرض المحفظة': 'Open Wallet',
      'معدل الموافقة': 'Approval Rate',
      'خلال الشهر الماضي': 'During last month',
      'إحصائيات هذا الشهر': 'This Month Stats',
      'في الانتظار': 'Pending',
      'تم الرفض': 'Rejected',
      'الإجراءات السريعة': 'Quick Actions',
      'استعلام جديد': 'New Inquiry',
      'إرسال استعلام أمني لمسافر واحد مع تفاصيل الجواز والرحلة': 'Submit a security inquiry for a single traveler with passport and trip details',
      'إنشاء استعلام': 'Create Inquiry',
      'رفع حزمة طلبات': 'Upload Batch Requests',
      'رفع ملف Excel لإرسال استعلامات متعددة في طلب واحد': 'Upload an Excel file to submit multiple inquiries in one request',
      'رفع ملف': 'Upload File',
      'إدارة المحفظة': 'Manage Wallet',
      'عرض الرصيد وتاريخ المعاملات وشحن رصيد الوكالة': 'View balance, transaction history, and top up wallet',
      'إدارة الرصيد': 'Manage Balance',
      'آخر النشاطات': 'Recent Activity',
      'الاستعلامات الأخيرة': 'Recent Inquiries',
      'عرض جميع الاستعلامات': 'View all inquiries',
      'تسجيل الدخول': 'Sign in',
      'أدخل بيانات الحساب المعتمد للوصول إلى لوحة الوكالة': 'Enter your approved account credentials to access the agency dashboard',
      'البريد الإلكتروني': 'Email',
      'كلمة المرور': 'Password',
      'تذكرني': 'Remember me',
      'نسيت كلمة المرور؟': 'Forgot password?',
      'ليس لديك حساب؟': 'Don’t have an account?',
      'إنشاء حساب جديد': 'Create a new account',
      'إنشاء حساب جديد — نظام الموافقات الأمنية': 'Create New Account — Security Approval System',
      'تسجيل الدخول — نظام الموافقات الأمنية': 'Sign in — Security Approval System',
      'قائمة الاستعلامات — نظام الموافقات الأمنية': 'Inquiries List — Security Approval System',
      'لوحة تحكم الوكالة — نظام الموافقات الأمنية': 'Agency Dashboard — Security Approval System',
      'النوع': 'Type',
      'عدد المسافرين': 'Number of Travelers',
      'الإجراءات': 'Actions',
      'حزمة': 'Batch',
      'فردي': 'Single',
      'موافق عليه': 'Approved',
      'تحميل النموذج': 'Download Template',
      'رفع ملف الحزمة': 'Upload Batch File',
      'إجمالي الحزم': 'Total Batches',
      'قائمة الحزم': 'Batch List',
      'تفاصيل الحزمة': 'Batch Details',
      'رقم الحزمة': 'Batch Number',
      'حالة الحزمة': 'Batch Status',
      'المعاملات': 'Transactions',
      'رصيدك الحالي': 'Current Balance',
      'شحن المحفظة': 'Top up Wallet',
      'سجل المعاملات': 'Transaction History',
      'تاريخ العملية': 'Transaction Date',
      'قيمة العملية': 'Transaction Amount',
      'المبلغ': 'Amount',
      'العملة': 'Currency',
      'جنيه مصري': 'USD',
      'آخر دخول': 'Last Login',
      'اليوم': 'Today',
      'تمت الموافقة على حزمة الطلبات لـ 15 مسافر': 'Batch request approved for 15 travelers',
      'يحتاج هذا الاستعلام إلى إتمام الدفع للمتابعة': 'This inquiry requires payment completion to proceed',
      'رصيدك الحالي $450 — يُنصح بالشحن قريباً': 'Your current balance is $450 — top-up is recommended soon',
      'بوابتك لإدارة طلبات الموافقات الأمنية ومتابعة حالة الطلبات والحزم من مكان واحد.': 'Your gateway to manage security approvals and track inquiry and batch status in one place.'
    }
  };

  function getEmbeddedLocale(path, lang) {
    if (!path) return null;
    const normalized = String(path).toLowerCase();
    if (normalized.includes('portal') && lang === 'en') {
      return FALLBACK_PORTAL_EN;
    }
    return null;
  }

  function normalizePath(path) {
    if (!path) return '';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  function getStoredLang() {
    return localStorage.getItem('app-lang');
  }

  function setStoredLang(lang) {
    localStorage.setItem('app-lang', lang);
  }

  function inferLangFromButton(button) {
    if (!button) return null;
    const explicitLang = button.getAttribute('data-lang');
    if (explicitLang) return explicitLang;
    const text = (button.textContent || '').trim().toLowerCase();
    if (text === 'en' || text === 'english') return 'en';
    if (text === 'ع' || text === 'ar' || text === 'العربية') return 'ar';
    return null;
  }

  async function loadLocale(lang) {
    if (state.dictionaries[lang]) {
      return state.dictionaries[lang];
    }

    const response = await fetch(`${state.localePath}/${lang}.json`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load locale ${lang} from ${state.localePath}`);
    }

    const locale = await response.json();
    state.dictionaries[lang] = {
      dictionary: locale.dictionary || {},
      phrases: locale.phrases || {},
      dir: locale.dir || (lang === 'ar' ? 'rtl' : 'ltr'),
      lang: locale.lang || lang,
    };

    return state.dictionaries[lang];
  }

  function preserveOriginalTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node || !node.nodeValue) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      if (!ORIGINAL_TEXT.has(node)) {
        ORIGINAL_TEXT.set(node, node.nodeValue);
      }
    });
  }

  function preserveOriginalAttrs() {
    const elements = document.querySelectorAll('[placeholder], [title], [aria-label], input[type="submit"], input[type="button"]');
    elements.forEach((element) => {
      if (ORIGINAL_ATTRS.has(element)) return;

      ORIGINAL_ATTRS.set(element, {
        placeholder: element.getAttribute('placeholder'),
        title: element.getAttribute('title'),
        ariaLabel: element.getAttribute('aria-label'),
        value: element.getAttribute('value'),
      });
    });

    if (!document.documentElement.dataset.i18nOriginalTitle) {
      document.documentElement.dataset.i18nOriginalTitle = document.title;
    }
  }

  function getOriginalCore(text) {
    const match = (text || '').match(/^(\s*)([\s\S]*?)(\s*)$/);
    return {
      leading: (match && match[1]) || '',
      core: (match && match[2]) || '',
      trailing: (match && match[3]) || '',
    };
  }

  function phraseReplace(source, phrases) {
    if (!source) return source;
    const keys = Object.keys(phrases || {});
    if (!keys.length) return source;

    const sortedKeys = keys.sort((a, b) => b.length - a.length);
    let result = source;

    sortedKeys.forEach((key) => {
      if (!key) return;
      const value = phrases[key];
      if (!value || typeof value !== 'string') return;
      if (result.includes(key)) {
        result = result.split(key).join(value);
      }
    });

    return result;
  }

  function translateCore(core) {
    if (!core) return core;

    if (state.currentLang === 'ar') {
      return core;
    }

    if (state.currentDictionary[core]) {
      return state.currentDictionary[core];
    }

    return phraseReplace(core, state.currentPhrases);
  }

  function translateTextValue(text) {
    const { leading, core, trailing } = getOriginalCore(text);
    const translatedCore = translateCore(core);
    return `${leading}${translatedCore}${trailing}`;
  }

  function applyTitle() {
    const originalTitle = document.documentElement.dataset.i18nOriginalTitle || document.title;
    document.title = translateTextValue(originalTitle);
  }

  function applyTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node || !ORIGINAL_TEXT.has(node)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const original = ORIGINAL_TEXT.get(node);
      node.nodeValue = translateTextValue(original);
    }
  }

  function applyAttrs() {
    const elements = document.querySelectorAll('[placeholder], [title], [aria-label], input[type="submit"], input[type="button"]');

    elements.forEach((element) => {
      const original = ORIGINAL_ATTRS.get(element);
      if (!original) return;

      if (original.placeholder !== null) {
        element.setAttribute('placeholder', translateTextValue(original.placeholder));
      }
      if (original.title !== null) {
        element.setAttribute('title', translateTextValue(original.title));
      }
      if (original.ariaLabel !== null) {
        element.setAttribute('aria-label', translateTextValue(original.ariaLabel));
      }
      if (original.value !== null && (element.type === 'submit' || element.type === 'button')) {
        element.setAttribute('value', translateTextValue(original.value));
      }
    });
  }

  function dictionaryValueForKey(key) {
    if (!key) return '';
    return state.currentDictionary[key] || state.currentPhrases[key] || '';
  }

  function applyDataI18n() {
    const textNodes = document.querySelectorAll('[data-i18n]');
    textNodes.forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const value = dictionaryValueForKey(key);
      if (!value) return;
      element.textContent = value;
    });

    const htmlNodes = document.querySelectorAll('[data-i18n-html]');
    htmlNodes.forEach((element) => {
      const key = element.getAttribute('data-i18n-html');
      const value = dictionaryValueForKey(key);
      if (!value) return;
      element.innerHTML = value;
    });

    const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderNodes.forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder');
      const value = dictionaryValueForKey(key);
      if (!value) return;
      element.setAttribute('placeholder', value);
    });

    const titleNodes = document.querySelectorAll('[data-i18n-title]');
    titleNodes.forEach((element) => {
      const key = element.getAttribute('data-i18n-title');
      const value = dictionaryValueForKey(key);
      if (!value) return;
      element.setAttribute('title', value);
    });
  }

  function applyDirection(dir, lang) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.style.direction = dir;

    if (document.body) {
      document.body.style.direction = dir;
      document.body.classList.toggle('lang-ar', lang === 'ar');
      document.body.classList.toggle('lang-en', lang === 'en');
    }
  }

  function updateToggleState() {
    document.querySelectorAll('.lang-toggle button').forEach((button) => {
      const lang = inferLangFromButton(button);
      button.classList.toggle('active', lang === state.currentLang);
    });

    const legacyToggle = document.querySelector('.topbar-actions .i18n-legacy-toggle');
    if (legacyToggle) {
      legacyToggle.textContent = state.currentLang === 'ar' ? 'EN' : 'ع';
    }
  }

  function ensureLegacyAdminToggle() {
    const topbarActions = document.querySelector('.topbar-actions');
    if (!topbarActions) return;
    if (topbarActions.querySelector('.lang-toggle')) return;

    const label = topbarActions.querySelector('span');
    if (!label) return;

    label.classList.add('i18n-legacy-toggle');
    label.style.cursor = 'pointer';
    label.style.fontWeight = '700';

    label.addEventListener('click', () => {
      const nextLang = state.currentLang === 'ar' ? 'en' : 'ar';
      setLanguage(nextLang);
    });
  }

  function setupToggleBindings() {
    document.querySelectorAll('.lang-toggle button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const lang = inferLangFromButton(button);
        if (!lang) return;
        setLanguage(lang);
      });
    });

    ensureLegacyAdminToggle();
    updateToggleState();
  }

  function setLang(button) {
    const lang = inferLangFromButton(button);
    if (lang) {
      setLanguage(lang);
    }
  }

  async function setLanguage(lang) {
    let locale;
    try {
      locale = await loadLocale(lang);
    } catch (error) {
      locale = getEmbeddedLocale(state.localePath, lang) || {
        dictionary: {},
        phrases: {},
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        lang,
      };
    }

    state.currentLang = lang;
    state.currentDictionary = locale.dictionary || {};
    state.currentPhrases = locale.phrases || {};

    applyDirection(locale.dir || (lang === 'ar' ? 'rtl' : 'ltr'), locale.lang || lang);
    applyTitle();
    applyTextNodes();
    applyAttrs();
    applyDataI18n();

    setStoredLang(lang);
    updateToggleState();

    return lang;
  }

  async function init(options = {}) {
    state.defaultLang = options.defaultLang || 'ar';
    state.localePath = normalizePath(options.localePath || 'i18n/locales/portal');

    preserveOriginalTextNodes();
    preserveOriginalAttrs();
    setupToggleBindings();

    const storedLang = getStoredLang();
    const initialLang = storedLang || state.defaultLang;

    await setLanguage(initialLang);
    state.ready = true;
  }

  function t(key) {
    const value = state.currentDictionary[key];
    if (value) return value;

    if (state.currentLang === 'en') {
      return state.currentPhrases[key] || key;
    }

    return key;
  }

  window.i18n = {
    init,
    setLanguage,
    setLang,
    t,
    get currentLang() {
      return state.currentLang;
    },
  };

  window.setLang = setLang;
})(window, document);
