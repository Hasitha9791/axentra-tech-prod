/**
 * Axentra Tech - Halloween Festive Interactive Suite (Enhanced)
 * Professional, User-Friendly & Resilient Halloween Theme Engine
 */
(function() {
  'use strict';

  // 1. Initial State: Always active by default during Halloween Season
  const THEME_KEY = 'axentra_halloween_active';
  localStorage.setItem(THEME_KEY, 'true');
  let isHalloween = true;

  // Crisp Fallback SVG for Cyber Pumpkin (guarantees zero broken images even if image is pending copy)
  const CYBER_PUMPKIN_SVG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="pGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="#ffb703"/>
          <stop offset="70%" stop-color="#fb8500"/>
          <stop offset="100%" stop-color="#d00000"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Headphone Arch -->
      <path d="M20,55 A35,35 0 0,1 80,55" fill="none" stroke="#7209b7" stroke-width="7" stroke-linecap="round"/>
      <path d="M20,55 A35,35 0 0,1 80,55" fill="none" stroke="#f72585" stroke-width="2" stroke-linecap="round"/>
      <!-- Headphone Cans -->
      <rect x="10" y="44" width="12" height="22" rx="6" fill="#3a0ca3" stroke="#4cc9f0" stroke-width="2"/>
      <rect x="78" y="44" width="12" height="22" rx="6" fill="#3a0ca3" stroke="#4cc9f0" stroke-width="2"/>
      <!-- Stem -->
      <path d="M47,24 C48,16 54,14 56,12 C54,17 52,22 51,24 Z" fill="#2d6a4f"/>
      <!-- Pumpkin Body -->
      <ellipse cx="50" cy="54" rx="34" ry="30" fill="url(#pGrad)"/>
      <ellipse cx="38" cy="54" rx="18" ry="28" fill="rgba(0,0,0,0.06)"/>
      <ellipse cx="62" cy="54" rx="18" ry="28" fill="rgba(0,0,0,0.06)"/>
      <!-- Cyber HUD Visor -->
      <path d="M26,45 L74,45 L70,55 L30,55 Z" fill="rgba(0, 245, 212, 0.28)" stroke="#00f5d4" stroke-width="2" filter="url(#glow)"/>
      <line x1="32" y1="50" x2="68" y2="50" stroke="#00f5d4" stroke-width="1" stroke-dasharray="2,2"/>
      <!-- Carved Glowing Mouth -->
      <path d="M34,65 Q42,76 50,72 Q58,76 66,65 Q58,70 50,68 Q42,70 34,65 Z" fill="#fff3b0" filter="url(#glow)"/>
      <polygon points="46,67 48,67 48,70 46,70" fill="#fb8500"/>
      <polygon points="52,67 54,67 54,70 52,70" fill="#fb8500"/>
    </svg>
  `);

  function applyTheme(active) {
    if (active) {
      document.body.classList.add('halloween-active');
      const toggleText = document.getElementById('hwToggleStatus');
      if (toggleText) toggleText.textContent = 'ON';
    } else {
      document.body.classList.remove('halloween-active');
      const toggleText = document.getElementById('hwToggleStatus');
      if (toggleText) toggleText.textContent = 'OFF';
    }
    localStorage.setItem(THEME_KEY, active ? 'true' : 'false');
    if (typeof window.refreshKineticPalette === 'function') {
      window.refreshKineticPalette();
    }
  }

  // 2. High-Detail Spider Web Corners (Top Left & Top Right)
  function injectWebCorners() {
    if (document.querySelector('.hw-web-corner')) return;

    const leftCorner = document.createElement('img');
    leftCorner.className = 'hw-web-corner hw-web-left';
    leftCorner.src = 'assets/hw_corner_web_left.svg';
    leftCorner.alt = 'Halloween Spiderweb Decoration';
    leftCorner.setAttribute('aria-hidden', 'true');

    const rightCorner = document.createElement('img');
    rightCorner.className = 'hw-web-corner hw-web-right';
    rightCorner.src = 'assets/hw_corner_web_right.svg';
    rightCorner.alt = 'Halloween Spiderweb Decoration';
    rightCorner.setAttribute('aria-hidden', 'true');

    document.body.appendChild(leftCorner);
    document.body.appendChild(rightCorner);
  }

  // 3. Carved Jack-o'-Lantern Pumpkin Patch (Bottom Corner)
  function injectBottomCorners() {
    if (document.querySelector('.hw-corner-pumpkins')) return;

    const pumpkinCorner = document.createElement('img');
    pumpkinCorner.className = 'hw-corner-pumpkins';
    pumpkinCorner.src = 'assets/hw_corner_pumpkin_patch.svg';
    pumpkinCorner.alt = 'Halloween Pumpkin Patch Decoration';
    pumpkinCorner.setAttribute('aria-hidden', 'true');

    document.body.appendChild(pumpkinCorner);
  }

  // 4. Flying Halloween Images Across the Website Wall
  function injectFlyingHalloweenElements() {
    if (document.querySelector('.hw-fly-wall')) return;
    const flyWall = document.createElement('div');
    flyWall.className = 'hw-fly-wall';
    flyWall.setAttribute('aria-hidden', 'true');
    flyWall.innerHTML = `
      <!-- High-Detail Animated Flying Bats -->
      <img src="assets/hw_flying_bat.svg" class="hw-fly-item hw-fly-bat-1" alt="Flying Bat" />
      <img src="assets/hw_flying_bat.svg" class="hw-fly-item hw-fly-bat-2" alt="Flying Bat" />
      <img src="assets/hw_flying_bat.svg" class="hw-fly-item hw-fly-bat-3" alt="Flying Bat" />

      <!-- Glowing Translucent Floating Ghosts -->
      <img src="assets/hw_floating_ghost.svg" class="hw-fly-item hw-fly-ghost-1" alt="Floating Ghost" />
      <img src="assets/hw_floating_ghost.svg" class="hw-fly-item hw-fly-ghost-2" alt="Floating Ghost" />

      <!-- Flying Witch on Broomstick with Sparkle Trail -->
      <img src="assets/hw_flying_witch.svg" class="hw-fly-item hw-fly-witch" alt="Flying Witch" />

      <!-- Floating Jack-o'-Lantern Smoke Wisp -->
      <img src="assets/hw_floating_pumpkin.svg" class="hw-fly-item hw-fly-pumpkin-wisp" alt="Floating Pumpkin Wisp" />
    `;
    document.body.appendChild(flyWall);
  }

  // 4. Logo Witch Hat Decor
  function injectWitchHat() {
    const logoEl = document.querySelector('.nav-logo');
    if (!logoEl || document.querySelector('.hw-witch-hat-logo')) return;
    const hat = document.createElement('div');
    hat.className = 'hw-witch-hat-logo';
    hat.setAttribute('aria-hidden', 'true');
    hat.innerHTML = `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="27" rx="14" ry="4" fill="#3a0ca3" stroke="#ff7a00" stroke-width="1.5"/>
        <path d="M16 3 L8 26 C12 25 20 25 24 26 Z" fill="#240046" stroke="#ff7a00" stroke-width="1.5"/>
        <path d="M10 21 C13 20 19 20 22 21 L23 25 C19 24 13 24 9 25 Z" fill="#ff7a00"/>
        <rect x="14" y="21.5" width="4" height="3" fill="#ffbe0b" rx="0.5"/>
      </svg>
    `;
    logoEl.appendChild(hat);
  }

  // 5. Candy & Treat Burst Effect
  function burstTreats(x, y) {
    const emojis = ['🎃', '🍬', '🍫', '🦇', '👻', '✨', '🕷️', '🍭'];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hw-burst-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      
      const angle = Math.random() * 2 * Math.PI;
      const dist = 60 + Math.random() * 130;
      const dx = `${Math.cos(angle) * dist}px`;
      const dy = `${Math.sin(angle) * dist}px`;
      const rot = `${(Math.random() - 0.5) * 360}deg`;

      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.setProperty('--rot', rot);

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // 6. Setup Toggle Button
  function setupToggle() {
    const btn = document.getElementById('hwThemeToggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      isHalloween = !isHalloween;
      applyTheme(isHalloween);
      const rect = btn.getBoundingClientRect();
      burstTreats(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  // 8. Update Chatbot Avatar with Fallback
  function updateChatbotForHalloween() {
    const teaserTitle = document.querySelector('.chatbot-teaser .teaser-title');
    const teaserText = document.querySelector('.chatbot-teaser .teaser-text');
    if (teaserTitle) teaserTitle.innerHTML = '🎃 Spooky Deals Active!';
    if (teaserText) teaserText.innerHTML = 'Ask our Cyber-Pumpkin AI about 20% off Halloween tech packages!';

    const robotImgs = document.querySelectorAll('.teaser-robot-img, .toggle-robot-img, .header-robot-img');
    robotImgs.forEach(img => {
      img.addEventListener('error', function() {
        this.src = CYBER_PUMPKIN_SVG;
      });
      img.src = 'assets/cyber_pumpkin_mascot.jpg';
      img.style.borderRadius = '50%';
    });
  }

  // 9. Protect Template Preview Image
  function setupTemplateFallback() {
    const tImg = document.querySelector('.template-card--halloween img');
    if (tImg) {
      tImg.addEventListener('error', function() {
        this.src = 'assets/slide_web_development.jpg';
      });
    }
  }

  // 10. Automatic Halloween 50% OFF Best Offer Notification on Page Entry
  function setupHalloweenPromoNotification() {
    const promoModal = document.getElementById('hwPromoModal');
    if (!promoModal) return;

    const closeBtn = document.getElementById('hwPromoClose');
    const quoteBtn = document.getElementById('hwPromoQuoteBtn');
    const claimBtn = promoModal.querySelector('.hw-btn-claim, .hw-simple-cta-btn');
    const promoImg = promoModal.querySelector('.hw-simple-img');

    if (promoImg) {
      promoImg.addEventListener('error', function() {
        this.src = 'assets/slide_web_development.jpg';
      });
    }

    function openPromo() {
      promoModal.style.display = 'flex';
      promoModal.offsetHeight;
      promoModal.classList.add('active');
    }

    function closePromo() {
      promoModal.classList.remove('active');
      setTimeout(() => {
        promoModal.style.display = 'none';
      }, 350);
      try {
        sessionStorage.setItem('axentra_hw_50off_seen', 'true');
      } catch (e) {}
    }

    if (closeBtn) closeBtn.addEventListener('click', closePromo);

    promoModal.addEventListener('click', (e) => {
      if (e.target === promoModal) closePromo();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && promoModal.classList.contains('active')) {
        closePromo();
      }
    });

    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        closePromo();
        const quoteModal = document.getElementById('quick-quote-modal');
        if (quoteModal) {
          quoteModal.classList.add('active');
          const serviceSelect = document.getElementById('quote-service');
          if (serviceSelect) {
            serviceSelect.value = 'Halloween Special Offer';
          }
        }
      });
    }

    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        setTimeout(closePromo, 500);
      });
    }

    // Connect any ".open-halloween-modal" links (e.g. Announcement Bar "Claim 50% OFF")
    document.querySelectorAll('.open-halloween-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPromo();
      });
    });

    // Auto-trigger when users load/enter the website
    setTimeout(() => {
      openPromo();
    }, 1200);
  }

  // Initialize on DOM Ready
  function initHalloween() {
    applyTheme(isHalloween);
    injectWebCorners();
    injectBottomCorners();
    injectFlyingHalloweenElements();
    injectWitchHat();
    setupToggle();
    updateChatbotForHalloween();
    setupTemplateFallback();
    setupHalloweenPromoNotification();
    // Ensure any leftover floating pumpkin tags are removed
    document.querySelectorAll('.hw-floating-pumpkin, #hwFloatingPumpkin').forEach(el => el.remove());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHalloween);
  } else {
    initHalloween();
  }
})();
