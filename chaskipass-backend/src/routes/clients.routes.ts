import { deleteClient, getClients, createClient, updateClient,  } from './../controllers/clients.controllers';
import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.middleware'; // Middleware de protección (opcional, si se requiere protección)

const router = Router();

router.get('/clients', protectRoute, getClients);  // Para obtener clientes con paginación (con middleware de protección)
router.post('/clients', protectRoute, createClient);  // Para crear un cliente
router.put('/clients/:dni', protectRoute, updateClient);  // Para actualizar un cliente
router.delete('/clients/:dni', protectRoute, deleteClient);  // Para eliminar un cliente

export default router;
