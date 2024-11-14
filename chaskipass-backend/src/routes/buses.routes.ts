import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { busRegister, editBusById, getBuses } from "../controllers/buses.controllers";
import { uploadSingleImage } from "../middleware/multerMiddleware.utils";

const router = Router();

router.get('/', protectRoute, getBuses);
router.post('/newBus', protectRoute,  uploadSingleImage,busRegister);
router.put('/updateBus:id', protectRoute, editBusById);

// router.delete('/deleteBus:id', protectRoute, deleteBusById);

export default router;