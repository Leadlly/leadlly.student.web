"use client";

import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  ArrowLeft,
  CopyIcon,
  IndianRupeeIcon,
  Link,
  PencilIcon,
  RefreshCwIcon,
  Share2Icon,
} from "lucide-react";
import Image from "next/image";
import { Label } from "../../ui/label";
import ReferralCodeInput from "./ReferralCodeInput";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import RefreshReferralCode from "./RefreshReferralCode";
import { useGetUserReferralStats } from "@/queries/referralQueries";
import ReferralRewardEarned from "./ReferralRewardEarned";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { referralTerms } from "@/helpers/constants";
import { cn } from "@/lib/utils";

const ReferAndEarnContent = () => {
  const [toggleCodeInput, setToggleCodeInput] = useState(false);
  const referral = useAppSelector((state) => state.referral.referral);

  const { data, isLoading } = useGetUserReferralStats();

  const handleCopyToClipboard = async () => {
    if (referral?.code) {
      await navigator.clipboard.writeText(referral.code);
      toast.success("Code copied to clipboard");
    }
  };

  return (
    <DialogContent className="p-0 pb-6 max-h-full overflow-y-auto custom__scrollbar">
      <DialogHeader className="bg-primary rounded-b-3xl sm:rounded-lg sm:rounded-b-3xl p-4 pb-12 text-left">
        <DialogClose asChild>
          <Button variant={"ghost"} size={"icon"} className="text-white">
            <ArrowLeft />
          </Button>
        </DialogClose>

        <div className="flex justify-between">
          <div className="flex-1 flex flex-col justify-center px-4 space-y-2">
            <DialogTitle className="text-[28px] font-bold text-white leading-8">
              Refer & Earn
              <br />
              Rewards
            </DialogTitle>

            <div className="w-full">
              <Label className="font-medium text-white text-base">Code:</Label>

              <div className="flex items-center justify-between">
                {!toggleCodeInput ? (
                  <span className="font-medium text-xl text-white flex-1">
                    {referral?.code}
                  </span>
                ) : (
                  <ReferralCodeInput setToggleCodeInput={setToggleCodeInput} />
                )}

                {!toggleCodeInput ? (
                  <div className="flex items-center gap-1">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={handleCopyToClipboard}
                      className="size-6 hover:bg-transparent hover:text-white text-white"
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setToggleCodeInput(true)}
                      className="size-6 hover:bg-transparent hover:text-white text-white"
                    >
                      <PencilIcon className="size-4" />
                    </Button>

                    <RefreshReferralCode />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center ">
            <Image
              src={"/assets/images/dayflow_gifts.png"}
              alt="DayFlow Gifts"
              width={100}
              height={100}
              className="size-24 object-contain"
            />
          </div>
        </div>
      </DialogHeader>

      <div className="px-4 sm:px-8 -mt-10 sticky top-0 inset-x-0">
        <ReferralRewardEarned
          isLoading={isLoading}
          totalRewardsEarned={data?.stats.totalRewardsEarned}
        />
      </div>

      <div className="px-4 sm:px-8">
        <div>
          <Card className="rounded-2xl">
            <CardContent className="py-4">
              <p className="text-dark-primary-active font-medium text-base">
                Total Referrals
              </p>
              {isLoading ? (
                <Skeleton className="max-w-24 w-full h-10 rounded-2xl" />
              ) : (
                <p className="text-[32px] font-semibold text-primary">
                  {data?.stats.totalReferrals}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <Card className="rounded-2xl flex-1">
            <CardContent className="py-4">
              <p className="text-dark-primary-active font-medium text-base">
                Pro Purchase
              </p>
              {isLoading ? (
                <Skeleton className="max-w-24 w-full h-10 rounded-2xl" />
              ) : (
                <p className="text-[32px] font-semibold text-[#BF7C00]">
                  {data?.stats.proReferrals}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl flex-1">
            <CardContent className="py-4">
              <p className="text-dark-primary-active font-medium text-base">
                Premium Purchase
              </p>
              {isLoading ? (
                <Skeleton className="max-w-24 w-full h-10 rounded-2xl" />
              ) : (
                <p className="text-[32px] font-semibold text-[#0F8C04]">
                  {data?.stats.premiumReferrals}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        <p className="text-lg sm:text-xl font-mada-semibold text-black mb-2">
          How it works
        </p>

        <Card>
          <CardContent className="pb-0 py-3 flex items-center justify-between gap-1">
            <div className="flex flex-col items-center gap-1">
              <Share2Icon className="size-6" />
              <span className="font-medium text-dark-primary text-base text-center">
                Share code
              </span>
            </div>

            <div className="h-px max-w-4 w-full border border-dashed border-tab-item-gray"></div>

            <div className="flex flex-col items-center gap-1">
              <Link className="size-6" />
              <span className="font-medium text-dark-primary text-base text-center">
                Friends join
              </span>
            </div>

            <div className="h-px max-w-4 w-full border border-dashed border-tab-item-gray"></div>

            <div className="flex flex-col items-center gap-1">
              <IndianRupeeIcon className="size-6" />
              <span className="font-medium text-dark-primary text-base text-center">
                Earn reward
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 sm:px-8">
        <p className="text-lg sm:text-xl font-mada-semibold text-black mb-2">
          Terms and Conditions
        </p>

        <div className="space-y-1">
          {referralTerms.map((item, i) => (
            <div
              key={i}
              className={cn(
                "px-4 py-5 bg-white border border-input-border rounded-[4px]",
                i === 0 && "rounded-t-2xl",
                referralTerms.length - 1 === i && "rounded-b-2xl"
              )}
            >
              <p className="text-base text-dark-primary">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );
};

export default ReferAndEarnContent;
