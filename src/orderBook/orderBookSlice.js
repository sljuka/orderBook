import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: {},
  asks: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    bookSnapshot: (state, action) => {
      const {} = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { bookSnapshot } = counterSlice.actions;

export default counterSlice.reducer;
