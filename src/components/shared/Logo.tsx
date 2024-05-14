import Image from "next/image";

import { TLogoProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const Logo = ({
  fullLogoWidth,
  fullLogoHeight,
  fullLogoClassName,
  smallLogoWidth,
  smallLogoHeight,
  smallLogoClassName,
}: TLogoProps) => {
  return (
    <>
      <Image
        src="/assets/images/leadlly_logo.svg"
        alt="Leadlly_logo"
        width={fullLogoWidth}
        height={fullLogoHeight}
        className={cn(fullLogoClassName)}
      />
      <Image
        src="/assets/images/leadlly_logo_small.svg"
        alt="Leadlly_logo"
        width={smallLogoWidth}
        height={smallLogoHeight}
        className={cn(smallLogoClassName)}
      />
    </>
  );
};

export default Logo;
