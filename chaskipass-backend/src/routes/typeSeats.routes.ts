import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { createTypeSeat, getTypeSeats } from '../controllers/typeSeats.controllers';

const router = Router();

router.get('/', protectRoute, getTypeSeats);
router.post('/createType', protectRoute, createTypeSeat);


export default router;
