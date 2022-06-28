import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/api";
import { cryptoNewsApi } from "../services/cryptoNews";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
