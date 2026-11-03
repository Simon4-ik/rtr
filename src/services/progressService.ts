import { UserProgress, TabId } from '../types';

const STORAGE_KEY = 'kiberxavfsizlik_rtr_progress';

const defaultProgress: UserProgress = {
  completedParas: [],
  completedTabs: {},
  quizScores: {},
  lastVisitedPara: 1,
  lastVisitedTab: 'maqsad',
};

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      completedParas: Array.isArray(parsed.completedParas) ? parsed.completedParas : [],
      completedTabs: parsed.completedTabs && typeof parsed.completedTabs === 'object' ? parsed.completedTabs : {},
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
      lastVisitedPara: typeof parsed.lastVisitedPara === 'number' ? parsed.lastVisitedPara : 1,
      lastVisitedTab: parsed.lastVisitedTab || 'maqsad',
    };
  } catch (e) {
    console.error('Failed to parse progress from localStorage', e);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function markTabVisited(paraNumber: number, tabId: TabId): UserProgress {
  const current = getProgress();
  const existingTabs = new Set(current.completedTabs[paraNumber] || []);
  existingTabs.add(tabId);

  const updatedTabs = {
    ...current.completedTabs,
    [paraNumber]: Array.from(existingTabs),
  };

  // If all 9 tabs are completed or quiz is passed with >= 60%, mark para as completed
  const set = new Set(current.completedParas);
  if (existingTabs.size >= 7) {
    set.add(paraNumber);
  }

  const updated: UserProgress = {
    ...current,
    completedTabs: updatedTabs,
    completedParas: Array.from(set).sort((a, b) => a - b),
    lastVisitedPara: paraNumber,
    lastVisitedTab: tabId,
  };

  saveProgress(updated);
  return updated;
}

export function markParaCompleted(paraNumber: number, completed = true): UserProgress {
  const current = getProgress();
  const set = new Set(current.completedParas);
  if (completed) {
    set.add(paraNumber);
  } else {
    set.delete(paraNumber);
  }
  const updated: UserProgress = {
    ...current,
    completedParas: Array.from(set).sort((a, b) => a - b),
  };
  saveProgress(updated);
  return updated;
}

export function saveQuizScore(paraNumber: number, scorePercent: number): UserProgress {
  const current = getProgress();
  const updated: UserProgress = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [paraNumber]: Math.max(current.quizScores[paraNumber] || 0, scorePercent),
    },
  };
  if (scorePercent >= 60 && !updated.completedParas.includes(paraNumber)) {
    updated.completedParas = [...updated.completedParas, paraNumber].sort((a, b) => a - b);
  }
  saveProgress(updated);
  return updated;
}

export function resetAllProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
  return defaultProgress;
}
