import { useSelector } from "react-redux";
import { HeaderCell } from "./HeaderCell";
import { OrderBody } from "./OrderBody";
import { TableRow } from "./TableRow";

export const BidsTable = () => {
  const data = useSelector((state) => {
    const bidsState = state.orderBook.bids;
    return Object.keys(bidsState)
      .filter((key) => bidsState[key] !== undefined)
      .map((key) => bidsState[key])
      .sort((a, b) => b.price - a.price);
  });

  return (
    <div className="flex-col flex-1">
      <h2 className="text-sm">Bids</h2>
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
