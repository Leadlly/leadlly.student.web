"use client";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2 } from "lucide-react";

const OTPFormSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required!" })
    .min(6, { message: "Your OTP must be 6 characters" }),
});

const Verify = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
  });

  const onOTPSubmit = async (data: z.infer<typeof OTPFormSchema>) => {
    setIsVerifying(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
          cache: "no-store",
        }
      );

      const responseData = await response.json();

      toast.success("OTP verified successfully", {
        description: responseData.message,
      });

      router.replace("/");
    } catch (error: any) {
      toast.error("Error verifying OTP.", {
        description: error.message,
      });
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onOTPSubmit)}
        className="w-full flex flex-col justify-center items-center space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  containerClassName="justify-center">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isVerifying}>
          {isVerifying ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Verify;
