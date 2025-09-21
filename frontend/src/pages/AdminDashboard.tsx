import { Card, Col, Container, Row } from "react-bootstrap";
import {
  FaUsers,
  FaFootballBall,
  FaListAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Sport Fields",
      icon: <FaFootballBall />,
      link: "/admin/sport-fields",
      color: "primary",
    },
    {
      title: "Field Types",
      icon: <FaListAlt />,
      link: "/admin/field-types",
      color: "success",
    },
    {
      title: "Reservations",
      icon: <FaClipboardList />,
      link: "/admin/reservations",
      color: "danger",
    },
    {
      title: "Users",
      icon: <FaUsers />,
      link: "/admin/users",
      color: "warning",
    },
  ];

  return (
    <Container className="mt-5">
      <Row className="g-4">
        {cards.map((card, idx) => (
          <Col key={idx} xs={12} sm={6}>
            <Link
              to={card.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card className="h-100 text-center border-5 border-info card-hover">
                <Card.Body className="p-5">
                  <p style={{ fontSize: 75 }} className="text-dark">
                    {card.icon}
                  </p>
                  <Card.Title className="fs-4">{card.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
