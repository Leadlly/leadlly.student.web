import { cn } from "@/lib/utils";
import Image from "next/image";

type MentorExperienceBocProps = {
  image1?: string;
  image2?: string;
  image3?: string;
  text: string;
  width?: number;
  height?: number;
};

const MentorExperienceBox = ({
  image1,
  image2,
  image3,
  text,
  height = 20,
  width = 20,
}: MentorExperienceBocProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-4 h-10 border-2 rounded-lg",
        image1 && "gap-3"
      )}>
      <div className="flex items-center">
        {image1 && (
          <Image
            alt="student_1"
            src={image1}
            width={width}
            height={height}
            className="rounded-full"
          />
        )}
        {image2 && (
          <Image
            alt="student_2"
            src={image2}
            width={width}
            height={height}
            className="rounded-full -ml-2"
          />
        )}
        {image3 && (
          <Image
            alt="student_3"
            src={image3}
            width={width}
            height={height}
            className="rounded-full -ml-2"
          />
        )}
      </div>
      <p className="text-sm font-medium whitespace-nowrap">{text}</p>
    </div>
  );
};

export default MentorExperienceBox;
