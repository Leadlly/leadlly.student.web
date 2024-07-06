"use client";

import { getUser } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

const GoogleLoginButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await axios.post(
          "/api/google/auth",
          {
            access_token: credentialResponse.access_token,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const userInfo = await getUser();
        dispatch(userData(userInfo.user));

        toast.success("Login success", {
          description: res.data.message,
        });

        if (res.status === 201) {
          router.replace("/initial-info");
        } else {
          router.replace("/");
        }
      } catch (error: any) {
        console.error("Axios error:", error);
        toast.error("Google login failed!", {
          description: error.response?.data?.message || error.message,
        });
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      toast.error("Google login failed!", {
        description: error.message,
      });
    },
  });

  return (
    <Suspense fallback={<Loader />}>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => login()}
        className="w-full text-lg lg:text-xl h-12 gap-2"
      >
        <Image
          src="/assets/icons/google-icon.svg"
          alt="Sign in with Google"
          width={17}
          height={17}
        />
        Sign in with Google
      </Button>
    </Suspense>
  );
};

export default GoogleLoginButton;
