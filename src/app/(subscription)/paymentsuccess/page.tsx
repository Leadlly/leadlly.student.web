import React from "react";

const PaymentSuccess = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const referenceNumber = searchParams["reference"] ?? "";
  return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
