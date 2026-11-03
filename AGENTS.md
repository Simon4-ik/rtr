# Project: Kiberxavfsizlik – Raqamli ta'lim resursi (RTR)
Module code: TD-50610401 | 60 hours = 30 para | Language: Uzbek (Latin)
Deploy: Netlify (static). Must ALSO work offline from the built folder.

## Hard requirements
- Static site, no backend, no CDN: all assets local.
- Hash routing so it works from file://.
- Each para has tabs: Maqsad, Ma'ruza, Metodlar, Video, Taqdimot,
  Didaktik, Amaliyot, Nazorat, Glossariy.
- Lecture view: Calibri (fallback Carlito) 14pt, line-height 1 (single),
  margins top 20mm, bottom 20mm, left 30mm, right 15mm.
  Each topic's lecture: 1.5–2 pages. Provide print/PDF CSS (@page) with same margins.
- Video: local mp4, min 480p, each para has one.
- Global A–Z glossary (alphabetical, searchable).
- Quiz engine: instant feedback, per-para score, progress bar.
- Accessible: WCAG AA contrast, keyboard navigation, responsive, light/dark theme.
- Content lives in /content/para-XX/ (JSON + Markdown). UI never hardcodes content.
- Zero spelling errors; run a spell/typo check on all content before release.

## Safety
- Cybersecurity content is defensive and educational only.
- Labs use simulations or the learner's own sandbox. No working malware
  or attack tooling.
## Official module data
Module: Kiberxavfsizlik, 60 hours, 30 para. Outcomes ON1–ON4 (see /content/outcomes.json).
Allowed teaching methods ONLY: Aqliy hujum, Keys-stadi,
Guruhli ish va hamkorlikda oʻqitish, Amaliy mashqlar va simulyatsiya.
Every para.json must contain: goal, outcomes[], methods[], lecture, video, slides,
didactic[], practice, reviewQuestions[], tests[10], glossary[].
Show a "Coverage" page mapping each para to ON1–ON4 (helps the jury).
Content schema: see /content/para-01/para.json (the reference).
Glossary: auto-sorted alphabetically with Uzbek collation, with A–Z jump bar.