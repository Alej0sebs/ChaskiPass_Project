import { Router } from "express";
import { createCooperative,  createNewStation,  createRoles, createSaasAdministrator } from "../controllers/administrators.controllers";
import {registerAndSendEmail } from "../controllers/users.controllers";


const router = Router();
router.post('/', createSaasAdministrator);
router.post('/coop', createCooperative);
router.post('/tenant', registerAndSendEmail);
router.post('/role', createRoles);
router.post('/busStation', createNewStation);

export default router;