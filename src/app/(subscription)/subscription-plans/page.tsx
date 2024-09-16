import { Header } from "@/components";
import {
  subscriptionExpertBenefits,
  subscriptionLearningBenefits,
  subscriptionPlanningBenefits,
} from "@/helpers/constants";
import Image from "next/image";
import React from "react";
import BenefitsBox from "./_components/BenefitsBox";
import PlanPriceBox from "./_components/PlanPriceBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getPricing } from "@/actions/subscription_actions";

const SubscriptionPlans = async () => {
  const pricing = await getPricing("main");

  return (
    <>
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
            {pricing?.map((plan: any) => (
              <PlanPriceBox
                key={plan.planId}
                title={plan['duration(months)'] === '3' ? "basic plan" : plan['duration(months)'] === '6' ? "professional plan" : "ultimate plan"}
                duration={plan['duration(months)']}
                amount={plan.amount} 
                planId={plan.planId}
                className={plan['duration(months)'] === '6' ? "bg-primary/10" : ""}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionPlans;
