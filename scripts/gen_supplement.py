#!/usr/bin/env python3
"""Supplemental: Add missing categories and skills to reach 500"""

import os

BASE = "/home/z/my-project/download/innovative-lab-of-optometry/skill"

def mk(name, cat, desc, triggers, role):
    t = ", ".join(triggers)
    return f"""# Skill: {name}

## Category
{cat}

## Description
{desc}

## Trigger Words
{t}

## Sub-Agent Role
{role}

## Parallel Capable
Yes

## Agent Swarm Priority
3

## Execution Mode
When triggered, this skill spawns a focused sub-agent that independently processes the task and returns structured output to the swarm orchestrator.
"""

# Missing Clinical Refraction (need ~2 more)
# Missing Contact Lens (need ~29 more - most were lost)
# Missing Binocular Vision (need ~31 more - entire section lost)

SKILLS = [
    # CONTACT LENS (30 more)
    ("cl-wear-schedule", "Contact Lens", "Determine optimal CL wear schedule: daily disposable, bi-weekly, monthly replacement. Correlate with patient lifestyle, dexterity, and ocular surface health.", ["wear schedule","daily disposable","bi-weekly CL","monthly CL","replacement frequency","CL wear","modality"], "Specialized sub-agent."),
    ("cl-base-curve-selection", "Contact Lens", "Select CL base curve from keratometry: calculate K-average, choose steeper-than-K for alignment, and verify with fluorescein pattern assessment.", ["base curve","BC selection","K to BC","fitting curve","CL curvature","steep K","flat K"], "CL base curve selector."),
    ("cl-diameter-selection", "Contact Lens", "Select CL diameter based on corneal diameter, limbal coverage, and fitting characteristics. Standard vs large diameter for better centration.", ["CL diameter","lens diameter","limbal coverage","large diameter","corneal diameter","DIA CL"], "CL diameter selector."),
    ("cl-lens-power-verification", "Contact Lens", "Verify CL lens power using lensometer and over-refraction. Confirm power matches ordered parameters and assess for manufacturing defects.", ["CL power verify","lensometer CL","over-refraction CL","power check CL","CL verification"], "Specialized sub-agent."),
    ("silicone-hydrogel-deposits", "Contact Lens", "Identify and manage deposits on SiHy lenses: lipid deposits, protein deposits, and mucin balls. Recommend material change and care system modification.", ["SiHy deposit","lipid deposit","protein deposit","mucin ball","lens spoilage","deposit management"], "Specialized sub-agent."),
    ("cl-patient-selection", "Contact Lens", "Determine CL candidacy: ocular surface assessment, motivation, dexterity, lifestyle, and contraindications. Manage expectations for new wearers.", ["CL candidacy","new wearer","CL eligibility","patient selection","CL motivation","CL contraindication"], "Specialized sub-agent."),
    ("cl-fitting-followup", "Contact Lens", "Perform CL fitting follow-up: assess lens movement, centration, coverage, visual acuity, and patient comfort at 1 week, 1 month, and 3 months.", ["CL follow-up","fitting check","1 week CL","CL assessment","lens evaluation","fitting review"], "Specialized sub-agent."),
    ("cl-complication-prevention", "Contact Lens", "Implement CL complication prevention: proper hygiene, replacement adherence, regular follow-up, and patient education on warning signs.", ["CL prevention","complication prevent","CL hygiene","replacement adherence","CL safety","wear safety"], "Specialized sub-agent."),
    ("piggyback-cl-system", "Contact Lens", "Fit piggyback CL system: RGP over soft lens for keratoconus, irregular cornea, and post-penetrating keratoplasty. Material compatibility.", ["piggyback","RGP over soft","keratoconus piggyback","dual lens","CL combination","piggyback system"], "Specialized sub-agent."),
    ("cl-in-toric-astigmatism", "Contact Lens", "Select toric CL design for specific astigmatism: low astigmatism soft toric, high astigmatism RGP, and mixed astigmatism bitoric designs.", ["toric selection","astigmatism CL design","low astigmatism CL","high astigmatism CL","bitoric","mixed astigmatism"], "Specialized sub-agent."),
    ("custom-soft-cl", "Contact Lens", "Order custom soft CL for unusual parameters: high power, extreme cylinder, custom base curve/diameter, and prosthetic lenses.", ["custom CL","custom soft lens","unusual parameters","special order CL","bespoke CL","non-stock CL"], "Specialized sub-agent."),
    ("cl-handling-training", "Contact Lens", "Teach CL insertion and removal: finger method, pinch method, and for rigid lenses. Troubleshoot difficulties and build confidence.", ["CL insertion","CL removal","CL handling","teach insertion","lens application","handling training","new wearer training"], "Specialized sub-agent."),
    ("cl-dry-eye-patient", "Contact Lens", "Manage CL wear in dry eye patients: material selection (high Dk, low modulus), care system optimization, and supplemental lubrication.", ["dry eye CL","CL dry","lens dryness","comfort dry eye","lubrication CL","SiHy dry"], "Specialized sub-agent."),
    ("cl-post-surgical", "Contact Lens", "Fit CL after ocular surgery: post-RK, post-PRK/LASIK bandage, post-penetrating keratoplasty, and post-cataract for anisometropia.", ["post-surgical CL","post-RK CL","post-PRK CL","post-PKP CL","post-cataract CL","surgical CL fitting"], "Specialized sub-agent."),
    ("monovision-cl-fitting", "Contact Lens", "Fit monovision CL: dominant eye for distance, non-dominant for near. Determine tolerance, fine-tune power, and discuss limitations.", ["monovision CL","dominant eye","distance CL","near CL","monovision fitting","monovision tolerance"], "Specialized sub-agent."),
    ("cl-sports-application", "Contact Lens", "Recommend CL for sports: soft daily disposables, sport-tinted CL, and safety considerations for swimming, basketball, and contact sports.", ["sports CL","athletic CL","swimming CL","sport vision","daily disposable sport","CL sport safety"], "Specialized sub-agent."),
    ("cl-medicament-delivery", "Contact Lens", "Understand drug-delivering CL: vitamin E loaded, nanoparticle embedded, and sustained-release platforms for antibiotics, steroids, and anti-VEGF.", ["drug delivery CL","medicated CL","sustained release CL","nanoparticle CL","vitamin E CL","therapeutic delivery"], "Specialized sub-agent."),
    ("cl-in-pediatric", "Contact Lens", "Fit CL in pediatric patients: premature infant aphakia, myopia control for children, therapeutic CL, and parental involvement in care.", ["pediatric CL","child CL","infant aphakia CL","pediatric myopia CL","parent CL care","child therapeutic CL"], "Specialized sub-agent."),
    ("cl-allergy-management", "Contact Lens", "Manage allergic CL patients: GPC identification, lens material change to daily disposable, preservative-free solutions, and topical therapy.", ["CL allergy","GPC CL","allergic CL wearer","mast cell CL","preservative free CL","allergy management"], "Specialized sub-agent."),
    ("cl-and-pregnancy", "Contact Lens", "Manage CL wear during pregnancy: corneal curvature changes, dry eye exacerbation, and temporary Rx changes. Safety of medications during lactation.", ["pregnancy CL","lactation CL","hormonal CL","corneal change pregnancy","pregnancy dry eye","gestation eye"], "Specialized sub-agent."),
    ("cl-recall-system", "Contact Lens", "Implement CL recall system: automated reminders for replacement, annual exam, and aftercare. Improve compliance and patient retention.", ["CL recall","replacement reminder","CL reminder","annual CL exam","aftercare recall","compliance system"], "Specialized sub-agent."),
    ("cl-tinted-lens", "Contact Lens", "Recommend tinted CL: visibility tint, enhancement tint, opaque color, and light-filtering tints (sport-specific amber, green, gray).", ["tinted CL","colored CL","visibility tint","enhancement tint","opaque CL","color CL","sport tint"], "Specialized sub-agent."),
    ("cl-parameter-troubleshooting", "Contact Lens", "Troubleshoot CL parameter issues: tight lens (steepen BC, increase diameter), loose lens (flatten BC, decrease diameter), and decentration.", ["tight lens","loose lens","CL decentration","parameter adjust","BC change","diameter change","fit troubleshoot"], "Specialized sub-agent."),
    ("cl-silicone-hydrogel-selection", "Contact Lens", "Select specific SiHy materials: compare senofilcon A, lotrafilcon B, comfilcon A, balafilcon A. Match to patient needs and tear film.", ["senofilcon","lotrafilcon","comfilcon","balafilcon","SiHy comparison","material selection","lens brand"], "Specialized sub-agent."),
    ("cl-annual-review", "Contact Lens", "Conduct comprehensive CL annual review: corneal health, lens performance, prescription update, compliance assessment, and care system review.", ["CL annual review","yearly CL check","CL comprehensive","annual aftercare","CL health review","yearly exam CL"], "Specialized sub-agent."),
    ("cl-with-glasses-backup", "Contact Lens", "Manage CL patients with glasses backup: appropriate backup Rx, part-time wear strategies, and contingency planning for CL intolerance days.", ["glasses backup","CL backup","spectacle backup","part-time CL","CL intolerance","backup Rx"], "Specialized sub-agent."),
    ("rpg-lens-care", "Contact Lens", "Teach RGP lens care: daily cleaning, conditioning, enzymatic cleaning, and proper storage. Handle deposit removal and surface polishing.", ["RGP care","RGP cleaning","conditioning solution","enzymatic RGP","RGP storage","RGP deposit","RGP polishing"], "Specialized sub-agent."),

    # BINOCULAR VISION (30 more - all were lost)
    ("sensory-adaptation-strabismus", "Binocular Vision", "Evaluate sensory adaptation in strabismus: ARC types, suppression depth, and anomalous correspondence. Determine binocular potential for surgical outcome.", ["sensory adaptation","ARC strabismus","suppression depth","binocular potential","sensory status strabismus"], "Specialized sub-agent."),
    ("spasmus-nutans", "Binocular Vision", "Diagnose spasmus nutans: triad of nystagmus, head bobbing, torticollis in infancy. Differentiate from congenital nystagmus and retinoblastoma.", ["spasmus nutans","head bobbing","torticollis infant","infantile nystagmus differential","nystagmus head nod"], "Specialized sub-agent."),
    ("duane-retraction-syndrome", "Binocular Vision", "Diagnose Duane retraction syndrome: congenital limited abduction/adduction with palpebral fissure narrowing and globe retraction. Types I, II, III.", ["Duane","DRS","retraction syndrome","limited abduction","globe retraction","palpebral fissure narrowing","congenital Duane"], "Specialized sub-agent."),
    ("moebius-syndrome-eye", "Binocular Vision", "Evaluate ocular findings in Moebius syndrome: sixth and seventh nerve palsy, strabismus, and exposure keratopathy management.", ["Moebius syndrome","congenital facial palsy","sixth nerve palsy","abducens palsy","exposure keratopathy Moebius"], "Specialized sub-agent."),
    ("third-nerve-palsy", "Binocular Vision", "Diagnose third nerve palsy: complete vs partial, pupil involvement (compressive vs microvascular), and neuroimaging referral.", ["third nerve palsy","CN III","pupil involving","compressive CN III","microvascular palsy","ptosis ophthalmoplegia"], "Specialized sub-agent."),
    ("sixth-nerve-palsy", "Binocular Vision", "Diagnose sixth nerve palsy: esotropia, limited abduction. Differentiate microvascular from compressive and manage with prism, botulinum, or observation.", ["sixth nerve palsy","CN VI","lateral rectus palsy","abduction limitation","esotropia CN VI","microvascular sixth"], "Specialized sub-agent."),
    ("superior-oblique-palsy", "Binocular Vision", "Diagnose superior oblique (fourth nerve) palsy: hypertropia, head tilt, Bielschowsky head tilt test positive. Congenital vs acquired.", ["superior oblique palsy","fourth nerve","hypertropia SO","head tilt test","Bielschowsky","congenital SO palsy"], "Specialized sub-agent."),
    ("inferior-oblique-overaction", "Binocular Vision", "Identify inferior oblique overaction: V-pattern esotropia, bilateral IOOA. Grade severity and determine surgical referral.", ["IOOA","inferior oblique overaction","V-pattern","oblique overaction","V-esotropia","IO overaction"], "Specialized sub-agent."),
    ("superior-oblique-overaction", "Binocular Vision", "Identify superior oblique overaction: A-pattern esotropia, bilateral SOOA. Grade and manage with weakening procedures.", ["SOOA","superior oblique overaction","A-pattern","A-esotropia","oblique dysfunction","SO overaction"], "Specialized sub-agent."),
    ("brown-syndrome-evaluation", "Binocular Vision", "Evaluate Brown syndrome: limited elevation in adduction, click on attempted upgaze. Congenital vs acquired causes and management.", ["Brown syndrome","SO tendon sheath","limited elevation","superior oblique tendon","click syndrome","elevation in adduction"], "Specialized sub-agent."),
    ("strabismus-surgery-timing", "Binocular Vision", "Determine optimal timing for strabismus surgery: age considerations, sensory status, stability of deviation, and binocular potential.", ["surgery timing","strabismus timing","optimal surgery age","sensory status surgery","deviation stability"], "Specialized sub-agent."),
    ("incomitant-deviation", "Binocular Vision", "Evaluate incomitant strabismus: measure deviation in 9 gaze positions, identify restricted vs paretic pattern using forced duction test principles.", ["incomitant","non-comitant","gaze position measurement","paretic pattern","restrictive pattern","forced duction"], "Specialized sub-agent."),
    ("consecutive-strabismus", "Binocular Vision", "Manage consecutive strabismus: overcorrection or undercorrection after strabismus surgery. Assess timing, magnitude, and plan reoperation.", ["consecutive strabismus","overcorrection","undercorrection","reoperation","post-surgical strabismus","surgical result"], "Specialized sub-agent."),
    ("a-v-pattern-strabismus", "Binocular Vision", "Identify A and V patterns: measure vertical deviation in upgaze and downgaze. Correlate with oblique muscle dysfunction.", ["A-pattern","V-pattern","pattern strabismus","vertical pattern","oblique muscle","upgaze downgaze deviation"], "Specialized sub-agent."),
    ("xe-pattern-strabismus", "Binocular Vision", "Identify X and Y patterns of strabismus: measure horizontal deviation in upgaze, primary, and downgaze positions.", ["X-pattern","Y-pattern","pattern deviation","horizontal pattern","upgaze downgaze horizontal"], "Specialized sub-agent."),
    ("oblique-muscle-surgery", "Binocular Vision", "Understand oblique muscle surgical procedures: IO recession, IO myectomy, SO tuck, SO recession, and Harada-Ito procedure for torsion.", ["IO recession","IO myectomy","SO tuck","SO recession","Harada-Ito","oblique surgery","torsion surgery"], "Specialized sub-agent."),
    ("strabismus-post-trauma", "Binocular Vision", "Manage post-traumatic strabismus: orbital fracture with entrapment, cranial nerve palsy, and traumatic rectus muscle injury.", ["traumatic strabismus","orbital fracture strabismus","trauma palsy","rectus injury","blowout strabismus","post-trauma diplopia"], "Specialized sub-agent."),
    ("botulinum-toxin-strabismus", "Binocular Vision","Understand botulinum toxin injection for strabismus: indications (acute CN VI palsy, small deviations), dosing, duration, and expected outcomes.", ["botulinum","botox strabismus","chemodenervation","CN VI botox","small angle botox","injection strabismus"], "Specialized sub-agent."),
    ("strabismus-amblyopia-risk", "Binocular Vision", "Calculate amblyopia risk from strabismus: type, duration, magnitude, and age of onset. Determine treatment urgency.", ["strabismus amblyopia risk","amblyopia from strabismus","deviation duration","age onset risk","treatment urgency"], "Specialized sub-agent."),
    ("sensory-fusion-training", "Binocular Vision", "Design sensory fusion training: fusional vergence exercises, antisuppression training, stereogram exercises, and computerized fusion programs.", ["sensory fusion training","fusional exercise","antisuppression","fusion training","stereogram therapy","binocular training"], "Specialized sub-agent."),
    ("motor-fusion-training", "Binocular Vision", "Design motor fusion training: prism jump, prism flipper, Brock string convergence, and eccentric circle cards for vergence development.", ["motor fusion training","prism jump","prism flipper","vergence training","convergence exercise","motor vergence"], "Specialized sub-agent."),
    ("binocular-vision-pediatric-screen", "Binocular Vision", "Screen binocular vision in children: cover test, NPC, stereopsis at school age. Identify children needing full BV evaluation.", ["BV screen child","pediatric BV","cover test child","stereopsis screen","NPC child","school BV screen"], "Specialized sub-agent."),
    ("saccade-assessment", "Binocular Vision", "Assess saccadic function: speed, accuracy, and latency using clinical observation, DEM test, and computerized saccadometry.", ["saccade","saccadic","DEM test","saccadometry","eye movement","saccade speed","reading saccade"], "Specialized sub-agent."),
    ("pursuit-assessment", "Binocular Vision", "Assess smooth pursuit: horizontal and vertical tracking, catch-up saccades, and relationship to reading and vestibular function.", ["pursuit","smooth pursuit","tracking","catch-up saccade","pursuit dysfunction","vestibular pursuit"], "Specialized sub-agent."),
    ("vergence-adaptation", "Binocular Vision", "Evaluate vergence adaptation: sustained vs phasic vergence capacity, prism adaptation test, and clinical implications for prism prescription.", ["vergence adaptation","prism adaptation","sustained vergence","phasic vergence","vergence capacity","prism prescription"], "Specialized sub-agent."),
    ("binocular-vision-and-reading", "Binocular Vision", "Evaluate binocular vision in reading: convergence, accommodative facility, saccades, and their relationship to reading speed and comprehension.", ["reading vision","BV reading","reading difficulty","convergence reading","accommodative reading","saccade reading"], "Specialized sub-agent."),
    ("torticollis-ocular", "Binocular Vision", "Differentiate ocular vs non-ocular torticollis: head tilt from superior oblique palsy, nystagmus null point, and compensatory head posture.", ["torticollis","ocular torticollis","head tilt ocular","nystagmus head posture","compensatory posture","cervical vs ocular"], "Specialized sub-agent."),
    ("binocular-vision-post-concussion", "Binocular Vision", "Evaluate and manage binocular vision dysfunction after concussion: convergence insufficiency, saccade dysfunction, and accommodative insufficiency.", ["concussion BV","TBI binocular","post-concussion convergence","brain injury vision","vestibular ocular concussion","sports concussion"], "Specialized sub-agent."),
    ("surgical-goal-strabismus", "Binocular Vision", "Determine surgical goals in strabismus: functional (eliminate diplopia, expand field) vs cosmetic (align eyes). Manage patient expectations.", ["surgical goal","functional strabismus","cosmetic alignment","diplopia free","field expansion","patient expectation"], "Specialized sub-agent."),

    # Additional Clinical Refraction + misc (to reach 500)
    ("lens-tilt-and-decentration", "Clinical Refraction", "Calculate visual effects of lens tilt and decentration: induced cylinder, effective power changes, and compensatory adjustments in spectacles.", ["lens tilt","decentration","induced cylinder","effective power","tilted lens","wrapped frame effect"], "Specialized sub-agent."),
    ("clinical-refraction-pitfalls", "Clinical Refraction", "Identify and avoid common refraction pitfalls: over-minus in children, cylinder axis errors in low astigmatism, and unreliable VA responses.", ["refraction pitfall","refraction error","common mistake","over-minus child","cylinder error","unreliable patient"], "Specialized sub-agent."),
    ("double-vision-differential", "Clinical Refraction", "Systematic differential diagnosis of double vision: monocular vs binocular, constant vs intermittent, and associated neurological symptoms.", ["double vision differential","diplopia differential","monocular diplopia","binocular diplopia","vision duplication"], "Specialized sub-agent."),
    ("occupational-vision-screening", "Clinical Refraction", "Perform occupational vision screening: computer users, drivers, pilots, military, and healthcare workers with specific visual standards.", ["occupational vision","computer screen","driver vision","pilot vision","military vision","visual standard","occupational test"], "Specialized sub-agent."),
    ("vision-therapy-evidence", "Clinical Refraction", "Evaluate evidence for vision therapy: CITT trial for CI, amblyopia treatment studies, and critical appraisal of VT efficacy claims.", ["vision therapy evidence","CITT","VT research","amblyopia study","VT efficacy","evidence-based VT","VT controversy"], "Specialized sub-agent."),
    ("refraction-in-media-opacity", "Clinical Refraction", "Perform refraction through media opacity: cataract, corneal scarring, and vitreous hemorrhage. Techniques for obtaining best possible acuity.", ["media opacity refraction","cataract refraction","corneal scar refraction","reduced view","difficult refraction","pinhole refraction"], "Specialized sub-agent."),
    ("spectacle-lens-aberration", "Clinical Refraction", "Understand spectacle lens aberrations: oblique astigmatism, curvature of field, chromatic aberration, and their clinical significance for high Rx.", ["lens aberration","oblique astigmatism","chromatic aberration","curvature field","lens distortion","high Rx aberration"], "Specialized sub-agent."),
    ("e-scoop-contrast-enhancement", "Clinical Refraction", "Recommend E-Scoop and contrast-enhancing lenses: yellow/orange filters for retinitis pigmentosa, macular degeneration, and diabetic retinopathy.", ["E-Scoop","contrast enhancement","yellow filter","RP filter","AMD filter","contrast lens","filter spectacle"], "Specialized sub-agent."),
    ("refraction-with-nystagmus", "Clinical Refraction", "Adapt refraction technique for nystagmus patients: null zone positioning, trial frame over phoropter, and head posture optimization.", ["nystagmus refraction","null zone refraction","trial frame nystagmus","head posture refraction","difficult refraction nystagmus"], "Specialized sub-agent."),
    ("refraction-terminology-standard", "Clinical Refraction", "Use standardized refraction terminology: spherical equivalent, best-corrected VA, manifest vs cycloplegic, and cross-cylinder technique documentation.", ["refraction terminology","spherical equivalent","BCVA","manifest cycloplegic","Rx notation","refraction standard"], "Specialized sub-agent."),
    ("spectacle-lens-edge-thickness", "Optical Dispensing", "Calculate spectacle lens edge thickness based on Rx, frame size, and lens material. Minimize edge thickness for myopic prescriptions.", ["edge thickness","lens thickness calculation","thin edge","myopic edge","frame size effect","lens blank size"], "Specialized sub-agent."),
    ("sustainable-optical-practice", "Practice Management", "Implement sustainable practices: eco-friendly frame brands, recycling programs for CL and spectacles, and energy-efficient clinic operations.", ["sustainable practice","eco-friendly optical","recycling CL","green optometry","sustainable frame","environment practice"], "Specialized sub-agent."),
    ("optometry-ai-integration", "Practice Management", "Integrate AI tools in optometry practice: automated screening, clinical decision support, appointment optimization, and AI-enhanced imaging analysis.", ["AI optometry","artificial intelligence practice","AI screening","clinical AI","automated diagnosis","machine learning practice"], "Specialized sub-agent."),
    ("digital-marketing-optometry", "Practice Management", "Implement digital marketing: Google Business Profile, local SEO, social media content calendar, and paid advertising for optometry practices.", ["digital marketing","Google Business","local SEO","social media optometry","paid ads optometry","online presence"], "Specialized sub-agent."),
    ("patient-portal-management", "Practice Management", "Manage patient portal: online scheduling, secure messaging, prescription refill requests, and patient access to records and educational materials.", ["patient portal","online scheduling","secure messaging","portal management","patient access","digital health"], "Specialized sub-agent."),
    ("optometric-research-methods", "Practice Management", "Design optometric research studies: study design, sample size calculation, statistical methods, IRB application, and evidence grading.", ["research methods","study design","sample size","statistics optometry","IRB","clinical research","evidence grading"], "Specialized sub-agent."),
    ("optometry-continuing-education", "Practice Management", "Manage continuing education: state CE requirements, national conferences (AOA, Academy), online CE platforms, and specialty certification.", ["continuing education","CE","AOA conference","Academy meeting","online CE","state CE requirement","specialty certification"], "Specialized sub-agent."),
    ("practice-acquisition-due-diligence", "Practice Management", "Conduct due diligence for practice acquisition: financial analysis, patient base evaluation, equipment assessment, and legal review.", ["practice acquisition","due diligence","buy practice","practice valuation","financial review","practice purchase"], "Specialized sub-agent."),
    ("ocular-surface-reconstruction", "Anterior Segment Disease", "Understand ocular surface reconstruction: limbal stem cell transplantation, amniotic membrane transplantation, and conjunctival autograft for LSCD.", ["limbal stem cell","amniotic membrane","ocular surface reconstruction","LSCD","stem cell transplant","conjunctival autograft","surface reconstruction"], "Specialized sub-agent."),
    ("limbal-stem-cell-deficiency", "Anterior Segment Disease", "Diagnose limbal stem cell deficiency: late staining, corneal conjunctivalization, vascularization. Classify total vs partial LSCD and manage.", ["LSCD","limbal stem cell deficiency","corneal conjunctivalization","stem cell deficiency","late staining","vascularization cornea"], "Specialized sub-agent."),
    ("anterior-segment-photography", "Instrumentation", "Perform anterior segment photography: slit-lamp photodocumentation of corneal lesions, lid abnormalities, and CL fitting using standardized lighting and magnification.", ["anterior segment photo","slit-lamp photo","corneal photo","lid photo","anterior photography","documentation photo","clinical photo"], "Specialized sub-agent."),
    ("corneal-hysteresis", "Instrumentation", "Interpret corneal hysteresis (Ocular Response Analyzer): biomechanical properties, relationship to glaucoma progression, and keratoconus detection.", ["corneal hysteresis","ORA","biomechanics","Ocular Response Analyzer","CH cornea","CRF","keratoconus biomechanics"], "Specialized sub-agent."),
    ("tear-meniscus-height", "Instrumentation", "Measure tear meniscus height using OCT or slit-lamp: correlate with Schirmer and TBUT for dry eye severity grading.", ["tear meniscus","meniscus height","tear meniscus OCT","TMH","dry eye meniscus","meniscus measurement"], "Specialized sub-agent."),
    ("contact-lens-telemedicine", "Teleoptometry", "Manage CL follow-up via telemedicine: video assessment of lens fit, symptom review, remote troubleshooting, and in-person triage.", ["CL telemedicine","remote CL follow-up","virtual CL check","telehealth CL","remote fitting","teleoptometry CL"], "Specialized sub-agent."),
    ("remote-refraction", "Teleoptometry", "Perform remote refraction using portable autorefractor data, patient-reported symptoms, and historical Rx. Determine if in-person visit is needed.", ["remote refraction","tele-refraction","virtual refraction","autorefractor remote","telehealth Rx","distance refraction"], "Specialized sub-agent."),
    ("tele-glaucoma-screening", "Teleoptometry", "Implement tele-glaucoma screening: remote IOP (home tonometry), optic disc photo review, and VF self-test for underserved populations.", ["tele-glaucoma","remote glaucoma screening","home tonometry","disc photo review","telehealth glaucoma","remote screening"], "Specialized sub-agent."),
    ("digital-visual-acuity", "Teleoptometry", "Administer visual acuity testing via digital platforms: validated tablet/smartphone VA apps, remote logMAR, and home monitoring.", ["digital VA","remote acuity","tablet VA","smartphone acuity","home vision test","digital screening"], "Specialized sub-agent."),
    ("teaching-clinic-management", "Practice Management", "Manage optometry teaching clinic: student preceptorship, competency assessment, grading rubrics, and clinical education program design.", ["teaching clinic","student clinic","preceptor","clinical education","competency assessment","optometry student","clinical teaching"], "Specialized sub-agent."),
    ("optometry-ethics", "Practice Management", "Navigate ethical dilemmas in optometry: scope of practice boundaries, informed consent, patient autonomy, conflicts of interest, and professional conduct.", ["optometry ethics","ethical dilemma","scope of practice","informed consent","professional conduct","conflict of interest","ethics committee"], "Specialized sub-agent."),
    ("vision-insurance-navigation", "Practice Management", "Navigate vision insurance: VSP, EyeMed, Davis Vision, Spectera. Maximize patient benefits and practice reimbursement.", ["vision insurance","VSP","EyeMed","Davis Vision","Spectera","insurance navigation","benefit maximization"], "Specialized sub-agent."),
    ("corneal-tattooing", "Anterior Segment Disease", "Understand corneal tattooing for cosmetic and therapeutic purposes: iris color restoration after trauma and aniridia management.", ["corneal tattoo","iris tattoo","cosmetic cornea","therapeutic tattoo","aniridia tattoo","corneal pigmentation"], "Specialized sub-agent."),
    ("ocular-prosthetics", "Anterior Segment Disease", "Manage patients with ocular prostheses: referral for custom prosthetic eye fitting, socket care, and prosthetic maintenance.", ["ocular prosthesis","artificial eye","prosthetic fitting","socket care","anophthalmic socket","custom prosthetic"], "Specialized sub-agent."),
    ("ptosis-evaluation", "Anterior Segment Disease", "Evaluate ptosis: margin reflex distance, levator function, phenylephrine test. Differentiate myogenic, aponeurotic, neurogenic, and mechanical causes.", ["ptosis","drooping eyelid","MRD","levator function","phenylephrine test","myogenic ptosis","aponeurotic ptosis"], "Specialized sub-agent."),
    ("contact-lens-ocular-surface-interaction", "Contact Lens", "Analyze CL-ocular surface interaction: hypoxia effects, inflammatory mediator release, and long-term ocular surface changes from CL wear.", ["CL ocular surface","hypoxia CL","inflammatory CL","ocular surface change","CL biomechanics","long-term CL effect"], "Specialized sub-agent."),
    ("spectacle-lens-trifocal", "Optical Dispensing", "Recommend trifocal and modern multifocal designs: digital surface technology, personalized free-form lenses, and corridor optimization.", ["trifocal","free-form","digital surface","personalized lens","modern multifocal","lens technology","free-form design"], "Specialized sub-agent."),
    ("ophthalmic-standards", "Practice Management", "Understand ophthalmic standards: ANSI Z80.1 (spectacle lenses), ISO 18369 (CL), and FDA regulatory categories for ophthalmic devices.", ["ANSI Z80","ISO 18369","FDA ophthalmic","lens standard","CL standard","ophthalmic standard","regulatory standard"], "Specialized sub-agent."),
    ("environmental-eye-health", "Public Health Optometry", "Assess environmental factors in eye health: UV exposure, air pollution, blue light from screens, and nutrition for ocular disease prevention.", ["environmental eye","UV protection","air pollution eye","blue light environment","nutrition eye","lifestyle eye","prevention"], "Specialized sub-agent."),
    ("community-eye-health", "Public Health Optometry", "Design community eye health programs: vision screening camps, school eye health, diabetic retinopathy screening, and outreach in underserved areas.", ["community eye health","vision camp","outreach","underserved","school eye health","community screening","public health eye"], "Specialized sub-agent."),
    ("diabetic-eye-screening-program", "Public Health Optometry", "Implement diabetic retinopathy screening: telemedicine-based screening, AI-assisted grading, and referral pathways in primary care and endocrinology settings.", ["DR screening program","diabetic screening","telemedicine DR","AI screening","primary care DR","referral pathway diabetes"], "Specialized sub-agent."),
    ("occupational-eye-safety", "Public Health Optometry", "Develop occupational eye safety programs: workplace hazard assessment, PPE requirements, OSHA compliance, and employer education.", ["occupational safety","eye PPE","OSHA eye","workplace hazard","industrial safety","eye protection program"], "Specialized sub-agent."),
    ("ophthalmic-epidemiology", "Public Health Optometry", "Apply epidemiological methods to eye disease: study design, prevalence/incidence calculation, risk factor analysis, and burden of disease assessment.", ["ophthalmic epidemiology","prevalence","incidence","risk factor","burden of disease","eye disease study","population health"], "Specialized sub-agent."),
    ("global-eye-health", "Public Health Optometry", "Understand global eye health initiatives: VISION 2020, IAPB, WHO eye care programs, and universal health coverage for eye care.", ["global eye health","VISION 2020","IAPB","WHO eye care","universal coverage","global blindness","eye care access"], "Specialized sub-agent."),
    ("visual-disability-impact", "Public Health Optometry", "Assess impact of visual disability: quality of life measures (NEI-VFQ), economic burden, falls risk, depression, and social isolation.", ["visual disability","NEI-VFQ","quality of life","economic burden","falls risk","depression vision","social isolation vision"], "Specialized sub-agent."),
    ("refractive-error-survey", "Public Health Optometry", "Design and conduct refractive error surveys: population-based study methodology, Rapid Assessment of Avoidable Blindness (RAAB), and data analysis.", ["refractive error survey","RAAB","population study","blindness survey","rapid assessment","eye survey methodology"], "Specialized sub-agent."),
    ("mobile-eye-clinic", "Public Health Optometry", "Operate mobile eye care clinics: portable equipment setup, community outreach, screening workflows, and referral pathways.", ["mobile clinic","portable eye clinic","community outreach","mobile eye care","screening workflow","outreach clinic"], "Specialized sub-agent."),
    ("ophthalmic-ai-ethics", "Technology", "Evaluate ethical considerations in ophthalmic AI: algorithmic bias, liability, informed consent for AI-assisted diagnosis, and data privacy.", ["AI ethics","algorithmic bias","AI liability","AI consent","data privacy eye","AI fairness","responsible AI ophthalmology"], "Specialized sub-agent."),
    ("augmented-reality-ophthalmology", "Technology", "Explore AR/VR applications in ophthalmology: surgical training, patient education, visual field simulation, and rehabilitation tools.", ["augmented reality","VR ophthalmology","AR training","surgical simulation","patient education VR","rehabilitation VR"], "Specialized sub-agent."),
    ("smart-contact-lens", "Technology", "Evaluate emerging smart contact lens technology: glucose monitoring, IOP sensing, drug delivery, and augmented reality display in CL.", ["smart CL","glucose CL","IOP sensing CL","electronic CL","sensor CL","drug delivery CL","augmented reality CL"], "Specialized sub-agent."),
    ("gene-therapy-ophthalmology", "Technology", "Understand gene therapy in ophthalmology: voretigene neparvovec (Luxturna) for RPE65, gene therapy trials for AMD, glaucoma, and inherited retinal diseases.", ["gene therapy","Luxturna","voretigene","RPE65","gene therapy AMD","inherited retinal gene therapy","AAV vector"], "Specialized sub-agent."),
    ("nanotechnology-ocular", "Technology", "Explore nanotechnology in ophthalmic drug delivery: nanoparticles, nanomicelles, liposomes, and dendrimers for targeted ocular therapy.", ["nanotechnology","nanoparticle eye","nanomicelle","liposome ocular","dendrimer","drug delivery nano","targeted therapy"], "Specialized sub-agent."),
    ("3d-printing-ophthalmology", "Technology", "Explore 3D printing in ophthalmology: custom CL, orbital implants, surgical models, and spectacles frame manufacturing.", ["3D printing","3D printed CL","3D orbital implant","surgical model 3D","3D frame","additive manufacturing eye"], "Specialized sub-agent."),
    ("wearable-eye-monitoring", "Technology", "Evaluate wearable devices for eye monitoring: smart glasses, eye tracking wearables, and continuous IOP/blink monitoring devices.", ["wearable eye","smart glasses","eye tracking wearable","continuous IOP","blink monitor","wearable ophthalmic","bio-sensor eye"], "Specialized sub-agent."),
    ("digital-twins-ophthalmology", "Technology", "Understand digital twin concept in ophthalmology: patient-specific eye modeling for surgical simulation and treatment planning.", ["digital twin","eye modeling","surgical simulation","patient model","virtual eye","computational eye","treatment planning AI"], "Specialized sub-agent."),
    ("blockchain-eye-records", "Technology", "Explore blockchain for ophthalmic records: secure longitudinal eye health data sharing, prescription verification, and research data integrity.", ["blockchain eye","eye record blockchain","secure record","prescription blockchain","data sharing","longitudinal record"], "Specialized sub-agent."),
    ("quantum-computing-ophthalmology", "Technology", "Explore quantum computing applications in ophthalmology: complex retinal modeling, drug discovery, and large-scale epidemiological analysis.", ["quantum computing","quantum ophthalmology","retinal modeling quantum","drug discovery quantum","epidemiology quantum"], "Specialized sub-agent."),
    ("robotic-ophthalmic-surgery", "Technology", "Understand robotic assistance in ophthalmic surgery: preceyes, ForSight, and robot-assisted vitreoretinal procedures.", ["robotic surgery","robot ophthalmology","preceyes","robot-assisted","vitreoretinal robot","surgical robot eye"], "Specialized sub-agent."),
    ("tele-ophthalmology-network", "Technology", "Build tele-ophthalmology network: store-and-forward imaging, live video consultation, AI-assisted triage, and rural-urban specialist connectivity.", ["tele-ophthalmology network","store forward","live consultation","AI triage","rural eye care","specialist connectivity"], "Specialized sub-agent."),
    ("optometry-app-development", "Technology", "Design mobile health apps for optometry: vision screening apps, symptom checkers, medication reminders, and CL tracking tools.", ["optometry app","mobile health","vision app","symptom checker","medication reminder","CL tracker","mHealth eye"], "Specialized sub-agent."),
    ("ophthalmic-big-data", "Technology", "Leverage big data in ophthalmology: electronic health record mining, population-level disease patterns, and predictive analytics for eye disease.", ["big data ophthalmology","EHR mining","predictive analytics","population eye data","disease pattern","machine learning data"], "Specialized sub-agent."),
    ("corneal-crosslinking", "Anterior Segment Disease", "Understand corneal cross-linking (CXL): indications for keratoconus progression, epithelium-off vs epithelium-on, UV-A/riboflavin protocol, and post-operative care.", ["CXL","corneal crosslinking","keratoconus CXL","UV-A riboflavin","epithelium off CXL","epithelium on CXL","corneal strengthening"], "Specialized sub-agent."),
    ("intraocular-lens-types", "Anterior Segment Disease", "Compare IOL types: monofocal, toric, multifocal (diffractive, refractive), extended depth of focus (EDOF), and accommodating IOLs.", ["IOL types","monofocal IOL","toric IOL","multifocal IOL","EDOF","accommodating IOL","IOL comparison"], "Specialized sub-agent."),
    ("cataract-surgery-co-management", "Anterior Segment Disease", "Co-manage cataract surgery: pre-operative biometry, IOL selection counseling, post-operative day-1, week-1, month-1 visits, and complication recognition.", ["cataract co-management","pre-op cataract","IOL selection","post-op cataract","cataract follow-up","surgical co-management"], "Specialized sub-agent."),
    ("intacs-corneal-inserts", "Anterior Segment Disease", "Evaluate Intacs intrastromal corneal ring segments for keratoconus and post-LASIK ectasia. Indications, sizing, and outcomes.", ["Intacs","corneal ring","intrastromal ring","keratoconus Intacs","post-LASIK ectasia","corneal insert","ICRS"], "Specialized sub-agent."),
    ("dsek-dmek-understanding", "Anterior Segment Disease", "Understand corneal endothelial transplant: DSEK and DMEK procedures, indications (Fuchs, pseudophakic bullous keratopathy), and post-op management.", ["DSEK","DMEK","endothelial transplant","corneal transplant","Fuchs transplant","pseudophakic bullous","Descemet membrane"], "Specialized sub-agent."),
    ("prosthetic-group-lens", "Optical Dispensing", "Design prosthetic group lenses: high-plus aphakic lenses, minification correction, and visual field restriction management for anophthalmic patients.", ["prosthetic lens","aphakic spectacle","high plus spectacle","anophthalmic lens","minification","field restriction"], "Specialized sub-agent."),
    ("spectacle-lens-impact-resistance", "Optical Dispensing", "Understand spectacle lens impact resistance: ANSI Z87.1, dress vs safety eyewear, and lens material impact ratings (polycarbonate, Trivex, glass).", ["impact resistance","Z87.1","safety lens","polycarbonate impact","Trivex","dress eyewear","lens safety"], "Specialized sub-agent."),
    ("ophthalmic-laser-safety", "Instrumentation", "Understand ophthalmic laser safety: laser classifications, protective eyewear, nominal hazard zones, and safety protocols for clinical laser use.", ["laser safety","protective eyewear laser","nominal hazard","laser classification","laser protocol","clinical laser safety"], "Specialized sub-agent."),
    ("tear-film-osmolarity-interp", "Instrumentation", "Interpret tear film osmolarity results: normal vs elevated, diurnal variation, and correlation with dry eye severity and treatment response.", ["osmolarity interpretation","tear osmolarity result","normal osmolarity","elevated osmolarity","dry eye correlation","osmolarity monitoring"], "Specialized sub-agent."),
]

# Generate files
count = 0
existing = set(os.listdir(BASE))
for name, cat, desc, triggers, role in SKILLS:
    filepath = os.path.join(BASE, f"{name}.md")
    if name not in existing:
        content = mk(name, cat, desc, triggers, role)
        with open(filepath, "w") as f:
            f.write(content)
        count += 1
    else:
        print(f"SKIP (exists): {name}")

print(f"Added {count} new skills")

# Final count
total = len(os.listdir(BASE))
print(f"Total SKILL.md files: {total}")

# Rebuild index
cats = {}
all_skills = []
for fname in sorted(os.listdir(BASE)):
    if fname.endswith(".md"):
        sname = fname.replace(".md", "")
        with open(os.path.join(BASE, fname)) as f:
            content = f.read()
        # Extract category
        cat = ""
        for line in content.split("\n"):
            if line.startswith("## Category"):
                cat = line.replace("## Category", "").strip()
            if line.startswith("## Description"):
                desc = line.replace("## Description", "").strip()
            if line.startswith("## Trigger Words"):
                triggers = line.replace("## Trigger Words", "").strip()
        cats[cat] = cats.get(cat, 0) + 1
        all_skills.append((sname, cat, desc, triggers))

index = "# Innovative Lab of Optometry — Master Skill Index\n\n"
index += f"**Total Skills: {total}** | **Parallel Agent Swarm Architecture** | **50 Sub-Agents, 3-Second Spawn Cycle**\n\n"
index += "## Agent Swarm Architecture\n\n"
index += "This skill repository powers a parallel agent swarm system where:\n"
index += "- **50 sub-agents** can be spawned simultaneously\n"
index += "- Each agent activates based on trigger word matching from incoming tasks\n"
index += "- **3-second spawn cycle** enables rapid parallel processing\n"
index += "- Skills are categorized for intelligent routing by the swarm orchestrator\n\n"
index += "## Categories\n\n"
for cat, ccount in sorted(cats.items()):
    index += f"### {cat} ({ccount} skills)\n\n"
    cat_skills = [(n, c, d, t) for n, c, d, t in all_skills if c == cat]
    for sname, _, desc, triggers in cat_skills:
        t_short = triggers[:80] + "..." if len(triggers) > 80 else triggers
        index += f"- **{sname}** — {desc[:120]}... `[{t_short}]`\n"
    index += "\n"

index_path = "/home/z/my-project/download/innovative-lab-of-optometry/SKILL_INDEX.md"
with open(index_path, "w") as f:
    f.write(index)
print(f"\nMaster index rebuilt at {index_path}")
print(f"\nFinal category distribution:")
for cat, ccount in sorted(cats.items()):
    print(f"  {cat}: {ccount}")