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
          {/* Document Formal Academic Header */}
          <header className="mb-6 border-b border-slate-300 pb-4 text-center leading-tight">
            <p className="text-[11pt] font-semibold uppercase tracking-wider text-slate-600 print:text-black">
              O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi
            </p>
            <p className="text-[12pt] font-bold text-slate-800 print:text-black mt-1">
              Kiberxavfsizlik va axborot texnologiyalari kafedrasi
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-[10pt] text-slate-500 print:text-black italic">
              <span>Modul: TD-50610401</span>
              <span>•</span>
              <span>60 soatlik RTR</span>
              <span>•</span>
              <span>{paraNumber}-para ma'ruzasi</span>
            </div>
          </header>

          {/* Lecture Body with Strict Typography */}
          <div className="lecture-content text-justify">
            <MarkdownRenderer content={content} isLecture={true} />
          </div>

          {/* Academic Footer & Signatures */}
          <footer className="mt-12 pt-6 border-t border-slate-300 print:border-black text-[11pt] leading-tight">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-semibold">Kafedra mudiri:</p>
                <p className="text-[10pt] text-slate-600 print:text-black">Kiberxavfsizlik kafedrasi</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Tuzuvchi:</p>
                <p className="text-[10pt] text-slate-600 print:text-black">Katta o'qituvchi / Assistent</p>
              </div>
            </div>
          </footer>
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

