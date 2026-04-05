(function () {
  const OUTBOX_KEY = 'emailOutbox';

  const EMAIL_TEMPLATES = {
    'EMAIL-REG-SUBMITTED': {
      previewPath: 'email-templates/registration-submitted.html',
      subject: {
        ar: 'تم استلام تسجيل الوكالة — قيد المراجعة',
        en: 'Agency Registration Received — Pending Review'
      },
      body: {
        ar: 'عزيزي/عزيزتي [Contact_Name]،\n\nتم استلام طلب تسجيل الوكالة بنجاح وهو الآن قيد مراجعة الإدارة.\n\nالرقم المرجعي: [Registration_Reference]\nتاريخ التقديم: [Submission_DateTime]\n\nسيتم إشعاركم عبر البريد الإلكتروني عند اعتماد الحساب.\n\nنظام الموافقات الأمنية والاستعلامات',
        en: 'Dear [Contact_Name],\n\nYour agency registration has been successfully submitted and is now pending Admin review.\n\nReference: [Registration_Reference]\nSubmission Date: [Submission_DateTime]\n\nWe will notify you by email once your account is approved.\n\nSecurity Clearance & Inquiry System'
      }
    },
    'EMAIL-REG-APPROVED': {
      previewPath: 'email-templates/registration-approved.html',
      subject: {
        ar: 'تمت الموافقة على تسجيل الوكالة — تم تفعيل الحساب',
        en: 'Agency Registration Approved — Account Activated'
      },
      body: {
        ar: 'عزيزي/عزيزتي [Contact_Name]،\n\nتمت الموافقة على تسجيل الوكالة وتم تفعيل الحساب.\n\nرابط تسجيل الدخول: [Portal_Login_URL]\nالبريد الإلكتروني المسجل: [Registered_Email]\nرقم الوكالة: [Agency_ID]\n\nيمكنكم الآن تسجيل الدخول وإرسال الاستعلامات الدفعية.\n\nنظام الموافقات الأمنية والاستعلامات',
        en: 'Dear [Contact_Name],\n\nYour agency registration has been approved. Your account is now active.\n\nLogin URL: [Portal_Login_URL]\nRegistered Email: [Registered_Email]\nAgency ID: [Agency_ID]\n\nYou can now sign in and submit batch inquiries.\n\nSecurity Clearance & Inquiry System'
      }
    },
    'EMAIL-PASSWORD-RESET': {
      previewPath: 'email-templates/password-reset.html',
      subject: {
        ar: 'طلب إعادة تعيين كلمة المرور',
        en: 'Password Reset Request'
      },
      body: {
        ar: 'عزيزي المستخدم،\n\nتلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بك.\n\nرابط إعادة التعيين: [Reset_Link]\nصلاحية الرابط حتى: [Expiry_DateTime]\n\nإذا لم تقم بهذا الطلب، يرجى تجاهل هذا البريد الإلكتروني.\n\nنظام الموافقات الأمنية والاستعلامات',
        en: 'Dear User,\n\nWe received a request to reset your password.\n\nReset Link: [Reset_Link]\nLink Expiry: [Expiry_DateTime]\n\nIf you did not request this, please ignore this email.\n\nSecurity Clearance & Inquiry System'
      }
    }
  };

  const EMAIL_CYCLE = [
    {
      step: 1,
      event: 'agency_registration_submitted',
      templateId: 'EMAIL-REG-SUBMITTED',
      source: 'registration.submitAgency'
    },
    {
      step: 2,
      event: 'agency_registration_approved',
      templateId: 'EMAIL-REG-APPROVED',
      source: 'admin.agencyView.approveAgency'
    },
    {
      step: 3,
      event: 'password_reset_requested',
      templateId: 'EMAIL-PASSWORD-RESET',
      source: 'login.sendResetLink'
    }
  ];

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch (error) {
      return fallback;
    }
  }

  function getCurrentLang() {
    const lang = localStorage.getItem('lang') || document.documentElement.lang || 'ar';
    return String(lang).toLowerCase().startsWith('en') ? 'en' : 'ar';
  }

  function renderTemplate(text, vars) {
    return text.replace(/\[([^\]]+)\]/g, function (_, key) {
      const value = vars[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  function nextEmailId() {
    return 'MAIL-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  function getOutbox() {
    return safeParse(localStorage.getItem(OUTBOX_KEY), []);
  }

  function setOutbox(items) {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(items));
  }

  function sendTemplateEmail(templateId, to, vars, meta) {
    const template = EMAIL_TEMPLATES[templateId];
    if (!template || !to) return null;

    const lang = getCurrentLang();
    const payloadVars = vars || {};
    const payloadMeta = meta || {};

    const email = {
      id: nextEmailId(),
      templateId: templateId,
      language: lang,
      to: to,
      subject: renderTemplate(template.subject[lang], payloadVars),
      body: renderTemplate(template.body[lang], payloadVars),
      sentAt: new Date().toISOString(),
      meta: payloadMeta
    };

    const outbox = getOutbox();
    outbox.unshift(email);
    setOutbox(outbox.slice(0, 100));

    window.dispatchEvent(new CustomEvent('email:sent', { detail: email }));
    return email;
  }

  function clearOutbox() {
    localStorage.removeItem(OUTBOX_KEY);
  }

  function getTemplatePreviewPath(templateId) {
    const template = EMAIL_TEMPLATES[templateId];
    return template && template.previewPath ? template.previewPath : null;
  }

  function openTemplatePreview(templateId) {
    const path = getTemplatePreviewPath(templateId);
    if (!path) return null;
    window.open(path, '_blank');
    return path;
  }

  window.EmailNotifications = {
    cycle: EMAIL_CYCLE,
    templates: EMAIL_TEMPLATES,
    sendTemplateEmail: sendTemplateEmail,
    getOutbox: getOutbox,
    clearOutbox: clearOutbox,
    getTemplatePreviewPath: getTemplatePreviewPath,
    openTemplatePreview: openTemplatePreview
  };
})();
