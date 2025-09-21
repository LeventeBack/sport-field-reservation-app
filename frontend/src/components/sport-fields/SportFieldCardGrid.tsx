import { Row } from "react-bootstrap";
import { SportField } from "../../types/resources";
import SportFieldCard from "./SportFieldCard";

type Props = {
  sportFields: SportField[];
  adminMode?: boolean;
};

const SportFieldGrid = ({ sportFields, adminMode = false }: Props) => {
  return (
    <Row className="my-5">
      {sportFields.map((field) => (
        <SportFieldCard
          key={field.id}
          sportField={field}
          adminMode={adminMode}
        />
      ))}
    </Row>
  );
};

export default SportFieldGrid;
