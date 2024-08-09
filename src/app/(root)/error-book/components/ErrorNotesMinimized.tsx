"use client";

import React from "react";
import { Maximize2 } from "lucide-react";
import ErrorCard from "./ErrorCard";
import { useOptimistic } from "react";
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

const ErrorNotesMinimized: React.FC<ErrorNotesMinimizedProps> = ({
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
    <div
      className="bg-purple-100 p-4 rounded-xl min-w-[310px] h-[calc(100vh-120px)] border border-[#9654F426] pt-10 shadow-md ml-10"
      style={{ boxShadow: "2px 1px 22.8px 5px #9654F41A" }}
    >
      <div className="flex justify-between items-baseline px-2">
        <h2 className="text-2xl font-medium mb-4">Error Notes</h2>
        <button
          className="size-8 flex justify-center rounded-lg items-center bg-white border border-[#D3D3D3]"
          style={{ boxShadow: "1.54px 3.08px 4.85px 0px #0000001A inset" }}
          onClick={() => setIsMinimized(false)}
        >
          <Maximize2 className="size-6" color="#6B6B6B" />
        </button>
      </div>
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
        <h3 className="font-medium text-lg text-center mb-2">Your Errors</h3>
        <div className="overflow-y-hidden">
          {optimisticNotes.length <= 0 ? (
            <p className="text-xl text-center py-5 text-red-400 font-semibold">
              No Error Notes
            </p>
          ) : (
            optimisticNotes
              .slice(0, 4)
              .map((note) => (
                <ErrorCard
                  id={String(note._id)}
                  key={note._id}
                  isCompleted={note.isCompleted}
                  note={note.note}
                />
              ))
          )}
        </div>
        {optimisticNotes.length > 4 ? (
          <p
            onClick={() => setIsMinimized(false)}
            className="cursor-pointer text-[#838383] text-center font-medium hover:text-[#696868] "
          >
            See more
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorNotesMinimized;
