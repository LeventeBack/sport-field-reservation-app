import { IMAGE_BASE_URL } from "../config/env";
import { Reservation } from "../types/resources";

export const getImageUrl = (image: string) => {
  return `${IMAGE_BASE_URL}/${image}`.replace(/\\/g, "/");
};

export const orderReservations = (reservations: Reservation[]) => {
  return reservations.sort((a, b) => {
    const aDate = new Date(a.date);
    aDate.setHours(a.startTime);
    const bDate = new Date(b.date);
    bDate.setHours(b.startTime);

    return aDate.getTime() - bDate.getTime();
  });
};
