import { Cell } from "./Cell";
import { TableRow } from "./TableRow";

export const OrderBody = ({ data }) => (
  <div className="flex flex-col">
    {data.map((x, i) => (
      <TableRow key={i}>
        <Cell className="w-14 min-w-14 max-w-14" center>
          {x.count}
        </Cell>
        <Cell>{x.amount}</Cell>
        <Cell>{x.total}</Cell>
        <Cell>{x.price}</Cell>
      </TableRow>
    ))}
  </div>
);
