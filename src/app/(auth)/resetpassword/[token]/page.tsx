"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { resetPassword } from "@/actions/user_actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const ResetPasswordSchema = z.object({
  password: z.string({ required_error: "Please enter your new password." }),
  confirmPassword: z.string({
    required_error: "Please confirm your password!",
  }),
});

const ResetPassword = () => {
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const params = useParams<{ token: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
  }, [password, confirmPassword]);

  const onFormSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsResettingPassword(true);

    try {
      const res = await resetPassword(
        { password: data.password },
        params.token
      );
      toast.success(res.message);

      router.replace("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsResettingPassword(false);
    }
  };
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl shadow-2xl flex flex-col items-center justify-center gap-y-2 p-10">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly Logo"
          width={130}
          height={130}
        />

        <h2 className="text-2xl lg:text-5xl font-bold mt-5 mb-3">
          Reset Password
        </h2>
        <p className="text-center font-medium leading-tight -mt-2">
          Choose a new password for your account
        </p>

        <Form {...form}>
          <form
            className="w-full space-y-4 mt-5"
            onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                      inputWrapperClassName="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                      inputWrapperClassName="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {passwordError ? (
              <p className="text-sm text-red-500 font-medium leading-tight -mt-1">
                {passwordError}
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full h-12 text-base lg:text-lg"
              disabled={isResettingPassword}>
              {isResettingPassword ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>

        <Link href="/login" className="w-full mt-2">
          <Button variant="outline" className="w-full h-12 text-base">
            Back to Log in
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ResetPassword;
