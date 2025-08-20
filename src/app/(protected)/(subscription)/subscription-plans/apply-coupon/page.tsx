import ApplyCouponPage from "./_components/ApplyCouponPage";

const ApplyCoupon = async (
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const {
    redirect,
    planId,
    price,
    category,
    existingRemainingAmount,
    subscriptionId,
  } = searchParams;

  return (
    <ApplyCouponPage
      category={category}
      planId={planId}
      price={price}
      redirect={decodeURIComponent(redirect || "")}
      subscriptionIdFromApp={decodeURIComponent(subscriptionId || "")}
      existingRemainingAmount={existingRemainingAmount}
    />
  );
};

export default ApplyCoupon;
