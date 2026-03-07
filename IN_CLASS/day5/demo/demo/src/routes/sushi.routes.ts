import { Router, type Request, type Response } from "express";
import { sushiMenu, type Sushi } from "../data/sushi.js";

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
// GET all sushi
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
 *         description: sushi ID
 *     responses:
 *       200:
 *         description: Sushi item
 *       404:
 *         description: Not found
 */
// GET single sushi
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sushi = sushiMenu.find((item) => item.id === id);

  if (!sushi) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  res.status(200).json(sushi);
});

/**
 * @openapi
 * /api/sushi:
 *   post:
 *     summary: Create a new sushi item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
// POST new sushi
router.post("/", (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      error: "Name and price are required",
    });
  }

  const newSushi: Sushi = {
    id: sushiMenu.length + 1,
    name,
    price,
  };

  sushiMenu.push(newSushi);

  res.status(201).json(newSushi);
});

/**
 * @openapi
 * /api/sushi/{id}:
 *   put:
 *     summary: Update a sushi item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
// PUT update sushi
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const sushi = sushiMenu.find((item) => item.id === id);

  if (!sushi) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  if (name !== undefined) sushi.name = name;
  if (price !== undefined) sushi.price = price;

  res.status(200).json(sushi);
});

/**
 * @openapi
 * /api/sushi/{id}:
 *   delete:
 *     summary: Delete a sushi item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
// DELETE sushi
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = sushiMenu.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Sushi not found" });
  }

  sushiMenu.splice(index, 1);

  res.status(204).send();
});
export default router;
