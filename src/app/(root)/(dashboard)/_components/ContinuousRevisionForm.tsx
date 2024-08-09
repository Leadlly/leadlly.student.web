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
import { Check, ChevronDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MultiSelect } from "@/components/ui/multi-select";
import { LeftArrowIcon } from "@/components";
import {
  getChapterTopics,
  getSubjectChapters,
} from "@/actions/question_actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ISubject, subjectChaptersProps } from "@/helpers/types";
import { saveStudyData } from "@/actions/studyData_actions";
import { updatePlanner } from "@/actions/planner_actions";

const ContinuousRevisionForm = ({
  activeSubject,
  userStandard,
  setActiveSubject,
  userSubjects,
}: {
  activeSubject: string;
  setActiveSubject: (activeSubject: string | null) => void;
  userStandard: number;
  userSubjects: ISubject[];
}) => {
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);
  const [topics, setTopics] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);

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

      await updatePlanner();
      toast.success(responseData.message);

      form.reset({
        chapterName: "",
        topicNames: [],
      });
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
                            ? activeTabChapters.find(
                                (chapter) => chapter.name === field.value
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
                      <CommandList>
                        <CommandEmpty>No chapter found.</CommandEmpty>
                        <CommandGroup>
                          {activeTabChapters?.map((chapter) => (
                            <CommandItem
                              value={chapter.name}
                              key={chapter._id}
                              onSelect={() => {
                                form.setValue("chapterName", chapter.name);
                                setChapterPopoverOpen(false);
                              }}
                              className="cursor-pointer"
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
              onClick={() => {
                setActiveSubject(null);
                form.setValue("chapterName", "");
                form.setValue("topicNames", []);
              }}
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

export default ContinuousRevisionForm;
