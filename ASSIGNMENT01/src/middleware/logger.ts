// src/middleware/logger.ts
import { Request, Response, NextFunction } from "express";

// Custom logger middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
