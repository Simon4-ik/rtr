import React, { useState } from 'react';
import { ZoomIn, ZoomOut, X, Download, Layers, ShieldCheck, Info } from 'lucide-react';
import { DidacticItem } from '../types';

interface DidacticGalleryProps {
  items: DidacticItem[];
  paraNumber: number;
}

export const DidacticGallery: React.FC<DidacticGalleryProps> = ({ items, paraNumber }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-border bg-surface p-5 shadow-card">
        <h3 className="text-base sm:text-lg font-bold text-text">
          Ko'rgazmali materiallar va vizual didaktika
        </h3>
        <p className="text-xs text-muted mt-1">
          Kiberxavfsizlik modellarini chuqur tushunish uchun infografikalar, arxitektura sxemalari va mnemotexnik jadvallar.
        </p>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: CIA Triad Interactive SVG Diagram */}
        <div
          onClick={() => openLightbox(0)}
          className="group cursor-pointer rounded-card border border-border bg-surface p-5 shadow-card hover:border-accent/40 hover:shadow-card-hover transition-all space-y-4"
        >
          <div className="relative aspect-video w-full rounded-xl bg-surface-2/60 flex items-center justify-center p-4 overflow-hidden border border-border">
            {/* Vector CIA Diagram */}
            <svg viewBox="0 0 300 200" className="w-full h-full max-h-48">
              {/* Outer triangle */}
              <polygon
                points="150,25 40,175 260,175"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              {/* Inner glowing core */}
              <circle cx="150" cy="115" r="28" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
              <text x="150" y="118" textAnchor="middle" fill="var(--color-text)" fontSize="10" fontWeight="bold">XAVFSIZ</text>
              <text x="150" y="129" textAnchor="middle" fill="var(--color-muted)" fontSize="8">AXBOROT</text>

              {/* Node 1: Maxfiylik */}
              <circle cx="150" cy="25" r="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
              <text x="150" y="28" textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="bold">M</text>
              <text x="150" y="52" textAnchor="middle" fill="var(--color-accent)" fontSize="9" fontWeight="bold">MAXFIYLIK</text>

              {/* Node 2: Yaxlitlik */}
              <circle cx="40" cy="175" r="16" fill="var(--color-surface)" stroke="#6366F1" strokeWidth="2" />
              <text x="40" y="178" textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="bold">Y</text>
              <text x="50" y="195" textAnchor="middle" fill="#6366F1" fontSize="9" fontWeight="bold">YAXLITLIK</text>

              {/* Node 3: Mavjudlik */}
              <circle cx="260" cy="175" r="16" fill="var(--color-surface)" stroke="#22C55E" strokeWidth="2" />
              <text x="260" y="178" textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="bold">M</text>
              <text x="250" y="195" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">MAVJUDLIK</text>
            </svg>

            <div className="absolute top-3 right-3 rounded-chip bg-surface/90 px-2 py-0.5 text-[10px] font-mono text-muted border border-border flex items-center gap-1 group-hover:text-accent">
              <ZoomIn className="h-3 w-3" />
              <span>Kattalashtirish</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text text-sm">
              CIA Triadasi — Axborot xavfsizligining bazaviy modeli
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Maxfiylik (shifrlash), Yaxlitlik (xesh, ERI) va Mavjudlik (zaxira va klasterlar) o'rtasidagi muvozanat sxemasi.
            </p>
          </div>
        </div>

        {/* Card 2: Defense in Depth (Chuqurlashtirilgan himoya) Diagram */}
        <div
          onClick={() => openLightbox(1)}
          className="group cursor-pointer rounded-card border border-border bg-surface p-5 shadow-card hover:border-accent/40 hover:shadow-card-hover transition-all space-y-4"
        >
          <div className="relative aspect-video w-full rounded-xl bg-surface-2/60 flex items-center justify-center p-4 overflow-hidden border border-border">
            {/* Concentric Layers Diagram */}
            <svg viewBox="0 0 300 200" className="w-full h-full max-h-48">
              {/* Concentric circles */}
              <circle cx="150" cy="100" r="85" fill="none" stroke="var(--color-border)" strokeWidth="2" />
              <circle cx="150" cy="100" r="65" fill="none" stroke="var(--color-accent-soft)" strokeWidth="8" />
              <circle cx="150" cy="100" r="45" fill="none" stroke="var(--color-accent-2-soft)" strokeWidth="8" />
              <circle cx="150" cy="100" r="25" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />

              <text x="150" y="98" textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="bold">MA'LUMOT</text>
              <text x="150" y="108" textAnchor="middle" fill="var(--color-accent)" fontSize="7">DATA</text>

              <text x="150" y="50" textAnchor="middle" fill="var(--color-text)" fontSize="8">Xost va Tizim (OS)</text>
              <text x="150" y="30" textAnchor="middle" fill="var(--color-muted)" fontSize="8">Tarmoq va Perimetr</text>
              <text x="150" y="12" textAnchor="middle" fill="var(--color-muted)" fontSize="8">Siyosat va Inson omili</text>
            </svg>

            <div className="absolute top-3 right-3 rounded-chip bg-surface/90 px-2 py-0.5 text-[10px] font-mono text-muted border border-border flex items-center gap-1 group-hover:text-accent">
              <ZoomIn className="h-3 w-3" />
              <span>Kattalashtirish</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text text-sm">
              Chuqurlashtirilgan himoya (Defense in Depth) qatlamlari
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Jismoniy himoya, perimetr, ichki tarmoq, xost, dastur va ma'lumotlar sathidagi konsentrik to'siqlar.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Toolbar */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-text text-sm sm:text-base">
                {selectedIdx === 0
                  ? "Axborot xavfsizligining CIA triadasi modeli"
                  : "Chuqurlashtirilgan himoya (Defense in Depth) sxemasi"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.2))}
                  aria-label="Kichraytirish"
                  className="rounded-btn border border-border p-1.5 text-muted hover:text-text"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-xs font-mono text-muted">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.2))}
                  aria-label="Kattalashtirish"
                  className="rounded-btn border border-border p-1.5 text-muted hover:text-text"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Yopish"
                  className="rounded-btn border border-border p-1.5 text-muted hover:text-text ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Canvas */}
            <div className="relative min-h-[300px] sm:min-h-[360px] rounded-xl bg-surface-2 flex items-center justify-center p-6 overflow-hidden">
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
                className="w-full max-w-lg"
              >
                {selectedIdx === 0 ? (
                  <svg viewBox="0 0 300 200" className="w-full h-auto">
                    <polygon points="150,25 40,175 260,175" fill="none" stroke="var(--color-accent)" strokeWidth="3" />
                    <circle cx="150" cy="115" r="32" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="2" />
                    <text x="150" y="118" textAnchor="middle" fill="var(--color-text)" fontSize="11" fontWeight="bold">XAVFSIZ</text>
                    <text x="150" y="130" textAnchor="middle" fill="var(--color-muted)" fontSize="9">AXBOROT</text>
                    <circle cx="150" cy="25" r="20" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <text x="150" y="29" textAnchor="middle" fill="var(--color-accent)" fontSize="11" fontWeight="bold">M</text>
                    <circle cx="40" cy="175" r="20" fill="var(--color-surface)" stroke="#6366F1" strokeWidth="2.5" />
                    <text x="40" y="179" textAnchor="middle" fill="#6366F1" fontSize="11" fontWeight="bold">Y</text>
                    <circle cx="260" cy="175" r="20" fill="var(--color-surface)" stroke="#22C55E" strokeWidth="2.5" />
                    <text x="260" y="179" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">M</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 300 200" className="w-full h-auto">
                    <circle cx="150" cy="100" r="95" fill="none" stroke="var(--color-border)" strokeWidth="2" />
                    <circle cx="150" cy="100" r="75" fill="none" stroke="var(--color-accent-soft)" strokeWidth="10" />
                    <circle cx="150" cy="100" r="50" fill="none" stroke="var(--color-accent-2-soft)" strokeWidth="10" />
                    <circle cx="150" cy="100" r="28" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <text x="150" y="103" textAnchor="middle" fill="var(--color-text)" fontSize="9" fontWeight="bold">DATA</text>
                  </svg>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-muted leading-relaxed">
              <strong>Ilmiy tavsif:</strong> Ushbu didaktik chizma kiberxavfsizlik fanining 60 soatlik dasturiga muvofiq, axborot aktivlarini turli pog'onadagi hujumlardan himoya qilishning kompleks arxitekturasini ifodalaydi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

