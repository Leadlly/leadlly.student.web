import { ChevronRight } from "lucide-react";

const TopicsCovered = () => {
  const topics = [
    { subject: "Maths", details: "Vector Algebra, Matrices and Determinants" },
    {
      subject: "Physics",
      details: "Electromagnetic Induction, Laws of Motion",
    },
    { subject: "Chemistry", details: "Chemical Bonding, Atomic Structures" },
    { subject: "Maths", details: "Vector Algebra, Matrices and Determinants" },
    {
      subject: "Physics",
      details: "Electromagnetic Induction, Laws of Motion",
    },
    { subject: "Chemistry", details: "Chemical Bonding, Atomic Structures" },
  ];

  return (
    <section className="shadow-section my-5 p-5 rounded-[10px] flex-1 max-md:mx-5">
      <h2 className="md:text-2xl text-md font-semibold mb-4 text-[#9E9E9E]">
        Topics Covered
      </h2>
      <div className="flex flex-col justify-start gap-3 max-h-52 p-3 overflow-y-scroll custom__scrollbar ">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="border-2 rounded-[10px] border-[#00000033] p-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium text-sm">{topic.subject}</h3>
              <p className="text-[#525252] text-xs">{topic.details}</p>
            </div>
            <ChevronRight />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopicsCovered;
