import { Router } from "express";
import protectRoute from "../middleware/protectRoute.middleware";
import { createPayment, executePayment} from "../controllers/paypal.controllers";

const router = Router();

router.post('/create-payment', protectRoute, createPayment);
router.get('/execute-payment', executePayment);

export default router;