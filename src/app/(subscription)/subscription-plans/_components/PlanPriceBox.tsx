import { cn } from "@/lib/utils";
import PaymentButton from "./PaymentButton";
import { UserDataProps } from "@/helpers/types";

type PlanPriceProps = {
  title: string;
  duration: string;
  amount: number;
  planId: string;
  className?: string;
  setSubscriptionId: (subscriptionId: string) => void;
};

const PlanPriceBox = async ({
  title,
  duration,
  amount,
  planId,
  className,
  setSubscriptionId,
}: PlanPriceProps) => {
  return (
    <div
      className={cn(
        "w-full md:w-72 bg-white rounded-xl shadow-[0_0_95px_-27px_rgba(150,84,244,0.2)] overflow-hidden",
        className
      )}
    >
      {title === "professional plan" && (
        <div className="bg-primary text-white text-base lg:text-lg font-semibold capitalize text-center py-2">
          <p>recommended !</p>
        </div>
      )}
      <div className="px-4 py-5 space-y-5">
        <p className="capitalize text-xl lg:text-2xl font-semibold text-[#626262]">
          {title}
        </p>

        <div className="text-center">
          <p className="text-3xl lg:text-4xl font-semibold capitalize">
            {Number(duration) < 12
              ? duration
              : Math.floor(Number(duration) / 12)}{" "}
            {Number(duration) < 12
              ? "months"
              : `year${Math.floor(Number(duration) / 12) === 1 ? "" : "s"}`}
          </p>
          <p className="text-lg lg:text-xl font-semibold text-[#6d6a6a]">
            {Math.round(amount / Number(duration))}/- per month
          </p>
        </div>

        <div className="grid place-items-center">
          <PaymentButton
            title={title}
            planId={planId}
            setSubscriptionId={setSubscriptionId}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPriceBox;
