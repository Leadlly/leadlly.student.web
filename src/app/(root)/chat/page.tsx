import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components";
import { MotionDiv } from "@/components/shared/MotionDiv";
import ChatComponent from "./_components/ChatComponent";
import MeetingsComponent from "./_components/MeetingsComponent";
import RequestMeetingComponent from "./_components/RequestMeetingComponent";
import { chatPageTabs } from "@/helpers/constants/index";
import { getMeetings } from "@/actions/meeting_actions";
import Loader from "@/components/shared/Loader";
import { getMentorInfo, getUser } from "@/actions/user_actions";
import NotificationBadge from "./_components/NotificationBadge";

const ChatPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeChatTab = searchParams["tab"] ?? chatPageTabs[0].title;

  const user = getUser(); 
  const mentor = getMentorInfo(); 
  const upcomingMeetingData = getMeetings("");
  const doneMeetingsData = getMeetings("done");

  const [upcomingMeeting, doneMeeting, userData, mentorData] = await Promise.all([
    upcomingMeetingData,
    doneMeetingsData,
    user,
    mentor
  ]);

  if (
    !upcomingMeeting ||
    !upcomingMeeting.success ||
    !doneMeeting ||
    !doneMeeting.success
  ) {
    return <Loader />;
  }

  if (!userData.user.mentor.id) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-center text-lg md:text-xl">
          You can access this section once a mentor is allotted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start gap-3 md:gap-6 h-full">
      <Header
        title="Connect with mentor"
        titleClassName="text-xl md:text-3xl lg:text-page-title"
      />

      <div className="flex flex-col justify-start gap-4">
        <ul className="flex justify-center items-center bg-primary/10 rounded-md md:rounded-3xl overflow-hidden shadow-md">
          {chatPageTabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/chat?tab=${tab.id}`}
              className={cn(
                "relative max-w-max mx-auto w-full py-3 px-4 md:px-8",
                tab.desktopView ? "" : "lg:hidden"
              )}
            >
              {activeChatTab === tab.id && (
                <MotionDiv
                  layoutId="active_chat_tab"
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  className="absolute rounded h-1 bg-primary inset-x-0 bottom-0"
                />
              )}
              <li
                className={cn(
                  "relative flex items-center justify-between w-full capitalize text-base md:text-xl text-black",
                  activeChatTab === tab.id ? "text-primary" : "text-black"
                )}
              >
                {tab.title}
                {tab.id === "chat" && (
                  <NotificationBadge type="chat" />
                )}
                {tab.id === "meetings" && (
                  <NotificationBadge type="meeting" />
                )}
              </li>
            </Link>
          ))}
        </ul>

        <div className="flex-1 mb-2">
          {activeChatTab === "chat" && (
            <ChatComponent
              data={{
                img: "/assets/images/dsq_image.png",
                title: mentorData.mentor.firstname,
                status: ""
              }}
            />
          )}

          {activeChatTab === "meetings" && (
            <MeetingsComponent
              upcomingMeetings={upcomingMeeting.meetings}
              doneMeetings={doneMeeting.meetings}
            />
          )}

          {activeChatTab === "requestMeeting" && <RequestMeetingComponent />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
