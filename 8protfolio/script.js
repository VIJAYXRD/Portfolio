/**
 * VIJAY — Futuristic Sci-Fi Portfolio Engine
 * Cinematic scroll journey:
 * Space Planet Hero -> About Me (identity nodes + journey timeline) ->
 * Projects -> Services -> Contact
 */

(function () {
  'use strict';

  // ── Global Configuration & State ──────────────────────────────────────
  const STATE = {
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, normX: 0, normY: 0 },
    isMobile: window.innerWidth <= 768
  };

  // Cache DOM References
  const DOM = {
    navbar: document.getElementById('navbar'),
    hamburger: document.getElementById('hamburger'),
    mobileMenu: document.getElementById('mobile-menu'),
    menuOverlay: document.getElementById('menu-overlay'),
    mobileLinks: document.querySelectorAll('.mobile-link'),
    navLinks: document.querySelectorAll('.nav-links a'),

    hero: document.getElementById('hero'),
    heroBg: document.getElementById('hero-bg'),
    heroContent: document.getElementById('hero-content'),
    starCanvas: document.getElementById('star-canvas'),

    aboutSection: document.getElementById('about'),
    identityNodes: document.getElementById('identity-nodes'),
    nodeCenter: document.getElementById('node-center'),
    nodeDev: document.getElementById('node-dev'),
    nodeMgr: document.getElementById('node-mgr'),
    nodeAge: document.getElementById('node-age'),
    lineDev: document.getElementById('line-dev'),
    lineMgr: document.getElementById('line-mgr'),
    lineAge: document.getElementById('line-age'),

    projectCards: document.querySelectorAll('.project-card'),
    projectModal: document.getElementById('project-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalClose: document.getElementById('modal-close'),
    modalDismissBtn: document.getElementById('modal-dismiss-btn'),
    modalTitle: document.getElementById('modal-project-title'),
    modalDesc: document.getElementById('modal-project-desc'),
    modalIcon: document.getElementById('modal-preview-icon'),
    modalTags: document.getElementById('modal-project-tags'),
    modalLink: document.getElementById('modal-live-link'),

    serviceCards: document.querySelectorAll('.service-card'),
    contactSection: document.getElementById('contact'),
    contactCanvas: document.getElementById('contact-canvas'),
    cosmicToast: document.getElementById('cosmic-toast'),
    toastText: document.getElementById('toast-text'),

    revealElements: document.querySelectorAll('.reveal-up, .reveal-card, .reveal-tl')
  };

  // ── Module 1: Navigation & Mobile Menu ─────────────────────────────────
  function initNavigation() {
    const { navbar, hamburger, mobileMenu, menuOverlay, mobileLinks, navLinks } = DOM;
    if (!navbar) return;

    // Scroll listener for sticky transparent-to-opaque glass navbar
    function updateNavbar() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      updateActiveNavLink();
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Mobile Hamburger Toggle
    if (hamburger && mobileMenu && menuOverlay) {
      function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('visible');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('visible');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
      });

      menuOverlay.addEventListener('click', closeMenu);

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
      });
    }

    // Active Nav link detection
    function updateActiveNavLink() {
      const sections = [
        { id: 'hero', linkId: 'nav-home' },
        { id: 'about', linkId: 'nav-about' },
        { id: 'projects', linkId: 'nav-projects' },
        { id: 'services', linkId: 'nav-services' },
        { id: 'contact', linkId: 'nav-contact' }
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((l) => l.classList.remove('active'));
            const activeLink = document.getElementById(sections[i].linkId);
            if (activeLink) activeLink.classList.add('active');
            break;
          }
        }
      }
    }
  }

  // ── Module 2: Cosmic Starfield & Warp Speed Engine ────────────────────
  let starfieldEngine = null;

  function initStarfield() {
    const canvas = DOM.starCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isRunning = true;

    // Star data structure
    const STAR_COUNT = window.innerWidth < 768 ? 90 : 180;
    const stars = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Initialize multi-layer stars with 3D space depth
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * 1000 + 1,
        origZ: Math.random() * 1000 + 1,
        size: Math.random() * 1.6 + 0.6,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.6 ? '#d946ef' : Math.random() > 0.3 ? '#a855f7' : '#ffffff'
      });
    }

    starfieldEngine = {
      warpSpeed: 0, // 0 = idle floating drift, > 0 = radial warp streaks
      setPaused(paused) {
        if (paused && isRunning) {
          isRunning = false;
          cancelAnimationFrame(animId);
        } else if (!paused && !isRunning) {
          isRunning = true;
          loop();
        }
      }
    };

    function loop() {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const warp = starfieldEngine.warpSpeed;
      const speed = 0.5 + warp * 18;

      // Mouse Parallax lerping
      STATE.mouse.x += (STATE.mouse.targetX - STATE.mouse.x) * 0.05;
      STATE.mouse.y += (STATE.mouse.targetY - STATE.mouse.y) * 0.05;
      const offsetX = STATE.mouse.x * 25;
      const offsetY = STATE.mouse.y * 25;

      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];

        // Move stars forward along Z
        s.z -= speed;
        if (s.z <= 0) {
          s.z = 1000;
          s.x = (Math.random() - 0.5) * width * 1.6;
          s.y = (Math.random() - 0.5) * height * 1.6;
        }

        // Project 3D to 2D screen coordinates
        const k = 400 / s.z;
        const px = s.x * k + cx + offsetX * (1 - s.z / 1000);
        const py = s.y * k + cy + offsetY * (1 - s.z / 1000);

        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue;

        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase) * 0.3 + 0.7;
        const alpha = Math.min(1, Math.max(0.1, s.baseAlpha * twinkle * (1 - s.z / 1100)));

        if (warp > 0.1) {
          // Warp streaks radiating outward from center
          const prevK = 400 / (s.z + speed * 1.5);
          const prevPx = s.x * prevK + cx;
          const prevPy = s.y * prevK + cy;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = Math.min(1, alpha * (warp * 0.6 + 0.4));
          ctx.lineWidth = s.size * (1 + warp * 0.8);
          ctx.stroke();
        } else {
          // Standard twinkling star point
          ctx.beginPath();
          ctx.arc(px, py, s.size * Math.max(0.5, k * 0.8), 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = s.size > 1.2 ? 6 : 0;
          ctx.shadowColor = s.color;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }

    loop();
  }

  // ── Module 3: Holographic Identity Node Graph ────────────────────────
  function initIdentityGraph() {
    const { identityNodes, nodeCenter, nodeDev, nodeMgr, nodeAge, lineDev, lineMgr, lineAge } = DOM;
    if (!identityNodes || !nodeCenter) return;

    // Track real positions of nodes and update SVG connection lines
    function updateLines() {
      const parentRect = identityNodes.getBoundingClientRect();
      if (parentRect.width === 0 || parentRect.height === 0) return;

      const centerRect = nodeCenter.getBoundingClientRect();
      const cx = centerRect.left + centerRect.width / 2 - parentRect.left;
      const cy = centerRect.top + centerRect.height / 2 - parentRect.top;

      function updateLine(lineEl, nodeEl) {
        if (!lineEl || !nodeEl) return;
        const r = nodeEl.getBoundingClientRect();
        const nx = r.left + r.width / 2 - parentRect.left;
        const ny = r.top + r.height / 2 - parentRect.top;

        lineEl.setAttribute('x1', cx.toFixed(1));
        lineEl.setAttribute('y1', cy.toFixed(1));
        lineEl.setAttribute('x2', nx.toFixed(1));
        lineEl.setAttribute('y2', ny.toFixed(1));
      }

      updateLine(lineDev, nodeDev);
      updateLine(lineMgr, nodeMgr);
      updateLine(lineAge, nodeAge);
    }

    // Continuous RAF update so floating animation doesn't disconnect lines
    let lineRaf = null;
    function lineLoop() {
      // Only compute when the About section is roughly near the viewport
      const about = DOM.aboutSection;
      if (about) {
        const aboutRect = about.getBoundingClientRect();
        if (aboutRect.bottom > -200 && aboutRect.top < window.innerHeight + 200) {
          updateLines();
        }
      }
      lineRaf = requestAnimationFrame(lineLoop);
    }
    lineRaf = requestAnimationFrame(lineLoop);

    // Holographic 3D mouse tilt
    let tiltX = 0;
    let tiltY = 0;
    identityNodes.addEventListener('mousemove', (e) => {
      const rect = identityNodes.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = normY * -16;
      const tiltY = normX * 16;
      identityNodes.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    });

    identityNodes.addEventListener('mouseleave', () => {
      identityNodes.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // ── Module 4: Cinematic GSAP Scroll Journey ───────────────────────────
  function initGSAPScrollJourney() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded.');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const { hero, heroBg, heroContent, aboutSection } = DOM;
    if (!hero) return;

    // 1. Hero Content Parallax Fade Out
    if (heroContent) {
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        opacity: 0,
        y: -70,
        scale: 0.94,
        ease: 'none'
      });
    }

    // 2. Planet Hero -> About Me transition
    //    The planet stays as a living backdrop, gently zooming and darkening
    //    as the About section scrolls up into place.
    if (heroBg && aboutSection) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        endTrigger: aboutSection,
        end: 'top top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress; // 0 at hero top, 1 when About reaches the top
          const scale = 1.0 + p * 0.35;
          const transY = p * -30;
          const brightness = Math.max(0.25, 1.0 - p * 0.55);
          const blur = p * 3;
          // Stay visible, then dim into the About background
          const opacity = p < 0.6 ? 1.0 : Math.max(0.15, 1.0 - (p - 0.6) / 0.4 * 0.85);

          heroBg.style.transform = `scale(${scale.toFixed(3)}) translate3d(0, ${transY.toFixed(1)}px, 0)`;
          heroBg.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(1)}px)`;
          heroBg.style.opacity = opacity.toFixed(3);

          // Subtle star stretch as the hero scrolls away
          if (starfieldEngine) {
            starfieldEngine.warpSpeed = p * 0.9;
          }
        }
      });
    }
  }

  // ── Module 5: Scroll Reveal System ───────────────────────────────────
  function initScrollReveals() {
    const revealEls = DOM.revealElements;
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach((el) => observer.observe(el));
    } else {
      // Fallback
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  // ── Module 6: Interactive 3D Service Cards Tilt ──────────────────────
  function initServiceCardsTilt() {
    const cards = DOM.serviceCards;
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        const tiltX = normY * -14;
        const tiltY = normX * 14;

        card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(12px) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
      });
    });
  }

  // ── Module 7: Project Modal Dialog ───────────────────────────────────
  function initProjectModal() {
    const { projectModal, modalBackdrop, modalClose, modalDismissBtn, modalTitle, modalDesc, modalIcon, modalTags, modalLink } = DOM;
    if (!projectModal) return;

    const projectData = {
      'proj-1': {
        title: 'Portfolio Website',
        image: 'first.jpg',
        imageAlt: 'Purple ringed planet used as the portfolio hero background',
        desc: 'A responsive personal portfolio built with HTML, CSS and JavaScript, featuring scroll-driven animations, a cosmic theme and an interactive canvas background.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        // No fake destination for this project — the modal link is a
        // non-navigating "Coming!" state instead of a '#' that jumps to top.
        link: null,
        linkLabel: 'Coming!'
      },
      'proj-3': {
        title: 'Server Projects',
        image: 'dc.png',
        imageAlt: 'Discord logo glowing in a cosmic nebula',
        desc: 'Setting up and configuring Discord servers and Minecraft servers — roles, permissions, bots, plugins and community systems. Reach me on Discord.',
        tags: ['Discord', 'Minecraft', 'Configuration'],
        link: 'https://discordapp.com/users/1282254632298479649',
        linkLabel: 'Open Discord ↗'
      },
      // 'proj-4' (Minecraft Server Projects) intentionally has no entry: its
      // Coming! button was removed, so the card no longer opens a modal.
    };

    // The modal action is a static <a>. Guard it so a non-available project
    // can never navigate to a fake, empty or '#' destination.
    if (modalLink) {
      modalLink.addEventListener('click', (e) => {
        if (modalLink.classList.contains('btn-coming') || !modalLink.getAttribute('href')) {
          e.preventDefault();
          e.stopPropagation();
          showToast('This project is coming soon!');
        }
      });
    }

    function openModal(id) {
      const data = projectData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      // Show the project's real thumbnail instead of an emoji icon.
      if (data.image) {
        modalIcon.hidden = false;
        modalIcon.textContent = '';
        const img = document.createElement('img');
        img.className = 'modal-preview-img';
        img.src = data.image;
        img.alt = data.imageAlt || data.title;
        img.loading = 'lazy';
        modalIcon.appendChild(img);
      } else {
        // No thumbnail available — collapse the box rather than show an emoji.
        modalIcon.hidden = true;
        modalIcon.textContent = '';
      }

      // A null link means "not available yet" — render a non-navigating
      // Coming! state instead of an href that would jump to a fake URL.
      if (data.link) {
        modalLink.href = data.link;
        modalLink.textContent = data.linkLabel || 'Launch Demo ↗';
        modalLink.classList.remove('btn-coming');
        modalLink.removeAttribute('aria-disabled');
        modalLink.removeAttribute('tabindex');
      } else {
        // Strip the href and add a click guard so this button can never
        // navigate anywhere (a plain anchor without href is inert anyway).
        modalLink.removeAttribute('href');
        modalLink.textContent = data.linkLabel || 'Coming!';
        modalLink.classList.add('btn-coming');
        modalLink.setAttribute('aria-disabled', 'true');
        modalLink.setAttribute('tabindex', '-1');
      }

      modalTags.innerHTML = '';
      data.tags.forEach((t) => {
        const span = document.createElement('span');
        span.textContent = t;
        modalTags.appendChild(span);
      });

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Only the "View Project" entry button opens the modal. A real <a> link
    // with an external destination (the Server project's Discord profile) is
    // left to navigate on its own, and a disabled Coming! button never fires.
    // Nothing here uses a placeholder '#' href, so no click jumps to the top.
    document.querySelectorAll('.project-card').forEach((card) => {
      const btn = card.querySelector('.btn-small');
      if (!btn || btn.tagName !== 'BUTTON' || btn.disabled) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(card.id);
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ── Module 8: Contact Constellation & HUD Toast ──────────────────────
  let toastTimer = null;
  function showToast(message) {
    const toast = DOM.cosmicToast;
    const text = DOM.toastText;
    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  function initContactConstellation() {
    const canvas = DOM.contactCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 45;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    let contactMouse = { x: -999, y: -999 };
    const contactSec = DOM.contactSection;
    if (contactSec) {
      contactSec.addEventListener('mousemove', (e) => {
        const r = contactSec.getBoundingClientRect();
        contactMouse.x = e.clientX - r.left;
        contactMouse.y = e.clientY - r.top;
      });
      contactSec.addEventListener('mouseleave', () => {
        contactMouse.x = -999;
        contactMouse.y = -999;
      });
    }

    function renderConstellation() {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#9333ea';
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#a855f7';
            ctx.globalAlpha = (1 - dist / 110) * 0.22;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = p1.x - contactMouse.x;
        const mdy = p1.y - contactMouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(contactMouse.x, contactMouse.y);
          ctx.strokeStyle = '#d946ef';
          ctx.globalAlpha = (1 - mdist / 140) * 0.45;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(renderConstellation);
    }
    renderConstellation();

    // Wire up Contact links with feedback.
    // Note: there is deliberately no reference to #contact-discord here —
    // that anchor is handled natively by the browser.
    const btnInstagram = document.getElementById('contact-instagram');
    const btnGithub = document.getElementById('contact-github');
    const btnEmail = document.getElementById('contact-email');

    // The Discord contact button is a plain <a href> and is intentionally
    // left with NO JavaScript click handler at all: no preventDefault(),
    // no window.open(), no dynamic href rewriting, no toast. The browser
    // follows its real href natively, so nothing can intercept the click
    // or redirect it anywhere else.

    if (btnInstagram) {
      btnInstagram.addEventListener('click', () => {
        showToast('Opening Instagram profile...');
      });
    }

    // GitHub link is intentionally left exactly as it was in the markup.
    // Guard against the placeholder '#' so it never opens a useless tab.
    if (btnGithub) {
      btnGithub.addEventListener('click', (e) => {
        e.preventDefault();
        const href = btnGithub.getAttribute('href');
        if (!href || href === '#') {
          showToast('GitHub profile link coming soon');
          return;
        }
        showToast('Navigating to GitHub profile...');
        window.open(href, '_blank', 'noopener,noreferrer');
      });
    }

    if (btnEmail) {
      btnEmail.addEventListener('click', () => {
        showToast('Opening default email client for officialvpurpose@gmail.com');
      });
    }
  }

  // ── Module 9: Window Events & Smooth Interactions ───────────────────
  function initResizeAndEvents() {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      STATE.mouse.targetX = nx;
      STATE.mouse.targetY = ny;
      STATE.mouse.normX = nx;
      STATE.mouse.normY = ny;
    }, { passive: true });

    window.addEventListener('resize', () => {
      STATE.isMobile = window.innerWidth <= 768;
    });
  }

  // Initialize Engine
  function init() {
    initNavigation();
    initStarfield();
    initIdentityGraph();
    initGSAPScrollJourney();
    initScrollReveals();
    initServiceCardsTilt();
    initProjectModal();
    initContactConstellation();
    initResizeAndEvents();
  }

  window.addEventListener('DOMContentLoaded', init);
})();
