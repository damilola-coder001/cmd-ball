/* =========================================================
   $CDM — the ball that never stops rolling
   Scripts: scroll-triggered fade-ins, progress bar,
            copy-to-clipboard, smooth-scroll polish.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Progress line ---------- */
  const progressLine = document.querySelector(".progress-line span");
  function updateProgress() {
    if (!progressLine) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progressLine.style.width = pct + "%";
  }

  /* ---------- 2. Fade-in on scroll (IntersectionObserver) ---------- */
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything
    fadeEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 3. Throttled scroll listener ---------- */
  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  updateProgress();

  /* ---------- 4. Copy contract address ---------- */
  const copyBtn = document.getElementById("copy-btn");
  const addressEl = document.getElementById("contract-address");

  if (copyBtn && addressEl) {
    copyBtn.addEventListener("click", function () {
      const text = addressEl.textContent.trim();

      const showCopied = function () {
        copyBtn.classList.add("copied");
        window.setTimeout(function () {
          copyBtn.classList.remove("copied");
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(showCopied)
          .catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        const range = document.createRange();
        range.selectNode(addressEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
          document.execCommand("copy");
          showCopied();
        } catch (e) {
          // silently fail
        }
        sel.removeAllRanges();
      }
    });
  }

  /* ---------- 5. Smooth-scroll offset for anchored sections ---------- */
  // CSS handles `scroll-behavior: smooth`; here we just make sure
  // the page never lands awkwardly under any future fixed header.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // update hash without jumping
        if (history.replaceState) {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });

  /* ---------- 6. Subtle parallax on hero ball ---------- */
  const ballWrap = document.querySelector(".orb-wrap");
  if (ballWrap && window.matchMedia("(pointer: fine)").matches) {
    const hero = document.querySelector(".hero");
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ballWrap.style.transform =
        "translate(" + (x * 10) + "px, " + (y * 10) + "px)";
    });
    hero.addEventListener("mouseleave", function () {
      ballWrap.style.transform = "";
    });
  }

  /* ---------- 7. Parallax on chapter images ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");

  if (parallaxEls.length && window.matchMedia("(pointer: fine)").matches) {
    let scrollTicking = false;

    function updateParallax() {
      const viewportH = window.innerHeight;
      parallaxEls.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const distance = elCenter - viewportCenter;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const offset = distance * speed;

        const img = el.querySelector("img");
        if (img) {
          img.style.transform = "translate3d(0, " + offset + "px, 0)";
        }
      });
      scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateParallax);
          scrollTicking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }
})();
