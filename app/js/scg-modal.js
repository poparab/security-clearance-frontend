/**
 * SCG.Modal — Unified Modal System Component
 * Security Clearance & Inquiry System — Admin UI
 *
 * Extends window.SCG with SCG.Modal factory.
 * Bootstrap 5 structural classes, RTL, Tajawal font.
 * CSS is auto-injected at load time — no DOMContentLoaded wait required.
 */
(function (global) {
  'use strict';

  // ── CSS Auto-Injection ────────────────────────────────────────────────────
  var SCG_MODAL_STYLE_ID = 'scg-modal-styles';

  function injectCSS() {
    if (document.getElementById(SCG_MODAL_STYLE_ID)) return;

    var css = [
      /* ── Backdrop / root overlay ── */
      '.modal.scg-modal {',
      '  display: none;',
      '  position: fixed;',
      '  inset: 0;',
      '  z-index: 1050;',
      '  background: rgba(0, 0, 0, 0.55);',
      '  align-items: center;',
      '  justify-content: center;',
      '  padding: 16px;',
      '  overflow-y: auto;',
      '}',
      '.modal.scg-modal.scg-modal-open {',
      '  display: flex;',
      '}',

      /* ── Dialog sizing ── */
      '.modal.scg-modal .modal-dialog {',
      '  width: 100%;',
      '  max-width: 520px;',
      '  margin: auto;',
      '  pointer-events: none;',
      '}',
      '.modal.scg-modal.scg-modal-sm .modal-dialog {',
      '  max-width: 380px;',
      '}',
      '.modal.scg-modal.scg-modal-lg .modal-dialog {',
      '  max-width: 680px;',
      '}',

      /* ── Content card ── */
      '.modal.scg-modal .modal-content {',
      '  position: relative;',
      '  pointer-events: all;',
      '  background: #ffffff;',
      '  border: none;',
      '  border-radius: 12px;',
      '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.08);',
      '  direction: rtl;',
      '  font-family: "Tajawal", sans-serif;',
      '}',

      /* ── Header ── */
      '.modal.scg-modal .modal-header {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  padding: 16px 20px;',
      '  border-bottom: 1px solid #e5e7eb;',
      '  border-radius: 12px 12px 0 0;',
      '}',
      '.modal.scg-modal .modal-title {',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 18px;',
      '  font-weight: 800;',
      '  color: #004799;',
      '  margin: 0;',
      '  line-height: 1.3;',
      '}',
      '.modal.scg-modal .btn-close {',
      '  background: transparent;',
      '  border: none;',
      '  cursor: pointer;',
      '  padding: 4px;',
      '  color: #6b7280;',
      '  font-size: 18px;',
      '  line-height: 1;',
      '  transition: color 0.15s ease;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  width: 32px;',
      '  height: 32px;',
      '  border-radius: 6px;',
      '}',
      '.modal.scg-modal .btn-close:hover {',
      '  color: #111827;',
      '  background: #f3f4f6;',
      '}',
      '.modal.scg-modal .btn-close::before {',
      '  content: "\\00D7";',
      '  font-size: 20px;',
      '  font-weight: 400;',
      '}',

      /* ── Body ── */
      '.modal.scg-modal .modal-body {',
      '  padding: 20px;',
      '  text-align: right;',
      '  color: #374151;',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 15px;',
      '  line-height: 1.7;',
      '}',

      /* ── Footer ── */
      '.modal.scg-modal .modal-footer {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: flex-start;',
      '  flex-direction: row-reverse;',
      '  gap: 8px;',
      '  padding: 14px 20px;',
      '  border-top: 1px solid #e5e7eb;',
      '  border-radius: 0 0 12px 12px;',
      '  flex-wrap: wrap;',
      '}',

      /* ── Form fields inside modal ── */
      '.modal.scg-modal .scg-field {',
      '  margin-bottom: 16px;',
      '}',
      '.modal.scg-modal .scg-field:last-child {',
      '  margin-bottom: 0;',
      '}',
      '.modal.scg-modal .scg-label {',
      '  display: block;',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 13px;',
      '  font-weight: 600;',
      '  color: #374151;',
      '  margin-bottom: 4px;',
      '}',
      '.modal.scg-modal .scg-label .req {',
      '  color: #dc2626;',
      '  margin-right: 2px;',
      '}',
      '.modal.scg-modal .scg-field input,',
      '.modal.scg-modal .scg-field select,',
      '.modal.scg-modal .scg-field textarea {',
      '  width: 100%;',
      '  min-height: 44px;',
      '  border: 1px solid #d1d5db;',
      '  border-radius: 8px;',
      '  background: #f8fafc;',
      '  padding: 8px 12px;',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 14px;',
      '  color: #111827;',
      '  transition: border-color 0.15s ease, box-shadow 0.15s ease;',
      '  box-sizing: border-box;',
      '  text-align: right;',
      '  direction: rtl;',
      '}',
      '.modal.scg-modal .scg-field textarea {',
      '  min-height: 88px;',
      '  resize: vertical;',
      '}',
      '.modal.scg-modal .scg-field input[type="file"] {',
      '  background: #ffffff;',
      '  padding: 6px 10px;',
      '}',
      '.modal.scg-modal .scg-field input:focus,',
      '.modal.scg-modal .scg-field select:focus,',
      '.modal.scg-modal .scg-field textarea:focus {',
      '  outline: none;',
      '  border-color: #005FCC;',
      '  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.15);',
      '  background: #ffffff;',
      '}',
      '.modal.scg-modal .scg-field input[readonly],',
      '.modal.scg-modal .scg-field textarea[readonly] {',
      '  background: #f3f4f6;',
      '  color: #6b7280;',
      '  cursor: default;',
      '}',

      /* ── Error messages ── */
      '.modal.scg-modal .scg-error {',
      '  display: none;',
      '  color: #dc2626;',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 13px;',
      '  margin-top: 4px;',
      '  text-align: right;',
      '}',
      '.modal.scg-modal .scg-error.visible {',
      '  display: block;',
      '}',

      /* ── Action buttons ── */
      '.scg-btn-primary, .scg-btn-success, .scg-btn-danger, .scg-btn-light {',
      '  height: 38px;',
      '  padding: 0 16px;',
      '  border: none;',
      '  border-radius: 8px;',
      '  font-family: "Tajawal", sans-serif;',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  cursor: pointer;',
      '  transition: opacity 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;',
      '  white-space: nowrap;',
      '  display: inline-flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  gap: 6px;',
      '}',
      '.scg-btn-primary:hover, .scg-btn-success:hover, .scg-btn-danger:hover {',
      '  opacity: 0.88;',
      '}',
      '.scg-btn-primary:active, .scg-btn-success:active, .scg-btn-danger:active, .scg-btn-light:active {',
      '  transform: scale(0.97);',
      '}',
      '.scg-btn-primary:disabled, .scg-btn-success:disabled, .scg-btn-danger:disabled, .scg-btn-light:disabled {',
      '  opacity: 0.5;',
      '  cursor: not-allowed;',
      '  transform: none;',
      '}',
      '.scg-btn-primary {',
      '  background: #005FCC;',
      '  color: #ffffff;',
      '}',
      '.scg-btn-success {',
      '  background: #16a34a;',
      '  color: #ffffff;',
      '}',
      '.scg-btn-danger {',
      '  background: #dc2626;',
      '  color: #ffffff;',
      '}',
      '.scg-btn-light {',
      '  background: #f3f4f6;',
      '  color: #374151;',
      '  border: 1px solid #d1d5db;',
      '}',
      '.scg-btn-light:hover {',
      '  background: #e5e7eb;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = SCG_MODAL_STYLE_ID;
    style.textContent = css;

    var head = document.head || document.getElementsByTagName('head')[0];
    if (head) {
      head.appendChild(style);
    }
  }

  // Inject immediately
  injectCSS();

  // ── Internal helpers ──────────────────────────────────────────────────────

  /** Monotonic counter for unique modal IDs — avoids Date.now() collisions. */
  var _uid = 0;

  /** Escape a string for safe use inside an HTML attribute value. */
  function _escAttr(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Escape a string for safe use as HTML text node content. */
  function _escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  var FOCUSABLE_SELECTOR = [
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'a[href]'
  ].join(', ');

  function getFocusable(container) {
    return Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE_SELECTOR));
  }

  function buildButton(action) {
    var cls = 'scg-btn-' + (action.variant || 'primary');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cls;
    btn.textContent = action.label || '';
    return btn;
  }

  function buildModalDOM(config) {
    var sizeClass = config.size === 'sm' ? 'scg-modal-sm'
                  : config.size === 'lg' ? 'scg-modal-lg'
                  : '';

    // Root
    var root = document.createElement('div');
    root.id = config.id;
    root.className = 'modal scg-modal' + (sizeClass ? ' ' + sizeClass : '');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', config.id + '-title');

    // Dialog
    var dialog = document.createElement('div');
    dialog.className = 'modal-dialog';

    // Content
    var content = document.createElement('div');
    content.className = 'modal-content';

    // Header
    var header = document.createElement('div');
    header.className = 'modal-header';

    var titleEl = document.createElement('h5');
    titleEl.className = 'modal-title';
    titleEl.id = config.id + '-title';
    titleEl.textContent = config.title || '';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-close';
    closeBtn.setAttribute('aria-label', 'إغلاق');

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    // Body
    var body = document.createElement('div');
    body.className = 'modal-body';

    if (config.body instanceof HTMLElement) {
      body.appendChild(config.body);
    } else if (typeof config.body === 'string') {
      // Caller is responsible for sanitizing HTML passed as body —
      // do not pass untrusted user input directly.
      body.innerHTML = config.body;
    }

    // Footer (actions)
    var hasActions = config.actions && config.actions.length > 0;
    var footer;
    if (hasActions) {
      footer = document.createElement('div');
      footer.className = 'modal-footer';
    }

    // Assemble
    content.appendChild(header);
    content.appendChild(body);
    if (footer) content.appendChild(footer);
    dialog.appendChild(content);
    root.appendChild(dialog);

    return { root: root, body: body, footer: footer, closeBtn: closeBtn };
  }

  // ── SCG.Modal factory ──────────────────────────────────────────────────────

  var Modal = {

    /**
     * Create a modal instance.
     *
     * @param {Object} config
     * @returns {{ open: Function, close: Function, destroy: Function, el: HTMLElement }}
     */
    create: function (config) {
      config = config || {};

      var dom = null;     // built lazily on first open
      var instance = {};
      var _escHandler = null;
      var _outsideHandler = null;
      var _previousFocus = null;
      var _focusTrapHandler = null;
      var _actionCleanups = [];
      var _isOpen = false;

      function _build() {
        dom = buildModalDOM(config);

        // Wire close button
        dom.closeBtn.addEventListener('click', function () {
          instance.close();
        });

        // Wire action buttons
        if (config.actions && config.actions.length) {
          config.actions.forEach(function (action) {
            var btn = buildButton(action);
            btn.addEventListener('click', function () {
              if (typeof action.onClick === 'function') {
                action.onClick(instance);
              }
              if (action.close === true) {
                instance.close();
              }
            });
            dom.footer.appendChild(btn);
            _actionCleanups.push(function () { btn.remove(); });
          });
        }

        document.body.appendChild(dom.root);
      }

      function _applySlots(slots) {
        if (!slots || !dom) return;
        Object.keys(slots).forEach(function (key) {
          var slotEl = dom.body.querySelector('[data-slot="' + key + '"]');
          // Use textContent — slot values are plain text, not HTML.
          if (slotEl) slotEl.textContent = slots[key];
        });
      }

      function _trapFocus(container) {
        if (_focusTrapHandler) {
          document.removeEventListener('keydown', _focusTrapHandler);
        }
        _focusTrapHandler = function (e) {
          if (e.key !== 'Tab') return;
          var focusable = getFocusable(container);
          if (focusable.length === 0) return;
          var first = focusable[0];
          var last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        };
        document.addEventListener('keydown', _focusTrapHandler);
      }

      function _removeListeners() {
        if (_escHandler) {
          document.removeEventListener('keydown', _escHandler);
          _escHandler = null;
        }
        if (_outsideHandler) {
          dom.root.removeEventListener('click', _outsideHandler);
          _outsideHandler = null;
        }
        if (_focusTrapHandler) {
          document.removeEventListener('keydown', _focusTrapHandler);
          _focusTrapHandler = null;
        }
      }

      /**
       * Open the modal.
       * @param {Object} [openOptions] - Optional. { slots: { key: value } }
       */
      instance.open = function (openOptions) {
        openOptions = openOptions || {};

        // Remove any stale listeners before attaching new ones.
        // Prevents listener multiplication when open() is called
        // while the modal is already open.
        _removeListeners();

        if (!dom) _build();

        _applySlots(openOptions.slots);

        // Only capture focus origin when it is outside the modal,
        // so stacked/re-opened calls don't overwrite with an in-modal element.
        if (!dom || !dom.root.contains(document.activeElement)) {
          _previousFocus = document.activeElement;
        }
        dom.root.classList.add('scg-modal-open');
        _isOpen = true;

        // Focus first interactive element
        requestAnimationFrame(function () {
          var focusable = getFocusable(dom.body);
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            dom.closeBtn.focus();
          }
          _trapFocus(dom.root);
        });

        // ESC to close
        _escHandler = function (e) {
          if (e.key === 'Escape' && _isOpen) {
            instance.close();
          }
        };
        document.addEventListener('keydown', _escHandler);

        // Click outside modal-content to close
        _outsideHandler = function (e) {
          if (e.target === dom.root) {
            instance.close();
          }
        };
        dom.root.addEventListener('click', _outsideHandler);

        if (typeof config.onOpen === 'function') {
          config.onOpen(instance);
        }
      };

      /**
       * Close the modal.
       */
      instance.close = function () {
        if (!dom) return;
        dom.root.classList.remove('scg-modal-open');
        _isOpen = false;

        _removeListeners();

        if (_previousFocus) {
          _previousFocus.focus();
          _previousFocus = null;
        }

        if (typeof config.onClose === 'function') {
          config.onClose(instance);
        }
      };

      /**
       * Remove modal from DOM and clean up all listeners.
       */
      instance.destroy = function () {
        instance.close();
        _actionCleanups.forEach(function (fn) { fn(); });
        _actionCleanups = [];
        if (dom && dom.root && dom.root.parentNode) {
          dom.root.parentNode.removeChild(dom.root);
        }
        dom = null;
      };

      /**
       * Reference to the root .modal element (null until first open).
       */
      Object.defineProperty(instance, 'el', {
        get: function () { return dom ? dom.root : null; }
      });

      return instance;
    },

    /**
     * Shorthand confirm dialog.
     *
     * @param {Object} config
     */
    confirm: function (config) {
      config = config || {};

      var confirmLabel = config.confirmLabel || 'تأكيد';
      var cancelLabel = config.cancelLabel || 'إلغاء';
      var confirmVariant = config.confirmVariant || 'primary';

      var body = '<p style="margin:0;font-size:15px;color:#374151;">'
               + (config.message || '')
               + '</p>';

      var instance = Modal.create({
        id: config.id || ('scg-confirm-' + (++_uid)),
        title: config.title || 'تأكيد العملية',
        body: body,
        size: config.size || 'sm',
        onOpen: config.onOpen,
        onClose: config.onClose,
        actions: [
          {
            label: confirmLabel,
            variant: confirmVariant,
            close: true,
            onClick: function () {
              if (typeof config.onConfirm === 'function') {
                config.onConfirm();
              }
            }
          },
          {
            label: cancelLabel,
            variant: 'light',
            close: true,
            onClick: null
          }
        ]
      });

      instance.open({ slots: config.slots });
      return instance;
    },

    /**
     * Build a labeled form field HTML string.
     *
     * @param {Object} config
     * @returns {string} HTML string
     */
    field: function (config) {
      config = config || {};

      var id = config.id || '';
      var label = config.label || '';
      var type = config.type || 'text';
      var required = config.required === true;
      var placeholder = config.placeholder || '';
      var readonly = config.readonly === true;

      var reqSpan = required ? '<span class="req">*</span>' : '';
      var labelHtml = '<label class="scg-label" for="' + _escAttr(id) + '">' + _escHtml(label) + reqSpan + '</label>';

      var inputHtml = '';

      if (type === 'select') {
        var options = config.options || [];
        var optionHtml = options.map(function (opt) {
          return '<option value="' + _escAttr(opt.value) + '">' + _escHtml(opt.label) + '</option>';
        }).join('');
        inputHtml = '<select id="' + _escAttr(id) + '" class="form-control"'
                  + (required ? ' required' : '')
                  + (readonly ? ' disabled' : '')
                  + '>'
                  + '<option value="">-- اختر --</option>'
                  + optionHtml
                  + '</select>';

      } else if (type === 'textarea') {
        var maxlengthAttr = config.maxlength ? ' maxlength="' + _escAttr(config.maxlength) + '"' : '';
        inputHtml = '<textarea id="' + _escAttr(id) + '" class="form-control"'
                  + (required ? ' required' : '')
                  + (readonly ? ' readonly' : '')
                  + (placeholder ? ' placeholder="' + _escAttr(placeholder) + '"' : '')
                  + maxlengthAttr
                  + '></textarea>';

      } else if (type === 'file') {
        var acceptAttr = config.accept ? ' accept="' + _escAttr(config.accept) + '"' : '';
        inputHtml = '<input id="' + _escAttr(id) + '" type="file" class="form-control"'
                  + (required ? ' required' : '')
                  + acceptAttr
                  + '>';

      } else {
        var extraAttrs = '';
        if (config.step) extraAttrs += ' step="' + _escAttr(config.step) + '"';
        if (config.min !== undefined && config.min !== null) extraAttrs += ' min="' + _escAttr(config.min) + '"';
        if (config.maxlength) extraAttrs += ' maxlength="' + _escAttr(config.maxlength) + '"';

        inputHtml = '<input id="' + _escAttr(id) + '" type="' + _escAttr(type) + '" class="form-control"'
                  + (required ? ' required' : '')
                  + (readonly ? ' readonly' : '')
                  + (placeholder ? ' placeholder="' + _escAttr(placeholder) + '"' : '')
                  + extraAttrs
                  + '>';
      }

      var errorHtml = '<div id="' + _escAttr(id) + '-err" class="scg-error" role="alert" aria-live="polite"></div>';

      return '<div class="scg-field">'
           + labelHtml
           + inputHtml
           + errorHtml
           + '</div>';
    },

    /**
     * Show an error message for a field.
     *
     * @param {string} fieldId - The field's id attribute
     * @param {string} message - Error text to display
     */
    showError: function (fieldId, message) {
      var errEl = document.getElementById(fieldId + '-err');
      if (!errEl) return;
      errEl.textContent = message || '';
      errEl.classList.add('visible');

      // Also mark the input as invalid for styling
      var inputEl = document.getElementById(fieldId);
      if (inputEl) {
        inputEl.setAttribute('aria-invalid', 'true');
        inputEl.setAttribute('aria-describedby', fieldId + '-err');
        inputEl.style.borderColor = '#dc2626';
      }
    },

    /**
     * Clear the error message for a field.
     *
     * @param {string} fieldId - The field's id attribute
     */
    clearError: function (fieldId) {
      var errEl = document.getElementById(fieldId + '-err');
      if (!errEl) return;
      errEl.textContent = '';
      errEl.classList.remove('visible');

      var inputEl = document.getElementById(fieldId);
      if (inputEl) {
        inputEl.removeAttribute('aria-invalid');
        inputEl.removeAttribute('aria-describedby');
        inputEl.style.borderColor = '';
      }
    }
  };

  // ── Attach to global SCG ──────────────────────────────────────────────────
  if (typeof global.SCG !== 'undefined') {
    global.SCG.Modal = Modal;
  } else {
    global.SCG = { Modal: Modal };
  }

}(window));
