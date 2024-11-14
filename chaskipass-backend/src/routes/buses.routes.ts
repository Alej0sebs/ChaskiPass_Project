import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { busRegister, editBusById, getBuses } from "../controllers/buses.controllers";
import upload from "../middleware/multer.middleware";


const router = Router();

router.get('/', protectRoute, getBuses);
router.post('/newBus', protectRoute, upload.single('busImage') ,busRegister);
router.put('/updateBus:id', protectRoute, editBusById);

// router.delete('/deleteBus:id', protectRoute, deleteBusById);

export default router;