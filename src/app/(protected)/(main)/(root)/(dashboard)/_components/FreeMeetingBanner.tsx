"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  addDays,
  addMonths,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { claimFreeMeeting, getFreeMeetingSlots } from "@/actions/meeting_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const bookingWindow = () => {
  const tomorrow = addDays(startOfDay(new Date()), 1);
  return {
    minDate: tomorrow,
    maxDate: addDays(startOfDay(new Date()), 15),
  };
};

const FreeMeetingBanner = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { minDate, maxDate } = useMemo(() => bookingWindow(), []);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(minDate));
  const [slots, setSlots] = useState<Array<{ time: string; available: boolean }>>([]);
  const [time, setTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [booking, setBooking] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const isNew =
    !!user?.createdAt &&
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 7;
  const show =
    isNew &&
    !!user?.freeMeeting &&
    user.freeMeeting.availed === false &&
    !user.freeMeeting.claimedAt &&
    !claimed;

  const loadSlots = async (date: Date) => {
    setLoadingSlots(true);
    setSlotsError(false);
    setTime("");
    try {
      const data = await getFreeMeetingSlots(format(date, "yyyy-MM-dd"));
      setSlots(data.slots ?? []);
    } catch (error) {
      setSlots([]);
      setSlotsError(true);
      toast.error(error instanceof Error ? error.message : "Could not load slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (!open || scheduled) return;
    loadSlots(selectedDate);
  }, [open, selectedDate, scheduled]);

  if (!show && !open && !scheduled) return null;

  const availableSlots = slots.filter((slot) => slot.available);
  const noSlots = !loadingSlots && !slotsError && availableSlots.length === 0;

  const monthStart = startOfMonth(visibleMonth);
  const leadingBlanks = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, index) =>
    addDays(monthStart, index)
  );

  const closeAll = () => {
    setOpen(false);
    setScheduled(false);
    setSelectedDate(minDate);
    setVisibleMonth(startOfMonth(minDate));
    setTime("");
  };

  const confirm = async () => {
    if (!time || !user) return;
    setBooking(true);
    try {
      const res = await claimFreeMeeting({
        date: format(selectedDate, "yyyy-MM-dd"),
        time,
        message: "Free introductory meeting",
      });
      dispatch(
        userData({
          ...user,
          freeMeeting: {
            availed: true,
            meetingId: res?.meeting?._id,
            claimedAt: new Date().toISOString(),
          },
        })
      );
      setClaimed(true);
      setScheduled(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not book this meeting.");
      loadSlots(selectedDate);
    } finally {
      setBooking(false);
    }
  };

  return (
    <>
      {show ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-4 flex h-20 w-full items-center justify-between rounded-[34px] bg-white px-4 pr-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
        >
          <span className="flex min-w-0 flex-1 items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-leadlly">
              <Image
                src="/assets/images/free-meeting-icon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="text-base font-bold leading-5 text-dark-primary">
              You unlocked a free
              <br />
              mentor session
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-leadlly px-4 py-2.5 text-[13px] font-bold text-white">
            Claim Now
          </span>
        </button>
      ) : null}

      {open && !scheduled ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center">
          <div className="relative max-h-[88vh] w-full max-w-md overflow-hidden rounded-[28px] bg-white p-5">
            <button
              type="button"
              onClick={closeAll}
              className="absolute right-4 top-4 text-tab-item-gray"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="pr-6 text-center text-xl font-bold text-dark-primary">
              Book a free session
            </h3>
            <p className="mb-3 mt-1 text-center text-[13px] font-medium text-secondary-text">
              30 min · pick a date, then a time
            </p>

            <div className="max-h-[62vh] overflow-y-auto">
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                  className="text-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="text-base font-bold text-dark-primary">
                  {format(visibleMonth, "MMMM yyyy")}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                  className="text-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-7 text-center text-xs font-medium text-secondary-text">
                {WEEKDAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-sm">
                {Array.from({ length: leadingBlanks }).map((_, index) => (
                  <span key={`blank-${index}`} />
                ))}
                {monthDays.map((day) => {
                  const disabled = isBefore(day, minDate) || isAfter(day, maxDate);
                  const selected = isSameDay(day, selectedDate);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "mx-auto flex h-9 w-9 items-center justify-center rounded-full font-medium",
                        selected && "bg-primary text-white",
                        !selected && !disabled && "text-dark-primary",
                        disabled && "text-[#D4D4D4]"
                      )}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>

              <div className="mb-3 mt-4 flex items-center justify-between px-1">
                <p className="text-[15px] font-bold text-dark-primary">
                  {format(selectedDate, "EEEE, d MMM")}
                </p>
                <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-[11px] font-bold text-primary">
                  3:00 PM – 9:00 PM
                </span>
              </div>

              {loadingSlots ? (
                <div className="flex flex-col items-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p className="mt-3 text-[13px] font-medium text-secondary-text">
                    Checking available times
                  </p>
                </div>
              ) : slotsError ? (
                <button type="button" onClick={() => loadSlots(selectedDate)} className="w-full py-6">
                  <p className="text-center text-[13px] font-medium text-secondary-text">
                    Couldn&apos;t load slots. Tap to retry.
                  </p>
                </button>
              ) : noSlots ? (
                <p className="py-6 text-center text-[13px] font-medium text-secondary-text">
                  No slots left on this day. Try another date.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => {
                    const selected = time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setTime(slot.time)}
                        className={cn(
                          "h-[42px] rounded-[14px] border text-[13px] font-semibold",
                          selected
                            ? "border-primary bg-primary text-white"
                            : "border-[#F7F2FE] bg-white text-dark-primary"
                        )}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={noSlots || !time || booking}
              onClick={confirm}
              className={cn(
                "mt-3 flex h-12 w-full items-center justify-center rounded-full text-[15px] font-bold text-white",
                noSlots || !time ? "bg-gray-300" : "bg-leadlly"
              )}
            >
              {booking ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : time && !noSlots ? (
                `Confirm · ${time}`
              ) : (
                "Select a time"
              )}
            </button>
          </div>
        </div>
      ) : null}

      {scheduled ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-sm rounded-[34px] bg-white px-5 py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6D3BF0] to-[#9D6BFF]">
              <span className="text-3xl text-white">✓</span>
            </div>
            <p className="mt-4 text-xl font-bold text-dark-primary">Your meeting is scheduled</p>
            <p className="mt-2 text-base font-semibold text-primary">
              {format(selectedDate, "d MMM yyyy")}
              {time ? `  ·  ${time}` : ""}
            </p>
            <p className="mb-5 mt-2 text-sm font-medium text-secondary-text">
              Your mentor will call you.
            </p>
            <button
              type="button"
              onClick={closeAll}
              className="h-12 w-full rounded-full bg-leadlly text-[15px] font-semibold text-white"
            >
              Okay
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FreeMeetingBanner;
