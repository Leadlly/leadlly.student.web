import Image from "next/image";
import BenefitsBox from "../subscription-plans/_components/BenefitsBox";
import {
  subscriptionExpertBenefits,
  subscriptionLearningBenefits,
  subscriptionPlanningBenefits,
} from "@/helpers/constants";
import PlanPriceBox from "../subscription-plans/_components/PlanPriceBox";
import ActivateFreeTrialButton from "./_components/ActivateFreeTrialButton";
import ExplorePlanButton from "./_components/ExplorePlanButton";

const TrialSubscription = () => {
  return (
    <section className="relative w-full h-full px-3">
      {/* <ExplorePlanButton /> */}
      <div className="w-full sticky top-0 inset-x-0 bg-white px-4 py-2">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />
      </div>
      <section className="min-h-[100dvh-80px] h-full flex items-center justify-center flex-col px-5 mb-5">
        <div className="w-full text-center flex flex-col items-center justify-center space-y-4 px-4 pt-32 sm:pt-0">
          <h1 className="text-3xl lg:text-page-title font-bold leading-tight">
            Unlimited Access to the All Options
          </h1>
          <p className="max-w-5xl w-full text-lg md:text-2xl leading-tight">
            Full unrestricted access to all sections including dashboard,
            planner, quizzes, tracker, errorbook, growth tools, and chat
            functionalities.
          </p>
          <ActivateFreeTrialButton />
        </div>
        <div className="w-full rounded-xl shadow-[0_0_36.8px_0_rgba(150,84,244,0.19)] px-5 xl:px-12 py-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5  my-7 md:my-12">
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
      </section>
      {/* <section>
        <h2 className="text-lg lg:text-4xl font-bold leading-tight mb-10 text-center">
          Our Subscription Plan
        </h2>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 pb-10">
          <PlanPriceBox title="basic plan" duration="6" amount={499} />
          <PlanPriceBox
            title="professional plan"
            duration="12"
            amount={416}
            className=" bg-primary/10"
          />
          <PlanPriceBox title="ultimate plan" duration="24" amount={333} />
        </div>
      </section> */}
    </section>
  );
};

export default TrialSubscription;
