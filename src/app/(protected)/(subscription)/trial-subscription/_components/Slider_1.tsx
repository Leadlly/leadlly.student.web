import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Player = dynamic(() => import("lottie-react"));

const Slider_1 = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-64 p-4">
        <Player
          animationData={require("../../../../../../public/assets/upgrade_1.json")}
          autoPlay
          loop
          className="w-full h-full"
        />

        <div className="size-4 rounded-full bg-black absolute left-0 top-10" />
        <div className="size-4 rounded-full bg-[#71ACDE] absolute left-1/2 top-0" />

        <div className="size-12 absolute top-0 right-0">
          <Image
            src={"/assets/images/clouds.png"}
            alt="clouds"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="size-12 absolute left-0 bottom-[30%]">
          <Image
            src={"/assets/images/clouds.png"}
            alt="clouds"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-5">
        <p className="text-2xl text-center capitalize font-bold">
          Upgrade Your <span className="text-primary">Experience</span>
        </p>

        <p className="text-lg max-w-80 font-medium text-center">
          Subscribe to unlock premium features, tailored experiences, and
          unbeatable value
        </p>
      </div>
    </div>
  );
};

export default Slider_1;
