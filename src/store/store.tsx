import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slice/newsSlice";
import toastReducer from "./slice/uiSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    toast: toastReducer,
  },
});

export default store;
