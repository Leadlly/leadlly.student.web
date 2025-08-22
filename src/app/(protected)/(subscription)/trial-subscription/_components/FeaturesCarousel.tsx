"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Slider_1 from "./Slider_1";
import Slider_2 from "./Slider_2";
import Slider_3 from "./Slider_3";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReferAndEarnContent from "@/components/shared/referral/ReferAndEarnContent";

const slides = [
  <Slider_1 key={"slider_1"} />,
  <Slider_2 key={"slider_2"} />,
  <Slider_3 key={"slider_3"} />,
];

const FeaturesCarousel = () => {
  return (
    <div className="w-full h-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="max-w-sm w-full mx-auto"
      >
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>{slide}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col items-center justify-center gap-y-6 my-10">
        <Link href={"/subscription-plans"}>
          <Button className="rounded-full text-base font-semibold">
            Upgrade Plan
          </Button>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"link"} className="text-base underline">
              Refer to your friends and earn cash rewards
            </Button>
          </DialogTrigger>

          <ReferAndEarnContent />
        </Dialog>
      </div>
    </div>
  );
};

export default FeaturesCarousel;
