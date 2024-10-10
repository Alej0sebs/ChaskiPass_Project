import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createBusStructure } from "../controllers/busStructure.controllers";

const router = Router();

// router.get('/', protectRoute, );  
router.post('/layout', protectRoute, createBusStructure );  

export default router;
