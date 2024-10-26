import { Router } from "express";
import { getBusStation, getCities } from "../controllers/ubications.controllers";
import protectRoute from "../middleware/protectRoute.middleware";

const router = Router();

router.get('/', getCities);
router.get('/busStations', protectRoute, getBusStation);


export default router;