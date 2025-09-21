import { useEffect, useState } from "react";
import {
  Reservation,
  ReservationFormValues,
  ReservationStatus,
  SportField,
  reservationSchema,
} from "../types/resources";
import reservationService from "../services/reservation-service";
import { getFilteredReservations } from "../utils/filter";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthContext from "./useAuthContext";

const useReservations = () => {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedSportField, setSelectedSportField] =
    useState<SportField | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const reservationForm = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const clear = () => {
    setError("");
    setSuccess("");
  };

  useEffect(clear, [selectedUser, selectedSportField]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const query: Record<string, string | number> = {};

        if (selectedSportField) query.sportFieldId = selectedSportField.id;
        if (selectedUser) query.userId = selectedUser;

        const { data } = await reservationService.getAll(query);
        setReservations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservations();
  }, [selectedUser, selectedSportField]);

  const createReservation = async (formData: ReservationFormValues) => {
    if (!selectedSportField || !user) return;

    clear();

    try {
      const { data: reservation, message } = await reservationService.create({
        ...formData,
        sportFieldId: selectedSportField?.id,
        userId: user?.id,
        status: "pending",
      });
      reservationForm.reset();
      setReservations([...reservations, reservation]);
      setSuccess(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  const cancelReservation = async (reservation: Reservation) => {
    if (!reservation) return;

    clear();

    try {
      const { message } = await reservationService.delete(reservation.id);
      setReservations(reservations.filter((r) => r.id !== reservation.id));
      setSuccess(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  const updateReservationStatus = async (
    id: number,
    status: ReservationStatus
  ) => {
    if (!status) return;

    clear();

    try {
      const reservation = reservations.find((r) => r.id === id);
      const { data, message } = await reservationService.update({
        ...reservation,
        status,
      });
      setReservations(reservations.map((r) => (r.id === id ? data : r)));
      setSuccess(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  return {
    reservations: getFilteredReservations(reservations),
    setSelectedSportField,
    setSelectedUser,
    createReservation,
    cancelReservation,
    updateReservationStatus,
    error,
    success,
    reservationForm,
  };
};

export default useReservations;
