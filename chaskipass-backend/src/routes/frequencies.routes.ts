import { Router } from "express";
import { filterFrequencies } from "../controllers/filterFrequencies.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { createFrequency, createRoute, deleteFrequencyByID, editFrequency, getFrequencies, getRoutes } from "../controllers/routes.controller";


const router = Router();

router.post('/', filterFrequencies);
router.post('/route', protectRoute, createRoute);
router.post('/frequency', protectRoute, createFrequency);
router.get('/routes', protectRoute, getRoutes);
router.get('/frequencies', protectRoute, getFrequencies);
router.put('/frequency/edit', protectRoute, editFrequency);
router.delete('/frequency/delete/:id', protectRoute, deleteFrequencyByID);

export default router;