import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFootballBall } from "react-icons/fa";
import FormButton from "./form/FormButton";
import useAuth from "../hooks/useAuthContext";
import ProfileImage from "./users/ProfileImage";

const NavigationBar = () => {
  const { user, logout, isLoading, isAdmin } = useAuth();

  const userLinks = [
    {
      link: "/reservations",
      text: "My Reservations",
    },
  ];

  const adminLinks = [
    {
      link: "/admin",
      text: "Dashboard",
    },
  ];

  const links = isAdmin ? [...adminLinks, ...userLinks] : user ? userLinks : [];

  return (
    <Navbar bg="dark" expand="md" variant="dark" className="py-3 px-2">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          {/*  sport icon */}
          <FaFootballBall className="me-2" />
          Sports Center
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <Link key={index} to={link.link} className="nav-link">
                {link.text}
              </Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            {!isLoading &&
              (user ? (
                <>
                  <Link
                    to="/profile"
                    className="nav-link px-md-4 mx-md-3 d-flex align-items-center py-md-0"
                  >
                    <ProfileImage email={user.email} />
                    <strong className="text-nowrap">{user.username}</strong>
                  </Link>
                  <FormButton
                    variant="secondary"
                    className="nav-item"
                    onClick={logout}
                  >
                    Logout
                  </FormButton>
                </>
              ) : (
                <div className="d-flex justify-content-evenly mt-2 mt-md-0">
                  <Link to="/login" className="mx-2">
                    <FormButton variant="info">Login</FormButton>
                  </Link>
                  <Link to="/register" className="mx-2">
                    <FormButton variant="info">Register</FormButton>
                  </Link>
                </div>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
