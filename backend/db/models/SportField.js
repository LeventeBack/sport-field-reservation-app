import { DataTypes } from 'sequelize';
import db from '../connection.js';
import FieldType from './FieldType.js';
import SportFieldImage from './SportFieldImage.js';

const SportField = db.define('sport_fields', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  openTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
  closeTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  price: {
    type: DataTypes.FLOAT(2),
    allowNull: false,
  },
  fieldTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

SportField.belongsTo(FieldType, { foreignKey: 'fieldTypeId' });

SportField.hasMany(SportFieldImage, { foreignKey: 'sportFieldId', as: 'images' });

export default SportField;
