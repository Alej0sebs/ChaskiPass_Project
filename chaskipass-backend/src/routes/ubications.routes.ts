import { Router } from "express";
import { getCities } from "../controllers/ubications.controllers";

const router = Router();

router.get('/', getCities);
export default router;