import { Router, type Request, type Response } from "express";
import { sushiMenu } from "../data/sushi.js";

const router = Router();

/**
 * @openapi
 * /api/sushi:
 *   get:
 *     summary: Get all sushi
 *     responses:
 *       200:
 *         description: List of sushi
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(sushiMenu);
});

/**
 * @openapi
 * /api/sushi/{id}:
 *   get:
 *     summary: Get sushi by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sushi ID
 *     responses:
 *       200:
 *         description: Sushi item
 *       404:
 *         description: Not found
 */
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sushi = sushiMenu.find((s) => s.id === id);

  if (!sushi) {
    return res.status(404).json({ message: "Sushi not found" });
  }

  res.status(200).json(sushi);
});

export default router;
