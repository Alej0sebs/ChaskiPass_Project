import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createPayment} from "../controllers/paypal.controllers";

const router = Router();

router.post('/create-payment', protectRoute, createPayment);

export default router;