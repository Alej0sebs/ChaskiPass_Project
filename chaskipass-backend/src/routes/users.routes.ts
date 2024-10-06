import { Router } from "express";
import { getUsers, registerAndSendEmail} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { logoutUser } from "../controllers/auth.controllers";


const router = Router();

router.get('/', protectRoute ,getUsers);
router.post('/signUp', protectRoute,registerAndSendEmail);
router.get('/logout', protectRoute,logoutUser);

export default router;