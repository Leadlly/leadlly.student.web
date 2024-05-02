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

          <Link
            href={"/profile"}
            className="border rounded bg-white text-primary text-[10px] px-2 py-1 text-center font-medium hidden xl:inline-block">
            Manage Account
          </Link>
        </div>
      </div>
      <div className="text-base xl:text-sm text-black font-normal space-y-2">
        <p>
          Embrace the course as a catalyst for personal growth and empowerment,
          propelling you towards success with unwavering determination.
        </p>

        <div className="w-full flex items-center justify-center">
          <Link
            href={"/profile"}
            className="border rounded-lg xl:rounded bg-white text-primary text-base px-2 py-1 text-center font-medium block xl:hidden">
            Manage Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
