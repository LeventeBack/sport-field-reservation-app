import UsersModel from '../db/models/User.js';
import { userTexts, baseError } from '../config/texts.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.findAll({
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UsersModel.findByPk(id);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const updateUser = async (req, res) => {
  try {
    const values = req.body;
    const user = await UsersModel.findByPk(values.id);
    const updated = await user.update(values);
    return res.status(200).json({ data: updated, message: userTexts.updateSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await UsersModel.destroy({ where: { id } });
    return res.status(200).json({ message: userTexts.deleteSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};
