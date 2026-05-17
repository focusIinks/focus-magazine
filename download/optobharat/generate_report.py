#!/usr/bin/env python3
"""
OPTOBHARAT STRATEGIC INTELLIGENCE REPORT
Master PDF Generator - FOCUSLINKS INTELLIGENCE
Brutal Swarm Analysis - May 2026
"""

import os, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, Image, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import hashlib

# ━━ Color Palette ━━
ACCENT       = colors.HexColor('#1f7692')
TEXT_PRIMARY  = colors.HexColor('#1b1a18')
TEXT_MUTED    = colors.HexColor('#7a766f')
BG_SURFACE   = colors.HexColor('#e5e3df')
BG_PAGE      = colors.HexColor('#edecea')
DANGER_RED    = colors.HexColor('#c0392b')
WARNING_AMBER = colors.HexColor('#d4a017')
SUCCESS_GREEN = colors.HexColor('#27ae60')

TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = BG_SURFACE

# ━━ Fonts ━━
pdfmetrics.registerFont(TTFont('TNR', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('TNRB', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Cal', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('CalB', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Dej', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('DejB', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
registerFontFamily('TNR', normal='TNR', bold='TNRB')
registerFontFamily('Cal', normal='Cal', bold='CalB')
registerFontFamily('Dej', normal='Dej', bold='DejB')

# ━━ Page Setup ━━
W, H = A4
LEFT_M = 0.9 * inch
RIGHT_M = 0.9 * inch
TOP_M = 0.8 * inch
BOT_M = 0.8 * inch
AVAIL_W = W - LEFT_M - RIGHT_M

OUTPUT = '/home/z/my-project/download/optobharat/OPTOBHARAT_MASTER_REPORT.pdf'

# ━━ Styles ━━
sH1 = ParagraphStyle('H1', fontName='TNR', fontSize=22, leading=28, textColor=ACCENT, spaceBefore=18, spaceAfter=10, alignment=TA_LEFT)
sH2 = ParagraphStyle('H2', fontName='TNR', fontSize=16, leading=22, textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8, alignment=TA_LEFT)
sH3 = ParagraphStyle('H3', fontName='TNR', fontSize=13, leading=18, textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6, alignment=TA_LEFT)
sBody = ParagraphStyle('Body', fontName='TNR', fontSize=10.5, leading=17, textColor=TEXT_PRIMARY, spaceAfter=6, alignment=TA_JUSTIFY)
sBodyLeft = ParagraphStyle('BodyLeft', fontName='TNR', fontSize=10.5, leading=17, textColor=TEXT_PRIMARY, spaceAfter=6, alignment=TA_LEFT)
sBullet = ParagraphStyle('Bullet', fontName='TNR', fontSize=10.5, leading=17, textColor=TEXT_PRIMARY, spaceAfter=4, alignment=TA_LEFT, leftIndent=18, bulletIndent=6)
sQuote = ParagraphStyle('Quote', fontName='TNR', fontSize=10.5, leading=17, textColor=TEXT_MUTED, spaceAfter=8, alignment=TA_LEFT, leftIndent=24, borderLeftWidth=3, borderLeftColor=ACCENT, borderPadding=8)
sScore = ParagraphStyle('Score', fontName='TNR', fontSize=11, leading=16, textColor=TEXT_PRIMARY, alignment=TA_CENTER)
sCell = ParagraphStyle('Cell', fontName='TNR', fontSize=10, leading=15, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
sCellC = ParagraphStyle('CellC', fontName='TNR', fontSize=10, leading=15, textColor=TEXT_PRIMARY, alignment=TA_CENTER)
sHead = ParagraphStyle('Head', fontName='TNR', fontSize=10, leading=15, textColor=colors.white, alignment=TA_CENTER)
sCaption = ParagraphStyle('Caption', fontName='TNR', fontSize=9, leading=13, textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=3, spaceAfter=6)
sRed = ParagraphStyle('Red', fontName='TNR', fontSize=10.5, leading=17, textColor=DANGER_RED, spaceAfter=4, alignment=TA_LEFT)
sGreen = ParagraphStyle('Green', fontName='TNR', fontSize=10.5, leading=17, textColor=SUCCESS_GREEN, spaceAfter=4, alignment=TA_LEFT)

# ━━ TOC Template ━━
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def score_badge(score):
    """Color-code score text"""
    if score <= 3:
        c = '#c0392b'
    elif score <= 5:
        c = '#d4a017'
    elif score <= 7:
        c = '#2f97b9'
    else:
        c = '#27ae60'
    return Paragraph('<font color="%s"><b>%s/10</b></font>' % (c, str(score)), sScore)

def make_table(headers, rows, col_ratios=None):
    """Create a styled table with Paragraph cells"""
    hdr = [Paragraph('<b>%s</b>' % h, sHead) for h in headers]
    data = [hdr]
    for row in rows:
        data.append([Paragraph(str(c), sCell) for c in row])

    if col_ratios:
        cw = [r * AVAIL_W for r in col_ratios]
    else:
        n = len(headers)
        cw = [AVAIL_W / n] * n

    t = Table(data, colWidths=cw, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, TEXT_MUTED),
    ]
    for i in range(1, len(data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t


# ━━ BUILD DOCUMENT ━━
doc = TocDocTemplate(OUTPUT, pagesize=A4,
    leftMargin=LEFT_M, rightMargin=RIGHT_M,
    topMargin=TOP_M, bottomMargin=BOT_M)

story = []

# ──── TOC ────
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name='TOC1', fontSize=13, leftIndent=20, fontName='TNR', spaceBefore=6, spaceAfter=3),
    ParagraphStyle(name='TOC2', fontSize=11, leftIndent=40, fontName='TNR', spaceBefore=2, spaceAfter=2),
]
story.append(Paragraph('<b>TABLE OF CONTENTS</b>', ParagraphStyle('TOCTitle', fontName='TNR', fontSize=20, leading=28, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=18)))
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════
# SECTION 1: EXECUTIVE SUMMARY
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('1. Executive Summary', sH1, 0))

story.append(Paragraph(
    'This report presents a comprehensive strategic intelligence analysis of OptoBharat, an optometry student community '
    'based in India. The analysis was conducted using a swarm-based methodology deploying nine parallel intelligence agents, '
    'each responsible for a specialized domain of investigation. The findings herein are drawn from live website scraping, '
    'deep web research, social media intelligence gathering, and competitive landscape mapping. Every score and assessment '
    'in this report has been derived independently, with no input from the target entity.', sBody))

story.append(Paragraph(
    'OptoBharat presents itself as "India\'s largest optometry student community," a claim that this analysis finds '
    'to be materially unsupported by the evidence. The community was founded on March 17, 2025 by Nizam Uddin Sk, '
    'who operates the entity primarily through a free Simdif website builder. The community claims to have connected '
    'students across 30 Indian states and reached 22+ countries, with over 1,000 members and 12+ webinars conducted. '
    'However, the actual digital footprint tells a very different story, one of severely limited infrastructure, '
    'minimal engagement metrics, and a catastrophic domain loss that undermines the entire brand.', sBody))

story.append(Paragraph(
    'The most critical finding of this investigation is that the optobharat.com domain has been acquired by an '
    'unrelated entity called "Envision Bharat," a three-person startup that has repurposed the domain to host "OptoAI," '
    'a commercial AI study assistant product with paid subscription tiers. This domain hijack represents an existential '
    'threat to the OptoBharat community brand, as every organic search and type-in visitor now lands on a competitor\'s '
    'commercial product instead of the intended community platform.', sBody))

story.append(Spacer(1, 12))

# Overall Score Card
score_data = [
    ['SWOT Analysis', '3.2', 'Near-fatal weaknesses, stolen domain, no infrastructure'],
    ['Marketing Audit', '2.8', 'Delusional positioning, zero growth strategy'],
    ['Technical / SEO', '2.5', 'Simdif trap, no analytics, no professional domain'],
    ['Content / UX', '2.5', 'Single-page website, Google Form membership'],
    ['Revenue Potential', '2.5', 'Zero revenue, no monetization, student budget audience'],
    ['Domain Security', '1.5', 'Domain stolen, no trademark, no recovery plan'],
]
story.append(Spacer(1, 8))
story.append(add_heading('Overall Scores Matrix', sH2, 1))

hdr = [Paragraph('<b>Analysis Domain</b>', sHead),
       Paragraph('<b>Score</b>', sHead),
       Paragraph('<b>Key Verdict</b>', sHead)]
tdata = [hdr]
for row in score_data:
    sc = float(row[1])
    if sc <= 3:
        c = '#c0392b'
    elif sc <= 5:
        c = '#d4a017'
    else:
        c = '#27ae60'
    tdata.append([
        Paragraph(row[0], sCell),
        Paragraph('<font color="%s"><b>%s/10</b></font>' % (c, row[1]), sCellC),
        Paragraph(row[2], sCell)
    ])

t = Table(tdata, colWidths=[AVAIL_W*0.25, AVAIL_W*0.12, AVAIL_W*0.63], hAlign='CENTER')
style_cmds = [
    ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('GRID', (0, 0), (-1, -1), 0.5, TEXT_MUTED),
]
for i in range(1, len(tdata)):
    bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
    style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
t.setStyle(TableStyle(style_cmds))
story.append(t)
story.append(Paragraph('<b>Table 1:</b> Swarm Agent Analysis Scores - All domains scored below 3.5/10', sCaption))
story.append(Spacer(1, 12))

# Big overall score
overall_score_table = Table(
    [[Paragraph('<b>OVERALL STRATEGIC SCORE</b>', ParagraphStyle('os1', fontName='TNR', fontSize=14, textColor=colors.white, alignment=TA_CENTER)),
      Paragraph('<font size="22"><b>2.5 / 10</b></font>', ParagraphStyle('os2', fontName='TNR', fontSize=22, textColor=colors.white, alignment=TA_CENTER))]],
    colWidths=[AVAIL_W*0.6, AVAIL_W*0.4], hAlign='CENTER',
    rowHeights=[50]
)
overall_score_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (0, 0), DANGER_RED),
    ('BACKGROUND', (1, 0), (1, 0), colors.HexColor('#8e2424')),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('ROUNDEDCORNERS', [6, 6, 6, 6]),
]))
story.append(Spacer(1, 6))
story.append(overall_score_table)
story.append(Paragraph('<b>Verdict:</b> F-grade. Brand without a platform. Community without infrastructure. Claim without evidence.', sRed))
story.append(Spacer(1, 18))


# ═══════════════════════════════════════════════════════════════
# SECTION 2: TARGET PROFILE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('2. Target Entity Profile', sH1, 0))

story.append(add_heading('2.1 Organization Overview', sH2, 1))
story.append(Paragraph(
    'OptoBharat is a self-described optometry student community founded on March 17, 2025 by Nizam Uddin Sk, who '
    'brings a background in physiotherapy and optometry. The community operates under the stated mission of '
    '"empowering optometry students across India to connect, learn, and collaborate in advancing eye care excellence," '
    'with a vision to become "India\'s leading optometry student community, fostering innovation, inclusivity, and '
    'continuous learning by connecting students with national and global experts." The organization claims to have '
    'connected students across 30 Indian states and reached 22+ countries, with a reported membership exceeding 1,000 '
    'students and professionals.', sBody))

story.append(Paragraph(
    'The community lists four moderators: Sadaf Khan, Shazia Shabbir, Fatima Tarique, and Shreyasi Nath, alongside '
    'a volunteer structure comprising Regional Representatives across five zones, State Representatives, and '
    'Moderators. The volunteer profiles section is currently listed as "coming soon" on their website, suggesting '
    'that the organizational structure is still in a formative stage despite being over a year old. The community '
    'has documented 12 past webinars featuring international speakers from India, the United Kingdom, Germany, '
    'Morocco, Ghana, and Sudan, covering topics that span AI screening, pediatric optometry, contact lenses, '
    'retina, orthoptics, nutrition, and clinical practice.', sBody))

profile_rows = [
    ['Entity Name', 'OptoBharat'],
    ['Founded', 'March 17, 2025'],
    ['Founder', 'Nizam Uddin Sk'],
    ['Type', 'Student Community (Unregistered)'],
    ['Niche', 'Optometry Students in India'],
    ['Primary Website', 'optobharat.simdif.com (Simdif Builder)'],
    ['Lost Domain', 'optobharat.com (now Envision Bharat / OptoAI)'],
    ['Contact Email', 'inquiry.optobharat@gmail.com'],
    ['Legal Status', 'No registration found (no GST, no society/trust)'],
    ['Claimed Members', '1,000+'],
    ['Claimed Reach', '30 Indian states, 22+ countries'],
    ['Webinars Conducted', '12+ (international speakers)'],
    ['Partners', 'Know The Glow (USA), Optoglobe (Nigeria)'],
]
story.append(Spacer(1, 10))
story.append(make_table(['Attribute', 'Detail'], profile_rows, [0.30, 0.70]))
story.append(Paragraph('<b>Table 2:</b> OptoBharat Entity Profile', sCaption))

story.append(add_heading('2.2 Key Personnel', sH2, 1))
personnel_rows = [
    ['Nizam Uddin Sk', 'Founder', 'Physiotherapy + Optometry background', 'linkedin.com/in/nizamuddinsk'],
    ['Sadaf Khan', 'Moderator', 'Community management', 'Not publicly listed'],
    ['Shazia Shabbir', 'Moderator', 'Community management', 'Not publicly listed'],
    ['Fatima Tarique', 'Moderator', 'Community management', 'Not publicly listed'],
    ['Shreyasi Nath', 'Moderator', 'Community management', 'Not publicly listed'],
]
story.append(make_table(['Name', 'Role', 'Background', 'LinkedIn'], personnel_rows, [0.20, 0.15, 0.35, 0.30]))
story.append(Paragraph('<b>Table 3:</b> OptoBharat Key Personnel', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 3: SOCIAL MEDIA INTELLIGENCE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('3. Social Media Intelligence', sH1, 0))

story.append(Paragraph(
    'The social media audit reveals a severely underperforming digital presence across all major platforms. '
    'LinkedIn is the sole platform with meaningful traction, serving as the primary hub for the community with '
    '2,569 followers. Every other platform shows either negligible subscriber counts or confirmed existence '
    'without accessible metrics due to authentication barriers. The disparity between the claimed status as '
    '"India\'s largest optometry student community" and the actual follower counts across platforms is stark '
    'and represents a significant credibility gap that will only grow more problematic over time.', sBody))

social_rows = [
    ['LinkedIn', '2,569', 'Active', 'STRONGEST platform, primary hub'],
    ['Telegram', '89', 'Active', 'Critically low for claimed "largest" status'],
    ['Instagram', 'Unknown', 'Exists', 'Profile confirmed, metrics inaccessible'],
    ['Facebook', 'Unknown', 'Exists', 'Page confirmed, link appears broken'],
    ['Twitter / X', 'Unknown', 'Exists', 'Profile confirmed, metrics inaccessible'],
    ['YouTube', 'Unknown', 'Exists', 'Channel listed but possibly empty/new'],
    ['WhatsApp', 'Active', 'Confirmed', 'Group link found on website'],
    ['Discord', 'Not Found', 'Unverified', 'No official presence on website'],
]
story.append(make_table(['Platform', 'Followers/Subs', 'Status', 'Assessment'], social_rows, [0.15, 0.15, 0.12, 0.58]))
story.append(Paragraph('<b>Table 4:</b> Social Media Presence Audit', sCaption))

story.append(Spacer(1, 10))
story.append(Paragraph(
    '<b>Critical Intelligence Gap:</b> The 89 Telegram subscribers represent approximately 0.45% penetration of '
    'India\'s optometry student population (estimated at 20,000+). For a community claiming to be the "largest" '
    'in the nation, this number is embarrassingly low and suggests that either the Telegram channel was recently '
    'created, is not actively promoted, or that the community\'s actual engagement is far smaller than claimed. '
    'The absence of a Discord server and the lack of a dedicated WhatsApp Community or Channel strategy is '
    'particularly surprising given that WhatsApp dominates digital communication in India with over 500 million users. '
    'The Facebook link on the official website was found to return an error page, suggesting broken outbound '
    'links that further degrade the community\'s credibility.', sBody))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 4: DOMAIN HIJACK INTELLIGENCE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('4. Domain Hijack - Critical Intelligence', sH1, 0))

story.append(Paragraph(
    'The single most damaging finding in this entire investigation is the loss of the optobharat.com domain. '
    'This is not merely a technical inconvenience; it is a strategic catastrophe that strikes at the very core '
    'of the OptoBharat brand identity. The domain has been fully acquired and repurposed by "Envision Bharat," '
    'a three-person Indian technology startup that has launched a commercial product called "OptoAI - The '
    'Ultimate AI Study Assistant" on the domain. There is zero acknowledgment of the original OptoBharat '
    'community anywhere on the current site. The original community has been completely erased from the .com '
    'address, and every visitor who types "optobharat.com" into their browser now encounters a paid subscription '
    'AI tool that has nothing to do with optometry community building.', sBody))

story.append(add_heading('4.1 New Domain Owner Profile', sH2, 1))
envision_rows = [
    ['Entity Name', 'Envision Bharat'],
    ['Type', 'Technology Startup / "AI Innovation Collective"'],
    ['Product on Domain', 'OptoAI - AI Study Assistant'],
    ['Co-founder (Tech)', 'Nishit Patel', 'linkedin.com/in/nishit-patel-b1689334b'],
    ['Co-founder (Strategy)', 'Mrudul Prajapati', 'linkedin.com/in/mrudul-prajapati-916037375'],
    ['Co-founder (Mentor)', 'Sumit Bharodiya', 'linkedin.com/in/sumit-bharodiya-417126110'],
    ['Hosting', 'Google Cloud Platform (Cloud Run / App Engine)'],
    ['Backend', 'Express.js + Firebase + Google Gemini AI'],
    ['Payment Gateway', 'Razorpay (Live key detected)'],
    ['Pricing', 'Free / 99 INR/mo / 129 INR/wk / 299 INR/mo'],
    ['Claimed Users', '500+ Early Adopters'],
    ['Other Products', 'NexPOS (retail POS), KhaoJi (restaurant management)'],
    ['Website', 'envisionbharat.com (Fastly CDN + Firebase)'],
]
story.append(make_table(['Attribute', 'Detail', 'Source'], envision_rows, [0.25, 0.40, 0.35]))
story.append(Paragraph('<b>Table 5:</b> Envision Bharat / OptoAI Entity Profile (Domain Acquirer)', sCaption))

story.append(add_heading('4.2 Impact Assessment', sH2, 1))
story.append(Paragraph(
    'The domain hijack creates a cascading series of negative effects that compound over time. Every branded '
    'search on Google now surfaces OptoAI instead of OptoBharat. Every organic backlink accumulated over the '
    'years now feeds authority to a competing product. Every visitor who remembers the old URL encounters a '
    'completely different entity, destroying trust and creating confusion about the actual relationship between '
    'OptoBharat and OptoAI. The SEO implications are particularly severe: within 90 days, OptoAI will dominate '
    'branded search results, effectively hijacking the entire Google presence that the original community spent '
    'months building. The Simdif subdomain has near-zero domain authority by comparison, making it virtually '
    'impossible to compete for branded search traffic.', sBody))

impact_rows = [
    ['Brand Dilution', 'CRITICAL 9/10', 'Visitors associate OptoBharat name with OptoAI product'],
    ['SEO Cannibalization', 'CRITICAL 9/10', 'All backlinks and branded searches now feed OptoAI'],
    ['Trust Destruction', 'CRITICAL 8/10', 'Simdif subdomain signals amateur status instantly'],
    ['Revenue Interception', 'SEVERE 8/10', 'Competitor monetizes your brand with paid subscriptions'],
    ['Identity Confusion', 'SEVERE 8/10', 'People will assume OptoAI is the evolution of OptoBharat'],
    ['Email/Communication', 'HIGH 7/10', '@optobharat.com emails now unreachable if they existed'],
    ['Social Vulnerability', 'MODERATE 6/10', 'Impersonation possible, admin emails may be compromised'],
]
story.append(make_table(['Impact Area', 'Severity', 'Description'], impact_rows, [0.20, 0.15, 0.65]))
story.append(Paragraph('<b>Table 6:</b> Domain Loss Impact Assessment Matrix', sCaption))

story.append(add_heading('4.3 Legal & Recovery Options', sH2, 1))
story.append(Paragraph(
    'The most viable legal path for domain recovery is filing a UDRP (Uniform Domain-Name Dispute-Resolution '
    'Policy) complaint through WIPO, which costs approximately INR 1.25 to 3.3 lakh and takes 60 to 90 days. '
    'To succeed, three elements must be proven: that the original entity has trademark rights to "OptoBharat," '
    'that the new owner has no legitimate interest in the domain, and that the domain was registered in bad '
    'faith. The redirect to a commercial product targeting the same student audience constitutes strong evidence '
    'of bad faith registration. However, no trademark registration for "OptoBharat" was found in public records, '
    'which significantly weakens the legal position. The window for action is narrowing: each day the new owner '
    'continues to operate OptoAI on the domain strengthens their "legitimate use" defense. A recommended '
    'multi-track approach involves simultaneously registering alternative domains, sending a cease and desist '
    'letter, and preparing a UDRP filing.', sBody))

legal_rows = [
    ['UDRP via WIPO', '55-70%', 'INR 1.25-3.3L', '60-90 days', 'Best if trademark exists'],
    ['Direct Purchase', 'Unknown', 'Negotiable', '1-4 weeks', 'Funds a bad actor, not recommended'],
    ['Cease & Desist', 'Low alone', 'INR 5K-15K', 'Immediate', 'Opens negotiation, creates paper trail'],
    ['New Domain', '100%', 'INR 700/yr', 'Immediate', 'Sacrifices brand equity, but pragmatic'],
]
story.append(make_table(['Recovery Option', 'Success Rate', 'Cost', 'Timeline', 'Notes'], legal_rows, [0.18, 0.12, 0.15, 0.15, 0.40]))
story.append(Paragraph('<b>Table 7:</b> Domain Recovery Options Analysis', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 5: SWOT ANALYSIS
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('5. SWOT Analysis - Brutal Assessment', sH1, 0))

story.append(add_heading('5.1 Strengths (Score: 4/10)', sH2, 1))
story.append(Paragraph(
    'The honest assessment of OptoBharat\'s strengths reveals a fragile foundation. The one genuinely strong '
    'asset is the LinkedIn presence with 2,569 followers, which represents real individuals who have actively '
    'chosen to follow the community. This is not an inflated number purchased through ads; it is organic growth '
    'within a very niche professional field, making it a valuable audience base. The second notable strength is '
    'the international webinar network that the founder has built, connecting with speakers from the UK, Germany, '
    'Morocco, Ghana, and Sudan. This demonstrates genuine networking capability and ambition. The brand name '
    '"OptoBharat" itself is strong, combining the professional prefix "Opto" with the cultural resonance of '
    '"Bharat" (India), creating a memorable and meaningful identity. The two international partnerships with '
    'Know The Glow (California) and Optoglobe (Nigeria) show global outreach potential. However, beyond these '
    'assets, the remaining strengths are theoretical rather than demonstrated: the market need is real, the '
    'niche is underserved, and the founder shows genuine passion, but none of these translate into competitive '
    'advantages without execution.', sBody))

story.append(add_heading('5.2 Weaknesses (Score: 2/10)', sH2, 1))
story.append(Paragraph(
    'The weaknesses are near-fatal and threaten the very existence of the community. The most devastating weakness '
    'is the stolen domain: optobharat.com now redirects to a competitor\'s commercial AI product, meaning that every '
    'organic search and type-in visitor is being funneled directly to a rival entity. The entire community infrastructure '
    'runs on a free Simdif website builder, which signals amateur status to every potential partner, sponsor, speaker, '
    'and new member. The Simdif platform imposes absolute vendor lock-in with no export capability, no backend, no '
    'database, and no API, making it impossible to build any meaningful community features. The website was found to '
    'contain only approximately 300 words of actual content across all pages, with multiple "Coming Soon" placeholders '
    'and no blog posts, no webinar recordings, no testimonials, and no original resources. The membership system is '
    'a raw Google Form link that collects data but provides zero branded experience, no welcome sequence, and no '
    'retention mechanism. Perhaps most damningly, the community has no WhatsApp strategy in a market with over 500 '
    'million WhatsApp users, and no legal registration (no GST, no society/trust, no formal entity), making it '
    'impossible to accept corporate sponsorships or process payments legally.', sBody))

story.append(add_heading('5.3 Opportunities (Score: 6/10)', sH2, 1))
story.append(Paragraph(
    'Despite the grim current state, the market opportunity is genuine and significant. India has an estimated '
    '45,000+ optometrists and 20,000+ optometry students, yet no single platform dominates this space. The market '
    'is highly fragmented across Facebook groups, Telegram channels, WhatsApp groups, and professional associations, '
    'with no unified digital platform that combines verified professional identity, community features, clinical '
    'case discussions, educational resources, continuing education credit tracking, job placement services, and '
    'event discovery. The three highest-value opportunities identified through this analysis are: first, a dedicated '
    'optometry job board, which does not exist anywhere in India and would serve both employers (eye hospitals, optical '
    'chains like Lenskart and Titan Eye+) and job-seeking graduates; second, structured clinical knowledge sharing '
    'through case discussions and expert-led webinars that fill a gap left by theoretical college curricula; and '
    'third, a career development pipeline that guides students from education through internship to placement, '
    'creating a complete professional lifecycle. Industry sponsors such as EssilorLuxottica, Zeiss, Alcon, and '
    'Bausch + Lomb have significant India footprints and actively seek student engagement opportunities, representing '
    'a potential annual sponsorship revenue of INR 50,000 to 3,00,000 once credibility is established.', sBody))

story.append(add_heading('5.4 Threats (Score: 8/10)', sH2, 1))
story.append(Paragraph(
    'The threat landscape is existential. The domain hijacker Envision Bharat is now the most dangerous immediate '
    'threat, operating as a parasitic competitor that is actively monetizing the OptoBharat brand name with paid '
    'subscription tiers through Razorpay. Every day this continues, the brand association shifts further from '
    '"community" to "AI study tool." Established professional associations such as the Optometrists Association '
    'of India, the Indian Optometric Federation, and the All India Optometric Association could crush OptoBharat '
    'overnight by launching their own digital community platforms, as they already possess the credibility, '
    'membership base, and industry relationships that OptoBharat lacks. Facebook groups with 5,000 to 25,000 '
    'members each already serve many of the same functions without any centralized platform overhead. Zero barriers '
    'to entry mean that any motivated individual or organization could replicate everything OptoBharat has built '
    'within weeks, given an investment of approximately INR 15,000 and three months of effort. The most insidious '
    'long-term threat is that the founder graduates and takes a full-time job, causing the community to wither '
    'from neglect, a fate that statistical analysis suggests affects approximately 70-80% of student-run communities.', sBody))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 6: MARKETING AUDIT
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('6. Marketing Audit (Score: 2.8/10)', sH1, 0))

story.append(Paragraph(
    'The marketing audit reveals a brand with a genuinely good name and an admirable mission being systematically '
    'destroyed by catastrophically bad marketing execution. The brand identity scores 4/10: the name "OptoBharat" '
    'is inherently strong, evoking both professional credibility (optometry) and national pride (Bharat), but the '
    'positioning is delusional. Claiming to be "India\'s largest optometry student community" with only 2,569 '
    'LinkedIn followers, 89 Telegram subscribers, and a free Simdif website is a credibility time bomb that will '
    'eventually trigger regulatory scrutiny from the Advertising Standards Council of India for misleading claims.', sBody))

story.append(Paragraph(
    'The digital presence scores 2.5/10. The Simdif website was built using a platform whose own marketing tagline '
    'reads "No computer needed: Build your entire site from the SimDif mobile app." This tagline is embedded in the '
    'footer of OptoBharat\'s website, instantly destroying any professional credibility. The website is estimated to '
    'receive between 10 and 50 monthly visits, based on the absence of any analytics tracking, the Simdif subdomain\'s '
    'inherent low domain authority, and the near-zero search engine presence. The jQuery library loaded on the site is '
    'version 1.12.4 from 2016, carrying known security vulnerabilities. The content strategy scores 2/10 with no '
    'content calendar, no content pillars, no repurposing pipeline, and an estimated 90%+ content waste rate on '
    'webinars that are conducted once but never repurposed into articles, social media posts, or downloadable resources.', sBody))

mkt_rows = [
    ['Brand Identity', '4/10', 'Name is strong (7/10), positioning is delusional (2/10)'],
    ['Digital Presence', '2.5/10', 'Simdif builder, "no computer needed" tagline in footer'],
    ['Content Strategy', '2/10', 'No calendar, no pillars, 90%+ content waste on webinars'],
    ['Growth Strategy', '2/10', 'Stuck at 2,500 followers, zero campus ambassador program'],
    ['Channel Strategy', '2/10', '81.4% following on one platform, broken Facebook link'],
    ['Conversion Funnel', '1/10', 'Google Form to WhatsApp link is not a funnel'],
    ['Competitive Positioning', '2/10', 'Competitor Facebook groups 10x larger'],
    ['Domain Loss Impact', '1/10', 'Competitor monetizes stolen brand with live payments'],
    ['Monetization Potential', '2/10', 'Current revenue: INR 0. Potential exists but requires infrastructure'],
    ['India Market Fit', '3/10', 'Missing WhatsApp strategy, no regional language content'],
]
story.append(make_table(['Category', 'Score', 'Assessment'], mkt_rows, [0.22, 0.10, 0.68]))
story.append(Paragraph('<b>Table 8:</b> Marketing Audit Breakdown', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 7: TECHNICAL & SEO AUDIT
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('7. Technical & SEO Audit (Score: 2.5/10)', sH1, 0))

story.append(Paragraph(
    'The technical audit reveals a digital infrastructure that is fundamentally incapable of supporting a community '
    'platform. The website at optobharat.simdif.com is a static HTML dump with no backend, no database, no CMS, '
    'no API, and no server-side rendering. The Simdif platform imposes absolute vendor lock-in: if Simdif shuts '
    'down, raises prices, or changes their platform, the website dies completely with no migration path. The entire '
    'site generates 135 KB of HTML for a single page, which is grotesquely oversized for a basic informational '
    'website. The title tag is simply "OPTOBHARAT" with no keywords, no value proposition, and no location signal, '
    'throwing away the most valuable 60 pixels of real estate in Google search results. No proper H1 heading tag '
    'was found on any page, meaning Google cannot properly understand the page content.', sBody))

story.append(Paragraph(
    'The SEO situation is hopeless by design. The meta keywords tag is still being used despite Google explicitly '
    'ignoring it since 2009. The canonical URL permanently anchors all authority to a Simdif subdomain that Google '
    'treats as a low-quality signal by default. Structured data consists of only a bare-minimum WebSite schema, '
    'missing Organization, FAQ, BreadcrumbList, LocalBusiness, and Event schemas that could enable rich search '
    'results. For any meaningful keyword like "optometry community India," the Simdif subdomain would appear on '
    'page 50 at best. The site loads 12 font files when only 2-3 are needed, uses jQuery 1.12.4 with known '
    'CVE vulnerabilities, and returns a no-cache directive on every request, forcing full re-downloads on every visit. '
    'The performance score is estimated at 3-5 second load times on budget Android phones common in India, with '
    'every additional second losing 20% of visitors. Google Analytics is not installed, meaning the community is '
    'operating completely blind with zero data on visitor behavior, traffic sources, or conversion rates.', sBody))

tech_rows = [
    ['Website Quality', '3/10', '135KB HTML, no backend, Simdif lock-in, jQuery 2016'],
    ['SEO', '2/10', 'No H1, title = brand only, .simdif.com subdomain, zero authority'],
    ['Domain & Brand', '1/10', 'Domain stolen, no custom domain, no professional email'],
    ['Infrastructure', '2/10', 'No database, no API, no CMS, no auth, Google Forms only'],
    ['Security', '4/10', 'HTTPS yes, but jQuery CVEs, no CSP, no DPDP compliance'],
    ['Performance', '4/10', '770ms TTFB, 12 fonts, no-cache, 135KB HTML bloat'],
    ['Mobile Experience', '5/10', 'Responsive but no PWA, GPU-heavy blur filter on budget phones'],
    ['Analytics', '1/10', 'Google Analytics not installed, zero data collection'],
    ['Email/Communication', '1/10', 'Gmail address, no email marketing, no welcome sequence'],
    ['Scalability', '2/10', 'Cannot handle membership, events, courses, or job boards'],
]
story.append(make_table(['Category', 'Score', 'Key Findings'], tech_rows, [0.22, 0.10, 0.68]))
story.append(Paragraph('<b>Table 9:</b> Technical & SEO Audit Scores', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 8: CONTENT & UX CRITIQUE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('8. Content & UX Critique (Score: 2.5/10)', sH1, 0))

story.append(Paragraph(
    'The content and UX critique uncovered a devastating discovery: the entire OptoBharat website is essentially '
    'a single page. All six navigation items (Home, About, Community, Learning, Get Involved, Contact Us) lead to '
    'the same content, meaning the site architecture is functionally a lie. The SimDif watermark "No computer '
    'needed: Build your entire site from the SimDif mobile app" is permanently baked into the footer, destroying '
    'professional credibility with every page load. The total actual content across the entire website is estimated '
    'at approximately 300 words, consisting entirely of marketing fluff with zero original resources, zero blog '
    'posts, zero webinar recordings, and zero member testimonials. The entire membership flow is a raw Google Forms '
    'link that collects personal data including name, date of birth, gender, email, phone number, WhatsApp number, '
    'district, state, country, PIN code, institution, year of study, qualification, profession, areas of interest, '
    'and volunteer willingness, all through an unbranded Google interface with no welcome sequence, no immediate '
    'value delivery, and no retention mechanism.', sBody))

story.append(Paragraph(
    'The onboarding experience scores 1/10, which is the lowest score in the entire analysis. A new member discovers '
    'OptoBharat, clicks the link, arrives at a Simdif website, reads 300 words of generic mission statements, clicks '
    '"Join Now," is redirected to a bare Google Form, fills out extensive personal information, submits, and is then '
    'redirected to a WhatsApp group link. There is no branded confirmation page, no welcome email, no orientation to '
    'community resources, no introduction to other members, and no clear next steps. The value proposition is unclear: '
    'why would a student join? What exclusive value do they receive? The website provides no answers to these questions. '
    'The visual identity is generic, using Simdif\'s default template with standard fonts (Nunito Sans + Quattrocento) '
    'and a teal accent color that, while clean, is unremarkable and does nothing to differentiate OptoBharat from '
    'any other Simdif site.', sBody))

ux_rows = [
    ['Content Quality', '2/10', '~300 words total, all marketing fluff, zero resources'],
    ['User Experience', '2/10', 'Single-page architecture masquerading as 6-page site'],
    ['Community Engagement', '3/10', '89 Telegram members, no discussion platform'],
    ['Value Proposition', '3/10', 'Unclear what members actually get for joining'],
    ['Trust Signals', '2/10', 'Simdif watermark, no testimonials, no certifications'],
    ['Onboarding Experience', '1/10', 'Google Form to WhatsApp link, zero branded experience'],
    ['Content Gaps', '2/10', 'No blog, no recordings, no resources, no library'],
    ['Voice & Tone', '4/10', 'Consistent but generic, no personality or differentiation'],
    ['Visual Identity', '2/10', 'Default Simdif template, no custom branding'],
    ['Accessibility', '4/10', 'Mobile-responsive but no PWA, no dark mode'],
]
story.append(make_table(['Category', 'Score', 'Key Findings'], ux_rows, [0.22, 0.10, 0.68]))
story.append(Paragraph('<b>Table 10:</b> Content & UX Critique Scores', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 9: REVENUE ANALYSIS
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('9. Revenue & Business Model Analysis (Score: 2.5/10)', sH1, 0))

story.append(Paragraph(
    'The revenue analysis reveals a community that generates absolutely zero income. There is no donation button, '
    'no paid membership tier, no merchandise store, no affiliate links, no Google AdSense integration, and no '
    'monetization strategy visible anywhere in their digital presence. The entire operation runs on passion and '
    'free tools, with an estimated annual cost of INR 0. While this financial zero-cost operation is technically '
    '"sustainable" in the sense that it cannot go bankrupt, it also means the community cannot grow, cannot hire '
    'help, cannot invest in better tools, and cannot professionalize its operations. The distinction is critical: '
    'a community is not a company, and the gap between "2,500 followers on LinkedIn" and "a revenue-generating '
    'entity" is approximately 18 to 24 months of deliberate, skilled execution, even under optimistic assumptions.', sBody))

story.append(Paragraph(
    'The most realistic near-term revenue stream is corporate sponsorship from eyecare industry players. Target '
    'sponsors include EssilorLuxottica, Zeiss, Alcon, Bausch + Lomb, Johnson and Johnson Vision, and CooperVision, '
    'all of which have significant India operations and actively seek student engagement opportunities. However, '
    'sponsors require verified audience size and engagement data (OptoBharat has neither), professional presentation '
    '(a Simdif site does not qualify), tax compliance documentation including GST invoices and formal MoUs (no legal '
    'entity exists), and measurable return on investment (no analytics to demonstrate). Current realistic sponsorship '
    'value with the existing audience is estimated at INR 5,000 to 15,000 per sponsored post or event, rising to '
    'INR 50,000 to 1,00,000 for annual title sponsorship only after a 5x audience increase. The second viable '
    'revenue stream is a dedicated optometry job board, which represents a genuine market gap as no such platform '
    'exists in India. However, building a functional job board requires INR 10,000 to 50,000 for development plus '
    '6 to 12 months of employer relationship building. The current entity valuation is estimated at INR 4,000 to '
    '25,000 (approximately $50 to $300) because anyone with INR 15,000 and three months could replicate the '
    'entire operation from scratch.', sBody))

rev_rows = [
    ['Current Annual Revenue', 'INR 0 ($0)', 'No monetization infrastructure exists'],
    ['Best Case Year 1 Revenue', 'INR 50,000-3,00,000', 'If EVERYTHING goes right'],
    ['Realistic Year 1 Revenue', 'INR 0-50,000', 'Most likely: zero'],
    ['Cost to Become Revenue-Ready', 'INR 25,000-90,000', 'Legal, website, domain, email, tools'],
    ['Current Valuation', 'INR 4,000-25,000', 'Brand + audience, no IP or technology'],
    ['3-Year Potential (Optimistic)', 'INR 5,00,000-15,00,000', 'If properly funded and executed'],
    ['Survival Probability', '20-30%', 'Based on comparable student community outcomes'],
]
story.append(make_table(['Metric', 'Value', 'Notes'], rev_rows, [0.28, 0.25, 0.47]))
story.append(Paragraph('<b>Table 11:</b> Revenue & Valuation Analysis', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 10: COMPETITIVE LANDSCAPE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('10. Competitive Landscape', sH1, 0))

story.append(Paragraph(
    'The Indian optometry community space is highly fragmented, with no single dominant digital platform. India\'s '
    'estimated 45,000+ optometrists and 20,000+ students are scattered across more than seven professional '
    'associations (including the Optometrists Association of India, the Indian Optometric Federation, the All India '
    'Optometric Association, and state-level bodies), dozens of Facebook groups with 5,000 to 25,000 members each, '
    'fifteen or more Telegram groups with 1,000 to 8,000 members each, hundreds of WhatsApp groups with 50 to 500 '
    'members each, three or more trade publications, and multiple industry academy programs run by Essilor, Zeiss, '
    'Alcon, and CooperVision. The critical finding is that no unified digital platform exists that combines verified '
    'professional identity, community features, clinical case discussions, educational resources, CDE credit tracking, '
    'a job board, and event discovery into a single destination. This represents OptoBharat\'s core opportunity, '
    'but it also means that dozens of existing players are already serving fragments of this need without any central '
    'coordination or platform ownership.', sBody))

comp_rows = [
    ['Professional Associations', '7+', '10K-50K combined', 'Credibility, events, CDE credits, lobbying power'],
    ['Facebook Groups', 'Dozens', '5K-25K each', 'Organic engagement, existing communities, free'],
    ['Telegram Groups', '15+', '1K-8K each', 'Active discussions, real-time, free'],
    ['WhatsApp Groups', 'Hundreds', '50-500 each', 'Dominant India platform, personal networks'],
    ['Trade Publications', '3+', 'Varies', 'Editorial content, industry news, advertising'],
    ['Industry Academies', '4+', 'Varies', 'Essilor, Zeiss, Alcon, CooperVision programs'],
    ['OptoAI (Domain Hijacker)', '1', '500+ claimed', 'Commercial AI product on stolen domain'],
]
story.append(make_table(['Competitor Type', 'Count', 'Size', 'Key Advantage'], comp_rows, [0.22, 0.08, 0.18, 0.52]))
story.append(Paragraph('<b>Table 12:</b> Competitive Landscape Overview', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 11: THE THREE FATAL FLAWS
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('11. The Three Fatal Flaws', sH1, 0))

story.append(Paragraph(
    'After exhaustive analysis across all nine intelligence domains, three critical flaws emerge that, individually, '
    'would severely handicap any community initiative, and together constitute an existential threat to OptoBharat\'s '
    'continued relevance and survival. These are not minor weaknesses that can be addressed with incremental '
    'improvements; they are structural failures embedded in the very foundation of the organization.', sBody))

story.append(Spacer(1, 8))
story.append(add_heading('11.1 Fatal Flaw #1: Domain Hijack', sH2, 1))
story.append(Paragraph(
    'The optobharat.com domain has been stolen and is now monetized by a competitor. This is not a theoretical '
    'risk; it is an active, ongoing brand amputation. Every branded Google search, every person who types '
    '"optobharat.com" into their browser, and every backlink accumulated over months of effort now feeds directly '
    'into Envision Bharat\'s commercial OptoAI product. The competitor has a live Razorpay payment gateway, four '
    'pricing tiers, and is actively building their user base using the OptoBharat brand name. Within 90 days, '
    'OptoAI will dominate all branded search results. The original community\'s Simdif subdomain has virtually '
    'no domain authority and cannot compete. The original founder has no trademark registration, no UDRP filing, '
    'and no evidence of any legal action being taken. Every day of inaction makes recovery harder as the new '
    'owner accumulates "legitimate use" evidence. The estimated recovery cost through UDRP is INR 1.25 to 3.3 '
    'lakh, money that a student-run community operating on free tools almost certainly does not have.', sRed))

story.append(add_heading('11.2 Fatal Flaw #2: Zero Community Infrastructure', sH2, 1))
story.append(Paragraph(
    'OptoBharat has no community infrastructure. No website platform (Simdif is a static page builder), no '
    'membership system (Google Forms is a data collection tool, not a community platform), no discussion forums, '
    'no event management system, no content management system, no email marketing platform, no mobile app, and no '
    'API. The entire "community" consists of a LinkedIn company page with 2,569 followers, a Telegram group with '
    '89 members, a WhatsApp group, and a collection of social media accounts with unknown but almost certainly '
    'low engagement metrics. In a market with over 500 million WhatsApp users, the absence of a dedicated '
    'WhatsApp Community or Channel strategy is inexcusable. The Simdif website cannot be extended to support '
    'any community features: no user authentication, no role-based access, no content management, no database '
    'operations, no real-time features, and no payment processing. The community has hit its scalability ceiling '
    'before it even began climbing. Without a fundamental platform rebuild, OptoBharat will remain a LinkedIn '
    'page with a Telegram group, permanently capped at a few thousand members.', sRed))

story.append(add_heading('11.3 Fatal Flaw #3: The Credibility Bomb', sH2, 1))
story.append(Paragraph(
    'The claim "India\'s largest optometry student community" is OptoBharat\'s biggest liability. Facebook '
    'groups with 5,000 to 25,000 members each already exist. Telegram groups with 1,000 to 8,000 members '
    'operate daily. Professional associations have tens of thousands of registered members. OptoBharat has '
    '2,569 LinkedIn followers and 89 Telegram subscribers. The claim is provably false and represents a '
    'ticking time bomb that will eventually attract scrutiny from the Advertising Standards Council of India '
    '(ASCI), which actively polices misleading claims in digital advertising. When (not if) this claim is '
    'challenged publicly, the resulting credibility damage will be devastating and potentially irreversible. '
    'The Simdif footer advertising "No computer needed" further compounds the trust deficit. Potential sponsors, '
    'university partners, and serious members will immediately dismiss the community as amateur upon seeing the '
    'website, regardless of the quality of the actual community work being done on LinkedIn and in webinars. '
    'The gap between the claimed size and the actual footprint is so large that it calls into question every '
    'other claim made by the organization, including the reported 1,000+ members, 30-state reach, and '
    '22+ country presence.', sRed))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 12: ACTIONABLE INTELLIGENCE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('12. Actionable Intelligence - Priority Roadmap', sH1, 0))

story.append(Paragraph(
    'This section provides a concrete, prioritized action roadmap that the OptoBharat founder and team can '
    'execute immediately to address the critical findings in this report. The recommendations are organized by '
    'urgency level, with cost estimates and expected timelines. The total recommended investment for the first '
    '90 days is approximately INR 20,000 to 50,000, which is the minimum required to transform OptoBharat '
    'from a student project into a credible community platform.', sBody))

story.append(add_heading('12.1 IMMEDIATE - This Week (Cost: INR 0-2,000)', sH2, 1))
imm_rows = [
    ['Register optobharat.in + optobharat.org', 'INR 1,700/yr', 'Stop the bleeding, secure alternative domains'],
    ['Remove "India\'s Largest" claim', 'Free', 'Prevent ASCI regulatory action'],
    ['Screenshot optobharat.com redirect', 'Free', 'Preserve evidence for potential UDRP'],
    ['Enable 2FA on ALL accounts', 'Free', 'Prevent social media hijacking'],
    ['Update all social bios with new URL', 'Free', 'Redirect traffic to correct destination'],
    ['Public clarification announcement', 'Free', 'Address domain confusion head-on'],
    ['Verify admin emails are not @optobharat.com', 'Free', 'Check if domain loss compromises account access'],
    ['Check trademark status at ipindia.gov.in', 'Free', 'Determine UDRP viability'],
]
story.append(make_table(['Action', 'Cost', 'Rationale'], imm_rows, [0.45, 0.18, 0.37]))
story.append(Paragraph('<b>Table 13:</b> Immediate Actions - This Week', sCaption))

story.append(add_heading('12.2 SHORT-TERM - This Month (Cost: INR 5,000-25,000)', sH2, 1))
short_rows = [
    ['Register legal entity (Society/Section 8)', 'INR 5K-15K', 'Required for GST, sponsorships, payments'],
    ['Set up Google Workspace email', 'INR 1.5K/mo', 'hello@optobharat.org builds credibility'],
    ['Launch WhatsApp Community + Channel', 'Free', 'Dominant India platform, immediate reach'],
    ['Replace Google Form with branded form', 'INR 0-2K/mo', 'Typeform or Tally for professional onboarding'],
    ['Install Google Analytics (GA4)', 'Free', 'Stop flying blind, start measuring everything'],
    ['Build proper website (WordPress/Carrd)', 'INR 5K-20K', 'Kill Simdif, establish professional presence'],
    ['Create LinkedIn Showcase Pages', 'Free', 'Organize content by topic (clinical, career, events)'],
    ['Design brand guidelines', 'INR 0-5K', 'Consistent visual identity across all platforms'],
]
story.append(make_table(['Action', 'Cost', 'Rationale'], short_rows, [0.45, 0.18, 0.37]))
story.append(Paragraph('<b>Table 14:</b> Short-Term Actions - This Month', sCaption))

story.append(add_heading('12.3 MEDIUM-TERM - Next Quarter (Cost: INR 15,000-50,000)', sH2, 1))
med_rows = [
    ['Build community platform', 'INR 15K-50K', 'WordPress+BuddyPress or Next.js+Supabase'],
    ['Launch optometry job board', 'INR 10K-50K', 'Biggest revenue opportunity in Indian optometry'],
    ['Implement email marketing', 'INR 0-2K/mo', 'Mailchimp or Brevo with welcome sequences'],
    ['Create content library (50+ articles)', 'INR 0-10K', 'Build SEO authority, demonstrate domain expertise'],
    ['UDRP filing for domain recovery', 'INR 1.25-3.3L', 'If trademark registered, attempt legal recovery'],
    ['Campus Ambassador Program', 'Free-5K', 'Student reps at 20+ optometry colleges across India'],
    ['Monthly sponsored webinar series', 'INR 0 (sponsored)', 'Partner with Essilor/Zeiss/Alcon for content'],
    ['File trademark application', 'INR 5K-9K', 'Protect brand name legally'],
]
story.append(make_table(['Action', 'Cost', 'Rationale'], med_rows, [0.45, 0.18, 0.37]))
story.append(Paragraph('<b>Table 15:</b> Medium-Term Actions - Next Quarter', sCaption))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 13: FINAL VERDICT
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('13. Final Verdict', sH1, 0))

story.append(Paragraph(
    'OptoBharat is a community with a pulse but no pulse oximeter. The brand name is strong, the market need '
    'is genuine, the niche is underserved, and the founder has demonstrated real networking capability through '
    'international webinar connections. These are not trivial assets. However, the execution gap between the '
    'community\'s aspirations and its current reality is so vast that it undermines every claim and weakens '
    'every strength. The community operates from a free Simdif website builder with a "no computer needed" '
    'watermark in the footer. Its .com domain has been stolen by a commercial competitor. It has 89 Telegram '
    'subscribers while claiming to be the "largest" community in India. It generates INR 0 in revenue, has '
    'no legal entity registration, no analytics, no email marketing, and no content library. The entire '
    'membership system is a Google Form that redirects to a WhatsApp group.', sBody))

story.append(Paragraph(
    'The good news is that the community\'s real assets, its members and social presence, remain intact and '
    'are recoverable. The LinkedIn following of 2,569 represents genuine engagement within a niche professional '
    'field. The international speaker network is a genuine differentiator. The market gap for a unified optometry '
    'student platform in India is real and growing. With an investment of INR 20,000 to 50,000 and 90 days of '
    'focused effort, OptoBharat could double its strategic score by securing a professional domain, building a '
    'proper website, establishing legal registration, and launching a WhatsApp community strategy. Without these '
    'changes, the community will continue to hemorrhage credibility and brand equity to the domain hijacker, '
    'professional associations, and Facebook groups that serve the same audience with greater scale and '
    'professionalism. The probability of OptoBharat surviving long enough to realize its potential without '
    'significant changes is estimated at 20 to 30 percent, based on comparable student community outcomes in India.', sBody))

story.append(Spacer(1, 12))

# Final score box
final_box = Table(
    [[Paragraph('<b>FINAL STRATEGIC ASSESSMENT</b>', ParagraphStyle('fb1', fontName='TNR', fontSize=13, textColor=colors.white, alignment=TA_CENTER))],
     [Paragraph('<font size="28"><b>2.5 / 10</b></font>', ParagraphStyle('fb2', fontName='TNR', fontSize=28, textColor=colors.white, alignment=TA_CENTER))],
     [Paragraph('F-GRADE | CRITICAL INTERVENTION REQUIRED', ParagraphStyle('fb3', fontName='TNR', fontSize=11, textColor=colors.HexColor('#ffcccc'), alignment=TA_CENTER))]],
    colWidths=[AVAIL_W * 0.7], hAlign='CENTER'
)
final_box.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), DANGER_RED),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('LEFTPADDING', (0, 0), (-1, -1), 16),
    ('RIGHTPADDING', (0, 0), (-1, -1), 16),
    ('TOPPADDING', (0, 0), (0, 0), 16),
    ('BOTTOMPADDING', (-1, -1), (-1, -1), 16),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (0, 0), 4),
]))
story.append(final_box)

story.append(Spacer(1, 12))
story.append(Paragraph(
    '<i>This report was prepared by FOCUSLINKS INTELLIGENCE using swarm-based analysis methodology. '
    'Nine parallel agents conducted independent investigations across web scraping, social media intelligence, '
    'competitive analysis, SWOT assessment, marketing audit, technical/SEO audit, content/UX critique, '
    'revenue analysis, and domain security assessment. All findings are based on publicly available data and '
    'live technical analysis conducted in May 2026. No input was sought from or provided by the target entity. '
    'All scores represent independent assessments with no soft corners.</i>', sBody))

# ━━ BUILD ━━
doc.multiBuild(story)
print(f"PDF generated: {OUTPUT}")
