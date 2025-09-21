import { Router } from 'express';
import * as controller from '../controllers/sportFieldController.js';
import validator from '../middlewares/validators/schemaValidatorMiddleware.js';
import hasAdminRole from '../middlewares/auth/adminRoleMiddleware.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import * as schemas from '../middlewares/validators/sportFieldSchemas.js';

const router = Router();

router.get('/', controller.getSportFields);
router.get('/:id', validator(schemas.idValidation), controller.getSportField);
router.post('/', authMiddleware(), hasAdminRole, validator(schemas.sportFieldCreateSchema), controller.storeSportField);
router.put(
  '/:id',
  authMiddleware(),
  hasAdminRole,
  validator(schemas.sportFieldUpdateSchema),
  controller.updateSportField,
);
router.delete('/:id', authMiddleware(), hasAdminRole, validator(schemas.idValidation), controller.deleteSportField);

export default router;
