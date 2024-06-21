"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Check, ChevronDown } from "lucide-react";

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

import getSubjectChapters from "@/actions/actions";

import { subjectChaptersProps } from "@/helpers/types";

import { userSubjects } from "@/helpers/constants";

const NewTopicLearntSchema = z.object({
  chapterName: z.string({ required_error: "Please select a chapter!" }),
  topicNames: z
    .string({ required_error: "Please select at least one topic" })
    .array()
    .nonempty({ message: "Please select at least one topic" }),
});

const NewTopicLearnt = ({
  setNewTopicLearnt,
}: {
  setNewTopicLearnt: (newTopicLearnt: boolean) => void;
}) => {
  const [activeSubject, setActiveSubject] = useState("maths");
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);

  const form = useForm<z.infer<typeof NewTopicLearntSchema>>({
    resolver: zodResolver(NewTopicLearntSchema),
  });

  const selectedChapter = form.watch("chapterName");

  const onSubmit = async (data: z.infer<typeof NewTopicLearntSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    const chapters = async () => {
      const data = await getSubjectChapters(activeSubject, 11);

      setActiveTabChapters(data.chapters);
    };

    chapters();
  }, [activeSubject]);

  return (
    <div className="w-full px-3 lg:px-7 space-y-6">
      <div className="w-full flex items-center justify-between">
        <ul className="flex items-center gap-4">
          {userSubjects.map((item) => (
            <li
              key={item.id}
              className={cn(
                "capitalize font-semibold text-[#6a6a6a] border px-3 py-1 rounded-lg cursor-pointer",
                activeSubject === item.id
                  ? "bg-primary/10 border-primary text-black"
                  : ""
              )}
              onClick={() => setActiveSubject(item.label)}>
              {item.label}
            </li>
          ))}
        </ul>
        <MenuIcon className="md:w-4 md:h-4 cursor-pointer" />
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
                        )}>
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
                              }}>
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
                    options={activeTabChapters
                      .filter((chapter) => chapter.name === selectedChapter)
                      .flatMap((chapter) => chapter.topics)}
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
              onClick={() => setNewTopicLearnt(false)}>
              <LeftArrowIcon className="w-2 h-2" />
              Back
            </Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewTopicLearnt;
