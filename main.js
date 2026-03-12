/* ================================================================
   AXENTRA TECH — Main JavaScript
   Handles: Preloader, Nav, Animations, Slider,
            Portfolio Filter, Form Validation, Counters, Particles
   ================================================================ */

'use strict';

// ── DOM Ready ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initHamburger();
  initParticles();
  initAOS();
  initCounters();
  initTestimonialsSlider();
  initPortfolioFilter();
  initContactForm();
  initNewsletterForm();
  initBackToTop();
  initFooterYear();
  initSmoothScroll();
  initActiveNavOnScroll();
});

// ── Preloader ────────────────────────────────────────────────────
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 600);
  });

  // Fallback: hide after 3s regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  document.body.style.overflow = 'hidden';
}

// ── Navbar Scroll Effect ─────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger Menu ───────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click (outside nav)
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Particle Generator ───────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x      = Math.random() * 100;
    const size   = Math.random() * 3 + 1;
    const delay  = Math.random() * 15;
    const dur    = Math.random() * 12 + 8;
    const drift  = (Math.random() - 0.5) * 200 + 'px';

    particle.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      --drift: ${drift};
    `;
    container.appendChild(particle);
  }
}

// ── Simple AOS (Animate on Scroll) ──────────────────────────────
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ── Counter Animation ────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── Testimonials Slider ──────────────────────────────────────────
function initTestimonialsSlider() {
  const track     = document.getElementById('testimonials-track');
  const dotsWrap  = document.getElementById('testimonial-dots');
  const prevBtn   = document.getElementById('prev-btn');
  const nextBtn   = document.getElementById('next-btn');
  if (!track) return;

  const cards  = track.querySelectorAll('.testimonial-card');
  const total  = cards.length;
  let current  = 0;
  let timer    = null;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.dot');

  const update = () => {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const goTo = (index) => {
    current = (index + total) % total;
    update();
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  };

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  resetTimer();
}

// ── Portfolio Filter ─────────────────────────────────────────────
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity  = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity  = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// ── Contact Form Validation ──────────────────────────────────────
function initContactForm() {
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');
  if (!form) return;

  const showError = (fieldId, message) => {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const input   = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (input)   input.style.borderColor = '#ff4d4d';
  };

  const clearError = (fieldId) => {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const input   = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = '';
    if (input)   input.style.borderColor = '';
  };

  // Real-time validation
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  const isValidEmail = (email) => {
    // Basic RFC-compliant email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError('name', 'Please enter your full name (at least 2 characters).');
      valid = false;
    } else { clearError('name'); }

    if (!email.value.trim() || !isValidEmail(email.value.trim())) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    } else { clearError('email'); }

    if (!message.value.trim() || message.value.trim().length < 20) {
      showError('message', 'Please describe your project (at least 20 characters).');
      valid = false;
    } else { clearError('message'); }

    if (!valid) return;

    // Simulate form submission (replace with your backend endpoint)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      if (successMsg) {
        successMsg.style.display = 'flex';
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
}

// ── Newsletter Form ──────────────────────────────────────────────
function initNewsletterForm() {
  const form    = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email      = emailInput ? emailInput.value.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      emailInput.style.border = '1px solid #ff4d4d';
      emailInput.focus();
      return;
    }

    emailInput.style.border = '';
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}

// ── Back to Top ──────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Footer Year ──────────────────────────────────────────────────
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Smooth Scroll for internal anchors ──────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 80; // navbar height offset
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Active Nav Link on Scroll ────────────────────────────────────
function initActiveNavOnScroll() {
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
