"use client";

import { getSubscriptionPricingByPlanId } from "@/actions/subscription_actions";
import { getUser } from "@/actions/user_actions";
import { ExistingPlan, UserDataProps } from "@/helpers/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";

const useGetExistingPlanRemainingAmount = () => {
  const [userInfo, setUserInfo] = useState<UserDataProps | null>(null);
  const [existingPlanPrice, setExistingPlanPrice] =
    useState<ExistingPlan | null>(null);
  const [fetchingExistingPlanPrice, setFetchingExistingPLanPrice] =
    useState(false);
  const [existingRemainingAmount, setExistingRemainingAmount] = useState<
    number | null
  >(null);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUser();
        dispatch(userData(data?.user));
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    const getExistingPlan = async () => {
      try {
        setFetchingExistingPLanPrice(true);

        const data = await getSubscriptionPricingByPlanId(
          user?.subscription.planId || ""
        );

        setExistingPlanPrice(data.pricing);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingExistingPLanPrice(false);
      }
    };

    getExistingPlan();
  }, [user]);

  useEffect(() => {
    if (existingPlanPrice && user?.subscription.status === "active") {
      // Calculate the remaining value of the current subscription
      const currentDate = new Date();
      const deactivationDate = new Date(user?.subscription.dateOfDeactivation!);
      const timeRemaining =
        (deactivationDate.getTime() - currentDate.getTime()) /
        (1000 * 60 * 60 * 24); // Remaining days

      const pricePerDayCurrent =
        existingPlanPrice.amount / (existingPlanPrice["duration(months)"] * 30); // Assumes 30 days in a month
      // Remaining value of the current subscription
      const remainingValue = pricePerDayCurrent * timeRemaining;

      setExistingRemainingAmount(remainingValue);
    } else {
      setExistingRemainingAmount(0);
    }
  }, [existingPlanPrice, user, user?.subscription.dateOfDeactivation]);

  return { existingRemainingAmount, fetchingExistingPlanPrice };
};

export default useGetExistingPlanRemainingAmount;
