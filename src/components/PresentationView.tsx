import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Monitor, FileText } from 'lucide-react';
import { PresentationData } from '../types';

interface PresentationViewProps {
  presentation: PresentationData;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ presentation }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const slides = presentation.slides;
  const currentSlide = slides[currentSlideIdx];

  const handlePrev = () => {
    setCurrentSlideIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIdx((prev) => Math.min(slides.length - 1, prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              {presentation.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Slayd {currentSlideIdx + 1} / {slides.length} • Hajmi: {presentation.fileSize}
            </p>
          </div>
        </div>

        <a
          href={presentation.downloadUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Taqdimotni yuklab olish (.pptx)</span>
        </a>
      </div>

      {/* Slide Canvas Simulator */}
      <div className="relative mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-900 p-6 sm:p-12 text-white shadow-xl dark:border-slate-800 min-h-[360px] flex flex-col justify-between overflow-hidden">
        {/* Slide Background Subtle Accent */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="relative z-10 border-b border-slate-700/60 pb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium tracking-wider uppercase text-brand-400">Kiberxavfsizlik RTR</span>
            <span>Slayd #{currentSlide.slideNumber}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
            {currentSlide.title}
          </h2>
          {currentSlide.subtitle && (
            <p className="mt-1 text-sm text-slate-300 font-medium">
              {currentSlide.subtitle}
            </p>
          )}
        </div>

        {/* Slide Content Bullets */}
        <div className="relative z-10 my-8 space-y-4">
          <ul className="space-y-3">
            {currentSlide.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-400 shrink-0" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide Footer with Controls */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlideIdx(idx)}
                aria-label={`Slayd ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIdx ? 'w-6 bg-brand-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentSlideIdx === 0}
              aria-label="Oldingi slayd"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentSlideIdx === slides.length - 1}
              aria-label="Keyingi slayd"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes */}
      {currentSlide.speakerNotes && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 flex items-start gap-3">
          <FileText className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Ma'ruzachi izohi (Speaker Notes):</span>
            <p className="mt-1 leading-relaxed">{currentSlide.speakerNotes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

