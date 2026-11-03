import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

import express from "express";
import { config } from "./config/config.js";
import { UserRouter } from "./routes/user/UserRoute.js";
import cors from "cors";


const app = express();
app.use(
  cors({
    origin: "*", // Sesuaikan dengan URL Next.js kamu
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/API/", UserRouter);


app.listen(config.PORT, () => {
  console.log("server running", config.PORT);
});
