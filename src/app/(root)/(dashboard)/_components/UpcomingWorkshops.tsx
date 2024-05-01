import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React from "react";

const UpcomingWorkshops = () => {
  return (
    <div className="border rounded-xl px-3 py-1 space-y-2">
      <h4 className="text-sm text-black font-bold">Upcoming Workshops</h4>

      <div className="bg-primary/[0.12] border rounded-lg py-1 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
            <span className="text-[10px] text-primary font-semibold">Live</span>
          </div>

          <div className="w-3 h-3 rounded bg-white text-black flex items-center justify-center">
            <Ellipsis className="w-full" />
          </div>
        </div>

        <div className="flex items-end gap-1">
          <div className="space-y-[2px]">
            <h4 className="text-xs font-semibold text-black">
              Study On Ocular Potential
            </h4>
            <p className="text-[10px] text-[#818181] font-semibold">
              It tells about Visual function
            </p>
            <p className="text-[10px] text-black font-normal">
              Meeting at 10AM, 27Feb 2024
            </p>
          </div>
          <div className="flex items-end gap-[2px]">
            <span className="text-[7px] text-black font-semibold">
              - By Doris Wilson
            </span>
            <div className="w-5 h-5 rounded-full">
              <Image
                src="/assets/images/teacher.jpg"
                alt="Mentor Image"
                width={20}
                height={20}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingWorkshops;
