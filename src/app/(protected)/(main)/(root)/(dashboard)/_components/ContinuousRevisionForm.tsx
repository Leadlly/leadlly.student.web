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
import { LeftArrowIcon } from "@/components";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ISubject, Item } from "@/helpers/types";
import { saveStudyData } from "@/actions/studyData_actions";
import { updatePlanner } from "@/actions/planner_actions";
import { NestedMultiSelect } from "@/components/ui/nested-multi-select";
import {
  getChapters,
  getTopicsWithSubtopic,
} from "@/actions/question_actions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

const ContinuousRevisionForm = ({
  activeSubject,
  userStandard,
  setActiveSubject,
  userSubjects,
}: {
  activeSubject: string;
  setActiveSubject: (activeSubject: string) => void;
  userStandard: number;
  userSubjects: ISubject[];
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Item[]>([]);
  const [activeTabChapters, setActiveTabChapters] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          setActiveTabChapters(data);
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
          const data = await getTopicsWithSubtopic(activeSubject, userStandard, selectedChapter._id);
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
      toast.success(responseData.message);

      form.reset({
        chapterName: null,
        topicNames: [],
      });
      setSelectedValues([]);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-3">
      <div className="flex items-center justify-between w-full">
        {userSubjects.map((subject) => (
          <Button
            key={subject.name}
            variant={"outline"}
            size={"sm"}
            onClick={() => setActiveSubject(subject.name)}
            className={cn(
              "capitalize",
              activeSubject === subject.name &&
                "border-primary bg-primary/10 text-primary font-semibold hover:text-primary hover:bg-primary/15"
            )}
          >
            {subject.name}
          </Button>
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
                          "w-full justify-between text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="flex-1 truncate">
                                                  {field.value
                          ? activeTabChapters?.chapters?.find(
                              (chapter: any) => chapter._id === field.value?._id
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

          <DialogFooter className="flex items-center sm:justify-between w-full">
            <DialogClose asChild>
              <Button
                type="button"
                variant={"outline"}
                className="gap-x-2"
                onClick={() => {
                  setActiveSubject("");
                  form.setValue("chapterName", null);
                  form.setValue("topicNames", []);
                }}
              >
                <LeftArrowIcon className="w-2 h-2" />
                Back
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center text-sm">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default ContinuousRevisionForm;
