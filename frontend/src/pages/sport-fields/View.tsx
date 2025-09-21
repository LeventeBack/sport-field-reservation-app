import { Col, Container, Row } from "react-bootstrap";
import ImageGallery from "../../components/sport-fields/ImageGallery";
import { useParams } from "react-router-dom";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import SportFieldDetailsCard from "../../components/sport-fields/SportFieldDetailsCard";
import UserReservationTable from "../../components/reservation/UserReservationTable";
import useAuthContext from "../../hooks/useAuthContext";
import FormButton from "../../components/form/FormButton";
import useReservations from "../../hooks/useReservations";
import { useEffect, useState } from "react";
import CreateReservationModal from "../../components/reservation/CreateReservationModal";
import AlertMessage from "../../components/AlertMessage";

const View = () => {
  const { id } = useParams();
  const { sportFields } = useSportFieldDataContext();
  const { user } = useAuthContext();
  const {
    reservations,
    setSelectedSportField,
    reservationForm,
    createReservation,
    cancelReservation,
    error,
    success,
  } = useReservations();
  const [showReservationModal, setShowReservationModal] = useState(false);

  const currentSportField = sportFields.find(
    (f) => id && f?.id === parseInt(id)
  );

  useEffect(() => {
    if (showReservationModal) setShowReservationModal(false);
  }, [success, setShowReservationModal]);

  useEffect(() => {
    if (!currentSportField) return;
    setSelectedSportField(currentSportField);
  }, [currentSportField, setSelectedSportField]);

  if (!currentSportField) return <p className="my-5 text-center">Loading...</p>;

  return (
    <>
      <Container>
        <Row className="mb-5 justify-content-center">
          <Col sm={8}>
            <SportFieldDetailsCard sportField={currentSportField} />
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          {user && (
            <FormButton onClick={() => setShowReservationModal(true)}>
              Make new reservation
            </FormButton>
          )}
          {success && <AlertMessage variant="success" text={success} />}
          <h2 className="my-3 text-center">Upcoming Reservations</h2>
          <Col md={8}>
            <UserReservationTable
              reservations={reservations}
              onCancel={cancelReservation}
            />
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          <h2 className="mb-3 text-center">
            Sport field gallery ({currentSportField?.images.length}){" "}
          </h2>
          <ImageGallery images={currentSportField?.images ?? []} />
        </Row>
      </Container>
      {user && (
        <CreateReservationModal
          showModal={showReservationModal}
          handleHideModal={() => setShowReservationModal(false)}
          form={reservationForm}
          createReservation={createReservation}
          error={error}
        />
      )}
    </>
  );
};

export default View;
