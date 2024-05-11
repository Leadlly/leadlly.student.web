import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const RevisionZone = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="px-7">
        <div className="flex items-start justify-between">
          <h3 className="text-4xl font-bold capitalize">
            <span className="text-primary">welcome to</span> <br />
            the revision zone!
          </h3>

          <Button
            variant={"outline"}
            className="mt-3 border-primary text-primary h-7 uppercase text-base font-medium">
            info
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="text-xl font-medium space-y-2">
            <p className="capitalize text-[#333333]">subjects:</p>
            <p className="text-[#898989]">Maths, Physics, Chemistry and more</p>
          </div>
          <Image
            src={"/assets/images/revision_zone.png"}
            alt="a girl doing her revision"
            width={150}
            height={150}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <Button className="h-12 flex items-center gap-2 text-2xl font-bold rounded-xl">
            Proceed
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RevisionZone;
