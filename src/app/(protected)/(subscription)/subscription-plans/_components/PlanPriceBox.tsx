import { cn } from "@/lib/utils";
import { Plan } from "@/helpers/types";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectedPlan } from "@/redux/slices/selectedPlanSlice";

type PlanPriceProps = {
  className?: string;
  plan: Plan;
};

const PlanPriceBox = ({ className, plan }: PlanPriceProps) => {
  const user = useAppSelector((state) => state.user.user);
  const { selectedPlan: selectedPlanState } = useAppSelector(
    (state) => state.selectedPlan
  );
  const dispatch = useAppDispatch();

  return (
    <Card
      role="button"
      onClick={() => dispatch(selectedPlan(plan))}
      className={cn(
        "flex-1 min-w-64 rounded-xl p-0.5",
        selectedPlanState?._id === plan._id
          ? "bg-gradient-to-r from-[#FAAE64] via-primary to-[#FAAE64]"
          : "bg-[rgba(98,_0,_238,_0.05)]",

        className
      )}
    >
      <CardContent
        className={cn(
          "relative bg-white px-4 py-5 rounded-lg flex items-center justify-between",
          user &&
            user.subscription.status === "active" &&
            user?.subscription.planId === plan?.planId
            ? "border-2 border-primary"
            : ""
        )}
      >
        {plan.category === "premium" && plan["duration(months)"] === 1 && (
          <div className="absolute -top-4 right-3 z-20 bg-gradient-to-r from-primary to-[#BB76B2] text-white text-sm font-semibold capitalize text-center px-3 py-1 rounded-full">
            <p>Special Discount</p>
          </div>
        )}

        {plan.category === "pro" && plan["duration(months)"] === 12 && (
          <div className="absolute -top-4 right-3 z-20 bg-gradient-to-r from-primary to-[#BB76B2] text-white text-sm font-semibold capitalize text-center px-3 py-1 rounded-full">
            <p>Most Popular</p>
          </div>
        )}

        {user &&
        user.subscription.status === "active" &&
        user.subscription.planId === plan?.planId ? (
          <div className="absolute -top-4 left-3 z-20 bg-gradient-to-r from-primary to-[#BB76B2] text-white text-sm font-semibold capitalize text-center px-3 py-1 rounded-full">
            <p>Active Plan</p>
          </div>
        ) : null}

        <p className="capitalize text-xl lg:text-2xl font-semibold text-[#626262]">
          {plan["duration(months)"] < 12
            ? `${plan["duration(months)"]} month${plan["duration(months)"] > 1 ? "s" : ""}`
            : `Till ${user?.academic.competitiveExam?.toUpperCase()} ${new Date().getFullYear() + 1}`}
        </p>

        <div>
          <span className="font-mada-semibold text-lg sm:text-xl">
            ₹
            {Math.round(
              Number(plan?.amount) / Number(plan?.["duration(months)"])
            )}{" "}
            <span className="font-mada-medium text-base">
              {plan["duration(months)"] <= 1 ? "for a month" : "/ month"}
            </span>
          </span>
          <div className="flex justify-end gap-x-2">
            <p className="text-base sm:text-lg text-neutral-500 font-medium line-through capitalize">
              ₹{Math.round(Number(plan?.initialPrice))}
            </p>
            <p className="text-base sm:text-lg font-medium text-[#6d6a6a]">
              ₹{plan?.amount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanPriceBox;
