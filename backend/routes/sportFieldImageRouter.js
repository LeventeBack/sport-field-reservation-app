import { Router } from 'express';
import * as controller from '../controllers/sportFieldImageController.js';
import fileUpload from '../middlewares/utils/fileUploadMiddleware.js';
import hasAdminRole from '../middlewares/auth/adminRoleMiddleware.js';
import authMiddleware from '../middlewares/auth/authMiddleware.js';
import validator from '../middlewares/validators/schemaValidatorMiddleware.js';
import * as schemas from '../middlewares/validators/sportFieldImageSchemas.js';

const router = Router();

router.post(
  '/',
  authMiddleware(),
  hasAdminRole,
  fileUpload.single('image'),
  validator(schemas.storeImageSchema),
  controller.storeImage,
);
router.put('/:id', authMiddleware(), hasAdminRole, validator(schemas.updateImageSchema), controller.updateImage);
router.delete('/:id', authMiddleware(), hasAdminRole, validator(schemas.deleteImageSchema), controller.deleteImage);

export default router;
