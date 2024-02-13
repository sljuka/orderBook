import { Cell } from "./Cell";
import { TableRow } from "./TableRow";

export const OrderBody = ({ data }) => (
  <div className="flex flex-col">
    {data.map(({ price, amount, count }) => (
      <TableRow key={price}>
        <Cell className="w-14 min-w-14 max-w-14" center>
          {count}
        </Cell>
        <Cell>{amount.toFixed(2)}</Cell>
        <Cell>{price.toFixed(2)}</Cell>
      </TableRow>
    ))}
  </div>
);
