import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { TestItem } from '../types';
import { saveQuizScore, getProgress } from '../services/progressService';
import { useTheme } from '../context/ThemeContext';

interface QuizEngineProps {
  tests: TestItem[];
  paraNumber: number;
  onFinished?: (scorePercent: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ tests, paraNumber, onFinished }) => {
  const { animationsEnabled } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const total = tests.length;
  const currentQ = tests[currentIdx];
  const answered = selectedAnswers[currentIdx] !== undefined;
  const userChoice = selectedAnswers[currentIdx];

  // Load existing score
  const savedProgress = getProgress();
  const existingScore = savedProgress.quizScores[paraNumber];

  // Handle option selection
  const handleSelect = (idx: number) => {
    if (answered) return;
    const isCorrect = idx === currentQ.answer;

    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: idx }));

    if (!isCorrect && animationsEnabled) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    }
  };

  // Keyboard 1-4 selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || answered) return;
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= currentQ.options.length) {
        handleSelect(keyNum - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, answered, isFinished, currentQ]);

  // Calculate score
  const calculateResult = () => {
    let correctCount = 0;
    const wrongList: { q: TestItem; userAns: number }[] = [];

    tests.forEach((t, i) => {
      if (selectedAnswers[i] === t.answer) {
        correctCount++;
      } else {
        wrongList.push({ q: t, userAns: selectedAnswers[i] });
      }
    });

    const percent = Math.round((correctCount / total) * 100);
    return { correctCount, percent, wrongList };
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      const res = calculateResult();
      setIsFinished(true);
      saveQuizScore(paraNumber, res.percent);
      if (onFinished) onFinished(res.percent);

      // Trigger subtle confetti for 100% only if motion is allowed
      if (res.percent === 100 && animationsEnabled) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#22D3C5', '#6366F1', '#22C55E'],
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const progressPercent = Math.round(((currentIdx + (answered ? 1 : 0)) / total) * 100);

  if (isFinished) {
    const { correctCount, percent, wrongList } = calculateResult();
    const passed = percent >= 60;

    return (
      <div className="rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card space-y-6">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Award className="h-8 w-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-text">
            {passed ? "Muvaffaqiyatli topshirildi!" : "Test yakunlandi"}
          </h3>

          <p className="text-xs sm:text-sm text-muted">
            {passed
              ? "Siz ushbu para bo'yicha tayanch kompetensiyalarni to'liq o'zlashtirdingiz."
              : "Natijani oshirish uchun ma'ruza matnini qayta ko'rib chiqib, testni takrorlang."}
          </p>

          {/* Score Badge */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <span className="text-[11px] text-muted">To'g'ri javoblar</span>
              <p className="text-2xl font-extrabold text-success mt-1">
                {correctCount} / {total}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <span className="text-[11px] text-muted">Ball</span>
              <p className={`text-2xl font-extrabold mt-1 ${passed ? 'text-accent' : 'text-warning'}`}>
                {percent}%
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-5 py-2.5 text-xs font-bold text-text hover:bg-surface-2 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Qayta urinish</span>
          </button>
        </div>

        {/* Review of wrong answers */}
        {wrongList.length > 0 && (
          <div className="border-t border-border pt-6 space-y-4">
            <h4 className="text-sm font-bold text-text flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span>Xatolar tahlili ({wrongList.length} ta savol)</span>
            </h4>

            <div className="space-y-3">
              {wrongList.map(({ q, userAns }, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface-2/60 p-4 text-xs space-y-2">
                  <p className="font-semibold text-text">{q.q}</p>
                  <div className="flex flex-col gap-1 text-[11px]">
                    <span className="text-danger flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>Sizning javobingiz: {q.options[userAns] || 'Belgilanmagan'}</span>
                    </span>
                    <span className="text-success flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>To'g'ri javob: {q.options[q.answer]}</span>
                    </span>
                  </div>
                  <p className="text-muted italic border-t border-border/50 pt-1.5 mt-1">
                    Izoh: {q.explain}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5 sm:p-7 shadow-card space-y-6">
      {/* Top Header & Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="rounded-chip bg-accent-soft px-2.5 py-0.5 font-bold text-accent">
              Savol {currentIdx + 1} / {total}
            </span>
            {existingScore !== undefined && (
              <span className="text-[11px] hidden sm:inline">
                Eng yaxshi natija: <strong>{existingScore}%</strong>
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-muted">
            Klaviatura: 1–{currentQ.options.length}
          </span>
        </div>

        {/* Smooth animated progress bar */}
        <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-text leading-snug">
        {currentQ.q}
      </h3>

      {/* Options List with Gentle Shake & Pop Effect */}
      <div className={`space-y-3 ${isShaking ? 'animate-shake' : ''}`}>
        {currentQ.options.map((option, optIdx) => {
          const isSelected = userChoice === optIdx;
          const isCorrect = optIdx === currentQ.answer;

          let btnClass = 'border-border bg-surface hover:border-accent text-text';

          if (answered) {
            if (isCorrect) {
              btnClass = 'border-success bg-success/15 text-success ring-1 ring-success/40 font-bold';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-danger bg-danger/15 text-danger font-bold';
            } else {
              btnClass = 'border-border bg-surface/40 opacity-40 text-muted';
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={answered}
              onClick={() => handleSelect(optIdx)}
              className={`w-full text-left rounded-btn border p-3.5 text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnClass}`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-mono font-bold ${
                answered && isCorrect
                  ? 'bg-success text-white'
                  : answered && isSelected && !isCorrect
                  ? 'bg-danger text-white'
                  : 'bg-surface-2 text-muted'
              }`}>
                {optIdx + 1}
              </span>

              <span className="flex-1 leading-relaxed">{option}</span>

              {answered && isCorrect && (
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
              )}
              {answered && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 text-danger shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Sliding Down */}
      {answered && (
        <div className={`rounded-xl border p-4 text-xs leading-relaxed transition-all ${
          userChoice === currentQ.answer
            ? 'border-success/30 bg-success/10 text-success'
            : 'border-danger/30 bg-danger/10 text-text'
        }`}>
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
            <div>
              <p className="font-bold text-text">
                {userChoice === currentQ.answer ? "To'g'ri javob!" : "Izoh:"}
              </p>
              <p className="mt-1 text-muted">{currentQ.explain}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Question Navigation */}
      {answered && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors"
          >
            <span>{currentIdx < total - 1 ? 'Keyingi savol' : 'Natijani hisoblash'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

