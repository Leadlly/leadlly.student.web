import { buySubscription } from "@/actions/subscription_actions";
import { Button } from "@/components/ui/button";
import { SubtotalContainerProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { BadgeCheck, Loader2, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SubtotalContainer = ({
  selectedCoupon,
  setSubTotalBlockHeight,
  category,
  price,
  planId,
  resetCustomCouponForm,
  setIsCustomCouponValid,
  setSelectedCoupon,
  existingRemainingAmount,
  isExistingRemainingAmount,
  setSubscriptionId,
}: SubtotalContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const subTotalBlockRef = useRef<HTMLDivElement>(null);

  // Calculate the discount value based on coupon type
  const discountValue = selectedCoupon
    ? selectedCoupon.discountType === "percentage"
      ? (Number(price) * selectedCoupon.discountValue) / 100
      : selectedCoupon.discountValue // Assume it's a fixed amount
    : 0;

  const subtotal = isExistingRemainingAmount
    ? Number(price) - existingRemainingAmount! - discountValue
    : Number(price) - discountValue;

  const subscribeHandler = async () => {
    setIsLoading(true);

    try {
      const data = await buySubscription({
        planId,
        coupon: selectedCoupon?.code || "",
      });
      setSubscriptionId(data?.id);
    } catch (error: any) {
      toast.error("Error buying subscription", {
        description: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const target = subTotalBlockRef.current;
    if (!target) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSubTotalBlockHeight({
          width: Math.round(width),
          height: Math.round(height),
        });
      }
    });

    resizeObserver.observe(target);
    return () => {
      resizeObserver.unobserve(target);
      resizeObserver.disconnect();
    };
  }, [setSubTotalBlockHeight]);
  return (
    <div className="max-w-lg mx-auto fixed bottom-0 inset-x-0 z-50">
      <div
        ref={subTotalBlockRef}
        className=" bg-[#EADCFD] rounded-t-3xl border border-b-0 border-primary py-4 mx-3"
      >
        <div className="flex items-center justify-between px-5">
          {selectedCoupon && (
            <div>
              <p className="text-xs text-secondary-foreground font-medium">
                Added Coupon
              </p>
              <div className="flex items-center space-x-3">
                <p className="text-secondary-foreground font-semibold text-sm">
                  {selectedCoupon.code}
                </p>
                <div className="flex items-center gap-x-1">
                  <p className="text-[#0fd679] text-[10px] font-semibold">
                    Applied
                  </p>
                  <BadgeCheck size={10} color="#0fd679" />
                </div>
                <Button
                  onClick={() => {
                    resetCustomCouponForm();
                    setIsCustomCouponValid(null);
                    setSelectedCoupon(null);
                  }}
                  variant={"ghost"}
                  className="flex items-center justify-center px-0 py-0 hover:bg-transparent"
                >
                  <Trash2 size={10} color="#9654F4" />
                </Button>
              </div>
            </div>
          )}
          <div className="ml-auto bg-primary px-5 py-1 rounded-full max-w-max">
            <p className="text-[11px] text-white font-bold capitalize">
              {category} plan
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between mt-3 px-5",
            !selectedCoupon && "mb-3"
          )}
        >
          <p className="text-secondary-foreground text-base font-medium">
            Enrollment Fee:
          </p>
          <p className="text-base font-semibold">₹ {price}/-</p>
        </div>

        {isExistingRemainingAmount && (
          <div
            className={cn(
              "flex items-center justify-between px-5",
              !selectedCoupon && "mb-3"
            )}
          >
            <p className="text-sm font-medium text-secondary-foreground">
              Upgrade Adjustment:
            </p>
            <p className="text-sm font-medium">
              - ₹ {Math.round(existingRemainingAmount!)}/-
            </p>
          </div>
        )}

        {selectedCoupon && (
          <div className="flex items-center justify-between my-3 px-5">
            <p className="text-sm font-medium text-secondary-foreground">
              Discount{" "}
              {selectedCoupon.discountType === "percentage"
                ? `${selectedCoupon.discountValue}% Off`
                : `₹ ${selectedCoupon.discountValue} Off`}{" "}
              :
            </p>
            <p className="text-sm font-medium text-primary">
              - ₹ {Math.round(discountValue)}/-
            </p>
          </div>
        )}

        <div className="flex items-center justify-between py-4 border-t px-5">
          <p className="text-base font-bold">Subtotal :</p>

          <p className="text-base font-bold">₹ {Math.round(subtotal)}/-</p>
        </div>

        <Button
          onClick={subscribeHandler}
          disabled={isLoading}
          className={cn(
            "w-4/5 h-11 bg-primary mx-auto flex items-center justify-center rounded-lg text-white text-base font-bold"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Proceed to payment"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SubtotalContainer;
