import { Router } from "express";
import { filterFrequencies } from "../controllers/filterFrequencies.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { createFrequency, createRoute } from "../controllers/routes.controller";

const router = Router();

router.post('/', filterFrequencies);
router.post('/route', protectRoute, createRoute);
router.post('/frequency', protectRoute, createFrequency);

export default router;