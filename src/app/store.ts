import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/api";
import { cryptoNewsApi } from "../services/cryptoNews";
import themeSlice from "./themeSlice";
import currencySymbol from "./symbolSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    mode: themeSlice,
    currency: currencySymbol,
    user: userSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
