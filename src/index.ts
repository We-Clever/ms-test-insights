import express from "express"
import router from "./routes/routes";
import cors from "cors";
import * as dotenv from "dotenv";
import ServerlessHttp from "serverless-http";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.raw({ limit: '50mb' }))
app.use(express.text())
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 5000, extended: true }))
app.use(cookieParser())
app.use(router);

module.exports.handler = ServerlessHttp(app);
