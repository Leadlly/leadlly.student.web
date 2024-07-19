import { RadialBarChart } from "@/components";
import { Progress } from "@/components/ui/progress";
import { ISubject } from "@/helpers/types";

const SubjectOverview = ({ subject }: { subject: ISubject | undefined }) => {
  return (
    <div className="rounded-xl shadow-tracker_subject_overview px-5 py-4">
      <h2 className="text-lg md:text-2xl leading-none font-semibold text-black mb-4 lg:mb-0">
        Subject Overview
      </h2>

      {/* ===== LARGE DEVICE LAYOUT ====== */}
      <div className="hidden lg:flex items-center gap-4 h-48">
        <div className="flex items-center h-full">
          <RadialBarChart
            series={[subject?.overall_progress!]}
            colors={["#9654f4"]}
            labels={["Revision Completion"]}
            width="80%"
            hollowSize="60%"
            dataLabel="completed"
            fontSize="24px"
          />
          <RadialBarChart
            series={[subject?.overall_efficiency!]}
            colors={["#72EFDD"]}
            labels={["Revision Efficiency"]}
            width="80%"
            hollowSize="60%"
            dataLabel="efficiency"
            fontSize="24px"
          />
          <RadialBarChart
            series={[subject?.total_questions_solved.percentage!]}
            colors={["#FFDA57"]}
            labels={["No. of Questions Solved"]}
            width="80%"
            hollowSize="60%"
            dataLabel="questions"
            subject={subject}
          />
        </div>

        <div className="flex flex-col space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-primary rounded-md"></span>
            <p className="text-lg leading-none font-semibold">
              Revision Completion
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#72EFDD] rounded-md"></span>
            <p className="text-lg leading-none font-semibold">
              Revision Efficiency
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#FFDA57] rounded-md"></span>
            <p className="text-lg leading-none font-semibold">
              No. of Questions Solved
            </p>
          </div>
        </div>
      </div>

      {/* ===== SMALL DEVICE LAYOUT ====== */}
      <div className="lg:hidden flex flex-col space-y-3">
        <div>
          <h4 className="leading-none text-sm font-medium mb-1">
            Revision Completion
          </h4>
          <div className="flex items-center gap-4">
            <Progress value={subject?.overall_progress!} className="h-2" />
            <p className="leading-none text-lg font-semibold">
              {subject?.overall_progress}%
            </p>
          </div>
        </div>
        <div>
          <h4 className="leading-none text-sm font-medium mb-1">
            Revision Efficiency
          </h4>
          <div className="flex items-center gap-4">
            <Progress
              value={subject?.overall_efficiency!}
              className="h-2"
              indicatorClassName="bg-[#72EFDD]"
            />
            <p className="leading-none text-lg font-semibold">
              {subject?.overall_efficiency}%
            </p>
          </div>
        </div>
        <div>
          <h4 className="leading-none text-sm font-medium mb-1">
            No. of Questions Solved
          </h4>
          <div className="flex items-center gap-4">
            <Progress
              value={subject?.total_questions_solved.percentage}
              className="h-2"
              indicatorClassName="bg-[#FFDA57]"
            />
            <p className="leading-none text-lg font-semibold">
              {subject?.total_questions_solved.number! > 120
                ? "120+"
                : subject?.total_questions_solved.number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectOverview;
