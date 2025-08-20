import React, { SVGProps } from "react";
import { SUBJECT_COLORS } from "../constants";
import { UseFormReset } from "react-hook-form";

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

export type TQuizQuestionOptionsProps = {
  name: string;
  tag: string;
  images: string | null;
  _id: string;
};

export type TQuizQuestionProps = {
  chapter: string[];
  createdAt: string;
  createdBy: string;
  images: Array<{
    key: string;
    url: string;
    _id: string;
  }>;
  level: string;
  options: TQuizQuestionOptionsProps[];
  question: string;
  standard: number;
  subject: string;
  subtopics: string[];
  topics: string[];
  _id: string;
};

export type TQuizAnswerProps = {
  question: string;
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

export type TopicsWithSubtopicsProps = {
  _id: string;
  chapterId: string;
  name: string;
  subtopics: Array<{
    _id: string;
    name: string;
  }>;
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
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  category: "basic" | "pro" | "premium" | "free" | null;
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
  planner: boolean;
  preferences: {
    continuousData: { nextDay: boolean }; // to decide continuous topic placing in planner
    dailyQuestions: number;
    backRevisionTopics: number;
  };
  parent: {
    name?: string;
    phone?: string;
  };
  mentor: {
    _id?: string;
  };
  institute: {
    _id: string | null;
    name?: string | null;
    logo?: {
      key?: string | null;
      url?: string | null;
    };
  };
  batches: Array<{
    _id: string;
    status: "pending" | "accepted" | "rejected";
    requestedAt: Date;
  }>;
  classes: Array<{
    _id: string;
    status: "pending" | "accepted" | "rejected";
    requestedAt: Date;
  }>;
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
  details: {
    level?: { number: number };
    points?: { number: number };
    streak?: { number: number; updatedAt: Date };
    mood?: Array<{
      _id?: string;
      day: string;
      date: string | null;
      emoji: string | null;
    }>;
    report?: {
      dailyReport?: {
        date: Date;
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
    id?: string;
    status?: string;
    planId?: string;
    duration: number;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
    coupon?: string;

    upgradation?: {
      previousPlanId?: string;
      previousDuration?: number;
      dateOfUpgradation?: Date;
      addedDuration?: number;
    };
  };
  freeTrial: {
    availed?: boolean;
    active?: boolean;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
  };
  refund: {
    type?: string;
    subscriptionType?: string;
    status?: string;
    amount?: string;
  };
  disabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  id: string;
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

export type SubTopic = {
  id: string;
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type TRevisionProps = {
  _id: string;
  user: string;
  tag: string;
  topic: Topic;
  subtopic: SubTopic;
  chapter: Chapter;
  subject: subject;
  standard: number;
  createdAt?: Date;
  updatedAt?: Date;
  efficiency?: any;
  quizScores?: number[];
  weeklyTestScore?: number;
};

export type TChapterRevisionProps = {
  id: string;
  name: string;
  quizId: string;
  subject: string;
};

export type TDayProps = {
  date: string;
  day: string;
  continuousRevisionTopics: TRevisionProps[];
  continuousRevisionSubTopics: TRevisionProps[];
  backRevisionTopics: TRevisionProps[];
  lowAccuracyTopics: TRevisionProps[];
  chapters: TChapterRevisionProps[];
  questions: { [key: string]: any };
  completedTopics: string[];
  incompletedTopics: string[];
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

export type SubItem = {
  _id: string;
  name: string;
};

export type Item = {
  _id: string;
  name: string;
  subItems?: SubItem[];
};

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
export type WeeklyQuizProps = {
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
  createdBy: string;
  isCompleted: boolean;
};
export type ChapterProps = {
  chapter: string;
  totalQuestions: number;
};

export type SubjectProps = {
  subject: string;
  chapters: ChapterProps[];
};
export type ErrorNoteProps = {
  _id: string;
  note: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type ErrorBookProps = {
  errorBook?: SubjectProps[];
  errorNotes?: ErrorNoteProps[];
};
export interface QuestionOption {
  name: string;
  tag: "Correct" | "Incorrect";
  images?: Image[];
  _id: string;
}
export interface Image {
  url: string;
  key: string;
  _id: string;
}
export interface EQuestion {
  _id: string;
  question: string;
  options: QuestionOption[];
  standard: number;
  subject: string;
  chapter: string[];
  topics: string[];
  subtopics: string[];
  level: string;
  images: Image[];
  createdBy: string;
  createdAt: string;
  __v: number;
}
export interface ErrorBookQuestion {
  _id: string;
  question: EQuestion;
}
export type ChapterErrorBookProps = {
  chapterErrorBook: ErrorBookQuestion[];
  chapterName: string;
};

export interface Plan {
  _id: string;
  planId: string;
  amount: number;
  currency: string;
  type: string;
  category: string;
  status: string;
  "duration(months)": number;
  createdAt: string;
}

export interface ExistingPlan {
  _id: string;
  amount: number;
  category: string;
  createdAt: string;
  currency: string;
  "duration(months)": number;
  planId: string;
  status: string;
  type: string;
}

export interface ICoupon {
  _id: string;
  category: string;
  code: string;
  createdAt: string;
  discountType: string;
  discountValue: number;
  expiryDate: string;
  plan: string;
  usageLimit: number;
}

export interface SubtotalContainerProps {
  selectedCoupon: ICoupon | null;
  setSubTotalBlockHeight: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  category: string | string[] | undefined;
  price: string | string[] | undefined;
  planId: string | string[] | undefined;
  existingRemainingAmount: number | null;
  isExistingRemainingAmount: boolean;
  resetCustomCouponForm: UseFormReset<{
    code: string;
  }>;
  setIsCustomCouponValid: React.Dispatch<React.SetStateAction<boolean | null>>;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
  setSubscriptionId: React.Dispatch<
    React.SetStateAction<string | string[] | undefined>
  >;
}

export type TInstituteProps = {
  _id: string;
  name: string;
  logo: { key: string; url: string } | null;
  subjects: string[];
  standards: string[];
  admins: string[];
  batches: string[];
  createdAt: string;
  updatedAt: string;
};

export interface IClassesProps {
  _id: string;
  acceptingResponses: boolean;
  batch: {
    _id: string;
    name: string;
    standard: string;
  };
  classReport: {
    _id: string;
    lastUpdated: string;
    syllabusCompleted: number;
    totalDuration: number;
    totalLectures: number;
  };
  createdAt: string;
  description: string | null;
  meetingLink: string | null;
  notes: string | null;
  recordingLink: string | null;
  resources: any[];
  requestedAt: string;
  shareCode: string;
  shareLink: string;
  status: string;
  subject: string;
  teacher: {
    _id: string;
    firstname: string;
    lastname: string;
  };
  updatedAt: string;
}
