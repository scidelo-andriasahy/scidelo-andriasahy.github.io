var portfolioData = window.portfolioData;

let currentLang = 'fr';
let currentExpFilter = 'all';

const isSubDir = window.location.pathname.includes('/blog/');
function resolvePath(p) {
    if (!p) return '';
    if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('mailto:') || p.startsWith('tel:') || p.startsWith('#')) {
        return p;
    }
    return isSubDir ? `../${p}` : p;
}

function resolveEntityUrl(label) {
    if (!label || !portfolioData.entityLinks) return null;
    const dict = portfolioData.entityLinks;
    const clean = label.trim();
    if (dict[clean]) return resolvePath(dict[clean]);
    const lower = clean.toLowerCase();
    for (const [k, url] of Object.entries(dict)) {
        if (k.toLowerCase() === lower) return resolvePath(url);
    }
    for (const [k, url] of Object.entries(dict)) {
        if (k.length >= 4 && lower.includes(k.toLowerCase())) return resolvePath(url);
    }
    return null;
}

function renderClickableBadge(text, className = 'tag', extraStyle = '') {
    const url = resolveEntityUrl(text);
    if (url) {
        return `<a href="${url}" target="_blank" rel="noopener" class="${className} clickable-entity" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem; ${extraStyle}" title="${text} ↗" onclick="event.stopPropagation();">${text} <span style="font-size: 0.7em; opacity: 0.7;">↗</span></a>`;
    }
    return `<span class="${className}" style="${extraStyle}">${text}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    renderContent();
    setupFilters();
    setupExperienceFilters();
    setupBackToTop();
    setupMobileMenu();
    setupKeyboardShortcuts();
    initHeroCanvas();
    checkUrlDeepLink();
});

// Featherweight PCB Circuit Grid + Cyan Traces + Subtle Signal Wave (< 50 lines Vanilla JS, Hero-only)
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, t = 0;

    const traces = [
        [{ x: 0.04, y: 0.22 }, { x: 0.22, y: 0.22 }, { x: 0.27, y: 0.34 }, { x: 0.48, y: 0.34 }],
        [{ x: 0.96, y: 0.18 }, { x: 0.78, y: 0.18 }, { x: 0.72, y: 0.32 }, { x: 0.56, y: 0.32 }],
        [{ x: 0.12, y: 0.76 }, { x: 0.36, y: 0.76 }, { x: 0.42, y: 0.64 }, { x: 0.68, y: 0.64 }]
    ];

    function resize() {
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, w, h);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(148, 163, 184, 0.05)' : 'rgba(15, 23, 42, 0.045)';
        const traceBase = isDark ? 'rgba(56, 189, 248, 0.11)' : 'rgba(2, 132, 199, 0.1)';
        const pulseColor = isDark ? 'rgba(56, 189, 248, 0.65)' : 'rgba(2, 132, 199, 0.55)';

        // 1. Millimeter PCB Grid (opacity ~0.05)
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < w; x += 36) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for (let y = 0; y < h; y += 36) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();

        // 2. Three PCB Routing Traces + Slow Glowing Signal Pulses
        traces.forEach((pts, i) => {
            ctx.strokeStyle = traceBase;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x * w, p.y * h) : ctx.lineTo(p.x * w, p.y * h));
            ctx.stroke();
            pts.forEach(p => {
                ctx.fillStyle = traceBase;
                ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 2.5, 0, Math.PI * 2); ctx.fill();
            });
            const prog = ((t * 0.0022) + i * 0.33) % 1;
            const seg = Math.min(pts.length - 2, Math.floor(prog * (pts.length - 1)));
            const local = (prog * (pts.length - 1)) - seg;
            const px = (pts[seg].x + (pts[seg + 1].x - pts[seg].x) * local) * w;
            const py = (pts[seg].y + (pts[seg + 1].y - pts[seg].y) * local) * h;
            ctx.fillStyle = pulseColor;
            ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
        });

        // 3. Subtle Sinusoidal Signal Wave near bottom of Hero (opacity ~0.08)
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
            const y = h * 0.84 + Math.sin(x * 0.008 + t * 0.015) * 14;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        t++;
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}

function checkUrlDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('post');
    const projectId = params.get('project');
    if (postSlug) {
        setTimeout(() => window.openBlogPost(postSlug), 120);
    } else if (projectId) {
        setTimeout(() => window.openProject(Number(projectId)), 120);
    }
}

function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
}

function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const storageKey = 'theme-preference';
    let theme = localStorage.getItem(storageKey) || 'dark';

    const reflectPreference = () => {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = theme === 'light'
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        if (themeToggle) {
            themeToggle.innerHTML = icon;
            themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        }
    };

    reflectPreference();
    themeToggle?.addEventListener('click', () => {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem(storageKey, theme);
        reflectPreference();
    });
}

function initLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    const storageKey = 'language-preference';
    currentLang = localStorage.getItem(storageKey) || 'fr';
    updateLangUI();

    langToggle?.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem(storageKey, currentLang);
        updateLangUI();
        renderContent();
        setupFilters();
        setupExperienceFilters();
    });
}

function updateLangUI() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    document.documentElement.lang = currentLang;

    const nav = portfolioData[currentLang].nav;
    const setNav = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };
    setNav('nav-about', nav.about);
    setNav('nav-skills', nav.skills);
    setNav('nav-projects', nav.projects);
    setNav('nav-blog', nav.blog);
    setNav('nav-experience', nav.experience);
    setNav('nav-cv', nav.cv);
    setNav('nav-certificates', nav.certificates);

    const backLink = document.getElementById('back-to-portfolio-link');
    if (backLink) {
        backLink.innerHTML = currentLang === 'fr' ? '&larr; Retour au Portfolio Principal' : '&larr; Back to Main Portfolio';
    }
}

function getSkillIcon(iconName) {
    const icons = {
        cpu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
        code: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        activity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        sliders: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>'
    };
    return icons[iconName] || icons.cpu;
}

function renderContent() {
    const data = portfolioData[currentLang];
    const ui = data.ui;

    // Section Titles
    document.querySelectorAll('.section-title').forEach(el => {
        const pid = el.parentElement.id;
        if (pid === 'about') el.textContent = data.about.title;
        if (pid === 'skills' && data.skills) el.textContent = data.skills.title;
        if (pid === 'projects') el.textContent = data.projects.title;
        if (pid === 'blog' && data.blog) el.textContent = data.blog.title;
        if (pid === 'experience') el.textContent = data.experience.title;
        if (pid === 'cv') el.textContent = data.education.title;
        if (pid === 'certificates') el.textContent = data.certificates.title;
    });

    // Hero (Clean CTA Hierarchy: 1 Primary CTA + 1 Secondary CTA + Minimalist Social Icons)
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        const linkedinUrl = data.identity.contacts.linkedin;
        const githubUrl = data.identity.contacts.github;
        const youtubeUrl = data.identity.contacts.youtube;
        const cvPdfUrl = resolvePath(data.identity.cvPdf);
        const blogUrl = isSubDir ? 'index.html' : 'blog/index.html';

        heroContent.innerHTML = `
            <div>
                <div class="availability-pill">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
                    ${data.identity.availabilityBadge}
                </div>
                <h1>${data.identity.name}</h1>
                <p class="tagline">${data.identity.title}</p>
                <p class="hero-meta">📍 ${data.identity.location} • ${data.identity.institution}</p>
                <div class="hero-domains">
                    ${data.identity.specialties.slice(0, 3).map(s => `<span class="domain-chip">${s}</span>`).join('')}
                </div>
                <div class="hero-cta-row">
                    <a href="${cvPdfUrl}" class="btn" download>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        ${ui.primaryCta}
                    </a>
                    <a href="#projects" class="btn btn-outline">${ui.secondaryCta}</a>
                    <a href="mailto:${data.identity.contacts.email}" class="highlight-link" style="font-size: 0.94rem; margin-left: 0.25rem;">${ui.contactCta} &rarr;</a>
                </div>
                <div class="hero-socials">
                    <a href="${linkedinUrl}" target="_blank" rel="noopener" class="social-icon-btn" title="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                    <a href="${githubUrl}" target="_blank" rel="noopener" class="social-icon-btn" title="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </a>
                    <a href="${youtubeUrl}" target="_blank" rel="noopener" class="social-icon-btn" title="YouTube (@ScideloEngineering)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </a>
                    <a href="${blogUrl}" class="social-icon-btn" title="${ui.openBlogPortal}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    </a>
                    <a href="mailto:${data.identity.contacts.email}" class="social-icon-btn" title="${data.identity.contacts.email}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </a>
                </div>
            </div>
        `;
    }

    // Hero Portrait (Studio Dark)
    const heroImage = document.querySelector('#hero-image img');
    if (heroImage) {
        heroImage.src = resolvePath(data.identity.image);
    }

    // About
    const aboutText = document.getElementById('about-text');
    if (aboutText) {
        const langTitle = currentLang === 'fr' ? 'Langues' : 'Languages';
        const interestTitle = currentLang === 'fr' ? 'Centres d’intérêt' : 'Interests';
        aboutText.innerHTML = `
            <div class="about-grid">
                <div>
                    <p style="font-size: 1.08rem; color: var(--text-color); margin-bottom: 1.5rem; line-height: 1.82;">${data.about.text}</p>
                    ${data.about.pfeHighlight ? `
                        <div class="pfe-callout">
                            <strong>${currentLang === 'fr' ? 'Objectif PFE (Janvier 2027)' : 'PFE Internship Goal (January 2027)'} :</strong> ${data.about.pfeHighlight}
                        </div>
                    ` : ''}
                </div>
                <div class="about-side-card">
                    <h4 style="font-size: 1rem; margin-bottom: 0.85rem; color: var(--accent-cyan); font-family: 'Inter', sans-serif;">${langTitle}</h4>
                    <ul style="list-style: none; margin-bottom: 1.4rem;">
                        ${data.about.languages.map(l => `
                            <li style="display: flex; justify-content: space-between; padding: 0.38rem 0; border-bottom: 1px solid var(--border-color); font-size: 0.9rem;">
                                <strong>${l.lang}</strong>
                                <span style="color: var(--text-muted);">${l.level}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <h4 style="font-size: 1rem; margin-bottom: 0.7rem; color: var(--accent-cyan); font-family: 'Inter', sans-serif;">${interestTitle}</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
                        ${data.about.interests.map(i => `<span class="tag">${i}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && data.skills) {
        skillsGrid.innerHTML = data.skills.categories.map(cat => `
            <div class="skill-card">
                <div class="skill-card-header">
                    <div class="skill-icon">${getSkillIcon(cat.icon)}</div>
                    <h3>${cat.title}</h3>
                </div>
                <div class="skill-tags">
                    ${cat.items.map(item => renderClickableBadge(item, 'skill-pill')).join('')}
                </div>
            </div>
        `).join('');
    }

    filterProjects('all');
    renderBlogSection();
    filterExperiences(currentExpFilter);

    // Education & Bilingual CV Links (FR PDF/TEX vs EN PDF/TEX)
    const educationTimeline = document.getElementById('education-timeline');
    if (educationTimeline) {
        educationTimeline.innerHTML = data.education.items.map(e => `
            <div class="timeline-item">
                <div class="timeline-date">${e.period}</div>
                <h3>${e.degree}</h3>
                <p style="color: var(--text-muted); font-weight: 600; font-size: 1rem; margin-top: 0.25rem;">${e.institution}</p>
                ${e.details ? `<p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.95rem;">${e.details}</p>` : ''}
            </div>
        `).join('');

        const cvPdfPath = resolvePath(data.identity.cvPdf);
        const cvTexPath = resolvePath(data.identity.cvTex);
        const dlBtn = document.getElementById('download-cv-btn');
        const viewBtn = document.getElementById('view-cv-btn');
        const texBtn = document.getElementById('download-tex-btn');
        if (dlBtn) { dlBtn.textContent = data.education.downloadCV; dlBtn.href = cvPdfPath; }
        if (viewBtn) { viewBtn.textContent = ui.viewCvLabel; viewBtn.href = cvPdfPath; }
        if (texBtn) { texBtn.textContent = ui.texCvLabel; texBtn.href = cvTexPath; }
    }

    // Certificates
    const certificatesContent = document.getElementById('certificates-content');
    if (certificatesContent && data.certificates.sections) {
        certificatesContent.innerHTML = data.certificates.sections.map(section => `
            <div class="certificate-section" style="margin-bottom: 4rem;">
                <h3 style="font-size: 1.55rem; margin-bottom: 0.7rem; color: var(--accent-cyan);">${section.title}</h3>
                <p style="font-size: 0.98rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 820px;">${section.description}</p>
                <div class="grid">
                    ${section.items.map(c => renderCertificateCard(c)).join('')}
                </div>
            </div>
        `).join('');
    }

    // Dynamic Bilingual Footer (Clean & Private — no exposed automation details)
    const footer = document.getElementById('site-footer');
    if (footer) {
        const blogHref = isSubDir ? 'index.html' : 'blog/index.html';
        const rssHref = resolvePath('feed.xml');
        const adminHref = resolvePath('admin.html');
        footer.innerHTML = `
            <p style="font-weight: 600; color: var(--text-color); margin-bottom: 0.5rem;">Tsikomia Scidelo ANDRIASAHY — ${ui.footerRole}</p>
            <p style="margin-bottom: 1rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; align-items: center;">
                <span>📍 ${data.identity.location}</span> •
                <a href="mailto:${data.identity.contacts.email}" class="highlight-link">${data.identity.contacts.email}</a> •
                <a href="${data.identity.contacts.linkedin}" target="_blank" rel="noopener" class="highlight-link">LinkedIn</a> •
                <a href="${data.identity.contacts.github}" target="_blank" rel="noopener" class="highlight-link">GitHub</a> •
                <a href="${data.identity.contacts.youtube}" target="_blank" rel="noopener" class="highlight-link">YouTube</a> •
                <a href="${blogHref}" class="highlight-link">${data.nav.blog}</a> •
                <a href="${rssHref}" target="_blank" rel="noopener" class="highlight-link">${ui.rssLabel}</a>
            </p>
            <p style="font-size: 0.82rem; opacity: 0.72;">&copy; 2026 Tsikomia Scidelo ANDRIASAHY. ${ui.footerRights} • <a href="${adminHref}" style="color: var(--text-muted); text-decoration: none;">🔒 ${ui.footerStudio}</a></p>
        `;
    }
}

// Streamlined R&D Technical Notes & Open Science Section (Zero Marketing/Blogging Clutter)
function renderBlogSection() {
    const data = portfolioData[currentLang];
    const ui = data.ui;
    const blogIntro = document.getElementById('blog-intro');
    const blogGrid = document.getElementById('blog-grid');
    if (!data.blog) return;

    if (blogIntro) {
        const blogPortalHref = isSubDir ? 'index.html' : 'blog/index.html';
        const rssHref = resolvePath('feed.xml');
        const ytUrl = data.identity.contacts.youtube;
        blogIntro.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1.25rem; flex-wrap: wrap; margin-bottom: 2.25rem;">
                <p style="color: var(--text-muted); font-size: 1rem; max-width: 720px; line-height: 1.65;">${data.blog.subtitle}</p>
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                    ${!isSubDir ? `<a href="${blogPortalHref}" class="btn btn-outline" style="padding: 0.5rem 1.1rem; font-size: 0.84rem;">${ui.openBlogPortal} ↗</a>` : ''}
                    <a href="${ytUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="padding: 0.5rem 1.1rem; font-size: 0.84rem;">▶ YouTube R&amp;D</a>
                    <a href="${rssHref}" target="_blank" rel="noopener" class="btn btn-outline" style="padding: 0.5rem 1.1rem; font-size: 0.84rem;">RSS</a>
                </div>
            </div>
        `;
    }

    if (blogGrid && data.blog.items) {
        blogGrid.innerHTML = data.blog.items.map(post => {
            const hasVideo = Boolean(post.video && post.video.trim() !== '');
            const hasPdf = Boolean(post.pdfUrl && post.pdfUrl.trim() !== '');
            return `
                <div class="card" onclick="openBlogPost('${post.slug}')">
                    <div style="height: 205px; background: #0B1120; overflow: hidden; position: relative;">
                        <img src="${resolvePath(post.coverImage)}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.92; transition: var(--transition);">
                        <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; display: flex; justify-content: space-between; align-items: center; gap: 0.4rem; pointer-events: none;">
                            <span style="background: rgba(11, 17, 32, 0.85); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px;">${post.category}</span>
                            <div style="display: flex; gap: 0.35rem;">
                                ${hasVideo ? `<span style="background: rgba(239, 68, 68, 0.9); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;">▶ ${currentLang === 'fr' ? 'Vidéo' : 'Video'}</span>` : ''}
                                ${hasPdf ? `<span style="background: rgba(2, 132, 199, 0.9); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;">PDF</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="card-content" style="display: flex; flex-direction: column; flex: 1;">
                        <div style="font-size: 0.78rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.4rem;">${post.date} • ${post.readTime} • ${post.doi}</div>
                        <h3 class="card-title" style="font-size: 1.18rem;">${post.title}</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55;">${post.summary}</p>
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: auto; margin-bottom: 0.9rem;">
                            ${(post.tags || []).slice(0, 3).map(t => renderClickableBadge(t, 'tag')).join('')}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">${ui.readArticle} &rarr;</span>
                            ${hasPdf ? `<a href="${resolvePath(post.pdfUrl)}" target="_blank" rel="noopener" class="highlight-link" style="font-size: 0.8rem;" onclick="event.stopPropagation();">PDF ↗</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.openBlogPost = (slug) => {
    const data = portfolioData[currentLang];
    if (!data.blog || !data.blog.items) return;
    const post = data.blog.items.find(b => b.slug === slug || b.id === slug);
    if (!post) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    const hasPdf = Boolean(post.pdfUrl && post.pdfUrl.trim() !== '');
    const isFr = currentLang === 'fr';

    modalBody.innerHTML = `
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 0.84rem; color: var(--accent-cyan); font-weight: 700;">${post.category} • ${post.date} • ${post.readTime}</span>
                <span class="tag">${post.doi}</span>
            </div>
            <h1 style="font-size: clamp(1.6rem, 3.3vw, 2.35rem); margin-bottom: 1.2rem; line-height: 1.25;">${post.title}</h1>
            <div style="display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
                ${(post.tags || []).map(t => renderClickableBadge(t, 'tag')).join('')}
            </div>
            <div style="margin-bottom: 2rem; border-radius: 16px; overflow: hidden; background: #0B1120;">
                <img src="${resolvePath(post.coverImage)}" alt="${post.title}" style="width: 100%; max-height: 460px; object-fit: contain; display: block; margin: 0 auto;">
            </div>
            ${renderVideoEmbed(post.video)}
            <div class="project-details-content" style="font-size: 1.04rem; line-height: 1.82;">
                ${formatMarkdown(post.content)}
            </div>
            <div style="margin-top: 2.25rem; display: flex; gap: 0.85rem; flex-wrap: wrap;">
                ${hasPdf ? `<a href="${resolvePath(post.pdfUrl)}" class="btn" target="_blank" rel="noopener">${isFr ? 'Télécharger le Rapport Technique (PDF)' : 'Download Full Technical Report (PDF)'}</a>` : ''}
                <a href="${resolvePath('feed.xml')}" target="_blank" rel="noopener" class="btn btn-outline">RSS</a>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function renderCertificateCard(c) {
    const images = (c.images || (c.image ? [c.image] : [])).map(resolvePath);
    const links = (c.links || (c.link ? [c.link] : [])).map(resolvePath);
    const hasImages = images.length > 0;
    const hasMultipleImages = images.length > 1;
    const isFr = currentLang === 'fr';
    const btnText = isFr ? 'Voir le certificat PDF' : 'View Certificate PDF';

    let galleryHtml = '';
    let pdfBtnHtml = '';

    if (hasMultipleImages) {
        const labels = c.linkLabels || links.map((_, i) => `Document ${i + 1} (PDF)`);
        galleryHtml = `
            <div class="cert-gallery" style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; height: 100%; width: 100%; scrollbar-width: none;">
                ${images.map((imgUrl, i) => `
                    <div style="flex: 0 0 100%; scroll-snap-align: start; position: relative; height: 100%;">
                        <img src="${imgUrl}" alt="${c.title} - ${i + 1}" data-pdf="${links[i] || ''}" style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;">
                    </div>
                `).join('')}
            </div>
            <div style="position: absolute; top: 10px; right: 10px; z-index: 10; pointer-events: none; background: rgba(11,17,32,0.75); padding: 0.2rem 0.6rem; border-radius: 50px; color: white; font-size: 0.72rem;">
                1/${images.length} &harr;
            </div>
        `;
        pdfBtnHtml = links.map((lnk, idx) =>
            `<a href="${lnk}" target="_blank" rel="noopener" class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;">${labels[idx] || `PDF ${idx + 1}`}</a>`
        ).join('');
    } else if (hasImages) {
        const linkStr = links[0] || '';
        galleryHtml = `<img src="${images[0]}" alt="${c.title}" data-pdf="${linkStr}" style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;">`;
        pdfBtnHtml = linkStr ? `<a href="${linkStr}" target="_blank" rel="noopener" class="btn btn-outline" style="padding: 0.42rem 0.95rem; font-size: 0.8rem;">${btnText}</a>` : '';
    } else {
        galleryHtml = `
            <div style="height: 100%; width: 100%; background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(37,99,235,0.14)); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>
        `;
    }

    if (c.verifyUrl) {
        pdfBtnHtml += `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;">${isFr ? 'Vérifier ↗' : 'Verify ↗'}</a>`;
    }

    return `
        <div class="card" style="cursor: default; display: flex; flex-direction: column;">
            <div style="height: ${hasImages ? '210px' : '120px'}; background: #0B1120; overflow: hidden; position: relative;">
                ${galleryHtml}
            </div>
            <div class="card-content" style="display: flex; flex-direction: column; flex: 1;">
                <h4 class="card-title" style="font-size: 1.18rem;">${c.title}</h4>
                <p style="font-size: 0.86rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.65rem;">${c.issuer} • ${c.date}</p>
                ${c.description ? `<p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.15rem;">${c.description}</p>` : ''}
                ${pdfBtnHtml ? `<div style="display: flex; gap: 0.45rem; flex-wrap: wrap; margin-top: auto;">${pdfBtnHtml}</div>` : ''}
            </div>
        </div>
    `;
}

function setupFilters() {
    const data = portfolioData[currentLang];
    const filterBar = document.getElementById('category-filters');
    if (!filterBar) return;

    const categoryMap = new Map();
    data.projects.items.forEach(p => {
        const key = p.category.trim().toLowerCase();
        if (!categoryMap.has(key)) categoryMap.set(key, p.category.trim());
    });

    const buttons = [
        { key: 'all', label: data.projects.filterAll },
        ...Array.from(categoryMap.entries()).map(([key, label]) => ({ key, label }))
    ];

    filterBar.innerHTML = buttons.map(b => `
        <button class="filter-btn ${b.key === 'all' ? 'active' : ''}" data-category="${b.key}">${b.label}</button>
    `).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
            filterProjects(btn.dataset.category);
        });
    });
}

// Project Cards: Strictly Limited to 3 Key Differentiating Tags per Card (Full tags shown inside Modal!)
function filterProjects(category) {
    const data = portfolioData[currentLang];
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const filtered = category === 'all'
        ? data.projects.items
        : data.projects.items.filter(p => p.category.trim().toLowerCase() === category);

    const isFr = currentLang === 'fr';
    projectsGrid.innerHTML = filtered.map(p => {
        const hasVideo = Boolean((p.video && p.video.trim() !== '') || (p.videos && p.videos.length > 0));
        const pdfCount = (p.extraPdfs && p.extraPdfs.length) ? p.extraPdfs.length : (p.links && p.links.report ? 1 : 0);
        const topTags = (p.tags || []).slice(0, 3);
        const extraCount = Math.max(0, (p.tags || []).length - 3);
        return `
            <div class="card" onclick="openProject(${p.id})">
                <div style="height: 215px; background: #0B1120; overflow: hidden; position: relative;">
                    <img src="${resolvePath(p.image)}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.92; transition: var(--transition);">
                    <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; display: flex; justify-content: space-between; align-items: center; gap: 0.45rem; pointer-events: none;">
                        <span style="background: rgba(11, 17, 32, 0.85); color: #f8fafc; border: 1px solid rgba(255,255,255,0.14); font-size: 0.73rem; font-weight: 700; padding: 0.22rem 0.65rem; border-radius: 6px;">${p.category}</span>
                        <div style="display: flex; gap: 0.35rem;">
                            ${hasVideo ? `<span style="background: rgba(239, 68, 68, 0.9); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.22rem 0.55rem; border-radius: 6px;">▶ ${isFr ? 'Vidéo' : 'Video'}</span>` : ''}
                            ${pdfCount > 0 ? `<span style="background: rgba(2, 132, 199, 0.9); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.22rem 0.55rem; border-radius: 6px;">${pdfCount > 1 ? pdfCount + ' PDFs' : 'PDF'}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-content" style="display: flex; flex-direction: column; flex: 1;">
                    <h3 class="card-title">${p.title}</h3>
                    <p style="font-size: 0.91rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55;">${p.description}</p>
                    <div class="card-tags" style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: auto; align-items: center;">
                        ${topTags.map(t => renderClickableBadge(t, 'tag')).join('')}
                        ${extraCount > 0 ? `<span style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">+${extraCount}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function setupExperienceFilters() {
    const data = portfolioData[currentLang];
    const expFilterBar = document.getElementById('experience-filters');
    if (!expFilterBar) return;

    const filters = [
        { key: 'all', label: data.experience.filterAll },
        { key: 'pro', label: data.experience.filterPro },
        { key: 'assoc', label: data.experience.filterAssoc }
    ];

    expFilterBar.innerHTML = filters.map(f => `
        <button class="filter-btn ${f.key === currentExpFilter ? 'active' : ''}" data-exp-type="${f.key}">${f.label}</button>
    `).join('');

    expFilterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            expFilterBar.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
            currentExpFilter = btn.dataset.expType;
            filterExperiences(currentExpFilter);
        });
    });
}

function filterExperiences(type) {
    const data = portfolioData[currentLang];
    const experienceTimeline = document.getElementById('experience-timeline');
    if (!experienceTimeline) return;

    const filtered = type === 'all'
        ? data.experience.items
        : data.experience.items.filter(e => (e.type || 'pro') === type);

    experienceTimeline.innerHTML = filtered.map(e => {
        const orgHtml = e.organizationUrl
            ? `<a href="${e.organizationUrl}" target="_blank" rel="noopener" class="highlight-link">${e.organization} ↗</a>`
            : e.organization;
        const locationStr = e.location ? ` • <span style="font-weight: 400; color: var(--text-muted);">${e.location}</span>` : '';
        const bulletsHtml = e.bullets && e.bullets.length
            ? `<ul style="margin-left: 1.15rem; margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.55;">
                ${e.bullets.map(b => `<li style="margin-bottom: 0.4rem;">${b}</li>`).join('')}
               </ul>`
            : '';

        const tagsHtml = e.tags && e.tags.length
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 0.4rem;">
                ${e.tags.slice(0, 3).map(t => renderClickableBadge(t, 'tag')).join('')}
               </div>`
            : '';

        const proofsHtml = e.proofs && e.proofs.length
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.9rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                ${e.proofs.map(pr => `<a href="${resolvePath(pr.url)}" target="_blank" rel="noopener" class="highlight-link" style="font-size: 0.82rem;">📄 ${pr.label} ↗</a>`).join('')}
               </div>`
            : '';

        return `
            <div class="card" style="cursor: default;">
                <div class="card-content" style="display: flex; flex-direction: column; height: 100%; padding: 1.75rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;">${e.period}</span>
                        <span class="tag">${e.type === 'assoc' ? 'Leadership' : 'R&D / Pro'}</span>
                    </div>
                    <h3 style="font-size: 1.18rem; margin-bottom: 0.35rem;">${e.role}</h3>
                    <p style="color: var(--text-color); font-weight: 600; font-size: 0.92rem; margin-bottom: 0.9rem;">${orgHtml}${locationStr}</p>
                    ${bulletsHtml}
                    ${tagsHtml}
                    ${proofsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function renderVideoEmbed(videoUrl, customTitle = '') {
    if (!videoUrl || !videoUrl.trim()) return '';
    const trimmed = resolvePath(videoUrl.trim());
    const heading = customTitle || (currentLang === 'fr' ? 'Démonstration Vidéo' : 'Video Demonstration');

    const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
        return `
            <div style="margin: 2rem 0;">
                <h4 style="margin-bottom: 0.8rem; font-size: 1.15rem; color: var(--accent-cyan);">▶ ${heading}</h4>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px; background: #000;">
                    <iframe src="https://www.youtube.com/embed/${ytMatch[1]}" title="YouTube video player" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                </div>
            </div>
        `;
    }

    const mime = trimmed.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4';
    return `
        <div style="margin: 2rem 0;">
            <h4 style="margin-bottom: 0.8rem; font-size: 1.15rem; color: var(--accent-cyan);">▶ ${heading}</h4>
            <video controls preload="metadata" style="width: 100%; max-height: 500px; border-radius: 16px; background: #000;">
                <source src="${trimmed}" type="${mime}">
            </video>
        </div>
    `;
}

// Detailed Project Modal (Shows Full Technologies, Bilingual Gallery Captions, Videos & PDFs)
window.openProject = (id) => {
    const data = portfolioData[currentLang];
    const p = data.projects.items.find(proj => proj.id === id);
    if (!p) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const isFr = currentLang === 'fr';

    const galleryHtml = p.gallery && p.gallery.length
        ? `
            <h3 style="margin: 2.25rem 0 1rem; font-size: 1.45rem; color: var(--accent-cyan);">${isFr ? 'Galerie Technique, Schémas & Courbes (Cliquez pour agrandir)' : 'Technical Gallery, Schematics & Plots (Click to zoom)'}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); gap: 16px; margin: 1.25rem 0;">
                ${p.gallery.map(item => {
                    const src = resolvePath(typeof item === 'string' ? item : item.src);
                    const cap = typeof item === 'string' ? p.title : (item.caption || p.title);
                    return `
                        <figure class="gallery-figure">
                            <img src="${src}" alt="${cap}">
                            <figcaption class="gallery-caption">${cap}</figcaption>
                        </figure>
                    `;
                }).join('')}
            </div>
        `
        : '';

    const codeHtml = p.codeSnippet && p.codeSnippet.code
        ? `
            <h3 style="margin: 2.25rem 0 0.85rem; font-size: 1.45rem; color: var(--accent-cyan);">${p.codeSnippet.title}</h3>
            <pre style="background: #060a14; color: #a5f3fc; padding: 1.5rem; border-radius: 14px; overflow-x: auto; margin: 1rem 0; font-family: 'Fira Code', monospace; font-size: 0.86rem; border: 1px solid var(--border-color);"><code>${escapeHtml(p.codeSnippet.code)}</code></pre>
        `
        : '';

    const videosList = (p.videos && p.videos.length)
        ? p.videos.map(v => renderVideoEmbed(v.url, v.title)).join('')
        : renderVideoEmbed(p.video);

    const hasValidGithub = p.links && p.links.github && p.links.github !== '#' && p.links.github.trim() !== '';
    const extraPdfsHtml = (p.extraPdfs && p.extraPdfs.length)
        ? p.extraPdfs.map(pdf => `<a href="${resolvePath(pdf.url)}" class="btn btn-outline" style="padding: 0.5rem 1.05rem; font-size: 0.84rem;" target="_blank" rel="noopener">📄 ${pdf.label} ↗</a>`).join('')
        : (p.links && p.links.report ? `<a href="${resolvePath(p.links.report)}" class="btn btn-outline" style="padding: 0.5rem 1.05rem; font-size: 0.84rem;" target="_blank" rel="noopener">📄 ${data.actions.report} ↗</a>` : '');

    modalBody.innerHTML = `
        <div>
            <span style="font-size: 0.84rem; color: var(--accent-cyan); font-weight: 700; display: block; margin-bottom: 0.5rem;">${p.category}</span>
            <h1 style="font-size: clamp(1.65rem, 3.6vw, 2.45rem); margin-bottom: 1.15rem;">${p.title}</h1>
            <div style="margin-bottom: 1.75rem; display: flex; gap: 0.45rem; flex-wrap: wrap;">
                ${p.tags.map(t => renderClickableBadge(t, 'tag')).join('')}
            </div>
            <div style="margin-bottom: 1.75rem; border-radius: 16px; overflow: hidden; background: #0B1120;">
                <img src="${resolvePath(p.image)}" alt="${p.title}" style="width: 100%; max-height: 480px; object-fit: contain; display: block; margin: 0 auto;">
            </div>
            ${extraPdfsHtml ? `
                <div style="margin-bottom: 1.75rem; padding: 1.15rem; border-radius: 14px; background: rgba(56,189,248,0.06); border: 1px solid var(--border-color);">
                    <h4 style="margin-bottom: 0.75rem; color: var(--accent-cyan); font-size: 0.95rem; font-family: 'Inter', sans-serif;">${isFr ? 'Rapports Techniques, Schémas KiCad & Documents PDF :' : 'Technical Reports, KiCad Schematics & PDF Files:'}</h4>
                    <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                        ${extraPdfsHtml}
                        ${hasValidGithub ? `<a href="${p.links.github}" class="btn btn-outline" style="padding: 0.5rem 1.05rem; font-size: 0.84rem;" target="_blank" rel="noopener">${data.actions.github} ↗</a>` : ''}
                    </div>
                </div>
            ` : ''}
            ${videosList}
            <div class="project-details-content" style="font-size: 1.03rem; line-height: 1.8;">
                ${formatMarkdown(p.details)}
                ${galleryHtml}
                ${codeHtml}
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const closeModal = () => {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.querySelectorAll('video').forEach(v => v.pause());
    }
};

document.getElementById('close-modal')?.addEventListener('click', closeModal);
document.getElementById('modal-scroll-area')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-scroll-area') closeModal();
});

function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/### (.*)/g, '<h3 style="margin: 2rem 0 0.85rem; font-size: 1.4rem; color: var(--accent-cyan);">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background: rgba(56,189,248,0.12); color: var(--accent-cyan); padding: 0.12rem 0.42rem; border-radius: 5px; font-family: \'Fira Code\', monospace; font-size: 0.88em;">$1</code>')
        .replace(/\n- (.*)/g, '<li style="margin-left: 1.4rem; margin-bottom: 0.45rem;">$1</li>')
        .replace(/\n\n/g, '<br><br>');
}

// Lightbox
let lightboxImages = [];
let lightboxCurrentIndex = 0;

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && (e.target.closest('.project-details-content') || e.target.closest('.cert-gallery') || e.target.closest('.hero-image'))) {
        const gallery = e.target.closest('.cert-gallery') || e.target.closest('.project-details-content');
        if (gallery) {
            lightboxImages = Array.from(gallery.querySelectorAll('img'));
            lightboxCurrentIndex = lightboxImages.indexOf(e.target);
        } else {
            lightboxImages = [e.target];
            lightboxCurrentIndex = 0;
        }
        updateLightbox();
    }
});

function updateLightbox() {
    const img = lightboxImages[lightboxCurrentIndex];
    if (img) openLightbox(img.src, img.dataset.pdf, lightboxImages.length > 1);
}

document.getElementById('lightbox-prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (lightboxImages.length > 1) {
        lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    }
});

document.getElementById('lightbox-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (lightboxImages.length > 1) {
        lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
        updateLightbox();
    }
});

function openLightbox(src, pdfUrl, showNav = false) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const actions = document.getElementById('lightbox-actions');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (lightbox && img) {
        img.src = src;
        if (actions) {
            const btnText = currentLang === 'fr' ? 'Ouvrir le PDF lié ↗' : 'Open related PDF ↗';
            actions.innerHTML = (pdfUrl && pdfUrl !== 'undefined' && pdfUrl.trim() !== '')
                ? `<a href="${pdfUrl}" target="_blank" rel="noopener" class="btn" style="font-size: 0.95rem;">${btnText}</a>`
                : '';
        }
        if (prevBtn && nextBtn) {
            prevBtn.style.display = showNav ? 'flex' : 'none';
            nextBtn.style.display = showNav ? 'flex' : 'none';
        }
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

document.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        lightboxImages = [];
    }
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            e.preventDefault();
            window.location.href = resolvePath('admin.html');
            return;
        }
        const lightbox = document.getElementById('lightbox');
        const modal = document.getElementById('project-modal');
        if (e.key === 'Escape') {
            if (lightbox && lightbox.style.display === 'flex') closeLightbox();
            else if (modal && modal.style.display === 'block') closeModal();
        } else if (lightbox && lightbox.style.display === 'flex' && lightboxImages.length > 1) {
            if (e.key === 'ArrowLeft') {
                lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
                updateLightbox();
            }
        }
    });
}
