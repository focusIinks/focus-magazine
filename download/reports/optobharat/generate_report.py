import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import hashlib

# ━━ Palette ━━
ACCENT = colors.HexColor('#64b6d2')
TEXT_PRIMARY = colors.HexColor('#e3e2e0')
TEXT_MUTED = colors.HexColor('#838077')
BG_SURFACE = colors.HexColor('#312f29')
BG_PAGE = colors.HexColor('#0d0d0c')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT = colors.white
TABLE_ROW_EVEN = colors.white
TABLE_ROW_ODD = BG_SURFACE

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('TimesNewRoman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')
registerFontFamily('TimesNewRoman', normal='TimesNewRoman', bold='TimesNewRoman')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

OUTPUT = '/home/z/my-project/download/reports/optobharat/OptoBharat_Strategic_Intelligence_Report.pdf'
PAGE_W, PAGE_H = A4

# ━━ Styles ━━
styles = {
    'Title': ParagraphStyle('Title', fontName='Calibri', fontSize=28, leading=36,
        textColor=TEXT_PRIMARY, spaceAfter=12, alignment=TA_LEFT),
    'H1': ParagraphStyle('H1', fontName='Calibri', fontSize=18, leading=24,
        textColor=ACCENT, spaceBefore=18, spaceAfter=10, alignment=TA_LEFT),
    'H2': ParagraphStyle('H2', fontName='Calibri', fontSize=14, leading=20,
        textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8, alignment=TA_LEFT),
    'H3': ParagraphStyle('H3', fontName='Calibri', fontSize=12, leading=17,
        textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6, alignment=TA_LEFT),
    'Body': ParagraphStyle('Body', fontName='Calibri', fontSize=10, leading=16,
        textColor=TEXT_PRIMARY, spaceAfter=8, alignment=TA_JUSTIFY),
    'BodyLeft': ParagraphStyle('BodyLeft', fontName='Calibri', fontSize=10, leading=16,
        textColor=TEXT_PRIMARY, spaceAfter=6, alignment=TA_LEFT),
    'Bullet': ParagraphStyle('Bullet', fontName='Calibri', fontSize=10, leading=16,
        textColor=TEXT_PRIMARY, spaceAfter=4, alignment=TA_LEFT,
        leftIndent=20, bulletIndent=8),
    'Small': ParagraphStyle('Small', fontName='Calibri', fontSize=8, leading=12,
        textColor=TEXT_MUTED, alignment=TA_LEFT),
    'TOCHeading1': ParagraphStyle('TOC1', fontName='Calibri', fontSize=12, leftIndent=20,
        textColor=TEXT_PRIMARY),
    'TOCHeading2': ParagraphStyle('TOC2', fontName='Calibri', fontSize=10, leftIndent=40,
        textColor=TEXT_MUTED),
    'Metric': ParagraphStyle('Metric', fontName='Calibri', fontSize=22, leading=28,
        textColor=ACCENT, alignment=TA_CENTER, spaceBefore=6, spaceAfter=6),
    'MetricLabel': ParagraphStyle('MetricLabel', fontName='Calibri', fontSize=8, leading=12,
        textColor=TEXT_MUTED, alignment=TA_CENTER),
    'Score': ParagraphStyle('Score', fontName='Calibri', fontSize=14, leading=20,
        textColor=colors.HexColor('#ff6b6b'), alignment=TA_CENTER, spaceBefore=2, spaceAfter=2),
    'ScoreGood': ParagraphStyle('ScoreGood', fontName='Calibri', fontSize=14, leading=20,
        textColor=colors.HexColor('#4ade80'), alignment=TA_CENTER, spaceBefore=2, spaceAfter=2),
}
header_style = ParagraphStyle('TH', fontName='Calibri', fontSize=9, leading=13,
    textColor=colors.white, alignment=TA_CENTER)
cell_style = ParagraphStyle('TD', fontName='Calibri', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT)
cell_center = ParagraphStyle('TDC', fontName='Calibri', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER)

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BG_SURFACE, spaceBefore=6, spaceAfter=6)

def score_cell(score, max_score=100):
    if score >= max_score * 0.7:
        clr = colors.HexColor('#4ade80')
    elif score >= max_score * 0.4:
        clr = colors.HexColor('#fbbf24')
    else:
        clr = colors.HexColor('#ef4444')
    return Paragraph(f'<b>{score}/{max_score}</b>', ParagraphStyle('SC', fontName='Calibri',
        fontSize=11, leading=15, textColor=clr, alignment=TA_CENTER))

def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph(f'<a name="{key}"/>{text}</a>', style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def make_table(data, col_widths=None):
    avail = PAGE_W - 2*inch
    if col_widths:
        total = sum(col_widths)
        if total > avail:
            col_widths = [w * (avail/total) for w in col_widths]
    else:
        col_widths = [avail / len(data[0])] * len(data[0])
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, BG_SURFACE),
    ]
    for i in range(1, len(data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

# ── Build Story ──
story = []

# TOC
toc = TableOfContents()
toc.levelStyles = [styles['TOCHeading1'], styles['TOCHeading2']]
story.append(Paragraph('<b>Table of Contents</b>', styles['Title']))
story.append(Spacer(1, 12))
story.append(toc)
story.append(PageBreak())

# ── Executive Summary ──
story.append(add_heading('Executive Summary', styles['H1'], 0))
story.append(Paragraph(
    'This strategic intelligence report provides a comprehensive, no-holds-barred analysis of OptoBharat / OptoAI / '
    'Envision Bharat, an early-stage Indian startup operating across two verticals: AI-powered education (OptoAI) '
    'and restaurant/retail technology (NexPOS, KhaoJi). The analysis was conducted by deploying 11 independent '
    'intelligence agents that examined the target from every angle: browser scraping, deep web research, '
    'SWOT analysis, marketing analytics, social media monitoring, technical/SEO auditing, competitive intelligence, '
    'content/UX critique, rise & fall tracking, brand strategy, and revenue/business model analysis.',
    styles['Body']))
story.append(Spacer(1, 12))

story.append(add_heading('Overall Assessment', styles['H2'], 1))

# Score card table
score_data = [
    [Paragraph('<b>Dimension</b>', header_style), Paragraph('<b>Score</b>', header_style), Paragraph('<b>Grade</b>', header_style)],
    [Paragraph('Strategic Position (SWOT)', cell_style), score_cell(28, 100), Paragraph('F', cell_center)],
    [Paragraph('Marketing Analytics', cell_style), score_cell(14.5, 100), Paragraph('F-', cell_center)],
    [Paragraph('Social Media Presence', cell_style), score_cell(3, 100), Paragraph('F-', cell_center)],
    [Paragraph('Technical (OptoBharat)', cell_style), score_cell(28, 100), Paragraph('F-', cell_center)],
    [Paragraph('Technical (Envision Bharat)', cell_style), score_cell(42, 100), Paragraph('F', cell_center)],
    [Paragraph('SEO (OptoBharat)', cell_style), score_cell(25, 100), Paragraph('F-', cell_center)],
    [Paragraph('SEO (Envision Bharat)', cell_style), score_cell(35, 100), Paragraph('F', cell_center)],
    [Paragraph('Competitive Position', cell_style), score_cell(35, 100), Paragraph('F', cell_center)],
    [Paragraph('Content Quality', cell_style), score_cell(28, 100), Paragraph('F', cell_center)],
    [Paragraph('User Experience', cell_style), score_cell(31, 100), Paragraph('F', cell_center)],
    [Paragraph('Brand Strategy', cell_style), score_cell(16, 100), Paragraph('F-', cell_center)],
    [Paragraph('Revenue & Business Model', cell_style), score_cell(1.5, 100), Paragraph('F-', cell_center)],
    [Paragraph('<b>OVERALL WEIGHTED SCORE</b>', header_style), score_cell(10, 100), Paragraph('F', cell_center)],
]
story.append(Spacer(1, 8))
story.append(make_table(score_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    '<b>Overall Grade: F (10/100)</b> - OptoBharat / Envision Bharat receives the lowest possible overall score across all '
    'analyzed dimensions. The company is a pre-revenue, pre-product-market-fit operation with zero customers, '
    'zero revenue, zero social proof, zero SEO visibility, and a brand architecture that is fundamentally '
    'broken. While the founding team demonstrates technical competence, the strategic, marketing, and '
    'business fundamentals are critically deficient. The company exists in "existential danger" territory.',
    styles['Body']))

story.append(Spacer(1, 12))
story.append(Paragraph(
    '<b>Critical Finding:</b> The Razorpay payment integration on optobharat.com is still in <b>TEST MODE</b>, confirming '
    'zero live transactions have ever been processed. The entire operation is a pre-revenue prototype with three '
    'unfocused products, no external funding, no team beyond three co-founders, and no go-to-market strategy.',
    styles['Body']))

story.append(Spacer(1, 18))

# ── Agent 1: Browser Scrape ──
story.append(add_heading('1. Website & Content Analysis', styles['H1'], 0))
story.append(Paragraph(
    'The browser scraping agent analyzed both optobharat.com (OptoAI product page) and envisionbharat.com (parent '
    'company site). Both sites are Single Page Applications (SPAs) rendering all content client-side via JavaScript, '
    'meaning search engine crawlers see empty pages. OptoBharat.com has a 4.49 MB JavaScript bundle with zero compression, '
    'while Envision Bharat uses a more reasonable 506 KB bundle with Brotli compression.', styles['Body']))

story.append(add_heading('1.1 OptoBharat.com Key Findings', styles['H2'], 1))
story.append(Paragraph(
    'The site features 6 AI study modules (Study Vault, Hard Revision, AI IoT Mentor, Exam Intelligence, '
    'Codex Lab, AI Tutor), 4 pricing tiers (Free at INR 0, Basic at INR 99/month, Weekly at INR 129/week, Pro at '
    'INR 299/month), but critically has only 6 total links and zero social proof. The Weekly plan costs INR 516/month '
    'equivalent, making it 72% more expensive than the Pro monthly plan for identical features. Legal disclaimers '
    'reference "Terms and Privacy Policy" but no actual legal pages exist.', styles['Body']))

story.append(add_heading('1.2 Envision Bharat.com Key Findings', styles['H2'], 1))
story.append(Paragraph(
    'The corporate parent site showcases 3 products (OptoAI, NexPOS, KhaoJi) with detailed feature lists extracted '
    'from JS bundles. NexPOS pricing ranges from INR 5,500/month (5 devices) to INR 47,000/month (100 devices) plus '
    'INR 7,999/device hardware. KhaoJi is priced at INR 600/device/month. The site uses button-based navigation '
    'that kills SEO (no anchor hrefs), and EmailJS credentials are exposed in client-side JavaScript.', styles['Body']))

story.append(add_heading('1.3 Critical Issues', styles['H2'], 1))
issues = [
    'No privacy policy, no terms of service, no GDPR/DPDPA compliance',
    'EmailJS public key exposed in client-side JS',
    'Firebase configuration exposed in client-side JS (project: rag-ai-53f35)',
    'Razorpay LIVE API key exposed in client-side JS (critical security failure)',
    'Both sites are pure CSR SPAs with zero server-side rendering',
    'Zero social proof: no testimonials, reviews, case studies, or press mentions',
    'Copyright year is future-dated to 2026',
    '"Wewn" typo on Envision Bharat hero section',
]
for issue in issues:
    story.append(Paragraph(f'- {issue}', styles['Bullet']))

story.append(Spacer(1, 12))

# ── Agent 2: Deep Web Research ──
story.append(add_heading('2. Deep Web Research & OSINT', styles['H1'], 0))
story.append(Paragraph(
    'The deep web research agent conducted 15+ searches across multiple engines and found a devastating '
    'truth: Envision Bharat has <b>zero web presence</b> outside its own domains. No press coverage, no reviews, '
    'no mentions, and no third-party validation exist anywhere online. The company is digitally invisible.', styles['Body']))

story.append(add_heading('2.1 Brand Collision Discovery', styles['H2'], 1))
story.append(Paragraph(
    'A critical brand collision was identified: "OptoBharat" is already an established Indian optometry student '
    'community with active YouTube, Facebook, and LinkedIn presence. Similarly, "OptoAI" is an optometry AI '
    'company with press coverage in Women In Optometry and Eyes On Eyecare publications. This means the '
    'company is fighting for visibility against two established entities with the same or similar names.', styles['Body']))

story.append(add_heading('2.2 Complete Digital Invisibility', styles['H2'], 1))
story.append(Paragraph(
    'Beyond the two official websites, NexPOS has a single external signal: an auto-aggregated listing on '
    'Capterra India and Capterra Global. KhaoJi is completely invisible with zero indexed results. The '
    'founders have minimal digital footprints - Mrudul Prajapati was found on LinkedIn and Instagram, Nishit '
    'Patel on LinkedIn only, and Sumit Bharodiya returned zero search results. OptoAI is absent from ALL "best AI '
    'tools for Indian students" lists, where ChatGPT, Gemini, Doubtnut, Khan Academy, and Notion AI dominate.',
    styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 3: SWOT ──
story.append(add_heading('3. SWOT Analysis', styles['H1'], 0))
story.append(Paragraph(
    'The SWOT analysis reveals a company in existential danger with a strategic position score of <b>2.8/10</b>. '
    'The company has 10 theoretical strengths (mostly "potential" rather than demonstrated), 18 weaknesses '
    '(4 critical, 11 high severity), 10 opportunities (real but available to all competitors), and 12 threats '
    '(4 critical). The McKinsey 7S Framework scores an average of 2.3/10 across all dimensions.', styles['Body']))

swot_data = [
    [Paragraph('<b>Dimension</b>', header_style), Paragraph('<b>Score</b>', header_style)],
    [Paragraph('Strategy', cell_style), Paragraph('2/10', cell_center)],
    [Paragraph('Structure', cell_style), Paragraph('2/10', cell_center)],
    [Paragraph('Systems', cell_style), Paragraph('3/10', cell_center)],
    [Paragraph('Shared Values', cell_style), Paragraph('3/10', cell_center)],
    [Paragraph('Style (Leadership)', cell_style), Paragraph('2/10', cell_center)],
    [Paragraph('Staff', cell_style), Paragraph('1/10', cell_center)],
    [Paragraph('Skills', cell_style), Paragraph('3/10', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(swot_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    '<b>The #1 vulnerability is "The Wrapper Problem":</b> OptoAI is almost certainly an LLM API wrapper with no proprietary '
    'moat. When OpenAI, Google, or Anthropic add native study assistant features, OptoAI becomes redundant '
    'overnight. The estimated timeline for this existential threat is 6-18 months.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 4: Marketing ──
story.append(add_heading('4. Marketing Analytics', styles['H1'], 0))
story.append(Paragraph(
    'The marketing audit reveals that marketing <b>does not exist as a function</b> within the organization. '
    'The company has no blog, no structured SEO strategy, no analytics tracking (zero Google Analytics, '
    'GTM, Facebook Pixel, or LinkedIn Insight Tag detected), no email marketing infrastructure, and negligible '
    'social media followings.', styles['Body']))

mkt_data = [
    [Paragraph('<b>Category</b>', header_style), Paragraph('<b>Score</b>', header_style)],
    [Paragraph('Brand Identity', cell_style), score_cell(6.5, 25), Paragraph('F', cell_center)],
    [Paragraph('Digital Marketing', cell_style), score_cell(4.5, 40), Paragraph('F', cell_center)],
    [Paragraph('Marketing Funnel', cell_style), score_cell(2.0, 20), Paragraph('F', cell_center)],
    [Paragraph('Content Strategy', cell_style), score_cell(1.5, 15), Paragraph('F', cell_center)],
    [Paragraph('<b>OVERALL</b>', header_style), score_cell(14.5, 100), Paragraph('F', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(mkt_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'The most critical finding: both websites are client-side rendered React SPAs with <b>zero server-side rendering</b>. '
    'Google crawlers literally see empty pages. Every subpage on Envision Bharat shares identical title and '
    'meta description (an explicit Google ranking violation). The single most impactful fix is implementing SSR.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 5: Social Media ──
story.append(add_heading('5. Social Media Audit', styles['H1'], 0))
story.append(Paragraph(
    'The social media presence scores a catastrophic <b>3/100 (Grade F-)</b>. Neither website contains a single '
    'link to any social media profile. LinkedIn has an estimated 27 followers. Instagram @optobharat has 345 '
    'followers across 105 posts. No YouTube channel, no Facebook page, no GitHub repository, no Product Hunt '
    'listing, and no Discord community were found.', styles['Body']))
story.append(Paragraph(
    'The most damning finding: the company actively prevents its own website visitors from discovering its '
    'social profiles by not linking to any of them. This is a fundamental digital hygiene failure that '
    'would cause any serious investor, partner, or customer to immediately question legitimacy.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 6: Technical/SEO ──
story.append(add_heading('6. Technical & SEO Audit', styles['H1'], 0))
story.append(Paragraph(
    'The technical audit reveals critical infrastructure failures on both sites. The most severe finding is '
    'OptoBharat\'s <b>4.49 MB uncompressed JavaScript bundle</b> - estimated to cause 8+ second load times on '
    'mobile. Envision Bharat scores higher (42/100 vs 28/100) due to proper Brotli compression, but '
    'both fail catastrophically on SEO.', styles['Body']))

tech_data = [
    [Paragraph('<b>Metric</b>', header_style), Paragraph('<b>OptoBharat</b>', header_style), Paragraph('<b>Envision Bharat</b>', header_style)],
    [Paragraph('Technical Score', cell_style), score_cell(28, 100), score_cell(42, 100)],
    [Paragraph('SEO Score', cell_style), score_cell(25, 100), score_cell(35, 100)],
    [Paragraph('Page Load Speed', cell_style), Paragraph('2/10', cell_center), Paragraph('6/10', cell_center)],
    [Paragraph('JS Bundle', cell_style), Paragraph('4.49 MB', cell_center), Paragraph('506 KB', cell_center)],
    [Paragraph('Compression', cell_style), Paragraph('NONE', cell_center), Paragraph('Brotli 4:1', cell_center)],
    [Paragraph('Security Headers', cell_style), Paragraph('0/7', cell_center), Paragraph('1/7', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(tech_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Both sites have zero security headers (no CSP, no X-Frame-Options, no X-Content-Type-Options). '
    'OptoBharat leaks x-powered-by: Express, sets access-control-allow-origin: *, and uses cookies without '
    'Secure/HttpOnly flags. All routes return HTTP 200 (soft 404s), polluting search indices.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 7: Competitors ──
story.append(add_heading('7. Competitive Analysis', styles['H1'], 0))
story.append(Paragraph(
    'OptoBharat faces a <b>competitive score of 3.5/10</b>, positioning it in the "bottom-left quadrant" of '
    'the competitive landscape - low brand trust AND unproven technology capability. The company fights '
    'multiple Goliaths on multiple fronts simultaneously.', styles['Body']))

threat_data = [
    [Paragraph('<b>Competitor</b>', header_style), Paragraph('<b>Threat</b>', header_style), Paragraph('<b>Why</b>', header_style)],
    [Paragraph('ChatGPT / OpenAI', cell_style), Paragraph('10/10', cell_center), Paragraph('80%+ students already use it', cell_style)],
    [Paragraph('PhysicsWallah', cell_style), Paragraph('9.5/10', cell_center), Paragraph('80M YouTube subs, cult brand trust', cell_style)],
    [Paragraph('Google Gemini', cell_style), Paragraph('9.5/10', cell_center), Paragraph('Pre-installed on Android', cell_style)],
    [Paragraph('Doubtnut (Allen)', cell_style), Paragraph('9/10', cell_center), Paragraph('Same demo, Allen backing', cell_style)],
    [Paragraph('Microsoft Copilot', cell_style), Paragraph('8.5/10', cell_center), Paragraph('Free for students via edu', cell_style)],
    [Paragraph('Petpooja (vs NexPOS)', cell_style), Paragraph('10/10', cell_center), Paragraph('30K+ restaurants', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(threat_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    '<b>The single most important recommendation: PICK ONE MARKET. Execute with extreme focus.</b> Building '
    'OptoAI, NexPOS, and KhaoJi simultaneously as a startup with no marketing is spreading zero resources '
    'across three zero-results efforts.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 8: Content/UX ──
story.append(add_heading('8. Content & UX Critique', styles['H1'], 0))
story.append(Paragraph(
    'The content quality scores <b>28/100</b> and UX scores <b>31/100</b>. The product copy is described as '
    '"buzzword soup" - every sentence is drenched in hyperbole with invented terminology like "neural synthesis," '
    '"cognitive retention," and "decentralized educational frameworks" that convey zero actual meaning. Four '
    'different voices exist across the two websites: The Silicon Valley Impersonator, The Cyberpunk Military, '
    'The Academic Fraud, and The Helpful Tutor.', styles['Body']))

story.append(Paragraph(
    'The UX has 10 identified fatal flaws including: Firebase configuration exposed in client-side JS, a 4.5MB JS '
    'bundle that kills mobile performance, zero SEO (invisible to crawlers), privacy policy claiming student data '
    'trains AI models without proper consent, broken SPA routing, Tailwind CDN in production, and '
    'a Weekly pricing plan that costs 72% more than the Pro plan for identical features.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 9: Rise & Fall ──
story.append(add_heading('9. Rise & Fall Tracker', styles['H1'], 0))
story.append(Paragraph(
    'The trajectory analysis assigns a <b>survival probability of 3/10</b>. The most likely trajectory (55% probability) '
    'is a slow fade: the founder continues part-time, transitions to other opportunities within 12-18 months, '
    'domains remain live but stagnant, and the company quietly shuts down within 2 years.', styles['Body']))

trajectory_data = [
    [Paragraph('<b>Scenario</b>', header_style), Paragraph('<b>Probability</b>', header_style), Paragraph('<b>Outcome</b>', header_style)],
    [Paragraph('Best Case', cell_style), Paragraph('15%', cell_center), Paragraph('Organic traction, angel round, survive to Series A', cell_style)],
    [Paragraph('Most Likely', cell_style), Paragraph('55%', cell_center), Paragraph('Slow fade, domains expire within 2 years', cell_style)],
    [Paragraph('Worst Case', cell_style), Paragraph('30%', cell_center), Paragraph('Cash burn, shutdown within 6-12 months', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(trajectory_data))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Monitoring signals to watch: founder profile appearing on LinkedIn, press coverage, Product Hunt launch, '
    'investor logos on website, social media accounts being linked, blog/content marketing published, mobile '
    'app store listings, and user reviews on third-party platforms. If none appear within 6 months, downgrade '
    'survival probability to 2/10.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 10: Brand Strategy ──
story.append(add_heading('10. Brand Strategy', styles['H1'], 0))
story.append(Paragraph(
    'The brand strategy scores a catastrophic <b>16/100 (Grade F-)</b>. The brand is described as a "brand frankenstein" - a '
    'parent company housing three completely unrelated products under one roof with zero architectural logic. '
    'The name "Opto" means "eyes/vision" (optometry), which is semantically disconnected from an AI study '
    'assistant. The internal Firebase project is named "rag-ai-53f35," revealing the brand was an afterthought.', styles['Body']))

story.append(Paragraph(
    'Fifteen specific brand strategy failures were identified, including: LIVE Razorpay API key exposed in '
    'client-side code, no brand guidelines document, no founder story or mission, "Bharat" nationalist '
    'branding without substance, multilingual support without cultural localization, and the "AI" suffix '
    'being the "kiss of death" in 2025. The recommendation is an immediate rebrand with product company '
    'separation and professional naming.', styles['Body']))

story.append(Spacer(1, 12))

# ── Agent 11: Revenue ──
story.append(add_heading('11. Revenue & Business Model', styles['H1'], 0))
story.append(Paragraph(
    'The revenue analysis scores <b>1.5/100 - the lowest score in the entire report</b>. This reflects a '
    'pre-revenue, pre-product-market-fit operation. The Razorpay integration on optobharat.com is confirmed to be '
    'still in <b>TEST MODE</b> - a detail that speaks volumes. Zero transactions have ever been processed.', styles['Body']))

story.append(Paragraph(
    'Revenue projections under the conservative scenario (most likely): INR 7,200-60,000/year ($86-$720) over '
    'three years - which is not a business, but a hobby with a Razorpay account. The moderate scenario '
    '(requires killing 2/3 of products + raising funding) projects INR 90 lakh to INR 4.5 crore by Year 3. '
    'Unit economics for OptoAI are theoretically viable (LTV:CAC of 4.5:1 to 42.4:1), but NexPOS and KhaoJi '
    'have fundamentally broken unit economics with LTV:CAC of 0.43:1 in the conservative scenario.', styles['Body']))

story.append(Spacer(1, 18))

# ── Recommendations ──
story.append(add_heading('12. Strategic Recommendations', styles['H1'], 0))
story.append(Paragraph(
    'Based on the comprehensive analysis from all 11 intelligence agents, the following prioritized '
    'recommendations are presented in order of impact:', styles['Body']))

story.append(add_heading('Phase 1: IMMEDIATE (This Week)', styles['H2'], 1))
recs_p1 = [
    'Rotate the exposed Razorpay LIVE API key - this is a security emergency',
    'Kill NexPOS and KhaoJi immediately - strategic suicide to run three products with no team',
    'Activate Razorpay LIVE mode by completing legal registration (Pvt Ltd)',
    'Add social media links to both website footers (takes 30 minutes)',
    'Install Google Analytics 4 on both sites - you cannot improve what you cannot measure',
    'Fix the privacy policy - create a proper, standalone, legally-reviewed document',
]
for r in recs_p1:
    story.append(Paragraph(f'- {r}', styles['Bullet']))

story.append(add_heading('Phase 2: SHORT-TERM (Weeks 2-4)', styles['H2'], 1))
recs_p2 = [
    'Implement server-side rendering (Next.js migration) - the single highest-impact technical change',
    'Fix all meta tags to be unique per page',
    'Fix the Weekly vs Pro pricing inconsistency',
    'Add JSON-LD structured data for Organization and Product schemas',
    'Create a proper 404 page with correct HTTP 404 status codes',
    'Remove Tailwind CDN and ESM CDN imports - build proper production bundles',
    'Reduce OptoBharat JS bundle from 4.49 MB to under 500 KB',
]
for r in recs_p2:
    story.append(Paragraph(f'- {r}', styles['Bullet']))

story.append(add_heading('Phase 3: MEDIUM-TERM (Months 2-3)', styles['H2'], 1))
recs_p3 = [
    'Launch a blog targeting Indian engineering students (4 posts/month minimum)',
    'Consolidate Instagram to ONE handle and post educational reels consistently',
    'Build LinkedIn to 500+ followers through founder thought leadership content',
    'Create YouTube product demo videos (highest ROI channel for SaaS conversion)',
    'Define clear pricing page with comparison table',
    'Get 100 beta users through direct college outreach',
    'Collect 10 testimonials from actual users',
    'Apply for Startup India registration for tax benefits and credibility',
]
for r in recs_p3:
    story.append(Paragraph(f'- {r}', styles['Bullet']))

story.append(add_heading('Phase 4: SCALE (Months 4-6)', styles['H2'], 1))
recs_p4 = [
    'Launch a referral program (students share with students)',
    'Build WhatsApp community for Indian student market',
    'Explore campus ambassador programs at engineering colleges in Gujarat',
    'Raise INR 25-50 lakh pre-seed from angel investors (requires traction first)',
    'Hire at least one education domain expert (even part-time/consultant)',
    'Build a mobile app or PWA - India is mobile-first',
    'Launch in Hindi to access 80%+ of the addressable market',
]
for r in recs_p4:
    story.append(Paragraph(f'- {r}', styles['Bullet']))

# ── Build PDF ──
doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
    leftMargin=1*inch, rightMargin=1*inch,
    topMargin=0.8*inch, bottomMargin=0.8*inch,
    title='OptoBharat Strategic Intelligence Report',
    author='FOCUSLINKS.IN',
    subject='Comprehensive Strategic Intelligence Analysis - OptoBharat / OptoAI / Envision Bharat')

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

doc = TocDocTemplate(OUTPUT, pagesize=A4,
    leftMargin=1*inch, rightMargin=1*inch,
    topMargin=0.8*inch, bottomMargin=0.8*inch,
    title='OptoBharat Strategic Intelligence Report',
    author='FOCUSLINKS.IN')

doc.multiBuild(story)
print(f"PDF generated: {OUTPUT}")
print(f"Size: {os.path.getsize(OUTPUT)/1024:.1f} KB")
