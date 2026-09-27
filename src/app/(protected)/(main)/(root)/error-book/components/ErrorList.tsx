import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterCard from "./ChapterCard";
import { ErrorBookProps } from "@/helpers/types";

export default function ErrorList({ errorBook }: ErrorBookProps) {
  if (!errorBook || errorBook.length < 1) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center px-6 text-center">
        <Image
          src="/assets/images/questions.png"
          alt=""
          width={180}
          height={180}
          className="h-40 w-40 object-contain"
        />
        <h2 className="mt-6 text-lg font-bold text-secondary-text">No wrong questions yet</h2>
        <p className="mt-2 max-w-sm text-sm text-[#9CA3AF]">
          Your error book is empty. Keep practicing and add questions you get wrong.
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={errorBook[0]?.subject} className="w-full">
      <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
        {errorBook.map((tab) => (
          <TabsTrigger
            value={tab.subject}
            className="rounded-lg border border-[#C8C8C8] px-5 py-1.5 text-sm font-semibold capitalize text-[#8A8A8A] shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            key={tab.subject}
          >
            {tab.subject}
          </TabsTrigger>
        ))}
      </TabsList>
      {errorBook.map((tab) => (
        <TabsContent value={tab.subject} key={tab.subject} className="mt-4">
          {tab.chapters.map((chapter, index: number) => (
            <ChapterCard
              key={chapter.chapter}
              number={index + 1}
              title={chapter.chapter}
              questions={chapter.totalQuestions}
            />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
