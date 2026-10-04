"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TestDateFieldProps = {
  value: string | null;
  onChange: (isoDate: string | null) => void;
  className?: string;
  placeholder?: string;
};

const toLocalDate = (value: string | null) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
};

const TestDateField = ({
  value,
  onChange,
  className,
  placeholder = "Tap to pick a date",
}: TestDateFieldProps) => {
  const [open, setOpen] = useState(false);
  const selected = toLocalDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative flex w-full cursor-pointer items-center rounded-[20px] border border-[#EDE9FE] bg-[#F7F2FE] px-4 py-4 text-left",
            className
          )}
        >
          <span className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
            <CalendarIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1 pr-2">
            <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
              Test date
            </span>
            <span
              className={cn(
                "mt-0.5 block text-base font-bold",
                selected ? "text-dark-primary" : "text-secondary-text"
              )}
            >
              {selected ? format(selected, "d MMMM yyyy") : placeholder}
            </span>
          </span>
          <ChevronRight className="h-[18px] w-[18px] shrink-0 text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (!date) {
              onChange(null);
              return;
            }
            const next = new Date(date);
            next.setHours(12, 0, 0, 0);
            onChange(next.toISOString());
            setOpen(false);
          }}
          disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default TestDateField;
