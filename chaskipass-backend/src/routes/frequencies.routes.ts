import { Router } from "express";
import { filterFrequencies } from "../controllers/filterFrequencies.controllers";

const router = Router();

router.post('/', filterFrequencies);

export default router;