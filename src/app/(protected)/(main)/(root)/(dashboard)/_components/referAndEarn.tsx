import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IndianRupee } from "lucide-react";
import ReferAndEarnContent from "@/components/shared/referral/ReferAndEarnContent";

const ReferAndEarn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-auto w-full justify-between rounded-full px-3"
        >
          <span className="flex items-center gap-2">
            <div className="size-14 grid place-items-center">
              <IndianRupee />
            </div>
            <span className="font-semibold text-lg truncate w-full text-left">
              Refer And Earn
            </span>
          </span>
        </Button>
      </DialogTrigger>

      <ReferAndEarnContent />
    </Dialog>
  );
};

export default ReferAndEarn;
