import FieldType from './models/FieldType.js';
import SportFieldImage from './models/SportFieldImage.js';
import SportField from './models/SportField.js';
import User from './models/User.js';
import Reservation from './models/Reservation.js';

const syncTables = async () => {
  await SportFieldImage.sync();
  await FieldType.sync();
  await SportField.sync();
  await User.sync();
  await Reservation.sync();
};

export default syncTables;
