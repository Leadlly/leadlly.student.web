import clsx from "clsx";
import { THeaderProps } from "@/helpers/types";

const Header = ({
  title,
  className,
  icon: Icon,
  titleClassName,
}: THeaderProps) => {
  return (
    <header
      className={clsx(
        "w-full text-page-title leading-none font-semibold flex items-center justify-between",
        className
      )}>
      <h2 className={clsx(titleClassName)}>{title}</h2>
      {Icon && <div>{Icon}</div>}
    </header>
  );
};

export default Header;
