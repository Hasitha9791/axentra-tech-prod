"use strict";
function initPreloader() {
  const e = document.getElementById("preloader");
  if (!e) return;
  const t = e.querySelector(".preloader-bar span"),
    n = e.querySelector(".preloader-percent");
  let o = 0,
    r = !1;
  function i(e) {
    ((o = Math.min(e, 100)),
      t && (t.style.width = o + "%"),
      n && (n.textContent = o + "%"));
  }
  document.body.style.overflow = "hidden";
  const s = setInterval(() => {
    o < 85 ? i(o + (4 * Math.random() + 1)) : clearInterval(s);
  }, 60);
  function a() {
    r ||
      ((r = !0),
      clearInterval(s),
      i(100),
      setTimeout(() => {
        (e.classList.add("hidden"), (document.body.style.overflow = ""));
      }, 500));
  }
  (window.addEventListener("load", () => setTimeout(a, 300)),
    setTimeout(a, 4e3));
}
function initNavbar() {
  const e = document.getElementById("navbar");
  if (!e) return;
  const t = () => {
    window.scrollY > 50
      ? e.classList.add("scrolled")
      : e.classList.remove("scrolled");
  };
  (window.addEventListener("scroll", t, { passive: !0 }), t());
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
    t.querySelectorAll(".nav-link").forEach((n) => {
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
  for (let t = 0; t < 40; t++) {
    const t = document.createElement("div");
    t.classList.add("particle");
    const n = 100 * Math.random(),
      o = 3 * Math.random() + 1,
      r = 15 * Math.random(),
      i = 12 * Math.random() + 8,
      s = 200 * (Math.random() - 0.5) + "px";
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
    o = document.getElementById("lightbox-close");
  function r() {
    (e.classList.remove("active"), (document.body.style.overflow = ""));
  }
  e &&
    (document
      .querySelectorAll(".template-preview[data-lightbox]")
      .forEach((o) => {
        o.addEventListener("click", () => {
          ((t.src = o.dataset.lightbox),
            (t.alt = o.dataset.title || "Template Preview"),
            (n.textContent = o.dataset.title || "Template Preview"),
            e.classList.add("active"),
            (document.body.style.overflow = "hidden"));
        });
      }),
    o.addEventListener("click", r),
    e.addEventListener("click", (t) => {
      t.target === e && r();
    }),
    document.addEventListener("keydown", (e) => {
      "Escape" === e.key && r();
    }));
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
  document.querySelectorAll('a[href^="#"]').forEach((e) => {
    e.addEventListener("click", (t) => {
      const n = e.getAttribute("href");
      if (!n || "#" === n) return;
      const o = document.querySelector(n);
      if (!o) return;
      t.preventDefault();
      const r = o.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: r, behavior: "smooth" });
    });
  });
}
function initActiveNavOnScroll() {
  const e = document.querySelectorAll("section[id], div[id]"),
    t = document.querySelectorAll(".nav-link"),
    n = () => {
      const n = window.scrollY + 120;
      e.forEach((e) => {
        const o = e.offsetTop,
          r = o + e.offsetHeight;
        n >= o &&
          n < r &&
          t.forEach((t) => {
            (t.classList.remove("active"),
              t.getAttribute("href") === `#${e.id}` &&
                t.classList.add("active"));
          });
      });
    };
  (window.addEventListener("scroll", n, { passive: !0 }), n());
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
    initTemplateLightbox());
});
