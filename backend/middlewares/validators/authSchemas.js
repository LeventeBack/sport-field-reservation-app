import { body } from 'express-validator';
import { authTexts } from '../../config/texts.js';
import { USERNAME, PASSWORD } from '../../config/form.js';

export const registerSchema = [
  body('username').isLength(USERNAME).withMessage(authTexts.usernameLength(USERNAME)),
  body('email').isEmail().withMessage(authTexts.emailFormat),
  body('password').isLength(PASSWORD).withMessage(authTexts.passwordLength(PASSWORD)),
];

export const loginSchema = [
  body('email').isEmail().withMessage(authTexts.emailFormat),
  body('password').exists().withMessage(authTexts.passwordRequired),
];
