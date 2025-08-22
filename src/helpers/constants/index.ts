import { TSidebarLink } from "../types";

import DashboardIcon from "@/components/icons/DashboardIcon";
import PlannerIcon from "@/components/icons/PlannerIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import WorkshopIcon from "@/components/icons/WorkshopIcon";
import LibertyIcon from "@/components/icons/LibertyIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import StudyRoomIcon from "@/components/icons/StudyRoomIcon";
import ChatIcon3 from "@/components/icons/ChatIcon3";

export const userSidebarLinks: TSidebarLink[] = [
  {
    label: "dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  {
    label: "planner",
    icon: PlannerIcon,
    href: "/planner",
  },
  {
    label: "tracker",
    icon: TrackerIcon,
    href: "/tracker",
  },
  {
    label: "chat",
    icon: ChatIcon3,
    href: "/chat",
  },
  {
    label: "quizzes",
    icon: QuizIcon,
    href: "/quizzes",
  },
  {
    label: "errorbook",
    icon: ErrorBookIcon,
    href: "/error-book",
  },
  // {
  //   label: "growth meter",
  //   icon: GrowthMeterIcon,
  //   href: "/growth-meter",
  // },
  // {
  //   label: "workshops",
  //   icon: WorkshopIcon,
  //   href: "/workshops",
  // },
  // {
  //   label: "library",
  //   icon: LibertyIcon,
  //   href: "/library",
  // },
  // {
  //   label: "study room",
  //   icon: StudyRoomIcon,
  //   href: "/study-room",
  // },
];

export const moodEmojis = [
  {
    moodImg: "/assets/icons/sad_emoji.png",
    mood_id: "sad-emoji",
    mood: "sad",
  },
  {
    moodImg: "/assets/icons/unhappy_emoji.png",
    mood_id: "unhappy-emoji",
    mood: "unhappy",
  },
  {
    moodImg: "/assets/icons/neutral_emoji.png",
    mood_id: "neutral-emoji",
    mood: "neutral",
  },
  {
    moodImg: "/assets/icons/smiling_emoji.png",
    mood: "smiling",
    mood_id: "smiling-emoji",
  },
  {
    moodImg: "/assets/icons/laughing_emoji.png",
    mood_id: "laughing-emoji",
    mood: "laughing",
  },
];

export const manageAccountTabs = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  {
    id: "study-progress",
    label: "Study Progress",
  },
  // {
  //   id: "subject-overview",
  //   label: "Subject Overview",
  // },
  // {
  //   id: "your-mentor",
  //   label: "Your Mentor",
  // },
];

export const subscriptionPlanningBenefits = [
  {
    label: "goal setting & tracking",
  },
  {
    label: "schedule builder",
  },
  {
    label: "to-do list & reminders",
  },
  {
    label: "subject, chapter & topic tracking",
  },
];

export const subscriptionExpertBenefits = [
  {
    label: "connect with a mentor",
  },
  {
    label: "live & on-demand workshops",
  },
];
export const subscriptionLearningBenefits = [
  {
    label: "growth meter",
  },
  {
    label: "points & levels",
  },
  {
    label: "know your mistakes",
  },
];

export const planFeatures = [
  {
    title: "Personalised revision planner",
    subtitle: "A dynamic planner that adapts to your efficiency levels.",
  },
  {
    title: "Syllabus tracking",
    subtitle:
      "Track your revision count and efficiency for every chapter and topic.",
  },
  {
    title: "Growth meter",
    subtitle:
      "See how much you’ve improved with daily, weekly, and monthly progress insights.",
  },
  {
    title: "Daily quizzes",
    subtitle: "Revise everyday topics by solving questions.",
  },
  {
    title: "Weekly revision quizzes",
    subtitle: "Review the entire week with weekend quizzes.",
  },
  {
    title: "Error book",
    subtitle: "See all your wrong questions and mistakes at one place",
  },
  {
    title: "{mentor} as Personal mentor",
    subtitle: "Get guide from {mentor} who understand your journey.",
  },
  {
    title: "Active monitoring by {mentor}",
    subtitle: "Regular progress checks by your mentor.",
  },
  {
    title: "Weekly Sessions",
    subtitle: "Study tips and exam insights shared directly by {mentor}",
  },
  {
    title: "On demand sessions",
    subtitle: "{mentor} just a message away.",
  },
];

export const subscriptionTabs = [
  {
    id: "pro",
    label: "Pro",
    features: [
      "Personalised revision planner",
      "Syllabus tracking",
      "Growth meter",
      "Daily quizzes",
      "Weekly revision quizzes",
      "Error book",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    features: [
      "Personalised revision planner",
      "Syllabus tracking",
      "Growth meter",
      "Daily quizzes",
      "Weekly revision quizzes",
      "Error book",
      "{mentor} as Personal mentor",
      "Active monitoring by {mentor}",
      "Weekly Sessions",
      "On demand sessions",
    ],
  },
];

export const mentorWordMap = {
  jee: "IITian",
  neet: "GMCian",
};

export interface EfficiencyOption {
  min?: number;
  max?: number;
  label: string;
  progressBarColor: string;
  textColor: string;
}
export const SUBJECT_COLORS = {
  Maths: "bg-[#107FFC30]",
  Chemistry: "bg-[#72EFDD4A]",
  Physics: "bg-[#A36AF53D]",
};

export const chatPageTabs = [
  // {
  //   title: "chat",
  //   id: "chat",
  //   desktopView: true,
  // },
  {
    title: "meetings",
    id: "meetings",
    desktopView: true,
  },
  {
    title: "request meeting",
    id: "requestMeeting",
    desktopView: false,
  },
];

export const meetingTabs = [
  {
    id: "upcoming",
    label: "upcoming",
  },
  {
    id: "done",
    label: "done",
  },
];

export const referralTerms = [
  "Only applicable on 6 months and full plan.",
  "You receive 10% of each subscription purchased with your referral code.",
  "Your friend gets a 20% discount when they use your code.",
  "Referral rewards are credited after your friend’s payment is confirmed.",
];
