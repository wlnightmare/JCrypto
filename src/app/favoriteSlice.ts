import { createSlice } from "@reduxjs/toolkit";

import { FavoriteStore } from "../types";

const initialState: FavoriteStore = {
  wishlist: [],
};

const favoriteSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existedItem = state.wishlist.find(
        (item) => item.uuid === action.payload.uuid
      );
      if (existedItem) {
        state.wishlist = [...state.wishlist];
      } else {
        let tempProductItem = { ...action.payload };
        state.wishlist.push(tempProductItem);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToCart } = favoriteSlice.actions;

export default favoriteSlice.reducer;
