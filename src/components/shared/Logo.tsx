import clsx from "clsx";
import Image from "next/image";

import { TLogoProps } from "@/helpers/types";

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
        className={clsx(fullLogoClassName)}
      />
      <Image
        src="/assets/images/leadlly_logo_small.svg"
        alt="Leadlly_logo"
        width={smallLogoWidth}
        height={smallLogoHeight}
        className={clsx(smallLogoClassName)}
      />
    </>
  );
};

export default Logo;
