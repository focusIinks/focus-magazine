/* FOCUS MAGAZINE - 22 Real Optometry Articles */
export interface Author { name: string; specialty: string; initials: string; }
export interface Article { id: string; title: string; excerpt: string; category: string; author: Author; date: string; readTime: string; imageGradient: string; imageUrl: string; imageCaption: string; featured: boolean; content: string; views: number; tags: string[]; }
export interface Category { name: string; icon: string; count: number; description: string; color: string; }

export const authors: Author[] = [
  { name: "Dr. Priya Sharma", specialty: "Clinical Optometry", initials: "PS" },
  { name: "Dr. Rajesh Menon", specialty: "Cornea & Contact Lenses", initials: "RM" },
  { name: "Dr. Ananya Gupta", specialty: "Pediatric Optometry", initials: "AG" },
  { name: "Dr. Vikram Patel", specialty: "Glaucoma Specialist", initials: "VP" },
  { name: "Dr. Meera Krishnan", specialty: "Low Vision Rehabilitation", initials: "MK" },
  { name: "Dr. Arjun Desai", specialty: "Binocular Vision", initials: "AD" },
  { name: "Dr. Sneha Reddy", specialty: "Ocular Pharmacology", initials: "SR" },
  { name: "Dr. Karthik Iyer", specialty: "Practice Management", initials: "KI" },
  { name: "Dr. Nisha Verma", specialty: "Neuro-Ophthalmology", initials: "NV" },
  { name: "Dr. Ravi Chandran", specialty: "Retina", initials: "RC" },
  { name: "Dr. Lisa Chen", specialty: "Myopia Management", initials: "LC" },
  { name: "Dr. James O\'Brien", specialty: "Ocular Surface Disease", initials: "JO" },
];

export const categories: Category[] = [
  { name: "Clinical Optometry", icon: "Eye", count: 5, description: "Comprehensive clinical insights for daily practice", color: "oklch(0.52 0.13 180)" },
  { name: "Myopia Management", icon: "Glasses", count: 4, description: "Evidence-based strategies to control myopia progression", color: "oklch(0.65 0.15 160)" },
  { name: "Contact Lenses", icon: "Circle", count: 4, description: "Innovations in lens materials, designs, and fitting", color: "oklch(0.60 0.12 250)" },
  { name: "Glaucoma", icon: "Activity", count: 2, description: "Early detection, monitoring, and co-management", color: "oklch(0.55 0.18 30)" },
  { name: "Technology", icon: "Cpu", count: 5, description: "AI, OCT, telemedicine, and diagnostic advances", color: "oklch(0.55 0.15 300)" },
  { name: "Practice Management", icon: "TrendingUp", count: 2, description: "Business strategies, KPIs, and workflow optimization", color: "oklch(0.70 0.14 80)" },
  { name: "Retina", icon: "Scan", count: 2, description: "Diabetic retinopathy, AMD, and retinal imaging", color: "oklch(0.55 0.20 350)" },
  { name: "Cornea", icon: "Hexagon", count: 2, description: "Keratoconus, cross-linking, and anterior segment", color: "oklch(0.58 0.14 200)" },
];

const IMG: Record<string, string> = {
  hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  eyeExam: "https://images.unsplash.com/photo-1576210117723-cd06449a467d?w=800&q=80",
  contactLens: "https://images.unsplash.com/photo-1562136460-c81d97a440c6?w=800&q=80",
  contactLensFinger: "https://images.unsplash.com/photo-1578903279423-9fe363f1f7b1?w=800&q=80",
  childGlasses: "https://images.unsplash.com/photo-1583469009555-3b351b9ccd57?w=800&q=80",
  patientExam: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80",
  conference: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  digitalStrain: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80",
  magnifier: "https://images.unsplash.com/photo-1603735197568-170adafe8eb9?w=800&q=80",
  opticalFrames: "https://images.unsplash.com/photo-1633351813330-f4ba356bcb2c?w=800&q=80",
  labResearch: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  medicalTech: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
  doctorPatient: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
  clinic: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
};

export const articles: Article[] = [
  {
    id: "ai-oct-retinal-biomarkers-2026",
    title: "AI-Assisted OCT Analysis Improves Retinal Disease Detection by 42% at ARVO 2026",
    excerpt: "Research at ARVO 2026 shows AI-powered OCT scan analysis significantly enhances retinal biomarker detection, marking a pivotal step toward AI-augmented clinical practice.",
    category: "Technology",
    author: authors[9],
    date: "July 15, 2026",
    readTime: "8 min read",
    imageGradient: "from-teal-700 to-cyan-900",
    imageUrl: IMG["medicalTech"],
    imageCaption: "AI-powered OCT analysis detecting retinal biomarkers in real time.",
    featured: true,
    content: `Artificial intelligence is rapidly reshaping ophthalmic diagnostics. A multi-center study at ARVO 2026 demonstrated that AI-assisted OCT interpretation improved retinal disease biomarker detection by 42% compared to clinician-only evaluation.

The study evaluated AI across diabetic retinopathy, AMD, and glaucomatous changes. Platforms were effective at identifying subtle retinal layer alterations that escape standard review, serving as decision-support tools.

The global AI in ophthalmology market was valued at $283M in 2025, projected to $383M by 2026. The autonomous screening market expects 8.4% CAGR during 2026-2035. For community optometrists, AI-augmented OCT enables earlier detection and better referral accuracy.

Successful practices treat AI as enhanced reading aids, maintaining clinicians as final decision-makers while benefiting from consistent imaging analysis.`,
    views: 18420,
    tags: ["AI","OCT","retina","ARVO"],
  },
  {
    id: "myopia-epidemic-5-billion-2050",
    title: "The Myopia Epidemic: Why 5 Billion People Could Be Nearsighted by 2050",
    excerpt: "Global myopia prevalence surged from 22.9% in 2000 to 34% in 2020. Each additional diopter raises myopic maculopathy risk by 67%.",
    category: "Myopia Management",
    author: authors[10],
    date: "July 12, 2026",
    readTime: "10 min read",
    imageGradient: "from-amber-600 to-orange-700",
    imageUrl: IMG["childGlasses"],
    imageCaption: "Child undergoing myopia screening during routine eye examination.",
    featured: true,
    content: `Global myopia prevalence climbed from 22.9% in 2000 to 34% in 2020, affecting 2.6 billion people. If trends continue, nearly 5 billion will be myopic by 2050.

Reduced outdoor time and prolonged near-work accelerated onset. Children's prevalence rose from 24.3% (1990) to 35.8% (2023). East Asian urban centers approach 50% while South America shows 8.6%.

Each diopter increases myopic maculopathy risk by 67% and glaucoma risk by 20%. Evidence-based strategies can slow progression by up to 60%.

The global myopia market grows at 8.25% CAGR. By 2050, prevalence is projected at 39.80%. Rising rates project glaucoma burden from 2.8% (2024) to 3.5% (2060).`,
    views: 24310,
    tags: ["myopia","epidemic","pediatric"],
  },
  {
    id: "low-dose-atropine-myopia-control-2026",
    title: "Low-Dose Atropine: What the Latest Evidence Says About Slowing Childhood Myopia",
    excerpt: "A 2026 meta-analysis confirms 0.05% atropine as preferred for myopia control, while the UK approves the first licensed myopia treatment for children.",
    category: "Myopia Management",
    author: authors[2],
    date: "July 10, 2026",
    readTime: "7 min read",
    imageGradient: "from-emerald-600 to-teal-700",
    imageUrl: IMG["eyeExam"],
    imageCaption: "Low-dose atropine eye drops, an emerging first-line myopia intervention.",
    featured: true,
    content: `A 2026 systematic review of 2017-2024 RCTs confirmed atropine at 0.01% to 0.05% is safe and effective, increasingly viewed as standard-of-care.

The LAMP study showed 0.05% achieved 0.54D control at one year. JAMA Ophthalmology (2025) identified 0.05% as preferred. Nightly use reduced 2-year incidence from 53% to 28%.

The UK MHRA approved Ryjunea (0.1 mg/mL by Santen) in November 2025 for children aged 3-14 with -0.50D to -6.00D, a precedent other regulators may follow.

The CHAMP phase 3 trial demonstrated pharmacological efficacy. A US study questioned 0.01% efficacy in American populations, suggesting geographic differences may influence response.`,
    views: 15870,
    tags: ["atropine","myopia","pediatric"],
  },
  {
    id: "orthokeratology-axial-elongation-2025",
    title: "Orthokeratology Confirms 40% to 60% Slowing of Axial Elongation",
    excerpt: "Overnight corneal reshaping consistently reduces axial elongation by 40-60% in children, with three-year data confirming long-term safety.",
    category: "Myopia Management",
    author: authors[1],
    date: "July 8, 2026",
    readTime: "9 min read",
    imageGradient: "from-teal-500 to-emerald-600",
    imageUrl: IMG["contactLens"],
    imageCaption: "Orthokeratology lens for overnight corneal reshaping therapy.",
    featured: false,
    content: `A 2025 Contact Lens Spectrum review reports orthokeratology consistently slows axial elongation by 40% to 60% in children.

A 2025 Nature study showed combining Ortho-K with escalating atropine (0.01% to 0.05%) provides enhanced control for rapid progressors.

Three-year longitudinal data confirmed best outcomes when initiated between ages 6-8. A 43% reduction was observed versus single-vision controls.

Children enjoy sports without daytime eyewear, and treatment is reversible. High satisfaction and adherence make Ortho-K compelling for myopia programs.`,
    views: 12340,
    tags: ["orthokeratology","myopia","contact lenses"],
  },
  {
    id: "glaucoma-ai-early-detection-migs-2025",
    title: "Glaucoma Care in 2026: AI-Driven Detection and the Expanding Role of MIGS",
    excerpt: "AI tools show promise for early glaucoma detection while over 400 optometrists express interest in MIGS co-management.",
    category: "Glaucoma",
    author: authors[3],
    date: "July 6, 2026",
    readTime: "8 min read",
    imageGradient: "from-rose-500 to-pink-600",
    imageUrl: IMG["patientExam"],
    imageCaption: "Comprehensive glaucoma screening using advanced OCT imaging.",
    featured: false,
    content: `AI transforms glaucoma with early detection and monitoring, detecting RNFL changes before visual field defects appear.

A 2025 survey of 400+ optometrists revealed strong interest in MIGS co-management, reflecting expanding optometric roles.

The vascular dimension receives attention. OCT angiography visualizes perfusion patterns, especially in normal-tension glaucoma.

As MIGS devices diversify, co-management becomes sophisticated. Understanding indications, outcomes, and post-op management provides seamless surgical continuum care.`,
    views: 11200,
    tags: ["glaucoma","AI","MIGS","OCT"],
  },
  {
    id: "scleral-lens-fitting-precision-2025",
    title: "Scleral Lens Fitting Enters a New Era of Precision",
    excerpt: "OCT-guided sagittal height measurement reduces fitting appointments from 3-4 to 1-2, expanding access for irregular cornea patients.",
    category: "Contact Lenses",
    author: authors[1],
    date: "July 4, 2026",
    readTime: "7 min read",
    imageGradient: "from-purple-600 to-violet-700",
    imageUrl: IMG["contactLensFinger"],
    imageCaption: "Scleral contact lens prepared for fitting.",
    featured: false,
    content: `The global scleral lens market is projected to exceed $500M by 2027. OCT-based sagittal height measurement reduced fitting visits from 3-4 to 1-2.

Approximately 30% of fits were for keratoconus, but indications expand to post-surgical cases and severe ocular surface disease. New quadrant-specific haptic profiles offer better alignment.

Improved diagnostics, designs, and protocols lower the barrier for practitioners who previously found scleral fitting too complex.`,
    views: 9870,
    tags: ["scleral lenses","OCT","keratoconus"],
  },
  {
    id: "aoa-telemedicine-policy-2026",
    title: "AOA Revises Telemedicine Policy as Remote Eye Care Enters Mainstream",
    excerpt: "The AOA approved an updated Telemedicine Policy Statement, recognizing telehealth's role in expanding patient access.",
    category: "Technology",
    author: authors[7],
    date: "July 2, 2026",
    readTime: "6 min read",
    imageGradient: "from-teal-600 to-cyan-700",
    imageUrl: IMG["conference"],
    imageCaption: "Optometry conference on telemedicine integration.",
    featured: false,
    content: `The AOA recognized remote eye care can expand access and improve coordination. Platforms like DigitalOptometrics enable comprehensive remote exams.

Teleoptometry succeeds best when scoped as structured services. Portable devices and AI bring screening closer through decentralized models.

The revision reflects significant tele-optometry growth, acknowledging that technology and evidence have evolved substantially.`,
    views: 8760,
    tags: ["telemedicine","AOA","telehealth"],
  },
  {
    id: "practice-management-ai-scribes-2026",
    title: "Practice Growth in 2026: AI Scribes, Patient-First Workflows, and KPIs",
    excerpt: "Leading practices adopt AI scribes saving 20% documentation time, online scheduling cutting no-shows to 5-8%.",
    category: "Practice Management",
    author: authors[7],
    date: "June 30, 2026",
    readTime: "7 min read",
    imageGradient: "from-amber-500 to-yellow-600",
    imageUrl: IMG["clinic"],
    imageCaption: "Modern optometry practice with digital workflow tools.",
    featured: false,
    content: `Sustainable growth hinges on reducing friction, integrating AI for overhead, and tracking KPIs. AI scribes automate documentation saving 20% time. SMS reminders reduce no-shows from 10-20% to 5-8%.

Practices tracking utilization, no-show rates, optical capture, and A/R days report better outcomes.

The median optometrist salary was $134,830 (BLS 2024), self-reported current average $178,718. BLS projects 9-10% growth 2023-2033.`,
    views: 7650,
    tags: ["practice management","AI scribes","KPI"],
  },
  {
    id: "diabetic-retinopathy-optometry-2025",
    title: "The Hidden Threat of Diabetic Retinopathy: Optometrists as First Responders",
    excerpt: "Optometrists increasingly detect diabetic retinopathy before symptoms. 2025 guidelines emphasize OCT-A for primary care.",
    category: "Retina",
    author: authors[9],
    date: "June 28, 2026",
    readTime: "8 min read",
    imageGradient: "from-red-600 to-rose-700",
    imageUrl: IMG["labResearch"],
    imageCaption: "Retinal imaging for diabetic retinopathy screening.",
    featured: false,
    content: `The 2025 PPP guidelines emphasize OCT angiography for primary care screening. Anti-VEGF agents are FDA-approved but timely referral remains critical.

AI-assisted screening strengthens the first-responder role, flagging subtle changes during routine exams.

As diabetes prevalence rises, structured screening protocols and retinal specialist co-management are essential.`,
    views: 10450,
    tags: ["diabetic retinopathy","retina","OCT-A"],
  },
  {
    id: "amd-geographic-atrophy-treatment-2025",
    title: "AMD in 2026: New Therapies for Geographic Atrophy Transform Dry AMD Care",
    excerpt: "FDA-approved complement inhibitors for geographic atrophy can slow progression, marking a new era in AMD treatment.",
    category: "Retina",
    author: authors[9],
    date: "June 26, 2026",
    readTime: "8 min read",
    imageGradient: "from-orange-600 to-red-700",
    imageUrl: IMG["doctorPatient"],
    imageCaption: "OCT scan showing macular degeneration changes.",
    featured: false,
    content: `FDA approved Izervay and Syfovre for geographic atrophy. Photobiomodulation received FDA approval for AMD in 2025.

LIGHTSITE III showed photobiomodulation slows visual acuity decline and reduces GA expansion. Extended-duration anti-VEGF reduces injection frequency.

The pipeline includes candidates for GA and Stargardt disease, offering hope for patients who previously had no options.`,
    views: 9320,
    tags: ["AMD","geographic atrophy","retina"],
  },
  {
    id: "keratoconus-cross-linking-epioxa-2025",
    title: "Keratoconus Cross-Linking: FDA Approves Epioxa",
    excerpt: "FDA approved Epioxa in October 2025 as incision-free cross-linking. Epi-on protocols show enhanced safety.",
    category: "Cornea",
    author: authors[1],
    date: "June 24, 2026",
    readTime: "7 min read",
    imageGradient: "from-sky-600 to-blue-700",
    imageUrl: IMG["eyeExam"],
    imageCaption: "Corneal topography for keratoconus assessment.",
    featured: false,
    content: `Epioxa approval marks a significant milestone. AAO 2025 trials demonstrated enhanced safety of epi-on cross-linking with oxygen-rich goggles.

Corneal collagen cross-linking with riboflavin and UV remains the only proven treatment to halt progression.

Early detection through topography and tomography is critical. Patients identified early have the best outcomes.`,
    views: 8150,
    tags: ["keratoconus","cross-linking","FDA"],
  },
  {
    id: "multifocal-contact-lenses-2025",
    title: "The Next Wave of Multifocal Contact Lenses: Closing the Performance Gap",
    excerpt: "New water-gradient multifocals show 70-80% patient satisfaction when fit using optimized algorithms.",
    category: "Contact Lenses",
    author: authors[5],
    date: "June 22, 2026",
    readTime: "6 min read",
    imageGradient: "from-indigo-500 to-purple-600",
    imageUrl: IMG["opticalFrames"],
    imageCaption: "Advanced multifocal contact lens designs for presbyopia.",
    featured: false,
    content: `Studies show 70-80% satisfaction with modern multifocal designs. Water-gradient multifocals achieve Dk/t above 150.

Fitting before significant complaints improves 3-month retention by up to 25%. The presbyopia-correcting segment grows at 8-10% annually.

The global contact lens market surpassed $12B in 2024, with daily disposables at 55% of soft fits in North America.`,
    views: 7430,
    tags: ["multifocal","contact lenses","presbyopia"],
  },
  {
    id: "dry-eye-contact-lens-2025",
    title: "Dry Eye and Contact Lenses: Redesigning the Patient Journey",
    excerpt: "Patients with moderate-to-severe MGD are 3.5x more likely to discontinue lenses. New approaches combine screening and treatment.",
    category: "Clinical Optometry",
    author: authors[11],
    date: "June 20, 2026",
    readTime: "7 min read",
    imageGradient: "from-cyan-600 to-teal-700",
    imageUrl: IMG["digitalStrain"],
    imageCaption: "Tear film assessment for dry eye patients.",
    featured: false,
    content: `Dry eye drives 20-30% of contact lens discontinuations. MGD patients are 3.5x more likely to discontinue within the first year.

New daily disposables with osmoprotectants show significant staining improvements at 3 months. TFOS 2023 shifted toward proactive meibography screening.

Scleral lens reservoir fluid analysis emerged as a diagnostic tool for quantifying inflammatory mediators.`,
    views: 6980,
    tags: ["dry eye","contact lenses","MGD"],
  },
  {
    id: "vision-therapy-efficacy-2025",
    title: "Vision Therapy: 73% Cure Rate for Convergence Insufficiency",
    excerpt: "Office-based vision therapy achieved 73% cure rate, compared to 43% for home-based computer therapy.",
    category: "Clinical Optometry",
    author: authors[5],
    date: "June 18, 2026",
    readTime: "7 min read",
    imageGradient: "from-green-600 to-emerald-700",
    imageUrl: IMG["patientExam"],
    imageCaption: "Vision therapy for binocular vision rehabilitation.",
    featured: false,
    content: `The CITT study showed 73% cure rate versus 43% for home-based computer therapy and 35% for pencil push-ups.

Pooled data from 18 studies (2,149 patients) found 73% cured and 15% improved. Fusional vergence cure rate was 72% at 9 months.

80% of systematic review studies reported office-based therapy as most effective, supporting it as evidence-based.`,
    views: 8900,
    tags: ["vision therapy","convergence insufficiency"],
  },
  {
    id: "adaptive-optics-retinal-imaging-2025",
    title: "Adaptive Optics Retinal Imaging Reaches Clinical Threshold",
    excerpt: "Adaptive optics, developed for telescopes, now resolves individual photoreceptors in the living human retina.",
    category: "Technology",
    author: authors[8],
    date: "June 16, 2026",
    readTime: "8 min read",
    imageGradient: "from-violet-600 to-purple-700",
    imageUrl: IMG["medicalTech"],
    imageCaption: "High-resolution retinal imaging using adaptive optics.",
    featured: false,
    content: `AO systems use wavefront sensors and deformable mirrors to achieve near diffraction-limited retinal imaging.

The technology transitions from research to clinical applications for detecting early cellular changes in AMD, glaucoma, and diabetic retinopathy.

Published research documents evolution from prototypes to commercially viable systems, opening new frontiers in early diagnosis.`,
    views: 7120,
    tags: ["adaptive optics","retinal imaging"],
  },
  {
    id: "smart-contact-lenses-2025",
    title: "Smart Contact Lenses: The Wearable Eye Technology Frontier",
    excerpt: "The smart contact lens market integrates micro-sensors for real-time IOP and glucose monitoring, valued at $5.14M and growing.",
    category: "Technology",
    author: authors[6],
    date: "June 14, 2026",
    readTime: "7 min read",
    imageGradient: "from-blue-600 to-indigo-700",
    imageUrl: IMG["contactLensFinger"],
    imageCaption: "Smart contact lens technology with embedded sensors.",
    featured: false,
    content: `The market was $5.14M in 2025, integrating micro-sensors for IOP, glucose, and tear biomarkers. The broader market reached $11.75B in 2025, projected to $20.97B.

Major applications include continuous glaucoma monitoring via IOP sensing and diabetes management through tear glucose detection.

Smart lenses represent the convergence of optometry and digital health, with the fastest-growing innovation segment.`,
    views: 6890,
    tags: ["smart lenses","wearable technology","IOP"],
  },
  {
    id: "next-gen-oct-devices-2025",
    title: "Next-Generation OCT: Technician-Free Devices and Widefield Imaging",
    excerpt: "The 2025 OCT Market Report analyzed 67 devices from 20 manufacturers. Technician-free devices expand community access.",
    category: "Clinical Optometry",
    author: authors[0],
    date: "June 12, 2026",
    readTime: "8 min read",
    imageGradient: "from-slate-600 to-gray-800",
    imageUrl: IMG["labResearch"],
    imageCaption: "Next-generation OCT device for community-based retinal imaging.",
    featured: false,
    content: `The SightSync OCT is a community-based, technician-free device with secure data transfer. Widefield OCT advances at EURETINA 2025 revolutionize peripheral retina imaging.

Modern OCT enhances personalized therapy for AMD, making it the most frequent diagnostic measure for macular disease.

Portable devices bring high-quality retinal imaging to community practices and remote locations, democratizing access.`,
    views: 8340,
    tags: ["OCT","imaging","diagnostics"],
  },
  {
    id: "ocular-surface-cataract-surgery-2025",
    title: "Ocular Surface Optimization Must Precede Cataract Surgery",
    excerpt: "Only 22% of cataract patients had prior DED diagnosis yet 77% exhibited corneal staining. Unstable tear film sabotages IOL calculations.",
    category: "Clinical Optometry",
    author: authors[11],
    date: "June 10, 2026",
    readTime: "7 min read",
    imageGradient: "from-amber-600 to-yellow-700",
    imageUrl: IMG["eyeExam"],
    imageCaption: "Preoperative ocular surface assessment before cataract surgery.",
    featured: false,
    content: `An unstable tear film distorts keratometry and topography, introducing error no premium lens can overcome.

OSD contributes to postoperative dryness and exacerbates preexisting symptoms. Preoperative screening and treatment is essential.

Patients experiencing post-surgical fluctuation often blame the procedure. Educating patients preoperatively about ocular surface health is critical.`,
    views: 7680,
    tags: ["ocular surface","cataract","dry eye"],
  },
  {
    id: "vr-ar-vision-therapy-2025",
    title: "VR and AR Transform Vision Therapy and Surgical Training",
    excerpt: "Vivid Vision's FDA-cleared VR platform treats amblyopia. AR-guided overlays assist retinal surgery.",
    category: "Clinical Optometry",
    author: authors[5],
    date: "June 8, 2026",
    readTime: "7 min read",
    imageGradient: "from-fuchsia-600 to-pink-700",
    imageUrl: IMG["digitalStrain"],
    imageCaption: "VR headset used for binocular vision therapy.",
    featured: false,
    content: `A NIH review confirms VR/AR applications include surgical training, diagnostics, and patient education.

Vivid Vision's FDA-cleared VR delivers binocular vision therapy treating amblyopia by reducing cortical suppression.

The Vision Science Academy reports growing evidence for VR-based rehabilitation programs for adolescents with visual impairments.`,
    views: 6340,
    tags: ["VR","AR","vision therapy"],
  },
  {
    id: "drug-eluting-contact-lenses-2025",
    title: "Drug-Eluting Contact Lenses: Sustained Release from the Lens Surface",
    excerpt: "At least three drug-eluting lens candidates are in Phase II/III trials, targeting antihistamine delivery over 12-16 hour wear.",
    category: "Contact Lenses",
    author: authors[6],
    date: "June 6, 2026",
    readTime: "6 min read",
    imageGradient: "from-teal-500 to-cyan-600",
    imageUrl: IMG["contactLens"],
    imageCaption: "Next-generation drug-eluting contact lens technology.",
    featured: false,
    content: `Next-generation materials offer unprecedented oxygen permeability. Three candidates are in Phase II/III targeting 12-16 hour delivery.

New silicone hydrogels report Dk above 180 with modulus below 0.5 MPa. Lipid-layer coatings show 40-50% deposit reduction.

The global market surpassed $12B in 2024. Drug-eluting technology could expand therapeutic applications significantly.`,
    views: 5980,
    tags: ["drug-eluting","contact lenses"],
  },
  {
    id: "proactive-care-paradigm-2026",
    title: "2026 Industry Trends: The Shift from Reactive to Proactive Eye Care",
    excerpt: "The eye care industry shifts toward prevention-focused care driven by AI screening, portable diagnostics, and oculomics.",
    category: "Practice Management",
    author: authors[4],
    date: "June 4, 2026",
    readTime: "7 min read",
    imageGradient: "from-emerald-500 to-teal-600",
    imageUrl: IMG["doctorPatient"],
    imageCaption: "Proactive eye care screening in a modern clinic.",
    featured: false,
    content: `Oculomics uses ocular imaging to detect systemic disease biomarkers years before symptoms. Treatment evolves toward longer-acting delivery platforms.

The Vision Council's 2025 report shows majority of providers value proactive screening. With 740M pediatric cases projected by 2050, early intervention is essential.

Teleoptometry, AI, and patient-first digital workflows are the top 3 practice management trends for 2026.`,
    views: 7210,
    tags: ["proactive care","AI screening","oculomics"],
  }
];
