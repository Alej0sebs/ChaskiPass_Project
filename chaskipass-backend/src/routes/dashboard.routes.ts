import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { getActiveFrequenciesAmount, getClientsAmount, getSoldTicketsAmount, getTotalSales } from "../controllers/dashboard.controllers";

const router = Router();

router.get('/activeFreq', protectRoute, getActiveFrequenciesAmount);
router.get('/soldTickets', protectRoute, getSoldTicketsAmount);
router.get('/numberClients', protectRoute, getClientsAmount);
router.get('/totalSales', protectRoute, getTotalSales);

export default router;