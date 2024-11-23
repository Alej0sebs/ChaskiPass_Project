import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { getSeatsStructure } from '../controllers/seatStructure.controllers';
import { sellTicket } from '../controllers/tickets.controllers';

const router = Router();
router.post('/seats', protectRoute, getSeatsStructure);
router.post('/sell', sellTicket);
export default router;
