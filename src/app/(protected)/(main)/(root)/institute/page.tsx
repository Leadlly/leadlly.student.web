"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  getBatchAnnouncements,
  getBatchClasses,
  getClassNotes,
  getClassReport,
  getClassWork,
  getInstituteBatches,
  getStudentBatches,
  joinInstitute,
  requestBatch,
} from "@/actions/institute_actions";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";

type Row = Record<string, any>;

const tabs = ["My Study", "Batches", "Class"] as const;

const InstituteHub = () => {
  const institute = useAppSelector((state) => state.institute.institute);
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number]>("My Study");
  const [studentBatches, setStudentBatches] = useState<Row[]>([]);
  const [instituteBatches, setInstituteBatches] = useState<Row[]>([]);
  const [batchId, setBatchId] = useState<string | null>(null);
  const [classes, setClasses] = useState<Row[]>([]);
  const [announcements, setAnnouncements] = useState<Row[]>([]);
  const [classId, setClassId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Row[]>([]);
  const [work, setWork] = useState<Row[]>([]);
  const [report, setReport] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!institute?._id) return;
    getStudentBatches()
      .then((data) => setStudentBatches(data.data ?? []))
      .catch(() => setStudentBatches([]));
    getInstituteBatches()
      .then((data) => setInstituteBatches(data.data ?? []))
      .catch(() => setInstituteBatches([]));
  }, [institute?._id]);

  const openBatch = async (id: string) => {
    setBatchId(id);
    setTab("Class");
    setClassId(null);
    const [classData, announcementData] = await Promise.all([
      getBatchClasses(id).catch(() => ({ data: [] })),
      getBatchAnnouncements(id).catch(() => ({ data: [] })),
    ]);
    setClasses(classData.data ?? []);
    setAnnouncements(announcementData.data ?? []);
  };

  const openClass = async (id: string) => {
    setClassId(id);
    const [noteData, workData, reportData] = await Promise.all([
      getClassNotes(id).catch(() => ({ data: [] })),
      getClassWork(id).catch(() => ({ data: [] })),
      getClassReport(id).catch(() => ({ data: null })),
    ]);
    setNotes(noteData.data ?? []);
    setWork(workData.data ?? []);
    setReport(reportData.data ?? null);
  };

  const join = async () => {
    if (!code.trim()) return;
    setBusy(true);
    try {
      await joinInstitute(code.trim());
      toast.success("Institute request sent. Reload to see your institute.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not join.");
    } finally {
      setBusy(false);
    }
  };

  if (!institute?._id) {
    return (
      <div className="mx-auto max-w-lg py-8">
        <h1 className="text-3xl font-bold text-dark-primary">Join your institute</h1>
        <p className="mt-2 text-sm text-secondary-text">
          Enter the code from your coaching to see batches, classes, notes, and tests.
        </p>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Institute code"
          className="mt-5 w-full rounded-2xl bg-[#F7F2FE] px-4 py-3 outline-none"
        />
        <button
          type="button"
          disabled={busy}
          onClick={join}
          className="mt-4 h-12 w-full rounded-full bg-leadlly font-semibold text-white disabled:opacity-50"
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Institute</p>
        <h1 className="text-2xl font-bold text-dark-primary sm:text-4xl">{institute.name}</h1>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              tab === item ? "bg-primary text-white" : "bg-[#F5F3FF] text-dark-primary"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "My Study" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {studentBatches.length ? (
            studentBatches.map((batch) => (
              <button
                key={String(batch._id)}
                type="button"
                onClick={() => openBatch(String(batch._id))}
                className="rounded-3xl border border-[#EDE9FE] p-4 text-left"
              >
                <p className="font-semibold text-dark-primary">{batch.name || "Batch"}</p>
                <p className="text-sm text-secondary-text">{batch.standard || batch.status || ""}</p>
              </button>
            ))
          ) : (
            <p className="text-sm text-secondary-text">No enrolled batches yet.</p>
          )}
        </div>
      ) : null}

      {tab === "Batches" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {instituteBatches.map((batch) => (
            <div key={String(batch._id)} className="rounded-3xl border border-[#EDE9FE] p-4">
              <p className="font-semibold text-dark-primary">{batch.name || "Batch"}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => openBatch(String(batch._id))}
                  className="rounded-full bg-[#F5F3FF] px-3 py-2 text-sm font-semibold text-primary"
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await requestBatch(String(batch._id));
                      toast.success("Batch request sent.");
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Could not request batch.");
                    }
                  }}
                  className="rounded-full bg-leadlly px-3 py-2 text-sm font-semibold text-white"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
          {!instituteBatches.length ? (
            <p className="text-sm text-secondary-text">No batches published yet.</p>
          ) : null}
        </div>
      ) : null}

      {tab === "Class" ? (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-dark-primary">Classes</p>
            {classes.map((item) => (
              <button
                key={String(item._id)}
                type="button"
                onClick={() => openClass(String(item._id))}
                className={cn(
                  "block w-full rounded-2xl border px-3 py-3 text-left text-sm",
                  classId === item._id ? "border-primary bg-[#F5F3FF]" : "border-[#EDE9FE]"
                )}
              >
                <span className="font-semibold capitalize">{item.subject || "Class"}</span>
                <span className="mt-1 block text-xs text-secondary-text">
                  {item.teacher?.firstname || item.description || ""}
                </span>
              </button>
            ))}
            {!classes.length ? (
              <p className="text-sm text-secondary-text">
                Open a batch from My Study to see its classes.
              </p>
            ) : null}
            {announcements.length ? (
              <div className="pt-3">
                <p className="text-sm font-semibold">Announcements</p>
                {announcements.map((item) => (
                  <p key={String(item._id)} className="mt-2 text-sm text-secondary-text">
                    {item.title || item.message || item.body}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="space-y-4">
            {report ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Attendance", report.attendance?.percentage],
                  ["Lectures", report.totalLectures],
                  ["Hours", report.totalDuration],
                  ["Syllabus", report.syllabusCompleted],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-2xl bg-[#F5F3FF] p-3">
                    <p className="text-xs text-secondary-text">{label}</p>
                    <p className="text-xl font-bold text-dark-primary">{value ?? "-"}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <ResourceList title="Notes" items={notes} />
            <ResourceList title="Assignments" items={work} />
            {classId ? (
              <Link href="/quizzes" className="text-sm font-semibold text-primary">
                Open quizzes
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ResourceList = ({ title, items }: { title: string; items: Row[] }) => (
  <section>
    <h2 className="font-semibold text-dark-primary">{title}</h2>
    <div className="mt-2 space-y-2">
      {items.length ? (
        items.map((item) => (
          <a
            key={String(item._id)}
            href={item.url || item.file?.url || "#"}
            className="block rounded-2xl border border-[#EDE9FE] px-3 py-2 text-sm"
          >
            {item.title || item.name || title}
          </a>
        ))
      ) : (
        <p className="text-sm text-secondary-text">Nothing here yet.</p>
      )}
    </div>
  </section>
);

export default InstituteHub;
