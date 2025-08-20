"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Check, ChevronDown, Loader2, Loader2Icon } from "lucide-react";

import { LeftArrowIcon } from "@/components";
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

import { ISubject, Item } from "@/helpers/types";

import { toast } from "sonner";
import { saveStudyData } from "@/actions/studyData_actions";
import { updatePlanner } from "@/actions/planner_actions";
import { useRouter } from "next/navigation";
import { NewTopicLearntSchema } from "@/schemas/newTopicLearntSchema";
import {
  useGetChapters,
  useGetTopicsWithSubtopic,
} from "@/queries/studyDataQueries";
import { NestedMultiSelect } from "@/components/ui/nested-multi-select";

const NewTopicLearnt = ({
  setNewTopicLearnt,
  userSubjects,
  userStandard,
}: {
  setNewTopicLearnt: (newTopicLearnt: boolean) => void;
  userSubjects: ISubject[];
  userStandard: number;
}) => {
  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0]?.name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Item[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof NewTopicLearntSchema>>({
    resolver: zodResolver(NewTopicLearntSchema),
  });

  const selectedChapter = form.watch("chapterName");

  const { data: activeTabChapters, isLoading } = useGetChapters({
    activeSubject,
    userStandard,
  });

  const { data: topics } = useGetTopicsWithSubtopic({
    activeSubject,
    userStandard,
    selectedChapter: selectedChapter?._id!,
  });

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

      form.reset();

      router.refresh();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-3 lg:px-7 space-y-6">
      <div className="w-full flex items-center justify-between">
        <ul className="flex items-center gap-4">
          {userSubjects.map((item, index) => (
            <li
              key={index}
              className={cn(
                "capitalize font-semibold text-[#6a6a6a] border px-3 py-1 rounded-lg cursor-pointer",
                activeSubject === item.name
                  ? "bg-primary/10 border-primary text-black"
                  : ""
              )}
              onClick={() => {
                setActiveSubject(item.name);
                form.setValue("chapterName", null);
                form.setValue("topicNames", []);
              }}
            >
              {item.name}
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
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? activeTabChapters?.chapters?.find(
                              (chapter) => chapter._id === field.value?._id
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
                          {isLoading ? (
                            <CommandItem>
                              <Loader2Icon className="animate-spin size-4" />
                            </CommandItem>
                          ) : (
                            activeTabChapters?.chapters?.map((chapter) => (
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
                      topics?.topics?.map((topic) => ({
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
