import { cn } from "@/lib/utils";

import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useId,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label,
    className = "",
    type = "text",
    placeholder = "",
    icon1,
    icon2,
    ...props
  },
  ref
) => {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="flex items-center gap-3 border rounded-lg px-4 h-11">
        {icon1 && icon1}

        <input
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
          className={cn("w-full bg-transparent outline-none h-full")}
        />

        {icon2 && icon2}
      </div>
    </div>
  );
};

export default forwardRef(Input);
