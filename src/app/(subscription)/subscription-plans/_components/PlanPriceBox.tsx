import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlanPriceProps = {
  title: string;
  time_span: string;
  price: number;
  className?: string;
};

const PlanPriceBox = ({
  title,
  time_span,
  price,
  className,
}: PlanPriceProps) => {
  return (
    <div
      className={cn(
        "w-full md:w-72 bg-white rounded-xl shadow-[0_0_95px_-27px_rgba(150,84,244,0.2)] overflow-hidden",
        className
      )}>
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
            {time_span}
          </p>
          <p className="text-lg lg:text-xl font-semibold text-[#6d6a6a]">
            {price}/- per month
          </p>
        </div>

        <div className="grid place-items-center">
          <Button
            size={"sm"}
            className={cn(
              "h-9 lg:text-lg font-medium px-10",
              title === "professional plan" &&
                "bg-white text-primary hover:bg-white/40"
            )}>
            Choose Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanPriceBox;
