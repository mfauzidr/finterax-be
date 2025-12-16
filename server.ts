import * as dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import router from "./src/shared/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const corsConfig: CorsOptions = {
  origin: ["http://localhost:8888", "http://localhost:8080"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Authorization", "x-headers", "Content-Type"],
};
app.use(cors(corsConfig));

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Backend is running well 🚀",
    environment: process.env.NODE_ENV,
  });
});

app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `✅ Server running on port ${PORT} — DB: ${
      process.env.DB_NAME || "not specified"
    }`
  );
});

export default app;
