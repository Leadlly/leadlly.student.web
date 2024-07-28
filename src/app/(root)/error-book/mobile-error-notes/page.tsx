"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ErrorNotesMaximized from "../components/ErrorNotesMaximized";
import Link from "next/link";

const useIsSmallDevice = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth <= 1024); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isSmallDevice;
};

const Page = () => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <div>
      {isSmallDevice ? (
        <>
          <div className="flex gap-2 py-5 items-center">
            <Link href={"/error-book"}>
              <ArrowLeft />
            </Link>
            <div className="text-xl font-bold">Error Notes</div>
          </div>
          <ErrorNotesMaximized />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default Page;
