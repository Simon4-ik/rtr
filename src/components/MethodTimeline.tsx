import React from 'react';
import { Sparkles, Users, Brain, Wrench, Clock, CheckCircle } from 'lucide-react';
import { MethodItem } from '../types';

interface MethodTimelineProps {
  methods: MethodItem[];
}

export const MethodTimeline: React.FC<MethodTimelineProps> = ({ methods }) => {
  const getMethodIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('aqliy')) return Brain;
    if (lower.includes('keys')) return Sparkles;
    if (lower.includes('guruh')) return Users;
    return Wrench;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-border bg-surface p-5 sm:p-6 shadow-card">
        <h3 className="text-base sm:text-lg font-bold text-text">
          O'qitish metodlari va pedagogik bosqichlar
        </h3>
        <p className="text-xs text-muted mt-1">
          Dars jarayonida nazariy bilimlarni amaliyotga bog'lash uchun rasmiy tasdiqlangan 4 ta metodika asosida dars o'tiladi.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Animated vertical connecting line */}
        <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-accent-2 to-border" />

        {methods.map((method, idx) => {
          const Icon = getMethodIcon(method.name);

          return (
            <div key={idx} className="relative group">
              {/* Timeline Step Icon Dot */}
              <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface border-2 border-accent text-accent shadow-sm group-hover:scale-110 transition-transform">
                <Icon className="h-4 w-4" />
              </div>

              {/* Step Card */}
              <div className="rounded-card border border-border bg-surface p-5 shadow-card hover:border-accent/40 transition-all ml-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-chip bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent">
                      {idx + 1}-bosqich
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-text">
                      {method.name}
                    </h4>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-chip bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-muted">
                    <Clock className="h-3 w-3 text-accent" />
                    <span>{method.stage}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

