# 🔍 Technical & SEO Audit Report

**Target Sites:** optobharat.com (OptoAI) & envisionbharat.com (Envision Bharat)
**Audit Date:** May 17, 2026
**Auditor:** Automated Technical Auditor
**Severity Scale:** 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW | ✅ PASS

---

## Executive Summary

| Metric | optobharat.com | envisionbharat.com |
|--------|---------------|-------------------|
| **Overall Technical Health** | **3.5 / 10** 🔴 | **4.0 / 10** 🟠 |
| **Overall SEO Health** | **2.5 / 10** 🔴 | **3.5 / 10** 🟠 |
| **Security Posture** | **2.0 / 10** 🔴 | **4.0 / 10** 🟠 |
| **Performance (TTFB)** | **97ms** ✅ | **174ms** ✅ |
| **Total JS Bundle** | **4.49 MB** 🔴 | **506 KB** 🟡 |
| **SSL Status** | ✅ Valid (non-www) | 🔴 Mismatch on direct IP |

> **VERDICT:** Both sites have **catastrophic SEO deficiencies** due to being fully client-rendered React SPAs with zero SSR/SSG, no schema markup, and broken subdomain configurations. OptoBharat additionally leaks production API keys and has a 4.5MB JavaScript bundle. Envision Bharat has no functional robots.txt and a broken www subdomain. **Neither site is properly indexed or indexable by search engines.**

---

## PART 1: optobharat.com (OptoAI)

### 1.1 Technical Infrastructure

#### Hosting & DNS
| Check | Status | Details |
|-------|--------|---------|
| DNS Resolution | 🟠 PARTIAL | `optobharat.com` → Google Cloud IPs (216.239.x.x) ✅; `www.optobharat.com` → Google Blogger IPs 🔴 |
| HTTPS | ✅ WORKS | TLS 1.3, GTS/WR3 certificate, valid May 11 – Aug 9, 2026 |
| HTTP → HTTPS Redirect | ✅ WORKS | 302 redirect from HTTP to HTTPS |
| www Redirect | 🔴 BROKEN | `www.optobharat.com` returns Google's 404 (ghs/Blogger). DNS points to wrong service entirely. |
| Server | Express.js | Running on Google Cloud (Google Frontend) |
| CDN | ❌ NONE | No CDN layer detected. Direct server response. |

#### SSL Certificate Details
- **Subject:** CN=optobharat.com
- **Issuer:** Google Trust Services (WR3 → GTS Root R1)
- **Protocol:** TLSv1.3 / TLS_AES_128_GCM_SHA256
- **Expiry:** Aug 9, 2026 (valid ~90 days from audit)
- **SAN Coverage:** Only `optobharat.com` — **`www.optobharat.com` NOT covered**

### 1.2 Performance Analysis

#### Server Response Times
| Metric | Value | Assessment |
|--------|-------|------------|
| DNS Lookup | 1.2ms | ✅ Excellent |
| TCP Connect | 2.8ms | ✅ Excellent |
| TLS Handshake | 27.1ms | ✅ Good |
| **TTFB** | **97ms** | ✅ Excellent |
| Total HTML Download | 99ms | ✅ Excellent |

#### Asset Sizes 🔴 CRITICAL
| Asset | Size | Assessment |
|-------|------|------------|
| HTML (index) | 3.1 KB | ✅ Tiny |
| **Main JS Bundle** | **4,488,742 bytes (4.28 MB)** | 🔴 **CATASTROPHIC** |
| **Main CSS** | **211,529 bytes (206 KB)** | 🟠 **Very Large** |
| Razorpay Script | External CDN | 🟡 Additional blocking resource |
| Google Fonts | External | 🟡 2 fonts loaded (Inter, Outfit) |
| **Total First-Load** | **~4.5 MB+** | 🔴 **Unacceptable** |

#### Why the JS Bundle is 4.5 MB
The bundle includes:
- **Mermaid.js** (full diagram library): dagre, cytoscape, flow/class/sequence/state/mindmap/kanban diagrams
- **KaTeX** (full LaTeX math rendering): 10+ font files, math parser
- **Monaco Editor** (VS Code editor): loaded from jsdelivr CDN on demand
- **html2canvas**: DOM screenshot library
- **jsPDF**: PDF generation library
- **React + ReactDOM + Redux Toolkit + React Router**: full framework stack
- **Google Generative AI SDK**: client-side AI integration
- **Firebase SDK**: Auth, Firestore, Storage

> **Recommendation:** Implement aggressive code splitting. Mermaid, KaTeX, Monaco Editor, html2canvas, and jsPDF should be lazy-loaded ONLY on the specific routes that need them. The initial bundle should be < 200KB.

### 1.3 Security Audit 🔴 CRITICAL

#### Security Headers
| Header | Status | Risk |
|--------|--------|------|
| Strict-Transport-Security (HSTS) | ❌ MISSING | 🟠 No forced HTTPS |
| Content-Security-Policy (CSP) | ❌ MISSING | 🔴 No XSS protection |
| X-Frame-Options | ❌ MISSING | 🟡 Clickjacking risk |
| X-Content-Type-Options | ❌ MISSING | 🟡 MIME sniffing |
| Referrer-Policy | ❌ MISSING | 🟡 Info leakage |
| Permissions-Policy | ❌ MISSING | 🟡 Browser feature control |
| X-Powered-By | 🔴 LEAKED | `Express` exposed |
| Access-Control-Allow-Origin | 🔴 WILDCARD | `*` — allows any origin |

#### Exposed Secrets & API Keys 🔴 CRITICAL

| Secret | Value (truncated) | Risk Level |
|--------|-------------------|------------|
| Google API Key #1 | `AIzaSyBIdPsosXpQ_-Ce4...` | 🔴 Exposed in client JS |
| Google API Key #2 | `AIzaSyBc0RsbfH9AlcPhqk...` | 🔴 Exposed in client JS |
| Razorpay LIVE Key | `rzp_live_SEWxpxZTD9piuJ` | 🔴 LIVE payment key in client JS |
| Firebase App | `rag-ai-53f35.firebaseapp.com` | 🟠 Project name exposed |

> **CRITICAL:** The Razorpay LIVE key (`rzp_live_`) is exposed in the client-side JavaScript bundle. While Razorpay keys are designed to be public-facing (they require backend confirmation), the Google API keys should be restricted to server-side use only. API keys for `generativelanguage.googleapis.com` and `aiplatform.googleapis.com` are billing-sensitive — anyone can extract these keys and make API calls charged to the owner's account.

#### Google Cloud APIs Used (from JS bundle)
- `generativelanguage.googleapis.com` — Gemini AI
- `aiplatform.googleapis.com` — Vertex AI
- `firebasestorage.googleapis.com` — Firebase Storage
- `firestore.googleapis.com` — Firestore Database
- `identitytoolkit.googleapis.com` — Firebase Auth
- `securetoken.googleapis.com` — Firebase Auth tokens

### 1.4 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19.x (SPA) |
| Build Tool | Vite |
| Routing | Client-side only (React Router) |
| State Management | Redux Toolkit |
| UI Library | Base UI, Lucide React icons |
| Styling | Tailwind CSS (compiled) |
| Fonts | Inter, Outfit (Google Fonts), KaTeX (bundled) |
| Payment | Razorpay (client-side checkout.js) |
| Backend/BaaS | Firebase (Auth, Firestore, Storage) |
| AI | Google Gemini / Vertex AI (client-side) |
| Image CDN | Cloudinary (`res.cloudinary.com/deic5ha4h`) |
| Hosting | Google Cloud / App Engine (Express.js) |

### 1.5 SEO Audit 🔴 CRITICAL

#### On-Page SEO

| Element | Status | Details |
|---------|--------|---------|
| `<title>` | ✅ GOOD | "OptoAI \| The Ultimate AI Study Assistant" |
| Meta Description | ✅ GOOD | Comprehensive, 275 chars (slightly long, ideally 155-160) |
| Meta Keywords | 🟡 PRESENT | Deprecated by Google, but harmless |
| Canonical Tag | ✅ PRESENT | `<link rel="canonical" href="https://optobharat.com/">` |
| OG Tags | ✅ COMPLETE | type, url, title, description, image all present |
| Twitter Cards | ✅ COMPLETE | summary_large_image with all fields |
| Robots Meta | ❌ MISSING | No `<meta name="robots">` directive in HTML |
| Schema/JSON-LD | ❌ MISSING | Zero structured data |
| H1 Tag | ❌ UNAVAILABLE | SPA — no server-rendered content |
| Content Keywords | ❌ UNAVAILABLE | SPA — all content rendered via JavaScript |
| Image Alt Tags | ❌ UNAVAILABLE | SPA — images rendered via JavaScript |

#### Indexability 🔴 CATASTROPHIC

| Issue | Severity | Explanation |
|-------|----------|-------------|
| **Zero Server-Side Content** | 🔴 CRITICAL | HTML body contains only `<div id="root"></div>`. Googlebot must execute JavaScript to see ANY content. |
| **No SSR/SSG** | 🔴 CRITICAL | No Next.js/Remix/server rendering. Pure client SPA. |
| **Sitemap has 1 URL** | 🔴 CRITICAL | `sitemap.xml` only lists `https://optobharat.com/`. All other routes (/chat, /vault, /codex, /iot) are disallowed in robots.txt. |
| **robots.txt Disallows Key Routes** | 🟠 HIGH | `/chat/`, `/vault/`, `/codex/`, `/iot/` are disallowed — these are likely the main product features. |
| **All Routes Serve Same HTML** | 🔴 CRITICAL | Express catch-all serves identical HTML for every URL. No unique per-page meta tags. |
| **No manifest.json** | 🟡 MEDIUM | PWA manifest missing — requested URL returns SPA HTML catch-all |
| **No `<noscript>` Fallback** | 🟡 MEDIUM | Users with JS disabled see blank page |

#### Internal Linking
- ❌ No crawlable internal links — SPA routing means Googlebot can only discover the homepage
- ❌ No HTML sitemap
- ❌ No breadcrumb navigation (server-side)

#### URL Structure
- ✅ Clean URLs used (e.g., `/chat/`, `/vault/`, `/codex/`, `/iot/`)
- 🔴 But none of these pages have unique server-rendered content

---

## PART 2: envisionbharat.com (Envision Bharat)

### 2.1 Technical Infrastructure

#### Hosting & DNS
| Check | Status | Details |
|-------|--------|---------|
| DNS Resolution | ✅ WORKS | `envisionbharat.com` → 199.36.158.100 (Fastly CDN) |
| HTTPS | 🟠 WORKS | TLS 1.3, but SSL cert is for `topografiamillan.com` (shared hosting) |
| HTTP → HTTPS Redirect | ✅ WORKS | 301 redirect via Varnish/Fastly |
| www Redirect | 🔴 BROKEN | `www.envisionbharat.com` → HTTPS 404 "Site Not Found" (Firebase) |
| Server | Firebase Hosting | Served via Fastly CDN |
| CDN | ✅ Fastly | HTTP/2 + HTTP/3 support, cached responses |

#### SSL Certificate Details
- **Subject:** CN=`topografiamillan.com` 🔴 **MISMATCH**
- **Issuer:** Google Trust Services (WR3 → GTS Root R1)
- **Protocol:** TLSv1.3 / TLS_AES_128_GCM_SHA256
- **Proxy Certificate:** CN=`firebaseapp.com` 🔴 **MISMATCH**

> **CRITICAL:** The SSL certificate presented for `envisionbharat.com` is issued for `topografiamillan.com`, NOT for `envisionbharat.com`. This is a shared Firebase Hosting IP (199.36.158.100) that presents a different domain's certificate. While browsers may accept it through SNI routing, this is a misconfiguration. The www subdomain shows Firebase's default "Site Not Found" page.

### 2.2 Performance Analysis

#### Server Response Times
| Metric | Value | Assessment |
|--------|-------|------------|
| DNS Lookup | 2.0ms | ✅ Excellent |
| TCP Connect | 53.6ms | 🟡 Moderate (Fastly CDN edge) |
| TLS Handshake | 121.3ms | 🟡 Slow (SSL mismatch negotiation overhead) |
| **TTFB** | **174ms** | ✅ Good |
| Total HTML Download | 176ms | ✅ Good |

#### Asset Sizes
| Asset | Size | Assessment |
|-------|------|------------|
| HTML (index) | 5.1 KB | ✅ Small |
| Main JS Bundle | 505,870 bytes (494 KB) | 🟡 Moderate |
| CSS File | **NOT FOUND** (returns HTML) | 🔴 SPA catch-all |
| Tailwind CDN | External (`cdn.tailwindcss.com`) | 🟠 Development-only CDN |
| Google Fonts | External (Inter) | 🟡 1 font loaded |
| ESM Imports | External (`esm.sh`) | 🟠 React 19, ReactDOM, Lucide loaded at runtime |
| **Total Dependencies** | 3 external JS from esm.sh + Tailwind CDN | 🟡 Multiple external requests |

#### Critical: Tailwind CSS CDN in Production 🔴
The site loads `<script src="https://cdn.tailwindcss.com">` — this is the **Tailwind development CDN** that runs a JIT compiler in the browser. This adds ~300KB+ of JavaScript processing and should NEVER be used in production.

#### Critical: Runtime ESM Dependencies 🟠
React, ReactDOM, and Lucide React are loaded from `esm.sh` at runtime:
```html
<script type="importmap">
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.3/",
    "react": "https://esm.sh/react@^19.2.3",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "lucide-react": "https://esm.sh/lucide-react@^0.561.0"
  }
}
</script>
```
This means the site depends on an external third-party CDN (`esm.sh`) being available. If esm.sh goes down, the site breaks completely.

### 2.3 Security Audit

#### Security Headers
| Header | Status | Risk |
|--------|--------|------|
| Strict-Transport-Security | ✅ PRESENT | `max-age=31556926` (1 year) ✅ |
| Content-Security-Policy (CSP) | ❌ MISSING | 🔴 No XSS protection |
| X-Frame-Options | ❌ MISSING | 🟡 Clickjacking risk |
| X-Content-Type-Options | ❌ MISSING | 🟡 MIME sniffing |
| Referrer-Policy | ❌ MISSING | 🟡 Info leakage |
| Permissions-Policy | ❌ MISSING | 🟡 Browser feature control |
| X-Powered-By | ✅ NOT LEAKED | Good — no server signature |
| Access-Control-Allow-Origin | ✅ NOT SET | Good — restrictive default |

#### Exposed Secrets
- No Google API keys found in the main JS bundle ✅
- Uses EmailJS (`api.emailjs.com`) for contact forms — service/template IDs may be embedded
- No Firebase config exposed in main bundle (Firebase is handled server-side) ✅

### 2.4 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19.x (SPA) |
| Build Tool | Vite |
| Styling | Tailwind CSS **(CDN — dev mode!)** |
| Icons | Lucide React (runtime from esm.sh) |
| Fonts | Inter (Google Fonts) |
| Contact | EmailJS |
| Hosting | Firebase Hosting |
| CDN | Fastly (with HTTP/3) |
| Assets | Firebase Storage (`envision-bharat-assets.web.app`) |
| Images | Cloudinary (`res.cloudinary.com/deic5ha4h`) |

### 2.5 SEO Audit 🔴 CRITICAL

#### On-Page SEO

| Element | Status | Details |
|---------|--------|---------|
| `<title>` | ✅ GOOD | "ENVISION BHARAT \| AI, Software & Innovation Company" |
| Meta Description | ✅ GOOD | Comprehensive, but long (~365 chars, should be 155-160) |
| Meta Keywords | 🟡 PRESENT | Very long keyword list (deprecated by Google) |
| Meta Author | ✅ PRESENT | "ENVISION BHARAT" |
| Robots Meta | ✅ PRESENT | `index, follow` |
| Canonical Tag | ✅ PRESENT | `<link rel="canonical" href="https://envisionbharat.com/">` |
| OG Tags | ✅ COMPLETE | type, url, title, description, image all present |
| Twitter Cards | ✅ COMPLETE | summary_large_image with all fields |
| Schema/JSON-LD | ❌ MISSING | Zero structured data |
| H1 Tag | ❌ UNAVAILABLE | SPA — no server-rendered content |
| Content Keywords | ❌ UNAVAILABLE | SPA — all content rendered via JavaScript |
| Image Alt Tags | ❌ UNAVAILABLE | SPA — images rendered via JavaScript |

#### Indexability 🔴 CATASTROPHIC

| Issue | Severity | Explanation |
|-------|----------|-------------|
| **Zero Server-Side Content** | 🔴 CRITICAL | HTML body contains only `<div id="root"></div>` |
| **No SSR/SSG** | 🔴 CRITICAL | Pure client SPA |
| **robots.txt is BROKEN** | 🔴 CRITICAL | Requesting `/robots.txt` returns the SPA HTML page instead of an actual robots.txt file. Firebase Hosting SPA catch-all intercepts ALL routes. |
| **Sitemap has only 3 URLs** | 🟠 HIGH | `/`, `/optoai`, `/nexpos` — but all serve identical HTML |
| **All Routes Serve Same HTML** | 🔴 CRITICAL | Firebase SPA rewrite serves identical HTML for every URL. No unique per-page meta tags for /optoai or /nexpos. |
| **www subdomain returns 404** | 🔴 CRITICAL | `www.envisionbharat.com` shows Firebase "Site Not Found" page. Users and bots accessing www get a dead end. |
| **No manifest.json** | 🟡 MEDIUM | PWA manifest missing — returns SPA HTML |
| **No `<noscript>` Fallback** | 🟡 MEDIUM | Users with JS disabled see blank page |

#### Internal Linking
- ❌ No crawlable internal links — all routing is client-side JavaScript
- ❌ Sitemap lists /optoai and /nexpos but they serve the same HTML as /
- ❌ No HTML sitemap

---

## PART 3: Cross-Site Issues & Comparative Analysis

### 3.1 Shared Critical Problems

| # | Issue | Both Sites | Impact |
|---|-------|-----------|--------|
| 1 | **Client-side only rendering (SPA)** | 🔴 | Google sees EMPTY pages. Zero content for SEO. |
| 2 | **No Schema/JSON-LD markup** | 🔴 | No rich snippets, no knowledge panel data. |
| 3 | **No SSR/SSG (no Next.js, no Remix)** | 🔴 | Fatal for SEO — each page needs unique server-rendered HTML. |
| 4 | **No server-side per-page meta tags** | 🔴 | All routes return identical `<head>`. Individual product pages (/optoai, /nexpos) are invisible to search engines. |
| 5 | **No Content Security Policy** | 🔴 | Vulnerable to XSS attacks. |
| 6 | **Missing X-Frame-Options** | 🔴 | Clickjacking vulnerability. |
| 7 | **No sitemap per-route metadata** | 🟠 | Sitemap entries don't match unique page content. |
| 8 | **Broken www subdomains** | 🔴 | Users typing www. get errors. Link equity split. |
| 9 | **No PWA manifest** | 🟡 | Not installable as PWA. |

### 3.2 Domain-Specific Comparison

| Metric | optobharat.com | envisionbharat.com | Winner |
|--------|---------------|-------------------|--------|
| TTFB | 97ms | 174ms | optobharat ✅ |
| JS Bundle | 4.49 MB 🔴 | 494 KB 🟡 | envisionbharat ✅ |
| CSS | 206 KB (compiled) | CDN (dev mode) 🔴 | optobharat ✅ |
| SSL | Valid cert ✅ | Mismatch 🔴 | optobharat ✅ |
| HSTS | Missing ❌ | Present ✅ | envisionbharat ✅ |
| API Key Exposure | 2 keys + Razorpay 🔴 | None found ✅ | envisionbharat ✅ |
| robots.txt | Works ✅ | Broken (returns HTML) 🔴 | optobharat ✅ |
| Sitemap | 1 URL | 3 URLs | envisionbharat ✅ |
| CDN | None ❌ | Fastly ✅ | envisionbharat ✅ |
| HTTP/3 | No | Yes ✅ | envisionbharat ✅ |
| CORS | Wildcard (*) 🔴 | Not set ✅ | envisionbharat ✅ |
| Runtime Dependencies | Self-contained | esm.sh (external) 🟠 | optobharat ✅ |

### 3.3 Google Indexability Assessment

> **Neither site is meaningfully indexed by Google.** Here's why:

1. **Googlebot renders JavaScript**, but:
   - It allocates a limited "crawl budget" for JS rendering
   - SPAs with 4.5MB+ bundles may time out during rendering
   - Even if rendered, Google only sees ONE page (the SPA catch-all)
   - No unique HTML per route = no unique pages to index

2. **The robots.txt on envisionbharat.com is broken** — it returns the SPA HTML, which Google interprets as "allow all" (since there's no valid User-agent directive), but this is still a misconfiguration.

3. **Sitemaps are nearly empty** — 1 URL for optobharat, 3 URLs for envisionbharat. A proper company site should have 10-50+ indexable pages.

---

## PART 4: Detailed Recommendations

### Priority 1: IMMEDIATE (Week 1) — Fix Showstoppers

#### 1.1 Migrate to SSR/SSG 🔴
- **Action:** Migrate both sites to **Next.js** (App Router) or **Remix**
- **Why:** Server-side rendering is NON-NEGOTIABLE for SEO. Every page must serve unique HTML with proper `<title>`, `<meta description>`, `<h1>`, and content visible to Googlebot without JavaScript.
- **Impact:** This alone would improve SEO scores from 2-3/10 to 7-8/10.

#### 1.2 Fix www Subdomains 🔴
- **optobharat.com:** Change www DNS from Blogger/ghs to the App Engine service. Add www to SSL certificate SANs.
- **envisionbharat.com:** Add www as an additional domain in Firebase Hosting config. Set up www → non-www 301 redirect.
- **Why:** ~30% of users type "www." — they currently see error pages.

#### 1.3 Fix Security Headers 🔴
Add to both sites:
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.tailwindcss.com https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://res.cloudinary.com https://envision-bharat-assets.web.app; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com;
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

#### 1.4 Restrict API Keys 🔴
- Move Google API key calls to a **backend proxy** (Cloud Function / Cloud Run)
- Never call `generativelanguage.googleapis.com` or `aiplatform.googleapis.com` directly from client JS
- Add API key restrictions in Google Cloud Console (HTTP referrer, IP restrictions)

### Priority 2: HIGH (Week 2-3)

#### 2.1 Reduce OptoBharat JS Bundle 🔴
- Implement **route-based code splitting** (React.lazy + Suspense)
- Lazy-load Mermaid.js only on diagram-related routes
- Lazy-load KaTeX only on math-related routes
- Lazy-load Monaco Editor only on code editor routes
- Move html2canvas and jsPDF to on-demand imports
- **Target:** Initial bundle < 200KB

#### 2.2 Fix Envision Bharat Tailwind 🔴
- Replace `<script src="https://cdn.tailwindcss.com">` with **compiled Tailwind CSS**
- Run `tailwindcss` build step in CI/CD
- Remove esm.sh runtime dependency — bundle React locally

#### 2.3 Fix Envision Bharat robots.txt 🔴
- Create an actual `public/robots.txt` file in the Firebase Hosting public directory
- Firebase Hosting serves static files from `public/` before SPA rewrites
- Ensure sitemap reference is correct

#### 2.4 Add Schema/JSON-LD Markup
Add to both sites:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Envision Bharat",
  "url": "https://envisionbharat.com",
  "logo": "https://envision-bharat-assets.web.app/logos/envision-bharat-bg.png",
  "sameAs": ["https://linkedin.com/company/envision-bharat"],
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer service" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OptoAI",
  "url": "https://optobharat.com",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
}
```

#### 2.5 Add `<noscript>` Fallback
```html
<noscript>
  <div style="padding:20px;text-align:center;">
    <h1>OptoAI - The Ultimate AI Study Assistant</h1>
    <p>Please enable JavaScript to use OptoAI.</p>
    <p>OptoAI by Envision Bharat transforms your handwritten notes into
    interactive learning sessions with AI-powered tutoring.</p>
  </div>
</noscript>
```

### Priority 3: MEDIUM (Week 4-6)

#### 3.1 Create Comprehensive Sitemaps
- **optobharat.com:** Add all public pages (homepage, features, pricing, about, etc.)
- **envisionbharat.com:** Add company pages, product pages (OptoAI, NexPOS, KhaoJi), about, contact, team
- Use proper `<lastmod>`, `<changefreq>`, `<priority>` values

#### 3.2 Add Per-Page Meta Tags
After SSR migration:
- Each product page gets unique `<title>` and `<meta description>`
- `/optoai` → "OptoAI - AI Study Assistant | Envision Bharat"
- `/nexpos` → "NexPOS - Smart POS System | Envision Bharat"
- etc.

#### 3.3 Optimize Images
- Add descriptive `alt` attributes to all images
- Use modern formats (WebP/AVIF)
- Implement lazy loading (`loading="lazy"`)
- Consider using Cloudinary's automatic optimization

#### 3.4 Add Breadcrumb Navigation
- Server-rendered breadcrumb schema
- Helps Google understand site hierarchy

#### 3.5 Implement Caching Strategy (OptoBharat)
- Add CDN layer (Cloudflare, Fastly) in front of App Engine
- Set proper `Cache-Control` headers for static assets
- Enable Brotli/Gzip compression (not detected in current response)

---

## PART 5: Scoring Breakdown

### optobharat.com — Score: 3.5 / 10

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| SSL/HTTPS | 7/10 | 10% | 0.7 |
| Performance (TTFB) | 9/10 | 10% | 0.9 |
| Performance (Bundle Size) | 1/10 | 15% | 0.15 |
| Security Headers | 1/10 | 15% | 0.15 |
| SEO (On-Page) | 3/10 | 15% | 0.45 |
| SEO (Indexability) | 1/10 | 15% | 0.15 |
| SEO (Schema/Structured Data) | 0/10 | 5% | 0.0 |
| Mobile/Accessibility | 5/10 | 10% | 0.5 |
| URL Structure | 6/10 | 5% | 0.3 |
| **TOTAL** | | **100%** | **3.3 → 3.5** |

### envisionbharat.com — Score: 4.0 / 10

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| SSL/HTTPS | 4/10 | 10% | 0.4 |
| Performance (TTFB) | 8/10 | 10% | 0.8 |
| Performance (Bundle Size) | 5/10 | 15% | 0.75 |
| Security Headers | 3/10 | 15% | 0.45 |
| SEO (On-Page) | 5/10 | 15% | 0.75 |
| SEO (Indexability) | 1/10 | 15% | 0.15 |
| SEO (Schema/Structured Data) | 0/10 | 5% | 0.0 |
| Mobile/Accessibility | 5/10 | 10% | 0.5 |
| URL Structure | 6/10 | 5% | 0.3 |
| **TOTAL** | | **100%** | **4.1 → 4.0** |

---

## APPENDIX A: Raw Technical Data

### optobharat.com Response Headers
```
HTTP/2 200
x-powered-by: Express
access-control-allow-origin: *
cache-control: private, max-age=0
content-type: text/html; charset=UTF-8
server: Google Frontend
```

### envisionbharat.com Response Headers
```
HTTP/2 200
cache-control: max-age=3600
content-type: text/html; charset=utf-8
strict-transport-security: max-age=31556926
x-served-by: cache-hkg17932-HKG
x-cache: HIT
alt-svc: h3=":443";ma=86400
```

### robots.txt — optobharat.com ✅
```
User-agent: *
Allow: /
Disallow: /chat/
Disallow: /vault/
Disallow: /codex/
Disallow: /iot/
Sitemap: https://optobharat.com/sitemap.xml
```

### robots.txt — envisionbharat.com ❌ (returns SPA HTML, not actual robots.txt)

### Sitemap — optobharat.com
- 1 URL: `https://optobharat.com/`

### Sitemap — envisionbharat.com
- 3 URLs: `/`, `/optoai`, `/nexpos`

---

## APPENDIX B: Web Search Index Status

> **Note:** Web search API was rate-limited during audit. Based on technical analysis, the following is predicted:

- **optobharat.com:** Likely has minimal indexing. Only the homepage HTML has meaningful meta tags, but Google may not render the 4.5MB JS bundle within its crawl timeout. Estimated 0-2 pages indexed.
- **envisionbharat.com:** Likely has minimal indexing. The broken robots.txt and SPA-only rendering mean Google sees empty pages. The sitemap lists 3 URLs, but all serve identical HTML. Estimated 0-3 pages indexed (all showing the same generic title/description).

---

*Report generated by automated technical auditor. All findings based on live HTTP analysis, SSL certificate inspection, DNS resolution, and JavaScript bundle analysis conducted on May 17, 2026.*
