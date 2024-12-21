import { GetNews, INews } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  fetchNews,
  fetchOneNews,
  fetchComments,
} from "./postsThunk.ts";

interface NewsState {
  news: GetNews[];
  oneNews: INews | null;
  onePostsLoaded: boolean;
  newsLoaded: boolean;
  addLoading: boolean;
  comments: any[];
  commentsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  newsLoaded: false,
  onePostsLoaded: false,
  addLoading: false,
  comments: [],
  commentsLoading: false,
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
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: items }) => {
        state.commentsLoading = false;
        state.comments = items;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsLoading = false;
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
