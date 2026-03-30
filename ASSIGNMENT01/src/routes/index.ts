

import { Router } from "express";
import playerRoutes from "./playerRoutes";
import tournamentRoutes from "./tournamentRoutes";
const router = Router();


router.use("/api/tournaments", tournamentRoutes);

router.use("/api/players", playerRoutes);

export default router;
