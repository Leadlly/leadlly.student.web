import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import JoinedClasses from "./JoinedClasses";
import AllClasses from "./AllClasses";

const Institute = () => {
  const [selectedTab, setSelectedTab] = useState("joined classes");

  const { institute } = useAppSelector((state) => state.institute);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-xl justify-between h-auto w-full px-2"
        >
          <div className="w-full flex items-center justify-between gap-2 min-w-0">
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "size-14 grid place-items-center shadow rounded-full flex-shrink-0",
                  !institute?.logo?.url && "bg-primary/10"
                )}
              >
                {institute?.logo && institute.logo.url ? (
                  <Image
                    src={institute.logo.url}
                    alt={`${institute.name}'s Logo`}
                    width={30}
                    height={30}
                  />
                ) : (
                  <p className="font-bold text-primary text-2xl">
                    {institute?.name?.charAt(0)}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="font-semibold text-lg truncate w-full text-left">
                  {institute?.name}
                </span>
                <span className="text-sm w-full text-left">
                  View classes and resources
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center flex-shrink-0">
              <ChevronRight size={16} />
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] h-full flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>

            <DialogTitle className="font-semibold text-2xl">
              Your Institute
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Your Institute
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "size-14 grid place-items-center rounded-full flex-shrink-0",
              !institute?.logo?.url && "bg-primary/10"
            )}
          >
            {institute?.logo && institute.logo.url ? (
              <Image
                src={institute.logo.url}
                alt={`${institute.name}'s Logo`}
                width={30}
                height={30}
              />
            ) : (
              <p className="font-bold text-primary text-2xl">
                {institute?.name?.trim()?.charAt(0)}
              </p>
            )}
          </div>
          <div className="min-w-0 font-semibold text-xl text-left break-words">
            {institute?.name}
          </div>
        </div>

        <ul className="w-full flex items-center gap-2 border-b">
          {["joined classes", "all classes"].map((item, index) => (
            <li
              key={index}
              className={cn(
                "flex-1 text-center text-base font-semibold cursor-pointer capitalize py-2",
                selectedTab === item && "border-b-2 border-primary"
              )}
              onClick={() => setSelectedTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex-1 overflow-y-auto custom__scrollbar">
          {selectedTab === "joined classes" ? (
            <JoinedClasses instituteId={institute?._id} />
          ) : (
            <AllClasses instituteId={institute?._id} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Institute;
