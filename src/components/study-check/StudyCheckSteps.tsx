"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Aperture, Layers, RefreshCw, Target, Zap } from "lucide-react";
import { toast } from "sonner";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
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

export const PhoneStep = () => {
  const { answers, patch, next, busy, setBusy } = useStudyCheck();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const valid = isValidPhone(answers.phone);

  const saveAndNext = async () => {
    if (!valid || !user) return;
    setBusy(true);
    try {
      const saveResponse = await studentPersonalInfo({
        phone: Number(answers.phone),
      });
      dispatch(
        userData({
          ...user,
          ...(saveResponse.user || {}),
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
        error instanceof Error ? error.message : "Could not save your phone number."
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
      <input
        value={draft.name}
        onChange={(event) =>
          patch({ draftTest: { ...draft, name: event.target.value } })
        }
        placeholder="Test name, e.g. Physics + Chemistry"
        className="mt-5 w-full rounded-[18px] bg-[#F7F2FE] px-4 py-3 font-medium text-dark-primary outline-none"
      />
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
        className="mt-3 w-full rounded-[18px] bg-[#F7F2FE] px-4 py-3 font-medium text-dark-primary outline-none"
      />
      <button
        type="button"
        onClick={() => setSyllabusOpen(true)}
        className={cn(
          "mt-3 w-full rounded-[18px] bg-[#F7F2FE] px-4 py-3 text-left font-medium",
          syllabusLabel ? "text-dark-primary" : "text-tab-item-gray"
        )}
      >
        {syllabusLabel || "Select syllabus"}
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
      <div className="mt-3 flex flex-wrap gap-2">
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
