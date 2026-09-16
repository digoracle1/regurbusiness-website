(function () {
  "use strict";

  var cfg = window.REGUR_CONFIG || {};
  var number = String(cfg.whatsappNumber || "").replace(/[^0-9X]/gi, "") || "234XXXXXXXXXX";

  function waLink(message) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message || cfg.defaultMessage || "");
  }

  /* ---------- WhatsApp links: every [data-wa] element ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  /* ---------- Placeholder labels ---------- */
  if (cfg.showPlaceholderLabels === false) document.body.classList.remove("show-placeholders");

  /* ---------- Year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: scroll state + mobile nav ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); } });

  /* ---------- Cookie consent banner ----------
     Only shown when js/config.js has at least one tracking ID. Tags load
     after "Accept" and never after "Decline". The choice is stored in the
     visitor's browser only. -------------------------------------------- */
  var CONSENT_KEY = "ryb-cookie-consent";
  var tracking = cfg.tracking || {};
  var hasTags = !!(tracking.metaPixelId || tracking.tiktokPixelId || tracking.ga4Id);

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function loadTags() {
    if (tracking.metaPixelId) {
      /* Meta (Facebook/Instagram) Pixel */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", tracking.metaPixelId);
      window.fbq("track", "PageView");
    }
    if (tracking.tiktokPixelId) {
      /* TikTok Pixel */
      !function (w, d, t) {
        w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
        ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
        ttq.setAndDefer = function (obj, m) { obj[m] = function () { obj.push([m].concat(Array.prototype.slice.call(arguments, 0))); }; };
        for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.load = function (e) {
          var u = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = u; ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
          ttq._o = ttq._o || {}; ttq._o[e] = {};
          var s = d.createElement("script"); s.type = "text/javascript"; s.async = !0; s.src = u + "?sdkid=" + e + "&lib=" + t;
          var f = d.getElementsByTagName("script")[0]; f.parentNode.insertBefore(s, f);
        };
        ttq.load(tracking.tiktokPixelId); ttq.page();
      }(window, document, "ttq");
    }
    if (tracking.ga4Id) {
      /* Google Analytics 4 */
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + tracking.ga4Id;
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", tracking.ga4Id, { anonymize_ip: true });
    }
  }

  function buildBanner() {
    var wrap = document.createElement("div");
    wrap.className = "cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-live", "polite");
    wrap.setAttribute("aria-label", "Cookie choices");
    wrap.innerHTML =
      '<div class="cookie-banner__text">' +
        '<strong>We&rsquo;d like to use cookies</strong>' +
        '<p>We use cookies to measure how our ads perform, so we can reach more business owners who need us. ' +
        'They are not needed for this site to work \u2014 choose &ldquo;Decline&rdquo; and nothing is loaded. ' +
        'See our <a href="privacy.html#what-we-collect">Privacy Policy</a>.</p>' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn--brand btn--sm" data-consent="accepted">Accept</button>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-consent="declined">Decline</button>' +
      '</div>';
    document.body.appendChild(wrap);
    requestAnimationFrame(function () { wrap.classList.add("is-in"); });
    wrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      var choice = b.getAttribute("data-consent");
      saveConsent(choice);
      wrap.remove();
      document.body.classList.remove("has-cookie-banner");
      if (choice === "accepted") loadTags();
    });
    document.body.classList.add("has-cookie-banner");
  }

  window.RYB_COOKIES = {
    status: function () { return readConsent() || "unset"; },
    reset: function () {                       // "Cookie settings" link in the footer
      try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
      if (!document.querySelector(".cookie-banner")) {
        if (hasTags) buildBanner();
        else window.alert("This site currently sets no tracking cookies, so there is nothing to choose.");
      }
    }
  };

  var consent = readConsent();
  if (hasTags) {
    if (consent === "accepted") loadTags();
    else if (consent !== "declined") buildBanner();
  }

  var cookieLink = document.querySelector("[data-cookie-settings]");
  if (cookieLink) cookieLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.RYB_COOKIES.reset();
  });

  /* ---------- Gallery ---------- */
  var categories = window.REGUR_GALLERY_CATEGORIES || [];
  var items = window.REGUR_GALLERY || [];
  var tabsEl = document.querySelector("[data-gallery-tabs]");
  var gridEl = document.querySelector("[data-gallery-grid]");
  var statusEl = document.querySelector("[data-gallery-status]");
  if (!tabsEl || !gridEl) return;

  var labelFor = {};
  categories.forEach(function (c) { labelFor[c.key] = c.label; });
  var current = "all";
  var visible = [];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function icon(id) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }
  function slot(item) {
    var s = el("div", "slot");
    var i = el("span", "slot__icon");
    i.appendChild(icon(item.category === "websites" ? "i-browser" : "i-doc"));
    s.appendChild(i);
    s.appendChild(el("span", "slot__title", "Upload slot"));
    var hint = el("span", "slot__hint");
    hint.appendChild(icon("i-upload"));
    hint.appendChild(document.createTextNode(item.category === "websites" ? "Real website screenshot" : "Real, redacted certificate"));
    s.appendChild(hint);
    return s;
  }
  function altFor(item) {
    return item.alt || ((labelFor[item.category] || "Proof of work") + ": " + (item.caption || "image"));
  }

  // Tabs
  [{ key: "all", label: "All" }].concat(categories).forEach(function (c) {
    var b = el("button", "gallery-tab", c.label);
    b.type = "button";
    b.dataset.filter = c.key;
    b.setAttribute("aria-pressed", String(c.key === current));
    b.setAttribute("aria-controls", "gallery-grid");
    tabsEl.appendChild(b);
  });
  gridEl.id = "gallery-grid";
  tabsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".gallery-tab");
    if (!b) return;
    current = b.dataset.filter;
    tabsEl.querySelectorAll(".gallery-tab").forEach(function (t) { t.setAttribute("aria-pressed", String(t === b)); });
    render();
  });

  function render() {
    visible = items.filter(function (it) { return current === "all" || it.category === current; });
    gridEl.innerHTML = "";
    if (!visible.length) {
      gridEl.appendChild(el("li", "gallery-empty", "New items coming soon in this category."));
    }
    visible.forEach(function (item, idx) {
      var li = el("li", "g-item g-item--" + item.category);
      var btn = el("button", "g-item__btn");
      btn.type = "button";
      btn.dataset.index = idx;
      var frame = el("span", "g-item__frame");
      if (item.src) {
        var img = document.createElement("img");
        img.src = item.src;
        img.alt = altFor(item);
        img.loading = "lazy";
        img.decoding = "async";
        img.width = 600; img.height = 750;
        frame.appendChild(img);
        btn.setAttribute("aria-label", "Enlarge: " + altFor(item));
      } else {
        frame.appendChild(slot(item));
        btn.setAttribute("aria-label", "Placeholder upload slot for " + (labelFor[item.category] || "gallery item") + ". Open larger view");
      }
      var zoom = el("span", "g-item__zoom");
      zoom.appendChild(icon("i-chev-right"));
      frame.appendChild(zoom);
      btn.appendChild(frame);
      var meta = el("span", "g-item__meta");
      meta.appendChild(el("span", "g-item__cat", labelFor[item.category] || ""));
      meta.appendChild(el("span", "g-item__caption", item.caption || ""));
      btn.appendChild(meta);
      li.appendChild(btn);
      gridEl.appendChild(li);
    });
    if (statusEl) statusEl.textContent = "Showing " + visible.length + " item" + (visible.length === 1 ? "" : "s");
  }
  render();

  /* ---------- Lightbox ---------- */
  var dialog = document.querySelector("[data-lightbox]");
  var media = dialog.querySelector("[data-lightbox-media]");
  var caption = dialog.querySelector("[data-lightbox-caption]");
  var count = dialog.querySelector("[data-lightbox-count]");
  var active = 0;
  var opener = null;

  function show(i) {
    if (!visible.length) return;
    active = (i + visible.length) % visible.length;
    var item = visible[active];
    media.innerHTML = "";
    if (item.src) {
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = altFor(item);
      media.appendChild(img);
    } else {
      media.appendChild(slot(item));
    }
    caption.innerHTML = "";
    caption.appendChild(el("small", null, labelFor[item.category] || ""));
    caption.appendChild(document.createTextNode(item.caption || ""));
    count.textContent = (active + 1) + " / " + visible.length;
  }
  function open(i, trigger) {
    opener = trigger;
    show(i);
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  }
  function close() {
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
  }

  gridEl.addEventListener("click", function (e) {
    var b = e.target.closest(".g-item__btn");
    if (b) open(Number(b.dataset.index), b);
  });
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", close);
  dialog.querySelector("[data-lightbox-prev]").addEventListener("click", function () { show(active - 1); });
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", function () { show(active + 1); });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) close(); });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(active - 1);
    if (e.key === "ArrowRight") show(active + 1);
  });
  dialog.addEventListener("close", function () { if (opener) opener.focus(); });

  // Swipe between items on phones
  var startX = null;
  media.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  media.addEventListener("touchend", function (e) {
    if (startX == null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(active + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
