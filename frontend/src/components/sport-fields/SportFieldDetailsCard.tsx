
import { Card, Badge } from "react-bootstrap";
import { SportField } from "../../types/resources";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import { FaClock, FaDollarSign } from "react-icons/fa";

type Props = {
  sportField: SportField;
};

const SportFieldDetailsCard = ({ sportField }: Props) => {
  const { fieldTypes } = useSportFieldDataContext();

  const currentType = fieldTypes.find((t) => t.id === sportField.fieldTypeId);
  const { title, description, openTime, closeTime, price } = sportField;

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          Sport field type:<span className="fw-bold"> {currentType?.name}</span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex align-items-center">
            <FaClock className="me-2" />
            {openTime}:00 - {closeTime}:00
          </div>
          <Badge bg="secondary" className="d-flex bg-success">
            <FaDollarSign className="me-1" />
            {price}/hr
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SportFieldDetailsCard;
