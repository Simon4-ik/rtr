import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Sparkles,
  Video,
  Presentation,
  Layers,
  Terminal,
  FileQuestion,
  BookMarked,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText
} from 'lucide-react';
import { TabId, ParaDataOfficial, TabConfig } from '../types';
import { getParaData, getParasIndex } from '../services/contentService';
import { getProgress, markTabVisited, markParaCompleted } from '../services/progressService';
import { LecturePaper } from '../components/LecturePaper';
import { MethodTimeline } from '../components/MethodTimeline';
import { VideoPlayer } from '../components/VideoPlayer';
import { SlideViewer } from '../components/SlideViewer';
import { DidacticGallery } from '../components/DidacticGallery';
import { LabSimulator } from '../components/LabSimulator';
import { QuizEngine } from '../components/QuizEngine';

const TABS: TabConfig[] = [
  { id: 'maqsad', label: "Mavzular ro'yxati", description: "O'qitish natijalari asosida" },
  { id: 'maruza', label: "Ma'ruza matni", description: "Nazariy va amaliy mashg'ulotlar" },
  { id: 'metodlar', label: "O'qitish metodlari", description: "Qo'llaniladigan metodlar ro'yxati" },
  { id: 'video', label: "Media materiallar", description: "Audio, video, animatsiya" },
  { id: 'didaktik', label: "Ko'rgazmali materiallar", description: "Didaktik vositalar" },
  { id: 'taqdimot', label: "Taqdimot materiallari", description: "ppt, pptx, pdf, jpg, png" },
  { id: 'amaliyot', label: "Amaliy mashg'ulotlar", description: "Laboratoriya simulyatori" },
  { id: 'nazorat', label: "Baholash-savollari", description: "Savollar, topshiriqlar, testlar" },
  { id: 'glossariy', label: "Glossariy", description: "Atamalar lug'ati" },
];

const TAB_ALIASES: Record<string, TabId> = {
  'mavzular-royxati': 'maqsad',
  'maruza-matni': 'maruza',
  'oqitish-metodlari': 'metodlar',
  'media-materiallar': 'video',
  'korgazmali-materiallar': 'didaktik',
  'taqdimot-materiallari': 'taqdimot',
  'amaliy-mashgulotlar': 'amaliyot',
  'baholash-savollari': 'nazorat',
};

const resolveTabId = (id?: string): TabId => {
  if (!id) return 'maqsad';
  const resolved = TAB_ALIASES[id] || id;
  return TABS.some((t) => t.id === resolved) ? (resolved as TabId) : 'maqsad';
};

export const ParaPage: React.FC = () => {
  const { paraId = 'para-01', tabId } = useParams<{ paraId: string; tabId?: string }>();
  const navigate = useNavigate();

  const paraNum = parseInt(paraId.replace('para-', ''), 10) || 1;
  const initialTab: TabId = resolveTabId(tabId);

  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [paraData, setParaData] = useState<ParaDataOfficial | null>(null);
  const [lectureText, setLectureText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getParaData(paraNum).then(({ official, lectureText }) => {
      if (isMounted) {
        setParaData(official);
        setLectureText(lectureText);
        setLoading(false);

        // Mark current tab as visited
        const updated = markTabVisited(paraNum, activeTab);
        setProgress(updated);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [paraNum]);

  // Sync activeTab when tabId in URL changes
  useEffect(() => {
    if (tabId) {
      const resolved = resolveTabId(tabId);
      setActiveTab(resolved);
      const updated = markTabVisited(paraNum, resolved);
      setProgress(updated);
    }
  }, [tabId, paraNum]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    navigate(`/para/para-${String(paraNum).padStart(2, '0')}/${tab}`, { replace: true });
    const updated = markTabVisited(paraNum, tab);
    setProgress(updated);
  };

  const prevParaId = paraNum > 1 ? `para-${String(paraNum - 1).padStart(2, '0')}` : null;
  const nextParaId = paraNum < 30 ? `para-${String(paraNum + 1).padStart(2, '0')}` : null;

  // Completed tabs count
  const visitedTabs = progress.completedTabs[paraNum] || [];
  const completedTabsCount = Math.min(9, visitedTabs.length);
  const tabsPercent = Math.round((completedTabsCount / 9) * 100);

  // SVG Progress Ring calculations for header
  const ringRadius = 18;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (tabsPercent / 100) * ringCircumference;

  if (loading || !paraData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div id="main-content" className="mx-auto max-w-content px-4 sm:px-6 py-6 space-y-6">
      {/* 1. Header: Breadcrumb & Meta */}
      <div className="border-b border-border pb-4 space-y-3 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">Bosh sahifa</Link>
            <span>/</span>
            <span className="font-semibold text-text">
              {paraNum}-mavzu
            </span>
          </div>

          {/* Previous / Next Top Buttons */}
          <div className="flex items-center gap-2">
            {prevParaId && (
              <Link
                to={`/para/${prevParaId}`}
                className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:text-text hover:bg-surface-2 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Oldingi</span>
              </Link>
            )}
            {nextParaId && (
              <Link
                to={`/para/${nextParaId}`}
                className="inline-flex items-center gap-1.5 rounded-btn bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-accent-hover transition-colors"
              >
                <span>Keyingi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Title, Outcome & Method Chips, and Progress Ring */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-chip bg-accent-soft px-3 py-0.5 font-mono text-xs font-bold text-accent border border-accent/20">
                #{String(paraNum).padStart(2, '0')}-MAVZU
              </span>

              {/* Outcomes chips */}
              {paraData.outcomes.map((on) => (
                <span
                  key={on}
                  className="rounded-chip bg-surface-2 px-2.5 py-0.5 font-mono text-xs font-bold text-text border border-border"
                >
                  {on}
                </span>
              ))}

              {/* Method chips */}
              {paraData.methods.map((m, idx) => (
                <span
                  key={idx}
                  className="rounded-chip bg-surface-2/60 px-2.5 py-0.5 text-[11px] text-muted border border-border hidden sm:inline-block"
                >
                  {m.name}
                </span>
              ))}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-text tracking-tight">
              {paraData.title}
            </h1>
          </div>

          {/* Progress Ring: Completed Tabs (of 9) */}
          <div className="flex items-center gap-3 rounded-card border border-border bg-surface p-3 shrink-0 shadow-sm">
            <div className="relative flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-surface-2"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  className="text-accent transition-all duration-500 ease-out"
                  fill="transparent"
                />
              </svg>
              <span className="absolute font-mono text-[10px] font-bold text-text">
                {completedTabsCount}/9
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-text">O'zlashtirish</p>
              <p className="text-[10px] text-muted">9 ta resursdan {completedTabsCount} tasi ko'rildi</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tabs Bar with Animated Sliding Underline (layoutId) */}
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-bg/95 backdrop-blur-md border-b border-border py-1.5 print:hidden">
        <nav
          className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none snap-x"
          aria-label="Mavzu bo'limlari"
        >
          {TABS.map((tab) => {
            const isTabActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                title={`${tab.label} (${tab.description})`}
                className={`relative shrink-0 snap-start rounded-btn px-3.5 py-2 text-xs sm:text-sm font-bold transition-colors ${
                  isTabActive
                    ? 'text-accent'
                    : 'text-muted hover:text-text hover:bg-surface-2'
                }`}
              >
                <span>{tab.label}</span>

                {/* Animated sliding underline using framer-motion layoutId */}
                {isTabActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Tab Contents Area */}
      <main className="min-h-[420px]">
        {/* Tab 1: Mavzular ro'yxati (o'qitish natijalari asosida) */}
        {activeTab === 'maqsad' && (
          <div className="rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-border pb-4">
              <span className="rounded-chip bg-accent-soft px-3 py-1 font-mono text-xs font-bold text-accent">
                1. Mavzular ro'yxati • O'qitish natijalari asosida
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-text mt-3">
                {paraData.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-2">
                <strong className="text-text">O'quv maqsadi:</strong> {paraData.goal}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border bg-surface-2/40 p-5 space-y-3">
                <h3 className="font-bold text-sm text-text flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span>Kutilayotgan bilim va tushunchalar:</span>
                </h3>
                <ul className="text-xs text-muted space-y-2 list-disc list-inside">
                  <li>Kiberxavfsizlik va axborot xavfsizligi o'rtasidagi asosiy farqlar;</li>
                  <li>Axborotning uch asosiy ustuni (Maxfiylik, Yaxlitlik, Mavjudlik);</li>
                  <li>Chuqurlashtirilgan himoya (Defense in Depth) konsepsiyasi;</li>
                  <li>Zamonaviy kiberxavflar landshafti va inson omili tahlili.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-surface-2/40 p-5 space-y-3">
                <h3 className="font-bold text-sm text-text flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Amaliy ko'nikma va malakalar:</span>
                </h3>
                <ul className="text-xs text-muted space-y-2 list-disc list-inside">
                  <li>Xavfsizlik hodisasini CIA triadasi bo'yicha tezkor tasniflash;</li>
                  <li>Kriptografik xesh-funksiyalar orqali ma'lumotlar yaxlitligini tekshirish;</li>
                  <li>Ko'chki effekti (Avalanche effect) hodisasini amalda tahlil qilish;</li>
                  <li>Tashkilotda kibergigiyena qoidalariga rioya etish madaniyati.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ma'ruza (Paper page view: Calibri 14pt, line-height 1, margins 20/20/30/15mm) */}
        {activeTab === 'maruza' && (
          <LecturePaper
            content={lectureText}
            paraNumber={paraData.id}
            title={paraData.title}
          />
        )}

        {/* Tab 3: Metodlar */}
        {activeTab === 'metodlar' && (
          <MethodTimeline methods={paraData.methods} />
        )}

        {/* Tab 4: Video */}
        {activeTab === 'video' && (
          <VideoPlayer video={paraData.video} paraNumber={paraData.id} />
        )}

        {/* Tab 5: Ko'rgazmali materiallar (didaktik vositalar) */}
        {activeTab === 'didaktik' && (
          <DidacticGallery items={paraData.didactic} paraNumber={paraData.id} />
        )}

        {/* Tab 6: Taqdimot materiallari (ppt, pptx, pdf, jpg, png) */}
        {activeTab === 'taqdimot' && (
          <SlideViewer
            slidesCount={paraData.slides.count}
            paraNumber={paraData.id}
            paraTitle={paraData.title}
          />
        )}

        {/* Tab 7: Amaliy mashg'ulotlar (Laboratoriya simulyatori) */}
        {activeTab === 'amaliyot' && (
          <div className="space-y-6">
            {/* Practical Task Card */}
            <div className="rounded-card border border-border bg-surface p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-chip bg-accent-soft px-3 py-1 font-mono text-xs font-bold text-accent">
                  Amaliy laboratoriya mashg'uloti va topshiriq
                </span>
                <span className="text-xs text-muted font-mono">Bajarish vaqti: ~30 daqiqa</span>
              </div>

              <h3 className="text-lg font-bold text-text">
                {paraData.practice.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {paraData.practice.task}
              </p>

              {/* Checklist items */}
              <div className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
                <h4 className="text-xs font-bold text-text uppercase tracking-wider text-muted">
                  Bajarilishi lozim bo'lgan qadamlar ro'yxati (Checklist):
                </h4>
                <div className="space-y-2 pt-1">
                  {paraData.practice.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-text">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent text-white text-[11px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Lab Simulator */}
            <LabSimulator />
          </div>
        )}

        {/* Tab 8: Baholash-savollari (Savollar, topshiriqlar, testlar) */}
        {activeTab === 'nazorat' && (
          <div className="space-y-8">
            {/* 1. Review Questions as Accordion */}
            {paraData.reviewQuestions && paraData.reviewQuestions.length > 0 && (
              <div className="rounded-card border border-border bg-surface p-6 shadow-card space-y-4">
                <div className="border-b border-border pb-3">
                  <span className="rounded-chip bg-accent-soft px-3 py-1 font-mono text-xs font-bold text-accent">
                    Baholash va o'zlashtirishni tekshirish vositalari
                  </span>
                  <h3 className="text-base font-bold text-text mt-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-accent" />
                    <span>Mavzu yuzasidan mustahkamlovchi nazorat savollari (Akkordeon)</span>
                  </h3>
                </div>

                <div className="space-y-2 pt-1">
                  {paraData.reviewQuestions.map((question, idx) => {
                    const isOpen = expandedQuestionIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-border bg-surface-2/40 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedQuestionIdx(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-text hover:bg-surface-2/80 transition-colors"
                        >
                          <span>{idx + 1}. {question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-accent shrink-0 ml-2" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted shrink-0 ml-2" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-3.5 pt-0 text-xs text-muted leading-relaxed border-t border-border/40 bg-surface/40">
                            Ushbu savolga mustaqil javob berishga harakat qiling yoki javobni tekshirish uchun ma'ruza matnining tegishli bo'limiga murojaat qiling.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Official Quiz Engine with Instant Feedback */}
            <div>
              <div className="mb-3">
                <h3 className="text-base font-bold text-text">
                  Oraliq nazorat testi (10 ta savol)
                </h3>
                <p className="text-xs text-muted">
                  Har bir to'g'ri javob uchun tezkor qayta aloqa (instant feedback) va to'liq izoh taqdim etiladi.
                </p>
              </div>

              <QuizEngine
                tests={paraData.tests}
                paraNumber={paraData.id}
                onFinished={(scorePct) => {
                  if (scorePct >= 60) markParaCompleted(paraData.id, true);
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 9: Glossariy (Para-specific) */}
        {activeTab === 'glossariy' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-card border border-border bg-surface p-5 shadow-card">
              <div>
                <h3 className="font-bold text-base text-text">
                  {paraData.id}-mavzu bo'yicha tayanch atamalar ({paraData.glossary.length} ta)
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Ushbu mashg'ulotda o'rganilgan barcha maxsus terminologiyalar.
                </p>
              </div>

              <Link
                to="/glossary"
                className="inline-flex items-center gap-2 rounded-btn bg-surface-2 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent-soft transition-colors shrink-0 border border-border"
              >
                <span>To'liq A–Z Glossariy</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paraData.glossary.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-card border border-border bg-surface p-5 shadow-card space-y-2 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-text text-sm">
                      {item.term}
                    </h4>
                    <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted border border-border">
                      {item.enTerm || 'Atama'}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.def || item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 4. Sticky Bottom Bar: Oldingi mavzu / Keyingi mavzu */}
      <div className="sticky bottom-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-surface/90 backdrop-blur border-t border-border flex items-center justify-between print:hidden">
        {prevParaId ? (
          <Link
            to={`/para/${prevParaId}`}
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-4 py-2 text-xs font-bold text-text hover:bg-surface-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Oldingi mavzu</span>
          </Link>
        ) : <div />}

        <div className="text-xs font-mono text-muted hidden sm:block">
          {paraNum} / 30 ta mavzu
        </div>

        {nextParaId ? (
          <Link
            to={`/para/${nextParaId}`}
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors"
          >
            <span>Keyingi mavzu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};
