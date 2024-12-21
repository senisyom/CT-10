export interface INews {
  id: string;
  title: string;
  content: string;
  image: string | null;
  date: string;
}

export interface IComment {
  id: string;
  idNews: string;
  author: string;
  content: string;
}

export type GetNews = Omit<INews, "content">;
export interface PostNews {
  title: string;
  content: string;
  image: string | null;
}

export type CommentWithoutId = Omit<IComment, "id">;

export interface ILists {
  news: INews[];
  comments: IComment[];
}
