import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const RevisionZone = () => {
  return (
    <div className="flex items-center justify-center h-full rounded-xl py-4 border md:max-h-[411px] xl:max-h-[303px]">
      <div className="w-full px-3 lg:px-7">
        <div className="flex items-start justify-between">
          <h3 className="text-base md:text-2xl lg:text-[32px] leading-none font-bold text-primary">
            What did you Learnt <br />
            New Today?
          </h3>

          <Button
            variant={"outline"}
            className="mt-1 px-2 border-primary text-primary h-5 md:h-6 xl:h-7 uppercase text-xs md:text-sm lg:text-base font-medium">
            info
          </Button>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 xl:gap-2 my-1">
          <div className="text-sm md:text-xl font-medium">
            <p className="capitalize text-[#333333]">subjects:</p>
            <p className="text-[#898989]">Maths, Physics, Chemistry and more</p>
          </div>
          <div className="w-full xl:w-auto flex items-center justify-center xl:justify-start">
            <Image
              src={"/assets/images/revision_zone.png"}
              alt="a girl doing her revision"
              width={150}
              height={150}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Button className="h-7 md:h-12 flex items-center gap-2 text-sm md:text-2xl font-bold rounded-md md:rounded-xl">
            Proceed
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RevisionZone;
