/**
 * SCG Shared UI Utilities
 * Security Clearance & Inquiry System — Portal + Admin
 * Auto-initializes on DOMContentLoaded
 */
const SCG = (function () {
  'use strict';

  // ── Modal Manager ──────────────────────────────────────────────────────
  const modal = {
    _previousFocus: null,
    _focusTrapHandler: null,

    init() {
      document.querySelectorAll('.admin-modal-overlay').forEach(function (overlay) {
        // Close on overlay click (not modal body)
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) {
            modal.close(overlay.id);
          }
        });
      });

      // Global ESC handler
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var openModal = document.querySelector('.admin-modal-overlay[style*="display: flex"], .admin-modal-overlay[style*="display:flex"], .admin-modal-overlay.open');
          if (openModal) {
            modal.close(openModal.id);
          }
          // Also close confirm dialogs
          var confirmOverlay = document.querySelector('.confirm-dialog-overlay');
          if (confirmOverlay) {
            confirmOverlay.remove();
            if (modal._previousFocus) {
              modal._previousFocus.focus();
            }
          }
        }
      });
    },

    open(id) {
      var overlay = document.getElementById(id);
      if (!overlay) return;
      modal._previousFocus = document.activeElement;
      overlay.style.display = 'flex';

      // Focus first input inside modal
      requestAnimationFrame(function () {
        var firstInput = overlay.querySelector('input:not([readonly]):not([type="hidden"]), select, textarea, button');
        if (firstInput) firstInput.focus();
        modal._trapFocus(overlay);
      });
    },

    close(id) {
      var overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.style.display = 'none';

      // Restore focus
      if (modal._previousFocus) {
        modal._previousFocus.focus();
        modal._previousFocus = null;
      }

      // Remove focus trap
      if (modal._focusTrapHandler) {
        document.removeEventListener('keydown', modal._focusTrapHandler);
        modal._focusTrapHandler = null;
      }
    },

    _trapFocus(container) {
      if (modal._focusTrapHandler) {
        document.removeEventListener('keydown', modal._focusTrapHandler);
      }
      modal._focusTrapHandler = function (e) {
        if (e.key !== 'Tab') return;
        var focusable = container.querySelectorAll(
          'input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]'
        );
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', modal._focusTrapHandler);
    }
  };

  // ── Confirm Dialog ─────────────────────────────────────────────────────
  function confirm(message, onConfirm, options) {
    options = options || {};
    var title = options.title || 'تأكيد العملية';
    var confirmText = options.confirmText || 'تأكيد';
    var cancelText = options.cancelText || 'إلغاء';
    var type = options.type || 'warning'; // warning, danger

    var iconClass = type === 'danger' ? 'fa-trash-can' : 'fa-triangle-exclamation';
    var btnClass = type === 'danger' ? 'danger' : 'primary';

    // Admin vs portal button classes
    var isAdmin = document.body.classList.contains('admin-body');
    var btnPrimaryClass = isAdmin ? 'admin-btn ' + btnClass : 'btn btn-' + btnClass;
    var btnSecondaryClass = isAdmin ? 'admin-btn light' : 'btn btn-secondary';

    var overlay = document.createElement('div');
    overlay.className = 'confirm-dialog-overlay';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'confirm-title');

    overlay.innerHTML =
      '<div class="confirm-dialog">' +
        '<div class="confirm-dialog-icon"><i class="fas ' + iconClass + '"></i></div>' +
        '<h4 id="confirm-title">' + title + '</h4>' +
        '<p>' + message + '</p>' +
        '<div class="confirm-dialog-actions">' +
          '<button class="' + btnPrimaryClass + '" id="confirm-yes">' + confirmText + '</button>' +
          '<button class="' + btnSecondaryClass + '" id="confirm-no">' + cancelText + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    var prevFocus = document.activeElement;
    var yesBtn = overlay.querySelector('#confirm-yes');
    var noBtn = overlay.querySelector('#confirm-no');
    yesBtn.focus();

    function cleanup() {
      overlay.remove();
      if (prevFocus) prevFocus.focus();
    }

    yesBtn.addEventListener('click', function () {
      cleanup();
      if (onConfirm) onConfirm();
    });

    noBtn.addEventListener('click', cleanup);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) cleanup();
    });
  }

  // ── Button Loading State ───────────────────────────────────────────────
  function btnLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn._origText = btn.innerHTML;
      btn.classList.add('btn-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
      if (btn._origText) btn.innerHTML = btn._origText;
    }
  }

  // ── Debounce ───────────────────────────────────────────────────────────
  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    };
  }

  // ── Clickable Rows — Keyboard Support ──────────────────────────────────
  function initClickableRows() {
    document.querySelectorAll('.clickable-row[onclick]').forEach(function (row) {
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'link');
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.click();
        }
      });
    });
  }

  // ── Error message ARIA ─────────────────────────────────────────────────
  function initErrorAria() {
    document.querySelectorAll('.error-msg, .em').forEach(function (el) {
      el.setAttribute('role', 'alert');
      el.setAttribute('aria-live', 'polite');
    });
  }

  // ── Sidebar Toggle ARIA ────────────────────────────────────────────────
  function initSidebarAria() {
    // Admin sidebar toggle (icon button)
    document.querySelectorAll('[onclick*="toggleSidebar"]').forEach(function (btn) {
      btn.setAttribute('aria-label', 'فتح/إغلاق القائمة الجانبية (Toggle sidebar)');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');

      // Update aria-expanded on click
      var origClick = btn.getAttribute('onclick');
      btn.removeAttribute('onclick');
      btn.addEventListener('click', function () {
        eval(origClick);
        var sidebar = document.getElementById('adminSidebar');
        var isOpen = sidebar && sidebar.classList.contains('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // ── Auto-bind labels to inputs ─────────────────────────────────────────
  function initLabelBinding() {
    document.querySelectorAll('.admin-modal label').forEach(function (label) {
      if (label.getAttribute('for')) return; // already bound
      var field = label.parentElement.querySelector('input, select, textarea');
      if (field && field.id) {
        label.setAttribute('for', field.id);
      }
    });
  }

  // ── Charts ARIA ────────────────────────────────────────────────────────
  function initChartAria() {
    document.querySelectorAll('canvas').forEach(function (canvas) {
      if (!canvas.getAttribute('aria-label')) {
        canvas.setAttribute('role', 'img');
        var id = canvas.id || '';
        if (id.toLowerCase().indexOf('pie') !== -1 || id.toLowerCase().indexOf('nationality') !== -1) {
          canvas.setAttribute('aria-label', 'رسم بياني يوضح توزيع الطلبات حسب الجنسية (Nationality distribution chart)');
        } else if (id.toLowerCase().indexOf('trend') !== -1 || id.toLowerCase().indexOf('line') !== -1) {
          canvas.setAttribute('aria-label', 'رسم بياني يوضح اتجاه الطلبات عبر الوقت (Inquiry trend chart)');
        } else {
          canvas.setAttribute('aria-label', 'رسم بياني (Chart)');
        }
      }
    });
  }

  // ── Init ────────────────────────────────────────────────────────────────
  function init() {
    modal.init();
    initClickableRows();
    initErrorAria();
    initSidebarAria();
    initLabelBinding();
    initChartAria();
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    modal: modal,
    confirm: confirm,
    btnLoading: btnLoading,
    debounce: debounce
  };
})();
