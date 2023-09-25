import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import searchSlice from "./searchSlice/slice";
import newsSlice from "./newsSlice/slice";

const store = configureStore({
  devTools: true,
  reducer: {
    search: searchSlice,
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
