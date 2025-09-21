import { body, param } from 'express-validator';
import SportFieldModel from '../../db/models/SportField.js';
import FieldTypeModel from '../../db/models/FieldType.js';
import { sportFieldTexts, fieldTypeTexts } from '../../config/texts.js';
import { SPORT_FIELD_TITLE, SPORT_FIELD_DESCRIPTION, SPORT_FIELD_PRICE } from '../../config/form.js';

export const idValidation = [
  param('id').custom(async (id) => {
    const sportField = await SportFieldModel.findByPk(id);
    if (!sportField) {
      throw new Error(sportFieldTexts.notFound);
    }
    return true;
  }),
];

export const sportFieldCreateSchema = [
  body('title').isLength(SPORT_FIELD_TITLE).withMessage(sportFieldTexts.titleLength(SPORT_FIELD_TITLE)),
  body('fieldTypeId')
    .custom(async (value) => {
      const fieldType = await FieldTypeModel.findByPk(value);
      if (!fieldType) {
        throw new Error(fieldTypeTexts.notFound);
      }
      return true;
    })
    .withMessage(fieldTypeTexts.notFound),
  body('description')
    .isLength(SPORT_FIELD_DESCRIPTION)
    .withMessage(sportFieldTexts.descriptionLength(SPORT_FIELD_DESCRIPTION)),
  body('price').isInt(SPORT_FIELD_PRICE).withMessage(sportFieldTexts.price(SPORT_FIELD_PRICE)),
  body('openTime').isInt({ min: 0, max: 24 }).withMessage(sportFieldTexts.invalidOpenTime),
  body('closeTime').isInt({ min: 0, max: 24 }).withMessage(sportFieldTexts.invalidCloseTime),
  body('openTime')
    .custom((value, { req }) => {
      if (req.body.closeTime && value >= req.body.closeTime) {
        throw new Error(sportFieldTexts.openTimeAfterCloseTime);
      }
      return true;
    })
    .withMessage(sportFieldTexts.openTimeAfterCloseTime),
];

export const sportFieldUpdateSchema = [...idValidation, ...sportFieldCreateSchema];
