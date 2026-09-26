"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Clock } from "lucide-react";
import { formatClock } from "@/lib/study-check/content";
import { cn } from "@/lib/utils";

const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2;
const NUMBER_R = 104;

const pad = (value: number) => String(value).padStart(2, "0");

const toClock = (hour: number, minute: number) =>
  `${pad(hour)}:${pad(minute)}`;

const parseClock = (value: string | null, fallbackHour: number) => {
  const [rawHour, rawMinute] = (value || "").split(":").map(Number);
  const hour = Number.isNaN(rawHour) ? fallbackHour : Math.min(23, Math.max(0, rawHour));
  const minute = Number.isNaN(rawMinute) ? 0 : Math.min(59, Math.max(0, rawMinute));
  return { hour, minute };
};

const angleFromPointer = (
  event: { clientX: number; clientY: number },
  face: HTMLElement
) => {
  const rect = face.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  return (Math.atan2(y, x) * 180) / Math.PI + 90;
};

const pointOnFace = (angle: number, radius: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * radius,
    y: CY + Math.sin(rad) * radius,
  };
};

const ClockFace = ({
  mode,
  hour,
  minute,
  dragging,
  onPickHour,
  onPickMinute,
}: {
  mode: "hour" | "minute";
  hour: number;
  minute: number;
  dragging: boolean;
  onPickHour: (faceHour: number) => void;
  onPickMinute: (minute: number) => void;
}) => {
  const faceRef = useRef<HTMLDivElement>(null);
  const hour12 = hour % 12 || 12;
  const angle = mode === "hour" ? hour12 * 30 : minute * 6;
  const handLength = mode === "minute" && minute % 5 !== 0 ? 112 : 92;
  const labels =
    mode === "hour"
      ? Array.from({ length: 12 }, (_, index) => ({
          key: index + 1,
          text: String(index + 1),
          indexFrom12: (index + 1) % 12,
          selected: index + 1 === hour12,
          pick: () => onPickHour(index + 1),
        }))
      : Array.from({ length: 12 }, (_, index) => ({
          key: index,
          text: pad(index * 5),
          indexFrom12: index,
          selected: minute === index * 5,
          pick: () => onPickMinute(index * 5),
        }));

  const applyPointer = (event: { clientX: number; clientY: number }) => {
    const face = faceRef.current;
    if (!face) return;
    const nextAngle = (angleFromPointer(event, face) + 360) % 360;
    if (mode === "hour") {
      const faceHour = Math.round(nextAngle / 30) % 12 || 12;
      onPickHour(faceHour);
      return;
    }
    onPickMinute(Math.round(nextAngle / 6) % 60);
  };

  return (
    <div
      ref={faceRef}
      className="relative mx-auto touch-none select-none"
      style={{ width: SIZE, height: SIZE }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        applyPointer(event);
      }}
    >
      <div className="absolute inset-0 rounded-full bg-[#F7F5FB]" />
      <div
        className="pointer-events-none absolute rounded-full bg-[#8B5CF6]"
        style={{
          left: CX,
          top: CY,
          width: handLength,
          height: 3,
          marginTop: -1.5,
          transformOrigin: "0 50%",
          transform: `rotate(${angle - 90}deg)`,
          transition: dragging
            ? "none"
            : "transform 0.32s cubic-bezier(0.22, 1.15, 0.36, 1)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]" />
      {labels.map((label) => {
        const spot = pointOnFace(label.indexFrom12 * 30, NUMBER_R);
        return (
          <button
            key={label.key}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
              label.pick();
            }}
            className={cn(
              "absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              label.selected ? "bg-[#8B5CF6] text-white" : "text-[#141118]"
            )}
            style={{ left: spot.x, top: spot.y }}
          >
            {label.text}
          </button>
        );
      })}
    </div>
  );
};

const ClockDialog = ({
  value,
  fallbackHour,
  onClose,
  onConfirm,
}: {
  value: string | null;
  fallbackHour: number;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) => {
  const initial = parseClock(value, fallbackHour);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [dragging, setDragging] = useState(false);
  const isPm = hour >= 12;
  const hourLabel = hour % 12 || 12;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const pickHour = (faceHour: number) => {
    const normalized = faceHour % 12;
    setHour(isPm ? normalized + 12 : normalized);
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close clock"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[360px] rounded-[28px] bg-white px-5 py-5 shadow-2xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#8B5CF6]">
          Select time
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("hour")}
            className={cn(
              "min-w-16 rounded-2xl px-3 py-2 text-4xl font-bold tabular-nums",
              mode === "hour" ? "bg-[#F5F3FF] text-[#8B5CF6]" : "text-[#141118]"
            )}
          >
            {hourLabel}
          </button>
          <span className="text-4xl font-bold text-[#141118]">:</span>
          <button
            type="button"
            onClick={() => setMode("minute")}
            className={cn(
              "min-w-16 rounded-2xl px-3 py-2 text-4xl font-bold tabular-nums",
              mode === "minute" ? "bg-[#F5F3FF] text-[#8B5CF6]" : "text-[#141118]"
            )}
          >
            {pad(minute)}
          </button>
          <div className="ml-2 flex flex-col overflow-hidden rounded-xl border border-[#EDE9FE]">
            {(["AM", "PM"] as const).map((period) => {
              const active = period === "PM" ? isPm : !isPm;
              return (
                <button
                  key={period}
                  type="button"
                  onClick={() => {
                    const base = hour % 12;
                    setHour(period === "PM" ? base + 12 : base);
                  }}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold",
                    active ? "bg-[#8B5CF6] text-white" : "bg-white text-secondary-text"
                  )}
                >
                  {period}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="mt-4"
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => {
            setDragging(false);
            if (mode === "hour") setMode("minute");
          }}
          onPointerCancel={() => setDragging(false)}
        >
          <ClockFace
            mode={mode}
            hour={hour}
            minute={minute}
            dragging={dragging}
            onPickHour={pickHour}
            onPickMinute={setMinute}
          />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#8B5CF6]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(toClock(hour, minute))}
            className="rounded-full bg-leadlly px-5 py-2 text-sm font-semibold text-white"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ClockTimeField = ({
  label,
  value,
  fallbackHour = 7,
  onConfirm,
}: {
  label: string;
  value: string | null;
  fallbackHour?: number;
  onConfirm: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center justify-between rounded-[20px] bg-[#F7F2FE] px-4 py-4 text-left"
      >
        <span>
          <span className="block text-[13px] font-medium text-secondary-text">{label}</span>
          <span
            className={cn(
              "mt-1 block text-xl font-bold",
              value ? "text-dark-primary" : "text-tab-item-gray"
            )}
          >
            {value ? formatClock(value) : "00:00 AM"}
          </span>
        </span>
        <Clock className="h-[22px] w-[22px] text-primary" />
      </button>
      {open && mounted ? (
        <ClockDialog
          value={value}
          fallbackHour={fallbackHour}
          onClose={() => setOpen(false)}
          onConfirm={(next) => {
            onConfirm(next);
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default ClockTimeField;
