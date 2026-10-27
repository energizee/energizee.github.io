// Hand-drawn sticker icons on a 32px grid. Shapes are classed by fill:
// f = main colour (--icon-fill), a = accent (--icon-accent), w = paper,
// k = solid ink. Unclassed shapes are outline only.

export const icons = {
  star: `<path class="f" d="M16 3l3.3 8.5 9.1.5-7.1 5.7 2.3 8.8L16 21.6l-7.6 4.9 2.3-8.8L3.6 12l9.1-.5Z"/>`,

  sparkle: `<path class="f" d="M16 3c1 8 5 12 13 13-8 1-12 5-13 13-1-8-5-12-13-13 8-1 12-5 13-13Z"/>`,

  moon: `<path class="f" d="M21 5a11.5 11.5 0 1 0 6.5 16.5A9.5 9.5 0 0 1 21 5Z"/>
    <circle cx="13" cy="19" r="1.8"/><circle cx="17.5" cy="23.5" r="1.1"/>`,

  sun: `<circle class="f" cx="16" cy="16" r="6.5"/>
    <path d="M16 3v3.5M16 25.5V29M3 16h3.5M25.5 16H29M6.8 6.8l2.4 2.4M22.8 22.8l2.4 2.4M6.8 25.2l2.4-2.4M22.8 9.2l2.4-2.4"/>`,

  trophy: `<path d="M10 7H6.5v1.5a4.5 4.5 0 0 0 4.5 4.5M22 7h3.5v1.5A4.5 4.5 0 0 1 21 13"/>
    <path class="f" d="M10 4.5h12V11a6 6 0 0 1-12 0Z"/>
    <path class="f" d="M14.5 17h3v4h-3Z"/>
    <rect class="a" x="9.5" y="21" width="13" height="6" rx="1.5"/>`,

  pin: `<path class="f" d="M16 29s-9-8.5-9-15a9 9 0 0 1 18 0c0 6.5-9 15-9 15Z"/>
    <circle class="w" cx="16" cy="14" r="3.4"/>`,

  download: `<path d="M5.5 21.5v4.5h21v-4.5"/>
    <path class="f" d="M13 4.5h6v8.5h4.5L16 21l-7.5-8H13Z"/>`,


  github: `<g transform="translate(3 3) scale(1.0833)"><path class="k" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></g>`,

  linkedin: `<g transform="translate(3 3) scale(1.0833)"><path class="k" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 4.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></g>`,


  mail: `<rect class="f" x="3" y="7" width="26" height="19" rx="3"/>
    <path d="M4 9l12 9.5L28 9"/>`,

  close: `<path d="M9.5 9.5l13 13M22.5 9.5l-13 13"/>`,

  arrowRight: `<path d="M6 16h19M18 9l7 7-7 7"/>`,

  arrowLeft: `<path d="M26 16H7M14 9l-7 7 7 7"/>`,

  external: `<path d="M14 7H7v18h18v-7M18.5 5H27v8.5M27 5 15 17"/>`,

  house: `<path class="f" d="M4.5 15.5 16 5l11.5 10.5H25V27H7V15.5Z"/>
    <path class="w" d="M13.5 27v-6.5a2.5 2.5 0 0 1 5 0V27Z"/>`,

  rocket: `<path class="a" d="M10.5 16 6 21.5V26l5.5-2.5M21.5 16l4.5 5.5V26l-5.5-2.5"/>
    <path class="f" d="M16 3c5.5 3.5 7.5 10 6 18.5H10C8.5 13 10.5 6.5 16 3Z"/>
    <circle class="w" cx="16" cy="12" r="2.8"/>
    <path class="a" d="M13 21.5h6L16 28Z"/>`,

  briefcase: `<path d="M12 10.5V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5"/>
    <rect class="f" x="3.5" y="10.5" width="25" height="16" rx="3"/>
    <path d="M3.5 17h25"/>
    <rect class="a" x="13.5" y="15" width="5" height="4.5" rx="1"/>`,

  wrench: `<path class="f" d="M21 4.5a6.5 6.5 0 0 0-6.2 8.6L5.3 22.6a2.9 2.9 0 0 0 4.1 4.1l9.5-9.5A6.5 6.5 0 0 0 27.5 11l-4.2 4.2-4.1-.9-.9-4.1 4.2-4.2a6.6 6.6 0 0 0-1.5-1.5Z"/>`,

  heart: `<path class="f" d="M16 27S4 19.5 4 11.5A6 6 0 0 1 16 8a6 6 0 0 1 12 3.5C28 19.5 16 27 16 27Z"/>`,

  chart: `<path d="M3.5 27.5h25"/>
    <rect class="a" x="5" y="17" width="5.5" height="10.5" rx="1"/>
    <rect class="f" x="13.25" y="11" width="5.5" height="16.5" rx="1"/>
    <rect class="a" x="21.5" y="5" width="5.5" height="22.5" rx="1"/>`,

  cap: `<path class="a" d="M8 15.5v5.5c0 2.2 3.6 4 8 4s8-1.8 8-4v-5.5"/>
    <path class="f" d="M16 6 2.5 12.5 16 19l13.5-6.5Z"/>
    <path d="M28 13.5v7.5"/><circle class="k" cx="28" cy="22.5" r="1.7"/>`,

  calendar: `<rect class="w" x="4" y="7" width="24" height="20" rx="3"/>
    <path class="f" d="M4 10a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v3H4Z"/>
    <path d="M10.5 4.5v5M21.5 4.5v5"/>
    <circle class="k" cx="11" cy="18.5" r="1.4"/><circle class="k" cx="16" cy="18.5" r="1.4"/><circle class="k" cx="21" cy="18.5" r="1.4"/><circle class="k" cx="11" cy="23" r="1.4"/>`,

  sign: `<path d="M9.5 12 16 5.5l6.5 6.5"/><circle class="k" cx="16" cy="5.5" r="1.6"/>
    <rect class="f" x="4" y="12" width="24" height="12" rx="3"/>
    <path d="M9 18h14"/>`,

  map: `<path class="f" d="M4 8.5 11 5.5l10 3 7-3v18l-7 3-10-3-7 3Z"/>
    <path d="M11 5.5v18M21 8.5v18"/>
    <path class="a" d="M16 20.5s-3-3-3-5.2a3 3 0 0 1 6 0c0 2.2-3 5.2-3 5.2Z"/>`,

  bolt: `<path class="f" d="M18.5 3 6.5 18h8.5l-2 11 12-15h-8.5Z"/>`,

  chat: `<path class="f" d="M5 5.5h22a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1-2.5 2.5H14l-6.5 5v-5H5A2.5 2.5 0 0 1 2.5 20V8A2.5 2.5 0 0 1 5 5.5Z"/>
    <circle class="k" cx="10" cy="14" r="1.7"/><circle class="k" cx="16" cy="14" r="1.7"/><circle class="k" cx="22" cy="14" r="1.7"/>`,

  terminal: `<rect class="w" x="3" y="5.5" width="26" height="21" rx="3"/>
    <path class="f" d="M3 8.5a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v2.5H3Z"/>
    <path d="M8 16l4 3-4 3M15.5 22h8"/>`,

  coins: `<circle class="a" cx="20.5" cy="12" r="8"/>
    <circle class="f" cx="12" cy="19.5" r="9"/>
    <circle cx="12" cy="19.5" r="5.2"/>`,

  basket: `<path d="M10 12 14 4.5M22 12l-4-7.5"/>
    <path class="f" d="M3.5 12h25l-3 14.5h-19Z"/>
    <path d="M12 16.5v6M16 16.5v6M20 16.5v6"/>`,

  flask: `<path class="w" d="M13.5 4.5V12L6.8 24.2a2.8 2.8 0 0 0 2.5 4.3h13.4a2.8 2.8 0 0 0 2.5-4.3L18.5 12V4.5Z"/>
    <path class="f" d="M9.3 20h13.4l2 4.2a2.8 2.8 0 0 1-2.5 4.3H9.3a2.8 2.8 0 0 1-2.5-4.3Z"/>
    <path d="M11 4.5h10"/><circle cx="15" cy="15.5" r="1.3"/><circle cx="18" cy="11" r="1"/>`,


  code: `<rect class="f" x="3" y="5.5" width="26" height="21" rx="3"/>
    <path d="M12 12l-4 4 4 4M20 12l4 4-4 4M17.5 10.5l-3 11"/>`,

  database: `<path class="f" d="M6 8c0-2 4.5-3.5 10-3.5S26 6 26 8v16c0 2-4.5 3.5-10 3.5S6 26 6 24Z"/>
    <path d="M6 8c0 2 4.5 3.5 10 3.5S26 10 26 8M6 16c0 2 4.5 3.5 10 3.5S26 18 26 16"/>`,

  window: `<rect class="w" x="3" y="5.5" width="26" height="21" rx="3"/>
    <path class="f" d="M3 8.5a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v2.5H3Z"/>
    <rect class="a" x="7" y="14.5" width="8" height="8" rx="1.5"/>
    <path d="M19 15h6M19 19h6M19 23h3.5"/>`,

  gamepad: `<path class="f" d="M9 9.5h14a6 6 0 0 1 6 6.6l-.6 5.2a3.6 3.6 0 0 1-6.3 1.9L19.8 20.5h-7.6l-2.3 2.7a3.6 3.6 0 0 1-6.3-1.9l-.6-5.2a6 6 0 0 1 6-6.6Z"/>
    <path d="M9.5 13.5v5.5M6.75 16.25h5.5"/>
    <circle class="k" cx="21" cy="14.5" r="1.6"/><circle class="k" cx="24.5" cy="18" r="1.6"/>`,

  hammer: `<rect class="a" x="13.5" y="12" width="5" height="16" rx="1.5"/>
    <path class="f" d="M7 5.5h13.5l4.5 3.5v4H7Z"/>`,

  paw: `<ellipse class="f" cx="16" cy="21" rx="7" ry="6"/>
    <circle class="f" cx="6.5" cy="13" r="3"/><circle class="f" cx="12" cy="7.5" r="3"/>
    <circle class="f" cx="20" cy="7.5" r="3"/><circle class="f" cx="25.5" cy="13" r="3"/>`,

  dumbbell: `<rect class="a" x="3" y="10" width="5" height="12" rx="1.5"/>
    <rect class="a" x="24" y="10" width="5" height="12" rx="1.5"/>
    <rect class="f" x="8" y="12.5" width="4" height="7" rx="1"/>
    <rect class="f" x="20" y="12.5" width="4" height="7" rx="1"/>
    <rect class="w" x="12" y="14.5" width="8" height="3"/>`,

  shoe: `<path class="f" d="M4 22.5c0-3 .8-6.5 2.5-9.5l4.5 1.5c1.6 1 3.2 1.5 5 1.5l4.6 1c4 .8 7.4 2.6 7.4 5.5Z"/>
    <path class="w" d="M4 22.5h24v2.5a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 4 25Z"/>
    <path d="M10.5 15.5l2-2.5M14 16.5l2-2.5"/>`,

  belt: `<path class="f" d="M3 13h26v6H3Z"/>
    <path class="a" d="M13.5 21 10 28.5h4l2-6ZM18.5 21 22 28.5h-4l-2-6Z"/>
    <rect class="a" x="12.5" y="10.5" width="7" height="11" rx="1.5"/>`,

  pawn: `<rect class="f" x="8.5" y="22" width="15" height="5" rx="2"/>
    <path class="f" d="M12.5 22c1.5-2.5 2-5 2-8.5h3c0 3.5.5 6 2 8.5Z"/>
    <rect class="a" x="11.5" y="12" width="9" height="3" rx="1.5"/>
    <circle class="f" cx="16" cy="8" r="4"/>`,

  music: `<path d="M12 22V7.5l13-3V19M12 11.5l13-3"/>
    <ellipse class="f" cx="8.5" cy="22.5" rx="4" ry="3.2"/>
    <ellipse class="f" cx="21.5" cy="19.5" rx="4" ry="3.2"/>`,

  compass: `<circle class="f" cx="16" cy="16" r="12.5"/>
    <path class="a" d="M16 6.5l3.2 9.5h-6.4Z"/>
    <path class="w" d="M16 25.5 12.8 16h6.4Z"/>`,

  people: `<circle class="a" cx="22" cy="10" r="4"/>
    <path class="a" d="M15.5 26a6.5 6.5 0 0 1 13 0Z"/>
    <circle class="f" cx="11" cy="11" r="4.5"/>
    <path class="f" d="M3.5 27a7.5 7.5 0 0 1 15 0Z"/>`,
} as const;

export type IconName = keyof typeof icons;
