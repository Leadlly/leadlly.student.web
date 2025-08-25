import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { CheckIcon, Loader2Icon, X } from "lucide-react";
import { toast } from "sonner";
import { generateReferralCode } from "@/actions/referral_actions";
import { setReferral } from "@/redux/slices/referralSlice";

const ReferralCodeFormSchema = z.object({
  code: z
    .string()
    .min(1, { message: "This field is required" })
    .max(10, { message: "Code must be of upto 10 characters." }),
});
const ReferralCodeInput = ({
  setToggleCodeInput,
}: {
  setToggleCodeInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof ReferralCodeFormSchema>>({
    resolver: zodResolver(ReferralCodeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleCodeSubmit = async (
    data: z.infer<typeof ReferralCodeFormSchema>
  ) => {
    setLoading(true);
    try {
      const res = await generateReferralCode({
        ReferralCode: data.code,
        update: true,
      });
      dispatch(setReferral(res.referralCode));
      toast.success(res.message);
      setToggleCodeInput(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `${error.message}`
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [inputRef]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCodeSubmit)}
        className="w-full flex items-center gap-2"
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  ref={inputRef}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoCapitalize="characters"
                  placeholder="Enter referral code"
                  className="text-white bg-transparent placeholder:text-neutral-300 focus-visible:ring-0 px-2"
                  inputWrapperClassName="bg-transparent border-0 border-b rounded-none px-0"
                  icon2={
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => {
                        setToggleCodeInput(false);
                      }}
                      className="size-6 hover:bg-transparent hover:text-white"
                    >
                      <X className="size-5 text-white" />
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="size-8 hover:bg-transparent hover:text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="size-5 text-white animate-spin" />
            ) : (
              <CheckIcon className="size-5 text-white" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReferralCodeInput;
