import { Router } from "express";
import { createUser, getUsers} from "../controllers/users.controllers";
import protectRoute from "../middleware/protectRoute.middleware";


const router = Router();

router.get('/', protectRoute ,getUsers);
router.post('/signUp', createUser);

export default router;