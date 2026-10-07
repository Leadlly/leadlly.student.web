import { studentPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
// import { revisionPreferenceTabs } from "@/helpers/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CalendarDaysIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ControlPanelFormSchema = z.object({
  nextDay: z.boolean({
    required_error: "Please select a preference day!",
  }),
  dailyQuestions: z.number({
    required_error: "Please select number of questions!",
  }),
  backRevisionTopics: z.number({
    required_error: "Please select number of past revision topics!",
  }),
  accuracyRevisionTopics: z.number({
    required_error: "Please select number of accuracy revision topics!",
  }),
  includeSunday: z.boolean(),
});

const CustomizePlanner = () => {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  // const steps = [3, 5, 7, 10]; // Questions per topic — hidden for now
  const revisionSteps = [1, 2, 3, 4, 5];
  const fitRevision = (value: number | undefined, fallback: number) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(5, Math.max(1, Math.round(n)));
  };

  const form = useForm<z.infer<typeof ControlPanelFormSchema>>({
    resolver: zodResolver(ControlPanelFormSchema),
    defaultValues: {
      nextDay: user?.preferences?.continuousData?.nextDay ?? true,
      dailyQuestions: user?.preferences?.dailyQuestions ?? 3,
      backRevisionTopics: fitRevision(user?.preferences?.backRevisionTopics, 2),
      accuracyRevisionTopics: fitRevision(user?.preferences?.accuracyRevisionTopics, 1),
      includeSunday: user?.preferences?.includeSunday !== false,
    },
  });

  // Hidden for now — Revision Preference / Questions per topic UI
  // const dailyQuestionValue = form.watch("dailyQuestions");
  // const dailyQuestionIndex = steps.findIndex((v) => v === dailyQuestionValue);

  const backRevisionValue = form.watch("backRevisionTopics");
  const backRevisionIndex = revisionSteps.findIndex((v) => v === backRevisionValue);
  const accuracyRevisionValue = form.watch("accuracyRevisionTopics");
  const accuracyRevisionIndex = revisionSteps.findIndex((v) => v === accuracyRevisionValue);

  const handleSubmit = async (data: z.infer<typeof ControlPanelFormSchema>) => {
    try {
      setIsPending(true);
      const res = await studentPersonalInfo(data);

      dispatch(userData({ ...user, ...res.user }));
      // Toast before query invalidation so Dialog remounts don't swallow it
      toast.success(res?.message || "Preference updated successfully.", {
        position: "top-center",
      });
      void queryClient.invalidateQueries({ queryKey: ["plannerData"] });
    } catch (error) {
      toast.error("Preference update failed.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-16 w-full justify-start gap-3 rounded-full border-[#EFEAF8] px-4 text-lg font-semibold text-dark-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F3FF] text-primary">
            <CalendarDaysIcon className="h-5 w-5" />
          </span>
          Customize Your Planner
        </Button>
      </DialogTrigger>

      <DialogContent className="!inset-auto !bottom-4 !left-4 !right-4 !top-4 !h-auto !max-h-none !w-auto !max-w-none !translate-x-0 !translate-y-0 md:!left-24 xl:!left-[277px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 md:gap-4">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>
            <span className="font-semibold text-lg md:text-2xl truncate w-full text-left">
              Control Planner
            </span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-10"
          >
            {/* Revision Preference — hidden for now
            <FormField
              control={form.control}
              name="nextDay"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      Revision Preference
                    </span>
                    <span className="text-muted-foreground">
                      Prefer your revision time after study
                    </span>
                  </FormLabel>

                  <FormControl>
                    <div className="w-full bg-muted flex items-center justify-between rounded-full">
                      {revisionPreferenceTabs.map((tab) => (
                        <Button
                          key={tab.label}
                          type="button"
                          variant={
                            tab.value === field.value ? "default" : "ghost"
                          }
                          onClick={() => field.onChange(tab.value)}
                          className="flex-1 rounded-full"
                        >
                          {tab.label}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            */}

            {/* Questions per topic — hidden for now
            <FormField
              control={form.control}
              name="dailyQuestions"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      Questions per topic
                    </span>
                    <span className="text-muted-foreground">
                      How many questions per topic you want to attempt?
                    </span>
                  </FormLabel>

                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[dailyQuestionIndex]}
                        min={0}
                        max={steps.length - 1}
                        step={1}
                        value={[dailyQuestionIndex]}
                        onValueChange={(index) => {
                          const realValue = steps[index[0]];
                          field.onChange(realValue);
                        }}
                      />

                      <ul className="flex items-center justify-between">
                        {steps.map((val, index) => (
                          <li key={index} className="font-semibold">
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            */}

            <FormField
              control={form.control}
              name="accuracyRevisionTopics"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">Accuracy revision</span>
                    <span className="text-muted-foreground">
                      Apart from class, how many weak topics can you work on in a day?
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={0}
                        max={revisionSteps.length - 1}
                        step={1}
                        value={[Math.max(accuracyRevisionIndex, 0)]}
                        onValueChange={(index) => {
                          field.onChange(revisionSteps[index[0]]);
                        }}
                      />
                      <ul className="flex items-center justify-between">
                        {revisionSteps.map((val) => (
                          <li key={val} className="font-semibold">
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backRevisionTopics"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">Past revision</span>
                    <span className="text-muted-foreground">
                      How many previously studied topics can you revise in a day?
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={0}
                        max={revisionSteps.length - 1}
                        step={1}
                        value={[Math.max(backRevisionIndex, 0)]}
                        onValueChange={(index) => {
                          field.onChange(revisionSteps[index[0]]);
                        }}
                      />
                      <ul className="flex items-center justify-between">
                        {revisionSteps.map((val) => (
                          <li key={val} className="font-semibold">
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeSunday"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-xl border px-3 py-3">
                  <FormLabel className="font-semibold text-base">
                    Include Sunday in the planner
                  </FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      className="h-5 w-5 accent-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              <Button
                type="submit"
                className="max-w-[180px] w-full mx-auto h-10 text-base md:text-lg"
              >
                {isPending ? <Loader2Icon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizePlanner;
