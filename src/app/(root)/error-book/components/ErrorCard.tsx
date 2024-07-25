import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ErrorCardProps {
  note: string;
  id: string;
  isCompleted: boolean;
  isMinimized?: boolean;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
  isCompleted,
  note,
  id,
  isMinimized = true,
}) => {
  return (
    <div
      className={cn("border flex items-center justify-start bg-[#ffffff] rounded-lg gap-5 px-3 py-4 mb-4 border-[#b690ec] ", isMinimized?'text-xs py-2':'')}
      style={{ boxShadow: "0px 0px 16.8px 0px #9654F42E" }}
    >
      <Checkbox id={id} checked={isCompleted} />
      <label className=" line-clamp-2 " htmlFor={id}>
        {note}
      </label>
    </div>
  );
};

export default ErrorCard;
