import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: {
    // [50016,2]: { price: 50016.2, count: 2, amount: 3.99677 }
  },
  asks: {},
};

export const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    bookUpdate: (state, action) => {
      const { price, count, amount } = action.payload;

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const currentData =
        state.bids[price] !== undefined ? state.bids[price] : state.asks[price];

      const priceData = currentData || {
        price,
        count,
        amount,
      };

      if (priceData !== undefined) {
        const newAmount = priceData.amount + amount;

        if (count <= 0) {
          state.bids[price] = undefined;
          state.asks[price] = undefined;
        } else if (newAmount < 0) {
          state.asks[price] = {
            price,
            amount: newAmount,
            count: count,
          };
          state.bids[price] = undefined;
        } else {
          state.bids[price] = {
            price,
            amount: newAmount,
            count,
          };
          state.asks[price] = undefined;
        }
      }
    },

    bookSnapshot: (state, action) => {
      const newState = action.payload.reduce(
        (acc, { price, count, amount }) => {
          if (count > 0) {
            if (amount > 0) {
              acc.bids[price] = { price, count, amount };
            } else {
              acc.asks[price] = { price, count, amount: amount };
            }
          } else {
            acc.bids[price] = undefined;
            acc.asks[price] = undefined;
          }

          return acc;
        },
        {
          bids: {},
          asks: {},
        }
      );

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.bids = { ...state.bids, ...newState.bids };
      state.asks = { ...state.asks, ...newState.asks };
    },
  },
});

// Action creators are generated for each case reducer function
export const { bookSnapshot, bookUpdate } = orderBookSlice.actions;

export default orderBookSlice.reducer;
