/* Lee Elder — portfolio behaviour.
   Theme is already applied by the inline bootstrap in <head>; everything here
   is progressive enhancement and degrades to a fully readable page without it. */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const THEME_KEY = "le-theme";

  /* --- Theme ------------------------------------------------------------ */

  const readTheme = () => (root.dataset.theme === "day" ? "day" : "night");

  const applyTheme = (theme) => {
    if (theme === "day") root.dataset.theme = "day";
    else delete root.dataset.theme;

    const label =
      theme === "day" ? "Switch to night mode" : "Switch to day mode";
    document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
      el.setAttribute("aria-label", label);
      if (el.title) el.title = label;
    });

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "day" ? "#f4efff" : "#120a2a";
  };

  const toggleTheme = () => {
    const next = readTheme() === "day" ? "night" : "day";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* private mode — the choice just won't persist */
    }
  };

  applyTheme(readTheme());
  document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
    el.addEventListener("click", toggleTheme);
  });

  /* --- Star field -------------------------------------------------------
     One star per cell of a jittered grid: the grid keeps coverage even, the
     jitter stops it looking like graph paper. Driven off a fixed seed so the
     sky is identical on every visit rather than reshuffling on each reload.
     ---------------------------------------------------------------------- */

  const STARS = {
    seed: 20270601, // graduation day — any constant would do
    columns: 7,
    rows: 3,
    band: 0.55, // stars occupy the top 55% of the sky; hills own the bottom
    radius: [2, 3], // px
    opacity: [0.25, 0.5],
  };

  // mulberry32: small, fast, and good enough for scattering dots.
  const seededRandom = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const starField = document.querySelector("[data-stars]");

  if (starField) {
    const rand = seededRandom(STARS.seed);
    const lerp = ([min, max]) => min + rand() * (max - min);
    const svgNS = "http://www.w3.org/2000/svg";
    const frag = document.createDocumentFragment();

    for (let row = 0; row < STARS.rows; row++) {
      for (let col = 0; col < STARS.columns; col++) {
        const star = document.createElementNS(svgNS, "circle");
        // Percentage coordinates, so the field reflows with the viewport.
        star.setAttribute("cx", `${((col + rand()) / STARS.columns) * 100}%`);
        star.setAttribute(
          "cy",
          `${((row + rand()) / STARS.rows) * STARS.band * 100}%`
        );
        star.setAttribute("r", lerp(STARS.radius).toFixed(2));
        star.setAttribute("opacity", lerp(STARS.opacity).toFixed(2));
        frag.appendChild(star);
      }
    }

    starField.appendChild(frag);
  }

  /* --- Scroll reveal ---------------------------------------------------- */

  const revealables = document.querySelectorAll("[data-reveal]");

  if (revealables.length && "IntersectionObserver" in window) {
    root.classList.add("js-reveal");

    if (reduced) {
      revealables.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            el.classList.toggle("is-visible", entry.isIntersecting);
            el.classList.toggle(
              "is-above",
              !entry.isIntersecting && entry.boundingClientRect.top < 0
            );
          });
        },
        { rootMargin: "-6% 0px -12% 0px" }
      );
      revealables.forEach((el) => observer.observe(el));
    }
  }

  /* --- Nav scroll spy --------------------------------------------------- */

  // Only same-page hash links can be spied on. Project pages link back out to
  // "../index.html#work", which is not a valid selector and would throw.
  const pairs = Array.from(document.querySelectorAll("[data-nav-link]"))
    .map((link) => {
      const href = link.getAttribute("href") || "";
      return {
        link,
        section: href.startsWith("#") ? document.querySelector(href) : null,
      };
    })
    .filter((pair) => pair.section);

  if (pairs.length) {
    let queued = false;

    const update = () => {
      queued = false;
      let current = null;

      pairs.forEach((pair) => {
        if (pair.section.getBoundingClientRect().top <= 140) current = pair;
      });

      // Near the bottom of the page the last section may never cross the
      // threshold, so claim it once it is mostly in view.
      if (!current) {
        const last = pairs[pairs.length - 1];
        if (last.section.getBoundingClientRect().bottom < window.innerHeight * 0.5) {
          current = last;
        }
      }

      pairs.forEach((pair) => {
        if (pair === current) pair.link.setAttribute("aria-current", "true");
        else pair.link.removeAttribute("aria-current");
      });
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
  }

  /* --- The cat ---------------------------------------------------------- */

  const cat = document.querySelector("[data-cat]");

  if (cat && !reduced) {
    const eyes = cat.querySelector("[data-cat-eyes]");
    const lids = cat.querySelector("[data-cat-lids]");
    const ear = cat.querySelector("[data-cat-ear]");

    // Blink on a loose interval so it never looks metronomic: 5-11 seconds.
    const blink = () => {
      window.setTimeout(() => {
        if (lids) {
          lids.style.transform = "scaleY(0.08)";
          window.setTimeout(() => {
            lids.style.transform = "scaleY(1)";
          }, 90);
        }
        blink();
      }, 5000 + Math.random() * 6000);
    };
    blink();

    let earBusy = false;
    cat.addEventListener("mouseenter", () => {
      if (!ear || earBusy) return;
      earBusy = true;
      ear.style.transform = "rotate(6deg)";
      window.setTimeout(() => {
        ear.style.transform = "rotate(0deg)";
        earBusy = false;
      }, 240);
    });

    // Eye tracking. The eye group's box is cached and only remeasured on
    // scroll/resize, so pointer moves never force a layout.
    if (eyes && !window.matchMedia("(hover: none)").matches) {
      let box = null;
      const measure = () => {
        box = null;
      };
      const boxOf = () => {
        if (!box) {
          const r = eyes.getBoundingClientRect();
          box = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
        return box;
      };

      let pointer = null;
      let pending = false;

      const track = () => {
        pending = false;
        if (!pointer) return;
        const c = boxOf();
        const dx = pointer.x - c.x;
        const dy = pointer.y - c.y;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(2, dist / 60);
        eyes.style.transform = `translate(${((dx / dist) * reach).toFixed(2)}px, ${(
          (dy / dist) *
          reach
        ).toFixed(2)}px)`;
      };

      window.addEventListener(
        "mousemove",
        (e) => {
          pointer = { x: e.clientX, y: e.clientY };
          if (pending) return;
          pending = true;
          requestAnimationFrame(track);
        },
        { passive: true }
      );
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
    }
  }
})();
