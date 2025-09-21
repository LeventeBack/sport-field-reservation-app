import { Router } from 'express';
import * as controller from '../controllers/fieldTypeController.js';
import hasAdminRole from '../middlewares/auth/adminRoleMiddleware.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import validator from '../middlewares/validators/schemaValidatorMiddleware.js';
import * as schemas from '../middlewares/validators/fieldTypeSchemas.js';

const router = Router();

router.get('/', controller.getFieldTypes);
router.post('/', authMiddleware(), hasAdminRole, validator(schemas.createFiledTypeSchema), controller.storeFieldType);
router.put(
  '/:id',
  authMiddleware(),
  hasAdminRole,
  validator(schemas.updateFieldTypeSchema),
  controller.updateFieldType,
);
router.delete(
  '/:id',
  authMiddleware(),
  hasAdminRole,
  validator(schemas.deleteFieldTypeSchema),
  controller.deleteFieldType,
);

export default router;
