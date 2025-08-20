import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentFailed = async (
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) => {
  const searchParams = await props.searchParams;
  const { appRedirect } = searchParams;
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl shadow-2xl flex flex-col items-center justify-center space-y-4 py-10">
        <Info className="text-red-500 w-20 h-20" />
        <h3 className="text-2xl font-semibold">Payment Failed!</h3>

        <Link href={appRedirect ? appRedirect : "/subscription-plans"}>
          <Button>Try again</Button>
        </Link>
      </div>
    </section>
  );
};

export default PaymentFailed;
