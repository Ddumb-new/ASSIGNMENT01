import { Router, Request, Response } from "express";
import Tournament from "../models/tournament";

const router = Router();

// GET all tournaments
router.get("/", async (req: Request, res: Response) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

// POST create tournament
router.post("/", async (req: Request, res: Response) => {
  try {
    const newTournament = new Tournament(req.body);
    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tournament" });
  }
});

export default router;