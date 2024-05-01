import LevelPoints from "./LevelPoints";

const PointsBox = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <LevelPoints
        cardBgColor="bg-[#00B2FF]/[0.03]"
        iconImageSrc={"/assets/images/trophy_cup.png"}
        iconAltText="Trophy cup"
        iconShadowColor="shadow-[#32CEFF]/[0.55]"
        chevronBgColor="bg-[#D2E0E7]"
        pointsColor="text-[#0075FF]"
        points={10}
        pointsText="Level Up"
        progressValue={60}
        progressIndicatorBg="bg-[#0075FF]"
        pointsProgressText="+ 60%"
        pointsProgressTextColor="text-[#00B75F]"
        progressIconStroke="#00B75F"
      />
      <LevelPoints
        cardBgColor="bg-[#FF8A00]/[0.03]"
        iconImageSrc={"/assets/images/yellow_dollar_coin.png"}
        iconAltText="Dollar Coin"
        iconShadowColor="shadow-[#FFE608]/[0.55]"
        chevronBgColor="bg-[#FCDEBC]"
        pointsColor="text-[#FF9900]"
        points={70}
        pointsText="Points"
        progressValue={30}
        progressIndicatorBg="bg-[#FF9900]"
        pointsProgressText="+ 30%"
        pointsProgressTextColor="text-[#E55426]"
        progressIconStroke="#E55426"
      />
      <LevelPoints
        cardBgColor="bg-[#EF31FF]/[0.03]"
        iconImageSrc={"/assets/images/fire_flame.png"}
        iconAltText="Fire Flame"
        chevronBgColor="bg-[#FFC0F9]"
        pointsColor="text-[#FF00E5]"
        points={16}
        pointsText="Streak"
        progressValue={50}
        progressIndicatorBg="bg-[#FF00E5]"
      />
    </div>
  );
};

export default PointsBox;
