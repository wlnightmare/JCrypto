import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "../types";

const initialState = {
  coins:
    JSON.parse(localStorage.getItem("coins") || "[]") || ([] as Currency[]),
};

const coinSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setData(state, action) {
      state.coins = action.payload;

      const mapped = state?.coins.map((element: Currency) => ({
        ...element,
        done: false,
      }));
      state.coins = mapped;
    },
    toggledone(state, action) {
      const index = state.coins.findIndex(
        (item: Currency) => item.uuid === action.payload.uuid
      );
      state.coins[index].done = true;
      localStorage.setItem("coins", JSON.stringify(state.coins));
    },
  },
});
export const { setData, toggledone } = coinSlice.actions;

export default coinSlice.reducer;
