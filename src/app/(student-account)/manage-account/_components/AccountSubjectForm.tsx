"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
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

import { cn } from "@/lib/utils";

import { subjectChaptersProps } from "@/helpers/types";

import { Check, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getChapterTopics } from "@/actions/question_actions";
import { saveStudyData } from "@/actions/studyData_actions";
import { AccountStudyFormSchema } from "@/schemas/accountStudyFormSchema";

const AccountSubjectForm = ({
  subjectChapters,
  activeSubject,
  userStandard,
  onResetForm,
}: {
  subjectChapters: subjectChaptersProps[];
  activeSubject: string;
  userStandard: number;
  onResetForm: (resetFunction: () => void) => void;
}) => {
  const [topics, setTopics] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof AccountStudyFormSchema>>({
    resolver: zodResolver(AccountStudyFormSchema),
  });

  const selectedChapter = form.watch("chapterName");

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
  }, [selectedChapter, activeSubject, userStandard]);

  useEffect(() => {
    onResetForm(() =>
      form.reset({
        chapterName: "",
        topicNames: [],
        levelOfDifficulty: "",
      })
    );
  }, [onResetForm, form.reset]);

  const onFormSubmit = async (data: z.infer<typeof AccountStudyFormSchema>) => {
    setIsAdding(true);

    const formattedData = {
      tag: "unrevised_topic",
      topics: data.topicNames.map((topic) => ({ name: topic })),
      chapter: {
        name: data.chapterName,
        level: data.levelOfDifficulty,
      },
      subject: activeSubject,
      standard: userStandard,
    };

    try {
      const responseData = await saveStudyData(formattedData);

      if (responseData.data.length > 0) {
        toast.success(responseData.message, {
          description: "Chapter added successfully",
        });
      } else {
        toast.error("Chapter already saved!");
      }

      form.reset({
        chapterName: "",
        topicNames: [],
        levelOfDifficulty: "",
      });
    } catch (error: any) {
      toast.error("Error adding chapter", {
        description: error.message,
      });
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="p-3 lg:p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10"
        >
          <div className="flex-1 flex flex-col gap-y-6">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-20">
              <FormField
                control={form.control}
                name="chapterName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center  gap-2 lg:gap-10">
                      <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                        Chapter :
                      </FormLabel>
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
                                ? subjectChapters.find(
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
                                {subjectChapters?.map((chapter) => (
                                  <CommandItem
                                    value={chapter.name}
                                    key={chapter._id}
                                    onSelect={() => {
                                      form.setValue(
                                        "chapterName",
                                        chapter.name
                                      );
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topicNames"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center gap-[18px] lg:gap-10">
                      <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                        Topics :
                      </FormLabel>
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="levelOfDifficulty"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center gap-2 lg:gap-10">
                    <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                      Difficulty Level :
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-x-5 lg:gap-x-20"
                      >
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="easy"
                              className="lg:w-5 lg:h-5"
                            />
                          </FormControl>
                          <FormLabel className="text-base lg:text-xl font-medium">
                            Easy
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="moderate"
                              className="lg:w-5 lg:h-5"
                            />
                          </FormControl>
                          <FormLabel className="text-base lg:text-xl font-medium">
                            Moderate
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="hard"
                              className="lg:w-5 lg:h-5"
                            />
                          </FormControl>
                          <FormLabel className="text-base lg:text-xl font-medium">
                            Hard
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="grid place-items-center">
            <Button
              type="submit"
              className="h-9 lg:h-10 w-24 text-lg lg:text-2xl font-semibold"
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="flex items-center text-base">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Adding
                </span>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountSubjectForm;
