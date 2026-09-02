(() => {
  "use strict";

  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const THEME_KEY = "le-theme";

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
    } catch (e) {}
  };

  applyTheme(readTheme());
  document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
    el.addEventListener("click", toggleTheme);
  });

  const STARS = {
    seed: 20270601,
    columns: 7,
    rows: 3,
    band: 0.55,
    radius: [2, 3],
    opacity: [0.25, 0.5],
  };

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

  const cat = document.querySelector("[data-cat]");

  if (cat && !reduced) {
    const eyes = cat.querySelector("[data-cat-eyes]");
    const lids = cat.querySelector("[data-cat-lids]");
    const ear = cat.querySelector("[data-cat-ear]");

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
