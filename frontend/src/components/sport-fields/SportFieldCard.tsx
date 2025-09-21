import { Card, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { SportField } from "../../types/resources";
import placeholderImg from "../../assets/placeholder.webp";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import { getImageUrl } from "../../utils/helpers";

type Props = {
  sportField: SportField;
  adminMode?: boolean;
};

const SportFieldCard = ({ sportField, adminMode }: Props) => {
  const { fieldTypes } = useSportFieldDataContext();

  const {
    id,
    title,
    description,
    openTime,
    closeTime,
    price,
    fieldTypeId,
    images,
  } = sportField;
  const currentType = fieldTypes.find((t) => t.id === fieldTypeId);

  const bannerImage = images?.length
    ? images.find((image) => image.isBanner) || images[0]
    : { src: placeholderImg };

  const shortenedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <Col md={6} lg={4} className="mb-4">
      <Link
        to={
          adminMode ? `/admin/sport-fields/${id}/edit` : `/sport-fields/${id}`
        }
        className="text-decoration-none text-dark"
      >
        <Card className="card-hover h-100">
          <Card.Header className="text-muted bg-info">
            {currentType?.name}
          </Card.Header>
          <Card.Img
            variant="top"
            src={getImageUrl(bannerImage.src)}
            alt={title}
            className="image-sizer"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{shortenedDescription}</Card.Text>
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
      </Link>
    </Col>
  );
};

export default SportFieldCard;
