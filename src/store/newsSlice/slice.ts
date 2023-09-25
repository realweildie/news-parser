import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { newsSchema } from "./types";

const initialState: { news: newsSchema[] } = {
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<newsSchema[]>) => {
      state.news.push(...action.payload);
    },
    clearNews: (state) => {
      state.news = [];
    },
  },
});

export const { setNews, clearNews } = newsSlice.actions;
export default newsSlice.reducer;
