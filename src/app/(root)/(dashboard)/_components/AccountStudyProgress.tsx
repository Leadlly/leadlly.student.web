"use client";

import { useState } from "react";

import AccountSubjectForm from "./AccountSubjectForm";

import { TabContent, TabNavItem } from "@/components";

import { EllipsisVertical } from "lucide-react";
import AccountChaptersList from "./AccountChaptersList";

const userSubjects = [
  {
    id: "maths",
    label: "Maths",
  },
  {
    id: "physics",
    label: "Physics",
  },
  {
    id: "chemistry",
    label: "Chemistry",
  },
];

const mathsChapters = [
  {
    chapterName: "vector algebra",
    topics: [
      {
        label: "vectors and scalar",
        value: "vectors and scalar",
      },
      {
        label: "2.addition of vectors",
        value: "2.addition of vectors",
      },
      {
        label: "3.component of a vector in 2D and 3D space",
        value: "3.component of a vector in 2D and 3D space",
      },
      {
        label: "4.scalar products and vector products",
        value: "4.scalar products and vector products",
      },
    ],
  },
  {
    chapterName: "vector algebr",
    topics: [
      {
        label: "5.vectors and scalar",
        value: "5.vectors and scalar",
      },
      {
        label: "6.addition of vectors",
        value: "6.addition of vectors",
      },
      {
        label: "7.component of a vector in 2D and 3D space",
        value: "7.component of a vector in 2D and 3D space",
      },
      {
        label: "8.scalar products and vector products",
        value: "8.scalar products and vector products",
      },
    ],
  },
  {
    chapterName: "vector algeb",
    topics: [
      {
        label: "9.vectors and scalar",
        value: "9.vectors and scalar",
      },
      {
        label: "10.addition of vectors",
        value: "10.addition of vectors",
      },
      {
        label: "11.component of a vector in 2D and 3D space",
        value: "11.component of a vector in 2D and 3D space",
      },
      {
        label: "12.scalar products and vector products",
        value: "12.scalar products and vector products",
      },
    ],
  },
  {
    chapterName: "vector alge",
    topics: [
      {
        label: "13.vectors and scalar",
        value: "13.vectors and scalar",
      },
      {
        label: "14.addition of vectors",
        value: "14.addition of vectors",
      },
      {
        label: "15.component of a vector in 2D and 3D space",
        value: "15.component of a vector in 2D and 3D space",
      },
      {
        label: "16.scalar products and vector products",
        value: "16.scalar products and vector products",
      },
    ],
  },
  {
    chapterName: "vector alg",
    topics: [
      {
        label: "17.vectors and scalar",
        value: "17.vectors and scalar",
      },
      {
        label: "18.addition of vectors",
        value: "18.addition of vectors",
      },
      {
        label: "19.component of a vector in 2D and 3D space",
        value: "19.component of a vector in 2D and 3D space",
      },
      {
        label: "20.scalar products and vector products",
        value: "20.scalar products and vector products",
      },
    ],
  },
  {
    chapterName: "vector al",
    topics: [
      {
        label: "21.vectors and scalar",
        value: "21.vectors and scalar",
      },
      {
        label: "22.addition of vectors",
        value: "22.addition of vectors",
      },
      {
        label: "33.component of a vector in 2D and 3D space",
        value: "33.component of a vector in 2D and 3D space",
      },
      {
        label: "24.scalar products and vector products",
        value: "24.scalar products and vector products",
      },
    ],
  },
];

const AccountStudyProgress = () => {
  const [activeTab, setActiveTab] = useState("maths");

  return (
    <div className="border rounded-xl h-full shadow-[0_0_28.6px_-4px_rgba(150,84,244,0.16)] flex flex-col">
      <div className="bg-primary/15 px-7 py-2 flex items-center justify-between rounded-t-xl">
        <h3 className="text-2xl font-semibold">Student Study Feedback</h3>

        <div className="flex items-center gap-x-5">
          <ul className="w-72 flex items-center justify-between p-1 bg-white rounded-md">
            {userSubjects.map((subject) => (
              <TabNavItem
                key={subject.id}
                id={subject.id}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                title={subject.label}
                layoutIdPrefix="account_subject_progress"
                className="px-4"
                titleClassName="text-lg font-medium"
                activeTabClassName="h-full w-full inset-0"
              />
            ))}
          </ul>

          <EllipsisVertical className="w-7 h-7" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom__scrollbar">
        <TabContent id="maths" activeTab={activeTab}>
          <AccountSubjectForm subjectChapters={mathsChapters} />
          <AccountChaptersList />
        </TabContent>
        <TabContent id="physics" activeTab={activeTab}>
          Physics Chapters
        </TabContent>
        <TabContent id="chemistry" activeTab={activeTab}>
          Chemistry Chapters
        </TabContent>
      </div>
    </div>
  );
};

export default AccountStudyProgress;
