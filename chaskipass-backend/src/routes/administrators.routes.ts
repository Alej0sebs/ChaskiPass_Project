import { Router } from "express";
import { createCooperative, createNewTenant, createRoles, createSaasAdministrator } from "../controllers/administrators.controllers";


const router = Router();
router.post('/', createSaasAdministrator);
router.post('/coop', createCooperative);
router.post('/tenant', createNewTenant);
router.post('/role', createRoles);
export default router;