import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchSchema, fetchNewsType, sortType, statusType } from "./types";
import PostService from "@/API/PostService";
import { clearNews, setNews } from "../newsSlice/slice";

const initialState: SearchSchema = {
  searchVal: "",
  itemsQuantity: 12,
  sort: sortType.NEWEST,
  status: statusType.INIT,
  currentPage: 1,
};

export const fetchNews = createAsyncThunk(
  "search/getNews",
  async (searchObj: fetchNewsType, ThunkAPI) => {
    if (searchObj.needToClear) {
      ThunkAPI.dispatch(clearNews());
      searchObj.currentPage = 1;
      ThunkAPI.dispatch(setCurrentPage(1));
    }

    const { data } = await PostService.getNewsByTitle(searchObj);
    ThunkAPI.dispatch(setNews(data.response.results));
    ThunkAPI.dispatch(incrementPage());
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchVal: (state, action: PayloadAction<string>) => {
      state.searchVal = action.payload;
    },
    setSort: (state, action: PayloadAction<sortType>) => {
      state.sort = action.payload;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.itemsQuantity = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setInitialValues: (state, action: PayloadAction<SearchSchema>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = statusType.LOADING;
      })
      .addCase(fetchNews.fulfilled, (state) => {
        state.status = statusType.SUCCESS;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = statusType.ERROR;
      });
  },
});

export const {
  setSearchVal,
  setSort,
  setQuantity,
  incrementPage,
  setCurrentPage,
  setInitialValues,
} = searchSlice.actions;
export default searchSlice.reducer;
