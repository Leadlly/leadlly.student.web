"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const AIMentorFloatingButton = () => {
  const pathname = usePathname();
  
  if (pathname === "/ai-mentor") {
    return null;
  }

  return (
    <Link
      href="/ai-mentor"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium text-sm">Chat with AI Mentor</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
    </Link>
  );
};

export default AIMentorFloatingButton;
