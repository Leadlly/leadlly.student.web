import { ICoupon } from "@/helpers/types";
import React from "react";
import CouponVoucher from "./CouponVoucher";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getFormattedDate, getFormattedDateForProd } from "@/helpers/utils";
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";

const ListedCouponVoucher = ({
  coupon,
  index,
  isCustomCouponValid,
  selectedCoupon,
  setIsCustomCouponValid,
  setSelectedCoupon,
  resetCustomCouponForm,
}: {
  coupon: ICoupon;
  index: number;
  selectedCoupon: ICoupon | null;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
  isCustomCouponValid: boolean | null;
  setIsCustomCouponValid: React.Dispatch<React.SetStateAction<boolean | null>>;
  resetCustomCouponForm: UseFormReset<{
    code: string;
  }>;
}) => {
  return (
    <CouponVoucher
      className="border h-36 px-6 flex items-center"
      childCirclesClassName="border"
    >
      <Image
        src={
          index % 2 === 0
            ? "/assets/images/discount_voucher.png"
            : "/assets/images/coupons_wallet.png"
        }
        alt="discount_voucher"
        width={index % 2 === 0 ? 24 : 30}
        height={20}
        objectFit="contain"
        className={cn(
          "absolute",
          index % 2 === 0 ? "top-0 right-20" : "top-3 right-3"
        )}
      />
      {index % 2 === 0 && (
        <Image
          src={"/assets/images/curved_design.png"}
          alt="discount_voucher"
          fill
          objectFit="contain"
          className={cn("absolute top-0 left-5 -z-10")}
        />
      )}
      <div className="w-full h-full flex items-center py-2">
        <div className="flex items-center justify-between h-full flex-1 gap-x-5">
          <div
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center",
              index % 2 === 0 ? "bg-[#ff9900]/10" : "bg-[#0fd679]/10"
            )}
          >
            <Image
              src={
                index % 2 === 0
                  ? "/assets/images/Gift.png"
                  : "/assets/images/Voucher.png"
              }
              alt="gift"
              width={32}
              height={32}
              objectFit="contain"
            />
          </div>

          <span className="border-l border-dashed border-black/50 h-full w-px" />

          <div className="flex-1 h-full flex flex-col items-start justify-between">
            <div className="py-2">
              <h4 className="text-base font-semibold leading-tight">
                Get Upto
              </h4>
              <h3 className="text-2xl font-bold leading-tight">
                <span
                  className={cn(
                    index % 2 === 0 ? "text-[#ff9900]" : "text-[#0fd679]"
                  )}
                >
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </span>{" "}
                OFF
              </h3>
            </div>
            <div className="mt-auto">
              <p className="text-xs leading-tight font-medium text-secondary-foreground">
                Valid Until{" "}
                {process.env.NODE_ENV === "development"
                  ? getFormattedDate(new Date(coupon.expiryDate))
                  : getFormattedDateForProd(new Date(coupon.expiryDate))}
              </p>
            </div>
          </div>

          <Button
            variant="link"
            disabled={
              (!!selectedCoupon && selectedCoupon._id === coupon._id) ||
              isCustomCouponValid === true
            }
            onClick={() => {
              resetCustomCouponForm();
              setIsCustomCouponValid(null);
              setSelectedCoupon(coupon);
            }}
            className="text-primary text-base"
          >
            {!!selectedCoupon && selectedCoupon._id === coupon._id
              ? "Applied"
              : "Apply"}
          </Button>
        </div>
      </div>
    </CouponVoucher>
  );
};

export default ListedCouponVoucher;
