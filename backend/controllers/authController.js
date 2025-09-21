import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../db/models/User.js';
import { JWT_SECRET } from '../config/env.js';
import { baseError, authTexts } from '../config/texts.js';
import { USER_STATUSES } from '../config/enums.js';

export const attemptLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: authTexts.invalidEmail });
    }

    if (user.status === USER_STATUSES.blocked) {
      return res.status(401).json({ error: authTexts.blockedUser });
    }

    if (user.status === USER_STATUSES.pending) {
      return res.status(401).json({ error: authTexts.pendingUser });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: authTexts.invalidPassword });
    }

    const userData = { ...user.dataValues };
    delete userData.password;

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: authTexts.loginSuccess, token });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const attemptRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (await UserModel.findOne({ where: { email } })) {
      return res.status(400).json({ error: authTexts.emailTaken });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: authTexts.registerSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const validate = (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(401).json({ error: authTexts.invalidToken });
  }
};
