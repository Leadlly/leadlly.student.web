  import Link from "next/link";

  import { cn } from "@/lib/utils";
  import { Header } from "@/components";
  import { MotionDiv } from "@/components/shared/MotionDiv";

  import ChatComponent from "./_components/ChatComponent";
  import MeetingsComponent from "./_components/MeetingsComponent";
  import RequestMeetingComponent from "./_components/RequestMeetingComponent";

  const chatPageTabs = [
    {
      title: "chat",
      id: "chat",
      desktopView: true,
    },
    {
      title: "meetings",
      id: "meetings",
      desktopView: true,
    },
    {
      title: "request meeting",
      id: "requestMeeting",
      desktopView: false,
    },
  ];

  const ChatPage = ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) => {
    const activeChatTab = searchParams["tab"] ?? "chat";

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
                className={cn("relative max-w-max mx-auto w-full py-3 px-4 md:px-8", tab.desktopView?'':'lg:hidden')}>
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
                    "flex items-center justify-between w-full capitalize text-base md:text-xl text-black",
                    activeChatTab === tab.id ? "text-primary" : "text-black"
                  )}>
                  {tab.title}
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex-1">
            {activeChatTab === "chat" && (
              <ChatComponent
                chatData={{
                  img: "/assets/images/mentor.png",
                  title: "Dhruvi Rawal",
                  status: "Last seen today at 11:50 PM",
                  messages: [
                    {
                      sender: "user",
                      text: "Hello there!",
                      timestamp: "9:00 AM",
                    },
                    {
                      sender: "mentor",
                      text: "Hi! How can I help you today?",
                      timestamp: "9:05 AM",
                    },
                    {
                      sender: "user",
                      text: "I need some assistance with my project.",
                      timestamp: "9:10 AM",
                    },
                    {
                      sender: "mentor",
                      text: "Sure, I`d be happy to help. What specifically do you need assistance with?",
                      timestamp: "9:15 AM",
                    },
                    {
                      sender: "user",
                      text: "I`m having trouble with the implementation of a feature.",
                      timestamp: "9:20 AM",
                    },
                    {
                      sender: "mentor",
                      text: "Okay, let`s take a look at your code and debug it together.",
                      timestamp: "9:25 AM",
                    },
                    // Add more messages
                  ],
                }}
              />
            )}

            {activeChatTab === "meetings" && <MeetingsComponent />}

            {activeChatTab === "requestMeeting" && <RequestMeetingComponent />}
          </div>
        </div>
      </div>
    );
  };

  export default ChatPage;
