import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { getCooperativeByID, getCooperatives } from "../controllers/cooperatives.controllers";

const router = Router();

router.get('/', protectRoute, getCooperatives);
router.get('/:id', protectRoute, getCooperativeByID);

export default router;