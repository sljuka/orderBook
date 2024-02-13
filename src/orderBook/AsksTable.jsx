import { useSelector } from "react-redux";
import { HeaderCell } from "./HeaderCell";
import { OrderBody } from "./OrderBody";
import { TableRow } from "./TableRow";

export const AsksTable = () => {
  const data = useSelector((state) => {
    const asksState = state.orderBook.asks;

    return Object.keys(asksState)
      .filter((key) => asksState[key] !== undefined)
      .map((key) => asksState[key])
      .sort((a, b) => b.price - a.price);
  });

  return (
    <div className="flex-col flex-1">
      <h2 className="text-sm">Asks</h2>
      <TableRow>
        <HeaderCell className="w-14 min-w-14 max-w-14" center>
          Count
        </HeaderCell>
        <HeaderCell>Amount</HeaderCell>
        <HeaderCell>Price</HeaderCell>
      </TableRow>
      <OrderBody data={data} />
    </div>
  );
};
