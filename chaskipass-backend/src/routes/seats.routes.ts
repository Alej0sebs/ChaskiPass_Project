import { Router } from 'express';
import { getSeats, createSeat, updateSeat, deleteSeat } from './../controllers/seats.controllers'; 
import protectRoute from '../middleware/protectRoute.middleware'; 

const router = Router();

router.get('/', protectRoute, getSeats);  
router.post('/seat', protectRoute, createSeat);  
router.put('/seats/:id', protectRoute, updateSeat); 
router.delete('/seats/:id', protectRoute, deleteSeat);  

export default router;
