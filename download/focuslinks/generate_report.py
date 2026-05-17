#!/usr/bin/env python3
"""
FOCUSLINKS.IN STRATEGIC INTELLIGENCE REPORT
Master PDF Generator - FOCUSLINKS INTELLIGENCE
Brutal Swarm Analysis - May 2026
"""
import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

ACCENT = colors.HexColor('#1f7692')
TEXT_PRIMARY = colors.HexColor('#1b1a18')
TEXT_MUTED = colors.HexColor('#7a766f')
BG_SURFACE = colors.HexColor('#e5e3df')
DANGER_RED = colors.HexColor('#c0392b')
WARNING_AMBER = colors.HexColor('#d4a017')
SUCCESS_GREEN = colors.HexColor('#27ae60')
TH = ACCENT; TW = colors.white; TE = colors.white; TO = BG_SURFACE

pdfmetrics.registerFont(TTFont('TNR','/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('TNRB','/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Cal','/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('CalB','/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))
registerFontFamily('TNR',normal='TNR',bold='TNRB')
registerFontFamily('Cal',normal='Cal',bold='CalB')

W,H = A4; LM=0.9*inch; RM=0.9*inch; TM=0.8*inch; BM=0.8*inch; AW=W-LM-RM
OUTPUT='/home/z/my-project/download/focuslinks/FOCUSLINKS_MASTER_REPORT.pdf'

sH1=ParagraphStyle('H1',fontName='TNR',fontSize=22,leading=28,textColor=ACCENT,spaceBefore=18,spaceAfter=10)
sH2=ParagraphStyle('H2',fontName='TNR',fontSize=16,leading=22,textColor=TEXT_PRIMARY,spaceBefore=14,spaceAfter=8)
sH3=ParagraphStyle('H3',fontName='TNR',fontSize=13,leading=18,textColor=TEXT_PRIMARY,spaceBefore=10,spaceAfter=6)
sB=ParagraphStyle('B',fontName='TNR',fontSize=10.5,leading=17,textColor=TEXT_PRIMARY,spaceAfter=6,alignment=TA_JUSTIFY)
sBL=ParagraphStyle('BL',fontName='TNR',fontSize=10.5,leading=17,textColor=TEXT_PRIMARY,spaceAfter=6,alignment=TA_LEFT)
sSc=ParagraphStyle('Sc',fontName='TNR',fontSize=11,leading=16,textColor=TEXT_PRIMARY,alignment=TA_CENTER)
sC=ParagraphStyle('C',fontName='TNR',fontSize=10,leading=15,textColor=TEXT_PRIMARY,alignment=TA_LEFT)
sCC=ParagraphStyle('CC',fontName='TNR',fontSize=10,leading=15,textColor=TEXT_PRIMARY,alignment=TA_CENTER)
sH=ParagraphStyle('H',fontName='TNR',fontSize=10,leading=15,textColor=colors.white,alignment=TA_CENTER)
sCap=ParagraphStyle('Cap',fontName='TNR',fontSize=9,leading=13,textColor=TEXT_MUTED,alignment=TA_CENTER,spaceBefore=3,spaceAfter=6)
sRed=ParagraphStyle('Red',fontName='TNR',fontSize=10.5,leading=17,textColor=DANGER_RED,spaceAfter=4,alignment=TA_LEFT)

class TocDoc(SimpleDocTemplate):
    def afterFlowable(self,f):
        if hasattr(f,'bookmark_name'):
            self.notify('TOCEntry',(getattr(f,'bookmark_level',0),getattr(f,'bookmark_text',''),self.page,getattr(f,'bookmark_key','')))

def heading(text,style,level=0):
    k='h_%s'%hashlib.md5(text.encode()).hexdigest()[:8]
    p=Paragraph('<a name="%s"/><b>%s</b>'%(k,text),style)
    p.bookmark_name=text;p.bookmark_level=level;p.bookmark_text=text;p.bookmark_key=k
    return p

def sb(score):
    c='#c0392b' if score<=3 else '#d4a017' if score<=5 else '#2f97b9' if score<=7 else '#27ae60'
    return Paragraph('<font color="%s"><b>%s/10</b></font>'%(c,str(score)),sSc)

def mt(headers,rows,cr=None):
    hd=[Paragraph('<b>%s</b>'%h,sH) for h in headers]
    data=[hd]
    for r in rows: data.append([Paragraph(str(c),sC) for c in r])
    cw=[r*AW for r in cr] if cr else [AW/len(headers)]*len(headers)
    t=Table(data,colWidths=cw,hAlign='CENTER')
    sc=[('BACKGROUND',(0,0),(-1,0),TH),('TEXTCOLOR',(0,0),(-1,0),TW),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),8),
        ('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),6),
        ('BOTTOMPADDING',(0,0),(-1,-1),6),('GRID',(0,0),(-1,-1),0.5,TEXT_MUTED)]
    for i in range(1,len(data)):
        sc.append(('BACKGROUND',(0,i),(-1,i),TE if i%2==1 else TO))
    t.setStyle(TableStyle(sc)); return t

doc=TocDoc(OUTPUT,pagesize=A4,leftMargin=LM,rightMargin=RM,topMargin=TM,bottomMargin=BM)
story=[]

toc=TableOfContents()
toc.levelStyles=[ParagraphStyle('T1',fontSize=13,leftIndent=20,fontName='TNR',spaceBefore=6,spaceAfter=3),
    ParagraphStyle('T2',fontSize=11,leftIndent=40,fontName='TNR',spaceBefore=2,spaceAfter=2)]
story.append(Paragraph('<b>TABLE OF CONTENTS</b>',ParagraphStyle('TT',fontName='TNR',fontSize=20,leading=28,textColor=ACCENT,alignment=TA_CENTER,spaceAfter=18)))
story.append(toc); story.append(PageBreak())

# ═══════════════════════════════════════════════════════
# SECTION 1: EXECUTIVE SUMMARY
# ═══════════════════════════════════════════════════════
story.append(heading('1. Executive Summary',sH1,0))
story.append(Paragraph('This report presents a comprehensive strategic intelligence analysis of FocusLinks (focuslinks.in), '
    'a professional networking and community platform for optometrists founded in 2025 by Janarthan Veeramani. '
    'The analysis was conducted using a swarm-based methodology deploying nine parallel intelligence agents, each '
    'responsible for a specialized domain of investigation including web scraping, social media intelligence, '
    'competitive landscape mapping, SWOT analysis, marketing audit, technical/SEO audit, content/UX critique, '
    'and revenue/business model analysis. All findings are based on publicly available data collected in May 2026.',sB))
story.append(Paragraph('FocusLinks positions itself as the "World\'s First Global Platform for Optometrists," offering '
    'a feature set that includes a professional directory, community feed, AI-powered clinical tools (Labs), '
    'academy and webinars, a case forum, career center, and interactive world map. The platform is built on a '
    'modern technology stack (Next.js + TypeScript + Tailwind CSS) and hosted on Netlify. While the visual design '
    'is polished and the feature architecture is ambitious, the analysis reveals critical deployment oversights, '
    'catastrophic SEO misconfigurations, zero monetization strategy, and a user base that remains in early-alpha '
    'stages despite public launch claims. The platform also operates a sister product called Focus-IN, which provides '
    'AI-powered optometry learning tools.',sB))
story.append(Paragraph('The most critical findings include: OG image and canonical URLs pointing to localhost:3000 in '
    'production, which breaks every social media share; the focuslinks.com domain being dead/unregistered while the '
    'canonical tag references it; zero analytics tracking installed; zero email infrastructure; three of four social '
    'media links being dead placeholders; and the actual user base numbering only 189 total signups with 27 complete '
    'profiles, despite claiming global reach across 16+ countries. These are not minor issues; they represent fundamental '
    'deployment negligence that actively sabotages the platform\'s discoverability, credibility, and growth.',sB))
story.append(Spacer(1,12))

# Score table
sd=[['SWOT Analysis','2.8','Beautiful shell, zero substance, 9 GitHub commits'],
    ['Marketing Audit','3.2','No GTM strategy, broken social links, no monetization'],
    ['Technical / SEO','4.0','Modern stack, but localhost URLs and no SSR in production'],
    ['Content / UX','3.5','Loading spinners, fabricated testimonials, 0 real images'],
    ['Revenue Model','2.0','$0 revenue, no pricing, no business model, student project'],
    ['Social Media','4.0','Strong Instagram/LinkedIn, missing Twitter/Facebook/Discord'],
    ['Competitive Position','3.5','Unique niche, but LinkedIn and OPTOGLOBE dominate']]
hdr=[Paragraph('<b>Domain</b>',sH),Paragraph('<b>Score</b>',sH),Paragraph('<b>Key Verdict</b>',sH)]
td=[hdr]
for r in sd:
    sc2=float(r[1]); c='#c0392b' if sc2<=3 else '#d4a017' if sc2<=5 else '#27ae60'
    td.append([Paragraph(r[0],sC),Paragraph('<font color="%s"><b>%s/10</b></font>'%(c,r[1]),sCC),Paragraph(r[2],sC)])
t=Table(td,colWidths=[AW*0.25,AW*0.12,AW*0.63],hAlign='CENTER')
sc2=[('BACKGROUND',(0,0),(-1,0),TH),('TEXTCOLOR',(0,0),(-1,0),TW),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),6),
    ('BOTTOMPADDING',(0,0),(-1,-1),6),('GRID',(0,0),(-1,-1),0.5,TEXT_MUTED)]
for i in range(1,len(td)): sc2.append(('BACKGROUND',(0,i),(-1,i),TE if i%2==1 else TO))
t.setStyle(TableStyle(sc2))
story.append(t); story.append(Paragraph('<b>Table 1:</b> Swarm Agent Analysis Scores',sCap)); story.append(Spacer(1,10))

# Overall score
ot=Table([[Paragraph('<b>OVERALL STRATEGIC SCORE</b>',ParagraphStyle('o1',fontName='TNR',fontSize=14,textColor=colors.white,alignment=TA_CENTER)),
    Paragraph('<font size="22"><b>3.3 / 10</b></font>',ParagraphStyle('o2',fontName='TNR',fontSize=22,textColor=colors.white,alignment=TA_CENTER))]],
    colWidths=[AW*0.6,AW*0.4],hAlign='CENTER',rowHeights=[50])
ot.setStyle(TableStyle([('BACKGROUND',(0,0),(0,0),WARNING_AMBER),('BACKGROUND',(1,0),(1,0),colors.HexColor('#a07810')),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER'),
    ('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),
    ('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)]))
story.append(ot)
story.append(Paragraph('<b>Verdict:</b> D-grade. A beautifully designed empty room. Polished shell, zero substance. Student project disguised as a global platform.',sRed))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 2: TARGET PROFILE
# ═══════════════════════════════════════════════════════
story.append(heading('2. Target Entity Profile',sH1,0))
story.append(heading('2.1 Organization Overview',sH2,1))
story.append(Paragraph('FocusLinks is a professional networking, education, and career platform built specifically for '
    'the global optometry community. It was founded in 2025 by Janarthan Veeramani, an optometry student at Alagappa '
    'University in India, who has publicly stated: "As an Optometrist, I couldn\'t find or connect with the right people '
    'on LinkedIn. Too much noise, not enough relevance. So I built FocusLinks.in." The platform operates as a non-profit '
    'entity according to its LinkedIn listing, with a reported team size of 11-50 employees, though actual evidence '
    'suggests a much smaller core team of the founder plus volunteers and a recently appointed Director of Education.',sB))
story.append(Paragraph('The platform offers a comprehensive feature set including a global professional directory, '
    'AI-powered clinical tools under the "Labs" umbrella, community feed, case forum, academy with webinars, career '
    'center with job board, interactive world map, and a blog. It also operates a sister platform called Focus-IN '
    '(focus-in.netlify.app) which provides complementary AI-powered optometry learning tools including Focus.Ai (an '
    'AI study toolkit), Focus Axis (JCC simulator), Focus Cast (audio lessons), Focus CaseX (AI case logging), and '
    'Focus Gen (transposition calculator). The platform claims to have 200+ clinic listings and 15,000+ real interactions, '
    'though independent verification of these claims was not possible.',sB))

pr=[['Entity Name','FocusLinks (Focus Links)'],
    ['Founded','2025'],
    ['Founder','Janarthan Veeramani (B.Optom student, Alagappa University)'],
    ['Type','Non-profit (per LinkedIn) / Student Project'],
    ['Niche','Global Optometry Professional Network'],
    ['Website','focuslinks.in (Next.js + Netlify)'],
    ['Sister Platform','focus-in.netlify.app (Focus-IN)'],
    ['LinkedIn Company','linkedin.com/company/focus-links (~400 followers)'],
    ['Instagram','@focuslinks.in (active, high frequency)'],
    ['YouTube','@Focuslinks (active)'],
    ['Reddit','r/focuslinks (active)'],
    ['Domain focuslinks.com','DEAD - does not resolve (HTTP 000)'],
    ['Actual Signups','189 total, 27 complete profiles (14% activation)'],
    ['Team Size','2 employees (per LinkedIn), founder + volunteers'],
    ['GitHub','github.com/Phantozweb/Newfocuslinks (0 stars, 0 forks)'],
    ['Hosting','Netlify Edge CDN (AWS Singapore IPs)'],
    ['Current Revenue','$0 (zero monetization)'],
    ['Valuation Estimate','$1,000 - $10,000']]
story.append(Spacer(1,10)); story.append(mt(['Attribute','Detail'],pr,[0.30,0.70]))
story.append(Paragraph('<b>Table 2:</b> FocusLinks Entity Profile',sCap))

story.append(heading('2.2 Key Personnel',sH2,1))
kp=[['Janarthan Veeramani','Founder & CEO','Optometry Innovator, Community Builder','linkedin.com/in/janarthan-v'],
    ['Syed Imran','Director of Education & Outreach','RGP, Scleral Lenses, Low Vision','@optometry.nerd (Instagram)'],
    ['Shivashangari M','Head of Product (Focus-IN)','Product Management','Not publicly listed'],
    ['Anshi Jha','MD, Focus Cast','Audio Learning Platform','Not publicly listed'],
    ['Silvester Ogweno','Regional Head, Kenya','Vision Science, CEO Women\'s Wellness Space','Bizpepe.ke listing']]
story.append(mt(['Name','Role','Background','Source'],kp,[0.18,0.18,0.34,0.30]))
story.append(Paragraph('<b>Table 3:</b> Key Personnel',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 3: CRITICAL DEPLOYMENT BUGS
# ═══════════════════════════════════════════════════════
story.append(heading('3. Critical Deployment Bugs',sH1,0))
story.append(Paragraph('This section documents the most severe technical and deployment failures discovered during the '
    'analysis. These are not minor quirks; they are show-stopping bugs that actively harm the platform\'s SEO, social '
    'sharing, credibility, and user trust. The fact that these issues exist in a publicly deployed production environment '
    'suggests the site was pushed live from a localhost development environment without any pre-deployment quality audit.',sB))
story.append(heading('3.1 Bug #1: Localhost URLs in Production Metadata',sH2,1))
story.append(Paragraph('Both the Open Graph (og:image) and Twitter Card (twitter:image) meta tags reference '
    '"http://localhost:3000/og-image.jpg". This means every time anyone shares a link to focuslinks.in on Twitter, '
    'LinkedIn, Facebook, Slack, Discord, or iMessage, the preview card shows a BROKEN IMAGE. For a platform whose '
    'growth depends on social sharing among optometry professionals and students, this bug single-handedly cripples '
    'organic viral distribution. The fix takes 30 seconds: replace "localhost:3000" with the production URL.',sRed))
story.append(heading('3.2 Bug #2: Canonical URL Points to Dead Domain',sH2,1))
story.append(Paragraph('The canonical tag on every page points to "https://focuslinks.com", which returns HTTP 000 '
    '(connection refused). The actual site lives at focuslinks.in. This tells Google that the .in domain is a duplicate '
    'of a non-existent domain, effectively making focuslinks.in invisible in search rankings. Additionally, all structured '
    'data (JSON-LD) blocks use focuslinks.com for URLs, logos, and contact links, compounding the problem. The focuslinks.com '
    'domain is either unregistered or parked, meaning the team does not own the .com variant of their own brand.',sRed))
story.append(heading('3.3 Bug #3: Zero Server-Side Rendering',sH2,1))
story.append(Paragraph('Despite being built on Next.js (which supports SSR/SSG), every single route on focuslinks.in '
    'returns an identical 162KB HTML shell. All content is rendered client-side via JavaScript. This means Google sees '
    'a loading spinner, not the actual content. The blog, directory, academy, about page, and all other subpages are '
    'completely invisible to search engines. For a content-driven platform, this is a death sentence for organic discovery. '
    'The fix requires implementing proper SSR/SSG with unique titles and descriptions per page, which would take 1-2 '
    'days for a competent developer.',sRed))
story.append(heading('3.4 Bug #4: Social Media Links Are Dead Placeholders',sH2,1))
story.append(Paragraph('Three of four social media links in the footer point to "#" (dead placeholders): Twitter/X, '
    'LinkedIn, and Instagram. Only GitHub works, and the GitHub repository exposes the entire source code. While '
    'FocusLinks does have real social media accounts on Instagram (@focuslinks.in), LinkedIn (company/focus-links), and '
    'YouTube (@Focuslinks), the website itself does not link to them. Every visitor who clicks a social icon gets nowhere.',sRed))
story.append(heading('3.5 Bug #5: Stats Display Zero',sH2,1))
story.append(Paragraph('The homepage statistics section shows "0+ Members, 0+ Countries, 0+ Clinics" in the server-'
    'rendered HTML. These are presumably animated counters that depend on JavaScript execution, but if JS fails '
    '(crawlers, slow connections, error states), visitors see exactly zero. For a platform claiming to be "global," '
    'this is catastrophically undermining to trust and credibility.',sRed))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 4: SOCIAL MEDIA INTELLIGENCE
# ═══════════════════════════════════════════════════════
story.append(heading('4. Social Media Intelligence',sH1,0))
story.append(Paragraph('The social media audit reveals a platform that has made genuine efforts on Instagram and LinkedIn '
    'but has significant gaps on other critical platforms. Instagram (@focuslinks.in) is the primary engagement channel '
    'with high-frequency posting including reels, carousels, webinar promotions, and clinical content. LinkedIn has '
    'approximately 400 followers with very active posting (3-4 posts per week) featuring clinical resources, webinar '
    'promotions, founder stories, and team announcements. YouTube (@Focuslinks) hosts webinar recordings and educational '
    'content. Reddit (r/focuslinks) is used for community promotion and cross-posting to optometry subreddits. '
    'Telegram (@focuslinks) exists as a contact channel.',sB))
story.append(Paragraph('However, the platform has NO presence on Facebook (a significant gap for eye care communities), '
    'NO presence on Twitter/X (where healthcare professionals are active), NO Discord server, NO TikTok account '
    '(high-impact potential for reaching optometry students), and the website\'s own social links are dead placeholders '
    'pointing to "#". The brand name inconsistency is also notable: the website header uses "FocusLinks" (camelCase) '
    'while the footer copyright says "Focus Links" (two words). The meta twitter:creator tag references "@focuslinks" '
    'but no such Twitter account exists. This creates confusion and undermines brand coherence across platforms.',sB))

sm=[['Instagram','@focuslinks.in','Active (High)','Primary channel, reels, webinars, clinical content'],
    ['LinkedIn','~400 followers','Active (Very High)','Clinical guides, webinars, founder stories, team posts'],
    ['YouTube','@Focuslinks','Active (Moderate)','Webinars, clinical education content'],
    ['Reddit','r/focuslinks','Active (Low)','Community promotion, cross-posts to optometry subs'],
    ['Telegram','@focuslinks','Exists','Contact/channel, likely updates'],
    ['BeBee','focus-links','Active (Low)','Job postings, professional networking'],
    ['Facebook','NOT FOUND','ABSENT','Critical gap for eye care community'],
    ['Twitter/X','NOT FOUND','ABSENT','Meta tag references @focuslinks but no account'],
    ['Discord','NOT FOUND','ABSENT','No community server'],
    ['TikTok','NOT FOUND','ABSENT','Untapped potential for student reach']]
story.append(mt(['Platform','Handle','Status','Assessment'],sm,[0.15,0.17,0.15,0.53]))
story.append(Paragraph('<b>Table 4:</b> Social Media Presence Audit',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 5: SWOT ANALYSIS
# ═══════════════════════════════════════════════════════
story.append(heading('5. SWOT Analysis (Score: 2.8/10)',sH1,0))
story.append(heading('5.1 Strengths (Score: 3/10)',sH2,1))
story.append(Paragraph('The honest assessment of strengths is constrained by the early-stage nature of the platform. The '
    'one genuinely strong asset is the niche clarity: FocusLinks has identified a real gap in the market for a dedicated '
    'optometry professional networking platform. With an estimated 350,000+ optometrists worldwide and 45,000+ in India, '
    'and no dominant vertical-specific platform, the opportunity is genuine. The technology stack is modern and well-chosen: '
    'Next.js with Turbopack, TypeScript, Tailwind CSS, Netlify CDN, PWA manifest with dark mode support. The UI/UX design '
    'quality is genuinely polished at the surface level with clean gradients, glassmorphism effects, responsive layout, '
    'and consistent Lucide iconography. The "Labs" feature concept (AI clinical tools like OD CAM, IPD Measure Pro, RAPD '
    'Simulator) is a genuinely unique differentiator that no competitor offers within a social platform context. The '
    'feature architecture is ambitious and comprehensive, covering directory, feed, labs, academy, jobs, events, and more.',sB))
story.append(heading('5.2 Weaknesses (Score: 1/10)',sH2,1))
story.append(Paragraph('The weaknesses are severe and self-inflicted. SEO is completely destroyed by the canonical URL '
    'pointing to a dead domain, localhost OG images, no XML sitemap, and zero server-side rendering. The GitHub repository '
    'has 0 stars, 0 forks, 0 issues, a description of "Tested," no license, no README content, only 9 commits, and was '
    'created on April 12, 2026, suggesting an extremely early-stage project. All social media links in the footer are '
    'dead placeholders. There is zero analytics tracking (no GA4, GTM, Facebook Pixel, or any other tool). There is zero '
    'email infrastructure (no MX records, no SPF/DKIM/DMARC). There is no contact email, phone number, or physical '
    'address anywhere on the site. The homepage stats display "0+ Members, 0+ Countries, 0+ Clinics." The testimonials '
    'feature perfectly diverse international names with perfectly generic quotes but no photos or LinkedIn verification. '
    'The backend reportedly uses GitHub raw JSON files as a database, which cannot handle concurrent writes and breaks at '
    'approximately 100 concurrent users. Of 189 total signups, 162 are pending applications (broken onboarding pipeline).',sB))
story.append(heading('5.3 Opportunities (Score: 5/10)',sH2,1))
story.append(Paragraph('The optometry niche is genuinely underserved digitally. No single platform combines professional '
    'networking, clinical tools, education, and career services in one destination. The "Labs" concept could be a killer '
    'differentiator: clinical calculators and simulators create daily-use utility that pure social platforms lack. India '
    'provides a natural beachhead with 45,000+ optometrists and growing optometry schools. Revenue opportunities include '
    'B2B job board placement fees, sponsored webinars from optical manufacturers (Essilor, Zeiss, Alcon), continuing '
    'education credit platforms, and premium clinical tool subscriptions. Partnership with the 20+ optometry schools in '
    'India and 200+ globally could create a pipeline of engaged users. The codebase modernization cost is minimal since '
    'it\'s only 9 commits, meaning a technical reset would take 1-2 weeks, not months.',sB))
story.append(heading('5.4 Threats (Score: 7/10)',sH2,1))
story.append(Paragraph('LinkedIn already serves professional networking for all medical professionals with 900M+ users. '
    'Established optometry platforms include OPTOGLOBE (25 years of credibility, 7,000+ students across 52 countries), '
    'Eyes On Eyecare (approximately $3M annual revenue, 30 staff), Review of Optometry (decades of clinical authority), '
    'and Doximity (NASDAQ-listed, 500K+ healthcare professionals, $500M+ revenue). Facebook Groups with 100K+ members '
    'already serve optometry communities. AI-powered clinical platforms could render FocusLinks\' tools obsolete overnight. '
    'Regulatory and medical compliance risk exists for a platform handling healthcare professional data with zero HIPAA-'
    'equivalent data protection. The biggest threat is the "Dead Project Spiral": with 0 stars, 0 forks, broken social '
    'links, and localhost references, this has all the hallmarks of a project that will be abandoned within 3-6 months.',sB))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 6: TECHNICAL & SEO AUDIT
# ═══════════════════════════════════════════════════════
story.append(heading('6. Technical & SEO Audit (Score: 4.0/10)',sH1,0))
story.append(Paragraph('The technical audit reveals a Jekyll-and-Hyde situation: the frontend quality is genuinely above '
    'average (7/10 for website quality), but the operational deployment is catastrophically negligent (0/10 for analytics, '
    '1/10 for email infrastructure). The tech stack is modern and well-chosen: Next.js with Turbopack, TypeScript, '
    'Tailwind CSS v4, Lucide icons, Geist font family, Netlify edge CDN with HSTS and HTTP/2. The mobile experience '
    'scores 8/10 with proper responsive breakpoints, hamburger menu, PWA manifest, and dark mode support. Security '
    'headers are partially present (HSTS, nosniff) but missing critical ones (Content-Security-Policy, X-Frame-Options, '
    'Referrer-Policy).',sB))
story.append(Paragraph('The SEO score of 4/10 is inflated solely because meta tags exist; the implementation is self-'
    'sabotaging. Performance metrics are borderline: TTFB is 840ms (above ideal 200ms), HTML size is 162KB (massively '
    'bloated), and 12 JavaScript files are loaded. The domain authority is estimated at 5-10 (very low) with no MX '
    'records, no TXT records, no email infrastructure whatsoever. The critical finding is that zero analytics tools are '
    'installed: no Google Analytics, no Google Tag Manager, no Facebook Pixel, no Hotjar, no Microsoft Clarity, nothing. '
    'The team is flying completely blind with zero data on visitors, conversions, or user behavior.',sB))

ta=[['Website Quality','7/10','Modern stack, polished UI, good accessibility basics'],
    ['SEO Analysis','4/10','Meta tags exist but canonical/OG localhost URLs destroy everything'],
    ['Domain Authority','2/10','Young .in domain, focuslinks.com dead, no MX/TXT records'],
    ['Technical Infrastructure','6/10','Next.js + Netlify, proper HTTP/2, HSTS, edge caching'],
    ['Performance','5/10','TTFB 840ms, 162KB HTML, 12 JS files, heavy bundle'],
    ['Mobile Experience','8/10','Responsive, PWA, dark mode, hamburger menu, touch targets'],
    ['Analytics','0/10','ZERO - no GA4, GTM, Pixel, Clarity, or any tracking'],
    ['Social Integration','3/10','OG tags present but images point to localhost'],
    ['Email/Communication','1/10','No MX records, no email, no contact info on site'],
    ['Security','4/10','HSTS yes, CSP no, X-Frame-Options no, framework headers leaked']]
story.append(mt(['Category','Score','Key Findings'],ta,[0.22,0.10,0.68]))
story.append(Paragraph('<b>Table 5:</b> Technical & SEO Audit Scores',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 7: MARKETING AUDIT
# ═══════════════════════════════════════════════════════
story.append(heading('7. Marketing Audit (Score: 3.2/10)',sH1,0))
story.append(Paragraph('The marketing audit reveals a product without a go-to-market strategy. The brand identity scores '
    '5/10: the name "FocusLinks" is decent and the tagline "World\'s First Global Platform for Optometrists" is bold, '
    'but the "World\'s First" claim is unsupported and risks regulatory scrutiny. The brand inconsistency between '
    '"FocusLinks" (header) and "Focus Links" (footer) is a basic marketing failure. The visual identity, while polished, '
    'is generic SaaS blue gradients that could belong to any startup. Digital presence scores 2/10: focuslinks.com is '
    'a dead domain, Google search returns near-zero results for "focuslinks.in", and no Product Hunt, Crunchbase, or '
    'press coverage exists. Content strategy scores 3/10: the infrastructure (blog, academy, webinars) exists but all '
    'content is client-rendered and invisible to search engines. Growth strategy scores 2/10: no referral program, no '
    'campus ambassador outreach beyond a LinkedIn job posting, no paid acquisition, no content-led SEO growth.',sB))
story.append(Paragraph('The conversion funnel scores 3/10: multiple "Join Now" CTAs exist but the homepage shows a '
    'full-screen loading spinner before any content renders, meaning visitors are lost before they see the value '
    'proposition. No landing pages exist for specific audience segments (students vs. practitioners). The most damning '
    'score is monetization at 1/10: there is absolutely no revenue model. No pricing page, no freemium tiers, no '
    'enterprise offering, no advertising, no sponsored content, no marketplace commissions. The platform appears to be '
    'burning zero money (free-tier Netlify + GitHub backend) while also making zero money, a sustainability equation '
    'that works only if the founder\'s time has no value.',sB))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 8: REVENUE ANALYSIS
# ═══════════════════════════════════════════════════════
story.append(heading('8. Revenue & Business Model Analysis (Score: 2.0/10)',sH1,0))
story.append(Paragraph('The revenue analysis is the most brutally straightforward section of this report. FocusLinks '
    'generates zero dollars in revenue. There is no pricing page, no payment gateway integration (no Stripe, no Razorpay, '
    'no PayPal), no premium tier, no enterprise offering, no advertising revenue, no marketplace commissions, no '
    'sponsored content, no course fees, and no job board placement fees. The entire platform operates on free-tier '
    'infrastructure: Netlify hosting (free), GitHub raw JSON files as a database (free), and volunteer labor (free). '
    'The estimated monthly burn rate is approximately zero to six dollars (domain registration only). The founder is a '
    'full-time optometry student building this as a side project with zero external funding.',sB))
story.append(Paragraph('The actual user base from GitHub backend data reveals 189 total signups with only 27 complete '
    'profiles, representing a 14% activation rate. Of these, 15 are professionals and 9 are students, with approximately '
    '70% based in India. The realistic revenue potential, assuming successful execution of a monetization strategy, '
    'is estimated at $60,000-$240,000 annually by year 3-5, with job board fees being the most viable near-term stream. '
    'Comparable platforms prove market viability: Eyes On Eyecare generates approximately $3M annually, and Doximity '
    '(NASDAQ: DOCS) generates $500M+ annually. The current entity valuation is estimated at $1,000-$10,000, reflecting '
    'the brand, domain, code, and small user list, but no revenue, no IP, and no defensible technology.',sB))

rv=[['Current Annual Revenue','$0 (zero)','No monetization infrastructure exists'],
    ['Cost Structure','~$0/month','Free-tier Netlify + GitHub JSON backend'],
    ['User Base','189 signups, 27 complete','14% activation rate, 162 pending applications'],
    ['Scalability','1/10','GitHub JSON breaks at ~100 concurrent users'],
    ['3-5 Year Revenue Potential','$60K-$240K','If monetization strategy executed'],
    ['Comparable: Eyes On Eyecare','~$3M/yr, 30 staff','Proves optometry platform market viability'],
    ['Comparable: Doximity','$500M+ (NASDAQ)','Professional network ceiling for healthcare'],
    ['Current Valuation','$1,000-$10,000','Brand + code + 189 users, no revenue']]
story.append(mt(['Metric','Value','Notes'],rv,[0.25,0.20,0.55]))
story.append(Paragraph('<b>Table 6:</b> Revenue & Valuation Analysis',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 9: COMPETITIVE LANDSCAPE
# ═══════════════════════════════════════════════════════
story.append(heading('9. Competitive Landscape',sH1,0))
story.append(Paragraph('The competitive landscape analysis reveals a fragmented market with no single dominant platform '
    'serving optometrists globally. FocusLinks operates in a space with 13+ identified competitors across four tiers. '
    'Tier 1 direct competitors include OPTOGLOBE (25 years of credibility, 7,000+ students, 52 countries, official '
    'university partnerships), YoungOD Connect (focused on young optometrists), and Edcelerate (mobile-first). Tier 2 '
    'content/media platforms include Eyes On Eyecare (approximately $3M annual revenue, largest eyecare job board), '
    'Review of Optometry, Optometric Management, and Optometry Times. Tier 3 general physician networks include '
    'Doximity (500K+ healthcare professionals, NASDAQ-listed, $500M+ revenue) and Sermo (1M+ physicians).',sB))
story.append(Paragraph('FocusLinks\' theoretical competitive advantage lies in being an all-in-one platform that combines '
    'directory, social feed, AI clinical tools, education, and jobs in a single destination. No current competitor offers '
    'this combination specifically for optometry. The "Labs" feature (AI clinical tools) is the most defensible '
    'differentiator. However, the competitive moat is currently zero: nothing is proprietary, the code is open source '
    'with no license, and any competent team could clone the concept in a weekend. The cold-start problem is the '
    'existential challenge: social platforms become valuable only after achieving critical mass, and 27 active users '
    'is nowhere near the threshold needed for network effects to kick in.',sB))

cl=[['OPTOGLOBE','Direct','7K+ students, 52 countries','25yr credibility, school partnerships'],
    ['Eyes On Eyecare','Indirect','~$3M/yr, 30 staff','Largest eyecare job board, CE credits'],
    ['Doximity','Indirect','500K+ HCPs, NASDAQ','$500M+ revenue, dominant physician network'],
    ['Review of Optometry','Indirect','Large (Jobson)','Decades of clinical authority'],
    ['YoungOD Connect','Direct','Small (<5K)','Young OD focus, full-scope practice'],
    ['FB Groups (100K+)','Indirect','100K+ members','"Optometry Students Worldwide" etc.']]
story.append(mt(['Competitor','Type','Size','Key Advantage'],cl,[0.20,0.12,0.20,0.48]))
story.append(Paragraph('<b>Table 7:</b> Competitive Landscape Overview',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 10: CONTENT & UX CRITIQUE
# ═══════════════════════════════════════════════════════
story.append(heading('10. Content & UX Critique (Score: 3.5/10)',sH1,0))
story.append(Paragraph('The content and UX critique reveals a platform that looks polished at first glance but '
    'crumbles under scrutiny. Content quality scores 4/10: the homepage contains approximately 300-400 words of '
    'generic marketing copy with zero real images, zero blog articles, zero case studies, and zero downloadable '
    'resources in the server-rendered HTML. The five testimonials feature perfectly geographically diverse names '
    '(Mumbai, Barcelona, Lagos, Tokyo, Sydney) with perfectly generic quotes but no photographs or LinkedIn profile '
    'links for verification. The community feed shows "12 members online now," which is either hardcoded or a '
    'painfully honest real number for a "global platform." Trust signals score 1/10: no team page, no contact info, '
    'no certifications, no partner logos, no real member count (displays "0+"), and the footer copyright says '
    '"2026" which appears to be an error.',sB))
story.append(Paragraph('User experience scores 3/10 primarily because of the client-side rendering dependency: all '
    'pages return identical HTML and content loads via JavaScript, meaning users on slow connections see loading '
    'spinners indefinitely. The "Loading map..." text appears but the map never loads in static HTML. Navigation '
    'has inconsistencies: "Profiles" in the nav bar equals "Directory" in the footer. The "More" dropdown is opaque '
    'without JavaScript. Accessibility scores 4/10 despite ARIA labels being present: there is no skip-to-content '
    'link, all content requires JavaScript (screen readers get "Loading..."), and the heading hierarchy is broken. '
    'The visual design scores 6/10: clean gradients and consistent icons, but the overall aesthetic is derivative of '
    'every Tailwind SaaS template from the last three years with no distinctive brand identity.',sB))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 11: THE FIVE FATAL FLAWS
# ═══════════════════════════════════════════════════════
story.append(heading('11. The Five Fatal Flaws',sH1,0))
story.append(Paragraph('After exhaustive analysis across all nine intelligence domains, five critical flaws emerge that '
    'individually would severely handicap the platform and together constitute an existential threat.',sB))
story.append(heading('11.1 Fatal Flaw #1: Self-Sabotaging SEO',sH2,1))
story.append(Paragraph('Every page has the same title and meta description. The canonical URL points to a dead domain. '
    'OG images point to localhost. No XML sitemap exists. Zero server-side rendering means Google cannot index content. '
    'The sameAs array in structured data is empty. This is not underperformance; it is active self-destruction of every '
    'organic discovery channel.',sRed))
story.append(heading('11.2 Fatal Flaw #2: The Ghost Town Effect',sH2,1))
story.append(Paragraph('The platform shows "0+ Members, 0+ Countries, 0+ Clinics." Only 27 of 189 signups have complete '
    'profiles. The community feed has 12 people online. Social platforms are dead without users, and users do not join '
    'empty platforms. The cold-start problem is the existential challenge that FocusLinks has not solved.',sRed))
story.append(heading('11.3 Fatal Flaw #3: Zero Business Model',sH2,1))
story.append(Paragraph('There is no pricing, no payment integration, no freemium model, no advertising, no sponsorships, '
    'no course fees, no job board fees, and no enterprise tier. The platform burns zero dollars per month but also '
    'generates zero dollars. Without a revenue model, the platform cannot hire developers, buy servers, or invest in '
    'growth. It will remain a student project indefinitely.',sRed))
story.append(heading('11.4 Fatal Flaw #4: Paper-Thin Credibility',sH2,1))
story.append(Paragraph('Unverifiable testimonials with no photos, no team page, no contact information, no legal entity, '
    'GitHub repo with "Tested" as description, 0 stars and 0 forks, and footer social links pointing to "#". Every '
    'signal the platform sends to a professional audience says "this is not a real company." For a platform targeting '
    'healthcare professionals who make clinical decisions, credibility is not optional; it is existential.',sRed))
story.append(heading('11.5 Fatal Flaw #5: Infrastructure Fragility',sH2,1))
story.append(Paragraph('The backend reportedly uses GitHub raw JSON files as a database. This cannot handle concurrent '
    'writes, has no indexing, no ACID compliance, no authentication, and breaks at approximately 100 concurrent users. '
    'Zero email infrastructure (no MX records) means the platform cannot send password resets, verification emails, or '
    'transactional communications. Zero analytics means zero data-driven decision making. The entire operation is built '
    'on free-tier services with no backup plan, no redundancy, and no disaster recovery.',sRed))
story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 12: ACTIONABLE INTELLIGENCE
# ═══════════════════════════════════════════════════════
story.append(heading('12. Actionable Intelligence - Priority Roadmap',sH1,0))
story.append(heading('12.1 IMMEDIATE - Today (Cost: $0)',sH2,1))
im=[['Fix canonical URL: focuslinks.com -> focuslinks.in','$0','30 seconds in Next.js config'],
    ['Fix OG/Twitter images: localhost:3000 -> production URL','$0','30 seconds in metadata'],
    ['Fix JSON-LD URLs to use focuslinks.in','$0','Replace all structured data domain references'],
    ['Link real social media profiles (Instagram, LinkedIn, YouTube)','$0','Replace # placeholders with real URLs'],
    ['Remove or hide "0+ Members/Countries/Clinics" stats','$0','Replace with static fallback or remove'],
    ['Fix copyright year from 2026 to 2025','$0','Typo fix in footer'],
    ['Standardize brand name: FocusLinks everywhere','$0','Consistency across header, footer, meta tags'],
    ['Create GitHub README with proper description','$0','Replace "Tested" with product description']]
story.append(mt(['Action','Cost','Rationale'],im,[0.50,0.10,0.40]))
story.append(Paragraph('<b>Table 8:</b> Immediate Actions - Today',sCap))

story.append(heading('12.2 SHORT-TERM - This Week ($0-$50)',sH2,1))
st=[['Implement SSR/SSG with per-page unique titles/meta','$0','Biggest SEO impact, 1-2 days work'],
    ['Install Google Analytics 4 (GA4)','$0','Stop flying blind on traffic data'],
    ['Generate and submit XML sitemap to Google Search Console','$0','Enable proper crawling'],
    ['Create actual contact email (hello@focuslinks.in)','$0-10','Zoho Mail free tier works'],
    ['Set up MX records for domain email','$0','Enable email receiving'],
    ['Create Facebook page and Twitter/X account','$0','Fill critical platform gaps'],
    ['Add real imagery (founder, team, screenshots)','$0','Replace icon-only visual design'],
    ['Verify testimonials or remove unverified ones','$0','Legal/ethical compliance']]
story.append(mt(['Action','Cost','Rationale'],st,[0.50,0.10,0.40]))
story.append(Paragraph('<b>Table 9:</b> Short-Term Actions - This Week',sCap))

story.append(heading('12.3 MEDIUM-TERM - This Month ($50-$500)',sH2,1))
md=[['Replace GitHub JSON backend with real database','$10-50/mo','Supabase or Firebase for production data'],
    ['Define pricing tiers (Free / Pro / Enterprise)','$0','Basic SaaS monetization strategy'],
    ['Build proper authentication system','$0-20','Supabase Auth or similar'],
    ['Partner with 5+ optometry schools in India','$0','Student pipeline through college partnerships'],
    ['Launch mobile app (React Native / PWA enhancement)','$0-100','Critical for daily engagement'],
    ['Implement proper CI/CD pipeline','$0','GitHub Actions + Netlify deploy preview'],
    ['Create content marketing strategy (blog + SEO)','$0','Target optometry exam keywords'],
    ['Register focuslinks.com or establish .in as primary','$10-15/yr','Domain credibility for "global" claim']]
story.append(mt(['Action','Cost','Rationale'],md,[0.50,0.10,0.40]))
story.append(Paragraph('<b>Table 10:</b> Medium-Term Actions - This Month',sCap)); story.append(Spacer(1,18))

# ═══════════════════════════════════════════════════════
# SECTION 13: FINAL VERDICT
# ═══════════════════════════════════════════════════════
story.append(heading('13. Final Verdict',sH1,0))
story.append(Paragraph('FocusLinks is a beautifully designed empty room. The ambition is real, the niche is valid, and '
    'the tech choices are sound. The UI/UX team (likely the founder) has genuine design talent, and the "Labs" concept '
    'of embedding AI clinical tools within a social platform is a genuinely innovative differentiator. The founder '
    'shows hustle and product instinct: a 161-page free ocular anatomy guide, international webinar series, appointment '
    'of a Director of Education, and active social media presence demonstrate real effort.',sB))
story.append(Paragraph('However, the execution gap between vision and reality is vast. The site was clearly deployed from '
    'localhost without a quality audit. The canonical URL, OG images, and structured data all point to wrong domains. '
    'Zero analytics means zero learning. Zero email means zero professional communication. Zero monetization means zero '
    'sustainability. The backend uses GitHub raw JSON files, which breaks at 100 users. Of 189 signups, only 27 have '
    'completed profiles, and the platform shows "0+ Members" to visitors. The .com domain is dead. The GitHub repo has '
    '0 stars and is described as "Tested." Three of four social links are dead placeholders. Without fixing these '
    'fundamentals, no amount of feature development will matter because no one will find the platform, no one will '
    'trust it, and no one will stay.',sB))
story.append(Paragraph('The positive signal is that all of these problems are fixable. The codebase is small (9 commits), '
    'the tech stack is modern, and the fix list is concrete and achievable. The founder has already demonstrated the '
    'ability to build, design, and market a complex product while being a full-time student. If the same energy '
    'currently spent on features were redirected to fundamentals (SEO, analytics, email, real database, social links), '
    'FocusLinks could transform from a student project into a legitimate platform within 60-90 days. The optometry '
    'niche is genuinely underserved, the feature concept is smart, and the founder has the right instincts. What is '
    'needed now is not more features but more discipline: fix the foundations before building higher.',sB))
story.append(Spacer(1,12))

fb=Table([[Paragraph('<b>FINAL STRATEGIC ASSESSMENT</b>',ParagraphStyle('fb1',fontName='TNR',fontSize=13,textColor=colors.white,alignment=TA_CENTER))],
    [Paragraph('<font size="28"><b>3.3 / 10</b></font>',ParagraphStyle('fb2',fontName='TNR',fontSize=28,textColor=colors.white,alignment=TA_CENTER))],
    [Paragraph('D-GRADE | BEAUTIFUL SHELL, ZERO SUBSTANCE',ParagraphStyle('fb3',fontName='TNR',fontSize=11,textColor=colors.HexColor('#ffcccc'),alignment=TA_CENTER))]],
    colWidths=[AW*0.7],hAlign='CENTER')
fb.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),WARNING_AMBER),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('ALIGN',(0,0),(-1,-1),'CENTER'),('LEFTPADDING',(0,0),(-1,-1),16),('RIGHTPADDING',(0,0),(-1,-1),16),
    ('TOPPADDING',(0,0),(0,0),16),('BOTTOMPADDING',(-1,-1),(-1,-1),16),
    ('TOPPADDING',(0,1),(-1,-1),4),('BOTTOMPADDING',(0,0),(0,0),4)]))
story.append(fb); story.append(Spacer(1,12))
story.append(Paragraph('<i>This report was prepared by FOCUSLINKS INTELLIGENCE using swarm-based analysis methodology. '
    'Nine parallel agents conducted independent investigations. All findings are based on publicly available data. '
    'No input was sought from the target entity. All scores represent independent assessments with no soft corners.</i>',sB))

doc.multiBuild(story)
print(f"PDF generated: {OUTPUT}")
