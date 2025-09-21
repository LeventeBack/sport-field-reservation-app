import { Col, Container, Row } from "react-bootstrap";
import CreateSportFieldForm from "../../components/sport-fields/CreateSportFieldForm";
import { useParams } from "react-router-dom";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import ImageUploadForm from "../../components/sport-fields/ImageUploadForm";
import ImageGallery from "../../components/sport-fields/ImageGallery";

const Update = () => {
  const { id } = useParams();
  const { sportFields } = useSportFieldDataContext();

  const currentSportField = sportFields.find(
    (f) => id && f.id === parseInt(id)
  );

  return (
    <Container>
      <Row className="mb-5">
        <CreateSportFieldForm currentSportField={currentSportField} />
      </Row>
      <Row className="mb-5 justify-content-center">
        <ImageGallery
          images={currentSportField?.images ?? []}
          adminMode={true}
        />
      </Row>
      <Row className="mb-5 justify-content-center">
        <Col md={6}>
          <ImageUploadForm currentSportField={currentSportField} />
        </Col>
      </Row>
    </Container>
  );
};

export default Update;
