import { ChatIcon, RequestMeetingIcon, VideoChatIcon } from "@/components";
import ConnectButton from "./ConnectButton";

const ConnectWithMentor = () => {
  return (
    <div className="md:px-3">
      <h4 className="text-xs md:text-lg font-bold md:text-center py-1 md:py-4">
        Connect with mentor
      </h4>

      <div className="grid grid-cols-3 gap-1 md:flex md:flex-col md:justify-start md:gap-3 w-full">
        <ConnectButton
          title="Connect with mentor"
          icon={<ChatIcon stroke="black" />}
        />

        <ConnectButton
          title="Conference meeting"
          icon={<VideoChatIcon stroke="black" />}
        />

        <ConnectButton
          title="Request a meeting"
          icon={<RequestMeetingIcon stroke="black" />}
        />
      </div>
    </div>
  );
};

export default ConnectWithMentor;
