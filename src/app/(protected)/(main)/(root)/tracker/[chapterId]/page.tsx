"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TTrackerProps } from "@/helpers/types";

const accuracyColor = (value: number) => {
  if (value <= 40) return { bar: "#ff2e2e", track: "#FFF5F4" };
  if (value < 80) return { bar: "#ff9900", track: "#FDF6E6" };
  return { bar: "#0fd679", track: "#EDFBF0" };
};

const dayKey = (date?: Date | string) => {
  if (!date) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  return value.toISOString().slice(0, 10);
};

const ChapterDetail = () => {
  const router = useRouter();
  const [item, setItem] = useState<TTrackerProps | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("leadlly_tracker_chapter");
    if (!raw) return;
    try {
      setItem(JSON.parse(raw));
    } catch {
      setItem(null);
    }
  }, []);

  if (!item) {
    return (
      <div className="py-10 text-center text-sm text-secondary-text">
        Open a chapter from the tracker to see its report.
      </div>
    );
  }

  const efficiency = item.chapter.overall_efficiency || 0;
  const progress = item.chapter.overall_progress || 0;
  const tone = accuracyColor(efficiency);

  return (
    <div className="mx-auto w-full max-w-3xl pb-16">
      <div className="mb-4 flex items-center gap-3">
        <button type="button" onClick={() => router.back()} aria-label="Back">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-2xl font-semibold capitalize">{item.chapter.name}</h1>
      </div>

      <div className="rounded-2xl border border-[#F7F2FE] p-4">
        <p className="mb-4 text-base text-secondary-text">
          <span className="text-3xl font-semibold text-black">
            {item.chapter.total_questions_solved?.number ?? 0}
          </span>{" "}
          questions solved
        </p>
        <p className="text-base font-medium">Revision Completion</p>
        <div className="mb-4 mt-1 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#EDE5F9]">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <span className="text-lg font-semibold">{Math.round(progress)}%</span>
        </div>
        <p className="text-base font-medium">Revision Accuracy</p>
        <div className="mt-1 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: tone.track }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(efficiency, 100)}%`, backgroundColor: tone.bar }} />
          </div>
          <span className="text-lg font-semibold">{Math.round(efficiency)}%</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#F7F2FE]">
        <div className="grid grid-cols-[1fr_90px_90px] bg-primary/10 px-3 py-3 text-sm font-medium">
          <span>Topics</span>
          <span className="text-center">Revisions</span>
          <span className="text-center">Accuracy</span>
        </div>
        {(item.topics || []).map((topic) => {
          const dates = new Map<string, { date?: Date | string; efficiency?: number }>();
          (topic.studiedAt || []).forEach((entry) => {
            if (!entry?.date || (entry.efficiency ?? 0) <= 0) return;
            const key = dayKey(entry.date);
            const current = dates.get(key);
            if (!current || (entry.efficiency ?? 0) >= (current.efficiency ?? 0)) {
              dates.set(key, entry);
            }
          });
          const revisions = [...dates.entries()].sort(([a], [b]) => a.localeCompare(b));
          return (
            <div key={topic.name} className="border-t border-[#F7F2FE] px-3 py-3">
              <div className="grid grid-cols-[1fr_90px_90px] items-start text-lg font-medium">
                <span>{topic.name}</span>
                <span className="text-center">{revisions.length}</span>
                <span className="text-center">{Math.round(topic.overall_efficiency || 0)}%</span>
              </div>
              {revisions.length ? (
                <div className="mt-2">
                  <p className="text-sm text-secondary-text">Revision Date</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {revisions.map(([key, entry]) => (
                      <span key={key} className="rounded-md bg-[#ff2e2e]/10 px-2 py-1 text-sm text-[#ff2e2e]">
                        {entry.date
                          ? new Date(entry.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : key}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterDetail;
