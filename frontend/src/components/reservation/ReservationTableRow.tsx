import FormButton from "../form/FormButton";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import useAuthContext from "../../hooks/useAuthContext";
import { Reservation, ReservationStatus } from "../../types/resources";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

type Props = {
  reservation: Reservation;
  includeSportField: boolean;
  onCancel: (reservation: Reservation) => void;
};

const ReservationTableRow = ({
  reservation,
  includeSportField,
  onCancel,
}: Props) => {
  const { sportFields } = useSportFieldDataContext();
  const { user } = useAuthContext();
  const sportField = sportFields.find((f) => f.id === reservation.sportFieldId);

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

  return (
    <tr key={reservation.id} className="align-middle">
      <td>{reservation.date}</td>
      <td>{reservation.startTime}:00</td>
      <td>{reservation.endTime}:00</td>
      {includeSportField && (
        <td>
          <Link to={`/sport-fields/${sportField?.id}`}>
            {sportField?.title}
          </Link>
        </td>
      )}
      {user?.id === reservation.userId ? (
        <>
          <td>{getStatusBadge(reservation.status)}</td>
          <td className="py-1">
            <FormButton
              variant="danger"
              onClick={() => onCancel(reservation)}
              size="sm"
            >
              Cancel
            </FormButton>
          </td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
        </>
      )}
    </tr>
  );
};

export default ReservationTableRow;
