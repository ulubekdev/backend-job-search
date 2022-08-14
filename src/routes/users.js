import controllers from '../controllers/users.js';
import checkToken from '../middlewares/check-token.js';
import checkAdmin from '../middlewares/check-admin.js';
import { Router } from "express";

const router = Router();
router.get('/users', checkToken, checkAdmin, controllers.GET_USERS);
router.post('/register', controllers.REGISTER);
router.post('/login', controllers.LOGIN);
router.put('/:id', checkToken, checkAdmin, controllers.UPDATE_USER);
router.delete('/:id', checkToken, checkAdmin, controllers.DELETE_USER);

export default router;