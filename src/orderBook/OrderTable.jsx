import { useEffect, useState } from "react";
import { HeaderCell } from "./HeaderCell";
import { OrderBody } from "./OrderBody";
import { TableRow } from "./TableRow";
import { useDispatch } from "react-redux";
import { bookSnapshot } from "./orderBookSlice";

const PRECISSION = {
  0: "P0",
  1: "P1",
  2: "P2",
  3: "P3",
  4: "P4",
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
      console.log("Message from server ", event.data);
      //   CHANNEL_ID, [[PRICE, COUNT, AMOUNT]]
      const [_, [price, count, amount]] = event.data;
      dispatch(bookSnapshot({ price, count, amount }));
    });

    return () => {
      socket.close();
    };
  }, [precission, dispatch]);

  return (
    <div className="flex flex-1 flex-col text-xs">
      <TableRow>
        <HeaderCell className="w-14 min-w-14 max-w-14" center>
          Count
        </HeaderCell>
        <HeaderCell>Amount</HeaderCell>
        <HeaderCell>Total</HeaderCell>
        <HeaderCell>Price</HeaderCell>
      </TableRow>
      <OrderBody data={[]} />
    </div>
  );
};
