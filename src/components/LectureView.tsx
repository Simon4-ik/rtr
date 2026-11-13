import React from 'react';
import { Printer, FileDown, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface LectureViewProps {
  content: string;
  paraNumber: number;
  title: string;
}

export const LectureView: React.FC<LectureViewProps> = ({ content, paraNumber, title }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action bar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              Rasmiy ma'ruza matni (Davlat ta'lim standarti)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>Shrift: Calibri 14pt</span>
              <span>•</span>
              <span>Oraliq: 1.0 (Oddiy)</span>
              <span>•</span>
              <span>Hoshiyalar: Chap 30mm, O'ng 15mm, Yuqori/Quyi 20mm</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Printer className="h-4 w-4" />
            <span>Chop etish / PDF saqlash</span>
          </button>
        </div>
      </div>

      {/* A4 Document Paper Simulation Container */}
      <div className="flex justify-center bg-slate-200/60 p-2 sm:p-6 dark:bg-slate-950/60 rounded-2xl print:bg-transparent print:p-0">
        <article
          id="lecture-document"
          className="lecture-sheet bg-white text-black shadow-xl print:shadow-none w-full max-w-[210mm] transition-all"
          style={{
            minHeight: '297mm',
            paddingTop: '20mm',
            paddingBottom: '20mm',
            paddingLeft: '30mm',
            paddingRight: '15mm',
            fontFamily: 'Calibri, Carlito, system-ui, sans-serif',
            fontSize: '14pt',
            lineHeight: '1.0',
            color: '#000000',
          }}
        >
          {/* Lecture Body with Strict Typography */}
          <div className="lecture-content text-justify">
            <MarkdownRenderer content={content} isLecture={true} />
          </div>
        </article>
      </div>

      {/* Print Instructions / Information Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 print:hidden flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Standart talablar va chop etish (Print / PDF):
          </p>
          <p>
            Ushbu ma'ruza matni O'zbekiston Respublikasi davlat ta'lim standartlari hamda GOST talablariga mos ravishda rasmiylashtirilgan. «Chop etish» tugmasini bosganingizda, brauzer avtomatik ravishda A4 formatdagi 30mm/15mm/20mm/20mm hoshiyalar bilan toza qog'oz varag'iga tayyorlaydi.
          </p>
        </div>
      </div>
    </div>
  );
};

