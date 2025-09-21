import { Badge, Button, Table } from "react-bootstrap";
import { Reservation, ReservationStatus } from "../../types/resources";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import { Link } from "react-router-dom";

type Props = {
  reservations: Reservation[];
  updateReservationStatus: (id: number, status: ReservationStatus) => void;
};

const ReservationAdminTable = ({
  reservations,
  updateReservationStatus,
}: Props) => {
  const { sportFields } = useSportFieldDataContext();
  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">Approved</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="warning">Pending</Badge>;
    }
  };

  if (reservations.length === 0) {
    return <p className="text-center my-5">No reservations found</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Field</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>
              <Link to={`/sport-fields/${reservation.sportFieldId}`}>
                {
                  sportFields.find((f) => f.id === reservation.sportFieldId)
                    ?.title
                }
              </Link>
            </td>
            <td>{new Date(reservation.date).toLocaleDateString()}</td>
            <td>{reservation.startTime}:00</td>
            <td>{reservation.endTime}:00</td>
            <td>{getStatusBadge(reservation.status)}</td>
            <td>
              <Button
                variant="success"
                className="me-2"
                size="sm"
                onClick={() =>
                  updateReservationStatus(reservation.id, "approved")
                }
                disabled={reservation.status === "approved"}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  updateReservationStatus(reservation.id, "rejected")
                }
                disabled={reservation.status === "rejected"}
              >
                Reject
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReservationAdminTable;
