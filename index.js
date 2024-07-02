import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnect from "./db/database.js";
import morgan from "morgan";
const app = express();

app.use(bodyParser.json());
app.use(cors());

import route from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


dbConnect();
app.use(morgan("dev"));
app.use("/api", route);
app.use(errorMiddleware);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
