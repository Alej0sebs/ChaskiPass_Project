import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createBusStructure, getBusStructure } from "../controllers/busStructure.controllers";

const router = Router();

router.get('/', protectRoute, getBusStructure);
router.post('/layout', protectRoute, createBusStructure );  

export default router;
