import React, { useState, useEffect, useRef } from 'react';
import { Printer, BookOpen, Clock, FileText, List, ChevronRight } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface LecturePaperProps {
  content: string;
  paraNumber: number;
  title: string;
}

export const LecturePaper: React.FC<LecturePaperProps> = ({ content, paraNumber, title }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const paperRef = useRef<HTMLDivElement | null>(null);

  // Extract plan headings from content (e.g. "## 1. ...")
  const planItems = React.useMemo(() => {
    const lines = content.split('\n');
    const items: string[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        items.push(trimmed.replace(/^#+\s*/, ''));
      }
    });
    return items;
  }, [content]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!paperRef.current) return;
      const rect = paperRef.current.getBoundingClientRect();
      const totalH = rect.height - window.innerHeight;
      if (totalH <= 0) {
        setReadingProgress(100);
        return;
      }
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, Math.round((scrolled / totalH) * 100)));
      setReadingProgress(pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Lecture Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-border bg-surface p-4 shadow-card print:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-text text-sm">
              Rasmiy o'quv ma'ruza matni
            </h3>
            <p className="text-[11px] text-muted flex items-center gap-2">
              <span>Hajmi: ~1.5–2 bet</span>
              <span>•</span>
              <span>O'qish vaqti: ~6 daqiqa</span>
              <span>•</span>
              <span>Calibri 14pt (Oraliq 1.0)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Reading progress pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-chip bg-surface-2 px-3 py-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>O'qildi: {readingProgress}%</span>
            <div className="h-1.5 w-12 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-150"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>PDF / Chop etish</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Table of Contents + A4 Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Side Table of Contents (Desktop) */}
        {planItems.length > 0 && (
          <div className="hidden lg:block lg:col-span-3 sticky top-20 rounded-card border border-border bg-surface p-4 shadow-card text-xs space-y-3 print:hidden">
            <h4 className="font-bold text-text uppercase tracking-wider flex items-center gap-2 text-[11px] text-muted">
              <List className="h-4 w-4 text-accent" />
              <span>Ma'ruza rejasi</span>
            </h4>
            <div className="space-y-1.5">
              {planItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-1.5 text-muted hover:text-text transition-colors p-1 rounded hover:bg-surface-2"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-border text-[10px] text-muted">
              Standart GOST formatida
            </div>
          </div>
        )}

        {/* Paper Container (Muted background, paper stays white & dark text) */}
        <div
          ref={paperRef}
          className={`flex justify-center bg-surface-2/70 p-3 sm:p-8 rounded-2xl print:bg-transparent print:p-0 ${
            planItems.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'
          }`}
        >
          <article
            className="lecture-paper bg-white text-black shadow-xl w-full max-w-[210mm] transition-all print:shadow-none"
            style={{
              minHeight: '297mm',
              paddingTop: '20mm',
              paddingBottom: '20mm',
              paddingLeft: '30mm',
              paddingRight: '15mm',
              fontFamily: 'Calibri, Carlito, sans-serif',
              fontSize: '14pt',
              lineHeight: '1.0',
              color: '#000000',
            }}
          >
            {/* Academic Formal Header */}
            <header className="mb-6 border-b border-gray-300 pb-4 text-center leading-tight">
              <p className="text-[11pt] font-semibold uppercase tracking-wider text-gray-700 print:text-black">
                O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi
              </p>
              <p className="text-[12pt] font-bold text-gray-900 print:text-black mt-1">
                Kiberxavfsizlik va axborot texnologiyalari kafedrasi
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-[10pt] text-gray-600 print:text-black italic">
                <span>Modul kodi: TD-50610401</span>
                <span>•</span>
                <span>60 soatlik RTR</span>
                <span>•</span>
                <span>{paraNumber}-para</span>
              </div>
            </header>

            {/* Lecture Markdown Content */}
            <div className="lecture-body text-justify">
              <MarkdownRenderer content={content} isLecture={true} />
            </div>

            {/* Academic Formal Footer */}
            <footer className="mt-12 pt-6 border-t border-gray-300 print:border-black text-[11pt] leading-tight">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-semibold">Kafedra mudiri:</p>
                  <p className="text-[10pt] text-gray-600 print:text-black">Kiberxavfsizlik kafedrasi</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Tuzuvchi:</p>
                  <p className="text-[10pt] text-gray-600 print:text-black">Katta o'qituvchi / Assistent</p>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

