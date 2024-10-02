import { Router } from "express";
import { createUserCooperative, getUsers} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";


const router = Router();

router.get('/', protectRoute ,getUsers);
router.post('/signUp', protectRoute,createUserCooperative);

export default router;