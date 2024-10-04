import { getClients } from './../controllers/clients.controllers';
import { createClient} from './../controllers/clients.controllers';
import { Router } from "express";
import protectRoute from '../middleware/protectRoute.middleware';

const router=Router();
router.get('/',getClients);
router.post('/newClient',createClient);

export default router;