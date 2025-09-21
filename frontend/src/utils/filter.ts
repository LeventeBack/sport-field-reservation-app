import { User } from "../types/auth";
import {
  Reservation,
  SportField,
  SportFieldFilterForm,
} from "../types/resources";

export const getFilteredSportFields = (
  data: SportField[],
  values: SportFieldFilterForm
) => {
  return data.filter((field) => {
    if (
      values.search &&
      !field.title.toLowerCase().includes(values.search.toLowerCase())
    ) {
      return false;
    }

    if (values.type && field.fieldTypeId !== values.type) {
      return false;
    }

    if (values.minPrice && field.price < values.minPrice) {
      return false;
    }

    if (values.maxPrice && field.price > values.maxPrice) {
      return false;
    }

    return true;
  });
};

export const getFilteredUsers = (
  users: User[],
  query: string,
  status: string
) => {
  return users.filter((user) => {
    if (status !== "all" && user.status !== status) {
      return false;
    }

    if (!query) {
      return true;
    }

    if (
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    ) {
      return true;
    }

    return false;
  });
};

export const getFilteredReservations = (reservations: Reservation[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return reservations.filter((reservation) => {
    const date = new Date(reservation.date);
    date.setHours(0, 0, 0, 0);

    return date >= today;
  });
};
