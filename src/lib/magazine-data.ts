export interface Author {
  name: string;
  specialty: string;
  initials: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  imageGradient: string;
  featured: boolean;
  content: string;
  views: number;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
  description: string;
  color: string;
}

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
  { name: "Dr. Rohan Fernandez", specialty: "Myopia Management", initials: "RF" },
  { name: "Dr. Divya Nair", specialty: "Anterior Segment", initials: "DN" },
  { name: "Dr. Amit Joshi", specialty: "Teleoptometry", initials: "AJ" },
];

export const categories: Category[] = [
  { name: "Clinical Refraction", icon: "Eye", count: 28, description: "Advanced techniques in refraction and prescription management", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { name: "Contact Lenses", icon: "Circle", count: 22, description: "Latest in contact lens materials, fitting, and management", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { name: "Myopia Management", icon: "TrendingUp", count: 19, description: "Strategies and breakthroughs in controlling myopia progression", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  { name: "Glaucoma", icon: "Activity", count: 25, description: "Diagnosis, monitoring, and treatment of glaucoma", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  { name: "Pediatric Optometry", icon: "Baby", count: 16, description: "Children's vision care and developmental optometry", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
  { name: "Ocular Pharmacology", icon: "Pill", count: 14, description: "Pharmacological advances in eye care therapeutics", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  { name: "Binocular Vision", icon: "Scan", count: 18, description: "Binocular vision disorders, vergence, and stereopsis", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { name: "Low Vision", icon: "Accessibility", count: 12, description: "Rehabilitation and assistive technology for low vision patients", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { name: "Practice Management", icon: "Briefcase", count: 21, description: "Business strategies, marketing, and practice growth", color: "bg-lime-500/10 text-lime-700 dark:text-lime-400" },
  { name: "Technology", icon: "Cpu", count: 23, description: "Ophthalmic technology, imaging, and diagnostic innovations", color: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400" },
  { name: "Teleoptometry", icon: "Monitor", count: 11, description: "Remote eye care delivery and digital health frameworks", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { name: "Anterior Segment", icon: "Aperture", count: 17, description: "Cornea, conjunctiva, and anterior chamber disorders", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
  { name: "Neuro-Ophthalmology", icon: "Brain", count: 13, description: "Visual pathway disorders and neuro-visual correlations", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  { name: "Public Health", icon: "Globe", count: 15, description: "Community eye health, epidemiology, and outreach programs", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
];

export const articles: Article[] = [
  {
    id: "myopia-control-beyond-atropine",
    title: "Advances in Myopia Control: Beyond Atropine",
    excerpt: "Exploring next-generation pharmaceutical and optical interventions that are reshaping how optometrists approach myopia progression management in clinical practice.",
    category: "Myopia Management",
    author: authors[9],
    date: "Jul 18, 2026",
    readTime: "8 min read",
    imageGradient: "from-teal-600 to-cyan-700",
    featured: true,
    views: 12450,
    content: `The landscape of myopia management has undergone a remarkable transformation over the past decade. While low-dose atropine (0.01%–0.05%) remains a cornerstone of pharmacological intervention, recent clinical trials have revealed that combination therapies and novel delivery systems may offer superior outcomes for children with rapidly progressing myopia. A landmark 2025 multi-center study published in Ophthalmology demonstrated that a sustained-release atropine punctal plug achieved comparable axial length control to daily eye drops while significantly improving patient compliance.\n\nOptical interventions have also evolved substantially beyond traditional orthokeratology and multifocal soft lenses. The latest generation of defocus incorporated multiple segment (DIMS) spectacle lenses now incorporates holographic optical elements that create a more uniform myopic defocus field across the peripheral retina. Clinical data from the Hong Kong Polytechnic University shows these lenses reduce myopia progression by 62% over two years compared to standard single-vision lenses, with the added benefit of zero contact lens-related complications.\n\nPerhaps the most exciting frontier lies in the intersection of technology and personalized medicine. Machine learning algorithms now analyze axial length growth curves, genetic markers, and environmental factors to predict individual progression rates with remarkable accuracy. This allows practitioners to tailor intervention intensity — reserving aggressive combination therapy for rapid progressors while maintaining less invasive approaches for stable patients. Several AI-powered platforms have received regulatory clearance in 2026, making personalized myopia management a practical reality for the first time.\n\nLooking ahead, several late-stage clinical trials are investigating novel therapeutic targets including retinal dopamine agonists, scleral cross-linking procedures, and even gene therapy approaches for familial high myopia. While these remain investigational, the trajectory of innovation suggests that the next five years will bring even more powerful tools to the optometrist's arsenal. The key challenge now lies in translating these advances from research centers to everyday clinical practice through education, training, and equitable access.`
  },
  {
    id: "oct-angiography-glaucoma",
    title: "The Future of OCT Angiography in Glaucoma Detection",
    excerpt: "How OCT-A is revolutionizing early glaucoma detection with vessel density metrics that precede visual field loss by years, and what this means for your practice.",
    category: "Glaucoma",
    author: authors[3],
    date: "Jul 15, 2026",
    readTime: "10 min read",
    imageGradient: "from-amber-600 to-orange-700",
    featured: true,
    views: 9870,
    content: `Optical Coherence Tomography Angiography (OCT-A) has emerged as one of the most significant diagnostic breakthroughs in glaucoma management over the past five years. Unlike traditional structural OCT, which measures retinal nerve fiber layer thickness, OCT-A provides a non-invasive, dye-free visualization of the retinal and choroidal microvasculature. Research has consistently demonstrated that vessel density changes in the peripapillary and macular regions can detect glaucomatous damage up to four years before conventional automated perimetry identifies functional visual field loss.\n\nThe latest generation of OCT-A devices offers several technological advances that have dramatically improved clinical utility. Ultra-widefield OCT-A now captures vascular detail extending beyond the traditional 6x6mm macular cube, providing a more comprehensive assessment of the retinal periphery where early glaucomatous changes may first manifest. Enhanced depth imaging algorithms have improved signal-to-noise ratio in patients with media opacities, making reliable imaging possible even in cases of mild cataract or posterior capsule opacity that previously precluded accurate assessment.\n\nArtificial intelligence integration has been the game-changer for clinical adoption of OCT-A in glaucoma. FDA-cleared AI algorithms now automatically segment the radial peripapillary capillary (RPC) plexus, compute vessel density metrics across standardized sectors, and compare results against age-matched normative databases. These systems generate a single, intuitive metric — the Glaucoma Vessel Density Index (GVDI) — that correlates strongly with disease severity and progression risk. A 2026 study in the American Journal of Ophthalmology found that AI-enhanced OCT-A achieved 94% sensitivity and 91% specificity for detecting early-stage primary open-angle glaucoma, outperforming both traditional OCT-RNFL analysis and standard automated perimetry.\n\nFor the practicing optometrist, integrating OCT-A into glaucoma care protocols requires thoughtful consideration of workflow, billing, and patient communication. Current CPT codes support OCT-A as a separate diagnostic procedure, and many insurance plans now provide coverage when medical necessity is documented. The key clinical recommendation is to incorporate OCT-A as a complementary tool alongside structural OCT and functional testing, particularly in patients with suspicious optic nerve appearance, ocular hypertension, or family history of glaucoma. The ability to detect and monitor vascular changes before irreversible neural loss occurs represents a paradigm shift toward truly preventive glaucoma care.`
  },
  {
    id: "pediatric-vision-screening-guidelines",
    title: "Pediatric Vision Screening: New AAP Guidelines 2026",
    excerpt: "The American Academy of Pediatrics has released updated vision screening recommendations that significantly expand the role of optometrists in early childhood eye care.",
    category: "Pediatric Optometry",
    author: authors[2],
    date: "Jul 12, 2026",
    readTime: "7 min read",
    imageGradient: "from-rose-500 to-pink-600",
    featured: true,
    views: 8320,
    content: `The American Academy of Pediatrics released its long-awaited updated vision screening guidelines in June 2026, marking the first comprehensive revision since 2016. These new recommendations reflect a growing body of evidence supporting earlier and more frequent vision assessments in children, with particular emphasis on detecting amblyopia risk factors, binocular vision disorders, and myopia onset before the age of six. The guidelines now recommend instrument-based screening starting at 12 months of age, a significant shift from the previous recommendation of 3 years.\n\nA key change in the 2026 guidelines is the formal endorsement of photoscreeners and autorefractors as primary screening tools for children aged 12 months through 5 years. The AAP cites a meta-analysis of 47 studies demonstrating that instrument-based screening achieves 88% sensitivity for detecting amblyopia risk factors, compared to 65% for traditional visual acuity-based screening in children under 4 years. The guidelines specifically recommend that children who fail instrument-based screening be referred to an optometrist or pediatric ophthalmologist for comprehensive evaluation, rather than being re-screened at a later date.\n\nThe guidelines also address the myopia epidemic for the first time, recommending that all children aged 5 and older undergo annual axial length measurement when feasible. This represents a proactive shift toward myopia risk stratification, with the AAP citing World Health Organization projections that 50% of the global population will be myopic by 2050. The guidelines encourage collaboration between pediatricians and optometrists to establish myopia surveillance protocols and provide early intervention for children identified as high-risk based on parental myopia, ethnicity, and near-work behaviors.\n\nFor optometrists, these updated guidelines create significant opportunities for collaborative care models. The AAP explicitly recommends co-management pathways where pediatricians conduct initial screenings and refer to optometrists for comprehensive evaluation, diagnosis, and management. Practices that invest in pediatric-friendly instrumentation, create welcoming environments for young children, and establish referral relationships with local pediatric practices will be well-positioned to meet the increased demand for early childhood eye care services.`
  },
  {
    id: "scleral-lens-fitting-masterclass",
    title: "Scleral Lens Fitting Masterclass: Advanced Techniques",
    excerpt: "A comprehensive guide to advanced scleral lens fitting including haptic optimization, landing zone assessment, and troubleshooting complex cases.",
    category: "Contact Lenses",
    author: authors[1],
    date: "Jul 10, 2026",
    readTime: "12 min read",
    imageGradient: "from-emerald-600 to-teal-700",
    featured: false,
    views: 7650,
    content: `Scleral lens fitting has evolved from a niche subspecialty to an essential competency in modern optometric practice. These large-diameter gas-permeable lenses vault the cornea and land on the scleral conjunctiva, providing exceptional visual rehabilitation for patients with irregular corneas, severe dry eye, and ocular surface disease. The global scleral lens market has grown at a compound annual rate of 18% over the past five years, driven by advances in lens design technology and increasing awareness among both practitioners and patients.\n\nModern scleral lens fitting begins with detailed anterior segment imaging, including corneal topography, scleral profilometry, and optical coherence tomography of the anterior segment (AS-OCT). These tools provide objective data on corneal elevation, scleral shape asymmetry, and conjunctival thickness that guide initial lens selection. The latest generation of scleral profilometers, such as the sMap3D and Eye Surface Profiler, create three-dimensional maps of the entire ocular surface, allowing practitioners to select initial lens parameters with unprecedented precision. Studies show that using objective imaging data reduces the number of diagnostic lenses needed by 40-60% compared to empirical fitting.\n\nThe haptic — the portion of the lens that rests on the scleral conjunctiva — is now recognized as the most critical element in achieving comfort and optimal fit. Advanced lens designs offer multiple haptic profiles including toric haptics for eyes with significant scleral torque, quadrant-specific designs that accommodate scleral asymmetry, and mini-scleral options (15-16mm diameter) for patients who find full-size scleral lenses cumbersome. Proper landing zone assessment requires careful slit-lamp evaluation with sodium fluorescein, looking for moderate compression (1-2 clock hours) without blanching, and OCT confirmation that the haptic does not impede conjunctival blood flow.\n\nTroubleshooting remains the most challenging aspect of scleral lens management. Midday fogging, caused by tear film debris accumulation beneath the lens, affects 30-40% of scleral lens wearers and significantly impacts visual quality and wearing time. Recent solutions include fenestrated lens designs that improve tear exchange, modified edge profiles that reduce hypoxia-induced conjunctival changes, and patient education on proper lens application and removal techniques using plunger tools and suction cups. The development of hyper-Dk materials with oxygen transmissibility exceeding 200 Dk/t has also reduced hypoxic complications and extended comfortable wearing times for many patients.`
  },
  {
    id: "digital-eye-strain-management",
    title: "Digital Eye Strain: Evidence-Based Management Strategies",
    excerpt: "With screen time reaching unprecedented levels, here is what the latest research actually supports for managing computer vision syndrome in your patients.",
    category: "Clinical Refraction",
    author: authors[0],
    date: "Jul 8, 2026",
    readTime: "6 min read",
    imageGradient: "from-teal-500 to-emerald-600",
    featured: false,
    views: 15200,
    content: `Digital eye strain, also known as computer vision syndrome, has become the most common presenting complaint in optometric practice worldwide. The average adult now spends over 11 hours per day interacting with digital screens, and post-pandemic remote work patterns have further accelerated this trend. The 2026 Vision Council Digital Eye Strain Report found that 78% of adults experience at least one symptom of digital eye strain regularly, with the highest prevalence among adults aged 25-44 who work in technology-intensive professions.\n\nThe pathophysiology of digital eye strain is multifactorial, involving reduced blink rate, incomplete blinking, altered tear film dynamics, and sustained accommodative effort at near distances. Research from the University of Waterloo Visual Physiology Lab has quantified that blink rate decreases from approximately 15 blinks per minute during normal conversation to just 3-5 blinks per minute during sustained screen use. This dramatic reduction leads to accelerated tear film evaporation, increased osmolarity, and subsequent ocular surface inflammation. Furthermore, the predominantly upward gaze during computer use exposes a larger ocular surface area, exacerbating these effects.\n\nEvidence-based management begins with a thorough assessment of the patient's visual environment and work habits. Prescription optimization is the foundation — including a dedicated near prescription that accounts for the specific working distance and screen position. Research supports the use of anti-reflective coatings, blue-light filtering lenses (though the evidence for blue light as the primary culprit remains debated), and punctal plugs for patients with concurrent dry eye. The 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds) has been validated in clinical trials to reduce symptoms by 35-40% when patients adhere to the protocol.\n\nEmerging management approaches include the use of wearable blink reminder devices that provide haptic feedback when blink rate drops below threshold, ambient light management systems that optimize screen-to-surround lighting ratios, and prescription lens tints that enhance contrast and reduce photostress. For patients with accommodative dysfunction contributing to their symptoms, vision therapy programs targeting accommodative facility and endurance have shown significant improvement in both objective measures and symptom scores. The key message for practitioners is that effective digital eye strain management requires a holistic approach addressing environmental factors, visual system function, and individual patient behaviors.`
  },
  {
    id: "neuro-optometric-rehabilitation-concussion",
    title: "Neuro-Optometric Rehabilitation After Concussion",
    excerpt: "Understanding the optometrist's critical role in managing visual sequelae of mild traumatic brain injury and concussion in both sports and civilian populations.",
    category: "Neuro-Ophthalmology",
    author: authors[8],
    date: "Jul 5, 2026",
    readTime: "9 min read",
    imageGradient: "from-purple-600 to-violet-700",
    featured: false,
    views: 6780,
    content: `The optometric management of concussion-related visual dysfunction has gained tremendous clinical importance as public awareness of mild traumatic brain injury (mTBI) continues to grow. An estimated 70-80% of concussed individuals experience significant visual symptoms including convergence insufficiency, accommodative dysfunction, saccadic abnormalities, and photosensitivity. These visual sequelae can persist for months or even years after the initial injury, significantly impacting quality of life, academic performance, and occupational function. Optometrists are uniquely positioned to identify and manage these conditions, yet many practitioners remain uncertain about evaluation protocols and treatment strategies.\n\nA comprehensive neuro-optometric assessment extends well beyond standard visual acuity and refraction. Key evaluation components include detailed near point convergence testing, monocular and binocular accommodative facility assessment, oculomotor tracking evaluation (both developmental eye movement and computerized assessments), stereopsis measurement, and contrast sensitivity testing under varying luminance conditions. The Vestibular/Ocular Motor Screening (VOMS) tool has emerged as a validated clinical instrument for quantifying concussion-related visual and vestibular deficits, and its incorporation into optometric evaluation provides a standardized framework for both diagnosis and outcome measurement.\n\nTreatment approaches for post-concussion visual dysfunction are typically multimodal. Vision therapy remains the primary intervention for binocular vision and accommodative disorders, with published evidence supporting its effectiveness in 85-90% of post-concussion patients with convergence insufficiency. Prism spectacles — including yoked prism for visual midline shift and compensatory prism for binocular alignment — provide immediate symptomatic relief while neuroplastic adaptations occur. Tinted lenses, particularly those in the FL-41 spectrum, have demonstrated significant benefit for post-concussion photosensitivity, with a randomized controlled trial showing a 60% reduction in headache frequency and intensity.\n\nCollaborative care models are essential for optimal patient outcomes. Optometrists should establish referral networks with neurologists, vestibular therapists, neuropsychologists, and sports medicine specialists. The development of standardized return-to-learn and return-to-play protocols that incorporate visual function criteria represents an important advancement in concussion management. As evidence accumulates supporting the efficacy of neuro-optometric rehabilitation, there is growing advocacy for mandatory visual screening in all concussion management pathways, a development that would significantly expand the optometrist's role in both sports medicine and general healthcare.`
  },
  {
    id: "practice-growth-ai-era",
    title: "Practice Growth Strategies in the Age of AI",
    excerpt: "How leading optometric practices are leveraging artificial intelligence, automation, and digital marketing to achieve sustainable growth in 2026.",
    category: "Practice Management",
    author: authors[7],
    date: "Jul 3, 2026",
    readTime: "7 min read",
    imageGradient: "from-lime-600 to-green-700",
    featured: false,
    views: 11340,
    content: `The integration of artificial intelligence into optometric practice management has moved far beyond theoretical applications to become a practical competitive differentiator. Practices that have strategically adopted AI-powered tools are reporting significant improvements in operational efficiency, patient acquisition, and revenue per visit. A 2026 survey of 500 optometric practices by Management in Practice magazine found that early AI adopters experienced an average 23% increase in revenue and 31% improvement in patient retention compared to practices relying on traditional management approaches.\n\nFront-office automation represents the most immediate opportunity for AI integration. Intelligent scheduling systems now analyze historical appointment patterns, no-show rates, and provider productivity metrics to optimize the daily schedule automatically. These systems reduce patient wait times by 35% while increasing provider utilization by 15-20%. AI-powered chatbots handle routine patient inquiries about appointments, insurance verification, and pre-visit preparation 24/7, freeing front-desk staff to focus on high-value patient interactions. Several platforms now offer AI-driven insurance eligibility verification that reduces claim denials by up to 40% by catching coverage issues before the patient encounter.\n\nClinical decision support powered by machine learning is transforming the back-office dimension of practice management. Automated pre-authorization systems use natural language processing to generate clinical justification letters that are 60% more likely to be approved on first submission. AI-assisted coding ensures that every visit is billed at the appropriate complexity level, capturing an estimated 12-18% of revenue that is typically left on the table due to undercoding. Inventory management algorithms predict consumable usage patterns and generate orders automatically, reducing stockouts by 85% and waste from expired products by 90%.\n\nThe digital marketing landscape for optometric practices has been equally transformed by AI capabilities. Programmatic advertising platforms use machine learning to target potential patients based on demographics, search behavior, and geographic proximity, delivering 3-5x return on ad spend compared to traditional advertising. AI-powered reputation management tools monitor online reviews across multiple platforms, generate appropriate responses, and identify opportunities to improve patient satisfaction in real-time. Perhaps most importantly, patient communication platforms now use predictive analytics to identify patients at risk of churning — those who haven't scheduled a visit within their recommended interval — and trigger personalized outreach campaigns that achieve 40% re-engagement rates.`
  },
  {
    id: "orthokeratology-comprehensive-review",
    title: "Orthokeratology: A Comprehensive Clinical Review",
    excerpt: "From patient selection to long-term outcomes, a thorough review of contemporary orthokeratology practice based on the latest clinical evidence.",
    category: "Myopia Management",
    author: authors[9],
    date: "Jun 30, 2026",
    readTime: "11 min read",
    imageGradient: "from-cyan-600 to-teal-700",
    featured: false,
    views: 9100,
    content: `Orthokeratology (ortho-K) has established itself as one of the most effective and well-studied myopia management interventions available to optometrists. By temporarily reshaping the cornea through overnight wear of specially designed rigid gas-permeable contact lenses, ortho-K provides clear unaided daytime vision while simultaneously slowing axial elongation in growing children. The LORIC (Longitudinal Orthokeratology Research in Children) study and its successor, the ROSE (Retardation of Myopia in Orthokeratology) study, have provided Level I evidence that ortho-K reduces axial length progression by 43-52% compared to single-vision spectacle correction over two years.\n\nPatient selection remains the most critical determinant of ortho-K success. Ideal candidates are typically between 8 and 16 years old with myopia between -1.00D and -6.00D, astigmatism up to -1.50D, and motivated patients and parents who understand the commitment required for safe lens wear. However, modern lens designs have expanded these parameters considerably — toric ortho-K designs now effectively manage up to -3.50D of corneal astigmatism, and higher myopia designs can temporarily correct up to -8.00D, though myopia control efficacy in higher prescriptions requires further investigation. Contraindications include active ocular surface disease, severe dry eye, poor hygiene compliance, and systemic conditions that compromise corneal health.\n\nThe fitting process has been streamlined considerably with the advent of computer-assisted topography-guided lens design systems. Rather than relying solely on trial lens fitting, practitioners can now upload corneal topography data to cloud-based design platforms that generate customized lens parameters optimized for each patient's unique corneal profile. Studies comparing topography-guided designs to empirical fitting show faster time to first adequate fit (average 1.2 visits vs. 2.8 visits), better visual quality, and reduced incidence of lens decentration. However, the practitioner's expertise in interpreting topography maps and managing clinical nuances remains irreplaceable.\n\nLong-term safety data spanning over 20 years of clinical use has confirmed that ortho-K is a safe procedure when proper protocols are followed. The most significant risk factor for microbial keratitis is poor lens handling and hygiene, with an estimated incidence of 1 in 5,000 patient-years — comparable to daily soft contact lens wear. Modern care solutions specifically formulated for ortho-K lenses, combined with daily disposable lens cases and patient education programs, have further reduced adverse event rates. The development of antimicrobial lens materials incorporating selenium and silver nanoparticles represents a promising advancement that may further enhance safety.`
  },
  {
    id: "ocular-surface-imaging-ai",
    title: "Anterior Segment Imaging: From Slit Lamp to AI-Powered Diagnostics",
    excerpt: "A comprehensive review of how artificial intelligence is enhancing anterior segment imaging modalities and improving diagnostic accuracy in clinical practice.",
    category: "Technology",
    author: authors[10],
    date: "Jun 28, 2026",
    readTime: "8 min read",
    imageGradient: "from-fuchsia-600 to-pink-700",
    featured: false,
    views: 8900,
    content: `Anterior segment imaging has undergone a revolutionary transformation with the integration of artificial intelligence into diagnostic platforms. What once required expert interpretation of slit-lamp findings and manual analysis of imaging studies can now be augmented or, in some cases, automated by machine learning algorithms that achieve specialist-level diagnostic accuracy. This technological evolution is democratizing access to advanced diagnostics, particularly in settings where anterior segment specialists may not be readily available.\n\nIn vivo confocal microscopy (IVCM) has been one of the primary beneficiaries of AI integration. These devices capture cellular-level images of the corneal layers, providing invaluable information about endothelial cell density, inflammatory cell infiltration, and nerve morphology. However, manual analysis of IVCM images is time-consuming and requires specialized training. AI algorithms trained on thousands of annotated IVCM images can now automatically identify and quantify endothelial cell parameters, detect Langerhans cell activation patterns indicative of keratitis, and assess subbasal nerve plexus morphology in diabetic patients with accuracy comparable to expert graders. Several platforms have received regulatory clearance for AI-assisted IVCM analysis, making this technology increasingly accessible.\n\nAnterior segment OCT (AS-OCT) has similarly been enhanced by deep learning approaches. AI algorithms can automatically segment the corneal layers, measure anterior chamber parameters with micron-level precision, and detect subtle pathological changes that may escape visual inspection. In the context of corneal ectasia screening, AI-enhanced AS-OCT achieves 96% sensitivity for detecting subclinical keratoconus by analyzing posterior corneal surface elevation patterns, pachymetry distribution, and epithelial thickness maps simultaneously. This represents a significant improvement over traditional topography-based screening, which relies primarily on anterior surface curvature analysis.\n\nThe integration of AI into anterior segment imaging is not without challenges. Algorithm bias, particularly in underrepresented populations, remains a concern that requires ongoing attention. The "black box" nature of deep learning models can make it difficult for clinicians to understand and trust AI-generated recommendations. Furthermore, the regulatory landscape for AI-based diagnostic tools continues to evolve, with increasing emphasis on real-world performance monitoring and post-market surveillance. Despite these challenges, the trajectory is clear: AI-enhanced anterior segment imaging will become standard of care within the next decade, fundamentally changing how optometrists diagnose and manage anterior segment disease.`
  },
  {
    id: "low-vision-rehabilitation-transforming-lives",
    title: "Low Vision Rehabilitation: Transforming Patient Independence",
    excerpt: "Modern assistive technologies and rehabilitation strategies are enabling unprecedented levels of independence for patients with irreversible vision loss.",
    category: "Low Vision",
    author: authors[4],
    date: "Jun 25, 2026",
    readTime: "9 min read",
    imageGradient: "from-sky-600 to-cyan-700",
    featured: false,
    views: 5430,
    content: `Low vision rehabilitation has entered a golden age of innovation, driven by advances in assistive technology, neuroplasticity research, and person-centered care models. For the estimated 285 million people worldwide living with moderate to severe vision impairment that cannot be corrected with conventional refractive correction, these advances offer tangible improvements in reading ability, mobility, social participation, and overall quality of life. Optometrists specializing in low vision care are uniquely positioned to serve as the primary coordinators of comprehensive rehabilitation programs.\n\nElectronic vision enhancement systems (EVES) have undergone dramatic miniaturization and capability improvements. Modern wearable devices like the OrCam MyEye and eSight provide real-time text-to-speech conversion, facial recognition, object identification, and barcode scanning in a lightweight form factor that patients find socially acceptable. A 2026 clinical trial published in Investigative Ophthalmology & Visual Science demonstrated that patients using AI-enhanced wearable EVES devices achieved a 47% improvement in reading speed and a 62% improvement in object recognition accuracy compared to traditional optical magnifiers. The integration of augmented reality (AR) technology into these devices has further expanded their capabilities, allowing real-time environment enhancement and navigation assistance.\n\nSmartphone and tablet applications have democratized access to low vision assistance. Apps now offer high-contrast text rendering, customizable magnification with reading navigation, color enhancement for color-deficient patients, and real-time object recognition powered by on-device machine learning. The ubiquity of smartphones means that many patients already carry a powerful low vision aid in their pocket. Clinician-guided selection and training on appropriate apps should be a standard component of every low vision rehabilitation program, particularly for patients who may not have access to or be able to afford dedicated assistive devices.\n\nThe rehabilitation process itself has evolved to incorporate principles of neuroplasticity and perceptual learning. Research has demonstrated that structured training programs combining eccentric viewing training, saccadic eye movement exercises, and visual search strategies can significantly improve functional vision even in patients with stable ocular pathology. These training programs, often delivered through gamified digital platforms that improve patient engagement and adherence, work by strengthening the brain's ability to process residual visual information more efficiently. The integration of occupational therapy, orientation and mobility training, and psychological support into multidisciplinary low vision teams ensures that the rehabilitation program addresses the full spectrum of patient needs, from functional vision improvement to emotional adjustment and social reintegration.`
  },
  {
    id: "teleoptometry-regulatory-update-2026",
    title: "Teleoptometry: Regulatory Landscape Update 2026",
    excerpt: "Navigating the evolving telehealth regulations that are reshaping how optometrists deliver remote eye care services across state and national borders.",
    category: "Teleoptometry",
    author: authors[11],
    date: "Jun 22, 2026",
    readTime: "7 min read",
    imageGradient: "from-indigo-500 to-violet-600",
    featured: false,
    views: 4560,
    content: `The regulatory landscape for teleoptometry has evolved significantly since the temporary expansions enacted during the COVID-19 pandemic. As of mid-2026, 38 U.S. states have enacted permanent telehealth parity laws that require insurance coverage for telehealth services at rates comparable to in-person visits, and 29 states specifically include optometry in their telehealth practice acts. These developments have created a more stable and predictable environment for optometrists seeking to incorporate telehealth into their practice models, though significant state-to-state variation in scope and requirements remains.\n\nThe Interstate Medical Licensure Compact (IMLC) has been expanded to include optometry through the Optometry Licensure Compact, which now has 22 member states. This compact allows optometrists licensed in one member state to obtain an expedited license to practice telehealth in any other member state, dramatically reducing the administrative burden of multi-state practice. However, practitioners must still comply with the specific telehealth regulations of the state where the patient is located at the time of the encounter, including requirements for patient-provider relationship establishment, prescribing authority, and documentation standards.\n\nReimbursement for teleoptometry services has also matured significantly. Medicare now covers telehealth visits for established patients with a documented prior in-person examination within the preceding 12 months, a policy that became permanent in January 2026. Commercial payers generally follow Medicare's lead, with most major plans covering synchronous video visits for diagnostic evaluation and follow-up care. Remote monitoring services, including home-based visual field testing, tele-retinal imaging through partner primary care clinics, and remote intraocular pressure monitoring with investigational devices, are increasingly being assigned specific CPT codes that facilitate reimbursement.\n\nThe most significant remaining barrier to widespread teleoptometry adoption is the limitation on remote prescribing. In most jurisdictions, optometrists cannot prescribe therapeutic pharmaceuticals or order diagnostic tests based solely on a telehealth encounter without a prior in-person examination. Several professional organizations are actively lobbying for expanded remote prescribing authority, arguing that advances in diagnostic technology and the proven safety record of teleophthalmology programs support broader remote clinical privileges. Until these regulations evolve, the most successful teleoptometry models combine remote consultations with periodic in-person examinations, using telehealth to extend access between physical visits rather than replace them entirely.`
  },
  {
    id: "binocular-vision-post-covid",
    title: "Binocular Vision Dysfunction in Post-COVID Patients",
    excerpt: "Emerging evidence reveals significant binocular vision and accommodative deficits in COVID-19 survivors, and how optometrists can provide effective rehabilitation.",
    category: "Binocular Vision",
    author: authors[5],
    date: "Jun 20, 2026",
    readTime: "8 min read",
    imageGradient: "from-orange-500 to-amber-600",
    featured: false,
    views: 7890,
    content: `Post-COVID-19 visual symptoms represent an increasingly recognized clinical entity that optometrists encounter with growing frequency. Large-scale studies from the United Kingdom, Spain, and India have demonstrated that 15-30% of COVID-19 survivors experience persistent visual symptoms for more than three months following acute infection, even in cases where the initial illness was mild. The most common visual complaints include convergence insufficiency, accommodative infacility, saccadic dysfunction, and visual motion hypersensitivity — symptoms that can significantly impact reading performance, computer use, and overall quality of life.\n\nThe proposed mechanisms for post-COVID binocular vision dysfunction are multifactorial. Neuroinflammatory processes triggered by the virus may affect the brainstem nuclei controlling vergence and version eye movements, including the oculomotor, trochlear, and abducens nerve complexes. Autonomic nervous system dysregulation, a hallmark of long COVID, may impair the neural circuits governing the near triad — accommodation, convergence, and miosis — leading to the constellation of near-vision symptoms commonly reported. Additionally, the prothrombotic state associated with COVID-19 may cause microvascular ischemia in brain regions involved in visual processing, though this mechanism remains investigational.\n\nClinical evaluation of post-COVID patients requires a systematic approach that goes beyond standard vision screening. Practitioners should conduct thorough near point convergence testing, measuring both the break and recovery points, as well as monocular and binocular accommodative facility testing with appropriate flipper lenses. Developmental eye movement (DEM) testing or computerized saccadic assessment can identify version deficits that may not be apparent during routine cover testing. It is important to recognize that many post-COVID patients present with multiple concurrent deficits rather than isolated dysfunctions, necessitating comprehensive evaluation protocols that assess all aspects of the vergence-accommodation system.\n\nVision therapy has emerged as the primary treatment modality for post-COVID binocular vision dysfunction, with published case series demonstrating favorable outcomes in 80-85% of treated patients. A typical rehabilitation program spans 12-24 weeks and includes convergence therapy with Brock strings and vectograms, accommodative facility training with lens flippers and Hart charts, and saccadic exercises using computerized training platforms. Many practitioners have found that combining traditional in-office vision therapy with home-based exercises using digital therapeutics apps provides the most efficient path to recovery. The integration of syntonic phototherapy (low-level light therapy) has shown promise in case reports for patients with persistent visual motion hypersensitivity and photophobia.`
  },
  {
    id: "contact-lens-materials-next-generation",
    title: "Contact Lens Materials: The Next Generation",
    excerpt: "From smart contact lenses to biomimetic polymers, exploring the material science innovations that will define the next decade of contact lens wear.",
    category: "Contact Lenses",
    author: authors[1],
    date: "Jun 18, 2026",
    readTime: "10 min read",
    imageGradient: "from-emerald-500 to-cyan-600",
    featured: false,
    views: 6230,
    content: `Contact lens material science is experiencing a renaissance of innovation driven by advances in polymer chemistry, surface engineering, and drug delivery technology. The next generation of contact lens materials promises to transform the wearing experience from a simple refractive correction to a multifunctional platform that monitors health, delivers therapeutics, and adapts to individual physiological needs. These advances represent the convergence of nanotechnology, biotechnology, and traditional polymer science in a field that had seen relatively incremental improvement for over two decades.\n\nBiomimetic surface technologies represent one of the most clinically significant advances. Drawing inspiration from the tear film's natural lipid layer, researchers have developed contact lens surface coatings that mimic the properties of meibomian gland secretions. These biomimetic coatings, composed of phospholipid polymers and amphiphilic molecules, create a stable interface between the lens surface and the tear film, reducing deposit formation by 70% and improving comfort ratings by 40% compared to conventional hydrogel and silicone hydrogel materials. Early clinical trials of these next-generation surface-modified lenses show a 60% reduction in lens-related dry eye symptoms among daily wear patients after 30 days of continuous wear.\n\nSmart contact lenses embedded with microelectronics represent the frontier of contact lens technology. Several companies are advancing clinical trials of lenses that incorporate microfluidic sensors capable of measuring intraocular pressure, glucose levels in tear fluid, and lacrimal biomarkers for ocular and systemic disease monitoring. A 2026 proof-of-concept study published in Science Translational Medicine demonstrated that a glucose-sensing contact lens could achieve correlation coefficients of 0.92 with conventional finger-stick blood glucose measurements, bringing the technology closer to clinical reality for diabetic patients. Wireless power transfer and data transmission using near-field communication (NFC) technology have solved the challenge of powering these microelectronic systems without bulky batteries.\n\nDrug-eluting contact lenses have finally overcome the technical barriers that limited earlier attempts at sustained drug delivery. The core challenge — achieving therapeutic drug release rates over extended periods without compromising optical clarity or oxygen permeability — has been addressed through molecular imprinting technology and nanoparticle drug reservoirs embedded within the lens matrix. Antimicrobial contact lenses that release ciprofloxacin or moxifloxacin at therapeutic levels for 7-14 days have completed Phase II clinical trials for prophylactic use following refractive surgery and in patients with recurrent bacterial keratitis. Perhaps the most anticipated application is sustained-release cyclosporine lenses for dry eye disease, which could replace daily eye drop administration and improve patient compliance significantly.`
  },
  {
    id: "glaucoma-pharmacology-2026",
    title: "Glaucoma Pharmacology: What's New in 2026",
    excerpt: "A detailed review of newly approved and investigational glaucoma medications, including novel drug classes, sustained-release formulations, and combination therapies.",
    category: "Ocular Pharmacology",
    author: authors[6],
    date: "Jun 15, 2026",
    readTime: "9 min read",
    imageGradient: "from-violet-600 to-purple-700",
    featured: false,
    views: 7120,
    content: `The glaucoma pharmacology landscape has experienced unprecedented expansion with the introduction of several novel drug classes and innovative drug delivery systems over the past two years. These advances address long-standing limitations of traditional therapy — including adherence challenges, local side effects, and insufficient intraocular pressure (IOP) control in advanced disease — and offer new mechanisms of action for patients who have exhausted conventional treatment options. For optometrists who manage glaucoma patients, understanding these new therapeutic options is essential for providing comprehensive, evidence-based care.\n\nRho kinase (ROCK) inhibitors have emerged as the most significant new drug class in glaucoma therapy since the introduction of prostaglandin analogs. Netarsudil 0.02% (Rhopressa), approved initially for once-daily dosing, is now available in a sustained-release formulation (netarsudil SR) that maintains therapeutic drug levels in the anterior chamber for up to three months following a single in-office administration. This formulation utilizes a biodegradable polymeric implant placed in the inferior conjunctival fornix, offering a paradigm shift in glaucoma management by eliminating daily drop administration. Clinical trials demonstrate sustained IOP reduction of 5-7 mmHg over the 12-week dosing interval, comparable to once-daily prostaglandin analogs.\n\nNovel prostaglandin receptor agonists with improved therapeutic profiles have also entered the market. Latanoprostene bunod, which releases both latanoprost acid and nitric oxide (NO), targets both the uveoscleral and trabecular outflow pathways simultaneously. The latest formulation incorporates a permeation enhancer that increases corneal absorption by 35%, allowing lower drug concentrations and reducing the incidence of ocular hyperemia by 50% compared to standard latanoprost. Additionally, a bimatoprost sustained-release implant (Durysta) has received expanded indications, and new refillable implant systems are in late-stage development that would allow in-office reservoir exchange without additional surgical procedures.\n\nCombination therapies have become increasingly sophisticated, moving beyond simple fixed-dose combinations of two drugs. Triple combination drops containing a prostaglandin analog, a carbonic anhydrase inhibitor, and an alpha-2 agonist are now available in preservative-free formulations, offering simplified dosing regimens for patients requiring multiple medications. Gene therapy approaches targeting the myocilin (MYOC) gene and trabecular meshwork extracellular matrix remodeling are in Phase I/II clinical trials and represent potentially disease-modifying interventions rather than purely symptomatic IOP reduction. While these gene therapies remain investigational, early safety data are encouraging, and they may fundamentally change the treatment paradigm for primary open-angle glaucoma within the next decade.`
  },
  {
    id: "ocular-surface-disease-beyond-drops",
    title: "Ocular Surface Disease: Beyond Artificial Tears",
    excerpt: "A systematic approach to diagnosing and managing ocular surface disease using advanced diagnostics, novel therapeutics, and personalized treatment algorithms.",
    category: "Anterior Segment",
    author: authors[10],
    date: "Jun 12, 2026",
    readTime: "8 min read",
    imageGradient: "from-red-500 to-rose-600",
    featured: false,
    views: 10340,
    content: `Ocular surface disease (OSD) remains the most frequently encountered condition in optometric practice, affecting an estimated 30-40% of the adult population and up to 70% of patients over age 65. Despite its prevalence, OSD is frequently undertreated, with many practitioners defaulting to artificial tears as the sole intervention without addressing the underlying etiology. A paradigm shift is occurring in OSD management, moving toward a precision medicine approach that identifies specific disease mechanisms — tear deficiency, evaporative stress, neurosensory dysfunction, and inflammatory-mediated damage — and targets each with evidence-based interventions.\n\nAdvanced diagnostic tools have made precision OSD management practically achievable. Tear film osmolarity testing (TearLab), which became widely available in the mid-2010s, has been joined by matrix metalloproteinase-9 (MMP-9) point-of-care testing (InflammaDry), lipid layer thickness analysis (LipiView), and meibography imaging systems. When used together as a diagnostic panel, these tools can differentiate aqueous-deficient dry eye from evaporative dry eye with over 90% accuracy, identify subclinical inflammation, and quantify meibomian gland atrophy. The latest addition to the diagnostic armamentarium is tear cytokine profiling using multiplex assay technology, which can measure inflammatory biomarkers including IL-6, IL-1beta, TNF-alpha, and interferon-gamma from a single tear sample.\n\nTreatment algorithms have evolved to address the multifactorial nature of OSD. For meibomian gland dysfunction (MGD), the most common cause of evaporative dry eye, thermal pulsation devices (LipiFlow, TearCare) remain the gold standard for in-office gland expression, with recent evidence supporting their superiority to manual expression in terms of both symptom improvement and gland function recovery. Intense pulsed light (IPL) therapy has gained FDA clearance for MGD treatment and offers the additional benefit of reducing ocular surface inflammation and Demodex infestation. For aqueous-deficient dry eye, the therapeutic landscape has expanded beyond traditional cyclosporine and lifitegrast to include novel anti-inflammatory agents such as loteprednol etabonate 0.25% ophthalmic suspension (Eysuvis) for short-term flare management and a sustained-release dexamethasone insert (Dextenza) that provides four weeks of anti-inflammatory therapy from a single placement.\n\nRegenerative approaches represent the most exciting frontier in OSD treatment. Autologous serum eye drops, prepared from the patient's own blood, contain growth factors, vitamins, and immunoglobulins that promote ocular surface healing. Platelet-rich plasma (PRP) eye drops offer a more standardized preparation with higher concentrations of beneficial growth factors. Several bioengineered tear substitutes containing recombinant human lubricin — a glycoprotein that provides boundary lubrication and anti-inflammatory properties — are in late-stage clinical development and may offer superior symptom relief compared to conventional artificial tears. The emergence of these advanced therapeutics reinforces the importance of accurate diagnosis and individualized treatment planning rather than a one-size-fits-all approach to ocular surface disease management.`
  },
  {
    id: "practice-valuation-guide-2026",
    title: "Optometric Practice Valuation: A 2026 Comprehensive Guide",
    excerpt: "Understanding the key metrics, valuation methods, and market trends that determine the true worth of an optometric practice in today's evolving healthcare landscape.",
    category: "Practice Management",
    author: authors[7],
    date: "Jun 10, 2026",
    readTime: "10 min read",
    imageGradient: "from-lime-500 to-emerald-600",
    featured: false,
    views: 8760,
    content: `The optometric practice market in 2026 presents a dynamic and complex landscape for both buyers and sellers. Practice valuations have risen steadily over the past three years, with median practice values increasing 18% since 2023, driven by strong revenue growth, expanding scope of practice, and heightened acquisition interest from corporate optometry entities and private equity groups. For optometrists considering buying or selling a practice, understanding the valuation process and the factors that drive practice worth is essential for making informed financial decisions and achieving optimal outcomes.\n\nRevenue-based valuation remains the most commonly used methodology for optometric practices, with practices typically valued at 0.6 to 1.2 times gross annual revenue, depending on practice characteristics. However, this simple multiplier approach is increasingly supplemented by earnings-based methods that focus on seller's discretionary earnings (SDE) or earnings before interest, taxes, depreciation, and amortization (EBITDA). These methods provide a more accurate picture of practice profitability and are preferred by sophisticated buyers and financial institutions. Current market data shows that well-managed optometric practices typically sell for 3.5 to 5.5 times SDE, with higher multiples awarded to practices demonstrating strong growth trajectories, diversified revenue streams, and efficient operational systems.\n\nSeveral key performance indicators (KPIs) significantly influence practice valuation and should be optimized well in advance of a planned sale. Revenue per patient visit, which averaged $285 in 2025 according to the AOA Practice Analysis, is a critical metric that reflects both clinical efficiency and billing optimization. Optical capture rate — the percentage of comprehensive exam patients who purchase eyewear from the practice — should exceed 55% for a premium valuation, as this metric demonstrates the practice's ability to convert clinical services into retail revenue. Patient retention rate, measured by the percentage of patients who return for annual examinations, should be above 70% to indicate a loyal and stable patient base. The ratio of medical to refractive revenue is increasingly important, with practices deriving more than 40% of revenue from medical services commanding higher valuations due to the resilience of medical revenue to economic cycles and online retail disruption.\n\nThe corporate consolidation trend continues to reshape the practice market, with approximately 35% of optometric practice acquisitions in 2025 involving corporate buyers. These entities typically offer higher purchase prices than individual buyers but may include restrictive covenants and employment agreements that sellers should carefully evaluate. Independent buyers, including younger optometrists seeking practice ownership, often require seller financing and transitional support but may offer more favorable long-term terms. For sellers planning an exit, beginning preparation 3-5 years in advance is advisable — this timeline allows for optimization of financial records, resolution of operational inefficiencies, staff stabilization, and implementation of systems that enhance practice transferability and value.`
  },
];

export const trendingTopics = [
  { title: "AI in Optometry: 2026 State of the Art", views: 18920 },
  { title: "Myopia Epidemic: WHO Updates Global Projections", views: 15640 },
  { title: "Sustainable Contact Lens Practices", views: 13200 },
  { title: "Gene Therapy for Inherited Retinal Disease", views: 11980 },
  { title: "The Optometrist's Role in Sleep Medicine", views: 10450 },
];

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Pediatric Optometrist",
    location: "Singapore",
    content: "Focus Magazine has become my go-to resource for staying current with pediatric vision research. The myopia management articles alone have transformed how I approach young patients in my practice.",
    rating: 5,
    initials: "SC"
  },
  {
    name: "Dr. James Okafor",
    role: "Clinical Director",
    location: "Lagos, Nigeria",
    content: "The depth of clinical content is unmatched. From glaucoma management to practice growth strategies, every issue delivers actionable insights I implement immediately in my clinic.",
    rating: 5,
    initials: "JO"
  },
  {
    name: "Dr. Maria Santos",
    role: "Contact Lens Specialist",
    location: "São Paulo, Brazil",
    content: "As a contact lens specialist, I appreciate the detailed coverage of new materials and fitting techniques. The peer-reviewed quality gives me confidence in applying new methods.",
    rating: 5,
    initials: "MS"
  }
];

export const breakingNews = [
  "WHO Updates Myopia Guidelines for 2026 — Recommends Annual Screening for Children Under 12",
  "New ROCK Inhibitor Sustained-Release Implant Receives FDA Breakthrough Designation",
  "AI-Based Retinal Screening Now Covered by Major Insurance Providers in the US",
  "Global Scleral Lens Market Projected to Reach $5.2 Billion by 2028",
  "Teleoptometry Legislation Advances in 12 US States — AOA Advocacy Campaign Shows Results",
  "Novel Gene Therapy for Inherited Retinal Disease Shows Promise in Phase II Trials",
  "Low Vision Assistive Technology Market Sees 40% Year-over-Year Growth",
  "Ortho-K Long-Term Safety Data: 20-Year Follow-Up Study Published in Ophthalmology",
];

export const editorsPicksIds = [
  "scleral-lens-fitting-masterclass",
  "digital-eye-strain-management",
  "neuro-optometric-rehabilitation-concussion",
  "practice-growth-ai-era",
  "contact-lens-materials-next-generation",
];