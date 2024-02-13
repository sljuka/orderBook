import clsx from "clsx";
import { Cell } from "./Cell";

export const HeaderCell = ({ children, className, center }) => (
  <Cell center={center} className={clsx(className, "uppercase text-gray-400")}>
    {children}
  </Cell>
);
