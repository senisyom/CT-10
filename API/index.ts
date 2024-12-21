import express from "express";
import fileDb from "./fileDb";
import commentsRouter from "./routers/comments";
import newsRouter from "./routers/news";
import cors, {CorsOptions} from "cors";

const app = express();
const port = 8080;

const whiteList = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback)=>{
        if(!origin || whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/', commentsRouter);
app.use('/', newsRouter);
const run = async()=>{
    await fileDb.init();

    app.listen(port, ()=>{
        console.log(`Server started on ${port}`);
    })
}
run().catch(console.error);