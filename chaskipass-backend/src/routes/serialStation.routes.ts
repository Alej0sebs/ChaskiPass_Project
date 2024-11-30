import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { creatSellerSerialNumber, getSerialNumberByStationAndDNI, getSerialNumbers } from "../controllers/serialStation.controllers";

const router= Router();

router.get('/', protectRoute, getSerialNumbers);
router.post('/serial', protectRoute, creatSellerSerialNumber);
router.get('/serialSeller', protectRoute, getSerialNumberByStationAndDNI);

export default router;