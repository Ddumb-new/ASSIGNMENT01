import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import type Sushi from "../models/sushi.js";

const router = Router();

/**
 * GET all sushi
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }

    const sushiMenu = (await collections.sushiMenu
      .find({})
      .toArray()) as Sushi[];

    res.status(200).send(sushiMenu);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});

/**
 * GET single sushi by ID
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.status(400).send("ID is required");
    }

    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }

    const query = { _id: new ObjectId(id as string) };
    const sushi = (await collections.sushiMenu.findOne(query)) as Sushi;

    if (sushi) {
      res.status(200).send(sushi);
    } else {
      res.status(404).send("Sushi not found");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});

/**
 * POST a new sushi
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const newSushi = req.body as Sushi;

    if (!collections.sushiMenu) {
      return res.status(500).send("Collection not initialized");
    }

    const result = await collections.sushiMenu.insertOne(newSushi);

    result
      ? res
          .status(201)
          .send(`Successfully created a new sushi with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new sushi.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(String(error));
    }
  }
});

export default router;