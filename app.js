//import됨과 동시에 임포트 대상의 파일이 실행에 들어간다.

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter); // "/"루트에서 접속이 들어왔을시 옆의 라우터가 제공하는 url에 접속이 들어오면 라우터를 실행하는 것.
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
console.log("I am in to app.js. it's test");
export default app;
