import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import TextInputGroup from "../../components/form/TextInputGroup";
import ProfileImage from "../../components/users/ProfileImage";
import FormButton from "../../components/form/FormButton";
import AlertMessage from "../../components/AlertMessage";
import useProfile from "../../hooks/useProfile";

const View = () => {
  const { register, onSubmit, user, isLoading, formErrors, message, error } =
    useProfile();

  if (!user) return null;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          md={6}
          className="text-center d-flex flex-column align-items-center"
        >
          <ProfileImage email={user.email} size={250} />
          <Badge bg="warning" className="my-2 text-uppercase fs-6">
            {user.role}
          </Badge>
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center mb-4 flex-column">
            <h1>Profile</h1>
          </div>
          <Form onSubmit={onSubmit}>
            <TextInputGroup
              label="Username"
              error={formErrors.username?.message}
              defaultValue={user.username}
              {...register("username")}
            />
            <TextInputGroup
              label="Email"
              type="email"
              error={formErrors.email?.message}
              defaultValue={user.email}
              {...register("email")}
            />
            <FormButton type="submit" disabled={isLoading}>
              Save Changes
            </FormButton>
          </Form>

          {message && <AlertMessage variant="success" text={message} />}
          {error && <AlertMessage variant="danger" text={error} />}
        </Col>
        <Col sm={12} className="text-center my-5">
          <div>
            Joined:{" "}
            <ReactTimeAgo date={new Date(user.createdAt)} locale="en-US" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default View;
