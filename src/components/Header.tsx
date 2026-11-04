import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, BookmarkCheck, Moon, Sun, Menu, X, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getProgress } from '../services/progressService';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progress = getProgress();

  const completedCount = progress.completedParas.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-[#0a0f1d]/90 print:hidden transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-sky-700 text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Kiberxavfsizlik
              </span>
              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800/50">
                TD-50610401
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Raqamli ta'lim resursi • 60 soat
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/')
                ? 'bg-brand-50 text-brand-700 dark:bg-slate-800/80 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Mundarija (30 para)</span>
          </Link>

          <Link
            to="/para/para-01"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/para')
                ? 'bg-brand-50 text-brand-700 dark:bg-slate-800/80 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <BookmarkCheck className="h-4 w-4" />
            <span>Darslar</span>
          </Link>

          <Link
            to="/glossary"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/glossary')
                ? 'bg-brand-50 text-brand-700 dark:bg-slate-800/80 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <span>A–Z Glossariy</span>
          </Link>

          <Link
            to="/authors"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/authors')
                ? 'bg-brand-50 text-brand-700 dark:bg-slate-800/80 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <span>Mu'alliflar</span>
          </Link>
        </nav>

        {/* Right side controls: Progress & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Progress pill */}
          <Link
            to="/"
            title={`O'zlashtirish: 30 tadan ${completedCount} ta para yakunlangan (${progressPercent}%)`}
            className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 transition-colors"
          >
            <Award className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            <span>{completedCount}/30 para</span>
            <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </Link>

          {/* Theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? "Yorug' mavzuga o'tish" : "Qorong'i mavzuga o'tish"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {/* Mobile menu hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menyu ochish"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 dark:border-slate-800 dark:bg-[#0f172a]">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <BookOpen className="h-4 w-4 text-brand-500" />
              <span>Mundarija (30 para)</span>
            </Link>
            <Link
              to="/para/para-01"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <BookmarkCheck className="h-4 w-4 text-emerald-500" />
              <span>1-para namunasi</span>
            </Link>
            <Link
              to="/glossary"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span>A–Z Global Glossariy</span>
            </Link>
            <Link
              to="/authors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Award className="h-4 w-4 text-accent" />
              <span>Mu'alliflar</span>
            </Link>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 px-3">
              <span>Umumiy o'zlashtirish:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{completedCount}/30 para ({progressPercent}%)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

