"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart2,
  Check,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MessageCircle,
  User,
  X,
} from "lucide-react";
import { getSubscriptionPricing } from "@/actions/subscription_actions";
import { Plan } from "@/helpers/types";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: User,
    title: "Your own mentor - every week",
    body: "A real person from IIT / a government medical college. Weekly 1-on-1 check-ins. They know your weak chapters, your rank trajectory, your patterns. They call you out when needed.",
  },
  {
    icon: BarChart2,
    title: "Weekly performance review",
    body: 'Your mentor studies your data (tests completed, revision speed, quiz scores) and gives you a structured plan. Not just "study more". Specific, chapter-level feedback.',
  },
  {
    icon: MessageCircle,
    title: "On-demand doubt sessions",
    body: "Stuck at 11 PM before a test? Extra sessions available beyond the weekly call. Your mentor is not a TA, not a chatbot, not a recorded lecture.",
  },
  {
    icon: CheckCircle2,
    title: "Accountability that actually works",
    body: "When someone you respect is tracking your numbers, you don't slip. Consistency isn't willpower - it's involvement. Your mentor is that involvement.",
  },
];

const ROWS = [
  { label: "Daily revision", free: true, premium: true },
  { label: "Progress tracking", free: true, premium: true },
  { label: "Practice quizzes", free: true, premium: true },
  { label: "A mentor who knows you", free: false, premium: true },
  { label: "Weekly 1-on-1 check-ins", free: false, premium: true },
  { label: "A revision plan that adapts", free: false, premium: true },
  { label: "Ask anything doubt support", free: false, premium: true },
];

const MentorPaywall = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    getSubscriptionPricing("premium")
      .then((data) => setPlans(data.pricing ?? []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  const planOptions = useMemo(() => {
    const yearly = plans.find((plan) => plan["duration(months)"] >= 12) ?? null;
    const monthly = plans.find((plan) => plan["duration(months)"] <= 1) ?? null;
    const source = yearly || monthly ? [yearly, monthly].filter(Boolean) : plans;

    return (source as Plan[]).map((plan) => {
      const months = plan["duration(months)"];
      const isYearly = months >= 12;
      const isMonthly = months <= 1;
      return {
        plan,
        title: isYearly ? "Yearly" : isMonthly ? "Monthly" : `${months} months`,
        subtitle: isMonthly
          ? "Billed monthly"
          : `≈ ₹${Math.round(plan.amount / months)} / month`,
        priceLabel: `₹${plan.amount}`,
        priceSuffix: isYearly ? "/year" : isMonthly ? "/month" : "",
        saveLabel:
          plan.discountPercentage > 0 ? `Save ${plan.discountPercentage}%` : null,
      };
    });
  }, [plans]);

  useEffect(() => {
    if (selectedPlan || !planOptions.length) return;
    setSelectedPlan(planOptions[0].plan);
  }, [planOptions, selectedPlan]);

  const checkoutHref = selectedPlan
    ? `/subscription-plans/apply-coupon?category=${selectedPlan.category}&planId=${selectedPlan.planId}&price=${selectedPlan.amount}`
    : "/subscription-plans";

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-white via-[#F8F5FF] to-[#D6C8F8] px-4 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-lg pb-24">
        <Image
          src="/assets/images/mentor_crown.png"
          alt=""
          width={56}
          height={56}
          className="mx-auto mb-2 h-14 w-14 object-contain"
        />
        <p className="mb-3 text-center text-[13px] font-semibold tracking-wide text-primary">
          Premium Membership
        </p>
        <h1 className="text-center text-[28px] font-bold leading-[34px] text-dark-primary">
          Stop studying alone.
          <br />
          Get a personal mentor.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-secondary-text">
          Most students have the plan. What they&apos;re missing is someone who
          keeps them on it, every single week.
        </p>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase text-secondary-text">
          What Premium gives you
        </p>
        <p className="mb-4 mt-1 text-center text-base font-bold text-dark-primary">
          Not more features. A mentor.
        </p>

        <div className="space-y-2.5">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-2.5 rounded-[22px] border border-white/70 bg-white/40 p-4"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/70">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-dark-primary">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-secondary-text">
                    {item.body}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase text-secondary-text">
          Free vs Premium
        </p>
        <p className="mb-4 mt-1 text-center text-xl font-bold leading-7 text-dark-primary">
          See what you&apos;re studying without.
        </p>

        <div className="overflow-hidden rounded-[22px] border border-white/70 bg-[#F3E8FF]/55">
          <div className="grid grid-cols-[1fr_56px_72px] border-b border-primary/10 bg-white/35 px-4 py-3 text-xs font-semibold">
            <span className="text-secondary-text">Feature</span>
            <span className="text-center text-secondary-text">Free</span>
            <span className="text-center text-primary">Premium</span>
          </div>
          {ROWS.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-[1fr_56px_72px] items-center px-4 py-3 text-[13px]",
                index < ROWS.length - 1 && "border-b border-primary/10"
              )}
            >
              <span className="font-medium text-dark-primary">{row.label}</span>
              <span className="flex justify-center">
                {row.free ? (
                  <Check className="h-4 w-4 text-leadlly-green" />
                ) : (
                  <X className="h-4 w-4 text-tab-item-gray" />
                )}
              </span>
              <span className="flex justify-center">
                {row.premium ? (
                  <Check className="h-4 w-4 text-leadlly-green" />
                ) : (
                  <X className="h-4 w-4 text-tab-item-gray" />
                )}
              </span>
            </div>
          ))}
        </div>

        <p className="mb-3.5 mt-7 text-center text-[22px] font-bold text-dark-primary">
          Get your mentor today!
        </p>

        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-3">
            {planOptions.map((option) => {
              const selected = selectedPlan?.planId === option.plan.planId;
              return (
                <button
                  key={option.plan.planId}
                  type="button"
                  onClick={() => setSelectedPlan(option.plan)}
                  className={cn(
                    "flex w-full items-center rounded-[18px] border bg-white px-4 py-3.5 text-left",
                    selected ? "border-primary" : "border-[#E8E4F0]"
                  )}
                >
                  <span
                    className={cn(
                      "mr-3 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2",
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-[#C4B5FD]"
                    )}
                  >
                    {selected ? <Check className="h-3 w-3" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-base font-bold text-dark-primary">
                        {option.title}
                      </span>
                      {option.saveLabel ? (
                        <span className="rounded-full bg-leadlly-green px-2 py-0.5 text-[10px] font-bold text-white">
                          {option.saveLabel}
                        </span>
                      ) : null}
                    </span>
                    <span className="block text-xs text-secondary-text">
                      {option.subtitle}
                    </span>
                  </span>
                  <span className="text-lg font-bold text-dark-primary">
                    {option.priceLabel}
                    <span className="text-xs font-medium text-secondary-text">
                      {option.priceSuffix}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <Link
          href={checkoutHref}
          className={cn(
            "mt-7 flex h-12 w-full items-center justify-center gap-1 rounded-full bg-leadlly text-base font-semibold text-white",
            !selectedPlan && "pointer-events-none opacity-50"
          )}
        >
          Upgrade to Premium
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default MentorPaywall;
