import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-main-height flex items-center justify-center bg-white text-primary">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
