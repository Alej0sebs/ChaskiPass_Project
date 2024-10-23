import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createPayment, generateToken } from "../controllers/paypal.controllers";

const router = Router();

router.post('/create-payment', protectRoute, generateToken);

export default router;