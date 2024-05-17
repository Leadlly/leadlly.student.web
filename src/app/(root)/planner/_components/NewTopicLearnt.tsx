"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Input, LeftArrowIcon, MenuIcon } from "@/components";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const topicsLearntToday = [
  {
    subject: "maths",
    chapters: [
      {
        id: 1,
        title: "sets, relations and functions",
        topics: [
          {
            id: 1,
            title: "sets",
          },
          {
            id: 2,
            title: "relations",
          },
          {
            id: 3,
            title: "functions",
          },
          {
            id: 4,
            title: "operations on sets",
          },
        ],
      },
      {
        id: 2,
        title: "matrices and determinants",
        topics: [
          {
            id: 1,
            title: "introduction to matrices",
          },
          {
            id: 2,
            title: "operations on matrices",
          },
          {
            id: 3,
            title: "transpose of a matrix",
          },
          {
            id: 4,
            title: "determinants",
          },
          {
            id: 5,
            title: "inverse of a matrix",
          },
        ],
      },
      {
        id: 3,
        title: "permutations and combinations",
        topics: [
          {
            id: 1,
            title: "permutations",
          },
          {
            id: 2,
            title: "combinations",
          },
          {
            id: 3,
            title: "properties of permutations and combinations",
          },
          {
            id: 4,
            title: "applications of permutations and combinations",
          },
        ],
      },
      {
        id: 4,
        title: "mathematical induction",
        topics: [
          {
            id: 1,
            title: "introduction to mathematical induction",
          },
          {
            id: 2,
            title: "proof by mathematical induction",
          },
          {
            id: 3,
            title: "types of mathematical induction",
          },
          {
            id: 4,
            title: "applications of mathematical induction",
          },
        ],
      },
      {
        id: 5,
        title: "sequence and series",
        topics: [
          {
            id: 1,
            title: "introduction to sequences",
          },
          {
            id: 2,
            title: "arithmetic progression",
          },
          {
            id: 3,
            title: "geometric progression",
          },
          {
            id: 4,
            title: "introduction to series",
          },
          {
            id: 5,
            title: "convergence and divergence of series",
          },
        ],
      },
    ],
  },
  {
    subject: "physics",
    chapters: [
      {
        id: 1,
        title: "mechanics",
        topics: [
          {
            id: 1,
            title: "kinematics",
          },
          {
            id: 2,
            title: "dynamics",
          },
          {
            id: 3,
            title: "work, energy and power",
          },
          {
            id: 4,
            title: "momentum and collision",
          },
          {
            id: 5,
            title: "rotational motion",
          },
        ],
      },
      {
        id: 2,
        title: "thermodynamics",
        topics: [
          {
            id: 1,
            title: "thermal equilibrium and temperature",
          },
          {
            id: 2,
            title: "Kinetic Theory of Gases",
          },
          {
            id: 3,
            title: "Laws of Thermodynamics",
          },
          {
            id: 4,
            title: "Heat Engines and Refrigerators",
          },
          {
            id: 5,
            title: "Entropy and Disorder",
          },
        ],
      },
      {
        id: 3,
        title: "waves and optics",
        topics: [
          {
            id: 1,
            title: "Wave Motion and Types of Waves",
          },
          {
            id: 2,
            title: "Superposition and Interference of Waves",
          },
          {
            id: 3,
            title: "Sound Waves and Acoustics",
          },
          {
            id: 4,
            title: "Geometrical Optics (Reflection and Refraction)",
          },
          {
            id: 5,
            title: "Wave Optics (Interference, Diffraction, and Polarization)",
          },
        ],
      },
      {
        id: 4,
        title: "electricity and magnetism",
        topics: [
          {
            id: 1,
            title: "Electric Charges and Coulomb's Law",
          },
          {
            id: 2,
            title: "Electric Fields and Potential",
          },
          {
            id: 3,
            title:
              "Electric Circuits (Resistance, Ohm's Law, Kirchhoff's Laws)",
          },
          {
            id: 4,
            title: "Magnetic Fields and Forces",
          },
          {
            id: 5,
            title: "Electromagnetic Induction and Faraday's Law",
          },
        ],
      },
      {
        id: 5,
        title: "modern physics",
        topics: [
          {
            id: 1,
            title: "Special Theory of Relativity",
          },
          {
            id: 2,
            title: "Photoelectric Effect and Quantum Theory",
          },
          {
            id: 3,
            title: "Atomic Structure and Models",
          },
          {
            id: 4,
            title:
              "Nuclear Physics (Radioactivity, Nuclear Fission and Fusion)",
          },
          {
            id: 5,
            title: "Particle Physics and Standard Model",
          },
        ],
      },
    ],
  },
  {
    subject: "chemistry",
    chapters: [
      {
        id: 1,
        title: "Atomic Structure and Periodic Table",
        topics: [
          {
            id: 1,
            title: "Fundamental particles of an atom",
          },
          {
            id: 2,
            title: "Atomic models (Bohr's model, Quantum mechanical model)",
          },
          {
            id: 3,
            title: "Atomic orbitals and electronic configuration",
          },
          {
            id: 4,
            title: "Periodic trends (atomic radius, ionization energy)",
          },
        ],
      },
      {
        id: 2,
        title: "Chemical Bonding and Molecular Structure",
        topics: [
          {
            id: 1,
            title:
              "Types of chemical bonds (ionic, covalent, metallic, and hydrogen bonds)",
          },
          {
            id: 2,
            title: "Lewis structures and molecular geometry (VSEPR theory)",
          },
          {
            id: 3,
            title: "Hybridization of atomic orbitals",
          },
          {
            id: 4,
            title: "Intermolecular forces and their effects",
          },
        ],
      },
    ],
  },
];

const NewTopicLearnt = ({
  setNewTopicLearnt,
}: {
  setNewTopicLearnt: (newTopicLearnt: boolean) => void;
}) => {
  const [activeSubject, setActiveSubject] = useState("maths");
  const [selectedChapter, setSelectedChapter] = useState<string | undefined>(
    undefined
  );
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );
  const [chapterModal, setChapterModal] = useState(false);
  const [topicModal, setTopicModal] = useState(false);

  const chapterModalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const topicModalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const onChapterModalClose = () => {
    setChapterModal(false);
  };

  const onTopicModalClose = () => {
    setTopicModal(false);
  };

  useEffect(() => {
    const handleChapterModalOutsideClick: EventListener = (e) => {
      if (
        chapterModalRef.current &&
        !chapterModalRef?.current?.contains(e.target as Node)
      ) {
        onChapterModalClose();
      }
    };

    document.addEventListener("click", handleChapterModalOutsideClick);

    return () => {
      document.removeEventListener("click", handleChapterModalOutsideClick);
    };
  }, [onChapterModalClose, chapterModalRef]);

  useEffect(() => {
    const handleTopicModalOutsideClick: EventListener = (e) => {
      if (
        topicModalRef.current &&
        !topicModalRef?.current?.contains(e.target as Node)
      ) {
        onTopicModalClose();
      }
    };

    document.addEventListener("click", handleTopicModalOutsideClick);

    return () => {
      document.removeEventListener("click", handleTopicModalOutsideClick);
    };
  }, [onTopicModalClose, topicModalRef]);

  return (
    <div className="w-full px-3 lg:px-7 space-y-6">
      <div className="w-full flex items-center justify-between">
        <ul className="flex items-center gap-4">
          {topicsLearntToday.map((item) => (
            <li
              key={item.subject}
              className={cn(
                "capitalize font-semibold text-[#6a6a6a] border px-3 py-1 rounded-lg cursor-pointer",
                activeSubject === item.subject
                  ? "bg-primary/10 border-primary text-black"
                  : ""
              )}
              onClick={() => setActiveSubject(item.subject)}>
              {item.subject}
            </li>
          ))}
        </ul>
        <MenuIcon className="md:w-4 md:h-4 cursor-pointer" />
      </div>

      <div className="relative" ref={chapterModalRef}>
        <Input
          value={selectedChapter}
          placeholder="Select the chapter"
          icon2={
            <ChevronDown
              size={15}
              className={cn(
                "transition-all duration-200",
                chapterModal ? "-rotate-180" : ""
              )}
            />
          }
          onFocus={() => setChapterModal(true)}
          onChange={(e) => setSelectedChapter(e.target.value)}
        />

        {chapterModal ? (
          <div className="w-full h-36 absolute inset-x-0 mt-1 z-20 border bg-white rounded-lg overflow-y-auto custom__scrollbar">
            {topicsLearntToday.map(
              (item) =>
                item.subject === activeSubject && (
                  <>
                    {item.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        onClick={() => {
                          setSelectedChapter(chapter.title);
                          onChapterModalClose();
                        }}
                        className="text-center font-medium py-1.5 border-b last:border-none cursor-pointer">
                        {chapter.title}
                      </div>
                    ))}
                  </>
                )
            )}
          </div>
        ) : null}
      </div>

      <div className="relative" ref={topicModalRef}>
        <Input
          value={selectedTopic}
          placeholder="Select the topic"
          icon2={
            <ChevronDown
              size={15}
              className={cn(
                "transition-all duration-200",
                topicModal ? "-rotate-180" : ""
              )}
            />
          }
          onFocus={() => {
            if (selectedChapter) {
              setTopicModal(true);
            }
          }}
          onChange={(e) => setSelectedTopic(e.target.value)}
        />

        {topicModal ? (
          <div className="w-full h-24 absolute inset-x-0 mt-1 z-20 border bg-white rounded-lg overflow-y-auto custom__scrollbar">
            {topicsLearntToday.map((item) => (
              <>
                {item.chapters.map(
                  (chapter) =>
                    chapter.title === selectedChapter && (
                      <>
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            onClick={() => {
                              setSelectedTopic(topic.title);
                              onTopicModalClose();
                            }}
                            className="text-center font-medium py-1.5 border-b last:border-none cursor-pointer">
                            {topic.title}
                          </div>
                        ))}
                      </>
                    )
                )}
              </>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant={"outline"}
          className="gap-x-2"
          onClick={() => setNewTopicLearnt(false)}>
          <LeftArrowIcon className="w-2 h-2" />
          Back
        </Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default NewTopicLearnt;
