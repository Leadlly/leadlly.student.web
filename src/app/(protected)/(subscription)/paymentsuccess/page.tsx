import { CheckCircleIcon } from "lucide-react";
import React from "react";
import Redirecting from "./_components/Redirecting";

const PaymentSuccess = async (
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) => {
  const searchParams = await props.searchParams;
  const referenceNumber = searchParams["reference"] ?? "";
  const appRedirect = searchParams["appRedirect"] ?? "";
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl shadow-2xl flex flex-col items-center justify-center space-y-2 py-10 bg-[url('/assets/images/girl_celebration.png')] bg-[position:top_left] bg-[length:120px] bg-no-repeat">
        <CheckCircleIcon className="text-[#0FD679] w-20 h-20" />
        <h3 className="text-2xl font-semibold">Payment Success</h3>
        <p className="font-medium text-lg">
          Congratulations! You have been upgraded.
        </p>
        <p className="font-bold text-lg">
          <span className="font-medium">Txn id:</span> {referenceNumber}
        </p>
        <Redirecting appRedirect={appRedirect} />
      </div>
    </section>
  );
};

export default PaymentSuccess;
