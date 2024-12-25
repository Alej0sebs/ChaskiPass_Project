import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { getCooperativeByID, getCooperatives, updateCooperative } from "../controllers/cooperatives.controllers";
import upload from "../middleware/multer.middleware";

const router = Router();

router.get('/', protectRoute, getCooperatives);
router.get('/:id', protectRoute, getCooperativeByID);
router.put('/updateCooperative', protectRoute, upload.single('logo'), updateCooperative);

export default router;