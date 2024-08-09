import { toggleErrorNote } from "@/actions/error_book_actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

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
  const [isPending, startTransaction] = useTransition();
  const [optimisticNote, toggleNote] = useOptimistic(
    { isCompleted, note, id },
    (state, { isCompleted }: { isCompleted: boolean }) => ({
      ...state,
      isCompleted,
    })
  );
  async function handleToggle(isCompleted: boolean) {
    try {
      console.log(isCompleted);
      if (isCompleted === false) return;
      toggleNote({ isCompleted });
      await toggleErrorNote({ errorNoteId: id });
    } catch (error) {
      toast.error("failed to toggle error note try again...");
    }
  }
  return (
    <div
      className={cn(
        "border flex items-center justify-start bg-[#ffffff] rounded-lg gap-5 px-3 py-4 mb-4 border-[#b690ec] ",
        isMinimized ? "text-xs py-2" : ""
      )}
      style={{ boxShadow: "0px 0px 16.8px 0px #9654F42E" }}
    >
      <Checkbox
        id={id}
        checked={optimisticNote.isCompleted}
        onCheckedChange={(checked) =>
          !optimisticNote.isCompleted &&
          startTransaction(() => handleToggle(checked as boolean))
        }
      />
      <Label className=" line-clamp-2  cursor-pointer max-w-60" htmlFor={id}>
        {note}
      </Label>
    </div>
  );
};

export default ErrorCard;
