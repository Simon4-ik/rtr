import React, { useEffect, useState, useMemo } from 'react';
import { Search, BookMarked, Filter, Hash, BookOpen } from 'lucide-react';
import { GlossaryItem } from '../types';
import { getGlobalGlossary } from '../services/contentService';

const UZ_ALPHABET = [
  'A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'X', 'Y', 'Z', "G'", "O'", 'Sh', 'Ch'
];

export const GlossaryPage: React.FC = () => {
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  useEffect(() => {
    getGlobalGlossary().then(setGlossary);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    glossary.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['Barchasi', ...Array.from(set).sort()];
  }, [glossary]);

  // Uzbek collation sort
  const sortedGlossary = useMemo(() => {
    return [...glossary].sort((a, b) =>
      a.term.localeCompare(b.term, 'uz-Latn', { sensitivity: 'base' })
    );
  }, [glossary]);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return sortedGlossary.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const termMatch = item.term.toLowerCase().includes(q);
      const enMatch = item.enTerm ? item.enTerm.toLowerCase().includes(q) : false;
      const defMatch = (item.def || item.definition || '').toLowerCase().includes(q);

      const matchesSearch = !q || termMatch || enMatch || defMatch;
      const matchesCategory =
        selectedCategory === 'Barchasi' || item.category === selectedCategory;

      const itemLetter = item.letter || item.term.charAt(0).toUpperCase();
      const matchesLetter = !activeLetter || itemLetter === activeLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [sortedGlossary, searchQuery, selectedCategory, activeLetter]);

  // Highlight helper for live search matches
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-accent/25 text-accent font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const scrollToLetter = (letter: string) => {
    setActiveLetter(activeLetter === letter ? null : letter);
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="main-content" className="mx-auto max-w-content px-4 sm:px-6 py-8 space-y-8">
      {/* Header Card */}
      <div className="rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-chip bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
              <BookMarked className="h-4 w-4" />
              <span>Kiberxavfsizlik ensiklopediyasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Global A–Z Glossariy
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
              O'zbekiston davlat ta'lim standartlari hamda xalqaro ISO/IEC 27001 terminologiyasiga asoslangan kiberxavfsizlik lug'ati.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 p-3.5 shrink-0">
            <span className="font-mono text-2xl font-extrabold text-accent">
              {glossary.length}
            </span>
            <span className="text-xs text-muted leading-tight">
              Jami saralangan<br />atamalar
            </span>
          </div>
        </div>

        {/* Search & Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Atama, inglizcha muqobil yoki ta'rif matni bo'yicha qidirish..."
              className="w-full rounded-btn border border-border bg-surface pl-10 pr-4 py-2.5 text-xs sm:text-sm text-text placeholder-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-btn border border-border bg-surface px-3 py-2.5 text-xs sm:text-sm text-text font-medium focus:border-accent focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sticky A-Z Alphabet Navigation Bar */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted mb-2 font-semibold">
            <span>Alifbo bo'yicha o'tish (A–Z):</span>
            {activeLetter && (
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="text-accent hover:underline"
              >
                Barchasini ko'rsatish
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {UZ_ALPHABET.map((letter) => {
              const isSelected = activeLetter === letter;

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => scrollToLetter(letter)}
                  className={`flex h-8 w-8 items-center justify-center rounded-btn text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-surface-2 text-text hover:bg-accent-soft hover:text-accent border border-border'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Glossary Terms Cards List */}
      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <div className="rounded-card border border-border bg-surface p-12 text-center text-muted">
            <p className="text-base font-bold text-text">Hech qanday atama topilmadi</p>
            <p className="text-xs mt-1">Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((item, idx) => (
              <div
                key={idx}
                id={`letter-${item.letter || item.term.charAt(0).toUpperCase()}`}
                className="rounded-card border border-border bg-surface p-5 shadow-card hover:border-accent/40 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-text">
                      {highlightText(item.term, searchQuery)}
                    </h3>
                    <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-bold text-accent border border-accent/20">
                      {item.enTerm || 'Atama'}
                    </span>
                  </div>

                  <p className="text-xs text-muted leading-relaxed">
                    {highlightText(item.def || item.definition || '', searchQuery)}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted">
                  <span>Toifa: <strong className="text-text">{item.category || 'Asosiy'}</strong></span>
                  <span className="flex items-center gap-1 font-mono text-accent">
                    <BookOpen className="h-3 w-3" />
                    <span>1-parada mavjud</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
