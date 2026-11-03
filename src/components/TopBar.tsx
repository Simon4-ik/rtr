import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Search,
  Sun,
  Moon,
  Play,
  Menu,
  Award,
  BookMarked,
  Grid,
  FileSpreadsheet
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getProgress } from '../services/progressService';

interface TopBarProps {
  onOpenSearch: () => void;
  onToggleMobileSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenSearch,
  onToggleMobileSidebar,
}) => {
  const { theme, toggleTheme, uiFontSize, increaseFontSize, decreaseFontSize } = useTheme();
  const location = useLocation();
  const progress = getProgress();

  const completedCount = progress.completedParas.length;
  const progressPercent = Math.round((completedCount / 30) * 100);
  const lastParaId = `para-${String(progress.lastVisitedPara || 1).padStart(2, '0')}`;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Skip to Content for WCAG AA Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Asosiy kontentga o'tish
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/85 backdrop-blur-md transition-colors print:hidden">
        <div className="mx-auto flex h-14 max-w-content items-center justify-between px-4 sm:px-6">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              aria-label="Mundarijani ochish"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-surface text-muted hover:text-text hover:bg-surface-2 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent rounded-btn p-1"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm shadow-accent/25 group-hover:scale-105 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-text">
                    Kiberxavfsizlik
                  </span>
                  <span className="rounded bg-accent-soft px-1.5 py-0.2 text-[10px] font-bold text-accent border border-accent/20">
                    TD-50610401
                  </span>
                </div>
                <p className="text-[10px] text-muted -mt-0.5 hidden sm:block">
                  RTR • 60 soat • 30 para
                </p>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <Link
              to="/"
              className={`rounded-btn px-3 py-1.5 transition-colors ${
                isActive('/') && !location.pathname.startsWith('/results') && !location.pathname.startsWith('/coverage')
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              Mundarija
            </Link>

            <Link
              to="/glossary"
              className={`rounded-btn px-3 py-1.5 transition-colors ${
                isActive('/glossary')
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              A–Z Glossariy
            </Link>

            <Link
              to="/results"
              className={`rounded-btn px-3 py-1.5 transition-colors ${
                isActive('/results')
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              Natijalar
            </Link>

            <Link
              to="/coverage"
              className={`rounded-btn px-3 py-1.5 transition-colors ${
                isActive('/coverage')
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              Qamrov (Jury)
            </Link>
          </nav>

          {/* Right Controls: Search, Font scale, Theme, Continue Button */}
          <div className="flex items-center gap-2">
            {/* Global Search Trigger (Ctrl+K) */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-btn border border-border bg-surface-2/60 px-2.5 sm:px-3 py-1.5 text-xs text-muted hover:text-text hover:border-accent/40 transition-colors"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Qidiruv</span>
              <kbd className="hidden sm:inline-block rounded bg-surface px-1 py-0.2 text-[10px] font-mono border border-border">
                Ctrl K
              </kbd>
            </button>

            {/* Font Size Adjuster A- / A+ for UI text */}
            <div className="hidden sm:flex items-center rounded-btn border border-border bg-surface-2/40 p-0.5 text-xs text-muted">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={uiFontSize === 'sm'}
                aria-label="UI shrift o'lchamini kichraytirish"
                className="px-2 py-1 rounded hover:text-text hover:bg-surface disabled:opacity-40 transition-colors font-bold text-[11px]"
              >
                A-
              </button>
              <span className="px-1 text-[10px] font-mono opacity-60">|</span>
              <button
                type="button"
                onClick={increaseFontSize}
                disabled={uiFontSize === 'lg'}
                aria-label="UI shrift o'lchamini kattalashtirish"
                className="px-2 py-1 rounded hover:text-text hover:bg-surface disabled:opacity-40 transition-colors font-bold text-[12px]"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? "Yorug' mavzuga o'tish" : "Qorong'i mavzuga o'tish"}
              className="flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-surface text-muted hover:text-text hover:bg-surface-2 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-warning" />
              ) : (
                <Moon className="h-4 w-4 text-muted" />
              )}
            </button>

            {/* Continue / Davom etish button */}
            <Link
              to={`/para/${lastParaId}`}
              className="hidden md:inline-flex items-center gap-1.5 rounded-btn bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Davom etish</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

