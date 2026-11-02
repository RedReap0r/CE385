import express from "express";
import { logger } from "./middlewares/logger.js";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";
import { studentsRouter } from "./routes/students.route.js";

export const app = express();

app.use((req, res, next) => {
  const origin = req.get("Origin");

  if (origin === "http://localhost:5173") {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(logger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/students", studentsRouter);

app.use(notFoundHandler);
app.use(errorHandler);