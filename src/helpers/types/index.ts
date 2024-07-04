import React, { SVGProps } from "react";

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

export type UserDataProps = {
  firstname: string;
  lastname?: string;
  email: string;
  phone: {
    personal?: number;
    other?: number;
  };

  password: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  parent: {
    name?: string;
    phone?: string;
  };
  address: {
    country?: string;
    addressLine?: string;
    pincode?: number;
  };
  academic: {
    standard: number;
    competitiveExam?: string;
    subjects?: [];
    schedule?: string;
    coachingMode?: string;
    coachingName?: string;
    coachingAddress?: string;
    schoolOrCollegeName?: string;
    schoolOrCollegeAddress?: string;
  };
  about: {
    dateOfBirth?: string;
    gender: string;
  };
  role?: string;
  details?: {
    level?: number;
    points?: number;
    streak?: number;
    mood?: Array<{
      day: String;
      emoji: String;
    }>;
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
    availed: Boolean
    active:  Boolean
    dateOfActivation: Date,
    dateOfDeactivation: Date,
  };
  refund: {
    type?: string;
    subscriptionType?: string;
    status?: string;
    amount?: string;
  };
  quiz?: {
    minor?: any[];
    major?: any[];
  };
  createdAt?: Date; // Optional as it has a default value
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

export type TBackRevisionProps = {
  topic: {
    name: string;
    studiedAt: [
      {
        date: string;
        _id: string;
      },
    ];
  };
  chapter: {
    name: string;
    level: string;
    studiedAt: [];
  };
  _id: string;
  user: string;
  tag: string;
  subject: string;
  standard: number;
  createdAt: string;
  updatedAt: string;
};

export type TDayProps = {
  date: string;
  day: string;
  continuousRevisionTopics: any[];
  backRevisionTopics: TBackRevisionProps[];
  questions: any[];
  _id: string;
};

export type PlannerDataProps = {
  data: {
    student: string;
    startDate: string;
    endDate: string;
    days: TDayProps[];
    createdAt: string;
  };
};
