import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Download, Monitor, Presentation } from 'lucide-react';
import { SlideItem } from '../types';

interface SlideViewerProps {
  slidesCount?: number;
  paraNumber: number;
  paraTitle: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    slideNumber: 1,
    title: "Kiberxavfsizlik faniga kirish",
    subtitle: "RTR • 60 akademik soat • TD-50610401",
    bullets: [
      "Raqamli jamiyatda axborotning strategik o'rni va tahdidlar",
      "Kiberxavfsizlik va axborot xavfsizligi o'rtasidagi bog'liqlik",
      "Kursning asosiy maqsadi va kutilayotgan o'quv natijalari (ON1–ON4)",
    ],
  },
  {
    slideNumber: 2,
    title: "Axborot xavfsizligining CIA triadasi",
    subtitle: "Fundamental xavfsizlik modeli",
    bullets: [
      "Maxfiylik (Confidentiality) — faqat vakolatli foydalanuvchilar kirishi",
      "Yaxlitlik (Integrity) — axborotning ruxsatsiz o'zgartirilmasligi",
      "Mavjudlik (Availability) — xizmatlarning o'z vaqtida ishlab turishi",
    ],
  },
  {
    slideNumber: 3,
    title: "Chuqurlashtirilgan himoya (Defense in Depth)",
    subtitle: "Ko'p pog'onali mudofaa strategiyasi",
    bullets: [
      "Perimetr xavfsizligi: Firewall devorlari va VPN shifrlash",
      "Tarmoq va xostlar: IDS/IPS va operatsion tizimni mustahkamlash",
      "Dasturiy qatlam: OWASP zaifliklaridan himoyalanish",
      "Inson omili: Xodimlarning kibergigiyena madaniyati",
    ],
  },
  {
    slideNumber: 4,
    title: "Zamonaviy tahdidlar landshafti (Threat Landscape)",
    subtitle: "Kiberhujumlarning yangi tendensiyalari",
    bullets: [
      "Ransomware tovlamachi dasturlari va nishonli fishing",
      "Bulutli xizmatlar va IoT qurilmalarining zaif nuqtalari",
      "Sun'iy intellektdan mudofaa va tahdid uchun foydalanish",
    ],
  },
  {
    slideNumber: 5,
    title: "Xulosa va amaliy ko'rsatmalar",
    subtitle: "Mavzu bo'yicha mustaqil topshiriqlar",
    bullets: [
      "CIA triadasiga oid amaliy laboratoriya simulyatsiyasini bajarish",
      "Oraliq nazorat testidan o'tish (kamida 60% o'tish bali)",
      "Keyingi 2-paraga tayyorgarlik ko'rish",
    ],
  },
];

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slidesCount = 10,
  paraNumber,
  paraTitle,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slides = DEFAULT_SLIDES;
  const currentSlide = slides[currentIdx] || slides[0];

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIdx((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIdx((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-border bg-surface p-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Presentation className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-text text-sm">
              Mavzu taqdimoti (Slaydlar)
            </h3>
            <p className="text-[11px] text-muted">
              Slayd {currentIdx + 1} / {slides.length} • Klaviaturada: ← / →
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:text-text hover:bg-surface-2 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Kichraytirish' : 'To\'liq ekran'}</span>
          </button>

          <a
            href={`./content/para-01/taqdimot.pptx`}
            download
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-hover transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Taqdimotni yuklab olish (.pptx)</span>
          </a>
        </div>
      </div>

      {/* Main Slide Screen */}
      <div
        ref={containerRef}
        className="relative mx-auto aspect-video max-w-4xl rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 sm:p-12 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Decorative corner cyber accents */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-accent-soft blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-32 w-32 bg-accent-2-soft blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="relative z-10 border-b border-border/80 pb-4">
          <div className="flex items-center justify-between text-xs text-muted mb-1">
            <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
              {paraNumber}-para • Kiberxavfsizlik RTR
            </span>
            <span className="rounded-chip bg-surface px-2.5 py-0.5 font-mono text-[11px] border border-border">
              {currentIdx + 1} / {slides.length}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-text tracking-tight">
            {currentSlide.title}
          </h2>
          {currentSlide.subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-accent font-medium">
              {currentSlide.subtitle}
            </p>
          )}
        </div>

        {/* Slide Body Bullets */}
        <div className="relative z-10 my-6 space-y-3 sm:space-y-4">
          <ul className="space-y-2.5 sm:space-y-3.5">
            {currentSlide.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-base text-text">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide Navigation Controls */}
        <div className="relative z-10 flex items-center justify-between border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="flex h-8 w-8 items-center justify-center rounded-btn border border-border bg-surface text-text hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-xs text-muted font-medium font-mono">
            Slayd {currentIdx + 1}
          </span>

          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentIdx === slides.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-btn border border-border bg-surface text-text hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide Thumbnails Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {slides.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIdx(idx)}
            className={`shrink-0 w-32 aspect-video rounded-xl border p-2 text-left transition-all ${
              idx === currentIdx
                ? 'border-accent bg-accent-soft ring-2 ring-accent/30'
                : 'border-border bg-surface hover:bg-surface-2'
            }`}
          >
            <span className="font-mono text-[9px] font-bold text-muted block mb-1">
              #{s.slideNumber}
            </span>
            <p className="text-[10px] font-bold text-text truncate">
              {s.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

