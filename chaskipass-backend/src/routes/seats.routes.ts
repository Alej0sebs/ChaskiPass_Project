import { Router } from 'express';

import protectRoute from '../middleware/protectRoute.middleware'; 

const router = Router();

// router.get('/', protectRoute, getSeats);  
// router.post('/newSeats', protectRoute, createSeat);  
// router.put('/updateSeats/:id', protectRoute, updateSeat); 
// router.delete('/deleteSeats/:id', protectRoute, deleteSeat);  

export default router;
