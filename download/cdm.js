/* =========================================================
   $CDM — the ball that never stops rolling
   Scripts: unified visual system
   --------------------------------------------------------
   - Gold dust particle field (the ball's shed material)
   - Rolling ball progress (the ball literally rolls across the top)
   - Side rail with active ball glow
   - Parallax on chapter backgrounds
   - Hero orb mouse parallax
   - Smooth scroll
   - Copy contract
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineCursor = window.matchMedia("(pointer: fine)").matches;

  /* ---------- 1. Gold dust particle field ---------- */
  /* The ball sheds gold particles as it rolls. They drift up slowly,
     like dust motes caught in amber light. */
  const canvas = document.getElementById("particles");
  let ctx = null, particles = [], canvasW = 0, canvasH = 0;

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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function buildParticles() {
    const count = Math.min(70, Math.floor((canvasW * canvasH) / 22000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        r: Math.random() * 1.3 + 0.3,
        vy: -(Math.random() * 0.22 + 0.04),
        vx: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.55 + 0.15,
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
      p.twinkle += 0.018;
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

  /* ---------- 2. Rolling ball progress ---------- */
  /* The ball rolls across the top edge as you scroll, completing
     the journey from Bounce 0 to Bounce IX. */
  const progressLine = document.querySelector(".progress-line");
  const progressBall = document.querySelector(".progress-ball");

  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    if (progressLine) progressLine.style.width = pct + "%";
    if (progressBall) progressBall.style.left = pct + "%";
  }

  /* ---------- 3. Fade-in observer ---------- */
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

  /* ---------- 4. Side rail active state ---------- */
  const railLinks = document.querySelectorAll(".rail a");
  const chapterEls = document.querySelectorAll(".chapter");

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

  /* ---------- 5. Parallax on chapter backgrounds ---------- */
  /* The ball's moments drift slightly slower than the scroll,
     like memories persisting as you pass through them. */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  function updateParallax() {
    if (!parallaxEls.length || !fineCursor || prefersReduced) return;
    const viewportH = window.innerHeight;
    parallaxEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const distance = elCenter - viewportCenter;
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const offset = distance * speed;
      const img = el.querySelector("img");
      if (img) img.style.transform = "translate3d(0, " + offset + "px, 0)";
    });
  }

  /* ---------- 6. Throttled scroll ---------- */
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
  updateParallax();

  /* ---------- 7. Copy contract ---------- */
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
      } else { fallbackCopy(); }
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

  /* ---------- 8. Smooth scroll for in-page links ---------- */
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

  /* ---------- 9. Hero orb mouse parallax ---------- */
  const orbWrap = document.querySelector(".hero-orb");
  if (orbWrap && fineCursor && !prefersReduced) {
    const hero = document.querySelector(".hero");
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      orbWrap.style.transform = "translate(" + (x * 14) + "px, " + (y * 14) + "px)";
    });
    hero.addEventListener("mouseleave", function () { orbWrap.style.transform = ""; });
  }
})();
