import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { GetNews, IComment, INews } from "../types";
export const fetchNews = createAsyncThunk<GetNews[]>(
  "news/fetchNews",
  async () => {
    const response = await axiosApi.get<GetNews[]>("/news");
    return response.data;
  }
);
export const fetchOneNews = createAsyncThunk<INews, string>(
  "oneNews/fetchOneNews",
  async (id) => {
    const response = await axiosApi.get<INews>(`/news/${id}`);
    return response.data;
  }
);
export const fetchComments = createAsyncThunk<IComment[], string>(
  "comments/fetchComments",
  async (id) => {
    const response = await axiosApi.get<IComment[]>(`/comments?news_id=${id}`);
    return response.data;
  }
);
