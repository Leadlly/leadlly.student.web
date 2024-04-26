import { LeftArrowIcon, RightArrowIcon } from "@/components";

const WeeklyPlan = () => {
  return (
    <div className="flex flex-col justify-start gap-5 h-full">
      <div className="px-7">
        <h4 className="text-2xl font-semibold text-black">Weekly Plan</h4>
      </div>

      <div className="flex items-center justify-between px-7">
        <div className="w-7 h-7 bg-slate-400 flex items-center justify-center rounded-full">
          <LeftArrowIcon stroke="black" />
        </div>
        <div className="text-lg font-semibold text-center">
          <p>Jan 5 - Jan 11</p>
        </div>
        <div className="w-7 h-7 bg-slate-400 flex items-center justify-center rounded-full">
          <RightArrowIcon stroke="black" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-5">
        <ul className="flex flex-col justify-start gap-2 h-full overflow-x-hidden overflow-y-auto custom__scrollbar px-2">
          <li className="bg-primary rounded-xl text-center text-white">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
          <li className="rounded-xl text-center text-black border">
            <p className="py-1 border-b border-b-slate-300 text-xl">
              Monday 5 jan 2024
            </p>
            <p className="py-1 text-lg px-2 truncate overflow-hidden">
              Limits, continuity, and differentiability/Magnetism ....
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyPlan;
