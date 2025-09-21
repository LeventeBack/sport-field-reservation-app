import { Table } from "react-bootstrap";
import { Reservation } from "../../types/resources";
import ReservationTableRow from "./ReservationTableRow";

type Props = {
  reservations: Reservation[];
  includeSportField?: boolean;
  onCancel: (reservation: Reservation) => void;
};

const UserReservationTable = ({
  reservations,
  includeSportField = false,
  onCancel,
}: Props) => {
  if (!reservations.length) {
    return <p className="my-5 text-center">No reservations found</p>;
  }

  return (
    <Table className="table-light table-striped mt-3" align="center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
          {includeSportField && <th>Sport Field</th>}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <ReservationTableRow
            key={reservation.id}
            reservation={reservation}
            includeSportField={includeSportField}
            onCancel={onCancel}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default UserReservationTable;
