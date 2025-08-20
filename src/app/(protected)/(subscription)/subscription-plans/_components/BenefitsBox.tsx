import { Check } from "lucide-react";

type BenefitsBoxProps = {
  title: string;
  subscriptionBenefits: {
    label: string;
  }[];
};

const BenefitsBox = ({ title, subscriptionBenefits }: BenefitsBoxProps) => {
  return (
    <ul className="space-y-4">
      <p className="capitalize text-base lg:text-lg font-semibold text-[#8d8a8a]">
        {title}
      </p>
      {subscriptionBenefits.map((plan) => (
        <li
          key={plan.label}
          className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
          <Check className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
          <span className="capitalize">{plan.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default BenefitsBox;
