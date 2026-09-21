/* ==========================================================================
   PROOF OF WORK GALLERY — DATA
   --------------------------------------------------------------------------
   HOW TO ADD A NEW ITEM
   1. Save the image into the matching folder, e.g.
        images/gallery/company/cac-2026-09.webp
      (Recommended: .webp or .jpg, ~1200px on the long edge, under 300 KB.
       Blur/redact RC/BN numbers, addresses, signatures and ID details
       unless the client has given written permission to show them.)
   2. Add an object to the list below (newest first):
        {
          category: "company",
          src: "images/gallery/company/cac-2026-09.webp",
          alt: "CAC Certificate of Incorporation for a Lagos-based logistics company, details redacted",
          caption: "Limited company — Lagos · Sep 2026"
        }
   3. Delete a placeholder entry (src: null) from the same category.

   category must be one of:
     business-name | company | scuml | tax | trademark | websites

   Entries with src: null render as clearly-labelled UPLOAD SLOTS.
   CONTENT NOTE: never invent client names, certificate numbers or documents.
   Only use real, permission-cleared images; keep captions anonymised
   (industry + state + month) unless the client agrees to be named.
   ========================================================================== */
window.REGUR_GALLERY_CATEGORIES = [
  { key: "business-name", label: "Business Name Certificates" },
  { key: "company",       label: "Company (CAC) Certificates" },
  { key: "scuml",         label: "SCUML Certificates" },
  { key: "tax",           label: "Tax Certificates (NRS)" },
  { key: "trademark",     label: "Trademark Certificates" },
  { key: "websites",      label: "Websites Delivered" }
];

window.REGUR_GALLERY = [
  // ---- REAL DELIVERED WORK (newest first) ----
  // Client names, registration numbers, tax IDs, addresses, QR codes and the
  // Registrar's signature are blurred. Swap in the un-blurred name version only
  // where the client has given permission.
  { category: "company", src: "images/gallery/company/company-cert-01.jpg",
    alt: "CAC Certificate of Incorporation for a private company limited by shares, issued July 2026, client details blurred",
    caption: "Private company limited by shares · Jul 2026" },
  { category: "company", src: "images/gallery/company/company-cert-02.jpg",
    alt: "CAC Certificate of Incorporation for a private company limited by shares, issued January 2026, client details blurred",
    caption: "Private company limited by shares · Jan 2026" },
  { category: "company", src: "images/gallery/company/company-cert-03.jpg",
    alt: "CAC Certificate of Incorporation for a private company limited by shares, issued October 2025, client details blurred",
    caption: "Private company limited by shares · Oct 2025" },
  { category: "company", src: "images/gallery/company/company-cert-04.jpg",
    alt: "CAC Certificate of Incorporation for a private company limited by shares, issued November 2023, client details blurred",
    caption: "Private company limited by shares · Nov 2023" },
  { category: "business-name", src: "images/gallery/business-name/business-name-cert-01.jpg",
    alt: "CAC Certificate of Registration for a business name in the estate agency sector, issued March 2022, client details blurred",
    caption: "Business name — estate agency · Mar 2022" },

  // ---- PLACEHOLDER UPLOAD SLOTS: replace with real items ----
  { category: "business-name", src: null, alt: "", caption: "Upload slot — Business Name certificate" },
  { category: "scuml",         src: null, alt: "", caption: "Upload slot — SCUML registration certificate" },
  { category: "scuml",         src: null, alt: "", caption: "Upload slot — SCUML registration certificate" },
  { category: "tax",           src: null, alt: "", caption: "Upload slot — NRS Tax ID certificate" },
  { category: "tax",           src: null, alt: "", caption: "Upload slot — NRS Tax ID certificate" },
  { category: "trademark",     src: null, alt: "", caption: "Upload slot — Trademark certificate / acknowledgement" },
  { category: "trademark",     src: null, alt: "", caption: "Upload slot — Trademark certificate / acknowledgement" },
  { category: "websites",      src: null, alt: "", caption: "Upload slot — Website screenshot" },
  { category: "websites",      src: null, alt: "", caption: "Upload slot — Website screenshot" }
];
