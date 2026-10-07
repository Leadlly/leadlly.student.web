"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const Player = dynamic(() => import("lottie-react"), { ssr: false });

const Slider1 = () => {
  const [animation, setAnimation] = useState<object | null>(null);

  useEffect(() => {
    fetch("/assets/upgrade_1.json")
      .then((res) => res.json())
      .then(setAnimation)
      .catch(() => setAnimation(null));
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4">
      <div className="relative mb-6 flex h-[220px] w-full max-w-[320px] items-center justify-center sm:h-[260px] md:h-[300px]">
        <div className="relative h-full w-full">
          {animation ? (
            <Player
              animationData={animation}
              loop
              autoplay
              className="h-full w-full"
            />
          ) : null}
          <span className="absolute left-0 top-10 h-3 w-3 rounded-full bg-black sm:h-4 sm:w-4" />
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#71ACDE] sm:h-4 sm:w-4" />
          <Image
            src="/assets/images/clouds.png"
            alt=""
            width={50}
            height={50}
            className="absolute right-0 top-0 h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
          <Image
            src="/assets/images/clouds.png"
            alt=""
            width={50}
            height={50}
            className="absolute bottom-[30%] left-0 h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl font-bold capitalize text-dark-primary sm:text-2xl md:text-3xl">
          Upgrade Your <span className="text-primary">Experience</span>
        </h2>
        <p className="max-w-[305px] text-base font-medium text-dark-primary sm:text-lg">
          Subscribe to unlock premium features, tailored experiences, and
          unbeatable value
        </p>
      </div>
    </div>
  );
};

export default Slider1;
