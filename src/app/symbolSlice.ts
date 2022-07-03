import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD" || "KZT",
  symbol: "$" || "#",
};

const currencySymbol = createSlice({
  name: "symbol",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      if (state.currency === "USD") {
        state.symbol = "$";
      }
      if (state.currency === "KZT") {
        state.symbol = "₸";
      }
    },
  },
});
export const { setCurrency } = currencySymbol.actions;

export default currencySymbol.reducer;
