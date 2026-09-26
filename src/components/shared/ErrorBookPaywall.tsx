"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Player = dynamic(() => import("lottie-react"), { ssr: false });

const FEATURES = [
  {
    src: "/assets/images/questions.png",
    feature: "Subject and chapter wise division",
  },
  {
    src: "/assets/images/quiz.png",
    feature: "Attempt as quiz",
  },
  {
    src: "/assets/images/error_2.png",
    feature: "Analyze your mistakes",
  },
];

const ErrorBookPaywall = () => {
  const [animation, setAnimation] = useState<object | null>(null);

  useEffect(() => {
    fetch("/assets/upgrade_2.json")
      .then((res) => res.json())
      .then(setAnimation)
      .catch(() => setAnimation(null));
  }, []);

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto bg-white px-4 py-8">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto h-[210px] w-[210px]">
          {animation ? (
            <Player animationData={animation} loop autoplay className="h-full w-full" />
          ) : null}
        </div>
        <h1 className="px-3 text-2xl font-bold text-dark-primary">
          Upgrade to Premium
        </h1>
        <p className="mx-auto mt-1 max-w-sm px-3 text-lg text-secondary-text">
          It&apos;s time to know your mistakes. Unlock this feature with a premium
          plan.
        </p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-5 px-3 text-left">
          {FEATURES.map((item) => (
            <div key={item.feature} className="flex items-center gap-3">
              <Image
                src={item.src}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <p className="text-base font-medium text-dark-primary">{item.feature}</p>
            </div>
          ))}
        </div>
        <Link
          href="/subscription-plans"
          className="mx-auto mt-10 flex h-11 w-full max-w-xs items-center justify-center rounded-lg bg-leadlly text-base font-bold text-white"
        >
          Upgrade premium
        </Link>
      </div>
    </div>
  );
};

export default ErrorBookPaywall;
