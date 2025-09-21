import { Table } from "react-bootstrap";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import { SportFieldType } from "../../types/resources";
import FormButton from "../form/FormButton";

type Props = {
  handleDelete: (id: number) => void;
  handleShowModal: (fieldType: SportFieldType | null) => void;
};

const SportFieldTypeTable = ({ handleShowModal, handleDelete }: Props) => {
  const { fieldTypes, sportFields } = useSportFieldDataContext();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fieldTypes?.map((type) => (
          <tr key={type.id}>
            <td>{type.name}</td>
            <td>{type.slug}</td>
            <td>
              {
                sportFields.filter((field) => field.fieldTypeId === type.id)
                  .length
              }
            </td>
            <td>
              <FormButton
                variant="warning"
                className="me-2"
                size="sm"
                onClick={() => handleShowModal(type)}
              >
                Edit
              </FormButton>
              <FormButton
                variant="danger"
                size="sm"
                onClick={() => handleDelete(type.id)}
                disabled={
                  sportFields.filter((field) => field.fieldTypeId === type.id)
                    .length > 0
                }
              >
                Delete
              </FormButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SportFieldTypeTable;
