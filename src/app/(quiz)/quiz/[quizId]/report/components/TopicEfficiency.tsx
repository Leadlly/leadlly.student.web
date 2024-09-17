import { Progress } from "@/components/ui/progress";
import { getProgressBarColor } from "@/helpers/constants/efficiency";
import { ChevronDown } from "lucide-react";
import { ReportSchema } from "./Defaultview";

const TopicsEfficiency = ({ report }: { report: ReportSchema | null }) => {
  interface topicSchema {
    topic: string;
    efficiency: number;
  }

  return (
    <section className="shadow-section my-5 p-5 rounded-[10px] flex-1 max-md:mx-5">
      <h2 className="text-xl font-bold mb-4">Topics Efficiency</h2>
      <div className="flex flex-col justify-start items-stretch  max-h-52 p-3 overflow-y-scroll custom__scrollbar ">
        {report?.topicsWithEfficiency.map(
          ({ topic, efficiency }: topicSchema) => (
            <div key={topic} className="flex items-center justify-between">
              <div className="flex justify-center items-center gap-2 md:gap-4 text-xs md:text-md">
                <div className="size-3 md:size-5">
                  <ChevronDown className="size-full" />
                </div>
                <span>{topic}</span>
              </div>
              <div className="flex justify-center items-center gap-5">
                <Progress
                  value={efficiency}
                  className="h-2 bg-[#00000012] min-w-[120px]"
                  indicatorClassName={getProgressBarColor(efficiency)}
                />
                <span className="font-semibold text-[#9E9E9E]">
                  {efficiency}%
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default TopicsEfficiency;
