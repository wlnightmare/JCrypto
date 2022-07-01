import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/api";
import { cryptoNewsApi } from "../services/cryptoNews";
import themeSlice from "./themeSlice";
import currencySymbol from "./symbolSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    mode: themeSlice,
    currency: currencySymbol,
    modal: modalSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
