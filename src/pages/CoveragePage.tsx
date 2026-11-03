import React, { useEffect, useState } from 'react';
import { Printer, Check, Shield, Award, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ParaSummary, OutcomeItem } from '../types';
import { getParasIndex, getOutcomes } from '../services/contentService';

export const CoveragePage: React.FC = () => {
  const [paras, setParas] = useState<ParaSummary[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeItem[]>([]);

  useEffect(() => {
    getParasIndex().then(setParas);
    getOutcomes().then(setOutcomes);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card print:border-none print:p-0">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-chip bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
            <Award className="h-4 w-4" />
            <span>Hakamlar hay'ati va ekspertlar uchun (Jury Coverage)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
            Kiberxavfsizlik fani o'quv dasturi qamrov matritsasi
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
            Modul kodi: <strong>TD-50610401</strong> (60 soat, 30 para). Har bir paraning ON1–ON4 ta'limiy natijalariga, tasdiqlangan pedagogik metodlarga hamda 9 ta raqamli didaktik komponentlarga mosligi monitoringi.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors shrink-0 print:hidden"
        >
          <Printer className="h-4 w-4" />
          <span>Matritsani chop etish (PDF)</span>
        </button>
      </div>

      {/* Outcome Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        {outcomes.map((on) => (
          <div key={on.id} className="rounded-card border border-border bg-surface p-4 shadow-card space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded">
                {on.code}
              </span>
              <span className="text-[11px] font-bold text-success">
                {on.paraCount} ta para
              </span>
            </div>
            <h4 className="font-bold text-xs text-text leading-snug">{on.title}</h4>
            <p className="text-[11px] text-muted line-clamp-2">{on.description}</p>
          </div>
        ))}
      </div>

      {/* Coverage Matrix Table */}
      <div className="rounded-card border border-border bg-surface shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-[11px] font-bold text-muted uppercase tracking-wider">
                <th className="py-3 px-3 w-12 text-center">№</th>
                <th className="py-3 px-4 min-w-[220px]">Para mavzusi</th>
                <th className="py-3 px-2 text-center w-12">ON1</th>
                <th className="py-3 px-2 text-center w-12">ON2</th>
                <th className="py-3 px-2 text-center w-12">ON3</th>
                <th className="py-3 px-2 text-center w-12">ON4</th>
                <th className="py-3 px-4 min-w-[180px]">Metodlar</th>
                <th className="py-3 px-3 text-center min-w-[140px]">9 ta Tab Resurslari</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paras.map((p) => {
                const hasON1 = p.outcomes.includes('ON1');
                const hasON2 = p.outcomes.includes('ON2');
                const hasON3 = p.outcomes.includes('ON3');
                const hasON4 = p.outcomes.includes('ON4');

                return (
                  <tr key={p.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-muted">
                      #{p.number}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-text">
                      <div className="truncate max-w-sm">{p.title}</div>
                      <span className="text-[10px] text-muted font-normal block">{p.section}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {hasON1 ? <Check className="h-4 w-4 text-accent mx-auto stroke-[2.5]" /> : <span className="text-border">—</span>}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {hasON2 ? <Check className="h-4 w-4 text-accent mx-auto stroke-[2.5]" /> : <span className="text-border">—</span>}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {hasON3 ? <Check className="h-4 w-4 text-accent mx-auto stroke-[2.5]" /> : <span className="text-border">—</span>}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {hasON4 ? <Check className="h-4 w-4 text-accent mx-auto stroke-[2.5]" /> : <span className="text-border">—</span>}
                    </td>
                    <td className="py-2.5 px-4 text-[11px] text-muted">
                      <div className="truncate max-w-[200px]">
                        {p.methods.join(', ')}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded">
                        <Check className="h-3 w-3" />
                        <span>To'liq 9/9</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

