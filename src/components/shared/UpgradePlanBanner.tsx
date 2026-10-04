"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type UpgradePlanBannerProps = {
  className?: string;
  compact?: boolean;
};

const UpgradePlanBanner = ({
  className,
  compact = false,
}: UpgradePlanBannerProps) => {
  return (
    <Link
      href="/subscription-plans"
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] pl-5 text-white shadow-sm",
        compact ? "h-14 pr-2" : "h-[70px] pr-2.5",
        className
      )}
    >
      <span className="min-w-0 flex-1 py-2">
        <span
          className={cn(
            "block font-normal leading-tight text-white/95",
            compact ? "text-[11px]" : "text-xs"
          )}
        >
          Want to improve your study?
        </span>
        <span
          className={cn(
            "block font-bold leading-tight text-white",
            compact ? "text-sm" : "text-lg"
          )}
        >
          Upgrade your plan
        </span>
      </span>

      {!compact ? (
        <Image
          src="/assets/images/subscription_header_img.png"
          alt=""
          width={66}
          height={56}
          className="mx-1 h-14 w-[66px] object-contain"
        />
      ) : null}

      <span
        className={cn(
          "flex shrink-0 items-center justify-center border-l border-white/40",
          compact ? "h-10 w-9" : "h-12 w-10"
        )}
      >
        <ArrowUpRight className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
      </span>
    </Link>
  );
};

export default UpgradePlanBanner;
