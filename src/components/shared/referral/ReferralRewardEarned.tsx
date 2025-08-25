import React, { useState } from "react";
import { Skeleton } from "../../ui/skeleton";
import { currency_formatter } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { requestCashOut } from "@/actions/referral_actions";
import { Loader2Icon } from "lucide-react";

const ReferralRewardEarned = ({
  isLoading,
  totalRewardsEarned,
}: {
  isLoading: boolean;
  totalRewardsEarned?: number;
}) => {
  const [requestMessage, setRequestMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleCashOut = async () => {
    setRequestMessage("");
    setIsPending(true);
    try {
      const res = await requestCashOut();
      setRequestMessage(
        `${res.message}.\nYour Request will be reviewed shortly and our team will contact you. For any query contact support@leadlly.in`
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred while processing your request.");
      }
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Card className="rounded-2xl">
      <CardContent className="py-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-dark-primary-active text-base">
            Reward Earned
          </p>

          {isLoading ? (
            <Skeleton className="max-w-24 w-full h-12 rounded-2xl" />
          ) : (
            <p className="font-semibold text-primary text-[32px]">
              {currency_formatter({
                amount: totalRewardsEarned ?? 0,
              })}
            </p>
          )}
        </div>

        <Button
          onClick={handleCashOut}
          disabled={isPending || !totalRewardsEarned}
          className="font-semibold max-w-20 w-full h-8"
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin text-white" />
          ) : (
            "Cash Out"
          )}
        </Button>
      </CardContent>

      {requestMessage ? (
        <CardFooter className="text-sm font-medium text-green-500">
          {requestMessage}
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ReferralRewardEarned;
