# 1-para. Didaktik materiallar va ko'rgazmali vositalar

## 1. CIA Triadasi – Axborot xavfsizligining oltin uchburchagi

Axborot xavfsizligining muvozanatli himoya modeli uchta o'zaro bog'liq tushunchaga asoslanadi:

```
                  [ M A X F I Y L I K ]
                 (Confidentiality / Shifrlash)
                         /       \
                        /         \
                       /           \
                      /   XAVFSIZ   \
                     /    AXBOROT    \
                    /                 \
        [ Y A X L I T L I K ] ------- [ M A V J U D L I K ]
      (Integrity / Xesh, ERI)       (Availability / Zaxira, Klaster)
```

| Prinsip | Asosiy mohiyati | Buzilishiga misol | Himoya mexanizmi |
| :--- | :--- | :--- | :--- |
| **Maxfiylik** *(Confidentiality)* | Axborot faqat vakolatli foydalanuvchilar uchun ochiq | Parolning o'g'irlanishi, ma'lumotlar sizib chiqishi (leak) | AES shifrlash, MFA, kirish huquqlarini cheklash (RBAC) |
| **Yaxlitlik** *(Integrity)* | Axborotning to'liqligi va ruxsatsiz o'zgarmasligi | Tranzaksiya summasining o'zgartirilishi, veb-defacing | SHA-256 xesh-funksiyasi, Raqamli imzo (ERI) |
| **Mavjudlik** *(Availability)* | Resurslarning doimiy va o'z vaqtida ishlab turishi | DoS/DDoS hujumlari oqibatida server to'xtab qolishi | Yuklama taqsimlagichlar (Load Balancer), Redundancy, DRP |

---

## 2. Chuqurlashtirilgan himoya (Defense in Depth) modeli

Kiberxavfsizlikda mudofaa bir nechta konsentrik to'siqlardan iborat bo'ladi:

1. **Siyosat va tartib-taomillar:** Xavfsizlik qoidalari, kibergigiyena yo'riqnomalari;
2. **Jismoniy xavfsizlik:** Server xonalari nazorati, biometrik qulflar, videokuzatuv;
3. **Perimetr xavfsizligi:** Firewall, DMZ (demilitarizatsiyalangan hudud), VPN;
4. **Ichki tarmoq xavfsizligi:** VLAN segmentatsiyasi, IDS/IPS, 802.1X;
5. **Xost darajasidagi xavfsizlik:** Antivirus/EDR, OS yangilanishlari (patch management);
6. **Ilova darajasidagi xavfsizlik:** Xavfsiz kod yozish, WAF (Web Application Firewall);
7. **Ma'lumotlar himoyasi:** Kriptografik shifrlash, zaxira nusxalash (Backup), DLP.

---

## 3. Mnemotexnik eslatma: «K-M-Y-M» qoidasi
O'quvchi xotirasida oson saqlanishi uchun:
* **K** — Kiberxavfsizlik raqamli muhitni himoyalaydi;
* **M** — Maxfiylik (faqat egalariga);
* **Y** — Yaxlitlik (bir bayt ham soxtalashtirilmasin);
* **M** — Mavjudlik (kerak vaqtda qo'l yetishi shart).

