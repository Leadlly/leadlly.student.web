import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterCard from "./ChapterCard";
import { getErrorBook } from "@/actions/error_book_actions";
import { ErrorBookProps } from "@/helpers/types";

export default function ErrorList({ errorBook }: ErrorBookProps) {
  if (!errorBook || errorBook.length < 1) {
    return (
      <div className="w-full text-center py-10">
        <h2 className="text-lg font-semibold text-gray-600">
          No error book data available
        </h2>
        <p className="text-gray-400 mt-2">
          It seems there is no information available at the moment. Please check
          back later or contact support if you believe this is an error.
        </p>
      </div>
    );
  }
  return (
    <Tabs defaultValue={errorBook[0]?.subject} className="w-full">
      <TabsList className="bg-transparent flex justify-around lg:justify-start items-start gap-4 md:gap-14 flex-wrap md:flex-nowrap">
        {errorBook.map((tab) => {
          return (
            <TabsTrigger
              value={tab.subject}
              className="rounded-lg font-semibold data-[state=active]:border-[#9654F4] data-[state=active]:bg-[#9654F412] data-[state=active]:border-2 capitalize  border-[#A2A2A2] border-2 px-3 md:px-6 text-[#A2A2A2] data-[state=active]:text-[#9654F4]"
              key={tab.subject}
            >
              {tab.subject}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <Separator className="h-[1px] bg-[#A7A7A7B0] my-5" />
      {errorBook.map((tab) => {
        return (
          <TabsContent
            value={tab.subject}
            key={tab.subject}
            className="overflow-y-hidden"
          >
            {tab.chapters.map((chapter, index: number) => (
              <ChapterCard
                key={chapter.chapter}
                number={index + 1}
                title={chapter.chapter}
                questions={chapter.totalQuestions}
              />
            ))}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
