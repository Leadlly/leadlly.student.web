"use client";

import React, { useState, useEffect } from "react";
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
import { getUserReferralStats } from "@/actions/referral_actions";
import ReferralRewardEarned from "./ReferralRewardEarned";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ReferAndEarnContent = ({ className }: { className?: string }) => {
  const [toggleCodeInput, setToggleCodeInput] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const referral = useAppSelector((state) => state.referral.referral);

  useEffect(() => {
    const fetchReferralStats = async () => {
      setIsLoading(true);
      try {
        const result = await getUserReferralStats();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching referral stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralStats();
  }, []);

  const handleCopyToClipboard = async () => {
    if (referral?.code) {
      await navigator.clipboard.writeText(referral.code);
      toast.success("Code copied to clipboard");
    }
  };

  const handleShareCode = async () => {
    if (!referral?.code) return;
    const appLink = "https://play.google.com/store/apps/details?id=com.leadlly.app";
    const message = `Hey !!
I know how stressful and confusing JEE/NEET prep can get sometimes - I've been through it too.
That's why I wanted to share something that could actually make your preparation smoother.

Check out LEADLLY - it helps you manage your self-study, track your revision, and stay consistent. Just like having your own study mentor.

I've got a special code for you: ${referral.code}

This gives you ${referral.discountValue}% off on the subscription.

Download the app here: ${appLink}
Use the code when checking out and start managing your self-study better!`;

    if (navigator.share) {
      await navigator.share({ title: "Referral Code", text: message });
      return;
    }
    await navigator.clipboard.writeText(message);
    toast.success("Referral message copied");
  };

  return (
    <DialogContent
      className={cn(
        "custom__scrollbar !inset-auto !bottom-4 !left-4 !right-4 !top-4 !h-auto !max-h-none !w-auto !max-w-none !translate-x-0 !translate-y-0 overflow-y-auto p-0 pb-6 md:!left-24 xl:!left-[277px]",
        className
      )}
    >
        <DialogHeader className="rounded-b-3xl bg-leadlly p-4 pb-12 text-left sm:rounded-lg sm:rounded-b-3xl">
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
        <Card className="rounded-[20px] border-primary/10">
          <CardContent className="py-4">
            <p className="text-base font-medium text-dark-primary-active">Total Referrals</p>
            {isLoading ? (
              <Skeleton className="mt-2 h-10 w-full max-w-24 rounded-2xl" />
            ) : (
              <p className="text-[32px] font-semibold text-primary">
                {data?.stats.totalReferrals ?? 0}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="px-4 sm:px-8">
        <p className="text-lg sm:text-xl font-mada-semibold text-black mb-2">
          How it works
        </p>

        <Card className="rounded-[20px] border-primary/10">
          <CardContent className="flex items-center justify-between gap-1 py-4">
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
          {isLoading ? (
            <Skeleton className="h-24 w-full rounded-2xl" />
          ) : (data?.content?.terms ?? []).length ? (
            (data.content.terms as string[]).map((item, i, terms) => (
              <div
                key={i}
                className={cn(
                  "rounded-[4px] border border-input-border bg-white px-4 py-5",
                  i === 0 && "rounded-t-2xl",
                  terms.length - 1 === i && "rounded-b-2xl"
                )}
              >
                <p className="text-base text-dark-primary">{item}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-secondary-text">
              Terms will appear once referral details load.
            </p>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 flex items-center gap-4 bg-white px-4 py-3 sm:px-8">
        <Button
          type="button"
          variant="outline"
          onClick={handleCopyToClipboard}
          className="h-12 flex-1 rounded-2xl border-[1.5px] border-primary text-base font-medium text-primary"
        >
          Copy
          <CopyIcon className="size-4" />
        </Button>
        <Button
          type="button"
          onClick={handleShareCode}
          className="h-12 flex-1 rounded-2xl text-base font-medium"
        >
          Share
          <Share2Icon className="size-4" />
        </Button>
      </div>
    </DialogContent>
  );
};

export default ReferAndEarnContent;
