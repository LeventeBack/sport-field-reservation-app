import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

type Props = {
  text: string;
  variant: "success" | "danger" | "warning";
};

const AlertMessage = ({ text = "", variant = "danger" }: Props) => {
  if (!text) return null;

  return (
    <Container className="d-flex justify-content-center">
      <Alert
        className="my-4 w-100 text-center"
        variant={variant}
        style={{ maxWidth: "600px" }}
      >
        {text}
      </Alert>
    </Container>
  );
};

export default AlertMessage;
