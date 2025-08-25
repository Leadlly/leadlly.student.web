"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { toast } from "sonner";

import { Button } from "../ui/button";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { clearInstitute } from "@/redux/slices/instituteSlice";
import apiClient from "@/apiClient/apiClient";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      const response = await apiClient.get("/api/auth/logout");

      const responseData = response.data;
      toast.success(responseData.message);
      router.push("/login");
      dispatch(userData(null));
      dispatch(clearInstitute());
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
      className="w-full h-11 items-center gap-2 text-primary hover:text-primary hover:bg-primary/10 border-primary rounded-full xl:rounded-xl text-base md:text-lg font-normal py-3 px-2 md:px-4"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
