import { cn } from "@/lib/utils";
import PaymentButton from "./PaymentButton";
import { Plan } from "@/helpers/types";

type PlanPriceProps = {
  className?: string;
  plan: Plan;
};

const PlanPriceBox = ({ className, plan }: PlanPriceProps) => {
  return (
    <div
      className={cn(
        "w-full md:w-72 bg-white rounded-xl shadow-[0_0_95px_-27px_rgba(150,84,244,0.2)] overflow-hidden",
        className
      )}
    >
      {plan.category === "pro" && (
        <div className="bg-primary text-white text-base lg:text-lg font-semibold capitalize text-center py-2">
          <p>recommended !</p>
        </div>
      )}
      <div className="px-4 py-5 space-y-5">
        <p className="capitalize text-xl lg:text-2xl font-semibold text-[#626262]">
          {plan.category} plan
        </p>

        <div className="text-center">
          <p className="text-3xl lg:text-4xl font-semibold capitalize">
            ₹ {plan.amount}/-
          </p>
          {/* <p className="text-lg lg:text-xl font-semibold text-[#6d6a6a]">
            70% OFF <span></span>
          </p> */}
        </div>

        <div className="grid place-items-center">
          <PaymentButton
            price={plan.amount}
            planId={plan.planId}
            category={plan.category}
            // setSubscriptionId={setSubscriptionId}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPriceBox;
