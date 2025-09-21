import { DataTypes } from 'sequelize';
import db from '../connection.js';
import SportField from './SportField.js';
import User from './User.js';
import { RESERVATION_STATUSES } from '../../config/enums.js';

const Reservation = db.define('reservations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sportFieldId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(RESERVATION_STATUSES)),
    defaultValue: RESERVATION_STATUSES.pending,
    allowNull: false,
  },
});

Reservation.belongsTo(User, { foreignKey: 'userId' });
Reservation.belongsTo(SportField, { foreignKey: 'sportFieldId' });

export default Reservation;
