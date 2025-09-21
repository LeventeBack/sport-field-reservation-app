import fs from 'fs';
import ImageModel from '../db/models/SportFieldImage.js';
import { baseError, imageTexts } from '../config/texts.js';

export const storeImage = async (req, res) => {
  try {
    const sportFieldId = parseInt(req.body.sportFieldId, 10);
    const { filename } = req.file;

    const image = await ImageModel.create({ sportFieldId, src: filename });

    return res.status(201).json({ message: imageTexts.uploadSuccess, data: image });
  } catch (error) {
    fs.rmSync(`uploads/${req?.file?.filename}`);
    return res.status(500).json({ error: baseError });
  }
};

export const updateImage = async (req, res) => {
  try {
    const imageId = parseInt(req.params.id, 10);
    const { isBanner } = req.body;

    await ImageModel.update({ isBanner }, { where: { id: imageId } });

    return res.status(200).json({ message: imageTexts.updateSuccess });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const imageId = parseInt(req.params.id, 10);

    const image = await ImageModel.findByPk(imageId);

    await image.destroy();
    fs.rmSync(`uploads/${image.src}`);

    return res.status(200).json({ message: imageTexts.deleteSuccess });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
