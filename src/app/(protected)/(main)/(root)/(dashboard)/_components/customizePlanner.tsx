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
import { revisionPreferenceTabs } from "@/helpers/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
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
    required_error: "Please select number of back revision topics!",
  }),
});

const CustomizePlanner = () => {
  const [isPending, setIsPending] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const steps = [3, 5, 7, 10];

  const form = useForm<z.infer<typeof ControlPanelFormSchema>>({
    resolver: zodResolver(ControlPanelFormSchema),
    defaultValues: {
      nextDay:
        user && user.preferences.continuousData.nextDay
          ? user.preferences.continuousData.nextDay
          : true,
      dailyQuestions:
        user && user.preferences.dailyQuestions
          ? user.preferences.dailyQuestions
          : 3,
      backRevisionTopics:
        user && user.preferences.backRevisionTopics
          ? user.preferences.backRevisionTopics
          : 3,
    },
  });

  const dailyQuestionValue = form.watch("dailyQuestions");
  const dailyQuestionIndex = steps.findIndex((v) => v === dailyQuestionValue);

  const backRevisionValue = form.watch("backRevisionTopics");
  const backRevisionIndex = steps.findIndex((v) => v === backRevisionValue);

  const handleSubmit = async (data: z.infer<typeof ControlPanelFormSchema>) => {
    try {
      setIsPending(true);
      const res = await studentPersonalInfo(data);

      dispatch(userData({ ...user, ...res.user }));
      toast.success("Preference updated successfully.");
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
          className="rounded-xl justify-between h-auto w-full px-2"
        >
          <span className="flex items-center gap-2">
            <div className="size-14 grid place-items-center">
              <CalendarDaysIcon />
            </div>
            <span className="font-semibold text-lg truncate w-full text-left">
              Customize Your Planner
            </span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
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

            <FormField
              control={form.control}
              name="backRevisionTopics"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      Past topics revision
                    </span>
                    <span className="text-muted-foreground">
                      Number of older topics you want to revise daily.
                    </span>
                  </FormLabel>

                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[backRevisionIndex]}
                        min={0}
                        max={steps.length - 1}
                        step={1}
                        value={[backRevisionIndex]}
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
