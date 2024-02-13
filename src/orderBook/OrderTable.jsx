import { useEffect, useState } from "react";
import { HeaderCell } from "./HeaderCell";
import { OrderBody } from "./OrderBody";
import { TableRow } from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { bookSnapshot, bookUpdate } from "./orderBookSlice";

const PRECISSION = {
  0: "P0",
  1: "P1",
  2: "P2",
  3: "P3",
  4: "P4",
};

const decode = (data) => {
  try {
    const [_, priceData] = JSON.parse(data);

    if (priceData.length === 3)
      return {
        price: priceData[0],
        count: priceData[1],
        amount: priceData[2],
        update: true,
      };

    return priceData.map(([price, count, amount]) => ({
      price,
      amount,
      count,
    }));
  } catch (e) {
    console.log("ERROR", data);
    console.error(e);
    return null;
  }
};

const getChannelRequest = (precission) =>
  JSON.stringify({
    event: "subscribe",
    channel: "book",
    symbol: "tBTCUSD",
    precission: PRECISSION[precission],
  });

export const OrderTable = () => {
  const [precission, setPrecission] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send(getChannelRequest(precission));
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      //   "CHANNEL_ID, [[PRICE, COUNT, AMOUNT]]"
      const data = decode(event.data);
      console.log("AAA", data);

      if (!data) return;

      if (data.update) {
        dispatch(bookUpdate(data));
      } else {
        dispatch(bookSnapshot(data));
      }
    });

    return () => {
      socket.close();
    };
  }, [precission, dispatch]);

  const bids = useSelector((state) => {
    const bidsState = state.orderBook.bids;
    return Object.keys(bidsState)
      .filter((key) => bidsState[key] !== undefined)
      .map((key) => bidsState[key])
      .sort((a, b) => b.price - a.price);
  });

  const asks = useSelector((state) => {
    const asksState = state.orderBook.asks;

    return Object.keys(asksState)
      .filter((key) => asksState[key] !== undefined)
      .map((key) => asksState[key])
      .sort((a, b) => b.price - a.price);
  });

  return (
    <div className="flex flex-1 lg:flex-row sm:flex-col text-xs gap-4">
      <div className="flex-col flex-1">
        <h2 className="text-sm">Bids</h2>
        <TableRow>
          <HeaderCell className="w-14 min-w-14 max-w-14" center>
            Count
          </HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Price</HeaderCell>
        </TableRow>
        <OrderBody data={bids} />
      </div>
      <div className="flex-col flex-1">
        <h2 className="text-sm">Asks</h2>
        <TableRow>
          <HeaderCell className="w-14 min-w-14 max-w-14" center>
            Count
          </HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Price</HeaderCell>
        </TableRow>
        <OrderBody data={asks} />
      </div>
    </div>
  );
};
