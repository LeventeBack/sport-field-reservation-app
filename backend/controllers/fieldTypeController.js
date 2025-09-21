import FieldTypeModel from '../db/models/FieldType.js';
import { baseError, fieldTypeTexts } from '../config/texts.js';

export const getFieldTypes = async (req, res) => {
  try {
    const fieldTypes = await FieldTypeModel.findAll();
    res.status(200).json({ data: fieldTypes });
  } catch (error) {
    res.status(500).json({ error: baseError });
  }
};

export const storeFieldType = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const fieldType = await FieldTypeModel.create({ name, slug });
    res.status(201).json({ data: fieldType, message: fieldTypeTexts.createSuccess });
  } catch (error) {
    res.status(500).json({ error: baseError });
  }
};

export const updateFieldType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const fieldType = await FieldTypeModel.findByPk(id);
    fieldType.name = name;
    fieldType.slug = slug;
    await fieldType.save();

    res.status(200).json({ data: fieldType, message: fieldTypeTexts.updateSuccess });
  } catch (error) {
    res.status(500).json({ error: baseError });
  }
};

export const deleteFieldType = async (req, res) => {
  try {
    const { id } = req.params;

    await FieldTypeModel.destroy({ where: { id } });
    res.status(200).json({ message: fieldTypeTexts.deleteSuccess });
  } catch (error) {
    res.status(500).json({ error: baseError });
  }
};
