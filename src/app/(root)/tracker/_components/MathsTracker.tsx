import ChapterOverviewTable from "./ChapterOverviewTable";
import SubjectOverview from "./SubjectOverview";

const mathsChapters = [
  {
    chapter: "vector algebra",
    chapterEfficiency: 86,
    topics: [
      {
        title: "vectors and scalar",
        revisionFrequency: 3,
        lastRevised: "2024-04-02T00:00:00Z",
        efficiency: 70,
        revisionDates: [
          {
            dailyEfficiency: 81,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 85,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 80,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 87,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 96,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 92,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "addition of vectors",
        revisionFrequency: 4,
        lastRevised: "2024-03-12T00:00:00Z",
        efficiency: 80,
        revisionDates: [
          {
            dailyEfficiency: 65,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 73,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 96,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 45,
            date: "2024-04-05T00:00:00Z",
          },
        ],
      },
      {
        title: "Components of a vector in 2D and 3D space",
        revisionFrequency: 2,
        lastRevised: "2024-04-16T00:00:00Z",
        efficiency: 75,
        revisionDates: [
          {
            dailyEfficiency: 35,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 67,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 55,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 43,
            date: "2024-04-06T00:00:00Z",
          },
        ],
      },
      {
        title: "Scalar products and vector products",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 60,
        revisionDates: [
          {
            dailyEfficiency: 27,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 69,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 35,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 45,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 56,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 90,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 58,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "Scalar products",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 55,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
    ],
  },
  {
    chapter: "matrices and determinants",
    chapterEfficiency: 68,
    topics: [
      {
        title: "matrices",
        revisionFrequency: 3,
        lastRevised: "2024-04-02T00:00:00Z",
        efficiency: 70,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "determinants",
        revisionFrequency: 4,
        lastRevised: "2024-03-12T00:00:00Z",
        efficiency: 80,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "adjoint and evaluation of matrix",
        revisionFrequency: 2,
        lastRevised: "2024-04-16T00:00:00Z",
        efficiency: 75,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "linear equations in two or three variables",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 60,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
    ],
  },
  {
    chapter: "integral calculus",
    chapterEfficiency: 45,
    topics: [
      {
        title: "integral as an anti-derivative",
        revisionFrequency: 3,
        lastRevised: "2024-04-02T00:00:00Z",
        efficiency: 70,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "integrals involving algebraic and trigonometry",
        revisionFrequency: 4,
        lastRevised: "2024-03-12T00:00:00Z",
        efficiency: 80,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "Exponential and logarithmic functions",
        revisionFrequency: 2,
        lastRevised: "2024-04-16T00:00:00Z",
        efficiency: 75,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
      {
        title: "Integration by substitution",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 60,
        revisionDates: [
          {
            dailyEfficiency: 88,
            date: "2024-04-02T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-03T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-04T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-05T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-06T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-07T00:00:00Z",
          },
          {
            dailyEfficiency: 88,
            date: "2024-04-08T00:00:00Z",
          },
        ],
      },
    ],
  },
];

const MathsTracker = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <SubjectOverview />

      {mathsChapters.map((item) => (
        <ChapterOverviewTable key={item.chapter} chapterData={item} />
      ))}
    </div>
  );
};

export default MathsTracker;
