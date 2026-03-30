import express, { Request, Response, NextFunction } from "express";
import router from "./routes/index";
import { logger } from "./middleware/logger";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Custom logger middleware
app.use(logger);
// Use routes
app.use(router);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

//Calling the Database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
