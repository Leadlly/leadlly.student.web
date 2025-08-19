"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { ChevronDown, EllipsisVertical, FileText, Search } from "lucide-react";

const accountSubjectOverview = [
  {
    chapterName: "vector algebra",
    efficiency: 50,
    quizzes: 4,
    levelOfDifficulty: "hard",
    chapterTopics: [
      {
        topicName: "vectors and scalar",
        efficiency: 30,
        quizzes: 1,
        levelOfDifficulty: "hard",
      },
      {
        topicName: "addition of vectors",
        efficiency: 60,
        quizzes: 2,
        levelOfDifficulty: "easy",
      },
      {
        topicName: "components of a vector in 2D and 3D space",
        efficiency: 40,
        quizzes: 1,
        levelOfDifficulty: "hard",
      },
      {
        topicName: "scalar products and vector products",
        efficiency: 50,
        quizzes: 0,
        levelOfDifficulty: "hard",
      },
    ],
  },
];

const AccountSubjectOverview = () => {
  return (
    <section className="border rounded-xl h-full flex flex-col">
      <div className="bg-primary/15 rounded-t-xl px-2 lg:px-5 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 lg:gap-3">
          <FileText className="w-4 h-4 lg:w-6 lg:h-6" />
          <h4 className="text-base lg:text-xl font-semibold whitespace-nowrap">
            Subject List
          </h4>
        </div>
        <div className="lg:w-1/2 flex items-center gap-1 lg:gap-3">
          <Input
            placeholder="Search for chapter"
            className="focus-visible:ring-0"
            icon1={<Search className="w-4 h-4 text-[#9f9f9f] mr-3" />}
            inputWrapperClassName="flex-1"
          />

          <Select defaultValue="maths">
            <SelectTrigger className="w-32 text-base font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="maths">Maths</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <EllipsisVertical className="hidden md:inline-block h-6" />
        </div>
      </div>

      <div className="flex-1 w-full overflow-y-auto no-scrollbar lg:px-5 my-2">
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="md:w-[500px] text-sm md:text-lg font-semibold sticky top-0 z-50 bg-[#f5f4f6]">
                Chapter Name
              </TableHead>
              <TableHead className="text-center text-sm md:text-lg font-semibold sticky top-0 z-50 bg-[#f5f4f6]">
                Efficiency
              </TableHead>
              <TableHead className="text-center text-sm md:text-lg font-semibold sticky top-0 z-50 bg-[#f5f4f6]">
                Quizzes
              </TableHead>
              <TableHead className="text-center text-sm md:text-lg font-semibold sticky top-0 z-50 bg-[#f5f4f6]">
                Level of Difficulty
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-b">
            {accountSubjectOverview.length > 0 ? (
              accountSubjectOverview.map((chapter, chapterIndex) => (
                <Collapsible key={chapter.chapterName} asChild>
                  <>
                    <TableRow className="cursor-pointer">
                      <CollapsibleTrigger asChild>
                        <>
                          <TableCell className="flex items-center gap-1 md:gap-5 text-sm md:text-lg font-medium">
                            <ChevronDown />
                            <span className="capitalize">
                              {chapterIndex + 1}. {chapter.chapterName}
                            </span>
                          </TableCell>
                          <TableCell className="text-center text-sm md:text-lg font-medium">
                            {chapter.efficiency}%
                          </TableCell>
                          <TableCell className="text-center text-sm md:text-lg font-medium">
                            {chapter.quizzes}
                          </TableCell>
                          <TableCell className="text-center text-sm md:text-lg font-medium capitalize">
                            <span
                              className={cn(
                                "border rounded-md px-4 py-1",
                                chapter.levelOfDifficulty === "hard"
                                  ? "bg-[#ff2e2e]/15 border-[#ff2e2e] text-[#ff2e2e]"
                                  : chapter.levelOfDifficulty === "moderate"
                                  ? "bg-[#FFBA53] border-[#FFBA53] text-[#FFBA53]"
                                  : "bg-[#0FD679] border-[#0FD679] text-[#0FD679]"
                              )}>
                              {chapter.levelOfDifficulty}
                            </span>
                          </TableCell>
                        </>
                      </CollapsibleTrigger>
                    </TableRow>

                    <CollapsibleContent asChild>
                      <>
                        {chapter.chapterTopics.length > 0 ? (
                          chapter.chapterTopics.map((topic, topicIndex) => (
                            <TableRow
                              key={topic.topicName}
                              className="border-none">
                              <TableCell className="pl-5 md:pl-12 lg:pl-20 text-xs md:text-base">
                                {chapterIndex + 1}.{topicIndex + 1}{" "}
                                {capitalizeFirstLetter(topic.topicName)}
                              </TableCell>
                              <TableCell className="text-center text-xs md:text-base">
                                {topic.efficiency}
                              </TableCell>
                              <TableCell className="text-center text-xs md:text-base">
                                {topic.quizzes}
                              </TableCell>
                              <TableCell
                                className={cn(
                                  "text-center capitalize text-xs md:text-base",
                                  topic.levelOfDifficulty === "hard"
                                    ? "text-[#ff2e2e]"
                                    : chapter.levelOfDifficulty === "moderate"
                                    ? "text-[#FFBA53]"
                                    : "text-[#0FD679]"
                                )}>
                                {topic.levelOfDifficulty}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <div>
                            <p>No data found!</p>
                          </div>
                        )}
                      </>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <div>
                <p>No data found!</p>
              </div>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AccountSubjectOverview;
