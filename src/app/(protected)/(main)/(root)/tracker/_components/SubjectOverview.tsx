import { ISubject } from "@/helpers/types";

const compact = (value: number) => {
  if (value >= 1000) {
    const scaled = value / 1000;
    return `${Number.isInteger(scaled) ? scaled : scaled.toFixed(1)}K`;
  }
  return String(Math.round(value));
};

const Bar = ({
  value,
  color,
  track,
}: {
  value: number;
  color: string;
  track: string;
}) => (
  <div className="h-3 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: track }}>
    <div
      className="h-full rounded-full"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, backgroundColor: color }}
    />
  </div>
);

const SubjectOverview = ({ subject }: { subject: ISubject | undefined }) => {
  const attempted = subject?.total_questions_solved.number ?? 0;
  const bank = subject?.total_questions_solved.total;
  const total = bank && bank > 0 ? bank : attempted;
  const attemptedProgress =
    total > 0
      ? (attempted / total) * 100
      : (subject?.total_questions_solved.percentage ?? 0);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-dark-primary">Subject Overview</h2>
      <div className="mb-2 space-y-3 rounded-2xl bg-primary/10 p-4">
        <div>
          <p className="mb-1 text-base font-medium">Revision Completion</p>
          <div className="flex items-center gap-3">
            <Bar value={subject?.overall_progress ?? 0} color="#8B5CF6" track="#EDE5F9" />
            <span className="text-lg font-semibold">{Math.round(subject?.overall_progress ?? 0)}%</span>
          </div>
        </div>
        <div>
          <p className="mb-1 text-base font-medium">Revision Efficiency</p>
          <div className="flex items-center gap-3">
            <Bar value={subject?.overall_efficiency ?? 0} color="#72EFDD" track="#D3E6EA" />
            <span className="text-lg font-semibold">{Math.round(subject?.overall_efficiency ?? 0)}%</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 rounded-2xl bg-[#ff9900]/10 p-4">
        <p className="text-base font-medium">Questions Attempted</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium">You:</p>
            <p className="text-2xl font-semibold">{compact(attempted)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Total:</p>
            <p className="text-2xl font-semibold">{compact(total)}</p>
          </div>
        </div>
        <Bar value={attemptedProgress} color="#ff9900" track="#FDE68A" />
      </div>
    </div>
  );
};

export default SubjectOverview;
