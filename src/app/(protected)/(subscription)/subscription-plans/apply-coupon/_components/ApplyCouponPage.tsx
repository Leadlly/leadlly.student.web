"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import CouponVoucher from "./CouponVoucher";
import CustomCouponForm from "./CustomCouponForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ICoupon } from "@/helpers/types";
import ListedCouponVoucher from "./ListedCouponVoucher";
import SubtotalContainer from "./SubtotalContainer";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import { loadRazorpayScript } from "@/helpers/utils";
import Loader from "@/components/shared/Loader";
import { getUser } from "@/actions/user_actions";
import { userData } from "@/redux/slices/userSlice";
import { Header } from "@/components";
import { useRouter } from "next/navigation";
import { getCoupon } from "@/actions/subscription_actions";

const CustomCouponSchema = z.object({
  code: z.string().min(1, { message: "Coupon is Required" }),
});

const ApplyCouponPage = ({
  // category,
  // planId,
  // price,
  redirect,
  existingRemainingAmount,
  subscriptionIdFromApp,
}: {
  redirect: string | string[] | undefined;
  planId: string | string[] | undefined;
  price: string | string[] | undefined;
  category: string | string[] | undefined;
  existingRemainingAmount: string | string[] | undefined;
  subscriptionIdFromApp: string | string[] | undefined;
}) => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
  const [isCustomCouponValid, setIsCustomCouponValid] = useState<
    boolean | null
  >(null);
  const [subTotalBlockHeight, setSubTotalBlockHeight] = useState({
    width: 0,
    height: 0,
  });
  const [subscriptionId, setSubscriptionId] = useState<
    string | string[] | undefined
  >("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);
  const { selectedPlan } = useAppSelector((state) => state.selectedPlan);

  const form = useForm<z.infer<typeof CustomCouponSchema>>({
    resolver: zodResolver(CustomCouponSchema),
    defaultValues: {
      code: "",
    },
  });

  const isRedirectUri = !!redirect;

  const isExistingRemainingAmount = !!Number(existingRemainingAmount);

  useEffect(() => {
    if (!selectedPlan) {
      router.replace("/subscription-plans");
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (isRedirectUri && subscriptionIdFromApp) {
      const getUserInfo = async () => {
        setIsLoadingUser(true);
        try {
          const userInfo = await getUser();
          dispatch(userData(userInfo.user));
          setSubscriptionId(subscriptionIdFromApp);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingUser(false);
        }
      };

      getUserInfo();
    }
  }, [isRedirectUri, dispatch, subscriptionIdFromApp]);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (selectedPlan?.category) {
        setIsLoading(true);
        try {
          const result = await getCoupon({
            plan: selectedPlan.category,
            category: "listed",
          });
          setData(result);
        } catch (error: any) {
          console.error("Error fetching coupons:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCoupons();
  }, [selectedPlan?.category]);

  const openRazorpayPopUp = useCallback(() => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
      name: "Leadlly",
      order_id: subscriptionId,
      callback_url: `/api/subscription/verify?appRedirectURI=${redirect ? redirect : ""}`,
      prefill: {
        name: user ? user.firstname : "",
        email: user ? user.email : "",
        contact: user ? user.phone : "",
      },
      modal: {
        ondismiss: function () {
          window.location.href = redirect
            ? `${redirect}?transaction=cancelled`
            : "";
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#9654f4",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }, [subscriptionId]);

  useEffect(() => {
    if (subscriptionId) {
      const loadAndOpenRazorpay = async () => {
        const isLoaded = await loadRazorpayScript();
        if (isLoaded) {
          openRazorpayPopUp();
        } else {
          console.error("Razorpay script failed to load");
        }
      };

      loadAndOpenRazorpay();
    }
  }, [subscriptionId]);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section
        className="max-w-lg mx-auto px-4 space-y-4 h-full overflow-y-auto custom__scrollbar"
        style={{ paddingBottom: subTotalBlockHeight.height + 30 }}
      >
        {isLoading || isLoadingUser ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center gap-5">
              <Link href={redirect ? `${redirect}` : "/subscription-plans"}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
                </Button>
              </Link>

              <Header
                title="Apply Coupon"
                titleClassName=" text-lg md:text-3xl"
              />
            </div>

            <CouponVoucher className="h-48 bg-gradient-to-b from-primary/50 to-primary">
              <div className="px-4">
                <div className="px-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">
                      Get upto
                    </h3>
                    <div className="relative max-w-max">
                      <h2 className="text-5xl text-primary/30 font-bold tracking-wider">
                        50%
                      </h2>
                      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-primary font-bold tracking-tight whitespace-nowrap">
                        50% OFF
                      </h2>
                    </div>
                  </div>
                  <div className="w-20 h-20">
                    <Image
                      src="/assets/images/dayflow_gifts.png"
                      alt="discount-gift"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <span className="absolute border-b top-1/2 w-full border-dashed"></span>

              <div className="px-8 mt-3">
                <CustomCouponForm
                  form={form}
                  setIsCustomCouponValid={setIsCustomCouponValid}
                  setSelectedCoupon={setSelectedCoupon}
                />
              </div>
            </CouponVoucher>

            {!isExistingRemainingAmount &&
            data &&
            data?.coupons &&
            data?.coupons.length > 0 ? (
              data?.coupons.map((coupon: any, index: number) => (
                <ListedCouponVoucher
                  key={coupon._id}
                  index={index}
                  coupon={coupon}
                  selectedCoupon={selectedCoupon}
                  setSelectedCoupon={setSelectedCoupon}
                  isCustomCouponValid={isCustomCouponValid}
                  setIsCustomCouponValid={setIsCustomCouponValid}
                  resetCustomCouponForm={form.reset}
                />
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center mt-10 px-5">
                <p className="text-lg text-center font-semibold leading-tight max-w-80">
                  No coupons applicable at the moment
                </p>
                <p className="text-base text-secondary-foreground font-medium text-center">
                  Have a coupon code?
                </p>
                <p className="text-base text-secondary-foreground font-medium text-center max-w-80">
                  Try typing it in the coupon code box above
                </p>
              </div>
            )}

            <SubtotalContainer
              category={selectedPlan?.category}
              price={selectedPlan?.amount.toString()}
              planId={selectedPlan?.planId}
              selectedCoupon={selectedCoupon}
              setSubTotalBlockHeight={setSubTotalBlockHeight}
              resetCustomCouponForm={form.reset}
              setIsCustomCouponValid={setIsCustomCouponValid}
              setSelectedCoupon={setSelectedCoupon}
              existingRemainingAmount={Number(existingRemainingAmount)}
              isExistingRemainingAmount={isExistingRemainingAmount}
              setSubscriptionId={setSubscriptionId}
            />
          </>
        )}
      </section>
    </>
  );
};

export default ApplyCouponPage;
