import { Router } from "express";
import { getStationCooperative, linkCooperativeStation } from "../controllers/stationCooperative.controller";
import protectRoute from "../middleware/protectRoute.middleware";

const router = Router();

//Debo enviar en la ruta el id de la cooperativa y la paginacion
router.get('/:id', protectRoute, getStationCooperative);
router.get('/linkCooperative/:id',protectRoute ,linkCooperativeStation);

export default router;