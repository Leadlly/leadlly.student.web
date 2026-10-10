import Link from "next/link";

import { cn } from "@/lib/utils";

import MeetingsComponent from "./_components/MeetingsComponent";
import RequestMeetingComponent from "./_components/RequestMeetingComponent";
import AIMentor from "./_components/AIMentor";

import { getMeetings } from "@/actions/meeting_actions";
import { getUser } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";
import MentorPaywall from "@/components/shared/MentorPaywall";
import { hasActiveSubscription } from "@/lib/subscription";

const mentorTabs = [
  { title: "Mentor", id: "mentor" },
  { title: "Meetings", id: "meetings" },
];

const ChatPage = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const { user } = await getUser();

  if (!hasActiveSubscription(user)) {
    return <MentorPaywall />;
  }

  const activeChatTab = searchParams["tab"] ?? "mentor";

  const upcomingMeetingData = getMeetings("");
  const doneMeetingsData = getMeetings("done");

  const [upcomingMeeting, doneMeeting] = await Promise.all([
    upcomingMeetingData,
    doneMeetingsData,
  ]);

  if (
    !upcomingMeeting ||
    !upcomingMeeting.success ||
    !doneMeeting ||
    !doneMeeting.success
  ) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4 md:h-full">
      <h1 className="text-2xl font-semibold text-dark-primary md:text-3xl">Mentor</h1>

      <ul className="flex w-full items-center rounded-full bg-white p-1.5">
        {mentorTabs.map((tab) => {
          const active = activeChatTab === tab.id;
          return (
            <li key={tab.id} className="flex-1">
              <Link
                href={`/chat?tab=${tab.id}`}
                className={cn(
                  "flex h-11 items-center justify-center rounded-full text-base font-semibold",
                  active ? "bg-primary/10 text-primary" : "text-black"
                )}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="md:min-h-0 md:flex-1">
        {activeChatTab === "mentor" && <AIMentor />}
        {activeChatTab === "meetings" && (
          <MeetingsComponent
            upcomingMeetings={upcomingMeeting.meetings}
            doneMeetings={doneMeeting.meetings}
          />
        )}
        {activeChatTab === "requestMeeting" && <RequestMeetingComponent />}
      </div>
    </div>
  );
};

export default ChatPage;
