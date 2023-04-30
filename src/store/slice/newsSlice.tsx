import { createSlice } from "@reduxjs/toolkit";
import { createNews, getNewsList } from "../actions/newsActions";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    isNewsCreationPending: false,
    isNewsCreated: false,
    error: "",

    isGetNewsSuccess: false,
    isGetNewsPending: false,
  },
  reducers: {
    resetNewsUpdateStatus: (state) => {
      state.isNewsCreated = false;
      state.error = "";
      state.isGetNewsSuccess = false;
      state.isGetNewsPending = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNews.pending, (state, action) => {
      state.isNewsCreationPending = true;
    });
    builder.addCase(createNews.fulfilled, (state, action) => {
      state.isNewsCreationPending = false;
      state.isNewsCreated = true;
    });
    builder.addCase(createNews.rejected, (state, action) => {
      state.isNewsCreationPending = false;
      state.error = "Some error occured in function";
    });

    builder.addCase(getNewsList.pending, (state, action) => {
      state.isGetNewsPending = true;
    });
    builder.addCase(getNewsList.fulfilled, (state, action) => {
      state.news = action.payload.data;
      state.isGetNewsPending = false;
      state.isGetNewsSuccess = true;
    });
    builder.addCase(getNewsList.rejected, (state, action) => {
      state.isGetNewsPending = false;
      state.error = "Some error occured in function";
    });
  },
});

export const { resetNewsUpdateStatus } = newsSlice.actions;
export default newsSlice.reducer;
export const newsSelector = (state: any) => state.news;
