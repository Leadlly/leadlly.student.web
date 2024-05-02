import clsx from "clsx";
import { THeaderProps } from "@/helpers/types";

const Header = ({
  title,
  className,
  icon: Icon,
  titleClassName,
}: THeaderProps) => {
  return (
    <header>
      <div
        className={clsx(
          "text-page-title font-semibold flex items-center justify-between",
          className
        )}>
        <h2 className={clsx(titleClassName)}>{title}</h2>
        {Icon && <div>{Icon}</div>}
      </div>
    </header>
  );
};

export default Header;
