import Image from "next/image";
import React from "react";

const Slider_2 = () => {
  return (
    <div className="w-full">
      <div className="w-full h-64 mb-8">
        <Image
          src={"/assets/images/onboard-image-1.png"}
          alt="onboard-image-1"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-y-5">
        <p className="text-2xl text-center capitalize font-bold">
          Why you join <span className="text-primary">Premium</span>
        </p>

        <p className="max-w-80 text-lg font-medium text-center">
          Navigate with ease, save more, and access tools crafted to simplify
          your journey
        </p>
      </div>
    </div>
  );
};

export default Slider_2;
