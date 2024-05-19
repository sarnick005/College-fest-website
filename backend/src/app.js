import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

// Resolve the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// ROUTER IMPORT
import adminRouter from "./routes/admin.Routes.js";
import postRouter from "./routes/post.Routes.js";

// API routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/posts", postRouter);

export { app };
