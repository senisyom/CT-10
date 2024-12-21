import { promises as fs } from 'fs';
import {
    NewsWithoutId,
    CommentWithoutId,
    INews, NewsPlaceBrief,
    IComment, ILists,
} from './types';
import { randomUUID } from 'crypto';

const fileName = './db.json';
let lists:ILists;

const fileDb = {
    async init(){
        try{
            const fileContent = await fs.readFile(fileName);
            lists = JSON.parse(fileContent.toString());
        }catch(e){
            lists = {
                news: [],
                comments: []
            };
        }
    },
    async getNews(){
        const getNews:NewsPlaceBrief[] = [];

        lists.news.map((news)=>{
            const newThing = {
                id: news.id,
                title: news.title,
                image: news.image,
                date: news.date,
            }
            getNews.push(newThing);
        });

        return getNews;
    },
    async getOneNews(id: string){
        const news = lists.news.find(p => p.id === id);
        if (news){
            return news;
        }else{
            return {};
        }
    },
    async getComments(){
        return lists.comments;
    },
    async addNews(item: NewsWithoutId){
        const news:INews = {
            ...item,
            id: randomUUID(),
        }

        lists.news.push(news);
        await this.save();
    },
    async addComment(item: CommentWithoutId){
        const comment:IComment = {
            ...item,
            id: randomUUID(),
        }

        lists.comments.push(comment);
        await this.save();
    },
    async deleteNews(id: string){
        let newsIndex:number|null = null;
        let commentsIndex:number|null = null;
        lists.news.find((p, index) => {
            if (p.id === id){
                newsIndex = index;
            }
        });
        lists.comments.find((p, index) => {
            if (p.idNews === id){
                commentsIndex = index;
            }
        });
        if (newsIndex !== null){
            lists.news.splice(newsIndex, 1);
        }
        if (commentsIndex !== null){
            lists.comments.splice(commentsIndex, 1);
        }
        await this.save();
    },
    async deleteComment(id: string){
        let itemIndex:number|null = null;
        lists.comments.find((p, index) => {
            if (p.id === id){
                itemIndex = index;
            }
        });
        if (itemIndex !== null){
            lists.comments.splice(itemIndex, 1);
            await this.save();
        }
    },
    async save(){
        await fs.writeFile(fileName, JSON.stringify(lists, null, 2));
    },
}

export default fileDb;