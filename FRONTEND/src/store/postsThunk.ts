import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { CommentWithoutId, GetNews, IComment, INews, PostNews } from "../types";

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

export const addPost = createAsyncThunk<void, PostNews>(
  "news/create",
  async (postMutation: PostNews) => {
    const formData = new FormData();
    formData.append("title", postMutation.title);
    formData.append("content", postMutation.content);
    if (postMutation.image) {
      formData.append("image", postMutation.image);
    }
    await axiosApi.post("/news", formData);
  }
);

export const addComment = createAsyncThunk<void, CommentWithoutId>(
  "comment/create",
  async (commentMutation: CommentWithoutId) => {
    const newComment = {
      ...commentMutation,
    };
    await axiosApi.post("/comments", newComment);
  }
);
