import React, { useState } from "react";
import { Skeleton } from "../../ui/skeleton";
import { currency_formatter } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [cashOutOpen, setCashOutOpen] = useState(false);
  const [upiId, setUpiId] = useState("");

  const handleCashOut = async () => {
    if (!upiId.trim()) return;
    setRequestMessage("");
    setIsPending(true);
    try {
      const res = await requestCashOut({ upiId: upiId.trim() });
      setRequestMessage(
        `${res.message}. Your request will be reviewed shortly and our team will contact you. For any query contact support@leadlly.in`
      );
      setCashOutOpen(false);
      setUpiId("");
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
          onClick={() => setCashOutOpen(true)}
          disabled={!totalRewardsEarned}
          className="h-8 w-full max-w-20 rounded-xl font-semibold"
        >
          Cash Out
        </Button>
      </CardContent>

      {cashOutOpen ? (
        <CardFooter className="flex flex-col items-stretch gap-2">
          <p className="text-base font-semibold">Enter your UPI Id</p>
          <Input
            value={upiId}
            onChange={(event) => setUpiId(event.target.value)}
            placeholder="Your UPI Id"
          />
          <Button
            onClick={handleCashOut}
            disabled={!upiId.trim() || isPending}
            className="h-11 w-full rounded-lg"
          >
            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : "Submit"}
          </Button>
        </CardFooter>
      ) : null}

      {requestMessage ? (
        <CardFooter className="text-sm font-medium text-green-500">
          {requestMessage}
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ReferralRewardEarned;
