import { DataTypes } from 'sequelize';
import db from '../connection.js';
// import SportField from './SportField.js';

const SportFieldImage = db.define('sport_field_images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sportFieldId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBanner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

export default SportFieldImage;
