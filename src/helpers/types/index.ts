import React, { SVGProps } from "react";
import { SUBJECT_COLORS } from "../constants";

export type TContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export type TLogoProps = {
  fullLogoWidth: number;
  fullLogoHeight: number;
  fullLogoClassName: string;
  smallLogoWidth: number;
  smallLogoHeight: number;
  smallLogoClassName: string;
};

export type TSidebarLink = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

export type THeaderProps = {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  titleClassName?: string;
};

export type TDashboardTodaysTopic = {
  label: string;
  completed: boolean;
};

export type TTabNavItemProps = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  className?: string;
  activeTabClassName?: string;
  titleClassName?: string;
  layoutIdPrefix?: string;
};

export type TTabContentProps = {
  id: string;
  activeTab: string;
  className?: string;
  children: React.ReactNode;
};

export type TSemiRadialChartProps = {
  series: number[];
  colors: string[];
  chartLabel: string;
};

export type TLevelPointProps = {
  cardBgColor: string;
  iconImageSrc: string;
  iconAltText: string;
  iconShadowColor?: string;
  chevronBgColor: string;
  pointsColor: string;
  points: number;
  pointsText: string;
  progressValue?: number;
  progressIndicatorBg?: string;
  pointsProgressText?: string;
  pointsProgressTextColor?: string;
  progressIconStroke?: string;
};

export type TMoodEmojisProps = {
  mood: string;
  mood_id: string;
  moodImg: string;
};

export type TQuizQuestionProps = {
  chapter: string[];
  createdAt: string;
  createdBy: string;
  images: [];
  level: string;
  options: Array<{
    name: string;
    tag: string;
    images: string | null;
    _id: string;
  }>;
  question: string;
  standard: number;
  subject: string;
  subtopics: [];
  topics: string[];
  _id: string;
};

export type TQuizAnswerProps = {
  question: {};
  studentAnswer: string;
  isCorrect: boolean;
  tag: string;
};

export type TPlannerTodaysTopic = {
  subject: string;
  topics: string;
};

export interface IIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export interface FormattedDate {
  dayOfWeek: string;
  dayOfMonth: string;
  month: string;
  year: number;
}

export interface ChatData {
  img: string;
  title: string;
  status: string;
  messages: Array<{
    sender: string;
    text: string;
    timestamp: string;
  }>;
}

export type chapterOverviewProps = {
  chapter: string;
  chapterEfficiency: number;
  topics: {
    title: string;
    revisionFrequency: number;
    lastRevised: string;
    efficiency: number;
    revisionDates: {
      dailyEfficiency: number;
      date: string;
    }[];
  }[];
};

export type subjectChaptersProps = {
  _id: string;
  name: string;
  topics: {
    _id: string;
    name: string;
    icon?: React.ComponentType<{ className?: string | undefined }>;
  }[];
};

export interface ISubject {
  name: string;
  overall_efficiency: number;
  overall_progress: number;
  total_questions_solved: {
    number?: number;
    percentage?: number;
  };
}

export interface IAcademic {
  standard: number;
  competitiveExam?: string | null;
  subjects?: ISubject[];
  schedule?: string | null;
  coachingMode?: string | null;
  coachingName?: string | null;
  coachingAddress?: string | null;
  schoolOrCollegeName?: string | null;
  schoolOrCollegeAddress?: string | null;
}

export type UserDataProps = {
  firstname: string;
  lastname?: string;
  email: string;
  phone: {
    personal?: number;
    other?: number;
  };

  password: string;
  salt: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  planner: Boolean;
  parent: {
    name?: string;
    phone?: string;
  };
  address: {
    country?: string;
    addressLine?: string;
    pincode?: number;
  };
  academic: IAcademic;
  about: {
    dateOfBirth?: string;
    gender: string;
  };
  role?: string;
  details?: {
    level?: { number: number };
    points?: { number: number };
    streak?: { number: number };
    mood?: Array<{
      day: string;
      emoji: string;
    }>;
    report?: {
      dailyReport?: {
        session: number;
        quiz: number;
        overall?: number;
      };
    };
  };
  badges?: Array<{
    name: string;
    url: string;
  }>;
  points?: number;
  subscription: {
    type?: string;
    id?: string;
    status?: string;
    dateOfActivation?: Date;
  };
  freeTrial: {
    availed?: Boolean;
    active?: Boolean;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
  };
  refund: {
    type?: string;
    subscriptionType?: string;
    status?: string;
    amount?: string;
  };
  createdAt?: Date;
};

export type ProgressAnalyticsDataProps = {
  day?: string;
  date?: Date;
  session: number;
  quiz: number;
  overall: number;
};

export type TStudentReportProps = {
  startDate: string;
  endDate: string;
  days: Array<{
    day: string;
    date: string;
    session: number;
    quiz: number;
    overall: number;
  }>;
};

export type TStudentOverallReportProps = {
  day: string;
  date: string;
  session: number;
  quiz: number;
  overall: number;
};

export type UserProps = {
  user: UserDataProps | null;
};

export type OTPProps = {
  otp: string;
};

export type SignUpDataProps = {
  name: string;
  email: string;
  password: string;
};

export type SignInDataProps = {
  email: string;
  password: string;
};

export type ForgotPasswordProps = {
  email: string;
};

export type ResetPasswordProps = {
  password: string;
};

export type StudentPersonalInfoProps = {
  address?: string;
  class?: number;
  coachingAddress?: string;
  coachingName?: string;
  coachingType?: string;
  competitiveExam?: string;
  country?: string;
  dateOfBirth?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  messageAboutCompetitiveExam?: string;
  messageAboutStudentSchedule?: string;
  parentName?: string;
  parentsPhone?: number;
  phone?: number;
  pinCode?: number;
  schoolOrCollegeAddress?: string;
  schoolOrCollegeName?: string;
  studentSchedule?: string;
};

export interface Option {
  name: string;
  tag: string;
  images?: string | null;
  _id: string;
}

export interface Question {
  _id: string;
  question: string;
  options: Option[];
}

export interface Questions {
  [key: string]: Question | undefined;
}

export type Topic = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type Chapter = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  overall_progress?: number;
  total_questions_solved: {
    number?: number;
    percentage?: number;
  };
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type subject = {
  name: string;
  overall_efficiency?: number;
};

export type TRevisionProps = {
  _id: string;
  user: string;
  tag: string;
  topic: Topic;
  chapter: Chapter;
  subject: subject;
  standard: number;
  createdAt?: Date;
  updatedAt?: Date;
  efficiency?: any;
  quizScores?: number[];
  weeklyTestScore?: number;
};

export type TDayProps = {
  date: string;
  day: string;
  continuousRevisionTopics: TRevisionProps[];
  backRevisionTopics: TRevisionProps[];
  questions: { [key: string]: any };
  completedTopics: any[];
  incompletedTopics: any[];
  _id: string;
};

export type PlannerDataProps = {
  student: string;
  startDate: string;
  endDate: string;
  days: TDayProps[];
  createdAt: string;
};

export type DataProps = {
  data: PlannerDataProps;
};
export type Subject = keyof typeof SUBJECT_COLORS;
export interface AttemptedWeeklyQuiz {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  subject: Subject;
  completedDate: string;
  efficiency: number;
  questions: number;
}
export interface AttemptedQuizProps {
  id: number;
  chapterName: string;
  description: string;
  subject: Subject;
  questions: number;
  completedDate: string;
  efficiency: number;
}
export type UnattemptedWeeklyQuiz = {
  _id: string;
  user: string;
  questions: {
    [key: string]: {
      _id: string;
      question: string;
      options: {
        name: string;
        tag: string;
        images: string | null;
        _id: string;
      }[];
      standard: number;
      subject: string;
      chapter: string[];
      topics: string[];
      subtopics: string[];
      level: string;
      images: [];
      createdBy: string;
      createdAt: string;
    }[];
  };
  quizType: string;
  attempted: boolean;
  reattempted: number;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type UnattemptedChapterQuizProps = {
  id: number;
  chapterName: string;
  description: string;
  subject: Subject;
  questions: number;
};

export type TTrackerProps = {
  _id: string;
  user: string;
  subject: string;
  chapter: Chapter;
  topics: Topic[];
};

export type TMeetingsProps = {
  rescheduled: {
    isRescheduled: boolean;
    date: Date;
    time: string;
  };
  gmeet: { link: string | null };
  _id: string;
  date: string;
  time: string;
  student: string;
  mentor: string;
  accepted: boolean;
  message: string;
  createdAt: string;
  updatedAt: string;
};
