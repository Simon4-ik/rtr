import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldAlert,
  Lock,
  Wifi,
  Server,
  Cloud,
  FileCheck2,
  Users
} from 'lucide-react';
import { ParaSummary, UserProgress } from '../types';

interface SidebarProps {
  paras: ParaSummary[];
  progress: UserProgress;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
  onItemClick?: () => void;
}

const SECTION_CONFIG = [
  { name: 'Axborot xavfsizligi asoslari', range: [1, 5], icon: ShieldAlert },
  { name: 'Kriptografiya va PKI', range: [6, 8], icon: Lock },
  { name: 'Tarmoq xavfsizligi', range: [9, 13], icon: Wifi },
  { name: 'Tizim va dasturlar', range: [14, 20], icon: Server },
  { name: 'Zaifliklar, bulut va OT', range: [21, 25], icon: Cloud },
  { name: 'Hodisalar va amaliy yakun', range: [26, 30], icon: FileCheck2 },
];

export const Sidebar: React.FC<SidebarProps> = ({
  paras,
  progress,
  isCollapsed,
  onToggleCollapse,
  className = '',
  onItemClick,
}) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Axborot xavfsizligi asoslari': true,
  });

  const toggleSection = (name: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getParaStatus = (paraNum: number) => {
    if (progress.completedParas.includes(paraNum)) return 'done';
    const tabsVisited = progress.completedTabs[paraNum]?.length || 0;
    if (tabsVisited > 0) return 'in_progress';
    return 'not_started';
  };

  return (
    <aside
      className={`border-r border-border bg-surface transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-72 sm:w-80'
      } ${className}`}
    >
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-muted">
            <BookOpen className="h-4 w-4 text-accent" />
            <span>Mundarija (6 bo'lim)</span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Yon panelni kengaytirish' : 'Yon panelni yigʻish'}
          className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-text transition-colors"
        >
          {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {SECTION_CONFIG.map((sec) => {
          const secParas = paras.filter(
            (p) => p.number >= sec.range[0] && p.number <= sec.range[1]
          );
          const completedInSec = secParas.filter((p) =>
            progress.completedParas.includes(p.number)
          ).length;
          const secPercent = secParas.length > 0 ? Math.round((completedInSec / secParas.length) * 100) : 0;
          const isExpanded = expandedSections[sec.name] ?? false;
          const IconComponent = sec.icon;

          if (isCollapsed) {
            return (
              <div key={sec.name} className="flex flex-col items-center py-2" title={sec.name}>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-muted hover:text-accent transition-colors">
                  <IconComponent className="h-4 w-4" />
                  {completedInSec === secParas.length && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={sec.name} className="rounded-xl border border-border/60 bg-surface-2/40 overflow-hidden">
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(sec.name)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-surface-2/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent className="h-4 w-4 text-accent shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-text truncate">
                      {sec.name}
                    </p>
                    <p className="text-[10px] text-muted">
                      {sec.range[0]}–{sec.range[1]}-paralar • {completedInSec}/{secParas.length} tayyor
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted shrink-0" />
                )}
              </button>

              {/* Thin section progress bar */}
              <div className="h-1 w-full bg-surface-2">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${secPercent}%` }}
                />
              </div>

              {/* Paras in this section */}
              {isExpanded && (
                <div className="p-1 space-y-0.5">
                  {secParas.map((p) => {
                    const status = getParaStatus(p.number);
                    const isActive = location.pathname.includes(`/para/${p.id}`) ||
                      (location.pathname === '/' && p.number === 1);

                    return (
                      <Link
                        key={p.id}
                        to={`/para/${p.id}`}
                        onClick={onItemClick}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors ${
                          isActive
                            ? 'bg-accent/15 text-accent font-semibold border-l-2 border-accent'
                            : 'text-muted hover:bg-surface-2 hover:text-text'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {status === 'done' ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                          ) : status === 'in_progress' ? (
                            <Clock className="h-3.5 w-3.5 text-warning shrink-0" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 text-muted/40 shrink-0" />
                          )}
                          <span className="truncate">
                            <span className="font-mono text-[10px] opacity-70 mr-1.5">
                              #{String(p.number).padStart(2, '0')}
                            </span>
                            {p.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Link */}
      {!isCollapsed && (
        <div className="border-t border-border p-3 shrink-0 bg-surface-2/40">
          <Link
            to="/authors"
            onClick={onItemClick}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors ${
              location.pathname === '/authors'
                ? 'bg-accent/15 text-accent font-semibold border-l-2 border-accent'
                : 'text-muted hover:bg-surface hover:text-text'
            }`}
          >
            <Users className="h-4 w-4 text-accent shrink-0" />
            <span className="font-semibold truncate">Mualliflar (RTR guruhi)</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

