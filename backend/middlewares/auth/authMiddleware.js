import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../../config/env.js';
import UserModel from '../../db/models/User.js';
import { USER_STATUSES } from '../../config/enums.js';

const tokenExtractor = (req) => {
  let token = null;

  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  return token;
};

const jwtOptions = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await UserModel.findOne({
      where: { id: jwtPayload.id },
      attributes: { exclude: ['password'] },
    });

    if (!user || user.status !== USER_STATUSES.active) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

const authMiddleware = () => passport.authenticate('jwt', { session: false });

export default authMiddleware;
