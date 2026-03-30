import { Router, Request, Response } from "express";
import Player from "../models/player";

const router = Router();

// CREATE player
router.post("/", async (req: Request, res: Response) => {
  try {
    const newPlayer = new Player(req.body);
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create player" });
  }
});

//  GET all players
router.get("/", async (req: Request, res: Response) => {
  try {
    const players = await Player.find().populate("tournamentId"); 
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

//  GET one player by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id).populate("tournamentId");
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch player" });
  }
});

//  UPDATE player
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update player" });
  }
});

//  DELETE player
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete player" });
  }
});

export default router;