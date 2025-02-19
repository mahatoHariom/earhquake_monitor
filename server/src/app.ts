import express from "express";
import cors from "cors";
import { readingRouter } from "./routes/reading";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", readingRouter);
app.use(errorHandler);

export default app;
