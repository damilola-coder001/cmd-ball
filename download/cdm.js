/* =========================================================
   $CDM — the ball that never stops rolling
   Scripts: particle background, scroll-triggered fade-ins,
            progress line, copy-to-clipboard, side rail,
            image parallax, smooth scroll.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Gold dust particle background ---------- */
  const canvas = document.getElementById("particles");
  let ctx = null;
  let particles = [];
  let canvasW = 0, canvasH = 0;
  let prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resizeCanvas();
    buildParticles();
    if (!prefersReduced) requestAnimationFrame(animateParticles);
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + "px";
    canvas.style.height = canvasH + "px";
    ctx.scale(dpr, dpr);
  }

  function buildParticles() {
    const count = Math.min(80, Math.floor((canvasW * canvasH) / 18000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        r: Math.random() * 1.4 + 0.3,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.6 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.twinkle += 0.02;
      const tw = (Math.sin(p.twinkle) + 1) / 2;
      const alpha = p.alpha * (0.4 + tw * 0.6);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212, 175, 55, " + alpha + ")";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(212, 175, 55, 0.5)";
      ctx.fill();

      if (p.y < -10) { p.y = canvasH + 10; p.x = Math.random() * canvasW; }
      if (p.x < -10) p.x = canvasW + 10;
      if (p.x > canvasW + 10) p.x = -10;
    }
    requestAnimationFrame(animateParticles);
  }

  if (canvas) {
    initCanvas();
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resizeCanvas();
        buildParticles();
      }, 200);
    });
  }

  /* ---------- 2. Progress line ---------- */
  const progressLine = document.querySelector(".progress-line span");
  function updateProgress() {
    if (!progressLine) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progressLine.style.width = pct + "%";
  }

  /* ---------- 3. Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 4. Throttled scroll (progress + rail) ---------- */
  const railLinks = document.querySelectorAll(".rail a");
  const chapterEls = document.querySelectorAll(".chapter");

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateRail();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
  updateRail();

  /* ---------- 5. Side rail active state ---------- */
  function updateRail() {
    if (!railLinks.length) return;
    let activeIdx = 0;
    const viewportCenter = window.innerHeight * 0.4;
    chapterEls.forEach(function (ch, i) {
      const rect = ch.getBoundingClientRect();
      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        activeIdx = i;
      }
    });
    railLinks.forEach(function (link, i) {
      link.classList.toggle("active", i === activeIdx);
    });
  }

  /* ---------- 6. Copy contract address ---------- */
  const copyBtn = document.getElementById("copy-btn");
  const addressEl = document.getElementById("contract-address");
  if (copyBtn && addressEl) {
    copyBtn.addEventListener("click", function () {
      const text = addressEl.textContent.trim();
      const showCopied = function () {
        copyBtn.classList.add("copied");
        setTimeout(function () { copyBtn.classList.remove("copied"); }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        const range = document.createRange();
        range.selectNode(addressEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand("copy"); showCopied(); } catch (e) {}
        sel.removeAllRanges();
      }
    });
  }

  /* ---------- 7. Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.replaceState) history.replaceState(null, "", targetId);
      }
    });
  });

  /* ---------- 8. Hero orb subtle mouse parallax ---------- */
  const orbWrap = document.querySelector(".orb-wrap");
  if (orbWrap && window.matchMedia("(pointer: fine)").matches) {
    const hero = document.querySelector(".hero");
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      orbWrap.style.transform = "translate(" + (x * 12) + "px, " + (y * 12) + "px)";
    });
    hero.addEventListener("mouseleave", function () { orbWrap.style.transform = ""; });
  }

  /* ---------- 9. Parallax on chapter background images ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  function updateParallax() {
    if (!parallaxEls.length || !window.matchMedia("(pointer: fine)").matches) return;
    const viewportH = window.innerHeight;
    parallaxEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const distance = elCenter - viewportCenter;
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const offset = distance * speed;
      const img = el.querySelector("img");
      if (img) img.style.transform = "translate3d(0, " + offset + "px, 0)";
    });
  }
})();
