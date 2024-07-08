"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { toast } from "sonner";

import { Button } from "../ui/button";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      toast.success(responseData.message);
      dispatch(userData(null));
      router.push("/login");
    } catch (error: any) {
      toast.error("Logout Failed!", {
        description: error?.message,
      });
    }
  };
  return (
    <Button
      onClick={logoutHandler}
      variant={"outline"}
      className="w-full h-11 items-center gap-2 text-primary rounded-full xl:rounded-xl text-base md:text-lg font-normal hover:text-white hover:bg-primary py-3 px-2 md:px-4"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
