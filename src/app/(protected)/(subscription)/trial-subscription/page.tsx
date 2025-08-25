import Image from "next/image";
import FeaturesCarousel from "./_components/FeaturesCarousel";

const TrialSubscription = () => {
  return (
    <section className="relative w-full h-full">
      <div className="w-full sticky top-0 inset-x-0 bg-white px-4 py-2">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />
      </div>

      <FeaturesCarousel />
    </section>
  );
};

export default TrialSubscription;
