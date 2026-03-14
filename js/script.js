/**
 * Le Cavin — Animations GSAP & interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initGSAPAnimations();
    initNavLinksAnimation();
});

/** Header : fond au scroll */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const hero = document.querySelector('.hero');
    const threshold = hero ? hero.offsetHeight * 0.5 : 300;

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > threshold);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/** Menu mobile */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

/** Scroll fluide */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/** Animation des liens nav au survol */
function initNavLinksAnimation() {
    const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(4px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
}

/** Animations GSAP */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero — entrée en cascade
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .from('.hero-aside', { opacity: 0, x: -20, duration: 0.6 })
        .from('.hero-label', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.7 }, '-=0.4')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.4')
        .from('.hero-actions', { opacity: 0, y: 24, duration: 0.5 }, '-=0.3')
        .from('.hero-brand, .hero-brand-desktop', { opacity: 0, scale: 0.95, duration: 1 }, '-=1')
        .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.3');

    // Ligne hero — animation de remplissage
    const lineInner = document.querySelector('.hero-line-inner');
    if (lineInner && window.innerWidth > 768) {
        gsap.from(lineInner, {
            scaleY: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: 0.8
        });
    } else if (lineInner) {
        gsap.from(lineInner, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: 0.8
        });
    }

    // Scroll hint — pulsation continue
    gsap.to('.hero-scroll-line', {
        opacity: 0.4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });

    // Section split — révélations au scroll
    gsap.from('.split-content', {
        scrollTrigger: {
            trigger: '.section-split',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.split-visual', {
        scrollTrigger: {
            trigger: '.section-split',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });

    // List dots — stagger
    gsap.from('.list-dot', {
        scrollTrigger: {
            trigger: '.section-list',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.3
    });

    // CTA — texte et lignes
    gsap.from('.cta-text', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.cta-line', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scaleY: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });

    // Cards — stagger (désactivé sur mobile pour éviter les bugs de layout)
    if (window.innerWidth > 768) {
        gsap.from('.card', {
            scrollTrigger: {
                trigger: '.cards-grid',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            onComplete: function() {
                gsap.set('.card', { clearProps: 'transform' });
            }
        });
    }

    // Card accent — animation au hover (géré en CSS)
    // Parallax hero au scroll
    gsap.to('.hero-content-wrap', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        },
        y: 80,
        opacity: 0.9
    });

    // Contact — apparition
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.section-contact',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: 'power3.out'
    });

    gsap.from('.contact-hours', {
        scrollTrigger: {
            trigger: '.section-contact',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 30,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.15
    });

    // Footer — slide up
    gsap.from('.footer-inner', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out'
    });

    // Logo nav — micro-animation au load
    gsap.from('.nav-logo', {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        delay: 0.2
    });
}
