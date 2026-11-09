# Project: Kiberxavfsizlik – Raqamli ta'lim resursi (RTR)
Module code: TD-50610401 | 60 hours = 30 ta mavzu | Language: Uzbek (Latin)
Deploy: Netlify (static). Must ALSO work offline from the built folder.

## Hard requirements
- Static site, no backend, no CDN: all assets local.
- Hash routing so it works from file://.
- Respect official RTR (resurs) and RTK (kontent) standards (Kasbiy ta'limni rivojlantirish instituti - ipitvet.uz).
- Each mavzu (topic) has 9 tabs in exact official order:
  1. Mavzular ro'yxati (o'qitish natijalari asosida)
  2. Ma'ruza matni (nazariy va amaliy mashg'ulotlar)
  3. O'qitish metodlari (qo'llaniladigan metodlar ro'yxati)
  4. Media materiallar (audio, video, animatsiya)
  5. Ko'rgazmali materiallar (didaktik vositalar)
  6. Taqdimot materiallari (ppt, pptx, pdf, jpg, png)
  7. Amaliy mashg'ulotlar (laboratoriya simulyatori)
  8. Baholash-savollari (savollar, topshiriqlar, testlar)
  9. Glossariy (atamalar lug'ati)
- Lecture view: Calibri (fallback Carlito) 14pt, line-height 1 (single),
  margins top 20mm, bottom 20mm, left 30mm, right 15mm.
  Each topic's lecture: 1.5–2 pages. Provide print/PDF CSS (@page) with same margins.
- Video: local mp4, min 480p, each mavzu has one.
- Global A–Z glossary (alphabetical, searchable).
- Quiz engine: instant feedback, per-mavzu score, progress bar.
- Accessible: WCAG AA contrast, keyboard navigation, responsive, light/dark theme.
- Content lives in /content/para-XX/ (JSON + Markdown). UI never hardcodes content.
- Zero spelling errors; run a spell/typo check on all content before release.

## Safety
- Cybersecurity content is defensive and educational only.
- Labs use simulations or the learner's own sandbox. No working malware
  or attack tooling.
## Official module data
Module: Kiberxavfsizlik, 60 hours, 30 ta mavzu. Outcomes ON1–ON4 (see /content/outcomes.json).
Allowed teaching methods ONLY: Aqliy hujum, Keys-stadi,
Guruhli ish va hamkorlikda oʻqitish, Amaliy mashqlar va simulyatsiya.
Every mavzu (para.json) must contain: goal, outcomes[], methods[], lecture, video, slides,
didactic[], practice, reviewQuestions[], tests[10], glossary[].
Show a "Coverage" page mapping each mavzu to ON1–ON4 (helps the jury).
Content schema: see /content/para-01/para.json (the reference).
Glossary: auto-sorted alphabetically with Uzbek collation, with A–Z jump bar.
