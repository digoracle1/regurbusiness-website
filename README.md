# Regurbusiness website

Static, single-page site (HTML + CSS + vanilla JS). No build step. Upload the whole folder to any static host (Netlify, Vercel, cPanel, GitHub Pages).

```
index.html            Page content + SEO meta
css/styles.css        All styling (mobile-first)
js/config.js          WhatsApp number + placeholder-label toggle
js/gallery-data.js    Proof-of-Work gallery items  ← update regularly
js/main.js            WhatsApp links, nav, gallery filters, lightbox
images/gallery/<category>/   Put certificate & website screenshots here
```

## Before going live: checklist

1. **WhatsApp number**: find and replace `234XXXXXXXXXX` in `index.html` **and** `js/config.js` (digits only, e.g. `2348012345678`).
   Also update the display number `+234 XXX XXX XXXX` in the footer.
2. **Trust bar stats** (500+, 100%, 20+, Same-day): placeholders. Replace them with verified figures in `index.html`.
3. **Testimonials**: sample copy. Replace them with real, permission-cleared quotes.
4. When steps 2 and 3 are done, set `showPlaceholderLabels: false` in `js/config.js` to hide the yellow "placeholder" tags.
5. **Contact & socials**: email address, Facebook/Instagram/TikTok URLs (currently `#`) in the footer.
6. **Domain**: update `canonical`, `og:url`, `og:image` and JSON-LD `url` in the `<head>`. Add `images/og-image.jpg` (1200×630).
7. **FAQ timelines**: confirm the "How long does registration take?" answer matches your current experience.

## Adding gallery items

See the instructions at the top of `js/gallery-data.js`. In short: drop the image into
`images/gallery/<category>/`, add one `{ category, src, alt, caption }` entry, and delete one
placeholder slot. Always write descriptive `alt` text. Redact RC/BN numbers, addresses and
signatures, and only name clients who have given permission.

WhatsApp messages for each button are set in the `data-wa="..."` attribute in `index.html`.
