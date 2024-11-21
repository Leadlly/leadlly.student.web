import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "../../../../../public/assets/images/customizequiz.png";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import CustomInput from "./CustomInput";
import { toast } from "sonner";
import { getSubjectChapters, getChapterTopics } from "@/actions/question_actions";
import { useAppSelector } from "@/redux/hooks";
import { createCustomQuiz } from "@/actions/custom_quiz_actions";
import { IAcademic, subjectChaptersProps, Topic } from "../types";
import { TCustomQuizProps } from "@/helpers/types/index";

const CustomizedQuiz = () => {
  const userAcademic = useAppSelector((state) => state.user.user?.academic as IAcademic);
  const [quizState, setQuizState] = useState<TCustomQuizProps>({
    subject: "",
    chapters: [],
    topics: [],
    numberOfQuestions: "",
  });
  const [chaptersData, setChaptersData] = useState<subjectChaptersProps["chapters"]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    const savedDraftCount = localStorage.getItem("draftCount");
    if (savedDraftCount) {
      setDraftCount(parseInt(savedDraftCount, 10));
    }
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      // if (!quizState.subject || !userAcademic?.standard) return;
      // setIsLoading(true);
      try {
        const data = await getSubjectChapters(quizState.subject, userAcademic.standard);
        if (data?.chapters) {
          setChaptersData(data.chapters);
        }
      } catch (error) {
        toast.error("Unable to fetch chapters!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapters();
  }, [quizState.subject, userAcademic?.standard]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!quizState.subject || quizState.chapters.length === 0 || !userAcademic?.standard) return;
      setIsLoading(true);
      try {
        const data = await getChapterTopics(
          quizState.subject,
          quizState.chapters[0], 
          userAcademic.standard
        );
        setTopics(data.topics);
      } catch (error) {
        toast.error("Unable to fetch topics!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [quizState.subject, quizState.chapters, userAcademic?.standard]);

  const handleSaveAsDraft = () => {
    const newDraftCount = draftCount + 1;
    setDraftCount(newDraftCount);
    localStorage.setItem("draftCount", newDraftCount.toString());
    toast.success("Draft saved successfully!");
  };

  const handleCreateQuiz = async () => {
    if (!quizState.subject || quizState.chapters.length === 0 || quizState.topics.length === 0) {
      toast.error("Please select subject, chapters, and topics.");
      return;
    }
    setCreatingQuiz(true);
    try {
      const response = await createCustomQuiz({
        ...quizState,
        subjects: [quizState.subject],
        numberOfQuestions: parseInt(quizState.numberOfQuestions) || undefined,
      });
      if (response.success) {
        toast.success("Custom quiz created successfully!");
      } else {
        toast.error(response.message || "Failed to create custom quiz.");
      }
    } catch (error) {
      toast.error(`Error creating quiz: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
    } finally {
      setCreatingQuiz(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-[#F4EBFF] max-w-80 lg:w-80">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-medium">Customized Quiz</h1>
        <h1 className="text-[#9654F4] font-medium">Draft({draftCount})</h1>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="subjectName" className="font-medium text-sm">
          Subject Name
        </label>
        <select
          id="subjectName"
          value={quizState.subject}
          onChange={(e) =>
            setQuizState((prev) => ({
              ...prev,
              subject: e.target.value,
              chapters: [],
              topics: [],
            }))
          }
          className="border border-gray-300 rounded p-2"
        >
          <option value="" disabled>
            Select Subject
          </option>
          {userAcademic?.subjects?.map((subject) => (
            <option key={subject.name} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <MultiSelect
        options={chaptersData.map((chapter) => ({
          _id: chapter._id,
          name: chapter.name,
        }))}
        onValueChange={(selectedChapters) =>
          setQuizState((prev) => ({
            ...prev,
            chapters: selectedChapters,
            topics: [], 
          }))
        }
        defaultValue={quizState.chapters}
        placeholder="Select Chapters"
        maxCount={3}
      />

      <MultiSelect
        options={topics.map((topic) => ({
          _id: topic._id,
          name: topic.name,
        }))}
        onValueChange={(selectedTopics) =>
          setQuizState((prev) => ({
            ...prev,
            topics: selectedTopics,
          }))
        }
        defaultValue={quizState.topics}
        placeholder="Select Topics"
        maxCount={5}
      />

      <CustomInput
        type="number"
        value={quizState.numberOfQuestions}
        onChange={(e) =>
          setQuizState((prev) => ({
            ...prev,
            numberOfQuestions: e.target.value,
          }))
        }
        label="Number of Questions"
        placeholder="Enter Number of Questions"
      />

      <div className="grid grid-cols-2 gap-3 w-full">
        <Button variant="outline" onClick={handleSaveAsDraft}>
          Save as Draft
        </Button>
        <Button onClick={handleCreateQuiz} disabled={creatingQuiz || isLoading}>
          {creatingQuiz ? "Creating..." : "Create Now"}
        </Button>
      </div>

      <p className="text-xs md:text-sm font-medium text-center">
        Click 'Create Now' to generate your custom quiz!
      </p>

      <Image src={icon} width={130} height={130} alt="customize quiz" />
    </div>
  );
};

export default CustomizedQuiz;
