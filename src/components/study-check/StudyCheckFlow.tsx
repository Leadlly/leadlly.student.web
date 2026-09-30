"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getStudyCheck,
  saveStudyCheck,
} from "@/actions/study_check_actions";
import { getFreeTrialActive } from "@/actions/subscription_actions";
import { studentPersonalInfo } from "@/actions/user_actions";
import {
  buildStepSequence,
  canAdvance,
  classWindowLabel,
  defaultStudyCheckAnswers,
  getPartFills,
  getPartMeta,
  mapCoachingType,
  mapExamsToCompetitiveExam,
  mapStageToClass,
  normalizeExams,
} from "@/lib/study-check/content";
import { StepId, StudyCheckAnswers } from "@/lib/study-check/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { StudyCheckContext } from "./context";
import { NextButton, OnboardingHeader, ScreenTitle } from "./chrome";
import {
  BehaviorStep,
  BoardStep,
  CoachingStep,
  CoachingWhenStep,
  ExamStep,
  HasTestsStep,
  PhoneStep,
  ProblemsStep,
  ProfileStep,
  SelfStudyStep,
  SleepStep,
  StageStep,
  StudySlotsStep,
  SyllabusStep,
  TestsListStep,
  WakeStep,
} from "./StudyCheckSteps";

const OpeningStep = ({ onStart }: { onStart: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center bg-white px-6 text-center">
    <Image
      src="/assets/images/leadlly_logo.svg"
      alt="Leadlly"
      width={150}
      height={50}
      priority
    />
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
      Leadlly Study Check
    </p>
    <h1 className="mt-4 max-w-md text-3xl font-bold leading-tight text-dark-primary sm:text-5xl">
      Let&apos;s understand your study life.
    </h1>
    <p className="mt-4 max-w-md text-base text-secondary-text">
      A few honest answers, then your Study DNA and a plan that fits how you
      actually study.
    </p>
    <div className="mt-8 w-full max-w-sm">
      <NextButton label="Begin" onClick={onStart} />
    </div>
  </div>
);

const StudyCheckFlow = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [answers, setAnswers] = useState<StudyCheckAnswers>(defaultStudyCheckAnswers);
  const [stepId, setStepId] = useState<StepId>("opening");
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const academicSavedRef = useRef(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answersRef = useRef(answers);
  const skipPersistRef = useRef(true);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const sequence = useMemo(() => buildStepSequence(answers), [answers]);
  const { label: partLabel } = getPartMeta(stepId);
  const partFills = useMemo(
    () => getPartFills(stepId, sequence),
    [sequence, stepId]
  );

  useEffect(() => {
    const restore = async () => {
      try {
        const saved = await getStudyCheck();
        const existingPhone = user?.phone?.personal
          ? String(user.phone.personal)
          : null;
        const savedGender = String(user?.about?.gender || "").toLowerCase();
        const hasIdentity =
          Boolean(existingPhone) &&
          Boolean(user?.firstname?.trim()) &&
          ["male", "female", "other"].includes(savedGender);
        if (saved?.studyCheck?.answers) {
          const restored = saved.studyCheck.answers;
          setAnswers({
            ...defaultStudyCheckAnswers(),
            ...restored,
            exams: normalizeExams(restored.exams),
            draftTest: {
              ...defaultStudyCheckAnswers().draftTest,
              ...restored.draftTest,
              syllabusPicks: restored.draftTest?.syllabusPicks ?? [],
            },
            phone: existingPhone,
          });
        } else if (existingPhone) {
          setAnswers({ ...defaultStudyCheckAnswers(), phone: existingPhone });
        }
        if (saved?.studyCheck?.stepId && saved.studyCheck.stepId !== "opening") {
          const restoredStep =
            saved.studyCheck.stepId === ("coachingHours" as StepId)
              ? "coachingWhen"
              : saved.studyCheck.stepId;
          setStepId(!hasIdentity ? "phone" : restoredStep);
        }
      } catch {
        // A new student simply starts at the opening screen.
      } finally {
        setHydrated(true);
      }
    };
    restore();
  }, [user?.phone?.personal]);

  const persist = useCallback((nextAnswers: StudyCheckAnswers, nextStep: StepId) => {
    if (nextStep === "opening") return;
    const { chapters: _chapters, phone: _phone, ...rest } = nextAnswers;
    saveStudyCheck({
      answers: { ...rest, exams: normalizeExams(rest.exams) },
      stepId: nextStep,
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!hydrated || stepId === "opening") return;
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }
    const timer = setTimeout(() => persist(answersRef.current, stepId), 700);
    return () => clearTimeout(timer);
  }, [answers, hydrated, persist, stepId]);

  const patch = useCallback((partial: Partial<StudyCheckAnswers>) => {
    if (
      partial.exams ||
      partial.academicStage ||
      partial.board ||
      partial.coachingAttendance ||
      partial.classStartTime ||
      partial.classEndTime
    ) {
      academicSavedRef.current = false;
    }
    const nextAnswers = { ...answersRef.current, ...partial };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    return nextAnswers;
  }, []);

  const ensureAcademic = useCallback(async () => {
    const current = answersRef.current;
    if (!user || academicSavedRef.current) return;
    if (!current.exams.length || !current.academicStage) return;

    setBusy(true);
    try {
      const saveResponse = await studentPersonalInfo({
        class: mapStageToClass(current.academicStage),
        competitiveExam: mapExamsToCompetitiveExam(current.exams),
        coachingType: mapCoachingType(current.coachingAttendance),
        studentSchedule: classWindowLabel(current.classStartTime, current.classEndTime),
        board: current.board ?? undefined,
        phone: current.phone ? Number(current.phone) : undefined,
      });

      let trialUser = saveResponse.user;
      try {
        const trialResponse = await getFreeTrialActive();
        trialUser = trialResponse.user ?? trialUser;
      } catch {
        // Trial may already be active.
      }

      dispatch(
        userData({
          ...user,
          ...saveResponse.user,
          ...trialUser,
          academic: {
            ...(user.academic || {}),
            ...(saveResponse.user?.academic || {}),
            ...(trialUser?.academic || {}),
            subjects:
              (trialUser?.academic?.subjects?.length ?? 0) > 0
                ? trialUser?.academic?.subjects
                : saveResponse.user?.academic?.subjects || user.academic?.subjects,
          },
        })
      );
      academicSavedRef.current = true;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not save your academic details."
      );
      throw error;
    } finally {
      setBusy(false);
    }
  }, [dispatch, user]);

  const goTo = useCallback(
    async (direction: 1 | -1) => {
      const currentAnswers = answersRef.current;
      const currentSequence = buildStepSequence(currentAnswers);
      const currentIndex = currentSequence.indexOf(stepId);
      if (currentIndex < 0) {
        setStepId(currentSequence[0] ?? "opening");
        return;
      }
      if (direction === 1 && !canAdvance(stepId, currentAnswers)) return;
      const nextIndex = Math.min(
        currentSequence.length - 1,
        Math.max(0, currentIndex + direction)
      );
      const nextStep = currentSequence[nextIndex] ?? stepId;

      if (
        direction === 1 &&
        (nextStep === "coaching" || nextStep === "wake" || nextStep === "syllabus")
      ) {
        try {
          await ensureAcademic();
        } catch {
          return;
        }
      }

      setStepId(nextStep);
      persist(currentAnswers, nextStep);
    },
    [ensureAcademic, persist, stepId]
  );

  const next = useCallback(() => {
    goTo(1);
  }, [goTo]);

  const patchAndNext = useCallback(
    (partial: Partial<StudyCheckAnswers>) => {
      patch(partial);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        advanceTimerRef.current = null;
        goTo(1);
      }, 120);
    },
    [goTo, patch]
  );

  const back = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (busy) return;
    goTo(-1);
  }, [busy, goTo]);

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const body = (() => {
    switch (stepId) {
      case "opening":
        return <OpeningStep onStart={next} />;
      case "phone":
        return <PhoneStep />;
      case "exam":
        return <ExamStep />;
      case "stage":
        return <StageStep />;
      case "board":
        return <BoardStep />;
      case "coaching":
        return <CoachingStep />;
      case "coachingWhen":
        return <CoachingWhenStep />;
      case "wake":
        return <WakeStep />;
      case "sleep":
        return <SleepStep />;
      case "selfStudy":
        return <SelfStudyStep />;
      case "studySlots":
        return <StudySlotsStep />;
      case "decideHow":
      case "missedPlan":
      case "afterTopic":
      case "reviseHow":
      case "wrongQuestion":
      case "backlog":
        return <BehaviorStep key={stepId} stepId={stepId} />;
      case "syllabus":
        return <SyllabusStep />;
      case "hasTests":
        return <HasTestsStep />;
      case "testsList":
        return <TestsListStep />;
      case "problems":
        return <ProblemsStep />;
      case "profile":
        return <ProfileStep />;
      default:
        return <ScreenTitle>Study Check</ScreenTitle>;
    }
  })();

  return (
    <StudyCheckContext.Provider
      value={{ answers, patch, patchAndNext, next, back, stepId, busy, setBusy }}
    >
      <div className="relative h-full bg-white">
        {stepId === "opening" || stepId === "profile" ? (
          body
        ) : (
          <div className="flex h-full flex-col">
            <OnboardingHeader title={partLabel} onBack={back} fills={partFills} />
            <div className="min-h-0 flex-1">{body}</div>
          </div>
        )}
        {busy ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : null}
      </div>
    </StudyCheckContext.Provider>
  );
};

export default StudyCheckFlow;
