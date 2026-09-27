import { ISubject } from "@/helpers/types";

export const subjectNamesForExam = (exam?: string | null) => {
  const value = String(exam || "").toLowerCase();
  if (value.includes("neet")) return ["biology", "physics", "chemistry"];
  if (value.includes("board")) return ["physics", "chemistry", "maths"];
  if (value.includes("jee")) return ["maths", "physics", "chemistry"];
  return [];
};

const canonicalSubjectName = (name?: string | null) => {
  const value = String(name || "").toLowerCase();
  if (value.startsWith("math")) return "maths";
  if (value.startsWith("bio")) return "biology";
  if (value.startsWith("phys")) return "physics";
  if (value.startsWith("chem")) return "chemistry";
  return value;
};

export const subjectsForExam = (
  subjects: ISubject[] | undefined,
  exam?: string | null
) => {
  const allowed = subjectNamesForExam(exam);
  if (!allowed.length) return subjects ?? [];
  return allowed.map(
    (name) =>
      subjects?.find((subject) => canonicalSubjectName(subject.name) === name) ?? {
        name,
        overall_efficiency: 0,
        overall_progress: 0,
        total_questions_solved: { number: 0, percentage: 0, total: 0 },
      }
  );
};
