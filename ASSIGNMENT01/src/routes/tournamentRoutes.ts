import { Router, Request, Response } from "express";
import Tournament from "../models/tournament";
import Player from "../models/player";
import mongoose from "mongoose";
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

// GET all players for a specific tournament
router.get("/:id/players", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

      console.log("👉 Requested ID:", id);

  const allPlayers = await Player.find();
  console.log("👉 ALL PLAYERS:", allPlayers);

    const players = await Player.find({
      tournamentId: id,
    });
    console.log("Filtered Players",players);

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players for tournament" });
  }
});

export default router;