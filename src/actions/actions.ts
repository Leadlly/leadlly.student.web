"use server";

export default async function getSubjectChapters(
  subject: string,
  standard: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_QUESTION_BANK_BASE_URL}/get/chapter?subjectName=${subject}&standard=${standard}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  return data;
}
