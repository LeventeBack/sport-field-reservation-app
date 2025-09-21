import { Router } from 'express';
import * as controller from '../controllers/reservationController.js';
import validator from '../middlewares/validators/schemaValidatorMiddleware.js';
import * as schemas from '../middlewares/validators/reservationSchemas.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import hasAdminRole from '../middlewares/auth/adminRoleMiddleware.js';

const router = Router();

router.get('/', controller.getReservations);
router.post('/', authMiddleware(), validator(schemas.reservationCreateSchema), controller.storeReservation);
router.put(
  '/:id',
  authMiddleware(),
  hasAdminRole,
  validator(schemas.reservationUpdateSchema),
  controller.updateReservation,
);
router.delete('/:id', authMiddleware(), validator(schemas.reservationDeleteSchema), controller.deleteReservation);

export default router;
