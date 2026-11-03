# Kiberxavfsizlik — Raqamli Ta'lim Resursi (RTR)

**Modul kodi:** TD-50610401  
**Hajmi:** 60 akademik soat = 30 para  
**Tili:** O'zbek tili (Lotin)  
**Texnologiyalar:** Vite + React + TypeScript + Tailwind CSS  
**Routing:** Hash routing (`/#/`, `/#/para/para-01`, `/#/glossary`)  
**Deployment:** Netlify (statik) va oflayn (`file://` protokoli orqali)

---

## 🚀 Loyiha tarkibi va imkoniyatlari

1. **Bosh sahifa (Home Page):**
   - Modul tavsifi, kutilayotgan ta'lim natijalari (Outcomes) va kompetensiyalar;
   - 30 ta parani qamrab oluvchi mundarija jadvali (Grid);
   - Foydalanuvchi o'zlashtirish ko'rsatkichi (Progress bar) va testlar o'rtacha balli;
   - Qidiruv va sohaviy toifalar bo'yicha saralash.

2. **Para sahifasi shabloni (9 ta tab):**
   - **Maqsad:** O'quv maqsadi, kutilayotgan bilim, ko'nikma va malakalar.
   - **Ma'ruza:** Calibri (fallback Carlito) 14pt, oraliq 1.0 (single), hoshiyalar: chap 30mm, o'ng 15mm, yuqori 20mm, quyi 20mm. Maxsus `@page` chop etish (Print / PDF) stylesheet.
   - **Metodlar:** Interaktiv ta'lim metodlari (Case-Study, Flipped classroom va b.).
   - **Video:** Mahalliy MP4 pleyer (min 480p talabi), vaqt belgilari (timestamps) va sinxron transkript.
   - **Taqdimot:** Interaktiv slaydlar tomoshabini va yuklab olish imkoniyati.
   - **Didaktik:** Ko'rgazmali sxemalar, CIA triadasi va mnemotexnik jadvallar.
   - **Amaliyot:** Mudofaa yo'nalishidagi xavfsiz laboratoriya ishlari.
   - **Nazorat:** Instant feedback (tezkor qayta aloqa) beruvchi test komponenti, tushuntirishlar va ball saqlanishi.
   - **Glossariy:** Mavzuga oid terminologik lug'at.

3. **Global A–Z Glossariy:**
   - O'zbek lotin alifbosi (shu jumladan G', O', Sh, Ch) bo'yicha A–Z navigatsiya;
   - Real vaqt rejimidagi qidiruv va toifalar filtri.

4. **Dizayn va ranglar palitrasi:**
   - Qulay, ko'zni toliqtirmaydigan xotirjam mavzular (Light & Dark theme);
   - WCAG AA kontrast standartlariga mos;
   - Yangi neon ranglardan holi, professional kiberxavfsizlik uslubi.

5. **Oflayn va Onlayn moslik:**
   - `base: './'` nisbiy yo'llar orqali istalgan papkadan `dist/index.html` faylini brauzerda to'g'ridan-to'g'ri ikki marta bosib ochish mumkin (`file:///...`);
   - Netlify va statik serverlar uchun `netlify.toml` tayyorlangan.

---

## 🛠️ Ishga tushirish va yig'ish

```bash
# Loyihani o'rnatish
npm install

# Dasturlash muhitida ishga tushirish (Dev Server)
npm run dev

# Ishlab chiqarish uchun yig'ish (Production Build)
npm run build

# Natijani ko'rish (Preview)
npm run preview
```

Yig'ilgan fayllar `dist/` papkasida joylashadi va internetga ulanmasdan to'liq ishlaydi.

