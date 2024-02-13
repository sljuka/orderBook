import { clsx } from "clsx";

export const Cell = ({ children, className, center }) => (
  <div
    className={clsx(
      className,
      "flex-1 font-semibold",
      center ? "text-center" : "text-right"
    )}
  >
    {children}
  </div>
);
