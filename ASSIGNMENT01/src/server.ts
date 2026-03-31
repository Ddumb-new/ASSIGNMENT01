import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/index";
import { logger } from "./middleware/logger";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

// 🔹 API routes
app.use("/api", router);

// 🔹 Serve static frontend
app.use(express.static(path.join(__dirname, "../public")));

// 🔹 Root route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 🔹 404 API fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// 🔹 Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 🔹 DB
connectDB();

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});