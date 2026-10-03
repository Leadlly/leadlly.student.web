import { TQuizAnswerProps, TQuizQuestionOptionsProps } from "@/helpers/types";
import { sanitizedHtml } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OptionsProps {
  options: TQuizQuestionOptionsProps[];
  selectedOption: TQuizQuestionOptionsProps | null;
  handleOptionChange: (option: TQuizQuestionOptionsProps) => void;
  attemptedOption?: {
    questionId: string;
    quizId: string;
    topic: { name: string };
    question: TQuizAnswerProps;
  };
}

const optionImageSrc = (images: unknown): string | null => {
  if (typeof images === "string" && images.trim()) return images;
  if (Array.isArray(images)) {
    const first = images[0];
    if (typeof first === "string" && first.trim()) return first;
    if (first && typeof first === "object" && "url" in first) {
      const url = (first as { url?: unknown }).url;
      return typeof url === "string" && url.trim() ? url : null;
    }
  }
  if (images && typeof images === "object" && "url" in images) {
    const url = (images as { url?: unknown }).url;
    return typeof url === "string" && url.trim() ? url : null;
  }
  return null;
};

const Options = ({
  options,
  selectedOption,
  handleOptionChange,
  attemptedOption,
}: OptionsProps) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {(options || []).map((option, index) => {
        const selected =
          selectedOption?.name === option.name ||
          (!selectedOption &&
            attemptedOption?.question.studentAnswer === option.name);
        const imageSrc = optionImageSrc(option.images);
        return (
          <button
            key={option._id || `${option.name}-${index}`}
            type="button"
            onClick={() => handleOptionChange(option)}
            className={cn(
              "flex items-center rounded-lg border p-4 text-left",
              selected ? "border-primary" : "border-[#E6E1F0]"
            )}
          >
            <span
              className={cn(
                "mr-5 flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                selected ? "border-primary" : "border-gray-400"
              )}
            >
              {selected ? <span className="size-2 rounded-full bg-primary" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="text-sm font-semibold"
                dangerouslySetInnerHTML={{
                  __html: sanitizedHtml(option.name || ""),
                }}
              />
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt=""
                  width={300}
                  height={180}
                  className="mt-2 h-auto w-full max-w-sm object-contain"
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Options;
