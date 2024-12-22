import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; 
import { getSeatsStructure } from '../controllers/seatStructure.controllers';
import { getFrecuencyClients, getTicketData, sellTicket, sellTicketData } from '../controllers/tickets.controllers';

const router = Router();
router.post('/seats', protectRoute, getSeatsStructure);
router.post('/sell', sellTicket);
router.post('/sellData', sellTicketData);
router.get('/clients/:frequency_id', protectRoute, getFrecuencyClients);
router.get('/data', protectRoute, getTicketData);
export default router;
