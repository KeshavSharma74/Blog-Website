import express from "express";
import "dotenv/config";
import dbConnect from "./config/database.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/post',postRouter)

const port = process.env.PORT || 4000;

dbConnect();

app.get('/',(req,res)=>{
    return res.send("Server is live");
})

app.listen( port, ()=>{
    console.log(`Server is listening on ${port}`);
} )