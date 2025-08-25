"use client";

import { Header } from "@/components";
import {
  mentorWordMap,
  planFeatures,
  subscriptionTabs,
} from "@/helpers/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlanPriceBox from "./PlanPriceBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetSubscriptionPricing } from "@/queries/subscriptionQueries";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { selectedPlan } from "@/redux/slices/selectedPlanSlice";
import LogoutButton from "@/components/shared/LogoutButton";

const SubscriptionPlansPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { institute } = useAppSelector((state) => state.institute);

  const [activePlanTab, setActivePlanTab] = useState(
    institute && institute._id ? subscriptionTabs[1] : subscriptionTabs[0]
  );

  const dispatch = useAppDispatch();

  const { data: pricingData, isLoading: fetchingPricing } =
    useGetSubscriptionPricing(activePlanTab.id);

  useEffect(() => {
    if (fetchingPricing) return;

    if (pricingData && pricingData.pricing && pricingData.pricing.length > 0) {
      dispatch(selectedPlan(pricingData.pricing[2]));
    }
  }, [pricingData, fetchingPricing]);

  const examType = user?.academic.competitiveExam!;

  const mentorWord = mentorWordMap[examType as keyof typeof mentorWordMap];

  return (
    <section className="relative">
      <div className="px-3 lg:px-5 py-2 mb-6 flex items-center justify-between gap-5">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={150}
          height={50}
        />

        <div>
          <LogoutButton />
        </div>
      </div>

      <Header
        title="Our Subscription Plan"
        className="justify-center"
        titleClassName=" text-2xl md:text-4xl lg:text-page-title"
      />

      <div className="text-center px-3 lg:px-5 mb-8 mt-2">
        <p className="text-primary font-semibold text-base sm:text-lg">
          Choose the plan that works for you {":)"}
        </p>
      </div>

      <div className="sticky top-0 z-50 grid place-items-center px-3 lg:px-5 py-3">
        {institute && institute._id ? (
          <Button className="max-w-80 h-10 w-full rounded-full bg-primary">
            {activePlanTab.label} Plan
          </Button>
        ) : (
          <div className="max-w-80 h-10 w-full mx-auto bg-white border border-primary rounded-full flex items-center justify-between">
            {subscriptionTabs.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActivePlanTab(item)}
                className={cn(
                  "flex-1 rounded-full font-medium sm:text-lg",
                  activePlanTab.id === item.id
                    ? "bg-primary text-white"
                    : "bg-transparent text-primary hover:bg-transparent"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div>
        {fetchingPricing ? (
          <div className="flex items-center justify-center gap-4 flex-wrap max-w-5xl w-full mx-auto h-52 px-3 lg:px-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 bg-slate-100" />
            ))}
          </div>
        ) : (
          <div>
            {pricingData &&
            pricingData.pricing &&
            pricingData.pricing.length > 0 ? (
              <div className="flex items-center justify-center gap-4 flex-wrap max-w-5xl w-full mx-auto my-8 px-3 lg:px-5">
                {pricingData.pricing
                  .sort((a, b) => a["duration(months)"] - b["duration(months)"])
                  .map((plan) => (
                    <PlanPriceBox key={plan?._id} plan={plan} />
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="max-w-5xl w-full mx-auto px-3 lg:px-5 pt-5 pb-20">
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium whitespace-nowrap">
            View Benefits
          </span>

          <div className="w-full h-0.5 bg-primary"></div>
        </div>

        <Card className="bg-[#F7F2FF] pt-6 mt-4 rounded-3xl">
          <CardContent className="flex gap-2 flex-wrap">
            {planFeatures.map((feat, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 min-w-[50%] bg-white py-3 flex items-center rounded-sm",
                  i === 0 && "rounded-t-2xl",
                  planFeatures.length - 1 === i && "rounded-b-2xl"
                )}
              >
                <div className="max-w-14 sm:max-w-20 w-full h-full grid place-items-center border-r">
                  {activePlanTab.features.includes(feat.title) ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                </div>

                <div className="px-4">
                  <p>{feat.title.replace("{mentor}", mentorWord)}</p>
                  <p>{feat.subtitle.replace("{mentor}", mentorWord)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 inset-x-0 py-5 px-3 lg:px-5 grid place-items-center ">
        <Link
          href={`/subscription-plans/apply-coupon`}
          className="max-w-80 w-full h-14"
        >
          <Button className="w-full h-full rounded-2xl text-base sm:text-lg font-semibold">
            Find Coupon
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SubscriptionPlansPage;
