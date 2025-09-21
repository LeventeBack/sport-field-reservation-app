import { baseError, reservationTexts } from '../config/texts.js';
import ReservationModel from '../db/models/Reservation.js';

export const getReservations = async (req, res) => {
  try {
    const { userId, sportFieldId } = req.query;

    const where = {};
    if (userId) where.userId = userId;
    if (sportFieldId) where.sportFieldId = sportFieldId;

    const reservations = await ReservationModel.findAll({ where });
    return res.status(200).json({ data: reservations });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const storeReservation = async (req, res) => {
  try {
    const data = { userId: req.user.id, ...req.body };
    const reservation = await ReservationModel.create(data);

    return res.status(200).json({ message: reservationTexts.createSuccess, data: reservation });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: baseError });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const reservation = await ReservationModel.findByPk(req.params.id);
    const updatedData = await reservation.update(req.body);

    return res.status(200).json({ message: reservationTexts.updateSuccess, data: updatedData });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await ReservationModel.findByPk(id);

    await reservation.destroy();
    return res.status(200).json({ message: reservationTexts.deleteSuccess });
  } catch (error) {
    return res.status(500).json({ error: baseError });
  }
};
