"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Slider1 from "@/components/subscription/SubscriptionEndSliders/Slider1";
import Slider3 from "@/components/subscription/SubscriptionEndSliders/Slider3";
import Slider5 from "@/components/subscription/SubscriptionEndSliders/Slider5";
import { cn } from "@/lib/utils";

const slides = [<Slider1 key="s1" />, <Slider3 key="s3" />, <Slider5 key="s5" />];

const SubscriptionEndPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex h-full min-h-[calc(100dvh-1.5rem)] w-full flex-col items-center justify-center bg-white px-3 py-6 sm:min-h-[calc(100dvh-2rem)] sm:px-6 sm:py-8 md:px-10">
      <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 md:gap-10">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "center" }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="basis-full pl-0">
                {slide}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mb-2 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentIndex === index ? "w-5 bg-primary" : "bg-primary/30"
              )}
            />
          ))}
        </div>

        <div className="flex w-full max-w-sm flex-col items-center gap-5 sm:gap-6">
          <Link
            href="/subscription-plans"
            className="flex h-12 w-full max-w-[240px] items-center justify-center rounded-full bg-gradient-to-r from-[#9654F4] to-[#7350E0] px-8 text-base font-semibold text-white shadow-md transition hover:opacity-95 sm:h-12 sm:text-lg"
          >
            Upgrade Plan
          </Link>

          <Link
            href="/refer-earn"
            className="text-center text-xs font-semibold text-primary underline sm:text-sm"
          >
            Refer to your friends and earn cash rewards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEndPage;
