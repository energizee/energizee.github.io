// A drifting field of sticker stars, drawn at a low frame rate with a little
// per-frame wobble so it reads like stop-motion paper cut-outs.

const canvas = document.querySelector("[data-starfield]");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FPS = 10;
  const AREA_PER_STAR = 9000;
  const MIN_STARS = 40;
  const MAX_STARS = 180;
  const PALETTE = ["--pink", "--lilac", "--mint", "--butter", "--peach"];
  // Clicks on these don't make a burst, since it would be drawn underneath.
  const SOLID = "a, button, input, label, .nav-pill, .section--hero, .card, .tl-item, .skills, .prose, .contact-panel, .detail-section, .detail-head, .section-title, .lightbox";

  let width = 0;
  let height = 0;
  let ratio = 1;
  let colours = [];
  let ink = "#000";
  let speck = "#fff";
  let stars = [];
  let bursts = [];
  let last = 0;

  const between = (min, max) => min + Math.random() * (max - min);

  const readColours = () => {
    const style = getComputedStyle(root);
    colours = PALETTE.map((name) => style.getPropertyValue(name).trim());
    ink = style.getPropertyValue("--ink").trim();
    speck = style.getPropertyValue("--speck").trim();
  };

  const makeStar = () => {
    const roll = Math.random();
    const shape = roll < 0.4 ? "speck" : roll < 0.72 ? "sparkle" : "star";
    const big = shape !== "speck";
    return {
      shape,
      x: Math.random() * width,
      y: Math.random() * height,
      depth: between(0.15, 1),
      size: big ? between(7, 19) : between(1.2, 2.8),
      colour: Math.floor(Math.random() * PALETTE.length),
      angle: Math.random() * Math.PI * 2,
      spin: between(-0.25, 0.25),
      vx: between(-6, 6),
      vy: between(-9, -2),
      twinkle: Math.random() * Math.PI * 2,
    };
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const count = Math.max(MIN_STARS, Math.min(MAX_STARS, Math.round((width * height) / AREA_PER_STAR)));
    while (stars.length < count) stars.push(makeStar());
    stars.length = count;
  };

  // Points jitter a little every frame, like a hand-cut shape re-shot.
  const wobble = (r) => r + (reduced ? 0 : (Math.random() - 0.5) * r * 0.12);

  const tracePoints = (r, points, inner) => {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / points;
      const len = wobble(i % 2 ? r * inner : r);
      ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
    }
    ctx.closePath();
  };

  const traceSparkle = (r) => {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 2;
      const next = a + Math.PI / 2;
      const tip = wobble(r);
      if (i === 0) ctx.moveTo(Math.cos(a) * tip, Math.sin(a) * tip);
      const pinch = r * 0.14;
      const nextTip = wobble(r);
      ctx.quadraticCurveTo(
        Math.cos(a + Math.PI / 4) * pinch,
        Math.sin(a + Math.PI / 4) * pinch,
        Math.cos(next) * nextTip,
        Math.sin(next) * nextTip
      );
    }
    ctx.closePath();
  };

  const drawShape = (shape, size, colour, alpha) => {
    if (shape === "speck") {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = speck;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (shape === "star") tracePoints(size, 5, 0.46);
    else traceSparkle(size);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.lineWidth = Math.max(1.6, size * 0.17);
    ctx.lineJoin = "round";
    ctx.strokeStyle = ink;
    ctx.stroke();
  };

  const draw = (dt) => {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const pad = 24;

    for (const s of stars) {
      s.x += s.vx * s.depth * dt;
      s.y += s.vy * s.depth * dt;
      s.angle += s.spin * dt;
      s.twinkle += dt * 1.6;

      const span = height + pad * 2;
      const x = ((s.x % (width + pad * 2)) + width + pad * 2) % (width + pad * 2) - pad;
      const y = (((s.y % span) + span) % span) - pad;
      const alpha = s.shape === "speck" ? 0.45 + 0.4 * Math.sin(s.twinkle) ** 2 : 1;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(s.angle);
      drawShape(s.shape, s.size * (0.75 + s.depth * 0.35), colours[s.colour], alpha);
      ctx.restore();
    }

    bursts = bursts.filter((b) => (b.life -= dt) > 0);
    for (const b of bursts) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.vy += 220 * dt;
      b.angle += b.spin * dt;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);
      drawShape(b.shape, b.size * Math.min(1, b.life / 0.4), colours[b.colour], 1);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  };

  const tick = (time) => {
    window.requestAnimationFrame(tick);
    if (document.hidden) {
      last = time;
      return;
    }
    const elapsed = time - last;
    if (elapsed < 1000 / FPS) return;
    last = time;
    draw(Math.min(elapsed / 1000, 0.25));
  };

  readColours();
  resize();

  new MutationObserver(() => {
    readColours();
    if (reduced) draw(0);
  }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  window.addEventListener(
    "resize",
    () => {
      resize();
      if (reduced) draw(0);
    },
    { passive: true }
  );

  if (reduced) {
    draw(0);
  } else {
    window.requestAnimationFrame(tick);

    document.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest(SOLID)) return;
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + Math.random() * 0.5;
        const speed = between(120, 220);
        bursts.push({
          shape: i % 2 ? "sparkle" : "star",
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - 80,
          size: between(7, 12),
          colour: i % PALETTE.length,
          angle: Math.random() * Math.PI,
          spin: between(-4, 4),
          life: between(0.7, 1),
        });
      }
    });
  }
}
