import { TRevisionProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const ToDoListButton = ({
  topic,
  setTopic,
  setOpenQuestionDialogBox,
  completedTopics,
  incompleteTopics,
}: {
  topic: TRevisionProps;
  completedTopics: { expiryDate: number; value: string[] };
  incompleteTopics: { expiryDate: number; value: string[] };
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  setTopic: (topic: { name: string; _id: string } | null) => void;
}) => {
  const handleCheckboxClick = (topic: string, topicId: string) => {
    setTopic({ name: topic, _id: topicId });
    setOpenQuestionDialogBox(true);
  };
  return (
    <div
      key={topic._id}
      className={cn(
        "flex items-center justify-between",
        (completedTopics || incompleteTopics) &&
          (completedTopics?.value.length || incompleteTopics?.value.length) &&
          (completedTopics?.value.includes(topic._id!) ||
            incompleteTopics?.value.includes(topic._id!)) &&
          "pointer-events-none opacity-70"
      )}
    >
      <li
        className="flex items-start gap-2 w-full py-1 cursor-pointer"
        onClick={() => handleCheckboxClick(topic.topic.name, topic._id)}
      >
        <div
          className={cn(
            "h-4 w-4 md:h-[18px] md:w-[18px] text-white border-2 rounded border-[#787878] grid place-items-center mt-[2px]",
            completedTopics &&
              completedTopics.value.length > 0 &&
              completedTopics.value.includes(topic._id) &&
              "bg-[#0FD679]/80 border-none",
            incompleteTopics &&
              incompleteTopics.value.length > 0 &&
              incompleteTopics.value.includes(topic._id) &&
              "bg-[#ff2e2e]/80 border-none"
          )}
        >
          {completedTopics &&
            completedTopics.value.length > 0 &&
            completedTopics.value.includes(topic._id) && (
              <Check className="w-3 h-3" />
            )}

          {incompleteTopics &&
            incompleteTopics.value.length > 0 &&
            incompleteTopics.value.includes(topic._id) && (
              <span className="leading-tight text-xs font-semibold">!</span>
            )}
        </div>

        <div className="capitalize text-sm md:text-base font-medium">
          <p>{topic.topic.name}</p>
        </div>
      </li>
      {completedTopics &&
        completedTopics.value.length > 0 &&
        completedTopics.value.includes(topic._id) && (
          <div className="text-[10px] py-[2px] px-1 bg-[#0FD679]/80 text-white rounded capitalize">
            <p>completed</p>
          </div>
        )}
      {incompleteTopics &&
        incompleteTopics.value.length > 0 &&
        incompleteTopics.value.includes(topic._id) && (
          <div className="text-[10px] py-[2px] px-1 bg-[#ff2e2e]/80 text-white rounded capitalize">
            <p>incomplete</p>
          </div>
        )}
    </div>
  );
};

export default ToDoListButton;
