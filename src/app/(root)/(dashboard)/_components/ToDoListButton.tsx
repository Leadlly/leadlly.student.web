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
  completedTopics: any[];
  incompleteTopics: any[];
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
        "flex items-start justify-between",
        (completedTopics || incompleteTopics) &&
          (completedTopics?.length || incompleteTopics?.length) &&
          (completedTopics?.includes(topic.topic.name) ||
            incompleteTopics?.includes(topic.topic.name)) &&
          "pointer-events-none opacity-70"
      )}
    >
      <li
        className="flex items-start gap-x-2 w-full py-1 cursor-pointer"
        onClick={() => handleCheckboxClick(topic.topic.name, topic._id)}
      >
        <span
          className={cn(
            "h-4 w-4 md:h-[18px] md:w-[18px] p-1 text-white border-2 rounded border-[#787878] flex items-center justify-center mt-[2px]",
            completedTopics &&
              completedTopics.length > 0 &&
              completedTopics.includes(topic.topic.name) &&
              "bg-[#0FD679]/80 border-none",
            incompleteTopics &&
              incompleteTopics.length > 0 &&
              incompleteTopics.includes(topic.topic.name) &&
              "bg-[#ff2e2e]/80 border-none"
          )}
        >
          {completedTopics &&
            completedTopics.length > 0 &&
            completedTopics.includes(topic.topic.name) && (
              <Check className="w-4 h-4" />
            )}

          {incompleteTopics &&
            incompleteTopics.length > 0 &&
            incompleteTopics.includes(topic.topic.name) && (
              <span className="leading-tight text-sm font-semibold">!</span>
            )}
        </span>

        <div className="capitalize text-sm md:text-base font-medium">
          <p className="leading-tight">{topic.topic.name}</p>
        </div>
      </li>
      {completedTopics &&
        completedTopics.length > 0 &&
        completedTopics.includes(topic.topic.name) && (
          <div className="text-[10px] py-[2px] px-1 bg-[#0FD679]/80 text-white rounded capitalize mt-1.5">
            <p>completed</p>
          </div>
        )}
      {incompleteTopics &&
        incompleteTopics.length > 0 &&
        incompleteTopics.includes(topic.topic.name) && (
          <div className="text-[10px] py-[2px] px-1 bg-[#ff2e2e]/80 text-white rounded capitalize mt-1.5">
            <p>incomplete</p>
          </div>
        )}
    </div>
  );
};

export default ToDoListButton;
