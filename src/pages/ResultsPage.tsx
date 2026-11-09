import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, CheckCircle2, Clock, AlertTriangle, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';
import { ParaSummary, OutcomeItem, UserProgress } from '../types';
import { getParasIndex, getOutcomes } from '../services/contentService';
import { getProgress, resetAllProgress } from '../services/progressService';

const SECTIONS = [
  { name: 'Axborot xavfsizligi asoslari', range: [1, 5] },
  { name: 'Kriptografiya va PKI', range: [6, 8] },
  { name: 'Tarmoq xavfsizligi', range: [9, 13] },
  { name: 'Tizim va dasturlar', range: [14, 20] },
  { name: 'Zaifliklar, bulut va OT', range: [21, 25] },
  { name: 'Hodisalar va amaliy yakun', range: [26, 30] },
];

export const ResultsPage: React.FC = () => {
  const [paras, setParas] = useState<ParaSummary[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeItem[]>([]);
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    getParasIndex().then(setParas);
    getOutcomes().then(setOutcomes);
    setProgress(getProgress());
  }, []);

  const completedCount = progress.completedParas.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const quizEntries = Object.entries(progress.quizScores);
  const quizAvg =
    quizEntries.length > 0
      ? Math.round(
          quizEntries.reduce((acc, [, score]) => acc + score, 0) / quizEntries.length
        )
      : 0;

  const handleReset = () => {
    const updated = resetAllProgress();
    setProgress(updated);
    setShowConfirmReset(false);
  };

  // SVG Progress Ring Calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card">
        <div>
          <div className="inline-flex items-center gap-2 rounded-chip bg-accent-soft px-3 py-1 text-xs font-bold text-accent mb-2">
            <Award className="h-4 w-4" />
            <span>Shaxsiy ta'lim monitoringi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
            O'zlashtirish va Natijalar
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            Modul bo'yicha mavzular, oraliq testlar va ON1–ON4 ta'limiy natijalari bo'yicha shaxsiy ko'rsatkichlaringiz.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirmReset(true)}
          className="inline-flex items-center gap-2 rounded-btn border border-danger/40 bg-surface px-4 py-2 text-xs font-bold text-danger hover:bg-danger/10 transition-colors shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Progressni tozalash</span>
        </button>
      </div>

      {/* Overview Grid: Ring + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Animated Progress Ring Card */}
        <div className="md:col-span-5 rounded-card border border-border bg-surface p-6 shadow-card flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                className="text-surface-2"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-accent transition-all duration-700 ease-out"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-text">{progressPercent}%</span>
              <span className="text-[10px] text-muted uppercase font-mono">Umumiy</span>
            </div>
          </div>

          <h3 className="mt-4 font-bold text-base text-text">
            {completedCount} / 30 ta mavzu yakunlandi
          </h3>
          <p className="text-xs text-muted mt-1">
            {progressPercent >= 100
              ? "Tabriklaymiz, butun kursni to'liq o'zlashtirdingiz!"
              : "Darslarni bosqichma-bosqich davom ettiring."}
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-card border border-border bg-surface p-5 shadow-card space-y-1">
            <span className="text-xs text-muted">Testlar o'rtacha bali</span>
            <p className="text-3xl font-extrabold text-accent">
              {quizEntries.length > 0 ? `${quizAvg}%` : '—'}
            </p>
            <p className="text-[11px] text-muted">
              {quizEntries.length} ta mavzu bo'yicha test topshirildi
            </p>
          </div>

          <div className="rounded-card border border-border bg-surface p-5 shadow-card space-y-1">
            <span className="text-xs text-muted">Oflayn saqlash holati</span>
            <p className="text-3xl font-extrabold text-success">100%</p>
            <p className="text-[11px] text-muted">
              localStorage (file:// va Netlify uchun mos)
            </p>
          </div>

          <div className="rounded-card border border-border bg-surface p-5 shadow-card space-y-1 sm:col-span-2">
            <span className="text-xs text-muted">Eng so'nggi faollik</span>
            <p className="text-sm font-bold text-text">
              {progress.lastVisitedPara}-mavzu ({progress.lastVisitedTab} bo'limi)
            </p>
            <p className="text-[11px] text-muted">
              Tizim siz to'xtagan joyni avtomatik eslab qoladi.
            </p>
          </div>
        </div>
      </div>

      {/* Per-Section Progress Bars */}
      <div className="rounded-card border border-border bg-surface p-6 shadow-card space-y-4">
        <h3 className="font-bold text-base text-text flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-accent" />
          <span>Bo'limlar bo'yicha o'zlashtirish (6 ta modul)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {SECTIONS.map((sec) => {
            const secParas = paras.filter((p) => p.number >= sec.range[0] && p.number <= sec.range[1]);
            const completedInSec = secParas.filter((p) => progress.completedParas.includes(p.number)).length;
            const pct = secParas.length > 0 ? Math.round((completedInSec / secParas.length) * 100) : 0;

            return (
              <div key={sec.name} className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text">{sec.name}</span>
                  <span className="font-mono text-muted">{completedInSec}/{secParas.length} ({pct}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface overflow-hidden border border-border">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-Outcome Mastery (ON1–ON4) */}
      <div className="rounded-card border border-border bg-surface p-6 shadow-card space-y-4">
        <h3 className="font-bold text-base text-text flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <span>Ta'limiy natijalar (ON1–ON4) bo'yicha o'zlashtirish</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {outcomes.map((on) => {
            const onParas = paras.filter((p) => p.outcomes.includes(on.code));
            const completed = onParas.filter((p) => progress.completedParas.includes(p.number)).length;
            const pct = onParas.length > 0 ? Math.round((completed / onParas.length) * 100) : 0;

            return (
              <div key={on.id} className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded">
                    {on.code}
                  </span>
                  <span className="font-mono text-xs font-bold text-text">{pct}%</span>
                </div>
                <h4 className="font-bold text-xs text-text truncate">{on.title}</h4>
                <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full bg-accent-2 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmReset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-card border border-border bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-danger">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-bold text-base text-text">Progressni tozalash</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Haqiqatan ham barcha o'zlashtirilgan mavzular va test natijalarini boshlang'ich holatga qaytarmoqchimisiz? Ushbu amalni bekor qilib bo'lmaydi.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="rounded-btn border border-border bg-surface px-4 py-2 text-xs font-semibold text-text hover:bg-surface-2"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-btn bg-danger px-4 py-2 text-xs font-bold text-white hover:bg-danger/90"
              >
                Ha, tozalansin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

