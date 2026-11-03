import React, { useState } from 'react';
import { Terminal, CheckCircle2, AlertCircle, RefreshCw, Shield, Play } from 'lucide-react';

interface Scenario {
  id: number;
  incident: string;
  correctAnswer: 'Maxfiylik' | 'Yaxlitlik' | 'Mavjudlik';
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    incident: "Xodim korxona mijozlari ro'yxatini begona shaxsning shaxsiy pochtasiga yubordi.",
    correctAnswer: "Maxfiylik",
    explanation: "Maxfiy ma'lumotlar vakolati bo'lmagan shaxsga sizib chiqdi (Confidentiality buzilishi).",
  },
  {
    id: 2,
    incident: "Kimdir ma'lumotlar bazasiga kirib, tovarlarning narxlarini 0 ga o'zgartirib qo'ydi.",
    correctAnswer: "Yaxlitlik",
    explanation: "Ma'lumotlar ruxsatsiz o'zgartirildi va ularning ishonchliligiga putur yetdi (Integrity buzilishi).",
  },
  {
    id: 3,
    incident: "Kiberhujum (DDoS) oqibatida bankning onlayn to'lov tizimi 3 soat davomida ishlamay qoldi.",
    correctAnswer: "Mavjudlik",
    explanation: "Foydalanuvchilar qonuniy xizmatdan o'z vaqtida foydalana olmadi (Availability buzilishi).",
  },
  {
    id: 4,
    incident: "Foydalanuvchi fishing xatiga ishonib, o'zining korporativ akkaunt parolini kiritib yubordi.",
    correctAnswer: "Maxfiylik",
    explanation: "Autentifikatsiya ma'lumotlari hujumchi qo'liga o'tdi (Maxfiylik tahdidi).",
  },
];

export const LabSimulator: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleSelect = (choice: 'Maxfiylik' | 'Yaxlitlik' | 'Mavjudlik') => {
    if (selectedAnswer) return;
    setSelectedAnswer(choice);
    if (choice === scenario.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-2/60 overflow-hidden shadow-lg">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-muted flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>cyber-lab://simulyator/hodisalarni-tasniflash</span>
          </span>
        </div>
        <span className="rounded-chip bg-accent-soft px-2 py-0.5 text-[10px] font-mono text-accent">
          Mudofaa simulyatori v1.0
        </span>
      </div>

      {/* Simulator Terminal Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {!isCompleted ? (
          <>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Hodisa: {currentIdx + 1} / {SCENARIOS.length}</span>
              <span>Ball: {score} to'g'ri</span>
            </div>

            {/* Incident Scenario Box */}
            <div className="rounded-xl border border-border bg-surface p-4 font-mono text-xs sm:text-sm text-text leading-relaxed">
              <span className="text-accent font-bold">$ hodisa-tahlili --tekshirish:</span>
              <p className="mt-2 text-text font-sans font-medium text-sm sm:text-base">
                "{scenario.incident}"
              </p>
            </div>

            {/* Prompt */}
            <p className="text-xs text-muted font-medium">
              Ushbu hodisada CIA triadasining qaysi xususiyati buzilgan?
            </p>

            {/* Answer buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Maxfiylik', 'Yaxlitlik', 'Mavjudlik'] as const).map((choice) => {
                const isSelected = selectedAnswer === choice;
                const isCorrect = choice === scenario.correctAnswer;

                let btnStyle = 'border-border bg-surface hover:border-accent text-text';
                if (selectedAnswer) {
                  if (isCorrect) {
                    btnStyle = 'border-success bg-success/15 text-success font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-danger bg-danger/15 text-danger font-bold';
                  } else {
                    btnStyle = 'border-border bg-surface/50 opacity-50 text-muted';
                  }
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleSelect(choice)}
                    className={`rounded-btn border p-3.5 text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {selectedAnswer && (
              <div
                className={`rounded-xl border p-4 text-xs leading-relaxed ${
                  selectedAnswer === scenario.correctAnswer
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'border-danger/30 bg-danger/10 text-danger'
                }`}
              >
                <div className="flex items-start gap-2">
                  {selectedAnswer === scenario.correctAnswer ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">
                      {selectedAnswer === scenario.correctAnswer
                        ? "To'g'ri tashxis!"
                        : "Xato! To'g'ri javob: " + scenario.correctAnswer}
                    </p>
                    <p className="mt-1 opacity-90">{scenario.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next button */}
            {selectedAnswer && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-btn bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-hover transition-colors flex items-center gap-2"
                >
                  <span>{currentIdx < SCENARIOS.length - 1 ? 'Keyingi hodisa' : 'Yakunlash'}</span>
                  <Play className="h-3.5 w-3.5 fill-current" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Finished State */
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-success/20 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-text">
              Laboratoriya simulyatsiyasi yakunlandi!
            </h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Siz {SCENARIOS.length} ta hodisadan {score} tasini to'g'ri tasnifladingiz. CIA triadasi bo'yicha amaliy diagnostika ko'nikmasi mustahkamlandi.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-4 py-2 text-xs font-semibold text-text hover:bg-surface-2 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Simulyatsiyani qaytadan boshlash</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

