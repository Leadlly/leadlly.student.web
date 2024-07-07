"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Check, ChevronDown, Loader2 } from "lucide-react";

import { LeftArrowIcon, MenuIcon } from "@/components";
import { Button } from "@/components/ui/button";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MultiSelect } from "@/components/ui/multi-select";

import {
  getChapterTopics,
  getSubjectChapters,
} from "@/actions/question_actions";

import { subjectChaptersProps } from "@/helpers/types";

import { toast } from "sonner";
import { saveStudyData } from "@/actions/studyData_actions";
import { getPlanner, updatePlanner } from "@/actions/planner_actions";
import { useRouter } from "next/navigation";

const NewTopicLearntSchema = z.object({
  chapterName: z.string({ required_error: "Please select a chapter!" }),
  topicNames: z
    .string({ required_error: "Please select at least one topic" })
    .array()
    .min(1, { message: "Please select at least one topic" })
    .default([]),
});

const NewTopicLearnt = ({
  setNewTopicLearnt,
  userSubjects,
  userStandard,
}: {
  setNewTopicLearnt: (newTopicLearnt: boolean) => void;
  userSubjects: string[];
  userStandard: number;
}) => {
  const [activeSubject, setActiveSubject] = useState("maths");
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);
  const [topics, setTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof NewTopicLearntSchema>>({
    resolver: zodResolver(NewTopicLearntSchema),
  });

  const selectedChapter = form.watch("chapterName");

  const onSubmit = async (data: z.infer<typeof NewTopicLearntSchema>) => {
    setIsSubmitting(true);

    const formattedData = {
      tag: "continuous_revision",
      topics: data.topicNames.map((topic) => ({ name: topic })),
      chapter: {
        name: data.chapterName,
      },
      subject: activeSubject,
      standard: userStandard,
    };

    try {
      const responseData = await saveStudyData(formattedData);

      toast.success(responseData.message);

      await updatePlanner();

      form.reset();

      router.refresh();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const chapters = async () => {
      try {
        const data = await getSubjectChapters(activeSubject, userStandard);

        setActiveTabChapters(data.chapters);
      } catch (error: any) {
        toast.error("Unable to fetch chapters!", {
          description: error.message,
        });
      }
    };

    chapters();
  }, [activeSubject, userStandard]);

  useEffect(() => {
    const topics = async () => {
      try {
        const data = await getChapterTopics(
          activeSubject,
          selectedChapter,
          userStandard
        );
        setTopics(data.topics);
      } catch (error: any) {
        toast.error("Unable to fetch topics!", {
          description: error.message,
        });
      }
    };

    topics();
  }, [activeSubject, selectedChapter, userStandard]);

  return (
    <div className="w-full px-3 lg:px-7 space-y-6">
      <div className="w-full flex items-center justify-between">
        <ul className="flex items-center gap-4">
          {userSubjects.map((item, index) => (
            <li
              key={index}
              className={cn(
                "capitalize font-semibold text-[#6a6a6a] border px-3 py-1 rounded-lg cursor-pointer",
                activeSubject === item
                  ? "bg-primary/10 border-primary text-black"
                  : ""
              )}
              onClick={() => {
                setActiveSubject(item);
                form.setValue("chapterName", "");
                form.setValue("topicNames", []);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? activeTabChapters.find(
                              (chapter) => chapter.name === field.value
                            )?.name
                          : "Select chapter"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search chapter..." />
                      <CommandList>
                        <CommandEmpty>No chapter found.</CommandEmpty>
                        <CommandGroup>
                          {activeTabChapters?.map((chapter) => (
                            <CommandItem
                              value={chapter.name}
                              key={chapter._id}
                              onSelect={() => {
                                form.setValue("chapterName", chapter.name);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  chapter.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {chapter.name}
                            </CommandItem>
                          ))}
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
                  <MultiSelect
                    options={topics}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select topics"
                    variant={"inverted"}
                    animation={2}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button
              variant={"outline"}
              className="gap-x-2"
              onClick={() => setNewTopicLearnt(false)}
            >
              <LeftArrowIcon className="w-2 h-2" />
              Back
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center text-sm">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewTopicLearnt;
