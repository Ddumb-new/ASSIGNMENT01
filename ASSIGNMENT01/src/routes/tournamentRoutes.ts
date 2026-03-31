import { Router, Request, Response } from "express";
import Tournament from "../models/Tournament";
import Player from "../models/Player";
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
//  DELETE tournament
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!deletedTournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tournament" });
  }
});
// UPDATE tournament
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tournament" });
  }
});

// GET all players for a specific tournament
router.get("/:id/players", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

      console.log(" Requested ID:", id);

  const allPlayers = await Player.find();
  console.log(" ALL PLAYERS:", allPlayers);

    const players = await Player.find({
      tournamentId: id,
    });
    console.log("Filtered Players",players);

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players for tournament" });
  }
});
// GET single tournament by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tournament" });
  }
});
export default router;