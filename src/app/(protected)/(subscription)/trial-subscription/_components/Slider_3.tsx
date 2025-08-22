import Image from "next/image";
import React from "react";

const Slider_3 = () => {
  return (
    <div className="w-full">
      <div>
        <Image
          src={"/assets/images/onboard-image-2.png"}
          alt="onboard-image-2"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-y-5">
        <p className="text-2xl text-center capitalize font-bold">
          Unlock Exclusive <span className="text-primary">Deals</span>
        </p>

        <p className="max-w-80 text-lg font-medium text-center">
          Activate your discount coupons and enjoy savings on every subscription
        </p>
      </div>
    </div>
  );
};

export default Slider_3;
