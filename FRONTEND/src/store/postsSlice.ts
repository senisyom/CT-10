import { GetNews, IComment, INews } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, fetchNews, fetchOneNews } from "./postsThunk.ts";

interface NewsState {
  news: GetNews[];
  oneNews: INews | null;
  comments: IComment[];
  newsLoaded: boolean;
  onePostsLoaded: boolean;
}
const initialState: NewsState = {
  news: [],
  oneNews: null,
  comments: [],
  newsLoaded: false,
  onePostsLoaded: false,
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
      .addCase(fetchComments.pending, (state) => {
        state.onePostsLoaded = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: items }) => {
        state.onePostsLoaded = false;
        state.comments = items;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.onePostsLoaded = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectOneNews: (state) => state.oneNews,
    selectNewsLoading: (state) => state.newsLoaded,
    selectOnePostsLoading: (state) => state.onePostsLoaded,
    selectComments: (state) => state.comments,
  },
});
export const newsReducer = newsSlice.reducer;
export const {
  selectNews,
  selectNewsLoading,
  selectOnePostsLoading,
  selectOneNews,
  selectComments,
} = newsSlice.selectors;
