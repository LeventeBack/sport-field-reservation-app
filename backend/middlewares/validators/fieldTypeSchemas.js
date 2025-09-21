import { body, param } from 'express-validator';
import FieldTypeModel from '../../db/models/FieldType.js';
import { fieldTypeTexts } from '../../config/texts.js';
import { FIELD_TYPE_NAME, FIELD_TYPE_SLUG } from '../../config/form.js';

const idChecker = param('id').custom(async (id) => {
  const fieldType = await FieldTypeModel.findByPk(id);
  if (!fieldType) {
    return Promise.reject(fieldTypeTexts.notFound);
  }

  return true;
});

export const createFiledTypeSchema = [
  body('name').isLength(FIELD_TYPE_NAME).withMessage(fieldTypeTexts.nameLength(FIELD_TYPE_NAME)),
  body('slug').isLength(FIELD_TYPE_SLUG).withMessage(fieldTypeTexts.slugLength(FIELD_TYPE_SLUG)),
  body('slug').custom(async (slug) => {
    const fieldType = await FieldTypeModel.findOne({ where: { slug } });
    if (fieldType) {
      return Promise.reject(fieldTypeTexts.slugTaken);
    }

    return true;
  }),
];

export const updateFieldTypeSchema = [...createFiledTypeSchema, idChecker];

export const deleteFieldTypeSchema = [idChecker];
