"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AccountStudyFormSchema } from "@/schemas/accountStudyFormSchema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { subjectChaptersProps } from "@/helpers/types";
import {
  getChapterTopics,
  getSubjectChapters,
} from "@/actions/question_actions";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Logo } from "@/components";
import Image from "next/image";
import { saveStudyData } from "@/actions/studyData_actions";
import { useRouter } from "next/navigation";
import { createPlanner } from "@/actions/planner_actions";

const InitialStudyData = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);
  const [topics, setTopics] = useState([]);

  const activeSubject = searchParams["subject"] ?? "maths";

  const router = useRouter();

  const userAcademic = useAppSelector((state) => state.user.user?.academic);

  const form = useForm<z.infer<typeof AccountStudyFormSchema>>({
    resolver: zodResolver(AccountStudyFormSchema),
  });

  const selectedChapter = form.watch("chapterName");

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
      standard: userAcademic?.standard!,
    };

    try {
      console.log(formattedData);

      const responseData = await saveStudyData(formattedData);
      console.log(responseData);

      if (responseData?.data.length > 0) {
        toast.success("Data saved.", {
          description: responseData.message,
        });

        const plannerData = await createPlanner();
        console.log("inside responseData!");
        console.log(plannerData);

        if (plannerData.success) {
          toast.success(plannerData.message);
          console.log("inside plannerData");

          router.replace("/");
        }
      } else {
        toast.error("Data not saved!");
      }
    } catch (error: any) {
      toast.error("Error saving data", {
        description: error.message,
      });
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const chapters = async () => {
      try {
        const data = await getSubjectChapters(
          activeSubject,
          userAcademic?.standard!
        );

        setActiveTabChapters(data.chapters);
      } catch (error: any) {
        toast.error("Unable to fetch chapters!", {
          description: error.message,
        });
      }
    };

    chapters();
  }, [activeSubject, userAcademic?.standard]);

  useEffect(() => {
    const topics = async () => {
      try {
        const data = await getChapterTopics(
          activeSubject,
          selectedChapter,
          userAcademic?.standard!
        );
        setTopics(data.topics);
      } catch (error: any) {
        toast.error("Unable to fetch topics!", {
          description: error.message,
        });
      }
    };

    topics();
  }, [activeSubject, selectedChapter, userAcademic?.standard]);
  return (
    <section className="flex flex-col px-3 h-full w-full">
      <div>
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />
      </div>
      <div className="flex-1 grid place-items-center w-full">
        <div className="max-w-3xl w-full rounded-xl shadow-2xl px-3 py-10 sm:px-10 lg:p-6 space-y-10">
          <div className="w-full text-center">
            <h1 className="text-xl md:text-3xl font-semibold">
              Tell us about your learnings
            </h1>
          </div>
          {/* <div className="w-full grid place-items-center">
            <ul className="flex items-center gap-3 border-2 rounded-md p-1">
              {userAcademic?.subjects?.map((subject) => (
                <Link
                  href={`/initial-study-data?subject=${subject}`}
                  key={subject}
                  className="relative"
                  onClick={() => {
                    form.setValue("chapterName", "");
                    form.setValue("topicNames", []);
                  }}
                >
                  {activeSubject === subject && (
                    <MotionDiv
                      layoutId="active_chat_tab"
                      transition={{
                        type: "spring",
                        duration: 0.6,
                      }}
                      className="absolute rounded h-full w-full -z-10 bg-primary inset-0"
                    />
                  )}
                  <li
                    className={cn(
                      "text-base md:text-lg capitalize font-medium px-3 py-1",
                      activeSubject === subject && "text-white"
                    )}
                  >
                    {subject}
                  </li>
                </Link>
              ))}
            </ul>
          </div> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="w-full flex flex-col items-center gap-5 lg:gap-10"
            >
              <div className="w-full flex flex-col gap-y-3">
                <div className="w-full flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="chapterName"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center  gap-2 lg:gap-10">
                          <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                            Chapter :
                          </FormLabel>
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
                                        (chapter) =>
                                          chapter.name === field.value
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
                                          form.setValue(
                                            "chapterName",
                                            chapter.name
                                          );
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[18px] lg:gap-[53px]">
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

                <FormField
                  control={form.control}
                  name="levelOfDifficulty"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-10">
                        <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                          Difficulty Level :
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-start gap-5 lg:gap-x-20"
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
                />
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
      </div>
    </section>
  );
};

export default InitialStudyData;
