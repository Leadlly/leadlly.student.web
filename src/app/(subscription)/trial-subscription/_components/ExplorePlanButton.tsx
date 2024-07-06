"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

const ExplorePlanButton = () => {
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const atBottom = windowHeight + scrollTop >= documentHeight - 50; // 50px threshold

      if (atBottom) {
        setReachedBottom(true);
      } else {
        setReachedBottom(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={cn(
        "w-full fixed bottom-4 inset-x-0 flex items-center justify-center transition-all ease-in-out duration-200",
        reachedBottom && "hidden"
      )}
    >
      <Button className="animate-bounce" onClick={scrollDown}>
        <ChevronsDown className="w-5 h-5" />
        Explore Subscription Plan
      </Button>
    </div>
  );
};

export default ExplorePlanButton;
