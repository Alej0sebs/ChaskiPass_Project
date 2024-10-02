import { Router } from "express";
import { createCooperative, createNewTenant, createSaasAdministrator } from "../controllers/administrators.controllers";


const router = Router();
router.post('/', createSaasAdministrator);
router.post('/coop', createCooperative);
router.post('/tenant', createNewTenant);
export default router;