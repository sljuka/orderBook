import { OrderBook } from "./OrderBook";

export const OrderBookWidget = () => (
  <div className="flex items-center justify-center bg-gray-700 text-white p-4">
    <div className="flex flex-col w-full gap-4">
      <h1 className="uppercase text-sm font-semibold">
        Order Book <span className="text-gray-400">BTC/USD</span>
      </h1>
      <OrderBook />
    </div>
  </div>
);
