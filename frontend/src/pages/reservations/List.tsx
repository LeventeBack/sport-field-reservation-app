import useReservations from "../../hooks/useReservations";
import { Col, Container, Row } from "react-bootstrap";
import UserReservationTable from "../../components/reservation/UserReservationTable";
import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";

const List = () => {
  const { user } = useAuthContext();
  const { reservations, setSelectedUser, cancelReservation } =
    useReservations();

  useEffect(() => {
    if (user) setSelectedUser(user.id);
  }, [user, setSelectedUser]);

  return (
    <Container>
      <Row className="mb-5 justify-content-center">
        <h2 className="my-3 text-center">My Reservations</h2>
        <Col lg={8}>
          <UserReservationTable
            reservations={reservations}
            includeSportField={true}
            onCancel={cancelReservation}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default List;
