#!/usr/bin/env python3
"""
Neuroptech Live Strategic Intelligence Report - Body PDF Generator
Uses ReportLab to generate a comprehensive multi-section professional report.
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
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, NextPageTemplate
from reportlab.platypus.frames import Frame
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.graphics.shapes import Drawing, Rect, String, Line
from reportlab.graphics import renderPDF

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
registerFontFamily('DejaVuSans',
    normal='DejaVuSans', bold='DejaVuSans')

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
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=6*mm,
    spaceBefore=0))

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
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=3*mm,
    spaceBefore=0, firstLineIndent=0))

styles.add(ParagraphStyle(
    'BodyBold', fontName='Times New Roman', fontSize=10.5, leading=15,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=2*mm,
    spaceBefore=2*mm))

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
    'TableCellBold', fontName='Times New Roman', fontSize=9.5, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=0, spaceBefore=0))

styles.add(ParagraphStyle(
    'ScoreBig', fontName='Calibri', fontSize=20, leading=24,
    textColor=SEM_ERROR, alignment=TA_CENTER, spaceAfter=2*mm))

styles.add(ParagraphStyle(
    'GradeBig', fontName='Calibri', fontSize=18, leading=22,
    textColor=SEM_ERROR, alignment=TA_CENTER, spaceAfter=2*mm))

styles.add(ParagraphStyle(
    'FooterStyle', fontName='Calibri', fontSize=8, leading=10,
    textColor=TEXT_MUTED, alignment=TA_CENTER))

styles.add(ParagraphStyle(
    'TOCEntry', fontName='Calibri', fontSize=11, leading=20,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=1*mm))

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
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=4*mm,
    spaceBefore=2*mm, fontStyle='italic'))


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def section_heading(text, number=None):
    """Create a section heading with optional number."""
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
    """Create a callout/highlight box."""
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

def spacer(h=3):
    return Spacer(1, h*mm)

def hr_line():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER,
                      spaceAfter=4*mm, spaceBefore=4*mm)

def make_table(headers, rows, col_widths=None):
    """Create a styled table with headers and striped rows."""
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
    # Stripe odd rows
    for i in range(2, len(data), 2):
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t


def score_card(label, score, grade):
    """Create a colored score card cell."""
    if grade.startswith('F'):
        clr = SEM_ERROR.hexval()
    elif grade.startswith('D'):
        clr = SEM_WARNING.hexval()
    elif grade.startswith('C'):
        clr = SEM_INFO.hexval()
    else:
        clr = SEM_SUCCESS.hexval()
    return Paragraph(
        f'{label}<br/><font size="12" color="{clr}"><b>{score} ({grade})</b></font>',
        styles['TableCell'])

def colored_badge(text, bg_color, text_color=WHITE):
    """Create an inline colored badge."""
    return f'<font color="{text_color.hexval()}">' \
           f'<backcolor alpha="1" color="{bg_color.hexval()}"> {text} </backcolor>' \
           f'</font>'


# =============================================================================
# DOCUMENT TEMPLATE WITH TOC
# =============================================================================

class ReportDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kw):
        super().__init__(filename, **kw)
        self.page_count = 0

        frame = Frame(MARGIN, MARGIN + 12*mm,
                     CONTENT_W, PAGE_H - 2*MARGIN - 12*mm,
                     id='normal')
        template = PageTemplate(id='Later', frames=frame,
                               onPage=self._later_page)
        self.addPageTemplates([template])

    def _later_page(self, canvas, doc):
        canvas.saveState()
        # Page number
        page_num = doc.page - 1  # cover is page 0
        if page_num > 0:
            canvas.setFont('Calibri', 8)
            canvas.setFillColor(TEXT_MUTED)
            canvas.drawCentredString(PAGE_W / 2, 8*mm,
                f'Neuroptech Live Strategic Intelligence Report  |  Page {page_num}')
            # Top line
            canvas.setStrokeColor(BORDER)
            canvas.setLineWidth(0.5)
            canvas.line(MARGIN, PAGE_H - MARGIN + 4*mm,
                        PAGE_W - MARGIN, PAGE_H - MARGIN + 4*mm)
            # Header text
            canvas.setFont('Calibri', 7)
            canvas.setFillColor(TEXT_MUTED)
            canvas.drawString(MARGIN, PAGE_H - MARGIN + 6*mm,
                'FOCUSLINKS STRATEGIC INTELLIGENCE')
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 6*mm,
                'CONFIDENTIAL')
            # Bottom line
            canvas.line(MARGIN, 13*mm, PAGE_W - MARGIN, 13*mm)
        canvas.restoreState()


# =============================================================================
# BUILD CONTENT
# =============================================================================

def build_content():
    story = []

    # -------------------------------------------------------------------------
    # TABLE OF CONTENTS (Manual Build)
    # -------------------------------------------------------------------------
    story.append(NextPageTemplate('Later'))
    story.append(Paragraph('<font color="#3e5864" size="22"><b>TABLE OF CONTENTS</b></font>',
                           ParagraphStyle('TOCTitle', fontName='Calibri',
                                         fontSize=22, leading=28,
                                         textColor=HEADER_FILL,
                                         spaceAfter=6*mm)))
    story.append(spacer(2))

    toc_entries = [
        ('1', 'Executive Summary', '3'),
        ('2', 'Company Overview', '4'),
        ('3', 'SWOT Analysis', '6'),
        ('4', 'Marketing Analytics', '9'),
        ('5', 'Social Media Intelligence', '10'),
        ('6', 'Technical & SEO Audit', '12'),
        ('7', 'Competitor Analysis', '14'),
        ('8', 'Content & UX Critique', '16'),
        ('9', 'Rise & Fall Analysis', '17'),
        ('10', 'Brand Positioning Analysis', '19'),
        ('11', 'Revenue & Monetization Analysis', '20'),
        ('12', 'Strategic Recommendations', '21'),
    ]
    toc_style = ParagraphStyle('TOCEntry2', fontName='Calibri', fontSize=11.5,
                               leading=24, textColor=TEXT_PRIMARY)
    toc_page = ParagraphStyle('TOCPage', fontName='Calibri', fontSize=11.5,
                              leading=24, textColor=TEXT_MUTED, alignment=TA_RIGHT)

    toc_data = []
    for num, title, pg in toc_entries:
        toc_data.append([
            Paragraph(f'<font color="#bc502c">{num}</font>', toc_style),
            Paragraph(title, toc_style),
            Paragraph(pg, toc_page),
        ])
    toc_table = Table(toc_data, colWidths=[0.5*inch, 4.0*inch, CONTENT_W - 4.5*inch])
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
        'Neuroptech (also branded as "Neuroptech Live"), compiled from 11 independent '
        'research agents covering technical SEO, marketing, social media, competitive '
        'landscape, brand positioning, content quality, revenue modeling, and organizational '
        'trajectory.'
    ))
    story.append(spacer(2))
    story.append(callout_box(
        '<b>Brutal Bottom Line:</b> Neuroptech is NOT a tech startup. It is a 2-person '
        'student-led nonprofit for neuro-optometry education in India, with no revenue, '
        'no custom domain, 58 Instagram followers, and no sustainable competitive advantage. '
        'The organization operates on a free Lovable.app subdomain, uses a free Gmail address '
        'for official contact, and its entire "community" lives in a WhatsApp group. '
        'Despite genuine passion from its founders, the project faces existential sustainability '
        'risks and is indistinguishable from a hobby project in its current state.'
    ))
    story.append(spacer(3))

    story.append(sub_heading('Score Card Overview'))

    score_headers = ['Dimension', 'Score', 'Grade']
    score_rows = [
        ['Technical & SEO', '3.2/10', 'F'],
        ['Marketing Presence', '4.5/10', 'D'],
        ['Social Media', '2.5/10', 'F'],
        ['Content & UX', '3.6/10', 'D-'],
        ['Brand Positioning', '3.0/10', 'F'],
        ['Revenue Model', '1.5/10', 'F'],
        ['Competitive Position', '2.0/10', 'F'],
        ['Rise & Fall Momentum', '5.0/10', 'C'],
    ]
    cw = [3.2*inch, 1.5*inch, 1.2*inch]
    t = make_table(score_headers, score_rows, cw)
    # Highlight last row conceptually
    story.append(t)
    story.append(spacer(3))

    # Overall score table
    overall_data = [[
        Paragraph('<b>OVERALL COMPOSITE SCORE</b>', styles['TableHeader']),
        Paragraph('<b>3.2 / 10</b>', ParagraphStyle('BigScore', fontName='Calibri',
                  fontSize=14, leading=18, textColor=WHITE, alignment=TA_CENTER)),
        Paragraph('<b>F</b>', ParagraphStyle('BigGrade', fontName='Calibri',
                  fontSize=14, leading=18, textColor=WHITE, alignment=TA_CENTER)),
    ]]
    ot = Table(overall_data, colWidths=[3.2*inch, 1.5*inch, 1.2*inch])
    ot.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), SEM_ERROR),
        ('TEXTCOLOR', (0, 0), (-1, -1), WHITE),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, WHITE),
    ]))
    story.append(ot)
    story.append(spacer(3))

    story.append(body(
        'The overall score of 3.2/10 places Neuroptech firmly in the "critical intervention '
        'required" category. While the founders demonstrate genuine passion and domain expertise, '
        'the organization lacks every fundamental pillar of a sustainable enterprise: revenue, '
        'professional infrastructure, brand recognition, technical capability, and competitive '
        'positioning. The single bright spot is momentum (5.0/10), which is fragile and entirely '
        'dependent on the founders\' continued personal investment of time and energy.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 2: COMPANY OVERVIEW
    # =========================================================================
    story.append(section_heading('COMPANY OVERVIEW', '2'))

    story.append(sub_heading('2.1 Identity & Background'))
    story.append(body(
        'Neuroptech is a neuro-optometry education community founded in 2025 in India. '
        'The organization positions itself as "The Center for Neuro-Optometry" with the '
        'tagline "Where Vision Meets Innovation." It is listed as a nonprofit on LinkedIn.'
    ))

    overview_headers = ['Attribute', 'Detail']
    overview_rows = [
        ['Legal Name', 'NEUROPTECH (also "Neuroptech Live")'],
        ['Type', 'Nonprofit Organization (claimed)'],
        ['Industry', 'Neuro-Optometry Education / Healthcare Education'],
        ['Founded', '2025 (earliest activity mid-2024)'],
        ['Headquarters', 'India (Delhi NCR region)'],
        ['Website', 'neuroptechlive.lovable.app (free Lovable subdomain)'],
        ['Contact Email', 'neuroptech@gmail.com (free Gmail)'],
        ['LinkedIn', 'linkedin.com/company/neuroptech (457 followers)'],
        ['Claimed Size', '11-50 employees (actual: 2 core members)'],
        ['Tagline', '"Where Vision Meets Innovation"'],
    ]
    story.append(make_table(overview_headers, overview_rows,
                            [2.0*inch, CONTENT_W - 2.0*inch]))
    story.append(spacer(3))

    story.append(sub_heading('2.2 Founders & Team'))

    story.append(body_bold('Mohammad Adnan - Founder & CEO'))
    story.append(body(
        'Currently at Dr. Shroff\'s Charity Eye Hospital, Adnan claims experience from '
        'over 300 eye camps and collaborations with hospitals, NGOs, and corporate '
        'organizations. He created Neuroptech to "inspire a new generation of optometrists '
        'to think beyond numbers."'
    ))

    story.append(body_bold('Mohammad Asad - Co-Founder, Clinical Optometrist'))
    story.append(body(
        'A clinical optometrist trained at Jamia Hamdard University under Dr. Aanchal Gupta '
        '(Cornea and Refractive Specialist) at Netram Eye Centre. Specializes in pediatric '
        'refraction, orthoptics vision therapy and CVI. Also serves as Director of Partnerships '
        'at OPTOBHARAT, a parallel optometry student community.'
    ))

    story.append(callout_box(
        '<b>Team Reality Check:</b> Despite LinkedIn claiming 11-50 employees, the actual '
        'operational core team is 2 people (Adnan and Asad), with 1 additional volunteer '
        '(Saket Singh, Outreach Head) and 1 Instagram manager (@rhmani_16). The LinkedIn '
        'employee count is aspirational at best.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('2.3 Services & Operations'))
    story.append(body(
        'Neuroptech offers the following services, all provided free of charge:'
    ))
    services = [
        '<b>Free Webinars:</b> Weekly live sessions hosted on YouTube Live and Google Meet, '
        'featuring international speakers (Dr. Ingryd Lorenzana, Dr. Angelea Perez, etc.). '
        '50+ webinars claimed.',
        '<b>Weekly Quizzes:</b> Knowledge challenges including "30 Days - 30 Syndromes" and '
        '"1 Day, 1 Syndrome Challenge" series.',
        '<b>Recorded Lectures:</b> YouTube channel (@Neuroptech) with webinar recordings. '
        'Videos average 7-11 views each.',
        '<b>Social Media Resources:</b> Educational content on Instagram and LinkedIn.',
        '<b>Eye Care Camps:</b> Physical community outreach events (April 2026: screened '
        '40+ elderly patients at Rangpuri Pahari, New Delhi).',
        '<b>WhatsApp Community:</b> Primary engagement channel with ~500 claimed members.',
    ]
    for s in services:
        story.append(bullet(s))

    story.append(sub_heading('2.4 Technology Stack'))
    story.append(body(
        'The entire operation runs on free tools: Lovable.app for website hosting (AI no-code '
        'builder), WhatsApp for community, YouTube Live for webinars, Google Meet for sessions, '
        'Google Forms for registration, and Gmail for communication. The website is a React '
        'SPA built on Vite, hosted on Lovable\'s free subdomain. The "Edit with Lovable" '
        'badge remains visible on the production site, signaling that the site was generated '
        'by an AI tool and not professionally developed.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: SWOT ANALYSIS
    # =========================================================================
    story.append(section_heading('SWOT ANALYSIS', '3'))
    story.append(body(
        'The following SWOT analysis is based on comprehensive open-source intelligence '
        'gathering from the organization\'s website, social media, LinkedIn profiles, '
        'and competitive landscape analysis.'
    ))
    story.append(spacer(2))

    # STRENGTHS
    story.append(sub_heading('3.1 Strengths'))
    s_headers = ['#', 'Strength', 'Assessment']
    s_rows = [
        ['S1', 'Niche focus on neuro-optometry (underserved subspecialty)', 'Genuine opportunity'],
        ['S2', 'First-mover in student-led neuro-optometry community', 'Real but fragile'],
        ['S3', 'Multichannel presence across 7 platforms', 'Scale is tiny'],
        ['S4', 'Community outreach execution (eye camps conducted)', 'Proof of action'],
        ['S5', 'International webinar format with credentialed speakers', 'Validates concept'],
        ['S6', 'Passionate founding team with clinical backgrounds', 'Genuine domain expertise'],
        ['S7', 'Free/accessible model for price-sensitive markets', 'Unsustainable long-term'],
    ]
    story.append(make_table(s_headers, s_rows, [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch]))
    story.append(spacer(3))

    # WEAKNESSES
    story.append(sub_heading('3.2 Weaknesses'))
    w_headers = ['#', 'Weakness', 'Severity']
    w_rows = [
        ['W1', 'No custom domain - still on Lovable.ai subdomain', 'CRITICAL'],
        ['W2', 'Name "Neuroptech" is fundamentally misleading (implies neurotech)', 'CRITICAL'],
        ['W3', 'No technology product whatsoever (WhatsApp + Zoom + Lovable)', 'CRITICAL'],
        ['W4', 'Inflated claims with no verification (500 members, 50 webinars)', 'SEVERE'],
        ['W5', 'No revenue model = no sustainability', 'SEVERE'],
        ['W6', 'Team appears to be students, not established professionals', 'SEVERE'],
        ['W7', 'No COPE-approved continuing education credits', 'HIGH'],
        ['W8', 'Website is single-page landing with no functionality', 'HIGH'],
        ['W9', 'Poor SEO and near-zero online visibility', 'HIGH'],
        ['W10', '"24/7 Community Access" = a WhatsApp group', 'HIGH'],
        ['W11', 'Website visually overdesigned, substantively empty', 'MEDIUM'],
        ['W12', 'No differentiated content or proprietary IP', 'HIGH'],
        ['W13', 'Brand identity crisis (Neuroptech vs Neuroptech Live vs NEUROPTECH)', 'MEDIUM'],
        ['W14', 'No evidence of impact or outcomes (no testimonials, no case studies)', 'HIGH'],
    ]
    story.append(make_table(w_headers, w_rows, [0.4*inch, 3.8*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(3))

    # OPPORTUNITIES
    story.append(sub_heading('3.3 Opportunities'))
    o_headers = ['#', 'Opportunity', 'Potential']
    o_rows = [
        ['O1', 'Neuro-optometry is a growing field (concussion, TBI, aging)', 'HIGH'],
        ['O2', 'Global telehealth and online education adoption (post-COVID)', 'HIGH'],
        ['O3', 'Partnership with optometry schools (India & international)', 'MEDIUM-HIGH'],
        ['O4', 'COPE accreditation pathway (transforms credibility overnight)', 'VERY HIGH'],
        ['O5', 'Corporate sponsorship from eye care industry (EssilorLuxottica, etc.)', 'HIGH'],
        ['O6', 'AI and tech integration to live up to the "tech" in name', 'MEDIUM'],
        ['O7', 'Content localization for developing markets (India, Africa, SE Asia)', 'MEDIUM'],
        ['O8', 'Government and NGO health initiative alignment (WHO Vision 2030)', 'MEDIUM'],
        ['O9', 'Social media and influencer growth on TikTok/Instagram', 'MEDIUM'],
        ['O10', 'Certificate/credential program (even without COPE)', 'HIGH'],
    ]
    story.append(make_table(o_headers, o_rows, [0.4*inch, 3.6*inch, CONTENT_W - 4.0*inch]))
    story.append(spacer(3))

    # THREATS
    story.append(sub_heading('3.4 Threats'))
    t_headers = ['#', 'Threat', 'Severity']
    t_rows = [
        ['T1', 'Established competitors (CEwire: 77 CE credits, 18K ODs; NORA; COVD)', 'CRITICAL'],
        ['T2', 'Name confusion makes SEO impossible (vs $15B+ neurotech industry)', 'CRITICAL'],
        ['T3', '"Student project" death spiral (graduation -> jobs -> decline -> shutdown)', 'HIGH'],
        ['T4', 'Regulatory and accreditation barriers for healthcare education', 'HIGH'],
        ['T5', 'Content quality and clinical liability risk', 'HIGH'],
        ['T6', 'Market saturation in online healthcare education', 'MEDIUM-HIGH'],
        ['T7', 'Economic and funding headwinds (zero revenue, zero investment)', 'CRITICAL'],
        ['T8', 'AI disruption of education content (ChatGPT, Claude, Gemini)', 'HIGH'],
        ['T9', 'Talent poaching by established organizations', 'MEDIUM'],
        ['T10', 'Technology platform risk (dependency on Lovable.app)', 'HIGH'],
    ]
    story.append(make_table(t_headers, t_rows, [0.4*inch, 3.8*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(3))

    story.append(callout_box(
        '<b>SWOT Verdict:</b> Neuroptech is an enthusiastic but fundamentally under-resourced '
        'student initiative with a misleading name, no technology product, no revenue model, '
        'no accreditation, and no sustainable competitive advantage. The most likely trajectory: '
        'gradual activity decline, core team graduation, and silent shutdown.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 4: MARKETING ANALYTICS
    # =========================================================================
    story.append(section_heading('MARKETING ANALYTICS', '4'))

    story.append(sub_heading('4.1 Digital Presence Score'))
    story.append(body(
        'The overall Digital Presence Score is <b>4.5 out of 10</b>, indicating severe '
        'deficiencies in online marketing infrastructure.'
    ))
    m_headers = ['Category', 'Score', 'Notes']
    m_rows = [
        ['Website Quality & Completeness', '6/10', 'Visually polished Lovable site, but on subdomain with limited content'],
        ['Social Media Activity', '5/10', 'Active on 3 platforms but follower counts are very modest'],
        ['Search Engine Visibility', '2/10', 'Nearly invisible for brand name; returns generic neurotech results'],
        ['Content Marketing', '4/10', 'Webinars and posts exist but no blog, no SEO articles, no YouTube'],
        ['Paid Advertising', '1/10', 'Zero detectable paid ads, Google Ads, or sponsored content'],
    ]
    story.append(make_table(m_headers, m_rows,
                            [2.2*inch, 0.8*inch, CONTENT_W - 3.0*inch]))
    story.append(spacer(3))

    story.append(sub_heading('4.2 Critical Marketing Failures'))
    failures = [
        '<b>No Custom Domain:</b> The .lovable.app subdomain screams "hobby project." '
        'Every business card, email signature, and LinkedIn link sends traffic to a Lovable '
        'subdomain. Cost to fix: $10-15/year.',
        '<b>Brand Name Search Invisibility:</b> Searching "Neuroptech" returns ZERO results '
        'about this company. The name is completely drowned out by the broader neurotech space.',
        '<b>Zero Blog/Content Engine:</b> No blog, no articles, no thought leadership content. '
        'All educational content is locked in live webinars (ephemeral). Zero organic search traffic.',
        '<b>No Email Marketing:</b> In 2025, running a community without email is like running '
        'a store without a door. WhatsApp is great for India but email is essential for professional audiences.',
        '<b>No YouTube Strategy:</b> YouTube channel gets 7-11 views per video. Used as a content '
        'archive rather than a growth channel.',
    ]
    for f in failures:
        story.append(bullet(f))

    story.append(sub_heading('4.3 Quick Wins'))
    story.append(body('The following actions could be completed within days at minimal cost:'))
    qw = [
        'Register neuroptech.org domain ($12/year)',
        'Create Google Business Profile (free, 30 minutes)',
        'Add email signup form to website (free with Mailchimp)',
        'Fix founder title inconsistency across all profiles',
        'Set up Google Analytics 4 (free, 1 hour)',
    ]
    for q in qw:
        story.append(bullet(q))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 5: SOCIAL MEDIA INTELLIGENCE
    # =========================================================================
    story.append(section_heading('SOCIAL MEDIA INTELLIGENCE', '5'))

    story.append(sub_heading('5.1 Platform Comparison'))
    sm_headers = ['Platform', 'Handle', 'Followers/Subs', 'Status', 'Score']
    sm_rows = [
        ['Instagram', '@neuroptech', '58', 'Active', '2/10'],
        ['LinkedIn', '/company/neuroptech', '457', 'Most Active', '5/10'],
        ['X/Twitter', '@Neuroptech', '3', 'Near-Dead', '0.5/10'],
        ['YouTube', '@Neuroptech', '~10 subs', '7 views/video', '1/10'],
        ['Facebook', 'Group only', 'N/A', 'No public page', '0/10'],
        ['WhatsApp', 'Community', '~500', 'Primary channel', '6/10'],
    ]
    story.append(make_table(sm_headers, sm_rows,
                            [1.0*inch, 1.3*inch, 1.0*inch, 1.2*inch, CONTENT_W - 4.5*inch]))
    story.append(spacer(2))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Overall Social Media Score: 2.5 / 10</b></font>',
        ParagraphStyle('BigRedScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('5.2 Critical Social Media Issues'))

    issues = [
        '<b>Credibility Gap:</b> The organization claims "500+ Active Members" yet Instagram '
        'has 58 followers and YouTube gets single-digit views. The actual community lives in '
        'a WhatsApp group which is invisible to the outside world.',
        '<b>Facebook Group vs. Page:</b> They have a Facebook GROUP (not a Page). A Group is '
        'invisible to non-members and cannot run ads or build brand awareness.',
        '<b>Zero on TikTok:</b> For a student-focused education brand in India, TikTok is the '
        '#1 platform for reaching young people. Complete absence is inexcusable.',
        '<b>No Content Repurposing:</b> Webinars with credentialed speakers generate minimal '
        'derivative content - no clips, no blog posts, no podcasts, no infographics.',
        '<b>YouTube is Dead:</b> 7-11 views per video. No SEO, no thumbnails, no Shorts, '
        'no playlists. The channel is a content graveyard.',
    ]
    for iss in issues:
        story.append(bullet(iss))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 6: TECHNICAL & SEO AUDIT
    # =========================================================================
    story.append(section_heading('TECHNICAL & SEO AUDIT', '6'))

    story.append(sub_heading('6.1 Overall Scores'))
    seo_headers = ['Metric', 'Score', 'Severity']
    seo_rows = [
        ['SEO Score', '18/100', 'CRITICAL'],
        ['Technical Health', '22/100', 'CRITICAL'],
        ['Trust Signals', '15/100', 'CRITICAL'],
        ['Technical Debt', '8/10', 'CRITICAL'],
        ['Scalability Limitations', '9/10', 'CRITICAL'],
    ]
    story.append(make_table(seo_headers, seo_rows,
                            [2.2*inch, 1.0*inch, CONTENT_W - 3.2*inch]))
    story.append(spacer(2))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Overall Technical & SEO Score: 3.2 / 10 (CRITICAL)</b></font>',
        ParagraphStyle('SeoScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('6.2 Top 10 Fatal Issues'))

    fatal_headers = ['#', 'Issue', 'Impact']
    fatal_rows = [
        ['1', 'No custom domain (neuroptechlive.lovable.app)', 'Zero domain authority, unprofessional, no SEO foundation'],
        ['2', 'SPA without SSR (Google sees empty HTML)', 'Only 1 page indexed, content invisible to crawlers'],
        ['3', 'No XML sitemap', 'Google cannot discover pages'],
        ['4', 'Zero structured data (no JSON-LD)', 'No rich snippets in search results'],
        ['5', '7 broken links (Privacy, Terms, etc. all #)', 'Legal compliance risk, trust erosion'],
        ['6', '"Edit with Lovable" badge on production', 'Exposes site as AI-generated prototype'],
        ['7', 'All navigation uses hash anchors', 'No separate crawlable pages'],
        ['8', 'No canonical URLs', 'Duplicate content risk'],
        ['9', 'Brand invisible in search', '"Neuroptech" returns 0 relevant results'],
        ['10', 'No legal pages (Privacy, Terms)', 'GDPR/CCPA compliance failure'],
    ]
    story.append(make_table(fatal_headers, fatal_rows,
                            [0.3*inch, 2.5*inch, CONTENT_W - 2.8*inch]))
    story.append(spacer(2))

    story.append(callout_box(
        '<b>Verdict:</b> The site is a single-page React application with NO server-side '
        'rendering, running on an unprofessional *.lovable.app subdomain. Only 1 page is '
        'indexed by Google. This combination is catastrophic for organic search performance. '
        'The architecture cannot scale to support a growing organization.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 7: COMPETITOR ANALYSIS
    # =========================================================================
    story.append(section_heading('COMPETITOR ANALYSIS', '7'))

    story.append(sub_heading('7.1 Competitive Landscape'))
    story.append(body(
        '25+ competitors were identified across 6 tiers. The competitive gap between '
        'Neuroptech and established players is not incremental - it is categorical.'
    ))
    story.append(spacer(2))

    story.append(sub_heading('7.2 High-Threat Competitors'))
    comp_headers = ['Competitor', 'Type', 'Key Advantage', 'Threat Level']
    comp_rows = [
        ['Neuroptek (Canada)', 'MedTech', 'Near-identical name, real products, 1.3K IG', 'EXTREME'],
        ['COVD/OVDRA', 'Professional', '50+ years, board certification, journal', 'HIGH'],
        ['CEwire', 'Conference', '75 COPE credits, 9K+ ODs, $179/yr', 'HIGH'],
        ['Eyes On Eyecare', 'Media/Edu', '$200K funding, OD staff, broad coverage', 'HIGH'],
        ['OPTOBHARAT', 'Student Comm.', 'Identical model, India-focused, growing faster', 'HIGH'],
        ['OEPF', 'Nonprofit', 'Recognized certification (COEP)', 'HIGH'],
        ['Woo University', 'CE Platform', 'Free + COPE + Bausch Lomb backing', 'MEDIUM-HIGH'],
        ['ODwire', 'Community', '25,000+ members, 50x larger community', 'MEDIUM-HIGH'],
    ]
    story.append(make_table(comp_headers, comp_rows,
                            [1.3*inch, 0.9*inch, 2.5*inch, CONTENT_W - 4.7*inch]))
    story.append(spacer(3))

    story.append(sub_heading('7.3 Competitive Gap Analysis'))
    gap_headers = ['Metric', 'Neuroptech', 'Top Competitor', 'Gap']
    gap_rows = [
        ['Instagram Followers', '58', 'COVD/AOA (10K+)', '137x'],
        ['Community Size', '500 claimed', 'ODwire (25,000+)', '50x'],
        ['CE Credits Offered', '0 (not COPE)', 'CEwire (75/yr)', 'Infinite'],
        ['Funding', '$0', 'Eyes On Eyecare ($200K)', 'N/A'],
        ['Years in Market', '~1', 'COVD (50+)', '50x'],
        ['Revenue Model', 'None', 'Multiple', 'Existential'],
    ]
    story.append(make_table(gap_headers, gap_rows,
                            [1.5*inch, 1.2*inch, 1.8*inch, CONTENT_W - 4.5*inch]))
    story.append(spacer(2))

    story.append(callout_box(
        '<b>Competitive Position:</b> Neuroptech\'s market share in the optometry education '
        'space is effectively 0%. The gap is not measurable - it is categorical. They are '
        'a student passion project operating alongside multi-million dollar organizations '
        'and 50-year-old institutions.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 8: CONTENT & UX CRITIQUE
    # =========================================================================
    story.append(section_heading('CONTENT & UX CRITIQUE', '8'))

    story.append(sub_heading('8.1 Score Summary'))
    ux_headers = ['Category', 'Score', 'Grade']
    ux_rows = [
        ['Content Quality', '4.0/10', 'D'],
        ['UX Analysis', '3.6/10', 'D-'],
        ['Design Critique', '5.7/10', 'C'],
        ['Trust & Credibility', '2.0/10', 'F'],
        ['Conversion Potential', '2.5/10', 'F'],
    ]
    story.append(make_table(ux_headers, ux_rows,
                            [2.2*inch, 1.2*inch, CONTENT_W - 3.4*inch]))
    story.append(spacer(2))

    story.append(Paragraph(
        '<font size="14" color="#914f49"><b>Overall Content & UX Score: 3.6 / 10 (D-)</b></font>',
        ParagraphStyle('UXScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_ERROR, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('8.2 Key Findings'))

    ux_findings = [
        '<b>60% Navigation Links Broken:</b> Three of five navigation items (Services, '
        'Resources, Contact) lead to 404 pages. The site is a beautifully decorated shell '
        'with no substance.',
        '<b>"Edit with Lovable" Badge:</b> Visible on every page, this is the #1 trust '
        'destroyer. It signals that the site was AI-generated and not professionally built.',
        '<b>Non-functional CTAs:</b> "Start Learning" has no clear destination. "Watch '
        'Introduction" links to nothing. The countdown timer shows all zeros.',
        '<b>Zero Trust Signals:</b> No testimonials, no partner logos, no certifications, '
        'no press mentions, no case studies, no outcome data.',
        '<b>Content Depth: 3/10:</b> The resources page doesn\'t exist. The blog has one '
        'article preview. The "100+ Resources" claim is completely unverifiable.',
        '<b>Mobile Menu Non-functional:</b> The hamburger button exists but may not work, '
        'leaving mobile users trapped on the homepage.',
    ]
    for f in ux_findings:
        story.append(bullet(f))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 9: RISE & FALL ANALYSIS
    # =========================================================================
    story.append(section_heading('RISE & FALL ANALYSIS', '9'))

    story.append(sub_heading('9.1 Timeline Summary'))
    story.append(body(
        'Neuroptech was founded around mid-2024 by Mohammad Adnan and Mohd Asad. '
        'Earliest activity detected: July 2024 (Instagram posts promoting "Neuroptech Presents" '
        'webinars). The organization has been consistently active with no significant dormant '
        'periods, but the pace of professional infrastructure investment has been near-zero.'
    ))

    timeline_headers = ['Period', 'Activity']
    timeline_rows = [
        ['Mid-2024', 'Founding era. First webinars, brand establishment on Instagram'],
        ['Late 2024', 'Optometry Foundation Series developed. Weekly webinars begin. YouTube channel created'],
        ['2025', 'LinkedIn page created. Website launched on Lovable. International speaker webinars'],
        ['April 2026', 'First eye care camp (40+ patients). Collaboration with NIIT Foundation'],
        ['May 2026', '30-Day Syndrome Challenge. Refractive Error Series. YouTube Live lectures'],
    ]
    story.append(make_table(timeline_headers, timeline_rows,
                            [1.2*inch, CONTENT_W - 1.2*inch]))
    story.append(spacer(3))

    story.append(sub_heading('9.2 Momentum Score'))

    mom_headers = ['Factor', 'Score', 'Assessment']
    mom_rows = [
        ['Activity Level', '7/10', 'Consistent, increasing output'],
        ['Growth Trajectory', '6/10', 'Steady organic growth'],
        ['Financial Sustainability', '2/10', 'No revenue, self-funded, free tools only'],
        ['Professional Infrastructure', '2/10', 'No custom domain, no legal entity'],
        ['Team Capacity', '4/10', '2-5 volunteers with day jobs'],
        ['Community Engagement', '6/10', 'Active WhatsApp group, webinar attendance'],
        ['External Validation', '2/10', 'No press, no reviews, no recognition'],
        ['Competitive Moat', '4/10', 'First mover in niche, easily replicable'],
        ['Long-term Viability', '3/10', 'Founder-dependent, no succession plan'],
    ]
    story.append(make_table(mom_headers, mom_rows,
                            [2.2*inch, 0.8*inch, CONTENT_W - 3.0*inch]))
    story.append(spacer(2))

    story.append(Paragraph(
        '<font size="14" color="#4b739c"><b>Momentum Score: 5.0 / 10 (Slight upward slope, fragile)</b></font>',
        ParagraphStyle('MomScore', fontName='Calibri', fontSize=14, leading=20,
                       textColor=SEM_INFO, spaceAfter=3*mm, spaceBefore=2*mm)))

    story.append(sub_heading('9.3 Trajectory Forecast'))
    story.append(body_bold('Baseline Scenario (60% probability)'))
    story.append(body(
        'Neuroptech continues as a small, active community initiative for 1-2 more years. '
        'Growth remains organic but slow. No custom domain is ever purchased. No revenue '
        'model develops. Eventually, as founders advance in careers, the initiative either '
        'stabilizes or gradually winds down.'
    ))
    story.append(body_bold('Upside Scenario (20% probability)'))
    story.append(body(
        'Neuroptech gains institutional partnership, reaches 5,000+ members, develops '
        'basic monetization, formalizes as a registered nonprofit, and achieves international '
        'recognition within the neuro-optometry niche.'
    ))
    story.append(body_bold('Downside Scenario (20% probability)'))
    story.append(body(
        'Founder burnout within 6-12 months. Webinar frequency decreases. Social media goes '
        'quiet. The website becomes outdated. The initiative dies as a quiet fade-out - no '
        'dramatic shutdown, just gradual cessation of activity.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 10: BRAND POSITIONING ANALYSIS
    # =========================================================================
    story.append(section_heading('BRAND POSITIONING ANALYSIS', '10'))

    story.append(sub_heading('10.1 Eight Critical Weaknesses'))
    story.append(body(
        'The brand positioning analysis identified 8 critical weaknesses that fundamentally '
        'undermine Neuroptech\'s ability to establish itself in the market:'
    ))
    story.append(spacer(2))

    brand_headers = ['#', 'Weakness', 'Impact']
    brand_rows = [
        ['1', 'Catastrophic name confusion with $15B+ neurotech industry', 'Brand invisible in search'],
        ['2', 'No clear target audience (tries to serve everyone)', 'Serves no one well'],
        ['3', 'Weak value proposition ("empowering through knowledge")', 'Meaningless differentiation'],
        ['4', 'No monetization strategy whatsoever', 'Will die when enthusiasm wanes'],
        ['5', 'Generic, forgettable branding (dark gradient template)', 'Indistinguishable from thousands'],
        ['6', 'Inconsistent messaging across platforms', 'Confused identity'],
        ['7', 'No brand recognition or authority', 'Zero external validation'],
        ['8', 'Positioned in crowded space without differentiation', 'Outmatched by incumbents'],
    ]
    story.append(make_table(brand_headers, brand_rows,
                            [0.3*inch, 2.8*inch, CONTENT_W - 3.1*inch]))
    story.append(spacer(3))

    story.append(sub_heading('10.2 Perception Gap'))

    gap2_headers = ['Claimed Identity', 'Actual Reality']
    gap2_rows = [
        ['"The premier community"', 'A small WhatsApp group of ~500 members'],
        ['"World-class education"', 'Free webinars with no accreditation'],
        ['"Groundbreaking innovation"', 'Basic live sessions on Zoom and YouTube Live'],
        ['"Shaping the future"', '3 community eye check-up camps'],
        ['"Cutting-edge knowledge"', 'Foundation-level optometry courses'],
        ['"Empowering worldwide"', 'India-focused, <500 members, near-zero reach'],
    ]
    story.append(make_table(gap2_headers, gap2_rows,
                            [2.5*inch, CONTENT_W - 2.5*inch]))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 11: REVENUE & MONETIZATION ANALYSIS
    # =========================================================================
    story.append(section_heading('REVENUE & MONETIZATION ANALYSIS', '11'))

    story.append(sub_heading('11.1 Current Financial State'))

    story.append(callout_box(
        '<b>Revenue Score: 1.5 / 10 (F)</b><br/><br/>'
        'Zero revenue of any kind. All content, webinars, eye camps, certificates, and '
        'resources are provided entirely free. No subscription model, no freemium tier, '
        'no advertising, no sponsorships, no donations mechanism, no consulting services. '
        'The founders are building significant value but capturing NONE of it financially.'
    ))
    story.append(spacer(3))

    rev_headers = ['Financial Metric', 'Status']
    rev_rows = [
        ['Revenue', '$0 (zero of any kind)'],
        ['Funding Raised', 'None (no VC, no angels, no grants)'],
        ['Burn Rate', '~$0-50/month (all free tools)'],
        ['Runway', 'Infinite (at current scale) but stagnant'],
        ['Payment Infrastructure', 'None (no Stripe, no Razorpay)'],
        ['Monetization Strategy', 'None documented or visible'],
        ['Sustainability Assessment', 'Non-viable as a business; sustainable as hobby'],
    ]
    story.append(make_table(rev_headers, rev_rows,
                            [2.2*inch, CONTENT_W - 2.2*inch]))
    story.append(spacer(3))

    story.append(sub_heading('11.2 Revenue Opportunities'))
    story.append(body(
        'Despite the current zero-revenue state, the following monetization pathways exist:'
    ))
    opps = [
        '<b>Premium Membership ($3.50/month):</b> Recorded webinar archive, study materials, '
        'priority Q&A. Potential: 50 members x $10/month = $500/month.',
        '<b>Paid Certification ($6/exam):</b> Exam-based neuro-optometry certificates. '
        'Potential: 20 exams/month x $50 = $1,000/month.',
        '<b>Webinar Sponsorships ($500/webinar):</b> Pharma and device company sponsors. '
        'Potential: 2 sponsors/month = $1,000/month.',
        '<b>Institutional Subscriptions ($1,000/year):</b> Optometry colleges for student '
        'access. Potential: 5 institutions x $1,000 = $5,000/year.',
    ]
    for o in opps:
        story.append(bullet(o))

    story.append(spacer(2))
    rev_total = [
        ['Conservative (12-24 months)', '$15,000 - $30,000/year'],
        ['Optimistic (with accreditation)', '$50,000 - $100,000/year'],
    ]
    story.append(make_table(['Scenario', 'Revenue Potential'], rev_total,
                            [2.5*inch, CONTENT_W - 2.5*inch]))
    story.append(spacer(2))

    story.append(callout_box(
        '<b>The Core Problem:</b> This is the classic "build first, monetize never" trap '
        'that kills many well-intentioned educational initiatives. The founders must urgently '
        'decide: Is this a business or a hobby? If a business, monetization must begin NOW.'
    ))

    story.append(PageBreak())

    # =========================================================================
    # SECTION 12: STRATEGIC RECOMMENDATIONS
    # =========================================================================
    story.append(section_heading('STRATEGIC RECOMMENDATIONS', '12'))

    story.append(body(
        'The following 20 recommendations represent a prioritized playbook for transforming '
        'Neuroptech from a student hobby project into a sustainable organization. Each '
        'recommendation includes a priority tier, estimated effort, and expected impact.'
    ))
    story.append(spacer(3))

    # IMMEDIATE
    story.append(sub_heading('12.1 IMMEDIATE ACTIONS (Week 1-2)'))

    imm_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    imm_rows = [
        ['1', 'Get custom domain (neuroptech.in or neuroptech.org)', '30 min', 'Critical'],
        ['2', 'Remove "Edit with Lovable" badge from production site', '5 min', 'Critical'],
        ['3', 'Fix all broken navigation links (# placeholder links)', '2 hours', 'Critical'],
        ['4', 'Set up professional email (hello@neuroptech.org)', '1 hour', 'High'],
        ['5', 'Create legal pages (Privacy Policy, Terms of Service)', '4 hours', 'High'],
    ]
    story.append(make_table(imm_headers, imm_rows,
                            [0.3*inch, 3.0*inch, 0.9*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(3))

    # SHORT-TERM
    story.append(sub_heading('12.2 SHORT-TERM ACTIONS (Month 1-3)'))

    short_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    short_rows = [
        ['6', 'Launch blog with SEO content (10 cornerstone articles)', '2 weeks', 'Very High'],
        ['7', 'Record & upload webinar recordings to YouTube with SEO', '1 week', 'High'],
        ['8', 'Apply for COPE accreditation (transforms credibility)', 'Ongoing', 'Critical'],
        ['9', 'Create Google Business Profile', '30 min', 'High'],
        ['10', 'Set up email marketing (Mailchimp free tier)', '1 day', 'High'],
        ['11', 'Build proper website on own hosting (WordPress/Next.js)', '2-3 weeks', 'Critical'],
        ['12', 'Redefine brand positioning (pick ONE clear value proposition)', '2 days', 'Critical'],
    ]
    story.append(make_table(short_headers, short_rows,
                            [0.3*inch, 3.0*inch, 0.9*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(3))

    # MEDIUM-TERM
    story.append(sub_heading('12.3 MEDIUM-TERM ACTIONS (Month 3-6)'))

    med_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    med_rows = [
        ['13', 'Launch premium membership tier ($3.50/month)', '1-2 weeks', 'Critical'],
        ['14', 'Develop paid certification program ($6/exam)', '3-4 weeks', 'High'],
        ['15', 'Pursue corporate sponsorships (Alcon, EssilorLuxottica)', 'Ongoing', 'High'],
        ['16', 'Create institutional subscription model', '2-3 weeks', 'Medium-High'],
        ['17', 'Rebrand to avoid name confusion with neurotech industry', '1-2 weeks', 'Critical'],
    ]
    story.append(make_table(med_headers, med_rows,
                            [0.3*inch, 3.0*inch, 0.9*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(3))

    # LONG-TERM
    story.append(sub_heading('12.4 LONG-TERM ACTIONS (Month 6-12)'))

    long_headers = ['#', 'Recommendation', 'Effort', 'Impact']
    long_rows = [
        ['18', 'Build custom platform (replace Lovable with proper CMS/LMS)', '4-8 weeks', 'Critical'],
        ['19', 'Expand to international markets (SE Asia, Middle East, Africa)', 'Ongoing', 'Medium'],
        ['20', 'Seek grant funding or seed investment ($50K-200K)', 'Ongoing', 'High'],
    ]
    story.append(make_table(long_headers, long_rows,
                            [0.3*inch, 3.0*inch, 0.9*inch, CONTENT_W - 4.2*inch]))
    story.append(spacer(4))

    # Final verdict
    story.append(hr_line())
    story.append(sub_heading('FINAL VERDICT'))

    story.append(body(
        'Neuroptech is a well-intentioned, actively maintained grassroots project with '
        'modest growth and significant long-term sustainability risks. It is NOT abandoned, '
        'NOT dormant, and NOT a scam. But it is also NOT a company, NOT a startup, and '
        'NOT a technology business - despite the tech-sounding name and AI-built website.'
    ))
    story.append(spacer(2))
    story.append(body(
        'The founders have genuine passion and domain expertise. The neuro-optometry niche '
        'is genuinely underserved in India. However, without immediate, dramatic changes to '
        'professional infrastructure (custom domain, proper website), revenue generation '
        '(monetization strategy), and brand positioning (name clarity, value proposition), '
        'Neuroptech will remain what it is today: a WhatsApp group with a pretty website '
        'and ambitious dreams.'
    ))
    story.append(spacer(2))
    story.append(callout_box(
        '<b>This report was prepared by Focuslinks Strategic Intelligence for strategic '
        'assessment purposes. All findings represent honest evaluations based on publicly '
        'available data. No malice intended - just brutal truth for strategic improvement.</b>'
    ))

    return story


# =============================================================================
# MAIN
# =============================================================================
if __name__ == '__main__':
    OUTPUT = '/home/z/my-project/download/neuroptech_body.pdf'

    doc = ReportDocTemplate(
        OUTPUT,
        pagesize=A4,
        title='Neuroptech Live Strategic Intelligence Report',
        author='Focuslinks Strategic Intelligence',
        subject='Comprehensive Weakness Analysis, SWOT Assessment, Marketing Analytics & Competitive Intelligence',
    )

    story = build_content()

    doc.build(story)
    print(f'Body PDF generated: {OUTPUT}')
