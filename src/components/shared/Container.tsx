import { TContainerProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const Container = ({ children, className }: TContainerProps) => {
  return (
    <div className={cn("max-w-7xl w-full mx-auto", className)}>{children}</div>
  );
};

export default Container;
