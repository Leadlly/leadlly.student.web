import ChapterOverviewTable from "./ChapterOverviewTable";
import SubjectOverview from "./SubjectOverview";

const mathsChapters = [
  {
    chapter: "vector algebra",
    topics: [
      {
        title: "vectors and scalar",
        revisionFrequency: 3,
        lastRevised: "2024-04-02T00:00:00Z",
        efficiency: 70,
      },
      {
        title: "addition of vectors",
        revisionFrequency: 4,
        lastRevised: "2024-03-12T00:00:00Z",
        efficiency: 80,
      },
      {
        title: "Components of a vector in 2D and 3D space",
        revisionFrequency: 2,
        lastRevised: "2024-04-16T00:00:00Z",
        efficiency: 75,
      },
      {
        title: "Scalar products and vector products",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 60,
      },
      {
        title: "Scalar products",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 55,
      },
    ],
  },
  {
    chapter: "matrices and determinants",
    topics: [
      {
        title: "matrices",
        revisionFrequency: 3,
        lastRevised: "2024-04-02T00:00:00Z",
        efficiency: 70,
      },
      {
        title: "determinants",
        revisionFrequency: 4,
        lastRevised: "2024-03-12T00:00:00Z",
        efficiency: 80,
      },
      {
        title: "adjoint and evaluation of matrix",
        revisionFrequency: 2,
        lastRevised: "2024-04-16T00:00:00Z",
        efficiency: 75,
      },
      {
        title: "linear equations in two or three variables",
        revisionFrequency: 3,
        lastRevised: "2024-02-11T00:00:00Z",
        efficiency: 60,
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
