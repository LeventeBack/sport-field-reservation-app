import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../config/env.js';

const { user, password, database, host } = DB_CONFIG;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

export default sequelize;
