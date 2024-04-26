import { ChatIcon, RequestMeetingIcon, VideoChatIcon } from "@/components";
import ConnectButton from "./ConnectButton";

const ConnectWithMentor = () => {
  return (
    <div className="px-3">
      <h4 className="text-lg font-bold text-center py-4">
        Connect with mentor
      </h4>

      <div className="flex flex-col justify-start gap-3 w-full">
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
