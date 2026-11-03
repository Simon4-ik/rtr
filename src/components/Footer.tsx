import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, FileSpreadsheet, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-border bg-surface py-8 text-xs text-muted print:hidden transition-colors">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2 font-bold text-text text-sm">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Kiberxavfsizlik — Raqamli ta'lim resursi (RTR)</span>
            </div>
            <p className="leading-relaxed">
              O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi standartlari asosida ishlab chiqilgan elektron darslik majmuasi.
            </p>
            <p className="font-mono text-[11px] text-muted">
              Modul kodi: <strong className="text-text">TD-50610401</strong> • 60 soat • 30 para
            </p>
          </div>

          {/* Quick links & Coverage link for jury */}
          <div className="flex flex-col sm:flex-row gap-6 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold text-text uppercase tracking-wider text-[11px]">Resurslar</p>
              <ul className="space-y-1">
                <li><Link to="/" className="hover:text-accent transition-colors">Mundarija (30 para)</Link></li>
                <li><Link to="/para/para-01" className="hover:text-accent transition-colors">1-para namunasi</Link></li>
                <li><Link to="/glossary" className="hover:text-accent transition-colors">A–Z Glossariy</Link></li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <p className="font-bold text-text uppercase tracking-wider text-[11px]">Ekspertiza</p>
              <ul className="space-y-1">
                <li>
                  <Link to="/coverage" className="hover:text-accent transition-colors flex items-center gap-1 text-accent font-semibold">
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    <span>Qamrov matritsasi (Jury)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/results" className="hover:text-accent transition-colors flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span>Monitoring va Natija</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Safety Notice Card */}
          <div className="rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-text max-w-md text-[11px] leading-relaxed">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <div>
                <strong className="text-warning">Xavfsizlik eslatmasi:</strong> Kursdagi barcha materiallar faqatgina mudofaa va o'quv maqsadlariga qaratilgan. Laboratoriya ishlari izolyatsiyalangan simulyatsiyalarda o'tkaziladi.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted gap-2">
          <div>
            &copy; 2026 Kiberxavfsizlik kafedrasi. Oflayn (file://) va Netlify uchun 100% moslangan.
          </div>
          <div className="flex items-center gap-3">
            <span>WCAG AA Kontrast</span>
            <span>•</span>
            <span>Nisbiy yo'llar (base: './')</span>
            <span>•</span>
            <span>Manrope & Carlito</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
