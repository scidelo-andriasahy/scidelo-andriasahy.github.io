import { portfolioData } from '../data/content.js';

let currentLang = 'fr';
let currentExpFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    renderContent();
    setupFilters();
    setupExperienceFilters();
    setupAnimations();
    setupBackToTop();
    setupMobileMenu();
    setupKeyboardShortcuts();
});

function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const storageKey = 'theme-preference';

    const getColorPreference = () => {
        if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    let theme = getColorPreference();

    const reflectPreference = () => {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = theme === 'light'
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        if (themeToggle) {
            themeToggle.innerHTML = icon;
            themeToggle.setAttribute('aria-label', theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair');
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
    if (langToggle) {
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    }
    document.documentElement.lang = currentLang;

    const nav = portfolioData[currentLang].nav;
    const setNav = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };
    setNav('nav-about', nav.about);
    setNav('nav-skills', nav.skills);
    setNav('nav-projects', nav.projects);
    setNav('nav-experience', nav.experience);
    setNav('nav-cv', nav.cv);
    setNav('nav-certificates', nav.certificates);
}

function getSkillIcon(iconName) {
    const icons = {
        cpu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
        code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        activity: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        sliders: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>'
    };
    return icons[iconName] || icons.cpu;
}

function renderContent() {
    const data = portfolioData[currentLang];

    // Section Titles
    document.querySelectorAll('.section-title').forEach(el => {
        if (el.parentElement.id === 'about') el.textContent = data.about.title;
        if (el.parentElement.id === 'skills' && data.skills) el.textContent = data.skills.title;
        if (el.parentElement.id === 'projects') el.textContent = data.projects.title;
        if (el.parentElement.id === 'experience') el.textContent = data.experience.title;
        if (el.parentElement.id === 'cv') el.textContent = data.education.title;
        if (el.parentElement.id === 'certificates') el.textContent = data.certificates.title;
    });

    // Hero
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        const linkedinUrl = data.identity.contacts.linkedin.startsWith('http')
            ? data.identity.contacts.linkedin
            : `https://${data.identity.contacts.linkedin}`;
        const githubUrl = data.identity.contacts.github || 'https://github.com/scidelo-andriasahy';

        heroContent.innerHTML = `
            <div class="fade-in visible">
                ${data.identity.availabilityBadge ? `<div class="availability-pill">${data.identity.availabilityBadge}</div>` : ''}
                <h1>${data.identity.name}</h1>
                <p class="tagline">${data.identity.title}</p>
                <p style="color: var(--text-muted); font-size: 1.05rem; font-weight: 500;">
                    📍 ${data.identity.location || 'Tanger, Maroc'} • ${data.identity.institution}
                </p>
                <div class="specialties">
                    ${data.identity.specialties.map(s => `<span class="badge">${s}</span>`).join('')}
                </div>
                <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="mailto:${data.identity.contacts.email}" class="btn">${data.actions.contact}</a>
                    <a href="${linkedinUrl}" class="btn" style="background: var(--text-color); color: var(--bg-color)" target="_blank" rel="noopener">${data.actions.linkedin}</a>
                    <a href="${githubUrl}" class="btn btn-outline" target="_blank" rel="noopener">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        GitHub
                    </a>
                    <a href="tel:${data.identity.contacts.phone.replace(/ /g, '')}" class="btn btn-outline">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        ${data.identity.contacts.phone}
                    </a>
                </div>
            </div>
        `;
    }

    // Hero Image
    const heroImage = document.querySelector('#hero-image img');
    if (heroImage) {
        heroImage.src = data.identity.image;
        heroImage.style.objectPosition = 'top';
    }

    // About
    const aboutText = document.getElementById('about-text');
    if (aboutText) {
        const langTitle = currentLang === 'fr' ? 'Langues' : 'Languages';
        const interestTitle = currentLang === 'fr' ? 'Centres d’intérêt' : 'Interests';
        aboutText.innerHTML = `
            <div class="about-grid">
                <div>
                    <p style="font-size: 1.15rem; color: var(--text-color); margin-bottom: 1.5rem; line-height: 1.8;">${data.about.text}</p>
                    ${data.about.pfeHighlight ? `
                        <div class="pfe-callout">
                            <strong>🎯 ${currentLang === 'fr' ? 'Disponibilité Stage PFE (Dès Mi-Janvier 2027 — Mobilité Maroc & International)' : 'PFE Internship Availability (From Mid-January 2027 — National & International Mobility)'} :</strong> ${data.about.pfeHighlight}
                        </div>
                    ` : ''}
                </div>
                <div class="about-side-card">
                    ${data.about.languages ? `
                        <h4 style="font-size: 1.1rem; margin-bottom: 0.85rem; color: var(--accent-color); font-family: 'Inter', sans-serif;">🌍 ${langTitle}</h4>
                        <ul style="list-style: none; margin-bottom: 1.5rem;">
                            ${data.about.languages.map(l => `
                                <li style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--border-color); font-size: 0.92rem;">
                                    <strong>${l.lang}</strong>
                                    <span style="color: var(--text-muted);">${l.level}</span>
                                </li>
                            `).join('')}
                        </ul>
                    ` : ''}
                    ${data.about.interests ? `
                        <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--accent-color); font-family: 'Inter', sans-serif;">⚡ ${interestTitle}</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${data.about.interests.map(i => `<span class="badge" style="font-size: 0.78rem; padding: 0.25rem 0.75rem;">${i}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Technical Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && data.skills) {
        skillsGrid.innerHTML = data.skills.categories.map(cat => `
            <div class="skill-card fade-in visible">
                <div class="skill-card-header">
                    <div class="skill-icon">${getSkillIcon(cat.icon)}</div>
                    <h3>${cat.title}</h3>
                </div>
                <div class="skill-tags">
                    ${cat.items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Initial Projects Render
    filterProjects('all');

    // Initial Experiences Render
    filterExperiences(currentExpFilter);

    // Education
    const educationTimeline = document.getElementById('education-timeline');
    if (educationTimeline) {
        educationTimeline.innerHTML = data.education.items.map(e => `
            <div class="timeline-item fade-in visible">
                <div class="timeline-date">${e.period}</div>
                <h3>${e.degree}</h3>
                <p style="color: var(--accent-color); font-weight: 600; font-size: 1.05rem; margin-top: 0.25rem;">${e.institution}</p>
                ${e.details ? `<p style="margin-top: 0.6rem; color: var(--text-muted); font-size: 0.98rem;">${e.details}</p>` : ''}
            </div>
        `).join('');

        const downloadBtn = document.getElementById('download-cv-btn');
        const viewBtn = document.getElementById('view-cv-btn');
        if (downloadBtn) downloadBtn.textContent = data.education.downloadCV;
        if (viewBtn && data.education.viewCV) viewBtn.textContent = data.education.viewCV;
    }

    // Certificates
    const certificatesContent = document.getElementById('certificates-content');
    if (certificatesContent && data.certificates.sections) {
        certificatesContent.innerHTML = data.certificates.sections.map(section => `
            <div class="certificate-section fade-in visible" style="margin-bottom: 4.5rem;">
                <h3 style="font-size: 1.75rem; margin-bottom: 1rem; color: var(--accent-color);">${section.title}</h3>
                <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 900px; line-height: 1.6;">${section.description}</p>
                <div class="grid">
                    ${section.items.map(c => renderCertificateCard(c)).join('')}
                </div>
            </div>
        `).join('');
    }
}

function renderCertificateCard(c) {
    const images = c.images || (c.image ? [c.image] : []);
    const links = c.links || (c.link ? [c.link] : []);
    const hasImages = images.length > 0;
    const hasMultipleImages = images.length > 1;
    const btnText = currentLang === 'fr' ? 'Voir le certificat PDF' : 'View Certificate PDF';

    let galleryHtml = '';
    let pdfBtnHtml = '';

    if (hasMultipleImages) {
        galleryHtml = `
            <div class="cert-gallery" style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; height: 100%; width: 100%; scrollbar-width: none;">
                ${images.map((imgUrl, i) => `
                    <div style="flex: 0 0 100%; scroll-snap-align: start; position: relative; height: 100%;">
                        <img src="${imgUrl}" alt="${c.title} - ${i + 1}" data-pdf="${links[i] || ''}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);">
                    </div>
                `).join('')}
            </div>
            <div style="position: absolute; bottom: 10px; left: 0; right: 0; display: flex; justify-content: center; gap: 5px; z-index: 10; pointer-events: none;">
                ${images.map((_, i) => `<div style="width: 8px; height: 8px; border-radius: 50%; background: ${i === 0 ? 'var(--accent-color)' : 'rgba(255,255,255,0.7)'}; box-shadow: 0 0 2px rgba(0,0,0,0.5);"></div>`).join('')}
            </div>
            <div style="position: absolute; top: 10px; right: 10px; z-index: 10; pointer-events: none; background: rgba(0,0,0,0.65); padding: 0.2rem 0.65rem; border-radius: 50px; color: white; font-size: 0.75rem;">
                1/${images.length} &harr;
            </div>
        `;
        pdfBtnHtml = links.map((lnk, idx) =>
            `<a href="${lnk}" target="_blank" rel="noopener" class="btn pdf-btn" style="padding: 0.45rem 0.95rem; font-size: 0.82rem;">PDF ${idx + 1}</a>`
        ).join('');
    } else if (hasImages) {
        const linkStr = links[0] || '';
        galleryHtml = `<img src="${images[0]}" alt="${c.title}" data-pdf="${linkStr}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);">`;
        pdfBtnHtml = linkStr ? `<a href="${linkStr}" target="_blank" rel="noopener" class="btn pdf-btn" style="padding: 0.5rem 1.1rem; font-size: 0.85rem;">${btnText}</a>` : '';
    } else {
        galleryHtml = `
            <div style="height: 100%; width: 100%; background: linear-gradient(135deg, rgba(37,99,235,0.14), rgba(139,92,246,0.18)); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                <span style="margin-top: 0.6rem; font-size: 0.8rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.06em;">${c.issuer}</span>
            </div>
        `;
    }

    return `
        <div class="card fade-in visible" style="text-decoration: none; color: inherit; cursor: default; display: flex; flex-direction: column;">
            <div style="height: ${hasImages ? '210px' : '135px'}; background: #0f172a; overflow: hidden; position: relative;">
                ${galleryHtml}
            </div>
            <div class="card-content" style="display: flex; flex-direction: column; flex: 1;">
                <h4 class="card-title" style="font-size: 1.3rem;">${c.title}</h4>
                <p style="font-size: 0.9rem; color: var(--accent-color); font-weight: 600; margin-bottom: 0.6rem;">${c.issuer} • ${c.date}</p>
                ${c.description ? `<p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.2rem;">${c.description}</p>` : ''}
                ${c.skills && c.skills.length ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; margin-top: auto;">
                        ${c.skills.map(skill => `<span class="badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">${skill}</span>`).join('')}
                    </div>
                ` : ''}
                ${pdfBtnHtml ? `
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto;">
                        ${pdfBtnHtml}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function setupFilters() {
    const data = portfolioData[currentLang];
    const filterBar = document.getElementById('category-filters');
    if (!filterBar) return;

    // Preserve original category casing while deduplicating
    const categoryMap = new Map();
    data.projects.items.forEach(p => {
        const key = p.category.trim().toLowerCase();
        if (!categoryMap.has(key)) {
            categoryMap.set(key, p.category.trim());
        }
    });

    const buttons = [
        { key: 'all', label: data.projects.filterAll },
        ...Array.from(categoryMap.entries()).map(([key, label]) => ({ key, label }))
    ];

    filterBar.innerHTML = buttons.map(b => `
        <button class="filter-btn ${b.key === 'all' ? 'active' : ''}" data-category="${b.key}">
            ${b.label}
        </button>
    `).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
            filterProjects(btn.dataset.category);
        });
    });
}

function filterProjects(category) {
    const data = portfolioData[currentLang];
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const filtered = category === 'all'
        ? data.projects.items
        : data.projects.items.filter(p => p.category.trim().toLowerCase() === category);

    projectsGrid.innerHTML = filtered.map(p => {
        const hasVideo = Boolean(p.video && p.video.trim() !== '');
        const hasReport = Boolean(p.links && p.links.report);
        return `
            <div class="card fade-in visible" onclick="openProject(${p.id})">
                <div style="height: 220px; background: #090d16; overflow: hidden; position: relative;">
                    <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.92; transition: var(--transition);">
                    <div style="position: absolute; bottom: 0.85rem; left: 0.85rem; right: 0.85rem; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; pointer-events: none;">
                        <span class="badge" style="background: rgba(15, 23, 42, 0.82); backdrop-filter: blur(6px); color: #f8fafc; border: 1px solid rgba(255,255,255,0.18); font-size: 0.78rem;">${p.category}</span>
                        <div style="display: flex; gap: 0.4rem;">
                            ${hasVideo ? `<span class="badge" style="background: rgba(239, 68, 68, 0.9); color: white; border: none; font-size: 0.72rem; padding: 0.25rem 0.65rem;">▶ Vidéo</span>` : ''}
                            ${hasReport ? `<span class="badge" style="background: rgba(37, 99, 235, 0.9); color: white; border: none; font-size: 0.72rem; padding: 0.25rem 0.65rem;">📄 PDF</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="card-content" style="display: flex; flex-direction: column;">
                    <h3 class="card-title" style="font-size: 1.35rem;">${p.title}</h3>
                    <p style="font-size: 0.94rem; color: var(--text-muted); margin-bottom: 1.35rem; line-height: 1.55;">${p.description}</p>
                    <div class="card-tags" style="display: flex; gap: 0.45rem; flex-wrap: wrap; margin-top: auto;">
                        ${p.tags.slice(0, 4).map(t => `<span class="tag">#${t}</span>`).join('')}
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
        { key: 'all', label: data.experience.filterAll || 'Toutes' },
        { key: 'pro', label: data.experience.filterPro || 'R&D & Professionnel' },
        { key: 'assoc', label: data.experience.filterAssoc || 'Leadership & Associatif' }
    ];

    expFilterBar.innerHTML = filters.map(f => `
        <button class="filter-btn ${f.key === currentExpFilter ? 'active' : ''}" data-exp-type="${f.key}">
            ${f.label}
        </button>
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
            ? `<a href="${e.organizationUrl}" target="_blank" rel="noopener" class="highlight-link">${e.organization}</a>`
            : e.organization;
        const locationStr = e.location ? ` • <span style="font-weight: 400; color: var(--text-muted);">${e.location}</span>` : '';
        const bulletsHtml = e.bullets && e.bullets.length
            ? `<ul style="margin-left: 1.2rem; margin-bottom: 1rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.55;">
                ${e.bullets.map(b => `<li style="margin-bottom: 0.4rem;">${b}</li>`).join('')}
               </ul>`
            : (e.description ? `<div style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1rem;">${e.description}</div>` : '');

        const tagsHtml = e.tags && e.tags.length
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 0.5rem;">
                ${e.tags.map(t => `<span class="badge" style="font-size: 0.72rem; padding: 0.18rem 0.6rem;">${t}</span>`).join('')}
               </div>`
            : '';

        return `
            <div class="card fade-in visible" style="cursor: default;">
                <div class="card-content" style="display: flex; flex-direction: column; height: 100%; padding: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.82rem; color: var(--accent-color); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">${e.period}</span>
                        <span class="badge" style="font-size: 0.7rem; padding: 0.15rem 0.55rem;">${e.type === 'assoc' ? (currentLang === 'fr' ? 'Leadership' : 'Leadership') : 'R&D / Pro'}</span>
                    </div>
                    <h3 style="font-size: 1.22rem; margin-bottom: 0.4rem;">${e.role}</h3>
                    <p style="color: var(--text-color); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem;">${orgHtml}${locationStr}</p>
                    ${bulletsHtml}
                    ${tagsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function renderVideoEmbed(videoUrl) {
    if (!videoUrl || !videoUrl.trim()) return '';
    const trimmed = videoUrl.trim();

    // Check YouTube URL
    const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
        const videoId = ytMatch[1];
        return `
            <div style="margin: 2.5rem 0;">
                <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">🎥 ${currentLang === 'fr' ? 'Démonstration Vidéo' : 'Video Demonstration'}</h3>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 18px; box-shadow: 0 15px 35px rgba(0,0,0,0.25); background: #000;">
                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                </div>
            </div>
        `;
    }

    // Local MP4 / WebM video file
    return `
        <div style="margin: 2.5rem 0;">
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">🎥 ${currentLang === 'fr' ? 'Démonstration Vidéo' : 'Video Demonstration'}</h3>
            <video controls preload="metadata" style="width: 100%; max-height: 540px; border-radius: 18px; background: #000; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
                <source src="${trimmed}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture vidéo HTML5.
            </video>
        </div>
    `;
}

// Global function for project modal
window.openProject = (id) => {
    const data = portfolioData[currentLang];
    const p = data.projects.items.find(proj => proj.id === id);
    if (!p) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    const galleryHtml = p.gallery && p.gallery.length
        ? `
            <h3 style="margin: 2.5rem 0 1.25rem; font-size: 1.6rem;">📸 ${currentLang === 'fr' ? 'Galerie & Schémas Techniques (Cliquez pour agrandir)' : 'Technical Gallery & Schematics (Click to zoom)'}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 1.5rem 0;">
                ${p.gallery.map(item => {
                    const src = typeof item === 'string' ? item : item.src;
                    const alt = typeof item === 'string' ? p.title : (item.caption || p.title);
                    return `<img src="${src}" alt="${alt}" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.12); background: #0f172a; object-fit: cover;">`;
                }).join('')}
            </div>
        `
        : '';

    const codeHtml = p.codeSnippet && p.codeSnippet.code
        ? `
            <h3 style="margin: 2.5rem 0 1rem; font-size: 1.6rem;">💻 ${p.codeSnippet.title || (currentLang === 'fr' ? 'Extrait de Code' : 'Code Snippet')}</h3>
            <pre style="background: #0f172a; color: #a5f3fc; padding: 1.75rem; border-radius: 16px; overflow-x: auto; margin: 1.25rem 0; font-family: 'Fira Code', monospace; font-size: 0.9rem; border: 1px solid #334155;"><code>${escapeHtml(p.codeSnippet.code)}</code></pre>
        `
        : '';

    const hasValidGithub = p.links && p.links.github && p.links.github !== '#' && p.links.github.trim() !== '';
    const hasReport = p.links && p.links.report && p.links.report.trim() !== '';

    modalBody.innerHTML = `
        <div class="fade-in visible">
            <span class="tag" style="margin-bottom: 0.75rem; display: block;">${p.category}</span>
            <h1 style="font-size: clamp(1.8rem, 4vw, 2.75rem); margin-bottom: 1.25rem;">${p.title}</h1>
            <div class="card-tags" style="margin-bottom: 2rem; display: flex; gap: 0.6rem; flex-wrap: wrap;">
                ${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}
            </div>
            <div style="margin-bottom: 2.5rem; border-radius: 20px; overflow: hidden; background: #090d16; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                <img src="${p.image}" alt="${p.title}" style="width: 100%; max-height: 550px; object-fit: contain; display: block; margin: 0 auto;">
            </div>
            ${renderVideoEmbed(p.video)}
            <div class="project-details-content" style="font-size: 1.06rem; line-height: 1.8;">
                ${formatMarkdown(p.details)}
                ${galleryHtml}
                ${codeHtml}
            </div>
            <div style="margin-top: 3rem; display: flex; gap: 1.25rem; flex-wrap: wrap;">
                ${hasValidGithub ? `<a href="${p.links.github}" class="btn" target="_blank" rel="noopener">${data.actions.github}</a>` : ''}
                ${hasReport ? `<a href="${p.links.report}" class="btn" style="background: var(--text-color); color: var(--bg-color)" target="_blank" rel="noopener">📄 ${data.actions.report}</a>` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

const closeModal = () => {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

document.getElementById('close-modal').onclick = closeModal;

document.getElementById('modal-scroll-area').addEventListener('click', (e) => {
    if (e.target.id === 'modal-scroll-area') closeModal();
});

function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/### (.*)/g, '<h3 style="margin: 2.2rem 0 1rem; font-size: 1.55rem; color: var(--accent-color);">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background: rgba(37,99,235,0.1); color: var(--accent-color); padding: 0.15rem 0.45rem; border-radius: 6px; font-family: \'Fira Code\', monospace; font-size: 0.9em;">$1</code>')
        .replace(/\n- (.*)/g, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>')
        .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre style="background: #0f172a; color: #a5f3fc; padding: 1.75rem; border-radius: 16px; overflow-x: auto; margin: 1.5rem 0; font-family: \'Fira Code\', monospace; font-size: 0.9rem; border: 1px solid #334155;"><code>$2</code></pre>')
        .replace(/\n\n/g, '<br><br>');
}

// Lightbox logic
let lightboxImages = [];
let lightboxCurrentIndex = 0;

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && (e.target.closest('.project-details-content') || e.target.closest('.cert-gallery') || e.target.closest('.hero-image'))) {
        const gallery = e.target.closest('.cert-gallery') || e.target.closest('.project-details-content');
        if (gallery) {
            lightboxImages = Array.from(gallery.querySelectorAll('img'));
            lightboxCurrentIndex = lightboxImages.indexOf(e.target);
            updateLightbox();
        } else {
            lightboxImages = [e.target];
            lightboxCurrentIndex = 0;
            updateLightbox();
        }
    }
});

function updateLightbox() {
    const img = lightboxImages[lightboxCurrentIndex];
    if (img) {
        openLightbox(img.src, img.dataset.pdf, lightboxImages.length > 1);
    }
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
            const btnText = currentLang === 'fr' ? 'Ouvrir le PDF lié' : 'Open related PDF';
            if (pdfUrl && pdfUrl !== 'undefined' && pdfUrl.trim() !== '') {
                actions.innerHTML = `<a href="${pdfUrl}" target="_blank" rel="noopener" class="btn" style="background: var(--text-color); color: var(--bg-color); box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-size: 1.05rem; padding: 0.85rem 2rem;">${btnText}</a>`;
            } else {
                actions.innerHTML = '';
            }
        }

        if (prevBtn && nextBtn) {
            prevBtn.style.display = showNav ? 'flex' : 'none';
            nextBtn.style.display = showNav ? 'flex' : 'none';
        }

        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

document.querySelector('.close-lightbox')?.addEventListener('click', () => {
    closeLightbox();
});

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
        // Raccourci secret Propriétaire : Ctrl + Shift + A ouvre le Studio d'édition
        if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            e.preventDefault();
            window.location.href = 'admin.html';
            return;
        }
        const lightbox = document.getElementById('lightbox');
        const modal = document.getElementById('project-modal');
        if (e.key === 'Escape') {
            if (lightbox && lightbox.style.display === 'flex') {
                closeLightbox();
            } else if (modal && modal.style.display === 'block') {
                closeModal();
            }
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

// Auto-scroll logic for multi-certificate galleries
setInterval(() => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') return;

    document.querySelectorAll('.cert-gallery').forEach(gallery => {
        if (gallery.matches(':hover')) return;
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        if (gallery.scrollLeft >= maxScroll - 10) {
            gallery.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            gallery.scrollBy({ left: gallery.clientWidth, behavior: 'smooth' });
        }
    });
}, 4000);
