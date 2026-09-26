"use client";

import { useRouter } from "next/navigation";
import { ISubject, TTrackerProps } from "@/helpers/types";
import SubjectOverview from "./SubjectOverview";

const accuracyColor = (value: number) => {
  if (value <= 40) return { bar: "#ff2e2e", track: "#FFF5F4" };
  if (value < 80) return { bar: "#ff9900", track: "#FDF6E6" };
  return { bar: "#0fd679", track: "#EDFBF0" };
};

const ProgressRow = ({
  label,
  value,
  color,
  track,
}: {
  label: string;
  value: number;
  color: string;
  track: string;
}) => (
  <div className="mb-4">
    <p className="text-base font-medium">{label}</p>
    <div className="mt-1 flex items-center gap-3">
      <div className="h-3 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: track }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-lg font-semibold">{Math.round(value)}%</span>
    </div>
  </div>
);

const TrackerComponent = ({
  trackerData,
  activeSubject,
  userSubjects,
}: {
  trackerData: TTrackerProps[];
  userSubjects: ISubject[] | undefined;
  activeSubject: string;
}) => {
  const router = useRouter();
  const subject = userSubjects?.find((item) => item.name === activeSubject);

  const openChapter = (item: TTrackerProps) => {
    sessionStorage.setItem("leadlly_tracker_chapter", JSON.stringify(item));
    router.push(`/tracker/${item._id}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <SubjectOverview subject={subject} />
      <h2 className="text-2xl font-semibold text-dark-primary">Chapters Report</h2>
      {trackerData?.length ? (
        trackerData.map((item) => {
          const efficiency = item.chapter.overall_efficiency || 0;
          const progress = item.chapter.overall_progress || 0;
          const tone = accuracyColor(efficiency);
          return (
            <button
              key={item._id}
              type="button"
              onClick={() => openChapter(item)}
              className="rounded-2xl border border-[#F7F2FE] p-4 text-left"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <p className="text-xl font-semibold capitalize text-dark-primary">
                  {item.chapter.name}
                </p>
                <span className="shrink-0 text-sm font-semibold text-primary">Full Report</span>
              </div>
              <p className="mb-3 text-base text-secondary-text">
                <span className="text-2xl font-semibold text-black">
                  {item.chapter.total_questions_solved?.number ?? 0}
                </span>{" "}
                questions solved
              </p>
              <ProgressRow
                label="Revision Completion"
                value={progress}
                color="#8B5CF6"
                track="#EDE5F9"
              />
              <ProgressRow
                label="Revision Accuracy"
                value={efficiency}
                color={tone.bar}
                track={tone.track}
              />
            </button>
          );
        })
      ) : (
        <p className="py-8 text-center text-base font-semibold text-tab-item-gray">
          No chapter to track!
        </p>
      )}
    </div>
  );
};

export default TrackerComponent;
