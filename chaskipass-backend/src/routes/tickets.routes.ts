import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { getSeatsStructure } from '../controllers/seatStructure.controllers';

const router = Router();
router.post('/seats', protectRoute, getSeatsStructure);
export default router;
