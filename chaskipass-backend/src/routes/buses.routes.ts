import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { busRegister, deleteBusById, editBusById, getBuses } from "../controllers/buses.controllers";

const router = Router();
router.get('/', protectRoute, getBuses);
router.post('/newBus', protectRoute, busRegister);
router.put('/updateBus:id', protectRoute, editBusById);
router.delete('/deleteBus:id', protectRoute, deleteBusById);

export default router;