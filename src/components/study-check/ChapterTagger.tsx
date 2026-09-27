"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { allocateBackTopics, createPlanner } from "@/actions/planner_actions";
import { getChapters } from "@/actions/question_actions";
import { saveTaggedChapters } from "@/actions/studyData_actions";
import {
  CHAPTER_STATUS_OPTIONS,
  capitalizeSubject,
  computeCoverage,
} from "@/lib/study-check/content";
import {
  ChapterStatus,
  LearningCoverage,
  TaggedChapter,
} from "@/lib/study-check/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { cn } from "@/lib/utils";
import { NextButton } from "./chrome";

type ChapterRow = {
  _id: string;
  name: string;
  subjectName: string;
  standard: number;
};

type ChapterTaggerProps = {
  chapters: Record<string, TaggedChapter>;
  onChaptersChange: (
    chapters: Record<string, TaggedChapter>,
    coverage: LearningCoverage
  ) => void;
  onComplete: () => void | Promise<void>;
  completeLabel?: string;
};

const ChapterTagger = ({
  chapters,
  onChaptersChange,
  onComplete,
  completeLabel = "Continue",
}: ChapterTaggerProps) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const subjects = user?.academic?.subjects ?? [];
  const standard = user?.academic?.standard;
  const [activeSubject, setActiveSubject] = useState(subjects[0]?.name);
  const [lists, setLists] = useState<Record<string, ChapterRow[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!activeSubject && subjects[0]?.name) {
      setActiveSubject(subjects[0].name);
    }
  }, [activeSubject, subjects]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!standard || !subjects.length) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const next: Record<string, ChapterRow[]> = {};
      await Promise.all(
        subjects.map(async (subject) => {
          try {
            const data = await getChapters(subject.name, standard);
            next[subject.name] = (data?.chapters ?? [])
              .filter((chapter: ChapterRow) => {
                if (!chapter.subjectName) return true;
                return chapter.subjectName.toLowerCase() === subject.name.toLowerCase();
              })
              .map((chapter: ChapterRow) => ({
              ...chapter,
              _id: String(chapter._id),
              subjectName: chapter.subjectName || subject.name,
            }));
          } catch {
            next[subject.name] = [];
          }
        })
      );
      if (!cancelled) {
        setLists(next);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [standard, subjects.map((subject) => subject.name).join("|")]);

  const allChapters = useMemo(
    () => Object.values(lists).flat(),
    [lists]
  );

  const currentSubject = activeSubject || subjects[0]?.name;
  const currentIndex = Math.max(
    0,
    subjects.findIndex((subject) => subject.name === currentSubject)
  );
  const currentList = lists[currentSubject] ?? [];

  const grouped = useMemo(() => {
    const class11 = currentList.filter((chapter) => Number(chapter.standard) === 11);
    const class12 = currentList.filter((chapter) => Number(chapter.standard) === 12);
    const other = currentList.filter((chapter) => {
      const value = Number(chapter.standard);
      return value !== 11 && value !== 12;
    });
    return { class11, class12, other };
  }, [currentList]);

  const setStatus = (chapter: ChapterRow, status: ChapterStatus) => {
    const nextChapters: Record<string, TaggedChapter> = {
      ...chapters,
      [chapter._id]: {
        status,
        name: chapter.name,
        subject: chapter.subjectName,
        standard: chapter.standard,
      },
    };
    onChaptersChange(nextChapters, computeCoverage(allChapters, nextChapters));
    setExpandedId(null);
  };

  const persistAndSync = async (tagged: Record<string, TaggedChapter> = chapters) => {
    if (!user || !currentSubject) return;
    const selected = currentList
      .filter((chapter) => tagged[chapter._id])
      .map((chapter) => ({
        chapterId: chapter._id,
        status: tagged[chapter._id].status,
        standard: chapter.standard,
      }));
    if (!selected.length) return;
    await saveTaggedChapters({
      tag: "unrevised_topic",
      subject: currentSubject,
      standard: user.academic.standard,
      chapters: selected,
    });
    if (!user.planner) {
      await createPlanner();
      dispatch(userData({ ...user, planner: true }));
    } else {
      await allocateBackTopics();
    }
  };

  const handleNext = async () => {
    onChaptersChange(chapters, computeCoverage(allChapters, chapters));
    setBusy(true);
    try {
      await persistAndSync();
      if (currentIndex < subjects.length - 1) {
        setActiveSubject(subjects[currentIndex + 1].name);
        setExpandedId(null);
        return;
      }
      await onComplete();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save your syllabus."
      );
    } finally {
      setBusy(false);
    }
  };

  const switchSubject = async (subjectName: string) => {
    if (busy || subjectName === currentSubject) return;
    setBusy(true);
    try {
      onChaptersChange(chapters, computeCoverage(allChapters, chapters));
      await persistAndSync();
      setActiveSubject(subjectName);
      setExpandedId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save your syllabus."
      );
    } finally {
      setBusy(false);
    }
  };

  const renderGroup = (title: string, list: ChapterRow[]) => {
    if (!list.length) return null;
    return (
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          {title}
        </p>
        {list.map((chapter) => {
          const status = chapters[chapter._id]?.status ?? "not_started";
          const meta = CHAPTER_STATUS_OPTIONS.find((item) => item.value === status);
          const open = expandedId === chapter._id;
          return (
            <div
              key={chapter._id}
              className="mb-3 rounded-[18px] border border-[#F3EEFF] bg-white"
            >
              <button
                type="button"
                onClick={() => setExpandedId(open ? null : chapter._id)}
                className="flex w-full items-center px-4 py-3 text-left"
              >
                <span className="min-w-0 flex-1 pr-3">
                  <span className="block text-sm font-semibold text-dark-primary">
                    {chapter.name}
                  </span>
                  <span
                    className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: meta?.bg, color: meta?.color }}
                  >
                    {meta?.label}
                  </span>
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 text-tab-item-gray", open && "rotate-180")}
                />
              </button>
              {open ? (
                <div className="space-y-2 px-3 pb-3">
                  {CHAPTER_STATUS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setStatus(chapter, option.value)}
                      className="w-full rounded-2xl px-3 py-2 text-left"
                      style={{ backgroundColor: option.bg }}
                    >
                      <span
                        className="block text-sm font-semibold"
                        style={{ color: option.color }}
                      >
                        {option.label}
                      </span>
                      <span className="block text-xs text-secondary-text">
                        {option.hint}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  if (!standard || !subjects.length) {
    return (
      <p className="text-sm text-secondary-text">
        Save your class and exam first, then you can mark chapters.
      </p>
    );
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            type="button"
            disabled={busy}
            onClick={() => switchSubject(subject.name)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold capitalize disabled:opacity-60",
              currentSubject === subject.name
                ? "bg-primary text-white"
                : "bg-[#F5F3FF] text-dark-primary"
            )}
          >
            {capitalizeSubject(subject.name)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {renderGroup("Class 11", grouped.class11)}
          {renderGroup("Class 12", grouped.class12)}
          {renderGroup("Other", grouped.other)}
          {!currentList.length ? (
            <p className="py-8 text-center text-sm text-secondary-text">
              No chapters found for this subject.
            </p>
          ) : null}
        </>
      )}

      <div className="sticky bottom-0 mt-4 bg-white pt-2">
        <NextButton
          label={
            currentIndex < subjects.length - 1
              ? `Save & next subject`
              : completeLabel
          }
          loading={busy}
          disabled={loading}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default ChapterTagger;
