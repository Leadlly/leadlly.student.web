"use client";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { validateCustomCoupon } from "@/actions/subscription_actions";
import { ICoupon } from "@/helpers/types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomCouponForm = ({
  form,
  setIsCustomCouponValid,
  setSelectedCoupon,
}: {
  form: UseFormReturn<{
    code: string;
  }>;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
  setIsCustomCouponValid: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const [customCouponCode, setCustomCouponCode] = useState("");
  const [isValidatingCustomCoupon, setIsValidatingCustomCoupon] =
    useState(false);
  const [customCouponMessage, setCustomCouponMessage] = useState<string | null>(
    null
  );

  const debounced = useDebounceCallback(setCustomCouponCode, 500);

  useEffect(() => {
    const checkForValidCustomCoupon = async () => {
      if (customCouponCode.length > 0) {
        setIsValidatingCustomCoupon(true);
        try {
          const res = await validateCustomCoupon({ code: customCouponCode });

          if (!res.success) {
            setSelectedCoupon(null);
            setIsCustomCouponValid(false);
            setCustomCouponMessage(res.message);
          } else {
            setSelectedCoupon(res.coupon);
            setIsCustomCouponValid(true);
            setCustomCouponMessage(null);
          }
        } catch (error) {
          setSelectedCoupon(null);
          setIsCustomCouponValid(false);
          setCustomCouponMessage("Invalid coupon!");
        } finally {
          setIsValidatingCustomCoupon(false);
        }
      } else {
        setSelectedCoupon(null);
        setIsCustomCouponValid(false);
        setCustomCouponMessage(null);
      }
    };

    checkForValidCustomCoupon();
  }, [customCouponCode, setIsCustomCouponValid, setSelectedCoupon]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs text-white font-medium">
                Use Coupon Code
              </FormLabel>
              <FormControl>
                <Input
                  inputWrapperClassName="bg-transparent"
                  className="bg-transparent text-white placeholder:text-white"
                  placeholder="Enter a coupon code"
                  icon2={
                    isValidatingCustomCoupon ? (
                      <Loader2 className="w-3 h-3 animate-spin text-white" />
                    ) : null
                  }
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debounced(e.target.value);
                  }}
                />
              </FormControl>
              {customCouponMessage !== null && (
                <p
                  className={cn(
                    "text-[10px] font-medium leading-none -mb-3 text-[#ff2e2e]"
                  )}
                >
                  {customCouponMessage}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CustomCouponForm;
