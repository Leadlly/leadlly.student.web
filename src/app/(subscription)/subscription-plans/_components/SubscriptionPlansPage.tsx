"use client";

import { Header } from "@/components";
import {
  subscriptionExpertBenefits,
  subscriptionLearningBenefits,
  subscriptionPlanningBenefits,
} from "@/helpers/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BenefitsBox from "./BenefitsBox";
import PlanPriceBox from "./PlanPriceBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Plan, UserDataProps } from "@/helpers/types";
import { useSearchParams } from "next/navigation";
import { loadRazorpayScript } from "@/helpers/utils";
import Script from "next/script";

const SubscriptionPlansPage = ({
  pricing,
  user,
}: {
  pricing: Plan[];
  user: UserDataProps;
}) => {
  console.log(pricing);

  // const [subscriptionId, setSubscriptionId] = useState("");

  // const searchParams = useSearchParams();
  // const subscriptionIdParams = searchParams.get("subscriptionId");
  // const appRedirectParam = searchParams.get("redirect");

  // useEffect(() => {
  //   if (subscriptionIdParams) {
  //     setSubscriptionId(subscriptionIdParams);
  //   }
  // }, [subscriptionIdParams]);

  // const openRazorpayPopUp = () => {
  //   const options = {
  //     key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
  //     name: "Leadlly",
  //     order_id: subscriptionId,
  //     callback_url: `/api/subscription/verify?appRedirectURI=${appRedirectParam ? encodeURIComponent(appRedirectParam) : ""}`,
  //     prefill: {
  //       name: user ? user.firstname : "",
  //       email: user ? user.email : "",
  //       contact: user ? user.phone : "",
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         window.location.href = appRedirectParam
  //           ? `${appRedirectParam}?transaction=cancelled`
  //           : "";
  //       },
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#9654f4",
  //     },
  //   };

  //   const razor = new window.Razorpay(options);
  //   razor.open();
  // };

  // useEffect(() => {
  //   if (subscriptionId) {
  //     const loadAndOpenRazorpay = async () => {
  //       const isLoaded = await loadRazorpayScript();
  //       if (isLoaded) {
  //         openRazorpayPopUp();
  //       } else {
  //         console.error("Razorpay script failed to load");
  //       }
  //     };

  //     loadAndOpenRazorpay();
  //   }
  // }, [subscriptionId]);
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section>
        <div className="px-3 lg:px-5 py-2 mb-6 flex items-center gap-5">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
            </Button>
          </Link>
          <Image
            src="/assets/images/leadlly_logo.svg"
            alt="Leadlly"
            width={150}
            height={50}
          />
        </div>

        <Header
          title="Our Subscription Plan"
          className="justify-center"
          titleClassName=" text-2xl md:text-4xl lg:text-page-title"
        />

        <div className="px-3 xl:px-14">
          <div className="w-full rounded-xl shadow-[0_0_36.8px_0_rgba(150,84,244,0.19)] px-5 xl:px-12 py-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 my-7 md:my-12">
            <BenefitsBox
              title="planning & organization:"
              subscriptionBenefits={subscriptionPlanningBenefits}
            />

            <BenefitsBox
              title="expert guidance & support:"
              subscriptionBenefits={subscriptionExpertBenefits}
            />

            <BenefitsBox
              title="learning optimization:"
              subscriptionBenefits={subscriptionLearningBenefits}
            />
          </div>

          {/* Dynamic PlanPriceBox Rendering based on pricing data */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 pb-10">
            {pricing?.map((plan) => (
              <PlanPriceBox
                key={plan.planId}
                plan={plan}
                // title={
                //   plan["duration(months)"] === 3
                //     ? "basic plan"
                //     : plan["duration(months)"] === 6
                //       ? "professional plan"
                //       : "ultimate plan"
                // }
                // duration={plan["duration(months)"]}
                // amount={plan.amount}
                // planId={plan.planId}
                // className={
                //   plan["duration(months)"] === 6 ? "bg-primary/10" : ""
                // }
                // setSubscriptionId={setSubscriptionId}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionPlansPage;
