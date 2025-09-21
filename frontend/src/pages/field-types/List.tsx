import FieldTypeManagerModal from "../../components/sport-field-types/FieldTypeManagerModal";
import SportFieldTypeTable from "../../components/sport-field-types/SportFieldTypeTable";
import { Container } from "react-bootstrap";
import { SportFieldType, fieldTypeSchema } from "../../types/resources";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useFieldTypes from "../../hooks/useFieldTypes";
import AlertMessage from "../../components/AlertMessage";
import FormButton from "../../components/form/FormButton";

const List = () => {
  const { createFieldType, updateFieldType, deleteFieldType, error, message } =
    useFieldTypes();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SportFieldType>({
    resolver: zodResolver(fieldTypeSchema),
  });
  const [currentFieldType, setCurrentFieldType] =
    useState<SportFieldType | null>(null);

  const handleShowModal = (fieldType: SportFieldType | null) => {
    setCurrentFieldType(fieldType);
    if (fieldType) {
      reset({ name: fieldType.name, slug: fieldType.slug });
    } else {
      reset({ name: "", slug: "" });
    }
    setShowModal(true);
  };

  const handleHideModal = () => {
    setCurrentFieldType(null);
    setShowModal(false);
  };

  const onSubmit = async (data: SportFieldType) => {
    if (currentFieldType) {
      await updateFieldType({ ...currentFieldType, ...data });
    } else {
      await createFieldType(data);
    }
    handleHideModal();
  };

  const handleDelete = async (id: number) => {
    await deleteFieldType(id);
  };

  return (
    <Container>
      {error && <AlertMessage variant="danger" text={error} />}
      {message && <AlertMessage variant="success" text={message} />}
      <FormButton
        variant="info"
        className="mb-3"
        onClick={() => handleShowModal(null)}
      >
        Create New Field Type
      </FormButton>
      <SportFieldTypeTable
        handleDelete={handleDelete}
        handleShowModal={handleShowModal}
      />
      <FieldTypeManagerModal
        showModal={showModal}
        handleHideModal={handleHideModal}
        currentFieldType={currentFieldType}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        formErrors={errors}
      />
    </Container>
  );
};

export default List;
