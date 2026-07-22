/* ══════════════════════════════════════════════
   FOCUS MAGAZINE — Interactive Scripts
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DARK MODE ──
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('focus-theme');
  if (savedTheme) html.setAttribute('data-theme', savedTheme);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');

  darkToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('focus-theme', next);
  });

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    navbar.classList.toggle('scrolled', current > 50);
    lastScroll = current;
  }, { passive: true });

  // ── SEARCH ──
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const articles = [
    { title: 'Integrating AI-Assisted OCT Analysis into Routine Optometric Practice', cat: 'Clinical Practice' },
    { title: 'Low-Dose Atropine 0.01%: 5-Year Outcomes from the LAMP Study Extension', cat: 'Myopia' },
    { title: 'Smart Contact Lenses: From Glucose Monitoring to IOP Sensing', cat: 'Technology' },
    { title: 'MIGS Evolution: Comparing iStent Inject, Hydrus, and Xen for Mild-to-Moderate POAG', cat: 'Glaucoma' },
    { title: 'Scleral Lens Fitting for Irregular Corneas: A Step-by-Step Clinical Guide', cat: 'Contact Lenses' },
    { title: 'Amblyopia Management in 2026: Beyond Patching — Binocular Dichoptic Treatment', cat: 'Pediatric' },
    { title: 'Post-Concussion Vision Syndrome: Assessment and Vision Therapy Protocols', cat: 'Neuro-Optometry' },
    { title: 'Lifitegrast vs Cyclosporine for Dry Eye: A Head-to-Head Comparative Analysis', cat: 'Pharmacology' },
    { title: 'Digital Accessibility for Low Vision Patients: Apps, Wearables, and Smart Glasses', cat: 'Low Vision' },
    { title: 'Building a Profitable Myopia Control Clinic: Revenue Models and Patient Flow', cat: 'Practice Management' },
    { title: 'Chemical Eye Injuries: Emergency Protocol and Visual Outcome Prediction', cat: 'Emergency' },
    { title: 'The Future of Optometric Practice: AI-Driven Diagnostics', cat: 'Clinical Practice' },
    { title: 'Orthokeratology for Myopia Control: 3-Year Retrospective Data', cat: 'Myopia Management' },
    { title: 'Anterior Segment OCT in Clinical Practice: A Practical Guide', cat: 'Instrumentation' },
    { title: 'Pediatric Vision Screening in Schools: Evidence and Implementation', cat: 'Pediatric' },
    { title: 'Glaucoma Medications: Mechanisms, Side Effects, and Clinical Decision-Making', cat: 'Pharmacology' },
    { title: 'Surgical Co-Management of Cataract: Pre-Op to Post-Op Protocol', cat: 'Clinical Practice' },
    { title: 'Binocular Vision Assessment: A Complete Clinical Workflow', cat: 'Binocular Vision' },
    { title: 'Keratoconus Detection: Topography, Pentacam, and AI-Based Screening', cat: 'Anterior Segment' },
    { title: 'Retinal Vein Occlusion: Current Management and Anti-VEGF Protocols', cat: 'Posterior Segment' },
  ];

  function openSearch() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 200);
  }
  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (!q) { searchResults.innerHTML = ''; return; }
    const matches = articles.filter(a => a.title.toLowerCase().includes(q) || a.cat.toLowerCase().includes(q));
    searchResults.innerHTML = matches.length
      ? matches.map(a => `<a href="#"><span style="opacity:0.4;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px">${a.cat}</span><br>${a.title}</a>`).join('')
      : '<p style="opacity:0.4;padding:16px">No articles found.</p>';
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ──
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString();
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => counterObserver.observe(el));

  // ── NEWSLETTER ──
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input');
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      input.disabled = true;
      // Show success message
      let success = form.parentElement.querySelector('.newsletter-success');
      if (!success) {
        success = document.createElement('div');
        success.className = 'newsletter-success';
        success.textContent = 'Welcome aboard! Check your inbox for a confirmation email.';
        form.parentElement.appendChild(success);
      }
      success.style.display = 'block';
    });
  }

  // ── TRENDING DUPLICATE FOR INFINITE SCROLL ──
  const trendScroll = document.getElementById('trendingScroll');
  if (trendScroll) {
    trendScroll.innerHTML += trendScroll.innerHTML;
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();