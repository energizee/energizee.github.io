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
    if (meta) meta.content = theme === "day" ? "#b9a5f0" : "#120914";
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

  const revealables = document.querySelectorAll("[data-reveal]");

  if (revealables.length && "IntersectionObserver" in window) {
    root.classList.add("js-reveal");

    if (reduced) {
      revealables.forEach((el) => el.classList.add("is-visible"));
    } else {
      // Play once an element is properly on screen. Reset it only after it has
      // left past the bottom edge, so it animates again on the way down but
      // simply stays put when scrolling back up.
      const show = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      const reset = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) return;
          // Above the viewport (e.g. after jumping to #contact) counts as seen.
          entry.target.classList.toggle("is-visible", entry.boundingClientRect.top <= 0);
        });
      });
      revealables.forEach((el) => {
        show.observe(el);
        reset.observe(el);
      });
    }
  }

  if (!reduced && !window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  const lightbox = document.querySelector("[data-lightbox]");

  if (lightbox) {
    const image = lightbox.querySelector("[data-lightbox-img]");
    const caption = lightbox.querySelector("[data-lightbox-caption]");

    document.querySelectorAll("[data-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        const thumb = button.querySelector("img");
        image.src = button.dataset.zoom;
        image.alt = thumb ? thumb.alt : "";
        const figcaption = button.closest("figure")?.querySelector("figcaption");
        caption.textContent = figcaption ? figcaption.textContent : "";
        lightbox.showModal();
      });
    });

    // Clicks on the dimmed backdrop land on the dialog itself.
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest("[data-lightbox-close]")) {
        lightbox.close();
      }
    });
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
