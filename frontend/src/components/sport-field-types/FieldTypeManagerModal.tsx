import { Form, Modal } from "react-bootstrap";
import TextInputGroup from "../form/TextInputGroup";
import { SportFieldType } from "../../types/resources";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import FormButton from "../form/FormButton";

type Props = {
  showModal: boolean;
  handleHideModal: () => void;
  currentFieldType: SportFieldType | null;
  register: UseFormRegister<SportFieldType>;
  formErrors: FieldErrors<SportFieldType>;
  handleSubmit: UseFormHandleSubmit<SportFieldType>;
  onSubmit: (data: SportFieldType) => Promise<void>;
};

const FieldTypeManagerModal = ({
  showModal,
  handleHideModal,
  currentFieldType,
  onSubmit,
  register,
  formErrors,
  handleSubmit,
}: Props) => {
  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {currentFieldType ? "Edit Field Type" : "Create Field Type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputGroup
            label="Name"
            error={formErrors.name?.message}
            {...register("name")}
          />
          <TextInputGroup
            label="Slug"
            error={formErrors.slug?.message}
            {...register("slug")}
          />
          <FormButton
            variant="secondary"
            onClick={handleHideModal}
            className="mt-3 me-2"
          >
            Close
          </FormButton>
          <FormButton type="submit" className="mt-3">
            Save
          </FormButton>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FieldTypeManagerModal;
