"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { toast } from "sonner";

import { Button } from "../ui/button";

import apiClient from "@/apiClient/apiClient";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      const res = await apiClient.get("/api/auth/logout");
      toast.success(res.data?.message);
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
      variant={"ghost"}
      className="mt-auto w-full justify-start gap-3 text-[#5A10D9] rounded-full xl:rounded-xl text-base md:text-[20px] font-normal hover:text-white hover:bg-primary py-3 px-2 md:px-4">
      <LogOut className="w-4 h-4 md:w-5 md:h-5" />
      <span className="hidden xl:block">Logout</span>
    </Button>
  );
};

export default LogoutButton;
