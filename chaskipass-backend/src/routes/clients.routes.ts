import { deleteClient, getClients, createClient, updateClient, getClientByDNI,  } from './../controllers/clients.controllers';
import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; // Middleware de protección (opcional, si se requiere protección)

const router = Router();

router.get('/', protectRoute, getClients);
router.get('/dni/:dni', protectRoute, getClientByDNI)  
router.post('/newclients', protectRoute, createClient);  
router.put('/updateclients/:dni', protectRoute, updateClient);  
router.delete('/deleteclients/:dni', protectRoute, deleteClient);  

export default router;
