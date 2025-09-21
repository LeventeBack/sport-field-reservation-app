import { Link } from "react-router-dom";
import FormButton from "../../components/form/FormButton";
import SportFieldGrid from "../../components/sport-fields/SportFieldCardGrid";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import { Container, Row } from "react-bootstrap";

const List = () => {
  const { sportFields } = useSportFieldDataContext();

  return (
    <Container>
      <Row>
        <Link to="/admin/sport-fields/create" className="">
          <FormButton className="w-auto mx-auto">Create Sport Field</FormButton>
        </Link>
      </Row>
      {sportFields.length ? (
        <SportFieldGrid adminMode={true} sportFields={sportFields} />
      ) : (
        <p className="text-center my-5">No sport fields found</p>
      )}
    </Container>
  );
};

export default List;
