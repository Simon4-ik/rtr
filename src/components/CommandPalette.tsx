import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, BookMarked, ArrowRight, X, Shield, Award } from 'lucide-react';
import { ParaSummary, GlossaryItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  paras: ParaSummary[];
  glossary: GlossaryItem[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  paras,
  glossary,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combine results
  const results = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Default suggested items: first 5 paras + quick links
      return [
        { type: 'page', title: 'Bosh sahifa (Home)', path: '/' },
        { type: 'page', title: 'O\'zlashtirish va Natijalar (Progress)', path: '/results' },
        { type: 'page', title: 'Qamrov matritsasi (Coverage for Jury)', path: '/coverage' },
        { type: 'page', title: 'Global A–Z Glossariy', path: '/glossary' },
        ...paras.slice(0, 5).map((p) => ({
          type: 'para',
          title: `${p.number}-para. ${p.title}`,
          path: `/para/${p.id}`,
          badge: p.section,
        })),
      ];
    }

    const matchedParas = paras
      .filter((p) => p.title.toLowerCase().includes(q) || String(p.number) === q || p.section.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => ({
        type: 'para',
        title: `${p.number}-para. ${p.title}`,
        path: `/para/${p.id}`,
        badge: p.section,
      }));

    const matchedGlossary = glossary
      .filter((g) => g.term.toLowerCase().includes(q) || (g.enTerm && g.enTerm.toLowerCase().includes(q)))
      .slice(0, 6)
      .map((g) => ({
        type: 'glossary',
        title: g.term,
        path: `/glossary`,
        badge: g.enTerm || 'Atama',
      }));

    return [...matchedParas, ...matchedGlossary];
  }, [query, paras, glossary]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tezkor qidiruv"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface text-text shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input bar */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Paralar, atamalar yoki sahifalarni qidirish..."
            className="w-full bg-transparent text-sm placeholder-muted focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded bg-surface-2 px-1.5 py-0.5 text-[11px] font-mono text-muted border border-border">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted">
              Hech qanday natija topilmadi
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-accent text-white font-semibold'
                      : 'hover:bg-surface-2 text-text'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.type === 'para' && <BookOpen className="h-4 w-4 shrink-0" />}
                    {item.type === 'glossary' && <BookMarked className="h-4 w-4 shrink-0" />}
                    {item.type === 'page' && <Shield className="h-4 w-4 shrink-0" />}
                    <span className="truncate">{item.title}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-2 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-2 text-muted border border-border'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-border bg-surface-2 px-4 py-2 text-[11px] text-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Tanlash</span>
            <span>↵ O'tish</span>
          </div>
          <span>Kiberxavfsizlik RTR</span>
        </div>
      </div>
    </div>
  );
};

