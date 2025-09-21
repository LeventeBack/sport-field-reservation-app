import ImageModel from '../db/models/SportFieldImage.js';
import SportFieldModel from '../db/models/SportField.js';
import { baseError, sportFieldTexts } from '../config/texts.js';

export const getSportFields = async (req, res) => {
  try {
    const sportFields = await SportFieldModel.findAll({
      include: ['images'],
    });

    return res.status(200).json({ data: sportFields });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: baseError });
  }
};

export const getSportField = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const sportField = await SportFieldModel.findByPk(id, {
      include: ImageModel,
    });
    return res.status(200).json({ data: sportField });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const storeSportField = async (req, res) => {
  try {
    const values = req.body;
    const sportField = await SportFieldModel.create(values);
    return res.status(201).json({ data: sportField, message: sportFieldTexts.createSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const updateSportField = async (req, res) => {
  try {
    const values = req.body;
    const sportField = await SportFieldModel.findByPk(values.id, {
      include: ['images'],
    });
    const updated = await sportField.update(values);
    return res.status(200).json({ data: updated, message: sportFieldTexts.updateSuccess });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: baseError });
  }
};

export const deleteSportField = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await SportFieldModel.destroy({ where: { id } });
    return res.status(200).json({ message: sportFieldTexts.deleteSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};
