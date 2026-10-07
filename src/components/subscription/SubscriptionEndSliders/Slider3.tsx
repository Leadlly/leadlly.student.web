"use client";

import Image from "next/image";

const Slider3 = () => {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4">
      <div className="relative mb-6 flex h-[220px] w-full max-w-md items-center justify-center sm:h-[260px] md:mb-8 md:h-[300px]">
        <Image
          src="/assets/images/onboard-image-1.png"
          alt="Why join Premium"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 448px"
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl font-bold capitalize text-dark-primary sm:text-2xl md:text-3xl">
          Why you join <span className="text-primary">Premium</span>
        </h2>
        <p className="max-w-[305px] text-base font-medium text-dark-primary sm:text-lg">
          Navigate with ease, save more, and access tools crafted to simplify
          your journey
        </p>
      </div>
    </div>
  );
};

export default Slider3;
