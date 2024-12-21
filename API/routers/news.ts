import express from "express";
import fileDb from "../fileDb";
import {NewsWithoutId} from "../types";
const newsRouter = express.Router();
import {imagesUpload} from "../multer";

newsRouter.get('/news', async (req, res) => {
    const news = await fileDb.getNews();
    return res.send(news);
});

newsRouter.get('/news/:id', async (req, res) => {
    const news = await fileDb.getOneNews(req.params.id);
    return res.send(news);
});

newsRouter.post('/news', imagesUpload.single('image'), async (req, res) => {
    if(!req.body.title || !req.body.content){
        return res.status(400).send({"error": "Category name must be present in the request"});
    }

    const news:NewsWithoutId = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? req.file.filename : null,
        date: new Date().toISOString(),
    }
    await fileDb.addNews(news);
});

newsRouter.delete('/news/:id', async (req, res) => {
    await fileDb.deleteNews(req.params.id);
});

export default newsRouter;