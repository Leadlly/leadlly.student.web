import { ArrowUp } from "lucide-react";
import Image from "next/image";

interface ScoreTypes {
  score?: number;
  questions?: number;
}

const Score = ({ score, questions }: ScoreTypes) => {
  return (
    <section className="shadow-section my-5 p-5 rounded-[10px] flex-1">
      <h2 className="text-md md:text-2xl font-semibold mb-4 text-[#9E9E9E]">
        Score
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="flex justify-center items-baseline">
            <p className="text-6xl md:text-9xl font-bold text-purple-500">
              {score}
            </p>
            <span className="font-medium text-[8px] md:text-xl text-[#939393]">
              marks
            </span>
          </div>
          <p className="font-medium text-[8px] md:text-xl text-[#939393]">
            Scored out of {questions && questions * 4} marks ({questions})
          </p>
          <div className="flex font-medium justify-start items-center gap-3 md:gap-5 mt-2">
            <div className="size-2 md:size-3 rounded-full bg-[#0FD679] "></div>
            <p className="text-[8px] md:text-base">
              For correct answer +4 marks
            </p>
          </div>
          <div className="flex font-medium justify-start items-center gap-3 md:gap-5">
            <div className="size-2 md:size-3 rounded-full bg-[#E62308] "></div>
            <p className="text-[8px] md:text-base">
              For incorrect answer -1 marks
            </p>
          </div>
        </div>
        <div className="bg-[#9654F42E] rounded-[6px] flex flex-col max-md:flex-row overflow-hidden max-md:justify-start justify-center items-center p-2 md:p-4 pb-0  md:mt-0 md:ml-4  mt-4">
          <div>
            <h3 className="text-[8px] md:text-2xl font-semibold">
              Improvement
            </h3>
            <p className="text-[#797979] text-[8px] md:text-xl font-medium">
              Previous: <span className="text-blue-700">30 marks</span>
            </p>
            <p className="text-[#797979] text-[8px] md:text-xl font-medium">
              Improved:{" "}
              <span className="text-orange-300">
                +21% <ArrowUp className="inline size-3 md:size-7" />
              </span>
            </p>
          </div>

          <Image
            src={"/assets/images/improve.png"}
            alt="improve"
            width={180}
            height={150}
          />
        </div>
      </div>
    </section>
  );
};

export default Score;
