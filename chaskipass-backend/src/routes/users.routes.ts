import { Router } from "express";
import { getUsers} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { logoutUser } from "../controllers/auth.controllers";


const router = Router();

router.get('/', protectRoute ,getUsers);
// router.post('/signUp', protectRoute,createUserCooperative);
router.get('/logout', protectRoute,logoutUser);

export default router;