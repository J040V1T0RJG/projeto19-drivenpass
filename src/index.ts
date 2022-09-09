import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`)
});
