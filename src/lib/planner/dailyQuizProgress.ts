import { TQuizAnswerProps, TQuizQuestionProps } from "@/helpers/types";

const STORAGE_KEY = "leadlly_planner_quiz_progress";

export type StoredQuizTopic = {
  topicId: string;
  topicName: string;
  questions: TQuizQuestionProps[];
  answers: TQuizAnswerProps[];
  completed: boolean;
  synced: boolean;
  date: string;
};

const istDay = (value: Date | string = new Date()) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsed);
};

export const questionIdOf = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") {
    const row = value as { $oid?: string; _id?: unknown; id?: unknown };
    if (typeof row.$oid === "string") return row.$oid;
    if (row._id != null && row._id !== value) return questionIdOf(row._id);
    if (row.id != null && row.id !== value) return questionIdOf(row.id);
  }
  const text = String(value);
  return text === "[object Object]" ? "" : text;
};

const readAll = (): StoredQuizTopic[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredQuizTopic[]) : [];
    const today = istDay();
    return Array.isArray(parsed) ? parsed.filter((item) => item?.date === today) : [];
  } catch {
    return [];
  }
};

const writeAll = (topics: StoredQuizTopic[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
};

const sameTopic = (item: StoredQuizTopic, topicId: string, topicName: string) => {
  const name = topicName.trim().toLowerCase();
  return (
    (topicId && item.topicId === topicId) ||
    (name && item.topicName.trim().toLowerCase() === name)
  );
};

export const readQuizProgress = () => readAll();

export const readTopicQuiz = (topicId: string, topicName: string) =>
  readAll().find((item) => sameTopic(item, topicId, topicName)) || null;

export const saveTopicQuiz = (topic: Omit<StoredQuizTopic, "date"> & { date?: string }) => {
  const topics = readAll().filter((item) => !sameTopic(item, topic.topicId, topic.topicName));
  const next: StoredQuizTopic = {
    ...topic,
    date: topic.date || istDay(),
  };
  topics.push(next);
  writeAll(topics);
  return next;
};

export const pendingQuizSync = () => readAll().filter((item) => !item.synced && item.answers.length > 0);

export const markTopicQuizSynced = (topicId: string, topicName: string, completed: boolean) => {
  const current = readTopicQuiz(topicId, topicName);
  if (!current) return;
  saveTopicQuiz({ ...current, synced: true, completed: completed || current.completed });
};
