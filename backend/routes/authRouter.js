import { Router } from 'express';
import * as controller from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import notAuthenticated from '../middlewares/auth/noAuthMiddleware.js';

import validator from '../middlewares/validators/schemaValidatorMiddleware.js';
import { loginSchema, registerSchema } from '../middlewares/validators/authSchemas.js';

const router = Router();

router.get('/validate', authMiddleware(), controller.validate);
router.post('/login', notAuthenticated, validator(loginSchema), controller.attemptLogin);
router.post('/register', notAuthenticated, validator(registerSchema), controller.attemptRegister);

export default router;
