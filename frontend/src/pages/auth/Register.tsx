import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import useRegister from "../../hooks/useRegister";
import TextInput from "../../components/form/TextInputGroup";
import FormButton from "../../components/form/FormButton";
import AlertMessage from "../../components/AlertMessage";

const Register = () => {
  const { onSubmit, register, formErrors, success, error } = useRegister();

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {success && <AlertMessage text={success} variant="success" />}
        {error && <AlertMessage text={error} variant="danger" />}
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="card-title text-center">Create a new account</h2>
              <Form method="POST" onSubmit={onSubmit}>
                <TextInput
                  label="Username"
                  {...register("username", { required: true })}
                  error={formErrors?.username?.message}
                />
                <TextInput
                  label="Email"
                  type="email"
                  {...register("email", { required: true })}
                  error={formErrors?.email?.message}
                />
                <TextInput
                  label="Password"
                  type="password"
                  {...register("password", { required: true })}
                  error={formErrors?.password?.message}
                />
                <FormButton type="submit">Register</FormButton>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
