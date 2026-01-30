// src/routes/index.ts

import { Router } from "express";
import { getProfile, getAbout, getProjects, postContact, getContactMessages } from "../controllers/portfolioController";

const router = Router();

// Portfolio API routes
router.get("/api/profile", getProfile);
router.get("/api/about", getAbout);
router.get("/api/projects", getProjects);
router.post("/api/contact", postContact);

// Optional: testing route to see all messages
router.get("/api/messages", getContactMessages);

export default router;
