import { TDayProps, TQuizQuestionProps, TRevisionProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { Check, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TTopicProps extends TRevisionProps {
  isSubtopic?: boolean;
}

const ToDoListButton = ({
  index,
  topicsLength,
  topic,
  setTopic,
  setOpenQuestionDialogBox,
  quizData,
}: {
  index: number;
  topicsLength: number;
  topic: TTopicProps;
  completedTopics: any[];
  incompleteTopics: any[];
  setOpenQuestionDialogBox: (openQuestionDialogBox: boolean) => void;
  setTopic: (
    topic: { name: string; _id: string; isSubtopic: boolean } | null
  ) => void;
  quizData: TDayProps;
}) => {
  const [isNoQuestionAvailable, setIsNoQuestionAvailable] = useState(false);

  const { dailyQuizzes } = useAppSelector((state) => state.dailyQuizzes);

  const dailyQuizCurrentTopic = dailyQuizzes.find(
    (quiz) =>
      quiz.topicName ===
      (topic.isSubtopic ? topic.subtopic.name : topic.topic.name)
  );

  const completedTopics = quizData.completedTopics;
  const incompleteTopics = quizData.incompletedTopics;
  const totalQuestions =
    quizData.questions?.[
      topic.isSubtopic ? topic.subtopic.name : topic.topic.name
    ]?.length;

  const handleCheckboxClick = (
    topic: string,
    topicId: string,
    isSubtopic: boolean
  ) => {
    setTopic({ name: topic, _id: topicId, isSubtopic });

    const topicQuestions: TQuizQuestionProps[] = quizData?.questions?.[topic];

    if (!topicQuestions || topicQuestions.length === 0) {
      setIsNoQuestionAvailable(true);
    } else {
      setOpenQuestionDialogBox(true);
    }
  };

  return (
    <li
      onClick={() =>
        handleCheckboxClick(
          topic.isSubtopic ? topic.subtopic.name : topic.topic.name,
          topic.isSubtopic ? topic.subtopic.id : topic.topic.id,
          topic.isSubtopic ? true : false
        )
      }
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-[22px] bg-[#F6F3FB] px-4 py-3.5",
        (completedTopics &&
          completedTopics?.length &&
          completedTopics?.includes(
            topic.isSubtopic ? topic.subtopic.id : topic.topic.id
          )) ||
          isNoQuestionAvailable
          ? "pointer-events-none opacity-70"
          : ""
      )}
    >
      <div className="flex items-start gap-x-2 w-full py-1 ">
        {incompleteTopics &&
        incompleteTopics.length > 0 &&
        incompleteTopics.includes(
          topic.isSubtopic ? topic.subtopic.id : topic.topic.id
        ) ? (
          <span className="text-[#B87A07] font-medium text-xs">
            <span className="font-semibold text-lg">
              {dailyQuizCurrentTopic?.attemptedQuestions &&
              dailyQuizCurrentTopic.attemptedQuestions.length > 0
                ? dailyQuizCurrentTopic?.attemptedQuestions.length
                : 0}
            </span>
            /{totalQuestions}
          </span>
        ) : (
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#C4B5FD] p-1 text-white",
              (completedTopics &&
                completedTopics.length > 0 &&
                completedTopics.includes(
                  topic.isSubtopic ? topic.subtopic.id : topic.topic.id
                )) ||
                isNoQuestionAvailable
                ? "bg-[#0FD679]/80 border-none"
                : ""
            )}
          >
            {(completedTopics &&
              completedTopics.length > 0 &&
              completedTopics.includes(
                topic.isSubtopic ? topic.subtopic.id : topic.topic.id
              )) ||
            isNoQuestionAvailable ? (
              <Check className="w-4 h-4" />
            ) : null}
          </span>
        )}

        <div className="capitalize text-sm md:text-base font-medium flex-1">
          <p className="leading-tight">
            {topic.isSubtopic ? topic.subtopic.name : topic.topic.name}
          </p>

          {incompleteTopics &&
          incompleteTopics.length > 0 &&
          incompleteTopics.includes(
            topic.isSubtopic ? topic.subtopic.id : topic.topic.id
          ) ? (
            <Progress
              value={
                (dailyQuizCurrentTopic &&
                dailyQuizCurrentTopic.attemptedQuestions &&
                dailyQuizCurrentTopic.attemptedQuestions.length > 0
                  ? dailyQuizCurrentTopic?.attemptedQuestions.length /
                    totalQuestions
                  : 0) * 100
              }
              className="h-[6px] mt-1"
              indicatorClassName="bg-[#B87A07]"
            />
          ) : null}
        </div>
      </div>

      <div className="size-6 grid place-items-center">
        <ChevronRightIcon className="size-4" />
      </div>
    </li>
  );
};

export default ToDoListButton;
