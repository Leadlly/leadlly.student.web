"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Moon,
  Pencil,
  RefreshCw,
  Target,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyDnaProfile, StudyDnaSubject } from "@/lib/study-check/dna";
import { cn } from "@/lib/utils";

const PASTEL = {
  purple: "#A78BFA",
  purpleSoft: "#EDE9FE",
  purpleWash: "#F7F5FB",
  mint: "#86EFAC",
  mintSoft: "#D1FAE5",
  yellow: "#FDE68A",
  yellowSoft: "#FEF3C7",
  orange: "#FDBA74",
  orangeSoft: "#FFEDD5",
  blue: "#93C5FD",
  blueSoft: "#DBEAFE",
  rose: "#FDA4AF",
  roseSoft: "#FFE4E6",
  track: "#EEEAF8",
};

const HERO = {
  ink: "#141118",
  purple: "#7C5CFC",
  lavender: "#EFE9FF",
  yellow: "#FFD84A",
  yellowSoft: "#FDF3C8",
  peach: "#FFD9B8",
  peachText: "#C2410C",
  mint: "#4ADE80",
  amber: "#FBA94C",
};

const PREP_ROWS = [
  { key: "covered", label: "Covered", color: PASTEL.purple },
  { key: "strongly_completed", label: "Strong", color: PASTEL.mint },
  { key: "completed_needs_revision", label: "Needs revision", color: PASTEL.yellow },
  { key: "completed_backlog", label: "Backlog", color: PASTEL.orange },
  { key: "ongoing", label: "Ongoing", color: PASTEL.blue },
  { key: "not_started", label: "Not covered", color: PASTEL.track },
] as const;

const splitHours = (label: string) => {
  if (!label || label === "-" || label === "—") return { value: label || "-", unit: "" };
  const match = label.match(/^([\d.]+)\s+(.*)$/);
  if (!match) return { value: label, unit: "" };
  return { value: match[1], unit: match[2] };
};

const Donut = ({
  slices,
  size,
  label,
  caption,
  inner = "#F7F5FB",
}: {
  slices: Array<{ value: number; color: string }>;
  size: number;
  label: string;
  caption?: string;
  inner?: string;
}) => {
  const total = slices.reduce((sum, slice) => sum + Math.max(slice.value, 0), 0) || 1;
  let cursor = 0;
  const stops = slices
    .filter((slice) => slice.value > 0)
    .map((slice) => {
      const start = (cursor / total) * 100;
      cursor += slice.value;
      return `${slice.color} ${start}% ${(cursor / total) * 100}%`;
    });
  const gradient = stops.length ? stops.join(", ") : `${PASTEL.track} 0% 100%`;
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size, background: `conic-gradient(${gradient})` }}
    >
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-center"
        style={{
          inset: size * 0.22,
          background: inner,
        }}
      >
        <span className="text-sm font-bold leading-none text-[#141118]">{label}</span>
        {caption ? (
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-secondary-text">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
};

const Eyebrow = ({ children, color = PASTEL.purple }: { children: string; color?: string }) => (
  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
    {children}
  </p>
);

const StudyDnaReport = ({
  profile,
  onExit,
  onFinish,
  finishLabel = "Start My Leadlly Plan",
  finishing = false,
}: {
  profile: StudyDnaProfile;
  onExit?: () => void;
  onFinish?: () => void;
  finishLabel?: string;
  finishing?: boolean;
}) => {
  const pages = ["hero", "week", "prep", "signals", "strengths", "routine", "tests", "close"] as const;
  const [page, setPage] = useState(0);
  const last = page === pages.length - 1;
  const hero = pages[page] === "hero";

  return (
    <div className={cn("flex h-full min-h-0 flex-col", hero ? "bg-[#FAADD4]" : "bg-white")}>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => (page > 0 ? setPage(page - 1) : onExit?.())}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-[#141118]" />
        </button>
        <div className="flex gap-1.5">
          {pages.map((id, index) => (
            <span
              key={id}
              className={cn(
                "h-1.5 rounded-full",
                index === page ? "w-5 bg-[#7C5CFC]" : "w-1.5 bg-[#DDD6FE]"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => !last && setPage(page + 1)}
          disabled={last}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 disabled:opacity-30"
          aria-label="Next"
        >
          <ArrowRight className="h-5 w-5 text-[#141118]" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className={cn("mx-auto w-full", hero ? "max-w-xl" : "max-w-lg px-6 pb-8")}>
          {pages[page] === "hero" ? <Hero profile={profile} /> : null}
          {pages[page] === "week" ? <Week profile={profile} /> : null}
          {pages[page] === "prep" ? <Prep profile={profile} /> : null}
          {pages[page] === "signals" ? <Signals profile={profile} /> : null}
          {pages[page] === "strengths" ? <Strengths profile={profile} /> : null}
          {pages[page] === "routine" ? <Routine profile={profile} /> : null}
          {pages[page] === "tests" ? <Tests profile={profile} /> : null}
          {pages[page] === "close" ? <Close profile={profile} /> : null}
        </div>
      </div>

      <div className="border-t border-[#EDE9FE] bg-white px-6 py-4">
        {last && onFinish ? (
          <button
            type="button"
            disabled={finishing}
            onClick={onFinish}
            className="mx-auto block h-12 w-full max-w-lg rounded-full bg-leadlly text-base font-semibold text-white disabled:opacity-50"
          >
            {finishing ? "Building your plan" : finishLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            className="mx-auto flex h-12 w-full max-w-lg items-center justify-center gap-2 rounded-full bg-leadlly text-base font-semibold text-white"
          >
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const Hero = ({ profile }: { profile: StudyDnaProfile }) => {
  const { hero } = profile;
  const progress = hero.chapterProgress;
  const tones: Record<string, { bg: string; color: string }> = {
    tagged: { bg: "#EFE7FF", color: HERO.purple },
    locked: { bg: "#D9F7E6", color: "#15803D" },
    revision: { bg: "#FFE7D6", color: "#EA580C" },
  };
  return (
    <div
      className="min-h-full bg-cover bg-center px-4 pb-10"
      style={{ backgroundImage: "url(/assets/images/onboarding/study-dna-hero-bg.png)", backgroundColor: "#FAADD4" }}
    >
      <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#141118]">
        Your Study DNA
      </p>
      <h2 className="mt-4 max-w-[72%] text-[23px] font-bold uppercase leading-7 text-[#141118]">
        Built from
        <br />
        your routine,
        <br />
        syllabus, habits
        <br />
        & preparation.
      </h2>
      <p className="mt-2 max-w-[62%] text-[13px] leading-5 text-[#4B4453]">
        {hero.subtitle || "A quick snapshot of where you stand right now."}
      </p>

      <div className="mt-8 flex items-center rounded-[26px] bg-[#FBF9FF] px-4 py-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE9FF] text-lg font-bold text-[#7C5CFC]">
          {hero.initials}
        </span>
        <span className="ml-4 min-w-0 flex-1">
          <span className="block truncate text-xl font-bold uppercase text-[#141118]">{hero.name}</span>
          <span className="mt-0.5 block text-sm text-secondary-text">
            {hero.examLabel} · {hero.classLabel}
          </span>
        </span>
      </div>

      <div className="mt-3 rounded-[28px] bg-[#FDF3C8] px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[15px] font-bold uppercase tracking-wide text-[#141118]">
            Preparation Health
          </p>
          <span className="rounded-full bg-[#FFD9B8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#C2410C]">
            {hero.healthLabel}
          </span>
        </div>
        <div className="mt-3 flex items-center">
          <Donut
            size={134}
            label={`${hero.healthPercent}%`}
            caption="Health"
            inner="#FFFDF5"
            slices={[
              { value: hero.consistency, color: HERO.purple },
              { value: hero.revision, color: HERO.amber },
              { value: hero.accuracy, color: HERO.mint },
            ]}
          />
          <div className="flex-1 pl-5">
            {[
              ["Consistency", hero.consistency, HERO.purple],
              ["Revision", hero.revision, HERO.amber],
              ["Accuracy", hero.accuracy, HERO.mint],
            ].map(([label, value, color]) => (
              <div key={String(label)} className="mb-3 flex items-center">
                <span className="mr-3 h-3.5 w-3.5 rounded-full" style={{ backgroundColor: String(color) }} />
                <span>
                  <span className="block text-[17px] font-bold" style={{ color: String(color) }}>
                    {value}%
                  </span>
                  <span className="text-xs text-[#141118]">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {progress?.items?.length ? (
        <div className="mt-3 rounded-[28px] bg-[#FBF9FF] px-4 py-4">
          <p className="text-sm font-bold uppercase tracking-wide text-[#141118]">Chapter progress</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {progress.items.map((item) => {
              const tone = tones[item.key] || tones.tagged;
              return (
                <div key={item.key} className="rounded-[20px] px-3 py-3" style={{ backgroundColor: tone.bg }}>
                  {item.key === "locked" ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#16A34A] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : item.key === "revision" ? (
                    <Clock className="h-5 w-5" style={{ color: tone.color }} />
                  ) : (
                    <BookOpen className="h-5 w-5" style={{ color: tone.color }} />
                  )}
                  <p className="mt-2 text-[21px] font-bold text-[#141118]">{item.percent}%</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-[#4B4453]">{item.label}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(Math.max(item.percent, 3), 100)}%`, backgroundColor: tone.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Hour = ({ value, unit }: { value: string; unit: string }) => (
  <p className="mt-1 text-[26px] font-bold text-dark-primary">
    {value}
    {unit ? <span className="text-sm font-medium text-secondary-text"> {unit}</span> : null}
  </p>
);

const Week = ({ profile }: { profile: StudyDnaProfile }) => {
  const { week } = profile;
  const classes = splitHours(week.classHoursLabel);
  const study = splitHours(week.selfStudyHoursLabel);
  const sleep = splitHours(week.sleepHoursLabel);
  return (
    <div>
      <Eyebrow>Your current snapshot</Eyebrow>
      <h2 className="mt-1 text-[28px] font-bold leading-9 text-dark-primary">Your week at a glance</h2>
      <p className="mt-1 text-sm text-secondary-text">This is what your life actually looks like.</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[24px] bg-[#EDE9FE] p-4">
          <BookOpen className="h-5 w-5 text-[#A78BFA]" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-secondary-text">Classes</p>
          <Hour value={classes.value} unit={classes.unit} />
          <p className="mt-1 text-[11px] text-secondary-text">{week.classWindow}</p>
        </div>
        <div className="rounded-[24px] bg-[#D1FAE5] p-4">
          <Pencil className="h-5 w-5 text-[#34D399]" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-secondary-text">Self study</p>
          <Hour value={study.value} unit={study.unit} />
          <p className="mt-1 text-[11px] text-secondary-text">{week.selfStudyHint}</p>
        </div>
        <div className="rounded-[24px] bg-[#DBEAFE] p-4">
          <Moon className="h-5 w-5 text-[#93C5FD]" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-secondary-text">Sleep</p>
          <Hour value={sleep.value} unit={sleep.unit} />
          <p className="mt-1 text-[11px] text-secondary-text">{week.sleepWindow}</p>
        </div>
        <div className="rounded-[24px] bg-[#FFEDD5] p-4">
          <Calendar className="h-5 w-5 text-[#FDBA74]" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-secondary-text">Next test</p>
          <p className="mt-1 text-2xl font-bold text-dark-primary">{week.nextTest?.daysLabel ?? "-"}</p>
          <p className="mt-1 line-clamp-2 text-[11px] text-secondary-text">
            {week.nextTest?.syllabus || week.nextTest?.name || "No test added"}
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-[24px] bg-[#EDE9FE] px-5 py-4">
        <Eyebrow>Your real study window</Eyebrow>
        <p className="mt-2 text-[32px] font-bold leading-none text-dark-primary">
          {week.studyWindowLabel}{" "}
          <span className="text-[13px] font-medium text-secondary-text">
            of usable study time on a typical weekday
          </span>
        </p>
        <p className="mt-2 text-[13px] font-semibold text-dark-primary">
          We&apos;ll build your plan around this - not against it.
        </p>
      </div>
      <div className="mt-4 flex items-start gap-3 rounded-[22px] bg-[#FEF3C7] px-4 py-3 text-[13px] text-dark-primary">
        <Activity className="mt-0.5 h-4 w-4 shrink-0 text-[#FDBA74]" />
        <p>{week.insight}</p>
      </div>
    </div>
  );
};

const percentFor = (subject: StudyDnaSubject, key: string, covered: number) => {
  if (key === "covered") return covered;
  const match = subject.breakdown.find((item) => item.key === key);
  if (typeof match?.percent === "number") return match.percent;
  if (key === "not_started") return Math.max(0, 100 - covered);
  return 0;
};

const Prep = ({ profile }: { profile: StudyDnaProfile }) => (
  <div>
    <Eyebrow>Preparation map</Eyebrow>
    <h2 className="mt-1 text-[28px] font-bold leading-9 text-dark-primary">
      Your {profile.preparation.examName} preparation
    </h2>
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {PREP_ROWS.map((row) => (
        <span key={row.key} className="flex items-center text-[11px] text-secondary-text">
          <span className="mr-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
          {row.label}
        </span>
      ))}
    </div>
    <div className="mt-5 space-y-3">
      {profile.preparation.subjects.map((subject) => {
        const covered = subject.percent || 0;
        const locked =
          typeof subject.lockedPercent === "number"
            ? subject.lockedPercent
            : (subject.breakdown.find((item) => item.key === "strongly_completed")?.percent ?? 0);
        const pieRows = PREP_ROWS.filter((row) => row.key !== "covered");
        const title = subject.name.toLowerCase().startsWith("math") ? "Mathematics" : subject.name;
        return (
          <div key={subject.name} className="flex items-center rounded-[28px] bg-[#F7F5FB] px-4 py-5">
            <Donut
              size={108}
              label={`${covered}%`}
              caption="Covered"
              inner="#F7F5FB"
              slices={pieRows.map((row) => ({
                value: percentFor(subject, row.key, covered),
                color: row.color,
              }))}
            />
            <div className="ml-4 min-w-0 flex-1">
              <p className="text-lg font-bold capitalize text-dark-primary">{title}</p>
              <p className="text-[13px] text-[#FDBA74]">Only {locked}% locked in</p>
              <div className="mt-3 space-y-1">
                {PREP_ROWS.map((row) => (
                  <div key={row.key} className="flex items-center justify-between text-xs">
                    <span className="flex items-center text-secondary-text">
                      <span className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
                      {row.label}
                    </span>
                    <span className="font-semibold text-dark-primary">
                      {percentFor(subject, row.key, covered)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const signalIcon = (name: string) => {
  const key = name.toLowerCase();
  if (key.includes("zap") || key.includes("bolt")) return Zap;
  if (key.includes("refresh") || key.includes("repeat")) return RefreshCw;
  if (key.includes("layer") || key.includes("stack")) return Activity;
  if (key.includes("target")) return Target;
  return Target;
};

const Signals = ({ profile }: { profile: StudyDnaProfile }) => (
  <div>
    <Eyebrow>Study signals</Eyebrow>
    <h2 className="mt-1 text-[28px] font-bold text-dark-primary">Your Study DNA</h2>
    <p className="mt-1 text-sm text-secondary-text">Five dimensions, read from your behaviour.</p>
    <div className="mt-6 space-y-3">
      {profile.signals.items.map((item) => {
        const Icon = signalIcon(item.icon);
        return (
          <div key={item.key} className="flex items-center rounded-[24px] bg-[#F7F5FB] px-4 py-3">
            <Donut
              size={72}
              label={`${item.score}%`}
              inner="#F7F5FB"
              slices={[
                { value: item.score, color: item.color || PASTEL.orange },
                { value: Math.max(0, 100 - item.score), color: PASTEL.track },
              ]}
            />
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                  <Icon className="h-4 w-4" style={{ color: item.color || PASTEL.orange }} />
                </span>
                <span className="font-semibold text-dark-primary">{item.label}</span>
              </div>
              <p className="mt-1 text-xs font-semibold" style={{ color: item.color || PASTEL.orange }}>
                {item.band}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-2 rounded-[24px] bg-[#EDE9FE] px-5 py-4">
      <Eyebrow>Reading your DNA</Eyebrow>
      <p className="mt-2 text-lg font-bold leading-6 text-dark-primary">{profile.signals.reading}</p>
    </div>
  </div>
);

const Strengths = ({ profile }: { profile: StudyDnaProfile }) => (
  <div>
    <Eyebrow color="#34D399">What&apos;s working</Eyebrow>
    <h2 className="mt-1 text-[28px] font-bold text-dark-primary">Your three strengths</h2>
    <div className="mt-5 space-y-3">
      {profile.strengths.map((item) => (
        <div key={item.title} className="flex items-start gap-3 rounded-[22px] bg-[#D1FAE5] px-4 py-4">
          <Activity className="mt-0.5 h-5 w-5 text-[#34D399]" />
          <div>
            <p className="font-bold text-dark-primary">{item.title}</p>
            <p className="text-[13px] text-secondary-text">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6">
      <Eyebrow color={PASTEL.rose}>The honest part</Eyebrow>
      <h2 className="mt-1 text-[28px] font-bold text-dark-primary">Where you&apos;re leaking</h2>
    </div>
    <div className="mt-4 space-y-3">
      {profile.leaks.map((item) => (
        <div key={item.index} className="flex items-start gap-3 rounded-[22px] bg-[#FFE4E6] px-4 py-4">
          <span className="font-bold text-[#FDA4AF]">{item.index}</span>
          <div>
            <p className="font-bold text-dark-primary">{item.title}</p>
            <p className="text-[13px] text-secondary-text">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Routine = ({ profile }: { profile: StudyDnaProfile }) => {
  const colors: Record<string, string> = {
    muted: "#E5E7EB",
    class: PASTEL.purple,
    study: PASTEL.mint,
    revise: PASTEL.orange,
  };
  return (
    <div>
      <Eyebrow>Your routine</Eyebrow>
      <h2 className="mt-1 text-[28px] font-bold text-dark-primary">Your typical day</h2>
      <div className="mt-8">
        {profile.routine.events.map((event, index) => (
          <div key={`${event.time}-${event.label}-${index}`} className="flex min-h-[46px]">
            <span className="w-[86px] pt-0.5 text-right text-[13px] text-[#9CA3AF]">{event.time}</span>
            <span className="relative mx-3 w-4">
              {index < profile.routine.events.length - 1 ? (
                <span className="absolute bottom-[-6px] left-[7px] top-2.5 w-px bg-[#EDE9FE]" />
              ) : null}
              <span
                className="mt-1.5 block h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[event.tone] || colors.muted }}
              />
            </span>
            <span className="flex-1 pt-0.5 font-semibold text-dark-primary">{event.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[24px] bg-[#F7F5FB] px-5 py-4">
        <Eyebrow>Study window</Eyebrow>
        <p className="mt-1 text-[32px] font-bold leading-none text-dark-primary">
          {profile.routine.studyWindowLabel}{" "}
          <span className="text-[13px] font-medium text-secondary-text">of self study on a typical day</span>
        </p>
      </div>
      <div className="mt-4 rounded-[22px] bg-[#EDE9FE] px-5 py-4 text-base font-bold text-dark-primary">
        We&apos;ll build your plan around this routine - not against it.
      </div>
    </div>
  );
};

const Tests = ({ profile }: { profile: StudyDnaProfile }) => (
  <div>
    <Eyebrow>What&apos;s coming up</Eyebrow>
    <h2 className="mt-1 text-[28px] font-bold text-dark-primary">Your upcoming tests</h2>
    <div className="mt-5 space-y-3">
      {profile.tests.map((test) => (
        <div key={`${test.day}-${test.name}`} className="flex gap-4 rounded-[22px] bg-[#F7F5FB] px-4 py-4">
          <div className="w-12 text-center">
            <p className="text-[26px] font-bold leading-none text-[#A78BFA]">{test.day}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary-text">{test.month}</p>
          </div>
          <div>
            <p className="font-bold text-dark-primary">{test.name}</p>
            {test.syllabus ? <p className="text-[13px] text-secondary-text">{test.syllabus}</p> : null}
          </div>
        </div>
      ))}
    </div>
    <p className="mt-2 text-[13px] text-secondary-text">
      Leadlly prepares you for these without letting your regular revision fall behind.
    </p>
    <div className="mt-6">
      <Eyebrow>Your next 7 days</Eyebrow>
      <h2 className="mt-1 text-[28px] font-bold leading-9 text-dark-primary">
        This week, Leadlly focuses on
      </h2>
    </div>
    <div className="mt-4 space-y-2">
      {profile.weekFocus.map((item) => (
        <div key={item.index} className="rounded-[18px] bg-[#EDE9FE] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#A78BFA]">{item.index}</span>
            <RefreshCw className="h-4 w-4 text-[#A78BFA]" />
            <span className="flex-1 text-[13px] font-semibold text-dark-primary">{item.title}</span>
            {item.meta ? <span className="text-[11px] text-secondary-text">{item.meta}</span> : null}
          </div>
          {item.topics?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-white px-2.5 py-1 text-[11px] text-dark-primary">
                  {topic}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
    {profile.weekGoal ? (
      <div className="mt-3 rounded-[22px] bg-[#D1FAE5] px-5 py-4">
        <Eyebrow color="#34D399">Your goal</Eyebrow>
        <p className="mt-2 font-bold text-dark-primary">{profile.weekGoal}</p>
      </div>
    ) : null}
  </div>
);

const Close = ({ profile }: { profile: StudyDnaProfile }) => (
  <div>
    <Eyebrow>Your study pattern</Eyebrow>
    <p className="mt-3 text-2xl font-bold leading-8 text-dark-primary">&quot;{profile.close.quote}&quot;</p>
    <div className="my-6 h-px bg-[#EDE9FE]" />
    <Eyebrow>So, what will Leadlly do?</Eyebrow>
    <div className="mt-4 space-y-3">
      {profile.close.actions.map((item) => (
        <div key={item.title} className="flex items-start gap-3 rounded-[22px] bg-white px-4 py-4 shadow-[0_4px_12px_rgba(61,53,72,0.08)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#A78BFA]">
            <RefreshCw className="h-4 w-4" />
          </span>
          <div>
            <p className="font-bold text-dark-primary">{item.title}</p>
            <p className="text-[13px] text-secondary-text">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-4 text-[22px] font-bold leading-7 text-dark-primary">Ready. Let&apos;s build your plan.</p>
  </div>
);

const PAGE_COUNT = 8;

export const StudyDnaDialog = ({
  open,
  loading,
  error,
  profile,
  onClose,
}: {
  open: boolean;
  loading: boolean;
  error: string;
  profile: StudyDnaProfile | null;
  onClose: () => void;
}) => {
  const [page, setPage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setPage(0);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !mounted) return null;

  const pages = profile
    ? [
        <Hero key="hero" profile={profile} />,
        <Week key="week" profile={profile} />,
        <Prep key="prep" profile={profile} />,
        <Signals key="signals" profile={profile} />,
        <Strengths key="strengths" profile={profile} />,
        <Routine key="routine" profile={profile} />,
        <Tests key="tests" profile={profile} />,
        <Close key="close" profile={profile} />,
      ]
    : [];

  return createPortal(
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close DNA report"
        onClick={onClose}
      />
      <div className="absolute inset-3 flex items-center justify-center sm:inset-5">
        <div
          className="flex h-full min-h-0 w-full max-h-full max-w-lg flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl sm:max-h-[860px] sm:rounded-[28px]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
            <button
              type="button"
              onClick={() => (page > 0 ? setPage(page - 1) : onClose())}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
              {Array.from({ length: PAGE_COUNT }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPage(index)}
                  className="rounded-full"
                  style={{
                    height: 6,
                    width: index === page ? 18 : 6,
                    backgroundColor: index === page ? HERO.purple : "#DDD6FE",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
              aria-label="Close DNA report"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 sm:px-4">
            {loading ? (
              <p className="py-20 text-center text-sm text-secondary-text">Loading Study DNA…</p>
            ) : error ? (
              <p className="py-20 text-center text-sm text-secondary-text">{error}</p>
            ) : (
              <div className={cn(page === 0 && "overflow-hidden rounded-[28px]")}>{pages[page]}</div>
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#EDE9FE] bg-white px-3 py-3 sm:px-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0 || loading || !profile}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              className="gap-1"
              disabled={loading || !profile}
              onClick={() => (page === PAGE_COUNT - 1 ? onClose() : setPage(page + 1))}
            >
              {page === PAGE_COUNT - 1 ? "Close" : "Next"}
              {page === PAGE_COUNT - 1 ? null : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StudyDnaReport;
