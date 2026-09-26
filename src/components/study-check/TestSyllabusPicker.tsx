"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Loader2, X } from "lucide-react";
import { getChapters } from "@/actions/question_actions";
import { capitalizeSubject } from "@/lib/study-check/content";
import { TestSyllabusPick } from "@/lib/study-check/types";
import { cn } from "@/lib/utils";

type ChapterRow = {
  _id: string;
  name: string;
  standard: number;
};

type Subject = { name: string };

export const formatSyllabusPicks = (picks: TestSyllabusPick[]) => {
  if (!picks.length) return "";
  const bySubject = new Map<string, string[]>();
  for (const pick of picks) {
    const subject = pick.subject?.name || "";
    const list = bySubject.get(subject) || [];
    if (pick.chapter?.name && !list.includes(pick.chapter.name)) {
      list.push(pick.chapter.name);
    }
    bySubject.set(subject, list);
  }
  return [...bySubject.entries()]
    .map(
      ([subject, chapters]) =>
        `${capitalizeSubject(subject)}: ${chapters.join(", ")}`
    )
    .join("; ");
};

const toPick = (
  subject: string,
  chapter: ChapterRow,
  fallbackStandard: number
): TestSyllabusPick => ({
  chapter: { id: chapter._id, name: chapter.name },
  subject: { name: subject.toLowerCase() },
  standard: chapter.standard || fallbackStandard,
});

const TestSyllabusPicker = ({
  open,
  onClose,
  standard,
  subjects,
  picks,
  onChangePicks,
}: {
  open: boolean;
  onClose: () => void;
  standard: number;
  subjects: Subject[];
  picks: TestSyllabusPick[];
  onChangePicks: (picks: TestSyllabusPick[]) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeSubject, setActiveSubject] = useState(subjects[0]?.name ?? "");
  const [chapters, setChapters] = useState<ChapterRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !activeSubject || !standard) return;
    let cancelled = false;
    setLoading(true);
    getChapters(activeSubject, standard)
      .then((data) => {
        if (cancelled) return;
        setChapters(
          (data?.chapters ?? []).map((chapter: ChapterRow) => ({
            _id: String(chapter._id),
            name: chapter.name,
            standard: Number(chapter.standard),
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setChapters([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeSubject, open, standard]);

  const grouped = useMemo(() => {
    const class11 = chapters.filter((chapter) => chapter.standard === 11);
    const class12 = chapters.filter((chapter) => chapter.standard === 12);
    const other = chapters.filter(
      (chapter) => chapter.standard !== 11 && chapter.standard !== 12
    );
    return { class11, class12, other };
  }, [chapters]);

  const selectedKeys = useMemo(
    () => new Set(picks.map((pick) => pick.chapter?.id).filter(Boolean)),
    [picks]
  );

  const toggleChapter = (chapter: ChapterRow) => {
    if (selectedKeys.has(chapter._id)) {
      onChangePicks(picks.filter((pick) => pick.chapter?.id !== chapter._id));
      return;
    }
    onChangePicks([...picks, toPick(activeSubject, chapter, standard)]);
  };

  const selectedForSubject = picks.filter(
    (pick) => pick.subject?.name?.toLowerCase() === activeSubject.toLowerCase()
  ).length;

  if (!open || !mounted) return null;

  const renderGroup = (title: string, list: ChapterRow[]) => {
    if (!list.length) return null;
    return (
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          {title}
        </p>
        {list.map((chapter) => {
          const selected = selectedKeys.has(chapter._id);
          return (
            <button
              key={chapter._id}
              type="button"
              onClick={() => toggleChapter(chapter)}
              className="mb-2 flex w-full items-center rounded-2xl px-4 py-3 text-left"
              style={{
                borderWidth: selected ? 2 : 1,
                borderStyle: "solid",
                borderColor: selected ? "#8B5CF6" : "#E5E7EB",
                backgroundColor: selected ? "#F5F3FF" : "#FFFFFF",
              }}
            >
              <span
                className={cn(
                  "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                  selected ? "bg-[#8B5CF6]" : "border border-[#C4B5FD] bg-white"
                )}
              >
                {selected ? <Check className="h-3 w-3 text-white" /> : null}
              </span>
              <span className="flex-1 font-semibold text-dark-primary">{chapter.name}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close syllabus picker"
        onClick={onClose}
      />
      <div className="relative flex max-h-[min(700px,92dvh)] w-full max-w-lg flex-col rounded-t-[28px] bg-white px-5 pb-5 pt-3 shadow-2xl sm:rounded-[28px]">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-tab-item-gray" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-dark-primary">Select chapters</h2>
          <p className="mb-4 mt-1 text-sm font-medium text-tab-item-gray">
            Choose chapters for each subject, then tap Done.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {subjects.map((subject) => (
              <button
                key={subject.name}
                type="button"
                onClick={() => setActiveSubject(subject.name)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold capitalize",
                  activeSubject === subject.name
                    ? "bg-primary text-white"
                    : "bg-[#F5F3FF] text-dark-primary"
                )}
              >
                {capitalizeSubject(subject.name)}
              </button>
            ))}
          </div>
          {selectedForSubject ? (
            <p className="mt-3 text-xs font-medium text-primary">
              {selectedForSubject} chapter{selectedForSubject === 1 ? "" : "s"} selected in{" "}
              {capitalizeSubject(activeSubject)}
            </p>
          ) : null}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {renderGroup("Class 11", grouped.class11)}
              {renderGroup("Class 12", grouped.class12)}
              {renderGroup("Chapters", grouped.other)}
              {!chapters.length ? (
                <p className="mt-6 text-center text-sm text-secondary-text">
                  No chapters found for {capitalizeSubject(activeSubject)}.
                </p>
              ) : null}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 h-11 w-full shrink-0 rounded-full bg-leadlly text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  );
};

export default TestSyllabusPicker;
