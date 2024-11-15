import { Router } from "express";
import { getAllStationCooperative, getStationCooperative, linkCooperativeStation } from "../controllers/stationCooperative.controller";
import protectRoute from "../middleware/protectRoute.middleware";

const router = Router();

//Debo enviar en la ruta el id de la cooperativa y la paginacion
router.get('/allLinkedCooperatives', protectRoute, getAllStationCooperative);
router.get('/linkCooperative/:id', protectRoute, linkCooperativeStation);
router.get('/:cooperative_id', protectRoute, getStationCooperative);

export default router;