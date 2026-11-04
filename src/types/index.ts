export type TabId =
  | 'maqsad'
  | 'maruza'
  | 'metodlar'
  | 'video'
  | 'taqdimot'
  | 'didaktik'
  | 'amaliyot'
  | 'nazorat'
  | 'glossariy';

export interface TabConfig {
  id: TabId;
  label: string;
  badge?: string;
  description: string;
}

export interface OutcomeItem {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  paraCount: number;
}

export interface MethodItem {
  name: string;
  stage: string;
  description: string;
}

export interface ModuleInfo {
  code: string;
  title: string;
  subtitle: string;
  totalHours: number;
  totalParas: number;
  language: string;
  description: string;
  safetyNotice: string;
  outcomes: string[];
  competencies: { name: string; level: string }[];
  authors?: AuthorItem[];
}

export interface ParaSummary {
  id: string;
  number: number;
  title: string;
  hours: number;
  section: string;
  outcomes: string[];
  methods: string[];
  shortDescription: string;
  hasVideo: boolean;
  hasSlides: boolean;
  hasDidactic: boolean;
  hasTests: boolean;
  hasGlossary: boolean;
}

export interface VideoData {
  file: string;
  src?: string;
  durationMin: number;
  resolution: string;
  poster: string;
  timestamps?: { time: string; title: string }[];
  transcripts?: { time: string; speaker: string; text: string }[];
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  speakerNotes?: string;
}

export interface DidacticItem {
  type: string;
  file: string;
  caption: string;
  description?: string;
}

export interface PracticeData {
  title: string;
  task: string;
  items: string[];
}

export interface TestItem {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface GlossaryItem {
  term: string;
  def?: string;
  definition?: string;
  enTerm?: string;
  letter?: string;
  category?: string;
  paras?: number[];
}

export interface ParaDataOfficial {
  id: number;
  title: string;
  hours: number;
  outcomes: string[];
  goal: string;
  lectureFile: string;
  methods: MethodItem[];
  video: VideoData;
  slides: {
    file: string;
    count: number;
  };
  didactic: DidacticItem[];
  practice: PracticeData;
  reviewQuestions: string[];
  tests: TestItem[];
  glossary: GlossaryItem[];
}

export interface UserProgress {
  completedParas: number[];
  completedTabs: Record<number, TabId[]>; // paraNumber: ['maqsad', 'maruza'...]
  quizScores: Record<number, number>; // paraNumber: percent
  lastVisitedPara: number;
  lastVisitedTab: TabId;
}

export interface AuthorItem {
  id: string;
  name: string;
  fullName: string;
  role: string;
  degree: string;
  institution: string;
  workplace?: string;
  specialty: string;
  phone: string;
  formattedPhone: string;
  photo3x4?: string;
  photoGrad?: string;
  avatarFallback?: string;
  responsibilities: string[];
  badges: string[];
}
