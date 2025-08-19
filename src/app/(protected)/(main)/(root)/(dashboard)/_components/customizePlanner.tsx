import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDaysIcon } from "lucide-react";
import React from "react";

const CustomizePlanner = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-xl justify-between h-auto w-full px-2"
        >
          <span className="flex items-center gap-2">
            <div className="size-14 grid place-items-center">
              <CalendarDaysIcon />
            </div>
            <span className="font-semibold text-lg truncate w-full text-left">
              Customize Your Planner
            </span>
          </span>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default CustomizePlanner;
