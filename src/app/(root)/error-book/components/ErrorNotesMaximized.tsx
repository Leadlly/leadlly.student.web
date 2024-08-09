"use client";

import React, { useOptimistic, useState } from "react";
import { Minimize2 } from "lucide-react";
import ErrorCard from "./ErrorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorNoteProps } from "@/helpers/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createErrorNote } from "@/actions/error_book_actions";
import { toast } from "sonner";

interface ErrorNotesMinimizedProps {
  setIsMinimized: (value: boolean) => void;
  errorNotes?: ErrorNoteProps[];
}

const formSchema = z.object({
  errorNote: z.string().min(20, {
    message: "errorNote must be at least 20 characters.",
  }),
});

interface ErrorNotesMaximizedProps {
  setIsMinimized?: (value: boolean) => void;
  errorNotes?: ErrorNoteProps[];
}

const ErrorNotesMaximized: React.FC<ErrorNotesMaximizedProps> = ({
  setIsMinimized,
  errorNotes = [],
}) => {
  const [optimisticNotes, addOptimistic] = useOptimistic(
    errorNotes,
    (state, update: ErrorNoteProps) => [...state, update]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      errorNote: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      addOptimistic({
        note: values.errorNote,
        _id: crypto.randomUUID(),
        createdAt: new Date(),
        isCompleted: false,
      });
      const result = await createErrorNote({ errorNote: values.errorNote });
      form.reset();
    } catch (error) {
      toast.error("failed to create error Note, try again...");
    }
  }

  return (
    <div className="bg-purple-100 rounded-xl h-full w-full border border-[#9654F426] pt-10 shadow-md">
      <div className="hidden md:flex justify-between items-center px-4">
        <h2 className="text-xl md:text-2xl font-medium mb-4">Error Notes</h2>
        <button
          className="size-8 flex justify-center rounded-lg items-center bg-white border border-[#D3D3D3]"
          onClick={() => setIsMinimized && setIsMinimized(true)}
        >
          <Minimize2 className="size-6" color="#6B6B6B" />
        </button>
      </div>
      <Tabs defaultValue="errorsNow" className="w-full">
        <TabsList className="bg-white flex justify-around rounded-none items-start h-full">
          <TabsTrigger
            value="errorsNow"
            className="font-semibold text-xl md:text-3xl decoration-4 data-[state=active]:underline data-[state=active]:underline-offset-[16px] bg-transparent text-black data-[state=active]:text-[#9654F4]"
          >
            Errors Now
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="font-semibold text-xl md:text-3xl decoration-4 data-[state=active]:underline data-[state=active]:underline-offset-[16px] bg-transparent text-black data-[state=active]:text-[#9654F4]"
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="errorsNow" className="overflow-y-hidden p-4 md:p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full p-3 border bg-white border-gray-300 flex flex-col gap-2 max-h-60 rounded-xl"
              style={{ boxShadow: "0px 1px 40.2px -13px #00000040" }}
            >
              <FormField
                control={form.control}
                name="errorNote"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Write an error note here..."
                        rows={5}
                        className="bg-transparent outline-none w-full"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="items-center flex justify-center">
                <Button
                  type="submit"
                  className="bg-purple-500 text-white py-1 h-fit px-5 rounded"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Adding" : "  Add"}
                </Button>{" "}
              </div>
            </form>
          </Form>
          <div className="mt-4">
            <h3 className="font-medium text-xl md:text-2xl text-stone-600 text-center mb-2">
              Your Errors
            </h3>
            <div className="overflow-y-hidden">
              {optimisticNotes.filter((note) => !note.isCompleted).length <=
              0 ? (
                <p className="text-xl text-center py-5 text-red-400 font-semibold">
                  No Incomplete Error Notes
                </p>
              ) : (
                optimisticNotes
                  .filter((note) => !note.isCompleted)
                  .map((note) => (
                    <ErrorCard
                      isMinimized={false}
                      id={String(note._id)}
                      key={note._id}
                      isCompleted={note.isCompleted}
                      note={note.note}
                    />
                  ))
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="overflow-y-hidden p-4 md:p-5">
          <div className="mt-4">
            <h3 className="font-medium text-xl md:text-2xl text-stone-600 text-center mb-2">
              Completed Errors
            </h3>
            <div className="overflow-y-hidden">
              {optimisticNotes.filter((note) => note.isCompleted).length <=
              0 ? (
                <p className="text-xl text-center py-5 text-red-400 font-semibold">
                  No Complete Error Notes
                </p>
              ) : (
                optimisticNotes
                  .filter((note) => note.isCompleted)
                  .map((note) => (
                    <ErrorCard
                      isMinimized={false}
                      id={String(note._id)}
                      key={note._id}
                      isCompleted={note.isCompleted}
                      note={note.note}
                    />
                  ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ErrorNotesMaximized;
