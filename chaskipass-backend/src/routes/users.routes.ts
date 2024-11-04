import { Router } from "express";
import { getDrivers, getUserById, getUsers, registerAndSendEmail, updateUser} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";
import { logoutUser } from "../controllers/auth.controllers";


const router = Router();

router.get('/', protectRoute ,getUsers);
router.get('/drivers', protectRoute ,getDrivers);
router.post('/signUp', protectRoute,registerAndSendEmail);
router.get('/logout', protectRoute,logoutUser);
router.get('/:dni', protectRoute, getUserById);
router.put('/update', protectRoute, updateUser);

export default router;