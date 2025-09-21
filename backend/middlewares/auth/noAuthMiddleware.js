import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.js';
import { authTexts } from '../../config/texts.js';

const notAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    jwt.verify(token, JWT_SECRET);

    return res.json({ error: authTexts.alreadyAuthenticated });
  } catch (error) {
    return next();
  }
};

export default notAuthenticated;
