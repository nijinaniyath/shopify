import dotenv from "dotenv";

import app from "./server/server";
import db from "@db/db";

dotenv.config()

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URL;

db.connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log(`Db connection failed`, err)
    });
