"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, BookOpen, ChevronRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getStudyCheck, saveUpcomingTests } from "@/actions/study_check_actions";
import TestDateField from "@/components/study-check/TestDateField";
import TestSyllabusPicker, {
  formatSyllabusPicks,
} from "@/components/study-check/TestSyllabusPicker";
import { makeId, TEST_TYPE_OPTIONS } from "@/lib/study-check/content";
import {
  CoachingTest,
  TestSyllabusChapter,
  TestType,
} from "@/lib/study-check/types";
import { subjectsForExam } from "@/lib/subjects";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { cn } from "@/lib/utils";

type Draft = {
  id: string | null;
  name: string;
  date: string | null;
  type: TestType;
  picks: TestSyllabusChapter[];
  keptSyllabus: string;
  keptChapters: TestSyllabusChapter[];
  picksDirty: boolean;
};

const emptyDraft = (): Draft => ({
  id: null,
  name: "",
  date: null,
  type: "periodic",
  picks: [],
  keptSyllabus: "",
  keptChapters: [],
  picksDirty: false,
});

const isObjectId = (value: string) => /^[a-fA-F0-9]{24}$/.test(value);

const asChapters = (value: unknown): TestSyllabusChapter[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as {
      chapter?: { id?: unknown; name?: unknown } | string;
      chapterId?: unknown;
      subject?: { name?: unknown } | string;
      standard?: unknown;
    };
    const id = String(
      row.chapter && typeof row.chapter === "object" ? row.chapter.id : row.chapterId || ""
    ).trim();
    const name = String(
      row.chapter && typeof row.chapter === "object"
        ? row.chapter.name
        : typeof row.chapter === "string"
          ? row.chapter
          : ""
    ).trim();
    if (!name && !isObjectId(id)) return [];
    const subjectName = String(
      row.subject && typeof row.subject === "object"
        ? row.subject.name
        : typeof row.subject === "string"
          ? row.subject
          : ""
    )
      .trim()
      .toLowerCase();
    return [
      {
        chapter: { id, name },
        subject: { name: subjectName },
        standard: Number(row.standard) || 0,
      },
    ];
  });
};

const normalizeTest = (value: unknown): CoachingTest | null => {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<CoachingTest>;
  const name = String(row.name || "").trim();
  const date = String(row.date || "").trim();
  if (!name || !date) return null;
  return {
    id: String(row.id || "").trim() || makeId(),
    name,
    date,
    type: (TEST_TYPE_OPTIONS.some((item) => item.value === row.type)
      ? row.type
      : "periodic") as TestType,
    syllabus: String(row.syllabus || "").trim(),
    chapters: asChapters(row.chapters),
  };
};

const testKey = (test: CoachingTest) => test.id || `${test.date}:${test.name.toLowerCase()}`;

const mergeTests = (primary: CoachingTest[], secondary: CoachingTest[]) => {
  const map = new Map<string, CoachingTest>();
  for (const test of secondary) map.set(testKey(test), test);
  for (const test of primary) {
    const key = testKey(test);
    const existing = map.get(key);
    if (!existing) {
      map.set(key, test);
      continue;
    }
    map.set(key, {
      ...existing,
      ...test,
      syllabus: test.syllabus || existing.syllabus,
      chapters: test.chapters.length ? test.chapters : existing.chapters,
    });
  }
  return [...map.values()].sort(
    (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime()
  );
};

const UpcomingTestsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const subjects = subjectsForExam(user?.academic?.subjects, user?.academic?.competitiveExam);
  const [tests, setTests] = useState<CoachingTest[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syllabusOpen, setSyllabusOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getStudyCheck()
      .then((doc) => {
        if (cancelled) return;
        const fromCheck = (doc?.studyCheck?.answers?.tests || [])
          .map(normalizeTest)
          .filter((item): item is CoachingTest => Boolean(item));
        const fromUser = (user?.academic?.tests || [])
          .map(normalizeTest)
          .filter((item): item is CoachingTest => Boolean(item));
        setTests(mergeTests(fromCheck, fromUser));
      })
      .catch(() => {
        if (cancelled) return;
        const fromUser = (user?.academic?.tests || [])
          .map(normalizeTest)
          .filter((item): item is CoachingTest => Boolean(item));
        setTests(fromUser);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?._id]);

  const syllabusLabel = draft.picksDirty
    ? formatSyllabusPicks(draft.picks)
    : formatSyllabusPicks(draft.picks) || draft.keptSyllabus;
  const editing = Boolean(draft.id);

  const persist = async (nextTests: CoachingTest[], success: string) => {
    setSaving(true);
    try {
      const saved = await saveUpcomingTests(nextTests);
      if (!saved.success) {
        toast.error(saved.message);
        return false;
      }
      const list = (saved.tests || nextTests)
        .map(normalizeTest)
        .filter((item): item is CoachingTest => Boolean(item));
      setTests(list);
      if (user) {
        dispatch(
          userData({
            ...user,
            academic: {
              ...user.academic,
              tests: list,
            },
          })
        );
      }
      toast.success(success);
      return true;
    } finally {
      setSaving(false);
    }
  };

  const submit = async () => {
    const name = draft.name.trim();
    if (!name || !draft.date) {
      toast.error("Add a test name and date.");
      return;
    }
    const syllabus = draft.type === "full" && !syllabusLabel ? "Full syllabus" : syllabusLabel;
    if (!syllabus) {
      toast.error("Select the syllabus for this test.");
      return;
    }
    const nextTest: CoachingTest = {
      id: draft.id || makeId(),
      name,
      date: draft.date,
      type: draft.type,
      syllabus,
      chapters: draft.picksDirty ? draft.picks : draft.keptChapters,
    };
    const nextTests = draft.id
      ? tests.map((test) => (test.id === draft.id ? nextTest : test))
      : [...tests, nextTest];
    const saved = await persist(nextTests, editing ? "Test updated." : "Test added.");
    if (saved) setDraft(emptyDraft());
  };

  const sorted = useMemo(
    () =>
      [...tests].sort(
        (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime()
      ),
    [tests]
  );

  return (
    <div className="custom__scrollbar flex w-full flex-col gap-4 py-4 md:h-full md:overflow-y-auto md:pr-2">
      <Link
        href="/profile"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFEAF8] bg-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-dark-primary">
          {editing ? "Edit test" : "Add your upcoming test"}
        </h1>
        <p className="mt-2 text-sm text-secondary-text">
          Type the test name, then choose the date and syllabus. You can edit it anytime.
        </p>
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">Test name</span>
        <input
          value={draft.name}
          onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
          placeholder="e.g. Physics + Chemistry"
          className="mt-2 h-14 w-full rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 text-base font-semibold text-dark-primary outline-none"
        />
      </label>

      <TestDateField
        className="mt-1"
        value={draft.date}
        onChange={(date) => setDraft((current) => ({ ...current, date }))}
      />

      <button
        type="button"
        onClick={() => {
          if (!user?.academic?.standard) {
            toast.error("Add your class before selecting a syllabus.");
            return;
          }
          setSyllabusOpen(true);
        }}
        className="flex items-center rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 py-4 text-left"
      >
        <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
            Syllabus
          </span>
          <span className="mt-0.5 block text-base font-bold text-dark-primary">
            {draft.picks.length
              ? `${draft.picks.length} chapter${draft.picks.length === 1 ? "" : "s"} selected`
              : "Tap to choose chapters"}
          </span>
          {syllabusLabel ? (
            <span className="mt-0.5 block truncate text-xs font-medium text-secondary-text">
              {syllabusLabel}
            </span>
          ) : null}
        </span>
        <ChevronRight className="h-[18px] w-[18px] text-primary" />
      </button>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Test type</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TEST_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setDraft((current) => ({ ...current, type: option.value as TestType }))
              }
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold",
                draft.type === option.value ? "bg-primary text-white" : "bg-[#F7F2FE] text-dark-primary"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={saving || !draft.name.trim() || !draft.date}
        onClick={submit}
        className="h-12 rounded-full bg-primary text-sm font-semibold text-white disabled:opacity-50"
      >
        {saving ? "Saving…" : editing ? "Update test" : "Add test"}
      </button>

      <div className="mt-2 flex flex-col gap-3">
        {!ready ? (
          <p className="text-sm text-secondary-text">Loading your tests…</p>
        ) : sorted.length === 0 ? (
          <p className="text-sm text-secondary-text">No upcoming tests yet.</p>
        ) : (
          sorted.map((test) => (
            <div
              key={test.id}
              className="flex items-start justify-between gap-3 rounded-[20px] border border-[#EFEAF8] bg-white px-4 py-4"
            >
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    id: test.id,
                    name: test.name,
                    date: test.date,
                    type: test.type,
                    picks: test.chapters || [],
                    keptSyllabus: test.syllabus,
                    keptChapters: test.chapters || [],
                    picksDirty: false,
                  })
                }
                className="min-w-0 flex-1 text-left"
              >
                <p className="font-semibold text-dark-primary">{test.name}</p>
                <p className="mt-1 text-sm text-secondary-text">
                  {format(new Date(test.date), "d MMMM yyyy")} ·{" "}
                  {TEST_TYPE_OPTIONS.find((item) => item.value === test.type)?.label || "Test"}
                </p>
                {test.syllabus ? (
                  <p className="mt-1 line-clamp-2 text-sm text-secondary-text">{test.syllabus}</p>
                ) : null}
              </button>
              <button
                type="button"
                aria-label="Remove test"
                onClick={() =>
                  persist(
                    tests.filter((item) => item.id !== test.id),
                    "Test removed."
                  )
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F2FE] text-secondary-text"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <TestSyllabusPicker
        open={syllabusOpen}
        onClose={() => setSyllabusOpen(false)}
        standard={user?.academic?.standard || 12}
        subjects={subjects}
        picks={draft.picks}
        onChangePicks={(picks) =>
          setDraft((current) => ({
            ...current,
            picks,
            picksDirty: true,
          }))
        }
      />
    </div>
  );
};

export default UpcomingTestsPage;
