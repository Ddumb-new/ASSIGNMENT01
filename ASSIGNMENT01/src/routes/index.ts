

import { Router } from "express";
import playerRoutes from "./playerRoutes";
import tournamentRoutes from "./tournamentRoutes";
const router = Router();


router.use("/tournaments", tournamentRoutes);

router.use("/players", playerRoutes);

export default router;
