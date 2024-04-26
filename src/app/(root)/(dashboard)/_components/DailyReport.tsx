import { RadialBarChart } from "@/components";

const DailyReport = () => {
  return (
    <div className="px-3 py-2">
      <h4 className="text-sm font-bold">Daily Report</h4>
      <div className="flex items-center justify-center">
        <RadialBarChart />
      </div>
    </div>
  );
};

export default DailyReport;
