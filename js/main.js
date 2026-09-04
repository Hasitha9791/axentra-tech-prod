"use strict";
function initPreloader() {
  const e = document.getElementById("preloader");
  if (!e) return;
  const t = e.querySelector(".preloader-bar span"),
    n = e.querySelector(".preloader-percent");
  let o = 0,
    r = !1;
  function i(val) {
    o = Math.min(val, 100);
    if (t) t.style.width = o + "%";
    if (n) n.textContent = Math.round(o) + "%";
  }
  document.body.style.overflow = "hidden";
  
  // Smooth, snappy ticker
  const s = setInterval(() => {
    if (o < 90) {
      i(o + (12 * Math.random() + 6));
    } else {
      clearInterval(s);
    }
  }, 25);

  function a() {
    if (r) return;
    r = !0;
    clearInterval(s);
    i(100);
    setTimeout(() => {
      e.classList.add("hidden");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (e) e.style.display = "none";
      }, 600);
    }, 200);
  }

  if (document.readyState === "interactive" || document.readyState === "complete") {
    setTimeout(a, 250);
  } else {
    document.addEventListener("DOMContentLoaded", () => setTimeout(a, 250));
    window.addEventListener("load", () => setTimeout(a, 150));
  }
  // Hard fallback timeout so it never blocks mobile users
  setTimeout(a, 850);
}
function initNavbar() {
  const e = document.getElementById("navbar");
  if (!e) return;
  let ticking = false;
  const t = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          e.classList.add("scrolled");
        } else {
          e.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", t, { passive: true });
  t();
}
function initHamburger() {
  const e = document.getElementById("hamburger"),
    t = document.getElementById("nav-links");
  e &&
    t &&
    (e.addEventListener("click", () => {
      const n = t.classList.toggle("open");
      (e.classList.toggle("open", n),
        e.setAttribute("aria-expanded", String(n)),
        (document.body.style.overflow = n ? "hidden" : ""));
    }),
    t.querySelectorAll(".nav-link, .mobile-cta-btn").forEach((n) => {
      n.addEventListener("click", () => {
        (t.classList.remove("open"),
          e.classList.remove("open"),
          e.setAttribute("aria-expanded", "false"),
          (document.body.style.overflow = ""));
      });
    }),
    document.addEventListener("click", (n) => {
      !t.classList.contains("open") ||
        t.contains(n.target) ||
        e.contains(n.target) ||
        (t.classList.remove("open"),
        e.classList.remove("open"),
        e.setAttribute("aria-expanded", "false"),
        (document.body.style.overflow = ""));
    }));
}
function initParticles() {
  const e = document.getElementById("particles");
  if (!e) return;
  const count = window.innerWidth < 768 ? 6 : 14;
  for (let t = 0; t < count; t++) {
    const t = document.createElement("div");
    t.classList.add("particle");
    const n = 100 * Math.random(),
      o = 2.5 * Math.random() + 1,
      r = 15 * Math.random(),
      i = 12 * Math.random() + 8,
      s = 150 * (Math.random() - 0.5) + "px";
    ((t.style.cssText = `\n      left: ${n}%;\n      width: ${o}px;\n      height: ${o}px;\n      animation-duration: ${i}s;\n      animation-delay: ${r}s;\n      --drift: ${s};\n    `),
      e.appendChild(t));
  }
}
function initAOS() {
  const e = document.querySelectorAll("[data-aos]");
  if (!e.length) return;
  const t = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        if (e.isIntersecting) {
          const n = e.target,
            o = parseInt(n.dataset.delay || "0", 10);
          (setTimeout(() => {
            n.classList.add("aos-animate");
          }, o),
            t.unobserve(n));
        }
      });
    },
    { threshold: 0.12 },
  );
  e.forEach((e) => t.observe(e));
}
function initCounters() {
  const e = document.querySelectorAll(".stat-number[data-target]");
  if (!e.length) return;
  const t = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        e.isIntersecting &&
          (((e) => {
            const t = parseInt(e.dataset.target, 10),
              n = performance.now(),
              o = (r) => {
                const i = r - n,
                  s = Math.min(i / 2e3, 1),
                  a = 1 - (1 - s) * (1 - s);
                ((e.textContent = Math.round(a * t)),
                  s < 1 && requestAnimationFrame(o));
              };
            requestAnimationFrame(o);
          })(e.target),
          t.unobserve(e.target));
      });
    },
    { threshold: 0.5 },
  );
  e.forEach((e) => t.observe(e));
}
function initTestimonialsSlider() {
  const e = document.getElementById("testimonials-track"),
    t = document.getElementById("testimonial-dots"),
    n = document.getElementById("prev-btn"),
    o = document.getElementById("next-btn");
  if (!e) return;
  const r = e.querySelectorAll(".testimonial-card"),
    i = r.length;
  let s = 0,
    a = null;
  r.forEach((e, n) => {
    const o = document.createElement("button");
    (o.classList.add("dot"),
      o.setAttribute("aria-label", `Go to testimonial ${n + 1}`),
      0 === n && o.classList.add("active"),
      o.addEventListener("click", () => c(n)),
      t.appendChild(o));
  });
  const l = t.querySelectorAll(".dot"),
    c = (t) => {
      ((s = (t + i) % i),
        (e.style.transform = `translateX(-${100 * s}%)`),
        l.forEach((e, t) => e.classList.toggle("active", t === s)),
        d());
    },
    d = () => {
      (clearInterval(a), (a = setInterval(() => c(s + 1), 5e3)));
    };
  (n && n.addEventListener("click", () => c(s - 1)),
    o && o.addEventListener("click", () => c(s + 1)));
  let m = 0;
  (e.addEventListener(
    "touchstart",
    (e) => {
      m = e.changedTouches[0].clientX;
    },
    { passive: !0 },
  ),
    e.addEventListener(
      "touchend",
      (e) => {
        const t = m - e.changedTouches[0].clientX;
        Math.abs(t) > 50 && c(t > 0 ? s + 1 : s - 1);
      },
      { passive: !0 },
    ),
    d());
}
function initPortfolioFilter() {
  const e = document.querySelectorAll(".filter-btn"),
    t = document.querySelectorAll(".portfolio-card");
  e.length &&
    e.forEach((n) => {
      n.addEventListener("click", () => {
        (e.forEach((e) => e.classList.remove("active")),
          n.classList.add("active"));
        const o = n.dataset.filter;
        t.forEach((e) => {
          "all" === o || e.dataset.category === o
            ? ((e.style.display = ""),
              setTimeout(() => {
                ((e.style.opacity = "1"), (e.style.transform = "scale(1)"));
              }, 10))
            : ((e.style.opacity = "0"),
              (e.style.transform = "scale(0.95)"),
              setTimeout(() => {
                e.style.display = "none";
              }, 300));
        });
      });
    });
}
function initContactForm() {
  const e = document.getElementById("contact-form"),
    t = document.getElementById("form-success");
  if (!e) return;

  // EmailJS Configuration - Update these credentials when deploying to production
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: "V9_bPIzvKq3ziSfMq",
    SERVICE_ID: "service_9z6t9vj",
    TEMPLATE_ID: "template_q4b2wh5"
  };

  const n = (e, t) => {
      const n = document.getElementById(`${e}-error`),
        o = document.getElementById(e);
      (n && (n.textContent = t), o && (o.style.borderColor = "#ff4d4d"));
    },
    o = (e) => {
      const t = document.getElementById(`${e}-error`),
        n = document.getElementById(e);
      (t && (t.textContent = ""), n && (n.style.borderColor = ""));
    };
  ["name", "email", "message"].forEach((e) => {
    const t = document.getElementById(e);
    t && t.addEventListener("input", () => o(e));
  });
  e.addEventListener("submit", (r) => {
    r.preventDefault();
    let i = !0;
    const s = e.querySelector("#name"),
      a = e.querySelector("#email"),
      l = e.querySelector("#message");
    if (
      (!s.value.trim() || s.value.trim().length < 2
        ? (n("name", "Please enter your full name (at least 2 characters)."),
          (i = !1))
        : o("name"),
      a.value.trim() &&
      ((e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e))(a.value.trim())
        ? o("email")
        : (n("email", "Please enter a valid email address."), (i = !1)),
      !l.value.trim() || l.value.trim().length < 20
        ? (n(
            "message",
            "Please describe your project (at least 20 characters).",
          ),
          (i = !1))
        : o("message"),
      !i)
    )
      return;
    const c = e.querySelector('[type="submit"]');
    ((c.disabled = !0),
      (c.querySelector("span").textContent = "Sending..."),
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY));
    const d = e.querySelector("#phone"),
      m = e.querySelector("#service"),
      u = e.querySelector("#budget");
    emailjs
      .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        from_name: s.value.trim(),
        from_email: a.value.trim(),
        phone: d ? d.value.trim() : "Not provided",
        service: m ? m.value : "Not specified",
        budget: u ? u.value : "Not specified",
        message: l.value.trim(),
      })
      .then(() => {
        (e.reset(),
          (c.disabled = !1),
          (c.querySelector("span").textContent = "Send Message"),
          t &&
            ((t.style.display = "flex"),
            setTimeout(() => {
              t.style.display = "none";
            }, 5e3)));
      })
      .catch((e) => {
        (console.error("EmailJS error:", e),
          (c.disabled = !1),
          (c.querySelector("span").textContent = "Send Message"),
          alert(
            "Sorry, something went wrong. Please email us directly at axentrat@gmail.com",
          ));
      });
  });
}
function initNewsletterForm() {
  const e = document.getElementById("newsletter-form"),
    t = document.getElementById("newsletter-success");
  e &&
    e.addEventListener("submit", (n) => {
      n.preventDefault();
      const o = e.querySelector('input[type="email"]'),
        r = o ? o.value.trim() : "";
      if (!r || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r))
        return ((o.style.border = "1px solid #ff4d4d"), void o.focus());
      ((o.style.border = ""),
        (e.style.display = "none"),
        t && (t.style.display = "block"));
    });
}
function initTemplateLightbox() {
  const e = document.getElementById("template-lightbox"),
    t = document.getElementById("lightbox-img"),
    n = document.getElementById("lightbox-title"),
    o = document.getElementById("lightbox-close"),
    cta = document.getElementById("lightbox-cta");
  function r() {
    e.classList.remove("active");
    document.body.style.overflow = "";
  }
  if (!e) return;
  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", (evt) => {
      evt.preventDefault();
      const imgSrc = trigger.getAttribute("data-lightbox");
      const title = trigger.getAttribute("data-title") || "Template Preview";
      if (t) {
        t.src = imgSrc;
        t.alt = title;
      }
      if (n) {
        n.textContent = title;
      }
      if (cta) {
        cta.href = `https://wa.me/94771757556?text=Hi%20Axentra%20Tech%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(title)}%20website%20template.`;
        cta.target = "_blank";
        cta.rel = "noopener noreferrer";
        cta.innerHTML = `<i class="fab fa-whatsapp"></i> Get This Website <i class="fas fa-arrow-right"></i>`;
      }
      e.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  o && o.addEventListener("click", r);
  e.addEventListener("click", (t) => {
    if (t.target === e) r();
  });
  document.addEventListener("keydown", (evt) => {
    if ("Escape" === evt.key) r();
  });
}
function initBackToTop() {
  const e = document.getElementById("back-to-top");
  e &&
    (window.addEventListener(
      "scroll",
      () => {
        e.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: !0 },
    ),
    e.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
}
function initFooterYear() {
  const e = document.getElementById("footer-year");
  e && (e.textContent = new Date().getFullYear());
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (!targetElem) return;

      e.preventDefault();

      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");
      const wasOpen = navLinks && navLinks.classList.contains("open");

      if (wasOpen) {
        navLinks.classList.remove("open");
        if (hamburger) {
          hamburger.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        }
        document.body.style.overflow = "";
      }

      const delay = wasOpen ? 50 : 0;
      setTimeout(() => {
        const navbar = document.getElementById("navbar");
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetTop = targetElem.getBoundingClientRect().top + window.pageYOffset - (navHeight + 12);
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth"
        });
      }, delay);
    });
  });
}
function initActiveNavOnScroll() {
  const e = document.querySelectorAll("section[id], div[id]"),
    t = document.querySelectorAll(".nav-link");
  let ticking = false;
  const n = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const n = window.scrollY + 120;
        e.forEach((e) => {
          const o = e.offsetTop,
            r = o + e.offsetHeight;
          if (n >= o && n < r) {
            t.forEach((t) => {
              if (t.getAttribute("href") === `#${e.id}`) {
                t.classList.add("active");
              } else {
                t.classList.remove("active");
              }
            });
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", n, { passive: true });
  n();
}
const CASE_STUDIES_DATA = {
  apexlendcore: {
    tag: "Fintech & Core Banking • 100% Full Code Sale",
    status: '<i class="fas fa-code"></i> 100% Full Source Code Sale • CBSL Compliant',
    title: "Apex LendCore – Next-Generation Core Banking & Loan Management System",
    subtitle: "Complete Uncompiled Source Code Ownership • C# .NET 8, React, PostgreSQL & Double-Entry GL",
    liveUrl: "",
    metrics: [
      { num: "100%", label: "Source Code Sale" },
      { num: "CBSL", label: "Compliant Core" },
      { num: "< 5 Mins", label: "Loan Origination" },
      { num: "0", label: "Vendor Royalties" }
    ],
    challenge: "Commercial Banks, NBFIs, and Microfinance institutions struggle with manual credit scoring, expensive recurring per-user SaaS license fees, lack of core banking source code ownership, CBSL compliance overhead, and risky spreadsheet legacy migrations.",
    challengeList: [
      "Expensive SaaS licensing and vendor lock-in preventing financial institutions from owning and customizing their core banking IP.",
      "Manual loan origination and DSCR credit decisioning leading to weeks of approval bottlenecks.",
      "High compliance overhead meeting CBSL regulatory guidelines, Microfinance Act laws, and automated CRIB reporting.",
      "Complex, high-risk data migration when transitioning from legacy Excel sheets to an enterprise core banking ledger."
    ],
    solution: "Constructed an enterprise-grade Core Banking platform in C# / .NET 8 (ASP.NET Core Web API) using Clean Architecture and CQRS (MediatR + Dapper) with MS SQL Server / PostgreSQL. We sell the 100% Complete Source Code with full commercial IP transfer, multi-tier maker-checker approval matrices (Four-Eyes Principle), automated Sri Lankan NIC validation, CRIB batch generation, and ClosedXML automated migration engine.",
    solutionList: [
      "100% Full Uncompiled Source Code Package provided: C# / .NET 8 Clean Architecture backend, React frontend, database schemas, and deployment scripts.",
      "High-performance C# / .NET 8 Web API backend with Clean Architecture, Domain-Driven Design (DDD), and CQRS MediatR pipeline.",
      "Flexible interest calculation engine (Flat Rate, Reducing Balance EMI, Compound, Bullet) with loan restructuring and write-off recovery.",
      "Integrated Sri Lankan NIC validation (Old 9V/9X and New 12-digit), PEP/Sanctions screening, and automated CRIB reporting.",
      "Real-time double-entry General Ledger with automated trial balance snapshots, daily interest accruals, and petty cash logs.",
      "ClosedXML in-memory stream staging pipeline to validate, audit, and migrate legacy Excel/CSV loan portfolios in minutes."
    ],
    impact: "Delivers complete source code and operational independence, eliminating recurring software royalties, accelerating loan disbursements, and guaranteeing audit-proof regulatory compliance.",
    impactList: [
      "Complete Intellectual Property (IP) ownership with zero recurring per-user or annual SaaS license fees.",
      "100% regulatory compliance with CBSL standards, Microfinance Act, and IFRS 9 ECL provisioning.",
      "Loan decisioning and disbursement turnaround reduced from days to under 5 minutes.",
      "Zero double-entry accounting discrepancies with automated real-time general ledger sync.",
      "Total deployment freedom: Host on private bare-metal servers or cloud (AWS, Azure, GCP) with zero vendor lock-in."
    ],
    tech: [".NET 8", "C#", "ASP.NET Core", "Clean Architecture / CQRS", "MS SQL Server", "PostgreSQL", "MediatR", "Dapper", "EF Core 8", "ClosedXML", "Docker", "React / Next.js"]
  },
  apexlendmobile: {
    tag: "Fintech & Mobile Banking",
    status: '<i class="fas fa-mobile-screen"></i> Offline-First • Biometric & GPS Field Banking',
    title: "Apex LendMobile – Offline-First Field Banking & Doorstep Lending App",
    subtitle: "Biometric & GPS Geo-Fenced Mobile Suite for Rural Microfinance, Kendra Meetings & Thermal Printing",
    liveUrl: "",
    metrics: [
      { num: "100%", label: "Offline-First Sync" },
      { num: "GPS", label: "Geo-Fenced Audits" },
      { num: "0", label: "Ghost Collections" },
      { num: "ESC/POS", label: "Thermal Printing" }
    ],
    challenge: "Field officers and recovery agents conducting Kendra center meetings in remote rural areas faced zero cellular reception, paper collection sheets, till reconciliation discrepancies, and lack of physical payment receipts for borrowers.",
    challengeList: [
      "Zero cellular reception in rural villages preventing real-time access to active loan schedules.",
      "Paper-based center collection sheets resulting in end-of-day till imbalances and delayed branch ledger updates.",
      "Lack of instant physical payment proof for rural borrowers leading to disputes and fraud.",
      "No geolocation verification to audit whether field officers actually visited customer doorsteps."
    ],
    solution: "Engineered Apex LendMobile — an offline-first mobile banking application with encrypted on-device SQLite storage, HMAC packet validation, Bluetooth ESC/POS thermal printing, on-glass signature capture, and GPS geo-fenced meeting verification syncing seamlessly with the Apex LendCore backend.",
    solutionList: [
      "100% Offline-First architecture with local encrypted SQLite DB and automated SyncOutbox pipeline to the .NET 8 core backend.",
      "GPS Geo-fencing & timestamp verification for Kendra center meetings, doorstep collections, and follow-up visit logs.",
      "Instant Bluetooth ESC/POS portable thermal printer pairing for physical branded receipts and automated SMS notifications.",
      "Digital KYC document capture (NIC camera scanner, on-glass signature) and daily denomination cash count till reconciliation.",
      "Hardware device binding (X-Device-UUID) with remote wipe capability for lost or stolen field officer devices."
    ],
    impact: "Brings modern core banking directly to rural doorsteps while completely eliminating cash collection fraud and administrative delays.",
    impactList: [
      "100% field operational continuity in zero-reception rural areas with automated zero-packet-loss sync.",
      "Completely eliminated ghost collections with GPS-verified Kendra center roll-calls and instant thermal receipts.",
      "Automated end-of-day field till balancing with zero branch ledger discrepancies.",
      "Cross-platform support across Android and iOS with hardware-enforced encryption."
    ],
    tech: ["Flutter", "Dart", "Android / iOS", "SQLite (Encrypted)", "HMAC SHA-256", "Bluetooth ESC/POS", "GPS Geolocation", ".NET 8 Sync Gateway", "REST APIs"]
  },
  ayu: {
    tag: "Healthcare SaaS",
    status: '<i class="fas fa-link"></i> Live in Production',
    title: "Ayu Health Suite – Cloud Clinic & EMR Platform",
    subtitle: "Multi-tenant Electronic Medical Records, Billing & Pharmacy Management Suite",
    liveUrl: "https://ayuhealthsuite.online/",
    metrics: [
      { num: "70%", label: "Faster Check-In" },
      { num: "99.8%", label: "Rx Accuracy" },
      { num: "10k+", label: "WhatsApp Alerts" },
      { num: "0", label: "Billing Mismatches" }
    ],
    challenge: "Traditional paper-based clinics and multi-doctor outpatient practices suffered from severe queue congestion, misplaced physical files, prescription transcription errors, and inventory shrinkage in in-house pharmacies.",
    challengeList: [
      "Average patient registration & triage wait times exceeded 45 minutes per visit.",
      "Lack of real-time pharmacy inventory sync led to stock-outs of essential prescription drugs.",
      "Manual appointment reminders had high no-show rates (up to 32%).",
      "Siloed billing systems caused unrecorded consultations and revenue leakage."
    ],
    solution: "Axentra Tech engineered a high-concurrency, multi-tenant cloud EMR portal with granular role-based access control, reactive scheduling queues, barcode-enabled pharmacy batch management, and automated WhatsApp Business API integrations.",
    solutionList: [
      "Engineered on React + Vite frontend with PostgreSQL backend powered by Supabase with Row-Level Security (RLS).",
      "Automated digital prescription templates with dosage auto-checks to eliminate prescription mistakes.",
      "Integrated instant WhatsApp webhook engine dispatching appointment reminders and digital receipts directly to patient smartphones.",
      "Real-time FIFO inventory decrementing with automated low-stock vendor purchase alerts."
    ],
    impact: "Ayu Health Suite transformed clinic throughput and eliminated administrative overhead across all departments.",
    impactList: [
      "Patient check-in time reduced by 70% (from 45 mins to under 12 mins).",
      "Zero billing and inventory discrepancies across 5 departments.",
      "Patient appointment no-show rates dropped from 32% to under 6% via automated WhatsApp reminders.",
      "Over 10,000 automated patient alerts delivered in production."
    ],
    tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "Supabase (PostgreSQL)", "WhatsApp Business API", "TailwindCSS"]
  },
  worktera: {
    tag: "Enterprise HRMS",
    status: '<i class="fas fa-mobile-alt"></i> Web + Mobile App',
    title: "Worktera – Enterprise HRMS & Automated Payroll",
    subtitle: "End-to-End Workforce Management, Biometric Gateway & Mobile Self-Service",
    liveUrl: "",
    metrics: [
      { num: "85%", label: "Faster Payroll" },
      { num: "500+", label: "Active Profiles" },
      { num: "98%", label: "App Adoption" },
      { num: "100%", label: "Tax Compliance" }
    ],
    challenge: "Enterprises and educational institutes with hundreds of staff spent over 5 days every month reconciling CSV attendance dumps from physical fingerprint scanners, calculating complex multi-tier overtime, and sorting paper leave request slips.",
    challengeList: [
      "Biometric fingerprint logs had to be manually extracted via USB and manipulated in spreadsheets.",
      "Complex overtime formulas and tax bracket deductions caused frequent calculation errors.",
      "Paper-based leave approval chains resulted in lost requests and delayed staffing decisions.",
      "Employees lacked visibility into remaining leave balances and historical pay slips."
    ],
    solution: "Engineered a centralized Clean Architecture web suite in ASP.NET Core paired with a cross-platform Flutter mobile app, featuring automated hardware biometric sync, dynamic formula rule engine, and hierarchical approval workflows.",
    solutionList: [
      "Built with ASP.NET Core Web API, MS SQL Server, and an Angular admin portal for microsecond query response.",
      "Automated edge biometric gateway syncing punch logs via TCP/IP directly to cloud databases in real time.",
      "Flutter mobile companion app empowering employees to request leaves, view payslips, and check shifts.",
      "Automated multi-tier payroll engine with one-click bank CSV batch transfers."
    ],
    impact: "Drastically accelerated human resource operations and completely eliminated paper-based administrative friction.",
    impactList: [
      "Monthly payroll processing cycle slashed by 85% (from 5 business days to 45 minutes).",
      "Eliminated attendance tampering and buddy-punching with verified biometric gateway verification.",
      "98% staff adoption on the Flutter mobile app within 3 weeks of release.",
      "100% audit-proof leave and payroll compliance records."
    ],
    tech: ["Angular", "TypeScript", "ASP.NET Core", "C#", "MS SQL Server", "Flutter", "Docker", "JWT Auth"]
  },
  omnidesk: {
    tag: "ITSM & Helpdesk",
    status: '<i class="fas fa-layer-group"></i> Priority Enterprise Build',
    title: "OmniDesk – Reactive IT Support & SLA Orchestration Hub",
    subtitle: "Multi-tier Ticket Lifecycle Management, Real-time WebSockets & SLA Automation",
    liveUrl: "",
    metrics: [
      { num: "60%", label: "Faster Resolution" },
      { num: "99.4%", label: "SLA Compliance" },
      { num: "40%", label: "Auto-Routing" },
      { num: "3x", label: "Agent Output" }
    ],
    challenge: "High-growth organizations were losing track of internal IT requests and external client support issues due to scattered email inboxes, untracked Slack messages, and zero visibility into contract SLA deadlines.",
    challengeList: [
      "Critical server and application outage tickets sat unassigned for hours in shared mailboxes.",
      "Contractual SLA response times were breached with no alert system for managers.",
      "Support engineers lacked centralized history for recurring client system bugs.",
      "No analytical visibility into ticket volume trends, agent workloads, or customer satisfaction."
    ],
    solution: "Constructed a reactive multi-tier helpdesk with WebSocket event dispatching, intelligent category routing algorithms, deadline escalation triggers, and a transparent client portal.",
    solutionList: [
      "Built on React + TypeScript with ASP.NET Core and SignalR WebSockets for zero-refresh real-time updates.",
      "Automated email-to-ticket ingestion microservice with natural language category detection.",
      "Configurable SLA countdown timers with tiered escalation notifications via email and web push.",
      "Interactive customer-facing tracking portal for live ticket status and satisfaction ratings."
    ],
    impact: "Established a structured, measurable support pipeline that turned customer service into a competitive advantage.",
    impactList: [
      "Average ticket turnaround time dropped by 60% across all severity tiers.",
      "Achieved 99.4% SLA adherence with zero unassigned priority incidents.",
      "Tripled support agent throughput with automated categorization and canned macro responses.",
      "Managerial oversight improved with live real-time KPI reporting dashboards."
    ],
    tech: ["React", "TypeScript", "ASP.NET Core", "SignalR (WebSockets)", "MS SQL Server", "Chart.js", "Redis"]
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById("case-study-modal");
  const closeBtn = document.getElementById("case-modal-close");
  if (!modal) return;

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-case]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const caseKey = btn.dataset.openCase;
      const data = CASE_STUDIES_DATA[caseKey];
      if (!data) return;

      document.getElementById("modal-tag").textContent = data.tag;
      document.getElementById("modal-status").innerHTML = data.status;
      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-subtitle").textContent = data.subtitle;

      // Render metrics
      const metricsContainer = document.getElementById("modal-metrics");
      metricsContainer.innerHTML = data.metrics
        .map(
          (m) =>
            `<div class="modal-metric-card"><span class="num">${m.num}</span><span class="label">${m.label}</span></div>`
        )
        .join("");

      // Render challenges
      document.getElementById("modal-challenge").textContent = data.challenge;
      document.getElementById("modal-challenge-list").innerHTML = data.challengeList
        .map((c) => `<li>${c}</li>`)
        .join("");

      // Render solutions
      document.getElementById("modal-solution").textContent = data.solution;
      document.getElementById("modal-solution-list").innerHTML = data.solutionList
        .map((s) => `<li>${s}</li>`)
        .join("");

      // Render impacts
      document.getElementById("modal-impact").textContent = data.impact;
      document.getElementById("modal-impact-list").innerHTML = data.impactList
        .map((i) => `<li>${i}</li>`)
        .join("");

      // Render tech
      document.getElementById("modal-tech").innerHTML = data.tech
        .map((t) => `<span>${t}</span>`)
        .join("");

      // Live link
      const liveBtn = document.getElementById("modal-live-btn");
      if (data.liveUrl) {
        liveBtn.href = data.liveUrl;
        liveBtn.style.display = "inline-flex";
      } else {
        liveBtn.style.display = "none";
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn && closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

const CHATBOT_FAQ_DATA = [
  {
    id: "pricing",
    title: "Pricing & Quotes",
    icon: "fa-file-invoice-dollar",
    keywords: ["price", "pricing", "cost", "how much", "rate", "quote", "budget", "expensive", "charge", "payment", "milestone", "fee", "estimate", "usd", "lkr"],
    response: "<strong><i class='fas fa-file-invoice-dollar' style='color:#00e5ff; margin-right:6px;'></i>Project Pricing &amp; Estimates:</strong><br><br>We tailor our pricing to your exact project scope and architecture:<br><i class='fas fa-circle-check' style='color:#0fbf7b; margin-right:6px; font-size:0.75rem;'></i><strong>MVP / Rapid Prototypes:</strong> Cost-effective fixed packages for startups.<br><i class='fas fa-circle-check' style='color:#0fbf7b; margin-right:6px; font-size:0.75rem;'></i><strong>Custom Web &amp; Mobile Apps:</strong> Milestone-based sprints with clear deliverables.<br><i class='fas fa-circle-check' style='color:#0fbf7b; margin-right:6px; font-size:0.75rem;'></i><strong>Enterprise ERP &amp; SaaS:</strong> Dedicated engineering teams or fixed-bid contracts.<br><br>Ready for a transparent, no-obligation quote?",
    cta: { text: "Request Free Project Quote", href: "#contact" }
  },
  {
    id: "services",
    title: "Services We Offer",
    icon: "fa-cubes",
    keywords: ["service", "services", "offer", "what do you do", "build", "develop", "web", "mobile", "app", "custom software", "saas", "cloud", "api", "design"],
    response: "<strong><i class='fas fa-layer-group' style='color:#00e5ff; margin-right:6px;'></i>Our Core Engineering Services:</strong><br><br><i class='fas fa-globe' style='color:#00e5ff; margin-right:6px;'></i><strong>Custom Web Applications &amp; SaaS</strong> (React, TypeScript, Node.js, Vite)<br><i class='fas fa-mobile-screen-button' style='color:#00e5ff; margin-right:6px;'></i><strong>Cross-Platform Mobile Apps</strong> (Flutter &amp; React Native for iOS &amp; Android)<br><i class='fas fa-heart-pulse' style='color:#00e5ff; margin-right:6px;'></i><strong>Cloud Healthcare &amp; EMR Suites</strong> (Patient triage, pharmacy sync, WhatsApp notifications)<br><i class='fas fa-building' style='color:#00e5ff; margin-right:6px;'></i><strong>Enterprise ERP, HRMS &amp; Payroll</strong> (Automated biometric sync, tax compliance)<br><i class='fas fa-cloud' style='color:#00e5ff; margin-right:6px;'></i><strong>Cloud Architecture &amp; APIs</strong> (AWS, PostgreSQL, Supabase, Redis, Docker)",
    cta: { text: "Explore All Services", href: "#services" }
  },
  {
    id: "timelines",
    title: "Delivery Timelines",
    icon: "fa-stopwatch",
    keywords: ["time", "timeline", "duration", "how long", "speed", "fast", "deadline", "weeks", "months", "delivery", "turnaround"],
    response: "<strong><i class='fas fa-stopwatch' style='color:#00e5ff; margin-right:6px;'></i>Typical Project Timelines:</strong><br><br><i class='fas fa-bolt' style='color:#00e5ff; margin-right:6px;'></i><strong>Rapid MVP / Landing System:</strong> 2 to 4 weeks<br><i class='fas fa-laptop-code' style='color:#00e5ff; margin-right:6px;'></i><strong>Custom Business SaaS / Web App:</strong> 4 to 8 weeks<br><i class='fas fa-network-wired' style='color:#00e5ff; margin-right:6px;'></i><strong>Enterprise ERP / Healthcare System:</strong> 8 to 14 weeks<br><br><i class='fas fa-arrows-rotate' style='color:#0fbf7b; margin-right:6px;'></i>We run <strong>2-week Agile sprints</strong> with live staging demos so you see tangible progress every step of the way.",
    cta: { text: "Discuss Your Deadline", href: "#contact" }
  },
  {
    id: "techstack",
    title: "Tech Stack",
    icon: "fa-code",
    keywords: ["tech", "technology", "stack", "react", "flutter", "node", "dotnet", ".net", "c#", "angular", "python", "database", "sql", "postgres", "supabase", "aws", "docker"],
    response: "<strong><i class='fas fa-microchip' style='color:#00e5ff; margin-right:6px;'></i>Our Modern Tech Stack:</strong><br><br><i class='fas fa-code' style='color:#00e5ff; margin-right:6px;'></i><strong>Frontend:</strong> React, TypeScript, Next.js, Vite, Angular, TailwindCSS<br><i class='fas fa-mobile-screen' style='color:#00e5ff; margin-right:6px;'></i><strong>Mobile:</strong> Flutter, Dart, React Native (iOS &amp; Android)<br><i class='fas fa-server' style='color:#00e5ff; margin-right:6px;'></i><strong>Backend:</strong> ASP.NET Core, C#, Node.js, Express, Python<br><i class='fas fa-database' style='color:#00e5ff; margin-right:6px;'></i><strong>Databases &amp; Cloud:</strong> PostgreSQL, Supabase (RLS), MS SQL Server, Redis, AWS S3, Docker",
    cta: { text: "View Engineering Case Studies", href: "#portfolio" }
  },
  {
    id: "casestudies",
    title: "Case Studies & Proof",
    icon: "fa-briefcase",
    keywords: ["portfolio", "work", "case study", "case studies", "example", "past", "apex", "lendcore", "lendmobile", "lending", "banking", "microfinance", "cbsl", "ayu", "health", "worktera", "omnidesk", "live"],
    response: "<strong><i class='fas fa-diagram-project' style='color:#00e5ff; margin-right:6px;'></i>Featured Production &amp; Enterprise Systems:</strong><br><br><i class='fas fa-landmark' style='color:#00e5ff; margin-right:6px;'></i><strong>Apex LendCore:</strong> CBSL-compliant Core Banking &amp; Microfinance loan management suite (.NET 8 &amp; React)<br><i class='fas fa-mobile-screen-button' style='color:#00e5ff; margin-right:6px;'></i><strong>Apex LendMobile:</strong> Offline-first biometric, GPS &amp; thermal printing field banking mobile app<br><i class='fas fa-heart-pulse' style='color:#00e5ff; margin-right:6px;'></i><strong>Ayu Health Suite:</strong> Live Cloud Clinic &amp; WhatsApp EMR platform (<a href='https://ayuhealthsuite.online/' target='_blank' style='color:#00e5ff;text-decoration:underline;'>Live Site</a>)<br><i class='fas fa-users-gear' style='color:#00e5ff; margin-right:6px;'></i><strong>Worktera HRMS:</strong> Enterprise workforce &amp; automated biometric payroll system<br><i class='fas fa-ticket' style='color:#00e5ff; margin-right:6px;'></i><strong>OmniDesk ITSM:</strong> Reactive helpdesk with WebSocket SLA orchestration",
    cta: { text: "Explore Case Studies", href: "#portfolio" }
  },
  {
    id: "nda",
    title: "Security & NDAs",
    icon: "fa-shield-halved",
    keywords: ["nda", "security", "ip", "intellectual property", "ownership", "source code", "confidential", "privacy", "contract", "safe"],
    response: "<strong><i class='fas fa-shield-halved' style='color:#0fbf7b; margin-right:6px;'></i>Security &amp; 100% IP Ownership:</strong><br><br><i class='fas fa-lock' style='color:#00e5ff; margin-right:6px;'></i><strong>You Own 100% of the Code:</strong> All intellectual property, source code repositories, and database schemas belong entirely to you upon completion.<br><br><i class='fas fa-file-contract' style='color:#0fbf7b; margin-right:6px;'></i><strong>Bilateral NDAs:</strong> We sign strict Non-Disclosure Agreements prior to any discovery discussions to keep your proprietary workflows strictly confidential.",
    cta: { text: "Schedule Confidential Call", href: "#contact" }
  },
  {
    id: "contact",
    title: "Talk to Our Team",
    icon: "fa-headset",
    keywords: ["contact", "call", "whatsapp", "email", "hire", "talk", "human", "consultant", "phone", "location", "colombo", "sri lanka", "meeting", "book"],
    response: "<strong><i class='fas fa-comments' style='color:#00e5ff; margin-right:6px;'></i>Connect Directly with Axentra Tech:</strong><br><br><i class='fab fa-whatsapp' style='color:#25d366; margin-right:6px;'></i><strong>WhatsApp:</strong> <a href='https://wa.me/94771757556' target='_blank' style='color:#25d366; font-weight:600; text-decoration:underline;'>+94 77 175 7556 (Chat Now)</a><br><i class='fas fa-phone' style='color:#00e5ff; margin-right:6px;'></i><strong>Phone:</strong> <a href='tel:+94771757556' style='color:#00e5ff;'>077 175 7556</a><br><i class='fas fa-envelope' style='color:#00e5ff; margin-right:6px;'></i><strong>Email:</strong> <a href='mailto:axentrat@gmail.com' style='color:#00e5ff;'>axentrat@gmail.com</a><br><i class='fas fa-location-dot' style='color:#00e5ff; margin-right:6px;'></i><strong>Headquarters:</strong> Pannipitiya / Colombo, Sri Lanka<br><i class='fas fa-bolt' style='color:#0fbf7b; margin-right:6px;'></i><strong>Response Time:</strong> Within 4 business hours",
    cta: { text: "Chat on WhatsApp", href: "https://wa.me/94771757556" }
  }
];

function initChatbot() {
  const container = document.getElementById("chatbot-container");
  const toggleBtn = document.getElementById("chatbot-toggle");
  const windowEl = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chatbot-close");
  const resetBtn = document.getElementById("chatbot-reset");
  const messagesEl = document.getElementById("chatbot-messages");
  const typingEl = document.getElementById("chatbot-typing");
  const formEl = document.getElementById("chatbot-form");
  const inputEl = document.getElementById("chatbot-input");
  const teaserEl = document.getElementById("chatbot-teaser");
  const teaserClose = document.getElementById("teaser-close");

  if (!container || !toggleBtn || !messagesEl) return;

  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function appendMessage(sender, htmlContent, ctaObj, showChips) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-msg", sender);

    let contentHtml = `<div class="chat-bubble">${htmlContent}`;
    if (ctaObj) {
      contentHtml += `<br><a href="${ctaObj.href}" class="chat-cta-btn" onclick="document.getElementById('chatbot-container').classList.remove('open')"><span>${ctaObj.text}</span> <i class="fas fa-arrow-right"></i></a>`;
    }
    contentHtml += `</div><span class="chat-time">${getTimeString()}</span>`;

    msgDiv.innerHTML = contentHtml;
    messagesEl.appendChild(msgDiv);

    if (showChips) {
      renderTopicChips();
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderTopicChips() {
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("chat-quick-actions");
    actionsDiv.innerHTML = `<span class="chat-quick-title"><i class="fas fa-layer-group" style="color:var(--clr-primary);margin-right:4px;"></i> Frequently Asked Topics:</span>`;

    const grid = document.createElement("div");
    grid.classList.add("chat-chips-grid");

    CHATBOT_FAQ_DATA.forEach((faq) => {
      const chip = document.createElement("button");
      chip.classList.add("chat-faq-chip");
      chip.innerHTML = `<i class="fas ${faq.icon}"></i> <span>${faq.title}</span>`;
      chip.addEventListener("click", () => {
        handleUserQuery(faq.title, faq);
      });
      grid.appendChild(chip);
    });

    actionsDiv.appendChild(grid);
    messagesEl.appendChild(actionsDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderWelcomeGreeting() {
    messagesEl.innerHTML = "";
    appendMessage(
      "bot",
      "<strong><i class='fas fa-robot' style='color:#00e5ff; margin-right:6px;'></i>Hello! I'm Axentra Virtual Consultant.</strong><br>How can I assist your software engineering or digital transformation project today?",
      null,
      true
    );
  }

  function findBestFaqMatch(queryText) {
    const text = queryText.toLowerCase().trim();
    let bestMatch = null;
    let highestScore = 0;

    CHATBOT_FAQ_DATA.forEach((faq) => {
      let score = 0;
      faq.keywords.forEach((kw) => {
        if (text.includes(kw)) {
          score += kw.length;
        }
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    return highestScore > 0 ? bestMatch : null;
  }

  function handleUserQuery(displayText, specificFaq) {
    appendMessage("user", displayText, null, false);
    inputEl.value = "";

    // Show typing indicator
    typingEl.style.display = "flex";
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      typingEl.style.display = "none";

      const matchedFaq = specificFaq || findBestFaqMatch(displayText);

      if (matchedFaq) {
        appendMessage("bot", matchedFaq.response, matchedFaq.cta, true);
      } else {
        appendMessage(
          "bot",
          "<strong><i class='fas fa-circle-info' style='color:#00e5ff; margin-right:6px;'></i>Thank you for reaching out!</strong> While I'm specialized in our core services and engineering models, our senior solutions architect will be delighted to give you a customized answer.",
          { text: "Connect with Solutions Team", href: "#contact" },
          true
        );
      }
    }, 450);
  }

  function openChat() {
    container.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    if (teaserEl) teaserEl.classList.add("hidden");
    setTimeout(() => inputEl && inputEl.focus(), 300);
  }

  function closeChat() {
    container.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  function toggleChat() {
    if (container.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  }

  // Event Listeners
  toggleBtn.addEventListener("click", toggleChat);
  closeBtn && closeBtn.addEventListener("click", closeChat);
  resetBtn && resetBtn.addEventListener("click", renderWelcomeGreeting);

  if (teaserEl) {
    teaserEl.addEventListener("click", openChat);
  }
  if (teaserClose) {
    teaserClose.addEventListener("click", (e) => {
      e.stopPropagation();
      teaserEl.classList.add("hidden");
    });
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = inputEl.value.trim();
    if (!query) return;
    handleUserQuery(query);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && container.classList.contains("open")) {
      closeChat();
    }
  });

  // Render initial greeting
  renderWelcomeGreeting();
}

function initSocialSideDock() {
  const dock = document.getElementById("social-side-dock");
  if (!dock) return;

  const items = dock.querySelectorAll(".social-side-item");
  let lastTapTime = 0;
  let lastTappedItem = null;

  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      if (!isTouch) return; // Desktop mouse hover handled via CSS

      const currentTime = new Date().getTime();
      const tapInterval = currentTime - lastTapTime;
      const isExpanded = item.classList.contains("expanded");

      // Double tap detected -> collapse
      if (isExpanded && lastTappedItem === item && tapInterval < 450 && tapInterval > 0) {
        e.preventDefault();
        item.classList.remove("expanded");
        lastTappedItem = null;
        lastTapTime = 0;
        return;
      }

      // First tap -> expand to reveal name and link
      if (!isExpanded) {
        e.preventDefault();
        items.forEach((other) => other.classList.remove("expanded"));
        item.classList.add("expanded");
        lastTappedItem = item;
        lastTapTime = currentTime;
      } else {
        // Second single tap while expanded -> navigate to social profile
        setTimeout(() => {
          item.classList.remove("expanded");
          lastTappedItem = null;
        }, 500);
      }
    });
  });

  // Tap outside dock collapses any active item
  document.addEventListener("click", (e) => {
    if (!dock.contains(e.target)) {
      items.forEach((item) => item.classList.remove("expanded"));
      lastTappedItem = null;
    }
  });

  document.addEventListener(
    "touchstart",
    (e) => {
      if (!dock.contains(e.target)) {
        items.forEach((item) => item.classList.remove("expanded"));
        lastTappedItem = null;
      }
    },
    { passive: true }
  );
}

function initCookieConsent() {
  const card = document.getElementById("cookie-consent-card");
  const acceptBtn = document.getElementById("cookie-accept-btn");
  const declineBtn = document.getElementById("cookie-decline-btn");
  const closeBtn = document.getElementById("cookie-close-btn");

  if (!card) return;

  const CONSENT_KEY = "axentra_cookie_consent";
  const savedConsent = localStorage.getItem(CONSENT_KEY);

  function showBanner() {
    card.style.display = "block";
    setTimeout(() => {
      card.classList.add("visible");
    }, 60);
  }

  function hideBanner(choice) {
    if (choice) {
      try {
        localStorage.setItem(CONSENT_KEY, choice);
      } catch (err) {
        console.warn("Could not save cookie consent:", err);
      }
    }
    card.classList.remove("visible");
    setTimeout(() => {
      card.style.display = "none";
    }, 450);
  }

  // Show banner if not previously accepted or declined
  if (!savedConsent) {
    setTimeout(showBanner, 1200);
  }

  acceptBtn && acceptBtn.addEventListener("click", () => hideBanner("accepted"));
  declineBtn && declineBtn.addEventListener("click", () => hideBanner("declined"));
  closeBtn && closeBtn.addEventListener("click", () => hideBanner("dismissed"));
}

function initShowcaseSlider() {
  const slider = document.getElementById("showcaseSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide, .showcase-slide");
  const prevBtn = document.getElementById("showcasePrev");
  const nextBtn = document.getElementById("showcaseNext");
  const indicatorContainer = document.getElementById("showcaseIndicators");
  const dots = indicatorContainer ? indicatorContainer.querySelectorAll(".showcase-dot") : [];
  const tabs = document.querySelectorAll(".showcase-tab-btn");
  const progressBar = document.getElementById("showcaseProgressBar");

  if (!slides.length) return;

  let currentIndex = 0;
  let progressAnim = null;
  let startTime = null;
  let pausedElapsed = 0;
  let isPaused = false;
  const AUTO_PLAY_DELAY = 7000; // 7-second sequence change

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
        slide.setAttribute("aria-hidden", "false");
      } else {
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-selected", "true");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
      }
    });

    tabs.forEach((tab, i) => {
      if (i === currentIndex) {
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        if (window.innerWidth <= 768) {
          tab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
        }
      } else {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      }
    });

    resetTimer();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function stepProgress(timestamp) {
    if (!startTime) startTime = timestamp - pausedElapsed;
    const elapsed = timestamp - startTime;
    const pct = Math.min(100, (elapsed / AUTO_PLAY_DELAY) * 100);

    if (progressBar) {
      progressBar.style.width = pct + "%";
    }

    const activeTab = tabs[currentIndex];
    if (activeTab) {
      const line = activeTab.querySelector(".tab-progress-line");
      if (line) line.style.width = pct + "%";
    }

    if (elapsed >= AUTO_PLAY_DELAY) {
      nextSlide();
    } else if (!isPaused) {
      progressAnim = requestAnimationFrame(stepProgress);
    }
  }

  function resetTimer() {
    if (progressAnim) {
      cancelAnimationFrame(progressAnim);
      progressAnim = null;
    }
    if (progressBar) {
      progressBar.style.width = "0%";
    }
    tabs.forEach((tab) => {
      const line = tab.querySelector(".tab-progress-line");
      if (line) line.style.width = "0%";
    });
    startTime = null;
    pausedElapsed = 0;
    if (!isPaused) {
      progressAnim = requestAnimationFrame(stepProgress);
    }
  }

  function pauseTimer() {
    isPaused = true;
    if (progressAnim) {
      cancelAnimationFrame(progressAnim);
      progressAnim = null;
    }
    if (startTime) {
      pausedElapsed = performance.now() - startTime;
    }
  }

  function resumeTimer() {
    if (!isPaused) return;
    isPaused = false;
    startTime = performance.now() - pausedElapsed;
    progressAnim = requestAnimationFrame(stepProgress);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        showSlide(idx);
      }
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        showSlide(idx);
      }
    });
  });

  // Pause on hover
  const heroSection = slider.closest(".hero") || slider;
  heroSection.addEventListener("mouseenter", pauseTimer);
  heroSection.addEventListener("mouseleave", resumeTimer);

  // Touch Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseTimer();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        resumeTimer();
      }
    },
    { passive: true }
  );

  // Keyboard navigation when focused
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  showSlide(0);
}

document.addEventListener("DOMContentLoaded", () => {
  (initPreloader(),
    initNavbar(),
    initHamburger(),
    initParticles(),
    initAOS(),
    initCounters(),
    initTestimonialsSlider(),
    initPortfolioFilter(),
    initContactForm(),
    initNewsletterForm(),
    initBackToTop(),
    initFooterYear(),
    initSmoothScroll(),
    initActiveNavOnScroll(),
    initTemplateLightbox(),
    initCaseStudyModal(),
    initChatbot(),
    initSocialSideDock(),
    initCookieConsent(),
    initShowcaseSlider());
});





