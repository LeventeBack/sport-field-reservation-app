import { baseError } from '../../config/texts.js';

const formValidatorFactory = (validations) => async (req, res, next) => {
  try {
    const validationResults = await Promise.all(validations.map((v) => v.run(req)));

    const errorResult = validationResults.find((result) => !result.isEmpty());
    if (errorResult) {
      const error = errorResult.array()[0].msg ?? baseError;
      return res.status(400).json({ error });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  return next();
};

export default formValidatorFactory;
