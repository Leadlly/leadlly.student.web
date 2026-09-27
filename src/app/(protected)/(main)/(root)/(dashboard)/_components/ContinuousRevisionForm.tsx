"use client";

import { NewTopicLearntSchema } from "@/schemas/newTopicLearntSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader2, Loader2Icon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ISubject, Item } from "@/helpers/types";
import { saveStudyData } from "@/actions/studyData_actions";
import { updatePlanner } from "@/actions/planner_actions";
import { NestedMultiSelect } from "@/components/ui/nested-multi-select";
import { getChapters, getTopicsWithSubtopic } from "@/actions/question_actions";
import { useQueryClient } from "@tanstack/react-query";

const ContinuousRevisionForm = ({
  activeSubject,
  userStandard,
  setActiveSubject,
  userSubjects,
  onComplete,
}: {
  activeSubject: string;
  setActiveSubject: (activeSubject: string) => void;
  userStandard: number;
  userSubjects: ISubject[];
  onComplete?: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Item[]>([]);
  const [activeTabChapters, setActiveTabChapters] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NewTopicLearntSchema>>({
    resolver: zodResolver(NewTopicLearntSchema),
  });

  const selectedChapter = form.watch("chapterName");

  useEffect(() => {
    const fetchChapters = async () => {
      if (activeSubject && userStandard) {
        setIsLoading(true);
        try {
          const data = await getChapters(activeSubject, userStandard);
          const chapters = (data?.chapters ?? []).filter((chapter: { subjectName?: string }) => {
            if (!chapter.subjectName) return true;
            return chapter.subjectName.toLowerCase() === activeSubject.toLowerCase();
          });
          setActiveTabChapters({ ...data, chapters });
        } catch (error: any) {
          toast.error("Error fetching chapters", {
            description: error.message,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChapters();
  }, [activeSubject, userStandard]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (activeSubject && userStandard && selectedChapter?._id) {
        try {
          const data = await getTopicsWithSubtopic(
            activeSubject,
            userStandard,
            selectedChapter._id
          );
          setTopics(data);
        } catch (error: any) {
          toast.error("Error fetching topics", {
            description: error.message,
          });
        }
      }
    };

    fetchTopics();
  }, [activeSubject, userStandard, selectedChapter?._id]);

  useEffect(() => {
    form.reset({
      chapterName: null,
      topicNames: [],
    });
  }, [activeSubject, form]);

  const onSubmit = async (data: z.infer<typeof NewTopicLearntSchema>) => {
    setIsSubmitting(true);

    const formattedData = {
      tag: "continuous_revision",
      topics: data.topicNames.map((topic) => ({
        _id: topic._id,
        name: topic.name,
        subtopics: topic.subItems,
      })),
      chapter: {
        _id: data?.chapterName?._id,
        name: data?.chapterName?.name,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      const responseData = await saveStudyData(formattedData);

      await updatePlanner();
      queryClient.invalidateQueries({ queryKey: ["plannerData"] });
      toast.success(responseData.message);

      form.reset({
        chapterName: null,
        topicNames: [],
      });
      setSelectedValues([]);

      const currentIndex = userSubjects.findIndex((subject) => subject.name === activeSubject);
      const nextSubject = userSubjects[currentIndex + 1];
      if (nextSubject) {
        setActiveSubject(nextSubject.name);
      } else {
        onComplete?.();
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-3">
      <div className="flex w-full rounded-full bg-[#E8E4F0] p-1">
        {userSubjects.map((subject) => (
          <button
            key={subject.name}
            type="button"
            onClick={() => setActiveSubject(subject.name)}
            className={cn(
              "h-9 flex-1 rounded-full text-sm font-bold capitalize",
              activeSubject === subject.name
                ? "bg-white text-primary shadow-sm"
                : "text-secondary-text"
            )}
          >
            {subject.name}
          </button>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <p className="ml-1 text-sm font-bold">Chapter</p>
                <Popover
                  open={chapterPopoverOpen}
                  onOpenChange={setChapterPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "h-11 w-full justify-between rounded-xl text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="flex-1 truncate">
                          {field.value
                            ? activeTabChapters?.chapters?.find(
                                (chapter: any) =>
                                  chapter._id === field.value?._id
                              )?.name
                            : "Select chapter"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search chapter..." />
                      <CommandList className="custom__scrollbar">
                        <CommandEmpty>No chapter found.</CommandEmpty>
                        <CommandGroup>
                          {isLoading ? (
                            <CommandItem>
                              <Loader2Icon className="animate-spin size-4" />
                            </CommandItem>
                          ) : (
                            activeTabChapters?.chapters?.map((chapter: any) => (
                              <CommandItem
                                value={chapter.name}
                                key={chapter._id}
                                onSelect={() => {
                                  form.setValue("chapterName", {
                                    _id: chapter._id,
                                    name: chapter.name,
                                  });
                                  setChapterPopoverOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    chapter._id === field.value?._id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {chapter.name}
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topicNames"
            render={({ field }) => (
              <FormItem>
                <p className="ml-1 text-sm font-bold">Topics</p>
                <FormControl>
                  <NestedMultiSelect
                    options={
                      topics?.topics?.map((topic: any) => ({
                        _id: topic._id,
                        name: topic.name,
                        subItems: topic.subtopics,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    placeholder="Select topics"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-full text-sm font-semibold"
          >
            {isSubmitting ? (
              <span className="flex items-center text-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContinuousRevisionForm;
