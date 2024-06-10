import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ProfileBox = () => {
  return (
    <div className="flex flex-col justify-center xl:justify-start xl:gap-4 border rounded-xl bg-gradient-to-b from-white/15 to-primary/15 px-5 py-3 h-[190px] xl:h-auto">
      <div className="flex items-center flex-col xl:flex-row gap-3 xl:gap-6">
        <div className="w-16 h-16 rounded-full hidden xl:block">
          <Image
            src={"/assets/images/student_image.png"}
            alt="student_profile"
            width={64}
            height={64}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-start gap-1 xl:gap-3">
          <h2 className="text-xl xl:text-base font-semibold text-black whitespace-nowrap">
            <span className="text-primary">Hello,</span> John Musk
          </h2>

          <div className="hidden xl:block w-full">
            <Link href={"/manage-account"}>
              <Button
                variant={"outline"}
                className="text-primary hover:text-primary/80 h-7">
                Manage Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-base xl:text-sm text-black font-normal space-y-2">
        <p>
          Embrace the course as a catalyst for personal growth and empowerment,
          propelling you towards success with unwavering determination.
        </p>

        <div className="w-full flex items-center justify-center xl:hidden">
          <Link href={"/manage-account"}>
            <Button
              variant={"outline"}
              className="text-primary hover:text-primary/80">
              Manage Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
