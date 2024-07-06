import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white text-primary">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
