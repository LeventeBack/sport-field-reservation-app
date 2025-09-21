import { DataTypes } from 'sequelize';
import db from '../connection.js';
import { USER_ROLES, USER_STATUSES } from '../../config/enums.js';

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(USER_ROLES)),
    defaultValue: USER_ROLES.user,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(USER_STATUSES)),
    defaultValue: USER_STATUSES.pending,
    allowNull: false,
  },
});

export default User;
