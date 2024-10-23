import React from "react";

const ApplyCoupon = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { token, redirect, planId, price, category } = searchParams;

  return <div>ApplyCoupon</div>;
};

export default ApplyCoupon;
