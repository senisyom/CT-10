export interface INews{
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export interface IComment{
    id: string;
    idNews: string;
    author: string;
    content: string;
}

export type NewsPlaceBrief = Omit<INews, 'content'>;
export type NewsWithoutId = Omit<INews, 'id'>;
export type CommentWithoutId = Omit<IComment, 'id'>;


export interface ILists{
    news: INews[];
    comments: IComment[];
}
