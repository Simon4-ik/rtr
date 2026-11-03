import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Play,
  BookOpen,
  Award,
  Video,
  Clock,
  CheckCircle2,
  Sparkles,
  Search,
  Check,
  Brain,
  Users,
  Wrench,
  ChevronRight,
  ShieldAlert,
  Lock,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { ModuleInfo, ParaSummary, OutcomeItem } from '../types';
import { getModuleInfo, getParasIndex, getOutcomes } from '../services/contentService';
import { getProgress } from '../services/progressService';
import { HeroIllustration } from '../components/HeroIllustration';

const OFFICIAL_METHODS = [
  {
    name: 'Aqliy hujum',
    icon: Brain,
    description: 'Kundalik raqamli xavf-xatarlar va tahdidlarni tezkor erkin baholash metodikasi.',
  },
  {
    name: 'Keys-stadi',
    icon: Sparkles,
    description: 'Korxona va tashkilotlarda yuz bergan real kiberhujum hodisalarining chuqur amaliy tahlili.',
  },
  {
    name: 'Guruhli ish va hamkorlikda oʻqitish',
    icon: Users,
    description: 'Jamoaviy mudofaa, Blue Team rollari va xavfsizlik strategiyalarini birgalikda ishlab chiqish.',
  },
  {
    name: 'Amaliy mashqlar va simulyatsiya',
    icon: Wrench,
    description: 'CIA triadasini tekshirish, xesh hisoblash va xavfsiz izolyatsiyalangan sinov muhitlari.',
  },
];

export const HomePage: React.FC = () => {
  const [moduleInfo, setModuleInfo] = useState<ModuleInfo | null>(null);
  const [paras, setParas] = useState<ParaSummary[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('Barchasi');
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    getModuleInfo().then(setModuleInfo);
    getParasIndex().then(setParas);
    getOutcomes().then(setOutcomes);
    setProgress(getProgress());
  }, []);

  const sections = useMemo(() => {
    const set = new Set<string>();
    paras.forEach((p) => {
      if (p.section) set.add(p.section);
    });
    return ['Barchasi', ...Array.from(set)];
  }, [paras]);

  const filteredParas = useMemo(() => {
    return paras.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        String(p.number) === q;

      const matchesSec =
        selectedSection === 'Barchasi' || p.section === selectedSection;

      return matchesSearch && matchesSec;
    });
  }, [paras, searchQuery, selectedSection]);

  const lastParaId = `para-${String(progress.lastVisitedPara || 1).padStart(2, '0')}`;

  const scrollToMundarija = () => {
    const el = document.getElementById('mundarija-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getOutcomeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return Shield;
      case 'AlertTriangle': return AlertTriangle;
      case 'Lock': return Lock;
      case 'Activity': return Activity;
      default: return Shield;
    }
  };

  return (
    <div id="main-content" className="mx-auto max-w-content px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 sm:p-10 shadow-card">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-chip bg-accent-soft px-3 py-1 font-mono text-xs font-bold text-accent border border-accent/30">
              Modul kodi: TD-50610401
            </span>
            <span className="rounded-chip bg-surface px-2.5 py-1 text-xs font-bold text-muted border border-border">
              O'zbek tili (Lotin)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text leading-[1.15]">
            Kiberxavfsizlikni <span className="text-accent underline decoration-accent/30 underline-offset-8">amalda</span> o'rganing
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            Axborot xavfsizligining CIA modeli, mudofaa arxitekturasi, kriptografik mexanizmlar va interaktiv laboratoriya simulyatsiyalari bilan boyitilgan 60 soatlik raqamli ta'lim resursi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to={`/para/${lastParaId}`}
              className="inline-flex items-center gap-2 rounded-btn bg-accent px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-accent-glow hover:bg-accent-hover transition-all"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>O'qishni boshlash</span>
            </Link>

            <button
              type="button"
              onClick={scrollToMundarija}
              className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-xs sm:text-sm font-bold text-text hover:bg-surface-2 transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span>Mundarija</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-extrabold text-text font-mono">30</p>
              <p className="text-xs text-muted">Para mashg'ulot</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-accent font-mono">60</p>
              <p className="text-xs text-muted">Akademik soat</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-accent-2 font-mono">4</p>
              <p className="text-xs text-muted">Ta'limiy natija</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-success font-mono">30</p>
              <p className="text-xs text-muted">Mahalliy video dars</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Animated Canvas Illustration */}
        <div className="lg:col-span-5">
          <HeroIllustration />
        </div>
      </section>

      {/* 2. O'QITISH NATIJALARI (ON1–ON4) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text tracking-tight">
            O'qitish natijalari (Outcomes ON1–ON4)
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Dastur yakunida talaba egallashi shart bo'lgan fundamental malakalar majmui:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((on) => {
            const Icon = getOutcomeIcon(on.icon);
            return (
              <div
                key={on.id}
                className="rounded-card border border-border bg-surface p-5 shadow-card hover:border-accent/40 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2.5 py-1 rounded-chip border border-accent/20">
                      {on.code}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-muted">
                      {on.paraCount} ta para
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-text leading-snug">
                    {on.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed">
                    {on.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60 text-[11px] font-semibold text-accent flex items-center gap-1">
                  <span>Modul bo'yicha qamrab olingan</span>
                  <Check className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. METODLAR STRIP (4 ta rasmiy metod) */}
      <section className="rounded-card border border-border bg-surface p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text">
            Tasdiqlangan o'qitish metodlari
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Dars jarayonida faqat quyidagi 4 ta tasdiqlangan pedagogik metodlar qo'llaniladi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFICIAL_METHODS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-text">
                    {m.name}
                  </h4>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MUNDARIJA: 30 PARA GRID */}
      <section id="mundarija-section" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text tracking-tight">
              Mundarija (30 para)
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Har bir para 9 ta tabdan iborat (Maqsad, Ma'ruza, Metodlar, Video, Taqdimot, Didaktik, Amaliyot, Nazorat, Glossariy).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Para qidirish..."
                className="w-48 sm:w-60 rounded-btn border border-border bg-surface pl-8 pr-3 py-1.5 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sections.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSection(sec)}
              className={`shrink-0 rounded-chip px-3 py-1 text-xs font-semibold transition-all ${
                selectedSection === sec
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface-2 text-muted hover:text-text border border-border'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* 30 Paras Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParas.map((para) => {
            const isCompleted = progress.completedParas.includes(para.number);
            const score = progress.quizScores[para.number];

            return (
              <Link
                key={para.id}
                to={`/para/${para.id}`}
                className={`group flex flex-col justify-between rounded-card border p-5 transition-all shadow-card hover:shadow-card-hover hover:-translate-y-1 ${
                  isCompleted
                    ? 'border-success/40 bg-success/5'
                    : 'border-border bg-surface hover:border-accent/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2.5 py-0.5 rounded-chip border border-accent/20">
                      #{String(para.number).padStart(2, '0')}-PARA
                    </span>

                    <div className="flex items-center gap-1.5">
                      {para.outcomes.map((on) => (
                        <span
                          key={on}
                          className="rounded bg-surface-2 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-muted border border-border"
                        >
                          {on}
                        </span>
                      ))}
                      {isCompleted && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-text group-hover:text-accent transition-colors leading-snug">
                    {para.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {para.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>2 soat • 9 tab</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {score !== undefined && (
                      <span className="font-bold text-success">
                        Test: {score}%
                      </span>
                    )}
                    <span className="font-bold text-accent group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
