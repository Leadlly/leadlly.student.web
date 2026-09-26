export type StudyDnaSignal = {
  key: string;
  label: string;
  icon: string;
  score: number;
  band: string;
  color: string;
};

export type StudyDnaBreakdown = {
  key: string;
  label: string;
  color: string;
  percent: number;
  count?: number;
};

export type StudyDnaSubject = {
  name: string;
  percent: number;
  lockedPercent?: number;
  tagged?: number;
  covered?: number;
  total?: number;
  color: string;
  breakdown: StudyDnaBreakdown[];
};

export type StudyDnaProfile = {
  hero: {
    initials: string;
    name: string;
    examLabel: string;
    classLabel: string;
    healthPercent: number;
    healthLabel: string;
    consistency: number;
    revision: number;
    accuracy: number;
    meaning: string;
    subtitle?: string;
    chapterProgress?: {
      syllabusLabel: string;
      items: Array<{
        key: string;
        percent: number;
        label: string;
        icon: string;
      }>;
    };
  };
  week: {
    classHoursLabel: string;
    classWindow: string;
    selfStudyHoursLabel: string;
    selfStudyHint: string;
    sleepHoursLabel: string;
    sleepWindow: string;
    nextTest: {
      daysLabel: string;
      name: string;
      syllabus: string;
      day: string;
      month: string;
    } | null;
    studyWindowLabel: string;
    insight: string;
  };
  preparation: {
    examName: string;
    subjects: StudyDnaSubject[];
    pictureTitle: string;
    pictureBody: string;
  };
  signals: {
    items: StudyDnaSignal[];
    reading: string;
  };
  strengths: Array<{ title: string; body: string; icon: string }>;
  leaks: Array<{ index: string; title: string; body: string }>;
  routine: {
    events: Array<{
      time: string;
      label: string;
      tone: "muted" | "class" | "study" | "revise";
    }>;
    studyWindowLabel: string;
  };
  tests: Array<{
    day: string;
    month: string;
    name: string;
    syllabus: string;
  }>;
  weekFocus: Array<{
    index: string;
    title: string;
    meta: string;
    icon: string;
    topics?: string[];
  }>;
  weekGoal: string;
  close: {
    quote: string;
    actions: Array<{ title: string; body: string; icon: string }>;
  };
};
