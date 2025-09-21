import { authTexts } from '../../config/texts.js';
import { USER_ROLES } from '../../config/enums.js';

const hasAdminRole = (req, res, next) => {
  if (req.user.role === USER_ROLES.admin) {
    return next();
  }

  return res.status(403).json({ error: authTexts.unauthorized });
};

export default hasAdminRole;
