import express from "express";
import fileDb from "../fileDb";
import { CommentWithoutId, IComment } from "../types";

const commentsRouter = express.Router();
commentsRouter.get("/comments", async (req, res) => {
  const comments = await fileDb.getComments();
  const newsId = req.query.news_id as string;
  let result: IComment[] = [];
  if (newsId) {
    comments.find((comment, index) => {
      if (comment.idNews === newsId) {
        result.push(comment);
      }
    });
  } else {
    result = comments;
  }
  return res.send(result);
});
commentsRouter.post("/comments", async (req, res) => {
  if (!req.body.idNews || !req.body.content) {
    return res
      .status(400)
      .send({ error: "Category name must be present in the request" });
  }
  const comment: CommentWithoutId = {
    author: req.body.author ? req.body.author : "Anonymous",
    idNews: req.body.idNews,
    content: req.body.content,
  };
  await fileDb.addComment(comment);
});
commentsRouter.delete("/comments/:id", async (req, res) => {
  const comment = await fileDb.deleteComment(req.params.id);
});
export default commentsRouter;
