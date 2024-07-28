import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterCard from "./ChapterCard";

const errorBook = {
  Mathematics: [
    { id: 1, name: "Vector Algebra", questions: 30 },
    { id: 2, name: "Matrices and Determinants", questions: 10 },
    { id: 3, name: "Permutations and Combinations", questions: 35 },
    { id: 4, name: "Mathematical Induction", questions: 41 },
    { id: 5, name: "Sequence and Series", questions: 20 },
    { id: 6, name: "Integral Calculus", questions: 25 },
    { id: 7, name: "Differential Equations", questions: 25 },
  ],
  Chemistry: [
    { id: 1, name: "Atomic Structure", questions: 40 },
    { id: 2, name: "Chemical Bonding", questions: 30 },
    { id: 3, name: "Thermodynamics", questions: 20 },
    { id: 4, name: "Equilibrium", questions: 25 },
    { id: 5, name: "Organic Chemistry", questions: 35 },
  ],
  Physics: [
    { id: 1, name: "Mechanics", questions: 50 },
    { id: 2, name: "Electricity and Magnetism", questions: 40 },
    { id: 3, name: "Optics", questions: 30 },
    { id: 4, name: "Thermodynamics", questions: 20 },
    { id: 5, name: "Modern Physics", questions: 25 },
  ],
};

export default function ErrorList() {
  return (
    <Tabs defaultValue="Maths" className="w-full">
      <TabsList className="bg-transparent flex justify-between lg:justify-start items-start gap-4 md:gap-14 flex-wrap md:flex-nowrap">
        <TabsTrigger
          value="Maths"
          className="rounded-lg font-semibold data-[state=active]:border-[#9654F4] data-[state=active]:bg-[#9654F412] data-[state=active]:border-2  border-[#A2A2A2] border-2 px-3 md:px-6 text-[#A2A2A2] data-[state=active]:text-[#9654F4]"
        >
          Maths
        </TabsTrigger>
        <TabsTrigger
          value="Physics"
          className="rounded-lg font-semibold data-[state=active]:border-[#9654F4] data-[state=active]:bg-[#9654F412] data-[state=active]:border-2  border-[#A2A2A2] border-2 px-3 md:px-6 text-[#A2A2A2] data-[state=active]:text-[#9654F4]"
        >
          Physics
        </TabsTrigger>
        <TabsTrigger
          value="Chemistry"
          className="rounded-lg font-semibold data-[state=active]:border-[#9654F4] data-[state=active]:bg-[#9654F412] data-[state=active]:border-2  border-[#A2A2A2] border-2 px-3 md:px-6 text-[#A2A2A2] data-[state=active]:text-[#9654F4]"
        >
          Chemistry
        </TabsTrigger>
      </TabsList>
      <Separator className="h-[1px] bg-[#A7A7A7B0] my-5" />
      <TabsContent value="Maths" className="overflow-y-hidden">
        {errorBook.Mathematics.map((item, index) => (
          <ChapterCard
            key={item.name}
            number={index + 1}
            title={item.name}
            questions={item.questions}
          />
        ))}
      </TabsContent>
      <TabsContent value="Physics" className="overflow-y-hidden">
        {errorBook.Physics.map((item, index) => (
          <ChapterCard
            key={item.name}
            number={index + 1}
            title={item.name}
            questions={item.questions}
          />
        ))}
      </TabsContent>
      <TabsContent value="Chemistry" className="overflow-y-hidden">
        {errorBook.Chemistry.map((item, index) => (
          <ChapterCard
            key={item.name}
            number={index + 1}
            title={item.name}
            questions={item.questions}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
