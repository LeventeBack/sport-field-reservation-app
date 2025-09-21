import React from "react";
import ReservationAdminTable from "../../components/reservation/ReservationAdminTable";
import useReservations from "../../hooks/useReservations";
import { Container } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";

const AdminList = () => {
  const { updateReservationStatus, reservations, error, success } =
    useReservations();
  return (
    <Container className="my-4">
      {error && <AlertMessage variant="danger" text={error} />}
      {success && <AlertMessage variant="success" text={success} />}
      <ReservationAdminTable
        reservations={reservations}
        updateReservationStatus={updateReservationStatus}
      />
    </Container>
  );
};

export default AdminList;
