import { getClients } from './../controllers/clients.controllers';
import { Router } from "express";
import protectRoute from '../middleware/protectRoute.middleware';

const router=Router();
router.get('/',getClients);
export default router;