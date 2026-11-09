import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BookMarked, Award, Users } from 'lucide-react';

interface BottomTabBarProps {
  onOpenMundarija: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ onOpenMundarija }) => {
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md px-1.5 py-1 print:hidden">
      <nav className="flex items-center justify-around text-[9px] sm:text-[10px] font-semibold text-muted">
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            isCurrent('/') &&
            !location.pathname.startsWith('/results') &&
            !location.pathname.startsWith('/glossary') &&
            !location.pathname.startsWith('/coverage') &&
            !location.pathname.startsWith('/authors')
              ? 'text-accent'
              : 'hover:text-text'
          }`}
        >
          <Home className="h-4 w-4 mb-0.5" />
          <span>Bosh sahifa</span>
        </Link>

        <button
          type="button"
          onClick={onOpenMundarija}
          className="flex flex-col items-center py-1 px-2 rounded-lg hover:text-text transition-colors"
        >
          <BookOpen className="h-4 w-4 mb-0.5" />
          <span>Mundarija</span>
        </button>

        <Link
          to="/glossary"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            isCurrent('/glossary') ? 'text-accent' : 'hover:text-text'
          }`}
        >
          <BookMarked className="h-4 w-4 mb-0.5" />
          <span>Glossariy</span>
        </Link>

        <Link
          to="/results"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            isCurrent('/results') ? 'text-accent' : 'hover:text-text'
          }`}
        >
          <Award className="h-4 w-4 mb-0.5" />
          <span>Natija</span>
        </Link>

        <Link
          to="/authors"
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            isCurrent('/authors') ? 'text-accent' : 'hover:text-text'
          }`}
        >
          <Users className="h-4 w-4 mb-0.5" />
          <span>Muallif</span>
        </Link>
      </nav>
    </div>
  );
};

