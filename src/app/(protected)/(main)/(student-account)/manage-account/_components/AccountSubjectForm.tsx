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
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setUnrevisedTopics } from "@/actions/studyData_actions";
import { AccountStudyFormSchema } from "@/schemas/accountStudyFormSchema";
import { allocateBackTopics, createPlanner } from "@/actions/planner_actions";
import { useGetChapters } from "@/queries/studyDataQueries";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

const AccountSubjectForm = ({
  activeSubject,
  userStandard,
  onResetForm,
}: {
  activeSubject: string;
  userStandard: number;
  onResetForm: (resetFunction: () => void) => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof AccountStudyFormSchema>>({
    resolver: zodResolver(AccountStudyFormSchema),
  });

  const { data: subjectChapters } = useGetChapters({
    activeSubject,
    userStandard,
  });

  useEffect(() => {
    onResetForm(() =>
      form.reset({
        chapters: [],
      })
    );
  }, [onResetForm, form]);

  const onFormSubmit = async (data: z.infer<typeof AccountStudyFormSchema>) => {
    setIsAdding(true);

    const formattedData = {
      tag: "unrevised_topic",
      chapterIds: data.chapters.map((chapter) => chapter._id),
      subject: activeSubject,
      standard: userStandard,
    };

    try {
      let plannerResponse;

      await setUnrevisedTopics(formattedData);

      if (user && user.planner === false) {
        plannerResponse = await createPlanner();
        dispatch(userData({ ...user, planner: true }));
      } else if (user && user.planner === true) {
        plannerResponse = await allocateBackTopics();
      }

      toast.success(`${plannerResponse?.message}`);

      form.reset({
        chapters: [],
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
          <FormField
            control={form.control}
            name="chapters"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <MultiSelect
                    options={
                      subjectChapters?.chapters.map((chapter) => ({
                        _id: chapter._id,
                        name: chapter.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select chapters"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
