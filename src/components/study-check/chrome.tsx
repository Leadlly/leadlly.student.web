"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { PARTS } from "@/lib/study-check/content";
import { cn } from "@/lib/utils";

export const PartDashes = ({ fills }: { fills: number[] }) => (
  <div className="flex w-full items-center gap-1">
    {fills.map((fill, index) => (
      <div
        key={PARTS[index]?.id ?? index}
        className="h-1 flex-1 overflow-hidden rounded-full bg-[#EDE9FE]"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${Math.round(fill * 100)}%` }}
        />
      </div>
    ))}
  </div>
);

export const OnboardingHeader = ({
  title,
  onBack,
  fills,
}: {
  title: string;
  onBack: () => void;
  fills: number[];
}) => (
  <div className="px-4 pb-3 pt-4 sm:px-8">
    <PartDashes fills={fills} />
    <div className="mt-3 flex items-center">
      <button
        type="button"
        onClick={onBack}
        className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F3FF]"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5 text-dark-primary" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          Leadlly Study Check
        </p>
        <p className="truncate text-sm font-semibold text-dark-primary sm:text-base">
          {title}
        </p>
      </div>
    </div>
  </div>
);

export const ScreenTitle = ({
  children,
  centered = false,
}: {
  children: string;
  centered?: boolean;
}) => (
  <h1
    className={cn(
      "text-2xl font-bold leading-snug text-dark-primary sm:text-3xl",
      centered && "text-center"
    )}
  >
    {children}
  </h1>
);

export const StepLayout = ({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 sm:px-8">
      <div className="mx-auto w-full max-w-xl">{children}</div>
    </div>
    {footer ? (
      <div className="border-t border-[#F3EEFF] bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto w-full max-w-xl">{footer}</div>
      </div>
    ) : null}
  </div>
);

export const NextButton = ({
  label = "Continue",
  disabled,
  loading,
  onClick,
}: {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    disabled={disabled || loading}
    onClick={onClick}
    className="h-12 w-full rounded-full bg-leadlly text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
  >
    {loading ? "Please wait…" : label}
  </button>
);

export const GhostButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-2 h-11 w-full rounded-full text-sm font-semibold text-primary"
  >
    {label}
  </button>
);

export const OptionCard = ({
  label,
  hint,
  selected,
  onClick,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "mb-3 flex w-full items-center justify-between rounded-[20px] border-2 px-4 py-4 text-left transition",
      selected
        ? "border-primary bg-[#F5F3FF]"
        : "border-[#EDE9FE] bg-white hover:border-primary/40"
    )}
  >
    <span>
      <span className="block text-base font-semibold text-dark-primary">
        {label}
      </span>
      {hint ? (
        <span className="mt-1 block text-sm text-secondary-text">{hint}</span>
      ) : null}
    </span>
    <span
      className={cn(
        "ml-3 h-5 w-5 shrink-0 rounded-full border-2",
        selected ? "border-primary bg-primary" : "border-[#DDD6FE]"
      )}
    />
  </button>
);
