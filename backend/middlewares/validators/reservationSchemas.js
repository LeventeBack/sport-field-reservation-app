import { body, param } from 'express-validator';
import { Op } from 'sequelize';
import ReservationModel from '../../db/models/Reservation.js';
import UserModel from '../../db/models/User.js';
import SportFieldModel from '../../db/models/SportField.js';
import { reservationTexts, authTexts, sportFieldTexts } from '../../config/texts.js';
import { USER_ROLES } from '../../config/enums.js';

const isDateAndTimeAvailable = async ({ sportFieldId, date, startTime, endTime }, id) => {
  const timeRange = [parseInt(startTime, 10), parseInt(endTime, 10)];
  const reservations = await ReservationModel.findAll({
    where: {
      sportFieldId,
      date,
      [Op.or]: [{ startTime: { [Op.between]: timeRange } }, { endTime: { [Op.between]: timeRange } }],
      id: {
        [Op.ne]: id,
      },
    },
  });

  return reservations.length === 0;
};

const isTimeRangeWithinOpenHours = async ({ sportFieldId, startTime, endTime }) => {
  const sportField = await SportFieldModel.findByPk(sportFieldId);
  return sportField.openTime <= startTime && sportField.closeTime >= endTime;
};

export const getReservationsSchema = [
  body('userId')
    .optional()
    .custom(async (userId) => {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error(authTexts.notFound);
      }
    }),
  body('sportFieldId')
    .optional()
    .custom(async (sportFieldId) => {
      const sportField = await SportFieldModel.findByPk(sportFieldId);
      if (!sportField) {
        throw new Error(sportFieldTexts.notFound);
      }
    }),
];

const idChecker = param('id').custom(async (id, { req }) => {
  const reservation = await ReservationModel.findByPk(id);
  if (!reservation) {
    throw new Error(reservationTexts.notFound);
  }

  if (reservation.userId !== req.user.id && req.user.role !== USER_ROLES.admin) {
    throw new Error(authTexts.unauthorized);
  }

  return true;
});

export const reservationCreateSchema = [
  body('date').isDate().withMessage(reservationTexts.invalidDate),
  body('startTime').isInt({ min: 0, max: 23 }).withMessage(reservationTexts.invalidStartTime),
  body('endTime').isInt({ min: 0, max: 23 }).withMessage(reservationTexts.invalidEndTime),
  body('startTime').custom((value, { req }) => {
    const startIntValue = parseInt(value, 10);
    const endIntValue = parseInt(req.body.endTime, 10);
    if (endIntValue && startIntValue >= endIntValue) {
      throw new Error(reservationTexts.startBeforeEnd);
    }
    return true;
  }),
  body('sportFieldId').custom(async (sportFieldId) => {
    const sportField = await SportFieldModel.findByPk(sportFieldId);

    if (!sportField) {
      throw new Error(sportFieldTexts.notFound);
    }

    return true;
  }),
  body().custom(async (values, { req }) => {
    if (!(await isTimeRangeWithinOpenHours(values))) {
      throw new Error(reservationTexts.invalidTimeRange);
    }

    const id = req.params?.id ?? null;
    if (!(await isDateAndTimeAvailable(values, id))) {
      throw new Error(reservationTexts.alreadyReserved);
    }

    return true;
  }),
];

export const reservationUpdateSchema = [...reservationCreateSchema, idChecker];

export const reservationDeleteSchema = [idChecker];
