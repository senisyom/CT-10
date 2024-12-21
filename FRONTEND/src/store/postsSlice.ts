import { GetNews, INews } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { addPost, fetchNews, fetchOneNews } from "./postsThunk.ts";

interface NewsState {
  news: GetNews[];
  oneNews: INews | null;
  onePostsLoaded: boolean;
  newsLoaded: boolean;
  addLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  newsLoaded: false,
  onePostsLoaded: false,
  addLoading: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoaded = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload: items }) => {
        state.newsLoaded = false;
        state.news = items;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsLoaded = false;
      });
    builder
      .addCase(fetchOneNews.pending, (state) => {
        state.onePostsLoaded = true;
      })
      .addCase(fetchOneNews.fulfilled, (state, { payload: items }) => {
        state.onePostsLoaded = false;
        state.oneNews = items;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.onePostsLoaded = false;
      });
    builder
      .addCase(addPost.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.addLoading = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectOneNews: (state) => state.oneNews,
    selectNewsLoading: (state) => state.newsLoaded,
    selectOnePostsLoading: (state) => state.onePostsLoaded,
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsLoading,
  selectOnePostsLoading,
  selectOneNews,
} = newsSlice.selectors;
