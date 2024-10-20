import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { creatSellerSerialNumber, getSerialNumbers } from "../controllers/serialStation.controllers";

const router= Router();

router.get('/', protectRoute, getSerialNumbers);
router.post('/serial', protectRoute, creatSellerSerialNumber);

export default router;