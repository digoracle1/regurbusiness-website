/* ==========================================================================
   REGISTER YOUR BUSINESS — SITE CONFIG
   Edit the values below. Everything marked EDITABLE is placeholder content.
   ========================================================================== */
window.REGUR_CONFIG = {
  // EDITABLE: WhatsApp number in international format, digits only (no +, spaces or leading 0).
  // Example: 2348012345678. Also find-and-replace 2347039614337 in index.html
  // so links work even before JavaScript loads.
  whatsappNumber: "2347039614337",

  // Message used by generic "Chat on WhatsApp" buttons.
  defaultMessage: "Hi, I'd like to register my business. Can you help?",

  // Set to false once stats and testimonials are replaced with real,
  // verified content. While true, small "placeholder" labels are shown.
  showPlaceholderLabels: true,

  /* ------------------------------------------------------------------
     COOKIE BANNER & TRACKING
     The site sets no tracking cookies by default. The banner only appears
     if at least one ID below is filled in — so leave them empty until you
     actually run ads or analytics, and there is nothing to consent to.

     When an ID is set, the tag loads ONLY after the visitor clicks Accept.
     Decline means nothing loads, and the choice is remembered in the
     visitor's own browser (localStorage), not on a server.
     ------------------------------------------------------------------ */
  tracking: {
    metaPixelId: "",     // Facebook/Instagram ads, e.g. "123456789012345"
    tiktokPixelId: "",   // TikTok ads, e.g. "CABC123DEF456"
    ga4Id: ""            // Google Analytics 4, e.g. "G-XXXXXXXXXX"
  }
};
