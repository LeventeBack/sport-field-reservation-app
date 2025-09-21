import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import { ReservationFormValues } from "../../types/resources";
import { UseFormReturn } from "react-hook-form";
import TextInputGroup from "../form/TextInputGroup";
import AlertMessage from "../AlertMessage";

type Props = {
  showModal: boolean;
  handleHideModal: () => void;
  form: UseFormReturn<ReservationFormValues>;
  createReservation: (formData: ReservationFormValues) => void;
  error: string;
};

const CreateReservationModal = ({
  showModal,
  handleHideModal,
  form,
  createReservation,
  error,
}: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Make a reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(createReservation)}>
          <Row className="mb-3">
            <Col md={12}>
              <TextInputGroup
                label="Date"
                type="date"
                error={errors.date?.message}
                {...register("date")}
              />
            </Col>
            <Col md={6}>
              <TextInputGroup
                label="Start Time"
                type="number"
                error={errors.startTime?.message}
                {...register("startTime", { valueAsNumber: true })}
                min={0}
                max={24}
              />
            </Col>
            <Col md={6}>
              <TextInputGroup
                label="End Time"
                type="number"
                min={0}
                max={24}
                error={errors.endTime?.message}
                {...register("endTime", { valueAsNumber: true })}
              />
            </Col>
          </Row>
          {error && <AlertMessage variant="danger" text={error} />}
          <div className="d-flex">
            <Button type="submit" variant="info" className="mx-auto">
              Create Reservation
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateReservationModal;
