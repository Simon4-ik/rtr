# 1-para. Amaliy laboratoriya mashg'uloti

## Mavzu: Axborot yaxlitligini nazorat qilish va himoyalangan xeshlash mexanizmlarini o'rganish

> **Xavfsizlik eslatmasi:** Ushbu amaliy mashg'ulot qat'iy ravishda mudofaa va o'quv maqsadlariga mo'ljallangan. Barcha amallar talabaning shaxsiy kompyuteridagi xavfsiz muhitda (sandbox) yoki laboratoriya tizimida bajariladi. Zararli dasturiy ta'minot yoki hujum vositalaridan foydalanish qat'iyan taqiqlanadi.

---

### Ishning maqsadi:
Kriptografik xesh-funksiyalar (SHA-256) orqali ma'lumotlar yaxlitligini (Integrity) tekshirish mexanizmini amalda o'rganish, fayllardagi eng kichik o'zgarish ham xesh qiymatiga qanday ta'sir qilishini («ko'chki effekti») tahlil qilish hamda birlamchi mudofaa tahlilini o'tkazish.

---

### Kerakli vositalar:
* Zamonaviy operatsion tizim (Windows PowerShell yoki Linux Terminal);
* Standart buyruqlar satri (qo'shimcha dastur o'rnatish talab etilmaydi).

---

### Bajarish bosqichlari:

#### 1-qadam. Sinov matnli hujjatini yaratish
Ish stolida yoki maxsus papkada `hujjat.txt` nomli fayl oching va unga quyidagi matnni yozing:
```text
Kiberxavfsizlik fanining 1-laboratoriya ishi. Maxfiylik va yaxlitlik himoyasi.
```

#### 2-qadam. Faylning SHA-256 xesh summasini hisoblash
Windows PowerShell muhitida quyidagi standart buyruqni bajaring:
```powershell
Get-FileHash -Path .\hujjat.txt -Algorithm SHA256
```
*(Linux/macOS tizimida: `sha256sum hujjat.txt`)*

**Kutilgan natija:**
Siz 64 ta o'n oltilik belgidan iborat noyob xesh izini ko'rasiz. Ushbu qiymatni daftaringizga yoki hisobot fayliga qayd qiling.

#### 3-qadam. Yaxlitlikning buzilishini simulyatsiya qilish
`hujjat.txt` faylini ochib, uning oxiriga oddiy bir nuqta `.` yoki probel qo'shing va saqlang.
Endi xesh hisoblash buyrug'ini qaytadan ishga tushiring:
```powershell
Get-FileHash -Path .\hujjat.txt -Algorithm SHA256
```

#### 4-qadam. Natijalarni qiyoslash va «Ko'chki effekti»ni tahlil qilish
* Dastlabki xesh bilan yangi xeshni solishtiring.
* E'tibor bering: bitta belgining qo'shilishi xeshning yarmidan ko'pini butunlay o'zgartirib yubordi.
* Bu hodisa kriptografiyada **«ko'chki effekti» (Avalanche effect)** deb ataladi va ma'lumotlarning soxtalashtirilmaganligini 100% isbotlashda qo'llaniladi.

---

### Topshiriq hisoboti:
1. Hisoblangan ikkita xesh qiymatini taqqoslab ko'rsating.
2. Nima uchun oddiy MD5 yoki SHA-1 zamonaviy kiberxavfsizlikda yaxlitlik tekshiruvi uchun tavsiya etilmasligini yozma asoslang.
3. CIA modeliga ko'ra, xesh-funksiyalar xavfsizlikning qaysi ustunini ta'minlaydi?

