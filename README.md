# Register Your Business — website

Static, single-page site (HTML + CSS + vanilla JS). No build step. Upload the folder to any static host (GitHub Pages, Netlify, Vercel, cPanel).

Live: https://digoracle1.github.io/regurbusiness-website/

```
index.html            Page content + SEO meta
css/styles.css        All styling (mobile-first)
js/config.js          WhatsApp number + placeholder-label toggle
js/gallery-data.js    Proof-of-Work gallery items  ← update regularly
js/main.js            WhatsApp links, nav, gallery filters, lightbox
privacy.html          Privacy Policy (NDPA 2023)
terms.html            Terms of Service
refund-policy.html    Refund & Cancellation Policy
images/logo-mark.png    Square RB mark (header/footer, app icon)
images/logo-lockup.png  Full logo lockup, for dark backgrounds
images/logo-full.png    Original supplied logo
images/og-image.jpg     Social share preview (1200x630)
images/gallery/<category>/   Certificate & website screenshots
```

## Brand

Colours are taken from the Register Your Business identity:

| Token | Hex | Use |
|---|---|---|
| `--brand` | `#009C94` | Teal accents, icons, highlights |
| `--brand-btn` | `#007D76` | Button fill (readable with white text) |
| `--brand-light` | `#4FD1C5` | Teal on dark backgrounds |
| `--deep` | `#062E2C` | Dark sections and footer |
| `--ink` | `#09161A` | Headings and body text |
| `--bg` | `#F7FBF9` | Page background |

Typeface: Plus Jakarta Sans.

## Pricing shown on the site

Registration only: Business Name ₦35,000 · Company (Limited) ₦75,000
Registration + compliance: Compliance Stack ₦120,000 · Full Company Launch ₦175,000–₦195,000
Registration + website: Business Name + Website ₦150,000 · Company + Logo + Website ₦250,000
Launch packages: Business Launch Package ₦499,000 · Ultimate Business Launch Package ₦900,000

## Legal pages

`terms.html`, `privacy.html` and `refund-policy.html` are linked from the footer of every page.
They were drafted for a Nigerian business registration service and reflect how this business
actually works (government fees non-refundable, outcomes decided by CAC/NRS/SCUML/the trademarks
registry, WhatsApp as the main channel, branding and websites delivered by Digoracle Solutions).

**They are not legal advice and have not been reviewed by a lawyer.** Before relying on them:

1. Fill in every `[square-bracket]` placeholder: registered entity name, RC/BN number, registered
   address and business email. Search the three files for `EDITABLE` and `[add`.
2. Check the refund percentages, the 2-working-day acknowledgement and the 7–14 working day
   refund window match what you can actually deliver.
3. Have a Nigerian lawyer review all three, especially the liability, refund and governing-law
   clauses.
4. Update the "Last updated" date at the top of each page whenever you change them.

## Still to replace before you advertise

1. **Trust bar stats** (500+, 100%, 20+, Same-day): placeholders in `index.html`.
2. **Testimonials**: sample copy in `index.html`. Replace with real, permission-cleared quotes.
3. When 1 and 2 are done, set `showPlaceholderLabels: false` in `js/config.js` to hide the yellow "placeholder" tags.
4. **Contact & socials**: business email and Facebook/Instagram/TikTok URLs (currently `#`) in the footer.
5. **Domain**: if you connect a custom domain, update `canonical`, `og:url`, `og:image` and the JSON-LD `url` in the `<head>`.
6. **FAQ timelines**: confirm the "How long does registration take?" answer matches your current experience.

WhatsApp is set to **+234 703 961 4337**. To change it, replace `2347039614337` in `index.html` and `js/config.js`, and the displayed number in the footer.

## Adding gallery items

See the instructions at the top of `js/gallery-data.js`. In short: drop the image into
`images/gallery/<category>/`, add one `{ category, src, alt, caption }` entry, and delete one
placeholder slot. Always write descriptive `alt` text. Redact RC/BN numbers, addresses and
signatures, and only name clients who have given permission.

WhatsApp messages for each button are set in the `data-wa="..."` attribute in `index.html`.
