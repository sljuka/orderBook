import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "./orderBook/orderBookSlice";

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});
