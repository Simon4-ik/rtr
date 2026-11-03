import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuizData } from '../types';
import { saveQuizScore, getProgress } from '../services/progressService';

interface QuizProps {
  quizData: QuizData;
  paraNumber: number;
  onCompleted?: (scorePercent: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quizData, paraNumber, onCompleted }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const questions = quizData.questions;
  const currentQ = questions[currentIdx];
  const total = questions.length;

  // Check existing score in storage
  const savedProgress = getProgress();
  const existingScore = savedProgress.quizScores[paraNumber];

  const handleSelectOption = (optIdx: number) => {
    // Once verified or selected, provide instant feedback
    if (revealed[currentIdx]) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
    setRevealed((prev) => ({ ...prev, [currentIdx]: true }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total,
      percent: Math.round((correct / total) * 100),
    };
  };

  const handleFinish = () => {
    const score = calculateScore();
    setIsFinished(true);
    saveQuizScore(paraNumber, score.percent);
    if (onCompleted) {
      onCompleted(score.percent);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setRevealed({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  // If already completed in past session, user can still review or retake
  const score = calculateScore();
  const isPassed = score.percent >= (quizData.passingScore || 60);

  const answeredCount = Object.keys(revealed).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  if (isFinished) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
            <Award className="h-8 w-8" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isPassed ? "Tabriklaymiz! Test muvaffaqiyatli yakunlandi" : "Test yakunlandi"}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isPassed
              ? "Siz mavzu bo'yicha asosiy tushunchalarni a'lo darajada o'zlashtirdingiz."
              : "Natijani yaxshilash uchun ma'ruza matnini qayta o'qib, testni qaytadan topshirishingiz mumkin."}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-500 dark:text-slate-400">To'g'ri javoblar</span>
              <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {score.correct} / {score.total}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs text-slate-500 dark:text-slate-400">O'zlashtirish ko'rsatkichi</span>
              <p className={`mt-1 text-2xl font-bold ${isPassed ? 'text-brand-600 dark:text-brand-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {score.percent}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Qaytadan topshirish</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all">
      {/* Quiz Top Header: Progress & Info */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {currentIdx + 1}-savol / {total}
            </span>
            {existingScore !== undefined && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Oldingi eng yaxshi natija: <strong>{existingScore}%</strong>
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Javob berildi: {answeredCount}/{total}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h4>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options.map((optText, optIdx) => {
          const isSelected = selectedAnswers[currentIdx] === optIdx;
          const isRevealed = revealed[currentIdx];
          const isCorrect = optIdx === currentQ.correctIndex;

          let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

          if (isRevealed) {
            if (isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-500/70 dark:bg-emerald-950/40 dark:text-emerald-200 ring-1 ring-emerald-500/50';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-rose-400 bg-rose-50 text-rose-950 dark:border-rose-500/60 dark:bg-rose-950/40 dark:text-rose-200';
            } else {
              btnClass = 'border-slate-200 bg-slate-50/50 opacity-60 dark:border-slate-800 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400';
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={isRevealed}
              onClick={() => handleSelectOption(optIdx)}
              className={`w-full text-left rounded-xl border p-4 text-sm font-medium transition-all flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-brand-500 ${btnClass}`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                isRevealed && isCorrect
                  ? 'bg-emerald-600 text-white'
                  : isRevealed && isSelected && !isCorrect
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span className="flex-1 leading-relaxed">{optText}</span>
              {isRevealed && isCorrect && (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isRevealed && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Feedback & Pedagogical Explanation */}
      {revealed[currentIdx] && (
        <div className={`mt-5 rounded-xl border p-4 text-sm leading-relaxed transition-all ${
          selectedAnswers[currentIdx] === currentQ.correctIndex
            ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-200'
            : 'border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200'
        }`}>
          <div className="flex items-start gap-2.5">
            <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">
                {selectedAnswers[currentIdx] === currentQ.correctIndex ? "To'g'ri javob!" : "Izoh va tahlil:"}
              </p>
              <p>{currentQ.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Oldingi</span>
        </button>

        {currentIdx < total - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => prev + 1)}
            disabled={!revealed[currentIdx]}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Keyingi savol</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={!revealed[currentIdx]}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Natijani ko'rish</span>
            <CheckCircle2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

