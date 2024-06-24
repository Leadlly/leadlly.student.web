import { getUser } from "@/actions/user_actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfileBox = async () => {
  const userData = await getUser();

  return (
    <div className="flex flex-col justify-center xl:justify-start xl:gap-4 border rounded-xl bg-gradient-to-b from-white/15 to-primary/15 px-5 py-3">
      <div className="flex items-center flex-col xl:flex-row gap-3 xl:gap-6">
        <Avatar className="w-16 h-16 md:hidden xl:block">
          <AvatarImage
            src={userData.user.avatar.url}
            alt={`${userData.user.name}'s profile`}
          />
          <AvatarFallback className="text-2xl font-semibold capitalize">
            {userData.user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start gap-1 xl:gap-2">
          <h2 className="text-xl xl:text-base font-semibold text-black whitespace-nowrap capitalize">
            <span className="text-primary">Hello,</span> {userData.user.name}
          </h2>

          <div className="hidden xl:block w-full">
            <Link href={"/manage-account"}>
              <Button
                variant={"outline"}
                className="text-primary hover:text-primary/80 h-7">
                Manage Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-base xl:text-sm text-black font-normal space-y-2">
        <p>
          Embrace the course as a catalyst for personal growth and empowerment,
          propelling you towards success with unwavering determination.
        </p>

        <div className="w-full flex items-center justify-center xl:hidden">
          <Link href={"/manage-account"}>
            <Button
              variant={"outline"}
              className="text-primary hover:text-primary/80">
              Manage Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
