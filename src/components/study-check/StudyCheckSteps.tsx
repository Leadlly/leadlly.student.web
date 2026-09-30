"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Aperture,
  BookOpen,
  Calendar,
  ChevronRight,
  Layers,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { createPlanner } from "@/actions/planner_actions";
import { completeStudyCheck, getStudyDnaProfile } from "@/actions/study_check_actions";
import { studentPersonalInfo } from "@/actions/user_actions";
import {
  BEHAVIOR_QUESTIONS,
  BOARD_OPTIONS,
  COACHING_OPTIONS,
  EXAM_OPTIONS,
  PROBLEM_OPTIONS,
  SELF_STUDY_OPTIONS,
  STAGE_OPTIONS,
  TEST_TYPE_OPTIONS,
  behaviorStopCard,
  behaviorStopToValue,
  behaviorValueToStop,
  formatClock,
  hoursBetweenClocks,
  isValidPhone,
  makeId,
  sleepWindowLabel,
} from "@/lib/study-check/content";
import {
  AcademicStage,
  BoardOption,
  CoachingAttendance,
  ExamOption,
  SelfStudyBand,
  StepId,
  TestType,
} from "@/lib/study-check/types";
import { subjectsForExam } from "@/lib/subjects";
import { StudyDnaProfile } from "@/lib/study-check/dna";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import StudyDnaReport from "./StudyDnaReport";
import { cn } from "@/lib/utils";
import { useStudyCheck } from "./context";
import {
  GhostButton,
  NextButton,
  OptionCard,
  ScreenTitle,
  StepLayout,
} from "./chrome";
import ChapterTagger from "./ChapterTagger";
import ClockTimeField from "./ClockTimeField";
import SpectrumSlider from "./SpectrumSlider";
import TestSyllabusPicker, { formatSyllabusPicks } from "./TestSyllabusPicker";

const BEHAVIOR_ICONS = {
  target: Target,
  zap: Zap,
  "refresh-cw": RefreshCw,
  aperture: Aperture,
  layers: Layers,
};

const SLOT_PRESETS = [
  { label: "Morning", start: "06:30", end: "08:00" },
  { label: "Afternoon", start: "15:00", end: "17:00" },
  { label: "Night", start: "21:00", end: "23:00" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const displayName = (first?: string | null, last?: string | null) =>
  [first, last]
    .filter(Boolean)
    .join(" ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const PhoneStep = () => {
  const { answers, patch, next, busy, setBusy } = useStudyCheck();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(displayName(user?.firstname, user?.lastname));
  const [gender, setGender] = useState(String(user?.about?.gender || "").toLowerCase());
  const phoneValid = isValidPhone(answers.phone);
  const nameValid = name.trim().length > 0;
  const genderValid = GENDER_OPTIONS.some((item) => item.value === gender);
  const valid = phoneValid && nameValid && genderValid;

  const saveAndNext = async () => {
    if (!valid || !user) return;
    const parts = name.trim().replace(/\s+/g, " ").split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    setBusy(true);
    try {
      const saveResponse = await studentPersonalInfo({
        phone: Number(answers.phone),
        firstName,
        lastName,
        gender,
      });
      dispatch(
        userData({
          ...user,
          ...(saveResponse.user || {}),
          firstname: saveResponse.user?.firstname || firstName,
          lastname: saveResponse.user?.lastname || lastName,
          about: {
            ...(user.about || { gender }),
            ...(saveResponse.user?.about || {}),
            gender,
          },
          phone: {
            ...(user.phone || {}),
            ...(saveResponse.user?.phone || {}),
            personal: Number(answers.phone),
          },
        })
      );
      next();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save your details."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <StepLayout
      footer={<NextButton disabled={!valid} loading={busy} onClick={saveAndNext} />}
    >
      <ScreenTitle>What&apos;s your phone number?</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">
        We&apos;ll use this to keep your account and study plan in sync.
      </p>
      <div className="mt-6 flex h-14 items-center rounded-[20px] border-2 border-[#EDE9FE] bg-[#F7F2FE] px-4">
        <span className="mr-3 font-semibold text-dark-primary">+91</span>
        <input
          inputMode="numeric"
          value={answers.phone || ""}
          onChange={(event) =>
            patch({ phone: event.target.value.replace(/[^\d]/g, "").slice(0, 10) })
          }
          placeholder="10-digit mobile number"
          className="h-full w-full bg-transparent text-base font-medium text-dark-primary outline-none"
        />
      </div>
      <p className="mt-6 text-base font-semibold text-dark-primary">Your name</p>
      <p className="mt-1 text-[13px] text-secondary-text">
        Filled from your Google account. Edit it if it isn&apos;t right.
      </p>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        className="mt-3 h-14 w-full rounded-[20px] border-2 border-[#EDE9FE] bg-[#F7F2FE] px-4 text-base font-medium text-dark-primary outline-none"
      />
      <p className="mt-6 text-base font-semibold text-dark-primary">Gender</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {GENDER_OPTIONS.map((item) => {
          const selected = gender === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setGender(item.value)}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-semibold",
                selected ? "bg-primary text-white" : "bg-[#F7F2FE] text-dark-primary"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
};

export const ExamStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Which exam are you preparing for?</ScreenTitle>
      <div className="mt-6">
        {EXAM_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.exams[0] === item.value}
            onClick={() => patchAndNext({ exams: [item.value as ExamOption] })}
          />
        ))}
      </div>
    </StepLayout>
  );
};

export const StageStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Which class are you in?</ScreenTitle>
      <div className="mt-6">
        {STAGE_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.academicStage === item.value}
            onClick={() =>
              patchAndNext({ academicStage: item.value as AcademicStage })
            }
          />
        ))}
      </div>
    </StepLayout>
  );
};

export const BoardStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Which board are you in?</ScreenTitle>
      <div className="mt-6">
        {BOARD_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.board === item.value}
            onClick={() => patchAndNext({ board: item.value as BoardOption })}
          />
        ))}
      </div>
    </StepLayout>
  );
};

export const CoachingStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Do you attend coaching classes?</ScreenTitle>
      <div className="mt-6">
        {COACHING_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.coachingAttendance === item.value}
            onClick={() =>
              patchAndNext({
                coachingAttendance: item.value as CoachingAttendance,
                ...(item.value === "no"
                  ? {
                      classStartTime: null,
                      classEndTime: null,
                      coachingHours: 0,
                    }
                  : {}),
              })
            }
          />
        ))}
      </div>
    </StepLayout>
  );
};

export const CoachingWhenStep = () => {
  const { answers, patch, next } = useStudyCheck();
  const ready =
    !!answers.classStartTime &&
    !!answers.classEndTime &&
    hoursBetweenClocks(answers.classStartTime, answers.classEndTime) > 0;

  const update = (start: string | null, end: string | null) => {
    patch({
      classStartTime: start,
      classEndTime: end,
      coachingHours: hoursBetweenClocks(start, end),
    });
  };

  return (
    <StepLayout footer={<NextButton disabled={!ready} onClick={next} />}>
      <ScreenTitle>When are your classes?</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">
        {answers.coachingHours
          ? `${answers.coachingHours} hours of class`
          : "Pick a start and end time."}
      </p>
      <div className="mt-2 grid gap-1 sm:grid-cols-2 sm:gap-3">
        <ClockTimeField
          label="Starts"
          value={answers.classStartTime}
          fallbackHour={8}
          onConfirm={(start) => update(start, answers.classEndTime)}
        />
        <ClockTimeField
          label="Ends"
          value={answers.classEndTime}
          fallbackHour={14}
          onConfirm={(end) => update(answers.classStartTime, end)}
        />
      </div>
    </StepLayout>
  );
};

export const WakeStep = () => {
  const { answers, patch, next } = useStudyCheck();
  return (
    <StepLayout footer={<NextButton disabled={!answers.wakeTime} onClick={next} />}>
      <ScreenTitle>What time do you usually wake up?</ScreenTitle>
      <ClockTimeField
        label="Wake-up time"
        value={answers.wakeTime}
        fallbackHour={6}
        onConfirm={(wakeTime) => patch({ wakeTime })}
      />
    </StepLayout>
  );
};

export const SleepStep = () => {
  const { answers, patch, next } = useStudyCheck();
  const windowLabel = sleepWindowLabel(answers.sleepTime, answers.wakeTime);
  return (
    <StepLayout footer={<NextButton disabled={!answers.sleepTime} onClick={next} />}>
      <ScreenTitle>What time do you usually sleep?</ScreenTitle>
      <ClockTimeField
        label="Sleep time"
        value={answers.sleepTime}
        fallbackHour={23}
        onConfirm={(sleepTime) => patch({ sleepTime })}
      />
      {windowLabel ? (
        <div className="mt-4 rounded-[20px] bg-[#F5F3FF] px-4 py-3 text-[13px] font-medium text-dark-primary">
          Your usual sleep window: {windowLabel}
        </div>
      ) : null}
    </StepLayout>
  );
};

export const SelfStudyStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>How long do you self-study on a normal day?</ScreenTitle>
      <div className="mt-6">
        {SELF_STUDY_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.selfStudyBand === item.value}
            onClick={() =>
              patchAndNext({ selfStudyBand: item.value as SelfStudyBand })
            }
          />
        ))}
      </div>
    </StepLayout>
  );
};

export const StudySlotsStep = () => {
  const { answers, patch, next } = useStudyCheck();
  const toggle = (label: string, start: string, end: string) => {
    const exists = answers.studySlots.find((slot) => slot.label === label);
    patch({
      studySlots: exists
        ? answers.studySlots.filter((slot) => slot.label !== label)
        : [...answers.studySlots, { id: makeId(), label, start, end }],
    });
  };

  return (
    <StepLayout footer={<NextButton label="Continue" onClick={next} />}>
      <ScreenTitle>When can you study?</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">
        Pick the windows that usually work. You can change these later.
      </p>
      <div className="mt-6 space-y-3">
        {SLOT_PRESETS.map((slot) => {
          const selected = answers.studySlots.some((item) => item.label === slot.label);
          return (
            <button
              key={slot.label}
              type="button"
              onClick={() => toggle(slot.label, slot.start, slot.end)}
              className={cn(
                "flex w-full items-center justify-between rounded-[20px] border-2 px-4 py-4 text-left",
                selected ? "border-primary bg-[#F5F3FF]" : "border-[#EDE9FE]"
              )}
            >
              <span>
                <span className="block font-semibold text-dark-primary">
                  {slot.label}
                </span>
                <span className="text-sm text-secondary-text">
                  {formatClock(slot.start)} – {formatClock(slot.end)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
};

const BEHAVIOR_KEYS = [
  "decideHow",
  "missedPlan",
  "afterTopic",
  "wrongQuestion",
  "backlog",
] as const;

export const BehaviorStep = ({ stepId }: { stepId: StepId }) => {
  const { answers, patch, next } = useStudyCheck();
  const key = BEHAVIOR_KEYS.includes(stepId as (typeof BEHAVIOR_KEYS)[number])
    ? (stepId as (typeof BEHAVIOR_KEYS)[number])
    : null;
  const question = key ? BEHAVIOR_QUESTIONS[key] : null;
  const current = key ? answers[key] : null;
  const [stop, setStop] = useState(() =>
    question ? behaviorValueToStop(current, question.options) : 0
  );

  useEffect(() => {
    if (!question) return;
    setStop(behaviorValueToStop(current, question.options));
  }, [current, key, question]);

  if (!key || !question) return null;

  const card = behaviorStopCard(stop, question.options);
  const selectedPoint = stop % 2 === 0 ? stop / 2 : -1;
  const Icon = BEHAVIOR_ICONS[question.icon];

  return (
    <StepLayout
      footer={
        <NextButton
          onClick={() => {
            patch({
              [key]: behaviorStopToValue(stop, question.options),
            });
            next();
          }}
        />
      }
    >
      <div className="inline-flex items-center rounded-full bg-[#F5F3FF] px-3 py-1.5">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="ml-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          {question.tag}
        </span>
      </div>
      <div className="mt-4">
        <ScreenTitle>{question.question}</ScreenTitle>
      </div>
      <p className="mt-3 text-[15px] text-secondary-text">
        Drag to where it feels most like you.
      </p>
      <SpectrumSlider stop={stop} onChange={setStop} />
      <div className="mt-4 flex">
        {question.options.map((option, index) => {
          const active = selectedPoint === index;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setStop(index * 2)}
              className={cn(
                "flex-1 px-0.5 text-center text-xs leading-4",
                active ? "font-bold text-dark-primary" : "text-secondary-text"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div
        key={`${card.title}-${stop}`}
        className="mt-8 animate-in fade-in slide-in-from-bottom-1 duration-300 rounded-[28px] bg-[#F5F3FF] px-5 py-5"
      >
        <p className="text-lg font-bold text-dark-primary">{card.title}</p>
        <p className="mt-2 text-[15px] leading-6 text-secondary-text">{card.quote}</p>
      </div>
      <p className="mt-4 text-center text-[13px] text-tab-item-gray">
        You can also place it between two points.
      </p>
    </StepLayout>
  );
};

export const SyllabusStep = () => {
  const { answers, patch, next } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Where does each chapter stand?</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">
        Mark what you have finished, what needs revision, and what has not started.
      </p>
      <div className="mt-4">
        <ChapterTagger
          chapters={answers.chapters}
          onChaptersChange={(chapters, coverage) => patch({ chapters, coverage })}
          onComplete={next}
          completeLabel="Continue"
        />
      </div>
    </StepLayout>
  );
};

export const HasTestsStep = () => {
  const { answers, patchAndNext } = useStudyCheck();
  return (
    <StepLayout>
      <ScreenTitle>Do you have upcoming tests?</ScreenTitle>
      <div className="mt-6">
        <OptionCard
          label="Yes"
          selected={answers.hasPeriodicTests === true}
          onClick={() => patchAndNext({ hasPeriodicTests: true })}
        />
        <OptionCard
          label="No"
          selected={answers.hasPeriodicTests === false}
          onClick={() =>
            patchAndNext({
              hasPeriodicTests: false,
              tests: [],
            })
          }
        />
      </div>
    </StepLayout>
  );
};

export const TestsListStep = () => {
  const { answers, patch, next } = useStudyCheck();
  const user = useAppSelector((state) => state.user.user);
  const draft = answers.draftTest;
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const syllabusLabel = formatSyllabusPicks(draft.syllabusPicks ?? []);

  const commit = () => {
    if (!draft.name.trim() || !draft.date) return false;
    patch({
      tests: [
        ...answers.tests,
        {
          id: makeId(),
          name: draft.name.trim(),
          date: draft.date,
          type: draft.type,
          syllabus: syllabusLabel,
          chapters: draft.syllabusPicks ?? [],
        },
      ],
      draftTest: {
        name: "",
        date: null,
        type: "periodic",
        syllabusPicks: [],
      },
    });
    return true;
  };

  return (
    <StepLayout
      footer={
        <>
          <NextButton
            label="Continue"
            onClick={() => {
              if (draft.name.trim() && draft.date) commit();
              next();
            }}
          />
          <GhostButton label="Skip tests for now" onClick={next} />
        </>
      }
    >
      <ScreenTitle>Add your upcoming tests</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">
        Type the test name, then tap the date and syllabus to choose them.
      </p>
      <p className="mb-1.5 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
        Test name
      </p>
      <input
        value={draft.name}
        onChange={(event) =>
          patch({ draftTest: { ...draft, name: event.target.value } })
        }
        placeholder="e.g. Physics + Chemistry"
        className="w-full rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 py-4 font-semibold text-dark-primary outline-none"
      />
      <label className="relative mt-3 flex cursor-pointer items-center rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 py-4">
        <span className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
          <Calendar className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 pr-2">
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
            Test date
          </span>
          <span
            className={cn(
              "mt-0.5 block text-base font-bold",
              draft.date ? "text-dark-primary" : "text-tab-item-gray"
            )}
          >
            {draft.date ? format(new Date(draft.date), "d MMMM yyyy") : "Tap to pick a date"}
          </span>
        </span>
        <ChevronRight className="h-[18px] w-[18px] shrink-0 text-primary" />
        <input
          type="date"
          value={draft.date ? draft.date.slice(0, 10) : ""}
          onChange={(event) =>
            patch({
              draftTest: {
                ...draft,
                date: event.target.value
                  ? new Date(event.target.value).toISOString()
                  : null,
              },
            })
          }
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          if (!user?.academic?.standard) {
            toast.error("Add your class before selecting a syllabus.");
            return;
          }
          setSyllabusOpen(true);
        }}
        className="mt-3 flex w-full items-center rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 py-4 text-left"
      >
        <span className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 pr-2">
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
            Syllabus
          </span>
          <span
            className={cn(
              "mt-0.5 block text-base font-bold",
              (draft.syllabusPicks ?? []).length
                ? "text-dark-primary"
                : "text-tab-item-gray"
            )}
          >
            {(draft.syllabusPicks ?? []).length
              ? `${(draft.syllabusPicks ?? []).length} chapter${
                  (draft.syllabusPicks ?? []).length === 1 ? "" : "s"
                } selected`
              : "Tap to choose chapters"}
          </span>
          {syllabusLabel ? (
            <span className="mt-0.5 block truncate text-xs font-medium text-secondary-text">
              {syllabusLabel}
            </span>
          ) : null}
        </span>
        <ChevronRight className="h-[18px] w-[18px] shrink-0 text-primary" />
      </button>
      {user?.academic?.standard ? (
        <TestSyllabusPicker
          open={syllabusOpen}
          onClose={() => setSyllabusOpen(false)}
          standard={user.academic.standard}
          subjects={subjectsForExam(
            user.academic.subjects,
            user.academic.competitiveExam
          )}
          picks={draft.syllabusPicks ?? []}
          onChangePicks={(syllabusPicks) =>
            patch({ draftTest: { ...draft, syllabusPicks } })
          }
        />
      ) : null}
      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
        Test type
      </p>
      <div className="flex flex-wrap gap-2">
        {TEST_TYPE_OPTIONS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() =>
              patch({
                draftTest: { ...draft, type: item.value as TestType },
              })
            }
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium",
              draft.type === item.value
                ? "bg-primary text-white"
                : "bg-[#F7F2FE] text-dark-primary"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={commit}
        disabled={!draft.name.trim() || !draft.date}
        className="mt-4 h-11 w-full rounded-full border border-primary font-semibold text-primary disabled:opacity-40"
      >
        Add test
      </button>
      {answers.tests.map((test) => (
        <div
          key={test.id}
          className="mt-3 flex items-start justify-between rounded-[18px] border border-[#EDE9FE] px-4 py-3"
        >
          <div>
            <p className="font-semibold text-dark-primary">{test.name}</p>
            <p className="text-sm text-secondary-text">
              {format(new Date(test.date), "d MMMM")}
              {test.syllabus ? ` · ${test.syllabus}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              patch({ tests: answers.tests.filter((item) => item.id !== test.id) })
            }
            className="text-sm text-tab-item-gray"
          >
            Remove
          </button>
        </div>
      ))}
    </StepLayout>
  );
};

export const ProfileStep = () => {
  const { answers, back, busy, setBusy } = useStudyCheck();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const finishingRef = useRef(false);
  const [stepsCompleted, setStepsCompleted] = useState(false);
  const [completeError, setCompleteError] = useState("");
  const [profile, setProfile] = useState<StudyDnaProfile | null>(null);
  const [profileError, setProfileError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileAttempt, setProfileAttempt] = useState(0);

  const finishSteps = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setCompleteError("");
    try {
      await completeStudyCheck({
        stepId: "profile",
        answers,
      });
      setStepsCompleted(true);
    } catch (error) {
      finishingRef.current = false;
      setCompleteError(
        error instanceof Error
          ? error.message
          : "Could not complete your Study Check. Please try again."
      );
    }
  };

  useEffect(() => {
    finishSteps();
    // Complete the check once, then show Study DNA before the plan is built.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!stepsCompleted) return;
    let cancelled = false;
    setLoadingProfile(true);
    setProfileError("");
    getStudyDnaProfile()
      .then((response) => {
        if (!cancelled) setProfile(response.profile);
      })
      .catch((error) => {
        if (!cancelled) {
          setProfileError(
            error instanceof Error ? error.message : "Could not load your Study DNA."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingProfile(false);
      });
    return () => {
      cancelled = true;
    };
  }, [profileAttempt, stepsCompleted]);

  const buildPlan = async () => {
    if (!user) return;
    setBusy(true);
    try {
      if (!user.planner) {
        const planner = await createPlanner();
        if (!planner.success) {
          toast.error(planner.message);
          return;
        }
      }
      dispatch(userData({ ...user, onboard: true, planner: true }));
      router.replace("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not build your plan. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  if (!stepsCompleted || loadingProfile) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white px-8 text-center">
        {completeError ? (
          <>
            <p className="font-semibold text-dark-primary">{completeError}</p>
            <button
              type="button"
              onClick={finishSteps}
              className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </>
        ) : (
          <p className="text-sm font-medium text-secondary-text">
            {stepsCompleted ? "Building your Study DNA…" : "Saving your Study Check…"}
          </p>
        )}
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white px-8 text-center">
        <p className="font-semibold text-dark-primary">
          {profileError || "Could not load your Study DNA."}
        </p>
        <button
          type="button"
          onClick={() => setProfileAttempt((attempt) => attempt + 1)}
          className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <StudyDnaReport
      profile={profile}
      onExit={back}
      onFinish={buildPlan}
      finishing={busy}
    />
  );
};

export const ProblemsStep = () => {
  const { answers, patch, next } = useStudyCheck();
  const toggle = (value: string) => {
    const selected = answers.biggestProblems.includes(value);
    const biggestProblems = selected
      ? answers.biggestProblems.filter((item) => item !== value)
      : [...answers.biggestProblems, value].slice(0, 3);
    patch({ biggestProblems });
  };

  return (
    <StepLayout
      footer={
        <NextButton
          disabled={answers.biggestProblems.length === 0}
          onClick={next}
        />
      }
    >
      <ScreenTitle>What gets in the way most?</ScreenTitle>
      <p className="mt-2 text-sm text-secondary-text">Pick up to three.</p>
      <div className="mt-6">
        {PROBLEM_OPTIONS.map((item) => (
          <OptionCard
            key={item.value}
            label={item.label}
            selected={answers.biggestProblems.includes(item.value)}
            onClick={() => toggle(item.value)}
          />
        ))}
      </div>
    </StepLayout>
  );
};
