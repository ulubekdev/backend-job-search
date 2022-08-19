import controllers from '../controllers/jobs.js';
import checkToken from '../middlewares/check-token.js';
import checkAdmin from '../middlewares/check-admin.js';
import { Router } from "express";

const router = Router();

router.get('/jobs', controllers.GET_JOBS);
router.post('/jobs', checkToken, checkAdmin, controllers.CREATE_JOB);
router.put('/jobs/:id', checkToken, checkAdmin, controllers.UPDATE_JOB);
// router.delete('/jobs/:id', checkToken, checkAdmin, controllers.DELETE_JOB);

export default router;