import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/web.js";
dotenv.config();
// console.log(express.json())
const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(5000, (error)=> {
    if (error) console.log(error);
    console.log("Server listening on PORT", 5000);
});