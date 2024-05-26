import Image from "next/image";
import Link from "next/link";

import { Logo, NotificationIcon } from "@/components";

const MobileNavBar = () => {
  return (
    <nav className="h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Logo
            fullLogoWidth={110}
            fullLogoHeight={40}
            fullLogoClassName="hidden sm:block"
            smallLogoWidth={30}
            smallLogoHeight={30}
            smallLogoClassName="sm:hidden"
          />
        </Link>
      </div>

      <div className="md:hidden capitalize text-lg font-medium text-black">
        <p>
          <span className="text-primary">hello,</span> john musk
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:border md:border-black md:w-8 md:h-8 md:rounded-full flex items-center justify-center">
          <NotificationIcon className="w-4 h-5" />
        </div>

        <div className="flex flex-col items-center justify-center mt-1">
          <Image
            src={"/assets/images/student_image.png"}
            alt="student_image"
            width={30}
            height={30}
          />
          <span className="hidden sm:inline-block capitalize text-[10px] font-semibold text-black">
            john musk
          </span>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;
