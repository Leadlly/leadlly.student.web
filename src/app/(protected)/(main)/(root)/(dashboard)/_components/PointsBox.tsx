"use client";

import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

const Chip = ({
  src,
  alt,
  value,
  color,
}: {
  src: string;
  alt: string;
  value: number;
  color: string;
}) => (
  <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-[0_4px_16px_rgba(61,53,72,0.06)]">
    <Image src={src} alt={alt} width={18} height={18} className="h-[18px] w-[18px] object-contain" />
    <span className="text-sm font-semibold" style={{ color }}>
      {value}
    </span>
  </div>
);

const PointsBox = () => {
  const userDetails = useAppSelector((state) => state.user.user?.details);

  return (
    <div className="flex items-center gap-2">
      <Chip
        src="/assets/images/trophy_cup.png"
        alt="Level"
        value={userDetails?.level?.number ?? 0}
        color="#0075FF"
      />
      <Chip
        src="/assets/images/yellow_dollar_coin.png"
        alt="Points"
        value={userDetails?.points?.number ?? 0}
        color="#FF9900"
      />
      <Chip
        src="/assets/images/fire_flame.png"
        alt="Streak"
        value={userDetails?.streak?.number ?? 0}
        color="#FF00E5"
      />
    </div>
  );
};

export default PointsBox;
