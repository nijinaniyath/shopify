import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyparser from "body-parser";
import morgan from "morgan";

import router from "@router/router";
import errorHandler from "@middleware/error-handler"

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(bodyparser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));

app.get("/", (_, res) => { res.json({ message: "server is up and running" }) })
app.use("/api/v1", router);
app.use(errorHandler.handleError);


export default app;


