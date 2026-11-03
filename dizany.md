Read Agent.md first. Now implement the full UI/UX design system below for the
"Kiberxavfsizlik – Raqamli ta'lim resursi" site. Act as a senior product designer
with 10 years of experience building e-learning platforms. Quality bar: it should feel
like a premium learning product (think Linear + Duolingo + Notion), but calm and
readable for long study sessions.

TECH
- Vite + React + Tailwind, hash routing, base './', everything offline (no CDN).
- Install animation and fonts via npm so they are bundled: framer-motion (motion),
  @fontsource/manrope, @fontsource/jetbrains-mono, and bundle the Carlito font files
  locally for the lecture view.
- Icons: lucide-react (bundled).
- Do not use external images or videos; generate SVG illustrations in code.

DESIGN TOKENS (CSS variables, light + dark, toggle in the top bar, remember choice,
default to system preference)
- Dark: bg #0B1220, surface #121C2F, surface-2 #17233A, border #22304A,
  text #E6EDF7, muted #93A4BF, accent #22D3C5, accent-2 #6366F1.
- Light: bg #F6F8FC, surface #FFFFFF, surface-2 #EEF2F9, border #DCE3EF,
  text #0F172A, muted #5B6B85, accent #0E9F94, accent-2 #4F46E5.
- Semantic: success #22C55E, warning #F59E0B, danger #EF4444.
- All text must meet WCAG AA contrast (4.5:1). Check it.
- Radius 16px cards, 10px buttons, 999px chips. 8px spacing scale.
- Type scale (Manrope): 12/14/16/18/24/32/48, headings weight 700-800,
  body 16px/1.6. Code: JetBrains Mono.
- Max content width 1200px; reading column 760px.

LAYOUT
- Top bar (sticky, glass blur): logo (shield icon + "Kiberxavfsizlik"), global search
  (Ctrl+K opens a command palette to jump to any para, glossary term or test),
  theme toggle, font-size A-/A+ for UI text only (never changes lecture size),
  "Davom etish" (continue) button.
- Left sidebar (desktop): collapsible contents grouped into 6 sections
  (Axborot xavfsizligi asoslari, Autentifikatsiya, Kriptografiya, Zaifliklar,
  Tarmoq xavfsizligi, Amaliy yakun) with per-para status icons (not started, in
  progress, done) and a thin progress bar per section.
- Mobile: sidebar becomes a bottom sheet; bottom tab bar with
  Bosh sahifa / Mundarija / Glossariy / Natija.
- Responsive from 360px to 2560px. No horizontal scroll anywhere.

PAGES
1. HOME (hero)
   - Left: big headline "Kiberxavfsizlikni amalda o'rganing", short subtitle,
     two buttons: "O'qishni boshlash" (primary), "Mundarija" (ghost).
     Stats row: 30 para, 60 soat, 4 natija, 30 video.
   - Right: animated hero illustration drawn in SVG/canvas: a softly glowing shield
     in the middle, with a slowly drifting network of nodes and lines around it;
     nodes pulse gently; moving the mouse shifts the layers slightly (parallax, max
     12px). Pause when the tab is hidden. Static fallback for reduced motion.
   - Below: "O'qitish natijalari" ON1-ON4 as four cards with icons and a count of
     paras mapped to each. Then "Mundarija" grid of 30 para cards
     (number, title, outcome chips, estimated 2h, status). Section filters as chips.
   - A "Metodlar" strip showing the 4 official teaching methods with icons.
2. PARA PAGE
   - Header: breadcrumb, para number, title, outcome chips (ON1...), method chips,
     progress ring showing completed tabs (of 9).
   - Tabs with an animated sliding underline (layoutId): Maqsad, Ma'ruza, Metodlar,
     Video, Taqdimot, Didaktik, Amaliyot, Nazorat, Glossariy. Keyboard accessible
     (arrow keys), URL remembers the tab (#/para/5/video). On mobile tabs scroll
     horizontally with snap.
   - Sticky bottom bar: "Oldingi para" / "Keyingi para".
   - Ma'ruza tab: a "paper" page on a muted background. Paper uses EXACTLY:
     Calibri/Carlito 14pt, line-height 1, margins 20mm top/bottom, 30mm left,
     15mm right, width 210mm on desktop (scales down on small screens with the same
     proportions). Paper stays light (white, dark text) even in dark theme so it
     matches the printed requirement. Toolbar: "PDF/Chop etish" (print CSS @page
     with same margins), progress bar of reading, table of contents of the lecture
     plan on the side. Show an estimated page count.
   - Metodlar tab: each method as a timeline step card (icon, stage, minutes,
     description) with a vertical animated line.
   - Video tab: custom video player (play, seek, speed 0.75-2x, fullscreen, volume,
     keyboard shortcuts, remembers position), poster image, a badge "720p"
     and a chapters list under the video.
   - Taqdimot tab: slide viewer with big slides, thumbnails strip, arrow keys,
     fullscreen. Slides are PNG images exported from PPTX (offline-safe).
   - Didaktik tab: responsive gallery with a lightbox (zoom, caption).
   - Amaliyot tab: task card with steps, checklist, and where relevant an
     interactive simulator in a "lab window" frame that looks like a terminal or app
     window (three dots, title bar). Simulations only, no real attack tools.
   - Nazorat tab: review questions as accordion; test engine (see below);
     practice tasks.
   - Glossariy tab: the para's terms as flip-free cards, plus link to full glossary.
3. GLOSSARY: sticky A-Z jump bar (Uzbek alphabet), live search with highlight,
   terms auto-sorted with Uzbek collation, each term shows the para(s) it appears in.
4. NATIJA / PROGRESS: overall ring, per-section bars, per-outcome (ON1-ON4) mastery,
   test scores table, "reset progress" with confirmation. Progress saved in
   localStorage inside try/catch (works on Netlify and file://).
5. COVERAGE (for the jury): matrix table para x ON1-ON4, para x method, and a
   checklist showing each para has video, slides, didactic, tests, glossary.
   Printable.

QUIZ ENGINE UX
- One question per screen, large option buttons, keyboard 1-4 to select.
- Instant feedback: correct = green check with a short scale pop; wrong = gentle
  horizontal shake (3 cycles, 250ms) + red state, then reveal the correct answer
  and the explanation sliding down.
- Top progress bar fills smoothly. End screen: animated score ring counting up,
  message, review of wrong answers, "Qayta urinish" button.
- No sound. Optional subtle confetti only for 100%, and only if motion allowed.

MOTION SYSTEM (framer-motion)
- Easing: cubic-bezier(0.22, 1, 0.36, 1). Durations: micro 120-180ms, standard
  240-320ms, page 350-450ms. Animate only transform and opacity.
- Page transitions: fade + 12px upward slide, tab content cross-fade.
- Scroll reveal: cards fade/slide in once with 60ms stagger (viewport once: true).
- Cards: hover lifts 4px with shadow and accent border glow; press scales 0.98.
- Buttons: ripple-free, subtle gradient shift on hover.
- Sidebar: smooth expand/collapse; active item has a sliding indicator.
- Numbers (stats, scores) count up once on first view.
- Skeleton shimmer while content JSON loads.
- Progress rings and bars animate from the previous value.
- Respect prefers-reduced-motion: disable parallax, pulses, confetti, and
  reduce everything else to simple fades. Add a visible "Animatsiya: yoqilgan/o'chirilgan"
  switch in settings.
- Keep 60fps on a low-end school laptop. No heavy particle libraries; the hero network
  uses <=60 nodes on canvas, capped at 30fps, paused when offscreen.

ACCESSIBILITY AND ERGONOMICS (graded by the jury)
- Visible focus rings (2px accent + offset), skip-to-content link, ARIA roles for
  tabs/accordion/dialog, alt text, captions area for videos.
- Minimum tap target 44px. Body text never below 16px (lecture is 14pt by rule).
- No pure black/white backgrounds for the app chrome, no neon glare, no flashing.
- Works in Chrome, Edge, Firefox, Safari, and on 1366x768 laptops.

DELIVERABLES
1. Design tokens file and Tailwind config.
2. Components: TopBar, Sidebar, ParaCard, OutcomeCard, Tabs, LecturePaper,
   MethodTimeline, VideoPlayer, SlideViewer, Lightbox, QuizEngine, GlossaryList,
   ProgressRing, CommandPalette, CoverageMatrix, ThemeToggle.
3. Use /content/para-01 as the live sample, and generate placeholder data for the
   other 29 paras so the whole structure is browsable.
4. Run Lighthouse (accessibility >= 95, performance >= 90) and fix issues.
5. Verify `npm run build` works on Netlify and when opened via file://.
6. Screenshot every page in dark and light theme at 1440px and 390px for review.