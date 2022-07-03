import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/api";
import { cryptoNewsApi } from "../services/cryptoNews";
import themeSlice from "./themeSlice";
import currencySymbol from "./symbolSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import favoriteSlice from "./favoriteSlice";
import coinsSlice from "./coins.Slice";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    mode: themeSlice,
    currency: currencySymbol,
    user: userSlice,
    modal: modalSlice,
    wishlist: favoriteSlice,
    coins: coinsSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
