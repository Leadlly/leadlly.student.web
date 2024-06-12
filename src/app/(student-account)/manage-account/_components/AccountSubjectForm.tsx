"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { capitalizeFirstLetter } from "@/helpers/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

type subjectChaptersProps = {
  chapterName: string;
  topics: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string | undefined }>;
  }[];
};

const AccountStudyFormSchema = z.object({
  chapterName: z.string({ required_error: "Please select a chapter!" }),
  topicNames: z
    .string()
    .array()
    .nonempty({ message: "Please select at least one topic" }),
  levelOfDifficulty: z.enum(["easy", "moderate", "hard"], {
    required_error: "Please select a difficulty level!",
  }),
});

const AccountSubjectForm = ({
  subjectChapters,
}: {
  subjectChapters: subjectChaptersProps[];
}) => {
  const form = useForm<z.infer<typeof AccountStudyFormSchema>>({
    resolver: zodResolver(AccountStudyFormSchema),
  });

  const selectedChapter = form.watch("chapterName");

  const onFormSubmit = async (data: z.infer<typeof AccountStudyFormSchema>) => {
    console.log(data);
  };
  return (
    <div className="p-3 lg:p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a chapter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectChapters.map((chapter) => (
                            <SelectItem
                              key={chapter.chapterName}
                              value={chapter.chapterName}>
                              {capitalizeFirstLetter(chapter.chapterName)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <MultiSelect
                        options={subjectChapters
                          .filter(
                            (chapter) => chapter.chapterName === selectedChapter
                          )
                          .flatMap((chapter) => chapter.topics)}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select topics"
                        variant={"inverted"}
                        animation={2}
                      />
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
                  <div className="flex items-center gap-2 lg:gap-10">
                    <FormLabel className="whitespace-nowrap text-base lg:text-xl font-medium mt-1">
                      Difficulty Level :
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-x-5 lg:gap-x-20">
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
              className="h-9 lg:h-10 w-24 text-lg lg:text-2xl font-semibold">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountSubjectForm;
