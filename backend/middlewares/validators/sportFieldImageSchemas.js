import { body, param } from 'express-validator';
import ImageModel from '../../db/models/SportFieldImage.js';
import SportFieldModel from '../../db/models/SportField.js';
import { imageTexts, sportFieldTexts } from '../../config/texts.js';

const idChecker = param('id').custom(async (id) => {
  const image = await ImageModel.findByPk(id);
  if (!image) {
    throw new Error(imageTexts.notFound);
  }

  return true;
});

export const storeImageSchema = [
  body('sportFieldId').custom(async (sportFieldId) => {
    const sportField = await SportFieldModel.findByPk(sportFieldId);
    if (!sportField) {
      throw new Error(sportFieldTexts.notFound);
    }

    return true;
  }),
];

export const updateImageSchema = [idChecker, body('isBanner').isBoolean().withMessage(imageTexts.isBannerType)];

export const deleteImageSchema = [idChecker];
