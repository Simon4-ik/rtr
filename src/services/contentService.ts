import {
  ModuleInfo,
  ParaSummary,
  OutcomeItem,
  GlossaryItem,
  ParaDataOfficial,
  MethodItem,
  TestItem,
  DidacticItem
} from '../types';

import moduleData from '../content/module.json';
import parasIndexData from '../content/paras-index.json';
import outcomesData from '../content/outcomes.json';
import glossaryData from '../content/glossary.json';
import para01OfficialData from '../content/para-01/para.json';
import para01LectureRaw from '../content/para-01/maruza.md?raw';

// Helper to safely fetch or fallback
async function fetchWithFallback<T>(url: string, fallback: T): Promise<T> {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return fallback;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function fetchTextWithFallback(url: string, fallback: string): Promise<string> {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return fallback;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch {
    return fallback;
  }
}

export async function getModuleInfo(): Promise<ModuleInfo> {
  return fetchWithFallback<ModuleInfo>('./content/module.json', moduleData as ModuleInfo);
}

export async function getParasIndex(): Promise<ParaSummary[]> {
  return fetchWithFallback<ParaSummary[]>('./content/paras-index.json', parasIndexData as ParaSummary[]);
}

export async function getOutcomes(): Promise<OutcomeItem[]> {
  return fetchWithFallback<OutcomeItem[]>('./content/outcomes.json', outcomesData as OutcomeItem[]);
}

export async function getGlobalGlossary(): Promise<GlossaryItem[]> {
  const items = await fetchWithFallback<GlossaryItem[]>('./content/glossary.json', glossaryData as GlossaryItem[]);
  // Ensure Uzbek alphabetical collation
  return items.sort((a, b) => a.term.localeCompare(b.term, 'uz-Latn', { sensitivity: 'base' }));
}

export async function getParaData(paraNumber: number): Promise<{ official: ParaDataOfficial; lectureText: string }> {
  if (paraNumber === 1) {
    let official = para01OfficialData as ParaDataOfficial;
    let lectureText = para01LectureRaw;

    if (typeof window !== 'undefined' && window.location.protocol !== 'file:') {
      try {
        const fetchedOfficial = await fetchWithFallback<ParaDataOfficial>(
          './content/para-01/para.json',
          para01OfficialData as ParaDataOfficial
        );
        const fetchedLecture = await fetchTextWithFallback(
          './content/para-01/maruza.md',
          para01LectureRaw
        );
        official = fetchedOfficial;
        lectureText = fetchedLecture;
      } catch {
        // use bundled
      }
    }

    return { official, lectureText };
  }

  // Generate official placeholder for paras 2 to 30
  const allParas = await getParasIndex();
  const summary = allParas.find((p) => p.number === paraNumber) || {
    id: `para-${String(paraNumber).padStart(2, '0')}`,
    number: paraNumber,
    title: `${paraNumber}-mavzu`,
    hours: 2,
    section: 'Xavfsizlik',
    outcomes: ['ON2'],
    methods: ['Aqliy hujum', 'Keys-stadi', 'Amaliy mashqlar va simulyatsiya'],
    shortDescription: 'Mavzuga oid amaliy va nazariy ko\'nikmalar majmui.',
    hasVideo: true,
    hasSlides: true,
    hasDidactic: true,
    hasTests: true,
    hasGlossary: true,
  };

  const official = createPlaceholderOfficial(summary);
  const lectureText = createPlaceholderLecture(summary);

  return { official, lectureText };
}

function createPlaceholderOfficial(summary: ParaSummary): ParaDataOfficial {
  const num = summary.number;
  const numStr = String(num).padStart(2, '0');

  const methods: MethodItem[] = [
    {
      name: summary.methods[0] || 'Aqliy hujum',
      stage: 'Boshlanish (10 daqiqa)',
      description: `«${summary.title}» mavzusiga oid dastlabki tushunchalar va xavfsizlik muammolari yuzasidan tezkor savol-javob o'tkaziladi.`,
    },
    {
      name: summary.methods[1] || 'Keys-stadi',
      stage: 'Asosiy qism (25 daqiqa)',
      description: `Mavzuga doir real kiberhujum yoki xavfsizlik zaifligi holati kichik guruhlarda tahlil qilinadi va mudofaa choralari taklif etiladi.`,
    },
    {
      name: summary.methods[2] || 'Amaliy mashqlar va simulyatsiya',
      stage: 'Amaliyot (30 daqiqa)',
      description: `Izolyatsiyalangan sinov muhitida konfiguratsiyalar tekshiriladi va mudofaa mexanizmlari joriy qilinadi.`,
    },
  ];

  const tests: TestItem[] = [
    {
      q: `«${summary.title}» mavzusining asosiy maqsadi nima?`,
      options: [
        'Tizim xavfsizligini ta\'minlash va xavflarni kamaytirish',
        'Faqat kompyuter o\'yinlarini o\'rnatish',
        'Ma\'lumotlarni zaxirasiz o\'chirib yuborish',
        'Tarmoq kabelini uzib qo\'yish',
      ],
      answer: 0,
      explain: 'Kiberxavfsizlikning har qanday parasi tizim barqarorligi va mudofaani kuchaytirishga qaratilgan.',
    },
    {
      q: 'Mudofaa choralari qaysi tamoyilga asoslanishi lozim?',
      options: [
        'Yagona paroldan doimiy foydalanish',
        'Chuqurlashtirilgan himoya (Defense in depth)',
        'Xavfsizlik jurnallarini o\'chirib tashlash',
        'Hech qanday yangilanishlarni o\'rnatmaslik',
      ],
      answer: 1,
      explain: 'Ko\'p pog\'onali himoya (Defense in depth) bitta himoya vositasi ishlamay qolganda ham boshqalari xavfsizlikni saqlab qolishini kafolatlaydi.',
    },
    {
      q: 'Xavfsizlik hodisasi yuz berganda birinchi navbatda nima qilinadi?',
      options: [
        'Hodisani qayd etish va tegishli javob guruhiga xabar berish',
        'Tizimni tezda formatlab yuborish',
        'Barcha dalillarni o\'chirib tashlash',
        'Hech kimga aytmasdan kutish',
      ],
      answer: 0,
      explain: 'Insidentga to\'g\'ri javob qaytarish uchun avvalo vaziyatni to\'g\'ri qayd etish va xabar qilish zarur.',
    },
    {
      q: 'Quyidagilardan qaysi biri xavfsizlik talablariga zid?',
      options: [
        'Zaif va takrorlanuvchi parollardan foydalanish',
        'Ko\'p omilli autentifikatsiyani (MFA) yoqish',
        'Muntazam zaxira nusxalarini yaratish',
        'Dasturiy ta\'minot yangilanishlarini o\'rnatish',
      ],
      answer: 0,
      explain: 'Zaif parollar eng keng tarqalgan xavfsizlik zaifliklaridan biridir.',
    },
    {
      q: 'Axborot xavfsizligi auditi nima uchun o\'tkaziladi?',
      options: [
        'Tizimdagi mavjud zaifliklarni aniqlash va bartaraf etish uchun',
        'Kompyuterlar sonini kamaytirish uchun',
        'Faqat xodimlarni jazolash uchun',
        'Internet tezligini o\'lchash uchun',
      ],
      answer: 0,
      explain: 'Xavfsizlik auditi zaif nuqtalarni topib, tizim mudofaasini kuchaytirishga xizmat qiladi.',
    },
  ];

  const glossary = [
    {
      term: summary.title.split(' ')[0] || 'Atama',
      def: `${summary.title} mavzusida qo'llaniladigan tayanch ilmiy-amaliy atama.`,
    },
    {
      term: 'Mudofaa arxitekturasi',
      def: 'Axborot tizimini himoyalash uchun birgalikda ishlovchi texnik va tashkiliy choralar majmuasi.',
    },
    {
      term: 'Kibergigiyena',
      def: 'Foydalanuvchilar tomonidan tizim xavfsizligini ta\'minlash uchun har kuni bajarilishi lozim bo\'lgan odatiy ehtiyot choralari.',
    },
  ];

  return {
    id: num,
    title: summary.title,
    hours: summary.hours,
    outcomes: summary.outcomes,
    goal: `Talaba «${summary.title}» mavzusi bo'yicha nazariy tushunchalarni, tahdidlarni tahlil qilish va amaliy mudofaa usullarini tushuntira oladi.`,
    lectureFile: `lecture-${numStr}.md`,
    methods,
    video: {
      file: `media/para-${numStr}.mp4`,
      src: `./content/para-${numStr}/video.mp4`,
      durationMin: 12,
      resolution: '1280x720',
      poster: `media/para-${numStr}.jpg`,
      timestamps: [
        { time: '00:00', title: 'Kirish va asosiy tushunchalar' },
        { time: '04:30', title: 'Tahdidlar va zaifliklar tahlili' },
        { time: '08:45', title: 'Mudofaa mexanizmlari va amaliy tavsiyalar' },
      ],
      transcripts: [
        { time: '00:15', speaker: 'O\'qituvchi', text: `Assalomu alaykum! Bugungi mashg'ulotimiz «${summary.title}» mavzusiga bag'ishlanadi.` },
        { time: '05:00', speaker: 'O\'qituvchi', text: 'Mavzuni o\'rganishda xavfsizlikning ko\'p pog\'onali tamoyillariga tayanamiz.' },
      ],
    },
    slides: {
      file: `slides/para-${numStr}.pdf`,
      count: 10,
    },
    didactic: [
      {
        type: 'image',
        file: `didactic/diagram-${numStr}.png`,
        caption: `${summary.title} bo'yicha tizimli xavfsizlik modeli`,
        description: 'Tizimning asosiy himoya qatlamlari va tahdidlar o\'rtasidagi munosabat sxemasi.',
      },
    ],
    practice: {
      title: `${summary.title} bo'yicha amaliy topshiriq`,
      task: 'Mavzu doirasida xavfsizlik parametrlarini tekshirish, zaifliklarni aniqlash va mudofaa hisobotini rasmiylashtirish.',
      items: [
        'Konfiguratsiya parametrlarini standart talablar (CIS Benchmark) bo\'yicha tekshirish.',
        'Aniqlangan og\'ishlarni xavfsizlik jurnali (audit log) bilan solishtirish.',
        'Xavflarni kamaytirish bo\'yicha 3 ta ustuvor tavsiya ishlab chiqish.',
      ],
    },
    reviewQuestions: [
      `«${summary.title}» ning kiberxavfsizlikdagi asosiy ahamiyati nima?`,
      'Mazkur sohadagi eng ko\'p uchraydigan tahdidlar qaysilar?',
      'Himoya mexanizmlari qanday bosqichlarda joriy etiladi?',
      'Inson omilining ushbu mavzuga ta\'siri qanday baholanadi?',
    ],
    tests,
    glossary,
  };
}

function getReferencesForTopic(summary: ParaSummary): string[] {
  switch (summary.section) {
    case 'Kriptografiya va PKI':
      return [
        "O'zbekiston Respublikasining «Elektron raqamli imzo to'g'risida»gi Qonuni, O'RQ-793-son, 12.10.2022 y.",
        "O'z DSt 1092:2009. Axborot texnologiyasi. Kriptografik himoya. Ma'lumotlarni shifrlash algoritmi.",
        "Ganiyev S.K. Kriptografik himoya usullari. – Toshkent: Fan va texnologiya, 2018. – 248 b.",
        "Ferguson N., Schneier B., Kohno T. Cryptography Engineering: Design Principles and Practical Applications. – Wiley, 2010. – 384 p.",
        "Stallings W. Cryptography and Network Security: Principles and Practice. – 8th Edition. Pearson, 2020. – 780 p.",
        "RFC 5280. Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile."
      ];
    case 'Tarmoq xavfsizligi':
      return [
        "Kurose J.F., Ross K.W. Computer Networking: A Top-Down Approach. – 8th Edition. Pearson, 2021. – 800 p.",
        "Stallings W. Network Security Essentials: Applications and Standards. – 6th Edition. Pearson, 2017. – 464 p.",
        "NIST SP 800-94 Rev. 2. Guide to Intrusion Detection and Prevention Systems (IDPS). – NIST, 2021.",
        "RFC 8446. The Transport Layer Security (TLS) Protocol Version 1.3. – IETF, 2018.",
        "Yuldashev A.A. Tarmoq xavfsizligi va protokollar auditi. – Toshkent: Fan va texnologiya, 2022. – 216 b.",
        "IEEE 802.11ax/WPA3 Specification. Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications."
      ];
    case 'Tizim va dasturlar':
      return [
        "OWASP Top 10:2021. The Ten Most Critical Web Application Security Risks. – Open Web Application Security Project, 2021.",
        "Nemeth E., Snyder G., Hein T.R., Whaley B. UNIX and Linux System Administration Handbook. – 5th Edition. Addison-Wesley, 2017. – 1184 p.",
        "Howard M., LeBlanc D. Writing Secure Code. – 2nd Edition. Microsoft Press, 2003. – 768 p.",
        "NIST SP 800-63B. Digital Identity Guidelines: Authentication and Lifecycle Management. – NIST, 2020.",
        "CIS Benchmarks. Center for Internet Security Configuration Guides for Operating Systems and Databases, 2023.",
        "Karimov M.M. Axborot tizimlari va veb-ilovalarni himoyalash. – Toshkent: Fan va texnologiya, 2020. – 240 b."
      ];
    case 'Zaifliklar, bulut va OT':
      return [
        "NIST SP 800-145. The NIST Definition of Cloud Computing. – NIST Special Publication.",
        "Vacca J.R. Cloud Security: Risks, Criticality and Solutions. – CRC Press, 2020. – 360 p.",
        "NIST SP 800-82 Rev. 2. Guide to Industrial Control Systems (ICS) Security. – NIST, 2015.",
        "NIST SP 800-61 Rev. 2. Computer Security Incident Handling Guide. – NIST, 2012.",
        "ISO/IEC 27031:2011. Guidelines for information and communication technology readiness for business continuity.",
        "Ganiyev S.K. Korporativ axborot tizimlari xavfsizligi monitoringi. – Toshkent: Aloqachi, 2021. – 208 b."
      ];
    case 'Hodisalar va amaliy yakun':
      return [
        "O'zbekiston Respublikasining «Kiberxavfsizlik to'g'risida»gi Qonuni, O'RQ-764-son, 15.04.2022 y.",
        "NIST SP 800-115. Technical Guide to Information Security Testing and Assessment. – NIST.",
        "Weidman G. Penetration Testing: A Hands-On Introduction to Hacking. – No Starch Press, 2014. – 528 p.",
        "ISO/IEC 27037:2012. Guidelines for identification, collection, acquisition and preservation of digital evidence.",
        "Casey E. Digital Evidence and Computer Crime: Forensic Science, Computers, and the Internet. – 3rd Edition. Academic Press, 2011. – 840 p.",
        "MITRE ATT&CK® Enterprise Matrix. Adversarial Tactics, Techniques, and Common Knowledge. – attack.mitre.org, 2023."
      ];
    case 'Axborot xavfsizligi asoslari':
    default:
      return [
        "O'zbekiston Respublikasining «Kiberxavfsizlik to'g'risida»gi Qonuni, O'RQ-764-son, 15.04.2022 y.",
        "O'zbekiston Respublikasining «Axborotlashtirish to'g'risida»gi Qonuni, O'RQ-560-II, 11.12.2003 y.",
        "Ganiyev S.K., Karimov M.M., Tashev K.A. Axborot xavfsizligi. Darslik. – Toshkent: Fan va texnologiya, 2019. – 380 b.",
        "Yuldashev A.A., Karimov M.M. Kiberxavfsizlik asoslari. O'quv qo'llanma. – Toshkent: Aloqachi, 2021. – 264 b.",
        "Stallings W. Computer Security: Principles and Practice. – 4th Edition. Pearson, 2018. – 832 p.",
        "ISO/IEC 27001:2022. Information security, cybersecurity and privacy protection — Information security management systems — Requirements."
      ];
  }
}

function createPlaceholderLecture(summary: ParaSummary): string {
  const num = summary.number;
  const references = getReferencesForTopic(summary);
  const referencesMd = references.map((ref, idx) => `${idx + 1}. ${ref}`).join('\n');

  return `# ${num}-mavzu. ${summary.title}

**Reja:**
1. ${summary.title} bo'yicha tayanch tushunchalar va fanning maqsadi
2. Asosiy tahdidlar, xavf-xatarlar va zaifliklar tahlili
3. Zamonaviy himoya mexanizmlari va xalqaro tajriba
4. Foydalanilgan adabiyotlar

---

## 1. Tayanch tushunchalar va fanning maqsadi

Axborotlashgan jamiyatda tizimlarning xavfsiz va uzluksiz ishlashini ta'minlash ustuvor vazifa sanaladi. Mazkur ${num}-mavzuda ko'rilayotgan «${summary.title}» yo'nalishi zamonaviy kiberxavfsizlik arxitekturasining ajralmas qismidir. Axborot aktivlarini to'g'ri tasniflash, unga nisbatan xavflarni baholash va himoya perimetrini shakllantirish mutaxassisdan tizimli yondashuvni talab qiladi.

Axborot xavfsizligining muvozanatli himoya modeli har doim uchta ustunga tayanadi: axborotning faqat vakolatli shaxslarga ko'rinishi (maxfiylik), uning ruxsatsiz o'zgartirilmasligi (yaxlitlik) hamda kerakli vaqtda uzluksiz taqdim etilishi (mavjudlik). Ushbu mavzu bevosita mazkur ustunlarni ta'minlash mexanizmlarini yoritadi.

---

## 2. Asosiy tahdidlar, xavf-xatarlar va zaifliklar tahlili

Bugungi kunda kiberhujumlar ko'p bosqichli va murakkab ko'rinish kasb etmoqda. Texnik nosozliklar bilan bir qatorda, dasturiy zaifliklar va inson omili xavfsizlikka putur yetkazuvchi asosiy omillardan hisoblanadi.

Tizimdagi zaifliklar o'z vaqtida aniqlanmasa, hujumchi ulardan foydalanib butun korporativ tarmoq ustidan nazoratni qo'lga kiritishi yoki maxfiy ma'lumotlarni sizdirishi mumkin. Shu sababli tahdidlarni modellashtirish (Threat Modeling) va zaifliklarni baholash muntazam amalga oshirilishi shart.

---

## 3. Zamonaviy himoya mexanizmlari va xalqaro tajriba

Tizim mudofaasida yagona vositaga suyanish zamonaviy tahdidlar qarshisida samarasizdir. «Chuqurlashtirilgan himoya» (Defense in Depth) konsepsiyasiga binoan quyidagi qatlamlar uyg'unlikda ishlashi zarur:
1. Tashkiliy va me'yoriy qoidalar, xodimlarning kibergigiyena madaniyati;
2. Tarmoq perimetri himoyasi (Firewall, IDS/IPS, VPN);
3. Xost va operatsion tizim xavfsizligi (Hardening, EDR);
4. Ma'lumotlarni shifrlash va zaxira nusxalash (Backup, DRP).

**Xulosa.** «${summary.title}» mavzusi bo'yicha bilim va amaliy ko'nikmalarni egallash talabaga real ishlab chiqarish tizimlarida mustahkam mudofaa barpo etish va hodisalarga professional darajada javob berish imkonini yaratadi.

---

## 4. Foydalanilgan adabiyotlar

${referencesMd}`;
}
