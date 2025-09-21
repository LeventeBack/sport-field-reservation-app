import { Router } from 'express';
import * as controller from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import hasAdminRole from '../middlewares/auth/adminRoleMiddleware.js';

const router = Router();

router.get('/', authMiddleware(), hasAdminRole, controller.getAllUsers);
router.get('/:id', authMiddleware(), controller.getUser);
router.put('/:id', authMiddleware(), controller.updateUser);
router.delete('/:id', authMiddleware(), hasAdminRole, controller.deleteUser);

export default router;
