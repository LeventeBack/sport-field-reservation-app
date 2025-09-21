import { Router } from 'express';
import sportFieldRouter from './sportFieldRouter.js';
import fieldTypesRouter from './fieldTypesRouter.js';
import sportFieldImageRouter from './sportFieldImageRouter.js';
import reservationRouter from './reservationRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/field-types', fieldTypesRouter);
router.use('/sport-fields', sportFieldRouter);
router.use('/sport-field-images', sportFieldImageRouter);
router.use('/reservations', reservationRouter);
router.use('/users', userRouter);

export default router;
