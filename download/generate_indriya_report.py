#!/usr/bin/env python3
"""
Indriya X Research Centre - Strategic Intelligence Report - Body PDF Generator
Uses ReportLab to generate a comprehensive multi-section professional report.
Compiled from 11 independent research agents.
"""
import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# =============================================================================
# COLOR PALETTE
# =============================================================================
PAGE_BG       = colors.HexColor('#f2f3f3')
SECTION_BG    = colors.HexColor('#e8eaeb')
CARD_BG       = colors.HexColor('#e9eaeb')
TABLE_STRIPE  = colors.HexColor('#eff0f1')
HEADER_FILL   = colors.HexColor('#3e5864')
COVER_BLOCK   = colors.HexColor('#5c7683')
BORDER        = colors.HexColor('#b4bfc4')
ICON          = colors.HexColor('#46809e')
ACCENT        = colors.HexColor('#bc502c')
ACCENT_2      = colors.HexColor('#53c834')
TEXT_PRIMARY   = colors.HexColor('#131415')
TEXT_MUTED     = colors.HexColor('#848b8e')
SEM_SUCCESS   = colors.HexColor('#489963')
SEM_WARNING   = colors.HexColor('#a08145')
SEM_ERROR     = colors.HexColor('#914f49')
SEM_INFO      = colors.HexColor('#4b739c')

WHITE = colors.white
BLACK = colors.black

# =============================================================================
# FONT REGISTRATION
# =============================================================================
_FONT_DIR = '/usr/share/fonts/truetype'
pdfmetrics.registerFont(TTFont('Times New Roman',
    os.path.join(_FONT_DIR, 'liberation/LiberationSerif-Regular.ttf')))
pdfmetrics.registerFont(TTFont('Times New Roman Bold',
    os.path.join(_FONT_DIR, 'liberation/LiberationSerif-Bold.ttf')))
pdfmetrics.registerFont(TTFont('Calibri',
    os.path.join(_FONT_DIR, 'liberation/LiberationSans-Regular.ttf')))
pdfmetrics.registerFont(TTFont('Calibri Bold',
    os.path.join(_FONT_DIR, 'liberation/LiberationSans-Bold.ttf')))
pdfmetrics.registerFont(TTFont('DejaVuSans',
    os.path.join(_FONT_DIR, 'dejavu/DejaVuSansMono.ttf')))

registerFontFamily('Times New Roman',
    normal='Times New Roman', bold='Times New Roman Bold')
registerFontFamily('Calibri',
    normal='Calibri', bold='Calibri Bold')

# =============================================================================
# PAGE DIMENSIONS
# =============================================================================
PAGE_W, PAGE_H = A4
MARGIN = 1.0 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

# =============================================================================
# STYLES
# =============================================================================
styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    'ReportTitle', fontName='Calibri', fontSize=24, leading=30,
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=6*mm, spaceBefore=0))

styles.add(ParagraphStyle(
    'SectionTitle', fontName='Calibri', fontSize=16, leading=20,
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=4*mm,
    spaceBefore=8*mm, keepWithNext=True))

styles.add(ParagraphStyle(
    'SubSection', fontName='Calibri', fontSize=12.5, leading=16,
    textColor=HEADER_FILL, alignment=TA_LEFT, spaceAfter=3*mm,
    spaceBefore=6*mm, keepWithNext=True))

styles.add(ParagraphStyle(
    'BodyText2', fontName='Times New Roman', fontSize=10.5, leading=15,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=3*mm, spaceBefore=0))

styles.add(ParagraphStyle(
    'BodyBold', fontName='Times New Roman', fontSize=10.5, leading=15,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=2*mm, spaceBefore=2*mm))

styles.add(ParagraphStyle(
    'BulletItem', fontName='Times New Roman', fontSize=10.5, leading=15,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=1.5*mm,
    spaceBefore=0, leftIndent=12, bulletIndent=0))

styles.add(ParagraphStyle(
    'TableHeader', fontName='Calibri', fontSize=9.5, leading=12,
    textColor=WHITE, alignment=TA_LEFT, spaceAfter=0, spaceBefore=0))

styles.add(ParagraphStyle(
    'TableCell', fontName='Times New Roman', fontSize=9.5, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=0, spaceBefore=0))

styles.add(ParagraphStyle(
    'TableCellCenter', fontName='Times New Roman', fontSize=9.5, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER, spaceAfter=0, spaceBefore=0))

styles.add(ParagraphStyle(
    'FooterStyle', fontName='Calibri', fontSize=8, leading=10,
    textColor=TEXT_MUTED, alignment=TA_CENTER))

styles.add(ParagraphStyle(
    'Callout', fontName='Times New Roman', fontSize=10.5, leading=15,
    textColor=HEADER_FILL, alignment=TA_LEFT, spaceAfter=3*mm,
    spaceBefore=3*mm, leftIndent=10, borderColor=HEADER_FILL,
    borderWidth=1, borderPadding=6))

styles.add(ParagraphStyle(
    'SmallGray', fontName='Calibri', fontSize=8.5, leading=12,
    textColor=TEXT_MUTED, alignment=TA_LEFT, spaceAfter=1*mm))

styles.add(ParagraphStyle(
    'CaptionStyle', fontName='Calibri', fontSize=9, leading=12,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=4*mm, spaceBefore=2*mm))

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def section_heading(text, number=None):
    if number:
        txt = f'<font color="{ACCENT.hexval()}">{number}</font>  {text}'
    else:
        txt = f'<font color="{ACCENT.hexval()}">{text}</font>'
    return Paragraph(txt, styles['SectionTitle'])

def sub_heading(text):
    return Paragraph(text, styles['SubSection'])

def body(text):
    return Paragraph(text, styles['BodyText2'])

def body_bold(text):
    return Paragraph(f'<b>{text}</b>', styles['BodyBold'])

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', styles['BulletItem'])

def callout_box(text):
    t = Table([[Paragraph(text, styles['Callout'])]],
              colWidths=[CONTENT_W - 4*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#eef3f5')),
        ('BOX', (0,0), (-1,-1), 1, HEADER_FILL),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    return t

def danger_box(text):
    t = Table([[Paragraph(text, ParagraphStyle('DangerCallout', fontName='Times New Roman',
              fontSize=10.5, leading=15, textColor=SEM_ERROR, alignment=TA_LEFT))]],
              colWidths=[CONTENT_W - 4*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fdf2f0')),
        ('BOX', (0,0), (-1,-1), 1, SEM_ERROR),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    return t

def spacer(h=3):
    return Spacer(1, h*mm)

def hr_line():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER,
                      spaceAfter=4*mm, spaceBefore=4*mm)

def make_table(headers, rows, col_widths=None):
    hdr_cells = [Paragraph(f'<b>{h}</b>', styles['TableHeader']) for h in headers]
    data = [hdr_cells]
    for row in rows:
        data.append([Paragraph(str(c), styles['TableCell']) for c in row])
    if col_widths is None:
        col_widths = [CONTENT_W / len(headers)] * len(headers)
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Calibri'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]
    for i in range(2, len(data), 2):
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

def colored_table(headers, rows, col_widths, bg_color=HEADER_FILL):
    hdr_cells = [Paragraph(f'<b>{h}</b>', styles['TableHeader']) for h in headers]
    data = [hdr_cells]
    for row in rows:
        data.append([Paragraph(str(c), styles['TableCell']) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), bg_color),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), 'Calibri'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]
    for i in range(2, len(data), 2):
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

def overall_bar(score_text, bg=SEM_ERROR):
    d = [[Paragraph(f'<b>{score_text}</b>', ParagraphStyle('Over', fontName='Calibri',
         fontSize=14, leading=18, textColor=WHITE, alignment=TA_CENTER))]]
    t = Table(d, colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    return t

# =============================================================================
# DOCUMENT TEMPLATE
# =============================================================================
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, NextPageTemplate
from reportlab.platypus.frames import Frame

class ReportDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kw):
        super().__init__(filename, **kw)
        self.page_count = 0
        frame = Frame(MARGIN, MARGIN + 12*mm,
                     CONTENT_W, PAGE_H - 2*MARGIN - 12*mm, id='normal')
        template = PageTemplate(id='Later', frames=frame, onPage=self._later_page)
        self.addPageTemplates([template])

    def _later_page(self, canvas, doc):
        canvas.saveState()
        page_num = doc.page
        if page_num > 0:
            canvas.setFont('Calibri', 8)
            canvas.setFillColor(TEXT_MUTED)
            canvas.drawCentredString(PAGE_W / 2, 8*mm,
                f'Indriya X Research Centre  |  Strategic Intelligence Report  |  Page {page_num}')
            canvas.setStrokeColor(BORDER)
            canvas.setLineWidth(0.5)
            canvas.line(MARGIN, PAGE_H - MARGIN + 4*mm, PAGE_W - MARGIN, PAGE_H - MARGIN + 4*mm)
            canvas.setFont('Calibri', 7)
            canvas.setFillColor(TEXT_MUTED)
            canvas.drawString(MARGIN, PAGE_H - MARGIN + 6*mm, 'FOCUSLINKS STRATEGIC INTELLIGENCE')
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 6*mm, 'CONFIDENTIAL')
            canvas.line(MARGIN, 13*mm, PAGE_W - MARGIN, 13*mm)
        canvas.restoreState()

# =============================================================================
# BUILD CONTENT
# =============================================================================
def build_content():
    story = []

    # =========================================================================
    # TABLE OF CONTENTS
    # =========================================================================
    story.append(NextPageTemplate('Later'))
    story.append(Paragraph('<font color="#3e5864" size="22"><b>TABLE OF CONTENTS</b></font>',
                           ParagraphStyle('TOCTitle', fontName='Calibri', fontSize=22,
                                         leading=28, textColor=HEADER_FILL, spaceAfter=6*mm)))
    story.append(spacer(2))

    toc_entries = [
        ('1', 'Executive Summary'),
        ('2', 'Company Overview'),
        ('3', 'SWOT Analysis'),
        ('4', 'Marketing Analytics'),
        ('5', 'Social Media Intelligence'),
        ('6', 'Technical and SEO Audit'),
        ('7', 'Competitor Analysis'),
        ('8', 'Content and UX Critique'),
        ('9', 'Rise and Fall Analysis'),
        ('10', 'Brand Positioning Analysis'),
        ('11', 'Revenue and Monetization Analysis'),
        ('12', 'Indriya X vs Neuroptech Comparison'),
        ('13', 'Strategic Recommendations'),
    ]
    toc_style = ParagraphStyle('TOCEntry2', fontName='Calibri', fontSize=11.5,
                               leading=24, textColor=TEXT_PRIMARY)
    toc_data = []
    for num, title in toc_entries:
        toc_data.append([
            Paragraph(f'<font color="#bc502c">{num}</font>', toc_style),
            Paragraph(title, toc_style),
        ])
    toc_table = Table(toc_data, colWidths=[0.5*inch, CONTENT_W - 0.5*inch])
    toc_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW', (0,0), (-1,-1), 0.3, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(toc_table)
    story.append(PageBreak())

    # =========================================================================
    # SECTION 1: EXECUTIVE SUMMARY
    # =========================================================================
    story.append(section_heading('EXECUTIVE SUMMARY', '1'))

    story.append(body(
        'This strategic intelligence report presents a comprehensive analysis of '
        'Indriya X Research Centre (branded "IndriyaX"), compiled from 11 independent '
        'research agents covering company discovery, SWOT assessment, marketing analytics, '
        'social media intelligence, technical SEO audit, competitor landscape, content '
        'and UX critique, rise and fall trajectory, brand positioning, and revenue modeling.'
    ))
    story.append(spacer(2))

    story.append(danger_box(
        '<b>Brutal Bottom Line:</b> A 6-month-old solo optometry webinar project with '
        'no website, no revenue, no accreditation, 320 Instagram followers, and a brand '
        'name that is buried under a billion-dollar jewellery company. Well-intentioned '
        'but structurally non-existent as a business. IndriyaX has the right instincts '
        'but none of the infrastructure needed to survive beyond its founder\'s personal '
        'energy. The most likely outcome: gradual plateau into irrelevance within 12-18 months.'
    ))
    story.append(spacer(3))

    story.append(sub_heading('1.1 Score Card Overview'))

    score_headers = ['Dimension', 'Score', 'Grade']
    score_rows = [
        ['Technical and SEO', '1.0/10', 'F'],
        ['Marketing Presence', '3.2/10', 'F'],
        ['Social Media', '2.8/10', 'F'],
        ['Content and UX', '3.2/10', 'F'],
        ['Brand Positioning', '3.0/10', 'F'],
        ['Revenue Model', '2.0/10', 'F'],
        ['Competitive Position', '2.0/10', 'F'],
        ['Rise and Fall Momentum', '4.5/10', 'D'],
    ]
    cw = [3.2*inch, 1.5*inch, 1.2*inch]
    story.append(make_table(score_headers, score_rows, cw))
    story.append(spacer(3))

    story.append(overall_bar('OVERALL COMPOSITE SCORE:  2.7 / 10   |   GRADE: F-'))
    story.append(spacer(3))

    story.append(body(
        'The overall score of 2.7/10 places IndriyaX in the "critical intervention required" '
        'category. Eight out of eight scored dimensions received a grade of F. The single '
        'dimension scoring above F is Rise and Fall Momentum (4.5/10, D), reflecting genuine '
        'execution velocity from the founder. However, momentum without infrastructure is '
        'like a car with an engine but no chassis -- it moves, but it cannot carry anything.'
    ))
    story.append(body(
        'The founding team has demonstrated real networking ability (6+ partnerships in 6 months) '
        'and genuine domain expertise. But the complete absence of a website, revenue model, '
        'accreditation, and email marketing infrastructure means every strength is built on sand. '
        'If the founder burns out, graduates, or gets a full-time job, IndriyaX evaporates overnight.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 2: COMPANY OVERVIEW
    # =========================================================================
    story.append(section_heading('COMPANY OVERVIEW', '2'))

    story.append(sub_heading('2.1 Identity and Background'))

    ov_headers = ['Attribute', 'Detail']
    ov_rows = [
        ['Full Legal Name', 'Indriya X Research Centre (unregistered)'],
        ['Brand Names Used', 'IndriyaX, IndriyaX Vision Innovation, INDRIYA X'],
        ['Founded', 'December 25, 2025 (~6 months old)'],
        ['Founder', 'Anik Dingal (Optometrist, M.Optom student, Kolkata)'],
        ['Co-lead', 'Madhur Gupta / Mainak Motilal (part-time)'],
        ['Team Size', '2 people (LinkedIn claims 2-10, reality is closer to 2)'],
        ['Industry', 'Optometry Education / Vision Science Research'],
        ['Website', 'NONE -- no domain registered (.com, .in, .org all fail)'],
        ['Contact', 'indriyax@gmail.com, +91 9382617530'],
        ['Instagram', '@indriyax.vision (320 followers, ~20 posts)'],
        ['LinkedIn', 'linkedin.com/company/indriya-x (291-300 followers)'],
        ['Facebook', 'Page ID: 61577803987898 (<200 followers, no vanity URL)'],
        ['YouTube', '@INDRIYAX (<100 subscribers, 1-2 videos/month)'],
        ['Twitter/X', 'ZERO presence'],
        ['Partnerships', 'Percivision, Optician India, Vidyasagar College, Dr. Agarwals, HITS, WBAO, OptoBharat'],
        ['Revenue', '~$0-$3,600/year (one paid program at 1,475 INR detected)'],
        ['Funding', 'Zero external funding, bootstrapped by founder'],
    ]
    story.append(make_table(ov_headers, ov_rows, [2.0*inch, CONTENT_W - 2.0*inch]))
    story.append(spacer(3))

    story.append(sub_heading('2.2 Founder Profile'))
    story.append(body(
        '<b>Anik Dingal</b> is a practicing optometrist and M.Optom student at Vidyasagar '
        'College of Optometry and Vision Science, Kolkata, India. His LinkedIn title reads: '
        '"Professional Optometrist | Founder of IndriyaX | Research Scholar and Innovation Lead '
        '(Vision Instruments and Software)" at Debapriya Mukhopadhyay Vision Research Institute '
        'and Foundation. He is genuinely competent in his domain -- clinical optometry, not tech '
        'entrepreneurship. This clinical authenticity is IndriyaX\'s greatest asset and its most '
        'underexploited one.'
    ))

    story.append(callout_box(
        '<b>Team Reality:</b> Despite LinkedIn listing "2-10 employees," the operational team is '
        'effectively one person (Anik Dingal) who handles content creation, speaker coordination, '
        'social media management, graphic design (credited as "INDRIYA X Graphic" on LinkedIn), '
        'partnership management, community moderation, and strategic decisions. This is a single '
        'point of failure of existential proportions.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('2.3 Services and Operations'))
    services = [
        '<b>International Webinars:</b> Monthly/bi-monthly expert-led sessions on neuro-optometry, '
        'OCT interpretation, scleral lenses, keratoconus, dry eye, contact lens fitting, and myopia '
        'management. Speakers from South Africa, USA, Canada, and India. 10+ webinars in 6 months.',
        '<b>OptoTalks by IndriyaX:</b> A clinical content series launched April 2026 combining '
        'short reels (30-60 sec), 5-minute theory explainers, case-based learning, and research-backed '
        'insights. Episodes include burning eyes tips, A-Scan biometry pearls, and corneal embryology.',
        '<b>Vision Quizinars:</b> Interactive MCQ rounds for student engagement.',
        '<b>WhatsApp Community:</b> Primary engagement channel. Link shared via bio and LinkedIn.',
        '<b>E-certificates:</b> Provided for webinar attendance. Value: zero professional weight.',
        '<b>Certificate Programs:</b> One paid program observed: "Certificate Program in Scleral '
        'Lenses, Orthokeratology and Myopia Management" at INR 1,475 registration fee.',
    ]
    for s in services:
        story.append(bullet(s))
    story.append(spacer(2))

    story.append(sub_heading('2.4 Technology Stack'))
    story.append(body(
        'The entire operation runs on free consumer tools with no professional infrastructure '
        'whatsoever: Google Meet (webinars), WhatsApp (community), Instagram/LinkedIn/Facebook '
        '(content distribution), Google Forms (registration -- unbranded forms.gle links), '
        'and Gmail (official communication). There is no LMS, no CRM, no email marketing tool, '
        'no analytics platform, no payment gateway, and no content management system. The tech '
        'stack is the absolute minimum required to host a Zoom call and post about it on Instagram.'
    ))

    story.append(sub_heading('2.5 Domain Analysis'))
    story.append(body(
        'All 12+ domain variations tested return DNS failure (no A/CNAME records): '
        'indriyax.com, indriyax.in, indriyax.org, indriyax.net, indriyax.co.in, indriya-x.com, '
        'indriya-x.in, indriyaxvision.com, and percivision.com. Every potential user or partner '
        'who tries to find IndriyaX online encounters a broken experience. This is the single most '
        'critical finding across all 11 agent reports.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: SWOT ANALYSIS
    # =========================================================================
    story.append(section_heading('SWOT ANALYSIS', '3'))
    story.append(body(
        'The following SWOT analysis is compiled from comprehensive open-source intelligence '
        'gathering across all 11 agent reports. The entity is assessed as a 6-month-old, '
        'founder-driven optometry education initiative with genuine potential but zero structural '
        'foundation.'
    ))
    story.append(spacer(2))

    # STRENGTHS
    story.append(sub_heading('3.1 Strengths (7 identified)'))
    s_headers = ['#', 'Strength', 'Assessment']
    s_rows = [
        ['S1', 'Niche focus on neuro-optometry (underserved in Indian optometry education)', 'STRONG'],
        ['S2', 'Strategic partnerships: Percivision + Optician India media amplification', 'MODERATE-STRONG'],
        ['S3', 'International speaker access (South Africa, USA, Canada faculty)', 'MODERATE'],
        ['S4', 'Multi-format content: webinars, OptoTalks, Quizinars, WhatsApp community', 'MODERATE'],
        ['S5', 'Community building instinct (student-facing content, quiz competitions)', 'MODERATE'],
        ['S6', 'Founder domain expertise (practicing optometrist, not random tech bro)', 'MODERATE'],
        ['S7', 'Execution velocity: 10+ webinars, 6+ partnerships, 3 content launches in 6 months', 'WEAK-MODERATE'],
    ]
    story.append(colored_table(s_headers, s_rows,
        [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch], SEM_SUCCESS))
    story.append(spacer(3))

    # WEAKNESSES
    story.append(sub_heading('3.2 Weaknesses (11 identified)'))
    w_headers = ['#', 'Weakness', 'Severity']
    w_rows = [
        ['W1', 'NO WEBSITE -- no domain registered, operates entirely on social media', 'CRITICAL'],
        ['W2', 'One-person operation disguised as an organization (founder burnout risk)', 'CRITICAL'],
        ['W3', 'Zero visible revenue model (mostly free webinars, one paid program at INR 1,475)', 'CRITICAL'],
        ['W4', 'Devastating engagement: 2 likes / 0 comments on typical posts', 'CRITICAL'],
        ['W5', 'No accreditation or credentialing (e-certificates carry zero professional weight)', 'SERIOUS'],
        ['W6', 'Brand identity chaos: "Indriya X" vs "IndriyaX" vs "IndriyaX Vision Innovation"', 'SERIOUS'],
        ['W7', 'Non-existent technology infrastructure (Google Meet + WhatsApp + Instagram)', 'SERIOUS'],
        ['W8', 'No content calendar or posting consistency (bursty, event-driven only)', 'MODERATE'],
        ['W9', 'Geographic self-containment (Indian audience only, "International" = speaker nationality)', 'MODERATE'],
        ['W10', 'No measurable impact data (zero testimonials, no alumni network, no outcome data)', 'MODERATE'],
        ['W11', 'Dependency on Optician India for distribution (no contracts, no exclusivity)', 'MODERATE'],
    ]
    story.append(colored_table(w_headers, w_rows,
        [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch], SEM_ERROR))
    story.append(spacer(3))

    # OPPORTUNITIES
    story.append(sub_heading('3.3 Opportunities (9 identified)'))
    o_headers = ['#', 'Opportunity', 'Potential']
    o_rows = [
        ['O1', 'Massive untapped Indian optometry CE market (60,000+ optometrists, fragmented education)', 'HUGE'],
        ['O2', 'NCAHP Act 2021 mandating continuing professional development credits', 'HUGE'],
        ['O3', 'Neuro-optometry emerging as a super-specialty (concussion, TBI, vision rehab)', 'STRONG'],
        ['O4', 'B2B corporate training (eye hospital chains: Dr. Agarwals, Lenskart, Titan Eye+)', 'STRONG'],
        ['O5', 'Percivision platform integration (LMS, certification engine, payment gateway)', 'STRONG'],
        ['O6', 'Regional language content (Hindi, Tamil, Telugu) -- no competitor doing this well', 'MODERATE-STRONG'],
        ['O7', 'Student pipeline from 200+ optometry colleges needing supplementary training', 'MODERATE-STRONG'],
        ['O8', 'Certification and micro-credentialing (OCI or international COPE accreditation)', 'MODERATE'],
        ['O9', 'Pharma/industry sponsorship (Alcon, Bausch+Lomb, CooperVision, ZEISS, Topcon)', 'MODERATE'],
    ]
    story.append(colored_table(o_headers, o_rows,
        [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch], SEM_INFO))
    story.append(spacer(3))

    # THREATS
    story.append(sub_heading('3.4 Threats (9 identified)'))
    t_headers = ['#', 'Threat', 'Severity']
    t_rows = [
        ['T1', 'IAO (India\'s first online optometry academy with real fellowships, INR 15K)', 'CRITICAL'],
        ['T2', 'COVD/OVDRA (54-year authority in vision development, board certification)', 'CRITICAL'],
        ['T3', 'OEPF, NORA -- recognized certification bodies in neuro-optometry', 'HIGH'],
        ['T4', 'ZEISS Academy (free, 60+ modules, backed by 5B euro parent company)', 'HIGH'],
        ['T5', 'OPTOBHARAT (nearly identical model, same timeline, same audience)', 'HIGH'],
        ['T6', 'Brand irrelevance spiral (2 likes/0 comments = algorithm burial)', 'SERIOUS'],
        ['T7', 'Founder burnout and sustainability (one person doing everything)', 'SERIOUS'],
        ['T8', 'Free content avalanche (YouTube, Telegram, WhatsApp forwards)', 'SERIOUS'],
        ['T9', 'AI disruption of education content (ChatGPT, Claude generating clinical content)', 'MODERATE-EMERGING'],
    ]
    story.append(colored_table(t_headers, t_rows,
        [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch], SEM_WARNING))
    story.append(spacer(3))

    story.append(callout_box(
        '<b>SWOT Verdict:</b> IndriyaX is a "passion project with potential but zero structural '
        'foundation." The 7 strengths are real but fragile -- driven entirely by founder energy '
        'and networking, not by structural advantages. The 11 weaknesses are existential: no website, '
        'no revenue, no accreditation, no team, and a brand name buried under a billion-dollar '
        'jewellery company. The 9 opportunities are genuine but closing fast. The 9 threats are '
        'active and intensifying. Survival probability at 24 months: 40%.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 4: MARKETING ANALYTICS
    # =========================================================================
    story.append(section_heading('MARKETING ANALYTICS', '4'))

    story.append(sub_heading('4.1 Digital Presence Score'))
    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Overall Marketing Score: 3.2 / 10 (F)</b></font>',
        ParagraphStyle('MktScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    m_headers = ['Category', 'Score', 'Assessment']
    m_rows = [
        ['Website Quality', '1/10', 'NO DEDICATED WEBSITE FOUND -- fatal for an "online learning platform"'],
        ['Social Media Activity', '4/10', 'Active but nascent; event-driven posting only'],
        ['Search Engine Visibility', '2/10', 'Almost invisible on Google; buried under Indriya Jewels'],
        ['Content Marketing', '4/10', 'Webinars only; no blog, no YouTube strategy, no email list'],
        ['Paid Advertising', '1/10', 'None detected across Google, Meta, or LinkedIn'],
        ['Email Marketing', '0/10', 'No evidence found -- no Mailchimp, no newsletter, no drip sequences'],
        ['PR / Media Coverage', '2/10', 'Only partner resharing (Optician India); zero mainstream press'],
    ]
    story.append(make_table(m_headers, m_rows,
                            [1.8*inch, 0.7*inch, CONTENT_W - 2.5*inch]))
    story.append(spacer(3))

    story.append(sub_heading('4.2 Channel Assessment'))
    ch_headers = ['Channel', 'Active?', 'Quality', 'Growth', 'Notes']
    ch_rows = [
        ['Website', 'NO', 'N/A', 'N/A', 'No website found -- non-existent'],
        ['Instagram', 'YES', 'Medium', 'Flat', 'Event-driven only, 320 followers'],
        ['LinkedIn', 'YES', 'Medium', 'Slow', '298 followers, low engagement'],
        ['Facebook', 'YES', 'Low', 'Stagnant', 'Mirror of IG, neglected, no vanity URL'],
        ['Twitter/X', 'NO', 'N/A', 'N/A', 'Zero presence'],
        ['YouTube', 'PARTIAL', 'Low', 'Very Slow', '<100 subscribers, raw webinar dumps'],
        ['Email', 'NO', 'N/A', 'N/A', 'Zero email marketing'],
        ['Blog/SEO', 'NO', 'N/A', 'N/A', 'No written content'],
        ['Paid Ads', 'NO', 'N/A', 'N/A', 'No paid presence'],
        ['WhatsApp', 'UNKNOWN', 'Unknown', 'Unknown', 'Likely used informally'],
    ]
    story.append(make_table(ch_headers, ch_rows,
                            [1.0*inch, 0.7*inch, 0.7*inch, 0.8*inch, CONTENT_W - 3.2*inch]))
    story.append(spacer(3))

    story.append(sub_heading('4.3 Critical Marketing Failures'))
    failures = [
        '<b>No Website:</b> In 2026, an "online learning platform" without a website is not '
        'charming -- it is alarming. Every competitor (IAO, OCI, ZEISS Academy, Optocase) has one. '
        'Without a website, there is no SEO, no lead capture, no brand hub, and zero credibility '
        'with institutional partners or investors.',
        '<b>Name Confusion:</b> Searching "Indriya" returns Aditya Birla Group\'s billion-dollar '
        'jewellery brand. Searching "IndriyaX" returns slightly better results but is still buried '
        'under noise. Every marketing dollar spent is partially wasted fighting this confusion.',
        '<b>No Lead Capture Mechanism:</b> Without a website or email list, there is zero way to '
        'nurture prospects, retarget attendees, or build a database. Every webinar attendee is a '
        'lost lead after the event.',
        '<b>Zero Content Library:</b> Webinars are live events with no visible on-demand library. '
        'One webinar could generate 15+ pieces of reusable content (recording, clips, blog, carousel, '
        'infographic). Currently: ZERO content reuse.',
        '<b>Abysmal Social Engagement:</b> 10-25 likes on an Instagram reel with 320 followers '
        'is not engagement -- it is a ghost town. Content is promotional ("register now") rather '
        'than value-first. No community building whatsoever.',
    ]
    for f in failures:
        story.append(bullet(f))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 5: SOCIAL MEDIA INTELLIGENCE
    # =========================================================================
    story.append(section_heading('SOCIAL MEDIA INTELLIGENCE', '5'))

    story.append(sub_heading('5.1 Platform Analysis'))
    sm_headers = ['Platform', 'Handle', 'Followers', 'Posts', 'Avg Engagement', 'Status']
    sm_rows = [
        ['Instagram', '@indriyax.vision', '320', '~20', '10-18 likes, 0 comments', 'Active'],
        ['LinkedIn', '/company/indriya-x', '291-300', '~15', '1-20 reactions, 0-3 comments', 'Active'],
        ['Facebook', '61577803987898', '<200', '~20', '5-15 likes, 0 comments', 'Active (mirrored)'],
        ['YouTube', '@INDRIYAX', '<100', '1-2', '50-200 views', 'Active (slow)'],
        ['Twitter/X', 'NONE', 'N/A', 'N/A', 'N/A', 'ABSENT'],
        ['TikTok', 'NONE', 'N/A', 'N/A', 'N/A', 'ABSENT'],
        ['Reddit', 'NONE', 'N/A', 'N/A', 'N/A', 'ABSENT'],
        ['Telegram', 'NONE', 'N/A', 'N/A', 'N/A', 'ABSENT'],
        ['Discord', 'NONE', 'N/A', 'N/A', 'N/A', 'ABSENT'],
    ]
    story.append(make_table(sm_headers, sm_rows,
                            [0.8*inch, 1.1*inch, 0.6*inch, 0.5*inch, 1.5*inch, CONTENT_W - 4.5*inch]))
    story.append(spacer(2))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Social Media Health Score: 28 / 100 (CRITICAL)</b></font>',
        ParagraphStyle('SMHScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    smh_headers = ['Category', 'Score', 'Max', 'Notes']
    smh_rows = [
        ['Platform Coverage', '4', '25', 'Only 4 of 12+ key platforms'],
        ['Audience Size', '3', '25', '<1,500 total followers across all platforms'],
        ['Content Quality', '8', '15', 'Good clinical content, boring format'],
        ['Engagement Rate', '2', '15', 'Near-zero interaction'],
        ['Brand Consistency', '5', '10', 'Name inconsistency issues'],
        ['Growth Trajectory', '4', '10', 'New accounts, slow/no growth'],
    ]
    story.append(make_table(smh_headers, smh_rows,
                            [1.5*inch, 0.6*inch, 0.6*inch, CONTENT_W - 2.7*inch]))
    story.append(spacer(2))

    story.append(body(
        '<b>Total Estimated Reach Across All Platforms: Less than 1,500 followers.</b> '
        'For an organization claiming to be a "Research Centre," this is embarrassing. '
        'An individual optometry student probably has more followers. Zero comments across '
        'ALL platforms means zero community conversation. The engagement strategy is '
        '"post and pray" -- and clearly, nobody is praying.'
    ))

    story.append(sub_heading('5.2 Critical Social Media Issues'))
    issues = [
        '<b>Minuscule Audience:</b> Combined <1,500 followers is invisible in the Indian '
        'optometry community. Competitors like OCI have thousands; ODwire has 25,000+.',
        '<b>Zero Viral Content:</b> Every single post reads like a bulletin board flyer. '
        'No content is designed for shareability, discovery, or algorithmic amplification.',
        '<b>Indriya Jewels Confusion:</b> The name "Indriya" is dominated by Aditya Birla '
        'Group\'s jewellery brand with 1.5M+ Facebook likes. 50-80% of search results '
        'return jewellery, not optometry.',
        '<b>No Community Building:</b> Broadcasting, not engaging. No Discord, no Telegram, '
        'no Reddit presence. Social media is two-way; IndriyaX is using it as an announcement board.',
        '<b>Content Variety Score: 2/10.</b> 90% of content is "WEBINAR ALERT" or "WEBINAR '
        'COMPLETED." This is an events calendar, not a social media strategy.',
    ]
    for iss in issues:
        story.append(bullet(iss))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 6: TECHNICAL & SEO AUDIT
    # =========================================================================
    story.append(section_heading('TECHNICAL AND SEO AUDIT', '6'))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>SEO Score: 0/100 (FATAL) | Overall Technical Score: 1.0/10</b></font>',
        ParagraphStyle('SEOBadScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(danger_box(
        '<b>FATAL FINDING:</b> Indriya X Research Centre has NO dedicated website. All 12+ domain '
        'variations tested return DNS failure. The organization operates ENTIRELY through third-party '
        'social media platforms. No independent web property, no landing page, no custom URL, no '
        'content hub exists. This is the single most damaging finding across all 11 agent reports.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('6.1 Domain Test Results'))
    dom_headers = ['Domain Tested', 'Result']
    dom_rows = [
        ['indriyax.com', 'DNS FAILURE (NXDOMAIN)'],
        ['indriyax.in', 'DNS FAILURE'],
        ['indriyax.org', 'DNS FAILURE'],
        ['indriyax.net', 'DNS FAILURE'],
        ['indriya-x.com', 'DNS FAILURE'],
        ['indriya-x.in', 'DNS FAILURE'],
        ['indriyax.co.in', 'DNS FAILURE'],
        ['indriyaxvision.com', 'DNS FAILURE'],
        ['indriyax.vision', 'DNS FAILURE'],
        ['www.indriyax.com', 'DNS FAILURE'],
        ['percivision.com', 'DNS FAILURE'],
        ['percivision.in', 'DNS FAILURE'],
    ]
    story.append(make_table(dom_headers, dom_rows, [2.5*inch, CONTENT_W - 2.5*inch]))
    story.append(spacer(2))

    story.append(sub_heading('6.2 SEO Issue Matrix'))
    seo_headers = ['#', 'Issue', 'Impact', 'Severity']
    seo_rows = [
        ['1', 'No website exists to optimize', 'Cannot rank for any keywords', 'FATAL'],
        ['2', 'No domain registered', 'Zero domain authority, no link equity', 'FATAL'],
        ['3', 'Facebook page has numeric ID (no vanity URL)', 'Unprofessional, hard to share', 'CRITICAL'],
        ['4', 'Zero organic search presence', 'Invisible to anyone searching optometry education', 'CRITICAL'],
        ['5', 'Registration via Google Forms (unbranded)', 'No CRM, no email capture, no retargeting', 'CRITICAL'],
        ['6', 'No content archive or knowledge base', 'Webinars vanish after delivery, zero SEO value', 'CRITICAL'],
        ['7', 'Brand name confusion with Indriya Jewels', '50-80% of search results return jewellery', 'CRITICAL'],
        ['8', 'No email marketing infrastructure', 'No professional email, no mailing list', 'SERIOUS'],
        ['9', 'No structured data (JSON-LD, Organization schema)', 'No rich snippets for webinars/courses', 'SERIOUS'],
        ['10', 'No sitemap, robots.txt, Search Console', 'Zero pages indexed for branded terms', 'SERIOUS'],
        ['11', 'No local SEO (Google Business Profile)', 'No map presence, no local citations', 'MODERATE'],
    ]
    story.append(make_table(seo_headers, seo_rows,
                            [0.3*inch, 2.5*inch, 2.0*inch, CONTENT_W - 4.8*inch]))
    story.append(spacer(2))

    story.append(sub_heading('6.3 Competitive Technical Benchmarking'))
    tech_headers = ['Feature', 'Indriya X', 'IAO', 'ZEISS Academy', 'Optocase']
    tech_rows = [
        ['Website', 'NONE', 'iamopto.com', 'zeiss.co.in', 'optocase.com'],
        ['LMS Platform', 'NO', 'YES', 'YES', 'YES'],
        ['Payment Gateway', 'NO', 'YES', 'N/A (free)', 'YES'],
        ['Email Marketing', 'NO', 'YES', 'YES', 'YES'],
        ['SEO Presence', 'ZERO', 'Active', 'Dominant', 'Active'],
        ['Mobile App', 'NO', 'NO', 'NO', 'NO'],
        ['Analytics (GA4)', 'NO', 'YES', 'YES', 'YES'],
    ]
    story.append(make_table(tech_headers, tech_rows,
                            [1.3*inch, 1.2*inch, 1.2*inch, 1.2*inch, CONTENT_W - 4.9*inch]))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 7: COMPETITOR ANALYSIS
    # =========================================================================
    story.append(section_heading('COMPETITOR ANALYSIS', '7'))

    story.append(body(
        '25+ competitors were identified across 6 tiers: direct Indian competitors, '
        'major global CE platforms, specialized neuro-optometry bodies, and student '
        'communities. The competitive gap is not incremental -- it is categorical.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('7.1 Critical-Threat Competitors'))
    ct_headers = ['Competitor', 'Type', 'Key Advantage vs Indriya X', 'Threat Level']
    ct_rows = [
        ['IAO (iamopto.com)', 'Online Academy', 'India\'s first online academy; ISO 9001:2015; university-certified fellowships at INR 15,000', 'EXTREME'],
        ['OCI (ocindia.org)', 'National Peak Body', 'National optometry authority; IAPB member; CE points; 5-year B.Optom advocacy', 'EXTREME'],
        ['COVD/OVDRA', 'Professional Body', '54-year authority; board certification; peer-reviewed journal', 'HIGH'],
        ['OEPF', 'Nonprofit', 'Recognized certification (COEP); specialty courses in TBI, sports vision', 'HIGH'],
        ['NORA', 'Professional Body', 'Global neuro-optometric rehabilitation authority; clinical fellowship', 'HIGH'],
        ['ZEISS Academy', 'Corporate', 'FREE, 60+ modules, backed by 5B euro company, India-specific page', 'HIGH'],
        ['OPTOBHARAT', 'Student Community', 'Nearly identical model, same timeline, same audience, broader scope', 'HIGH'],
        ['Sankara Nethralaya', 'Hospital E-Learning', '45+ years institutional reputation, India\'s premier eye hospital', 'HIGH'],
        ['mieducation', 'International', 'OCI-accredited, launched in India from Australia', 'MEDIUM-HIGH'],
        ['Woo University', 'Corporate (B+L)', 'FREE + COPE-approved + Bausch + Lomb backing, 100+ hours', 'MEDIUM-HIGH'],
    ]
    story.append(make_table(ct_headers, ct_rows,
                            [1.2*inch, 0.9*inch, 2.8*inch, CONTENT_W - 4.9*inch]))
    story.append(spacer(3))

    story.append(sub_heading('7.2 Competitive Gap Analysis'))
    gap_headers = ['Metric', 'Indriya X', 'Top Competitor', 'Gap']
    gap_rows = [
        ['LinkedIn Followers', '300', 'OCI (1,000s+)', '10x+'],
        ['Instagram Presence', '320', 'COVD/AOA (10,000+)', '33x+'],
        ['Community Size', '~few hundred (WhatsApp)', 'ODwire (25,000+)', '100x+'],
        ['CE Credits Offered', '0 (not COPE)', 'CEwire (77/year)', 'Infinite'],
        ['Certification Value', 'None (e-cert)', 'IAO (University)', 'Existential'],
        ['Funding', '$0', 'Eyes On Eyecare ($200K)', '$200K+'],
        ['Team Size', '2', 'IAO/AOA (100s)', '50x+'],
        ['Website / Domain', 'NONE', 'ALL competitors', 'Critical'],
        ['Revenue Model', 'NONE', 'All funded ones', 'Existential'],
        ['Years in Market', '<1', 'COVD (54+)', '54x'],
        ['Market Share', '~0%', 'Varies', 'Total'],
    ]
    story.append(make_table(gap_headers, gap_rows,
                            [1.5*inch, 1.3*inch, 1.6*inch, CONTENT_W - 4.4*inch]))
    story.append(spacer(2))

    story.append(danger_box(
        '<b>The "Feeder" Problem:</b> IndriyaX is inadvertently building audiences FOR its competitors. '
        'When IndriyaX hosts a webinar with a NORA-affiliated speaker (like Dr. Cathy Stern, FNORA), '
        'it is creating demand for NORA certification, driving students to seek REAL credentials from '
        'these organizations. IndriyaX is a MARKETING CHANNEL for its competitors, not a competitor itself.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 8: CONTENT & UX CRITIQUE
    # =========================================================================
    story.append(section_heading('CONTENT AND UX CRITIQUE', '8'))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Overall Content and UX Score: 3.2 / 10 (F)</b></font>',
        ParagraphStyle('UXScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('8.1 Content Quality Ratings'))
    ux_headers = ['Category', 'Score', 'Assessment']
    ux_rows = [
        ['Clarity of Messaging', '3/10', 'Cannot decide what it is: research centre, platform, community, or media brand'],
        ['Value Proposition', '4/10', '"We do webinars" is not a moat -- that is a Zoom link with a logo'],
        ['Copy Quality', '5/10', 'Reasonably structured LinkedIn posts; same text copy-pasted across platforms'],
        ['Content Depth', '3/10', 'No content hub, no blog, no research output, no case studies'],
        ['CTA Clarity', '3/10', '"Registration link in bio" leads to WhatsApp -- 7-step funnel for a free webinar'],
        ['Trust Signals', '2/10', 'No website, no testimonials, no team page, no accreditation, no address'],
        ['Social Post Quality', '3/10', 'Event-driven only; 50% webinar announcements, 30% completion posts'],
        ['Visual Design', '4/10', 'Professional graphics but no consistent visual identity or brand guide'],
        ['Engagement Strategy', '1/10', '"Post and pray" -- literally nobody is praying'],
        ['Content Variety', '2/10', '100% webinar-centric; no case studies, tips, behind-the-scenes, or UGC'],
        ['Navigation / IA', '1/10', 'No navigable digital presence; information scattered across 4+ platforms'],
        ['Mobile Experience', '3/10', 'Social media is mobile-native but no controlled conversion funnel'],
        ['User Journey', '2/10', '7 steps to attend a free webinar; every step is a drop-off point'],
    ]
    story.append(make_table(ux_headers, ux_rows,
                            [1.5*inch, 0.7*inch, CONTENT_W - 2.2*inch]))
    story.append(spacer(2))

    story.append(sub_heading('8.2 The "Research Centre" Problem'))
    story.append(body(
        'Indriya X calls itself a "Research Centre" but has zero research output: no publications, '
        'no citations, zero IRB-registered studies, no grants, no lab infrastructure. Zero. '
        'The only "research" happening is webinar content curation. This claim will become a '
        'trust liability the moment any optometrist with a critical eye looks closely.'
    ))
    story.append(body(
        'The "X" in the brand name suggests innovation and the unknown. But the actual offering '
        '(webinars on OCT interpretation and contact lens fitting) is the most conventional format '
        'in optometry education. The brand name promises Tesla; the product delivers a bus schedule.'
    ))

    story.append(sub_heading('8.3 The 7-Step Webinar Funnel'))
    story.append(body('Current user journey (best case):'))
    funnel_items = [
        '<b>Step 1:</b> User sees Instagram reel/repost -- interested',
        '<b>Step 2:</b> User reads caption -- finds "Registration link in bio"',
        '<b>Step 3:</b> User goes to bio -- clicks WhatsApp link (no Linktree)',
        '<b>Step 4:</b> User joins WhatsApp community -- receives broadcast messages',
        '<b>Step 5:</b> User sees webinar registration link in WhatsApp -- clicks',
        '<b>Step 6:</b> User fills out external Google Forms registration (unbranded)',
        '<b>Step 7:</b> User attends webinar via separate Google Meet link',
    ]
    for item in funnel_items:
        story.append(bullet(item))
    story.append(body(
        'Seven steps to attend a FREE webinar. Every step is a drop-off point. '
        'There is no email capture, no calendar integration, no confirmation sequence, '
        'and no post-event follow-up. After step 7, the attendee is a lost lead.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 9: RISE & FALL ANALYSIS
    # =========================================================================
    story.append(section_heading('RISE AND FALL ANALYSIS', '9'))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Momentum Score: 4.5 / 10 (D+) | Trajectory: Marginal Rise (Decelerating)</b></font>',
        ParagraphStyle('RFScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('9.1 Timeline: December 2025 - May 2026'))

    timeline_headers = ['Date', 'Milestone']
    timeline_rows = [
        ['Dec 25, 2025', 'Official launch: First Instagram reel introducing Indriya X Research Centre'],
        ['Dec 27, 2025', 'Percivision collaboration announced'],
        ['Jan 2026', 'Media partnership with Optician India; LinkedIn company page created; Vidyasagar College collaboration'],
        ['Feb 2026', 'A-Scan Biometry webinar; Dr. Agarwals Institute collaboration'],
        ['Mar 2026', '"From Visual Acuity to Visual Performance" completed; Scleral Lenses workshop; Case Presentation webinar'],
        ['Apr 2026', 'OptoTalks series launched; Dry Eye webinar completed; Embryology content series'],
        ['May 2026', 'Neuro-optometry international webinars; Myopia Management with Dr. Vishakha Thakrar (South Africa); First paid certificate program (INR 1,475); OptoBridge 2026 event; WBAO quiz competition'],
    ]
    story.append(make_table(timeline_headers, timeline_rows,
                            [1.2*inch, CONTENT_W - 1.2*inch]))
    story.append(spacer(2))

    story.append(sub_heading('9.2 Rise Indicators (Score: 5.7/10)'))
    rise_items = [
        '<b>Execution Velocity (8/10):</b> 10+ webinars, 3 content formats, 6+ partnerships, '
        'international faculty in 6 months. Impressive for a solo operation.',
        '<b>Strategic Partnerships (7/10):</b> Percivision + Optician India + Vidyasagar College + '
        'Dr. Agarwals + HITS + WBAO. Exceptional networking for a zero-budget entity.',
        '<b>Niche Positioning (6.5/10):</b> Neuro-optometry is genuinely underserved in India. '
        'Concussion-related visual testing is a first-mover move.',
        '<b>International Speaker Access (6/10):</b> South Africa, USA, Canada faculty sourced '
        'at zero cost suggests strong professional networking.',
        '<b>Content Format Innovation (5.5/10):</b> OptoTalks (reels + theory + case-based) shows '
        'modern content consumption awareness.',
    ]
    for item in rise_items:
        story.append(bullet(item))

    story.append(sub_heading('9.3 Fall Indicators (Score: 7.4/10 -- HIGH FALL RISK)'))
    fall_items = [
        '<b>Zero Digital Infrastructure (Fall Risk 9/10):</b> NO website, NO domain, NO Linktree, '
        'NO landing page, NO LMS. The entire digital existence is scattered across social media.',
        '<b>Brand Name Annihilation (Fall Risk 9/10):</b> "Indriya" is a Rs 5,000 crore Aditya '
        'Birla jewellery brand. Organic growth through Google is mathematically impossible.',
        '<b>Abysmal Engagement (Fall Risk 8/10):</b> 320 followers, 10-18 likes/reel, ZERO comments. '
        'Instagram algorithm will progressively bury content.',
        '<b>Zero Revenue Model (Fall Risk 8/10):</b> Estimated INR 0-15,000/month. "Free content '
        'fatigue" means no monetization path. Without revenue, cannot build team or invest in growth.',
        '<b>Single-Point-of-Failure (Fall Risk 8/10):</b> Everything flows through Anik Dingal: '
        'content, speakers, social media, design, community, partnerships. If he burns out, '
        'IndriyaX evaporates overnight.',
        '<b>No Accreditation (Fall Risk 7/10):</b> Competitors offer OCI-accredited, COPE-approved, '
        'university-recognized credentials. IndriyaX offers e-certificates worth nothing.',
        '<b>Non-existent Tech Platform (Fall Risk 7/10):</b> Google Meet + WhatsApp + Instagram '
        'cannot scale beyond a few hundred participants.',
        '<b>Competitive Encirclement (Fall Risk 6/10):</b> ZEISS (free, 60+ modules), IAO (fellowships), '
        'mieducation (OCI-accredited, India entry) are all expanding.',
    ]
    for item in fall_items:
        story.append(bullet(item))

    story.append(sub_heading('9.4 Trajectory Forecast'))
    traj_headers = ['Scenario', 'Probability', 'Description', 'End State (3 Years)']
    traj_rows = [
        ['Acceleration', '15%', 'Percivision converts to real LMS; seed funding secured; website launched; accredited programs', 'Viable niche education business, INR 2-5 Cr/year'],
        ['Plateau (MOST LIKELY)', '45%', 'Status quo: founder continues alone, no website, no revenue, 300-500 followers', 'Dormant project with occasional activity; not dead, not alive'],
        ['Decline', '30%', 'Founder burnout/graduation; key partner loss; algorithm burial; competitor entry', 'Defunct. Digital ghost town with inactive social accounts'],
        ['Acquisition', '10%', 'Larger player recognizes niche positioning and founder expertise', 'Brand absorbed into larger platform; founder becomes employee'],
    ]
    story.append(make_table(traj_headers, traj_rows,
                            [1.0*inch, 0.8*inch, 2.5*inch, CONTENT_W - 4.3*inch]))
    story.append(spacer(2))

    story.append(sub_heading('9.5 Survival Probability'))
    surv_headers = ['Timeframe', 'Still Operational', 'Still Growing', 'Dormant', 'Defunct']
    surv_rows = [
        ['12 Months', '65%', '25%', '8%', '2%'],
        ['24 Months', '40%', '15%', '25%', '20%'],
    ]
    story.append(make_table(surv_headers, surv_rows,
                            [1.2*inch, 1.2*inch, 1.2*inch, 1.2*inch, CONTENT_W - 4.8*inch]))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 10: BRAND POSITIONING
    # =========================================================================
    story.append(section_heading('BRAND POSITIONING ANALYSIS', '10'))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Brand Positioning Score: 3.0 / 10 (F) -- 3 EXISTENTIAL WEAKNESSES</b></font>',
        ParagraphStyle('BPScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('10.1 The Existential Name Crisis'))
    story.append(danger_box(
        '<b>CATASTROPHIC NAME CONFUSION:</b> "Indriya" is the trademark of Aditya Birla Group\'s '
        'Rs 5,000 crore jewellery retail chain with 50+ stores, massive marketing budgets, '
        'celebrity endorsements (Disha Patani, Amit Aggarwal), and collaborations with Vogue India, '
        'FDCI, and Paris Couture Week. Every single Google search for "Indriya" returns the jewellery '
        'brand. The "X" suffix barely differentiates. This is not a naming inconvenience -- it is a '
        'brand-killer and a searchability death sentence.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('10.2 Brand Identity Confusion'))
    brand_headers = ['Context', 'Name Used', 'Platform']
    brand_rows = [
        ['Instagram bio', 'IndriyaX', 'Instagram'],
        ['LinkedIn company page', 'INDRIYA X', 'LinkedIn'],
        ['Partnership announcement', 'IndriyaX -- Vision Innovation', 'Instagram/LinkedIn'],
        ['Webinar announcements', 'Indriya X Research Centre', 'LinkedIn'],
        ['Launch reel hashtag', '#perceivision (typo)', 'Instagram'],
        ['LinkedIn tagline', 'Research and learning platform for vision scientist (grammatically awkward)', 'LinkedIn'],
    ]
    story.append(make_table(brand_headers, brand_rows,
                            [1.5*inch, 3.0*inch, CONTENT_W - 4.5*inch]))
    story.append(spacer(2))

    story.append(sub_heading('10.3 Positioning Gap Analysis'))
    gap2_headers = ['Dimension', 'Where Indriya X Wants to Be', 'Where It Actually Is']
    gap2_rows = [
        ['Brand Recognition', 'Known in Indian optometry community', 'Invisible. Lost in Aditya Birla jewellery search results'],
        ['Digital Presence', 'Professional learning platform with LMS', 'Gmail + WhatsApp + social media only. No website.'],
        ['Credibility', 'Research-backed institution with expert faculty', 'Individual founder effort, no formal backing'],
        ['Accreditation', 'Accredited CE provider', 'No accreditation mentioned anywhere'],
        ['Content Quality', 'Structured curriculum with learning pathways', 'Ad-hoc webinars, no on-demand library'],
        ['Revenue Model', 'Sustainable education business', 'No revenue model visible'],
        ['Audience Engagement', 'Active community of thousands', '2-18 likes per post'],
        ['Competitive Moat', 'Unique specialization or network effect', 'No differentiation'],
    ]
    story.append(make_table(gap2_headers, gap2_rows,
                            [1.2*inch, 2.5*inch, CONTENT_W - 3.7*inch]))
    story.append(spacer(2))

    story.append(sub_heading('10.4 Suggested Rebrand Names'))
    rebrand = [
        'VisionAxis -- Axis of vision science, forward motion',
        'OptoLab -- Suggests experimentation, research, innovation',
        'NeuroVista -- Neuro + vision + vista (Spanish for "view")',
        'OptomForge -- Where optometry skills are forged',
        'SightBridge -- Bridging students to clinical excellence',
        'ClarityEd -- Clarity + Education',
    ]
    for r in rebrand:
        story.append(bullet(r))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 11: REVENUE & MONETIZATION
    # =========================================================================
    story.append(section_heading('REVENUE AND MONETIZATION ANALYSIS', '11'))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Revenue Model Score: 2.0 / 10 (F) | Sustainability: UNSUSTAINABLE</b></font>',
        ParagraphStyle('RevScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('11.1 Current Revenue Streams'))

    rev_headers = ['Stream', 'Monthly Estimate', 'Annual Estimate', 'Confidence']
    rev_rows = [
        ['Free Webinars', 'INR 0', 'INR 0', 'HIGH'],
        ['Paid Certificate Programs', 'INR 0-15,000', 'INR 0-180,000', 'LOW'],
        ['Quiz Competitions', 'INR 0', 'INR 0', 'HIGH'],
        ['Content / Social Media', 'INR 0', 'INR 0', 'HIGH'],
        ['Sponsorships', 'INR 0', 'INR 0', 'HIGH'],
        ['TOTAL', 'INR 0-15,000', 'INR 0-300,000 (~$0-$3,600)', 'LOW'],
    ]
    story.append(make_table(rev_headers, rev_rows,
                            [1.8*inch, 1.3*inch, 1.5*inch, CONTENT_W - 4.6*inch]))
    story.append(spacer(2))

    story.append(sub_heading('11.2 Cost Structure (Estimated)'))
    cost_headers = ['Cost Item', 'Monthly Estimate', 'Notes']
    cost_rows = [
        ['Webinar Platform (Google Meet)', 'INR 0-1,500', 'Free tier or Pro subscription'],
        ['Social Media Tools (Canva)', 'INR 500', 'Basic plan'],
        ['Certificate Generation', 'INR 500', 'Digital certificates'],
        ['Speaker Honorarium', 'INR 0-5,000', 'Most speakers appear unpaid'],
        ['Marketing / Promotion', 'INR 0', 'Organic only'],
        ['Domain / Hosting', 'INR 0', 'No website'],
        ['TOTAL MONTHLY BURN', 'INR 2,500-7,500', 'Minimal overhead (also zero growth investment)'],
    ]
    story.append(make_table(cost_headers, cost_rows,
                            [1.8*inch, 1.3*inch, CONTENT_W - 3.1*inch]))
    story.append(spacer(2))

    story.append(sub_heading('11.3 Revenue Scenarios'))
    scen_headers = ['Scenario', 'Year 1 (2026)', 'Year 2 (2027)', 'Year 3 (2028)', 'Assessment']
    scen_rows = [
        ['Conservative', 'INR 0-3L ($0-$3.6K)', 'INR 0-5L ($0-$6K)', 'INR 1-8L ($1.2K-$9.6K)', 'Hobby-level income'],
        ['Moderate', 'INR 8-15L ($9.6K-$18K)', 'INR 20-40L ($24K-$48K)', 'INR 50L-1Cr ($60K-$120K)', 'Small viable business'],
        ['Aggressive', 'INR 20-40L ($24K-$48K)', 'INR 75L-1.5Cr ($90K-$180K)', 'INR 2-5Cr ($240K-$600K)', 'Market leader potential'],
    ]
    story.append(make_table(scen_headers, scen_rows,
                            [1.0*inch, 1.3*inch, 1.3*inch, 1.3*inch, CONTENT_W - 4.9*inch]))
    story.append(spacer(2))

    story.append(sub_heading('11.4 Market Opportunity'))
    story.append(body(
        'India\'s Continuing Education market is projected at $6.3 billion (2025), growing '
        'to $11 billion by 2034 at 6.13% CAGR. India has approximately 60,000-80,000 optometrists '
        'and 200+ optometry colleges producing 5,000-8,000 graduates annually. The addressable '
        'niche for English-speaking optometry professionals actively pursuing CE is estimated '
        'at 10,000-20,000. With the NCAHP Act 2021 mandating continuing professional development, '
        'the demand for accredited online education will only increase.'
    ))
    story.append(body(
        'The addressable market supports a INR 2-5 crore/year business within 3 years -- IF '
        'IndriyaX can make the leap from passion project to platform. Without structural changes, '
        'the market opportunity is theoretical, not attainable.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 12: INDIYA X vs NEUROPTECH COMPARISON
    # =========================================================================
    story.append(section_heading('INDRIYA X vs NEUROPTECH COMPARISON', '12'))

    story.append(body(
        'Since both Indriya X and Neuroptech were analyzed as part of this intelligence operation, '
        'a direct comparison reveals the relative strengths and weaknesses of each entity. Both '
        'operate in the neuro-optometry education space in India, both are founder-driven, and '
        'both are structurally fragile. However, the comparison reveals important differences '
        'in execution velocity, partnership quality, and growth trajectory.'
    ))
    story.append(spacer(2))

    comp_headers = ['Dimension', 'Indriya X', 'Neuroptech']
    comp_rows = [
        ['Age', '6 months', '1.5 years'],
        ['Team', '2 people', '2 people'],
        ['Founder Background', 'Practicing optometrist, M.Optom student', 'Optometry students'],
        ['Website', 'NONE', 'Lovable subdomain (basic)'],
        ['Instagram', '320 followers', '58 followers'],
        ['LinkedIn', '300 followers', '457 followers'],
        ['YouTube', '<100 subscribers', '~10 subscribers'],
        ['Partnerships', '6+ (Percivision, Optician India, etc.)', '1 (NIIT)'],
        ['Webinars Hosted', '10+ in 6 months', '50+ claimed'],
        ['Accreditation', 'None', 'None'],
        ['Revenue', '~$3,600/year max', '$0'],
        ['International Speakers', 'YES (South Africa, USA, Canada)', 'YES (Guatemala, Mexico)'],
        ['Brand Name Risk', 'CRITICAL (Indriya Jewels collision)', 'HIGH ("neuroptech" = $15B industry)'],
        ['Overall Score', '2.7/10 (F-)', '3.2/10 (F)'],
        ['Momentum', '4.5/10 (D+)', '3.2/10 (D-)'],
        ['24-Month Survival', '40%', '20%'],
    ]
    story.append(make_table(comp_headers, comp_rows,
                            [1.5*inch, 2.4*inch, CONTENT_W - 3.9*inch]))
    story.append(spacer(3))

    story.append(callout_box(
        '<b>Head-to-Head Verdict:</b> Both are solo passion projects, but Indriya X has stronger '
        'execution velocity (10+ webinars with real partnerships in 6 months) while Neuroptech '
        'has more longevity (1.5 years) and a marginally better LinkedIn presence (457 vs 300). '
        'Neither is a real business. IndriyaX has more momentum but faces a worse brand name '
        'crisis (Indriya Jewels vs generic "neuroptech"). Neuroptech built a website with no '
        'users; IndriyaX built partnerships with no website. Pick your poison.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 13: STRATEGIC RECOMMENDATIONS
    # =========================================================================
    story.append(section_heading('STRATEGIC RECOMMENDATIONS', '13'))
    story.append(body(
        'The following 20 recommendations are organized into 4 priority tiers based on urgency '
        'and impact. Each recommendation includes an estimated effort level and expected outcome.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('13.1 TIER 1: IMMEDIATE (Week 1-2)'))
    imm_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    imm_rows = [
        ['1', 'Register indriyax.in, indriyax.com, indriyax.org IMMEDIATELY (domain hijacking risk)', '30 min', 'CRITICAL'],
        ['2', 'Build a single-page landing site (Carrd, Notion, or GitHub Pages -- free)', '2-4 hours', 'CRITICAL'],
        ['3', 'Set Facebook vanity URL to facebook.com/IndriyaX (currently numeric ID)', '30 seconds', 'HIGH'],
        ['4', 'Create email list via Mailchimp free tier; add signup to every webinar form', '1 hour', 'HIGH'],
        ['5', 'Evaluate rebrand to "IndriyaX Optometry" or complete rebrand (name crisis)', 'Ongoing', 'CRITICAL'],
    ]
    story.append(colored_table(imm_headers, imm_rows,
        [0.3*inch, 3.2*inch, 0.8*inch, CONTENT_W - 4.3*inch], SEM_ERROR))
    story.append(spacer(3))

    story.append(sub_heading('13.2 TIER 2: SHORT-TERM (Month 1-3)'))
    short_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    short_rows = [
        ['6', 'Build real website with course catalog, speaker bios, webinar archive, email capture', '1-2 weeks', 'CRITICAL'],
        ['7', 'Launch YouTube channel properly: custom thumbnails, SEO titles, playlists', '3-5 days', 'HIGH'],
        ['8', 'Record and repurpose every webinar: 1 webinar = 15+ content pieces', 'Ongoing', 'HIGH'],
        ['9', 'Pursue OCI accreditation for at least one certificate program', '2-6 months', 'VERY HIGH'],
        ['10', 'Create first paid course (OCT Masterclass at INR 2,999; target 50 registrations)', '1 week', 'HIGH'],
        ['11', 'Capture email leads at every touchpoint; weekly clinical tips newsletter', '2 days', 'HIGH'],
        ['12', 'Set up Google Analytics 4, Search Console, and social media analytics', '4 hours', 'MEDIUM'],
    ]
    story.append(colored_table(short_headers, short_rows,
        [0.3*inch, 3.2*inch, 0.8*inch, CONTENT_W - 4.3*inch], SEM_WARNING))
    story.append(spacer(3))

    story.append(sub_heading('13.3 TIER 3: MEDIUM-TERM (Month 3-6)'))
    med_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    med_rows = [
        ['13', 'Launch 3-tier pricing: Free (webinars), Pro (INR 299-499/mo), Premium (INR 9999-19999/yr)', '2-4 weeks', 'HIGH'],
        ['14', 'Secure first corporate sponsorship (Alcon, J+J Vision, Bausch+Lomb)', '2-4 weeks', 'VERY HIGH'],
        ['15', 'Develop LMS platform (Teachable, Thinkific, or custom via Percivision)', '4-8 weeks', 'CRITICAL'],
        ['16', 'Apply for Startup India recognition (DPIIT) for tax benefits and grant eligibility', '1-2 weeks', 'MEDIUM'],
        ['17', 'Launch campus ambassador program across 10-15 optometry colleges', '4-6 weeks', 'HIGH'],
    ]
    story.append(colored_table(med_headers, med_rows,
        [0.3*inch, 3.2*inch, 0.8*inch, CONTENT_W - 4.3*inch], SEM_INFO))
    story.append(spacer(3))

    story.append(sub_heading('13.4 TIER 4: LONG-TERM (Month 6-12)'))
    long_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    long_rows = [
        ['18', 'Seek seed funding (INR 5-10 lakh) from angel investors or healthcare edtech VCs', '4-8 weeks', 'VERY HIGH'],
        ['19', 'Expand internationally (SEA, Middle East, Africa) leveraging speaker network', 'Ongoing', 'HIGH'],
        ['20', 'Build team of 2-3 part-time contributors (social media, webinar coordinator, content editor)', 'Ongoing', 'CRITICAL'],
    ]
    story.append(colored_table(long_headers, long_rows,
        [0.3*inch, 3.2*inch, 0.8*inch, CONTENT_W - 4.3*inch], SEM_SUCCESS))
    story.append(spacer(3))

    story.append(sub_heading('13.5 Key Decision Points (Next 90 Days)'))
    story.append(body(
        'The following decisions will determine whether IndriyaX accelerates or fades:'
    ))
    decisions = [
        '<b>WEBSITE DECISION (June 2026):</b> Build indriyax.in or remain invisible? '
        'This alone determines 50% of the trajectory. Without a website, decline becomes dominant.',
        '<b>REVENUE DECISION (July 2026):</b> Launch paid courses/subscriptions or remain 100% free? '
        'Without revenue, cannot invest in growth or build a team.',
        '<b>TEAM DECISION (August 2026):</b> Hire/recruit 2-3 part-time contributors or continue solo? '
        'Founder burnout is not a possibility -- it is a probability at current pace.',
        '<b>ACCREDITATION DECISION (Q3 2026):</b> Apply for OCI accreditation or remain uncredentialed? '
        'This determines whether webinars have professional value or are just "nice content."',
        '<b>BRAND DECISION (Ongoing):</b> Address "Indriya" name collision or accept permanent '
        'search invisibility. Consider rebrand to "IndriyaX Optometry" or completely new name.',
    ]
    for d in decisions:
        story.append(bullet(d))

    story.append(spacer(4))
    story.append(hr_line())

    # FINAL VERDICT BOX
    story.append(spacer(2))
    story.append(overall_bar(
        'FINAL VERDICT: IndriyaX is NOT a business. It is a well-executed passion project that '
        'COULD become a business IF the founder makes 3-4 critical structural decisions in the next 90 days. '
        '24-Month Survival Probability: 40%. | Overall Score: 2.7/10 (F-)'
    ))
    story.append(spacer(3))

    story.append(body(
        'The founder has the right instincts -- right niche (neuro-optometry), right market '
        '(India\'s growing optometry workforce), right format (webinars + short-form content), '
        'right partnerships (Percivision, Optician India), and right timing (post-COVID shift '
        'to online education). But NONE of the right infrastructure: no website, no revenue model, '
        'no team, no accreditation, no email list, no analytics, no content library, no payment '
        'system, no brand clarity, no SEO strategy.'
    ))
    story.append(body(
        'It is like having the perfect recipe but no kitchen, no ingredients, and no plates '
        'to serve the food on. The clock is ticking. The competitor field is getting more crowded '
        'every month. Indian optometry CE is transitioning from "nobody cares" to "everybody '
        'wants in" -- and the window for a newcomer to establish themselves is narrowing.'
    ))

    story.append(spacer(6))
    story.append(Paragraph(
        '<font size="9" color="#848b8e"><i>This report was compiled by Focuslinks Strategic Intelligence '
        'from 11 independent research agents. All data is sourced from publicly available information '
        'including social media profiles, LinkedIn company pages, web search results, and publicly '
        'posted content. Classification: CONFIDENTIAL. Distribution: Restricted.</i></font>',
        ParagraphStyle('FinalNote', fontName='Times New Roman', fontSize=9, leading=13,
                       textColor=TEXT_MUTED, alignment=TA_LEFT)))

    return story

# =============================================================================
# MAIN
# =============================================================================
if __name__ == '__main__':
    OUTPUT = '/home/z/my-project/download/indriya_body.pdf'
    doc = ReportDocTemplate(OUTPUT, pagesize=A4,
                            leftMargin=MARGIN, rightMargin=MARGIN,
                            topMargin=MARGIN, bottomMargin=MARGIN)
    story = build_content()
    doc.build(story)
    print(f'Body PDF generated: {OUTPUT}')
