# Axentra Tech — Company Website

A modern, SEO-optimized static website for **Axentra Tech** — a software solutions company.

---

## Folder Structure

```
Axentra/
├── index.html          ← Main HTML (all sections)
├── robots.txt          ← SEO: Search engine crawl rules
├── sitemap.xml         ← SEO: Sitemap for Google indexing
├── README.md           ← This file
├── assets/
│   └── logo.png        ← ⚠️ Place the company logo here (PNG, ~512×512)
├── css/
│   └── style.css       ← All styles (dark theme, responsive, animations)
└── js/
    └── main.js         ← All interactivity (nav, slider, forms, etc.)
```

---

## Setup Instructions

### 1. Add the Logo
- Place the Axentra Tech logo file as: `assets/logo.png`
- Recommended size: **512×512 px** or **1:1 ratio**, PNG format with transparent background

### 2. Open in Browser
Simply open `index.html` in any modern browser — no build tools required.

### 3. To Deploy on a Web Host
Upload all files to your hosting provider's `public_html` (or `www`) folder, preserving the folder structure.

---

## Customization Checklist

| Item | Location | Notes |
|------|----------|-------|
| Company logo | `assets/logo.png` | Replace with your logo |
| Phone number | `index.html` — CTA & Contact sections | Update `href="tel:..."` |
| Email address | `index.html` — Contact section | Update `href="mailto:..."` |
| Office address | `index.html` — Contact section | Update address text |
| Social media links | `index.html` — Footer & Team | Replace `href="#"` with real URLs |
| Sitemap domain | `sitemap.xml` | Replace `axentratech.com` with your domain |
| Canonical URL | `index.html` `<head>` | Replace `axentratech.com` with your domain |
| OG image | `index.html` `<head>` | Add a 1200×630 social preview image |
| Google Analytics | `index.html` before `</head>` | Paste your GA4 tag |

---

## SEO Features Built-In

- ✅ Semantic HTML5 structure
- ✅ Full meta tags (title, description, keywords, robots, canonical)
- ✅ Open Graph tags (Facebook / LinkedIn sharing)
- ✅ Twitter Card tags
- ✅ JSON-LD / Schema.org Organization markup
- ✅ `sitemap.xml` with all sections
- ✅ `robots.txt` with sitemap reference
- ✅ Accessible ARIA roles and labels
- ✅ Mobile responsive (all screen sizes)
- ✅ Fast loading (minimal dependencies, CSS animations)
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text on all images

---

## Browser Support
Chrome, Firefox, Safari, Edge — last 2 major versions.

---

## Technology Stack
| Layer | Tech |
|-------|------|
| Markup | HTML5 (Semantic) |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts (Inter, Space Grotesk) |

---

© 2026 Axentra Tech. All rights reserved.
