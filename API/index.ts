import express from "express";

const app = express();
const port = 8080;

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};
run().catch(console.error);
