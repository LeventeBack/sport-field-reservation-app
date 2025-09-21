type Props = {
  code?: number;
  title?: string;
  text?: string;
};

const ErrorPage = ({
  code = 404,
  title = "Page Not Found",
  text = "Sorry, the page you are looking for does not exist.",
}: Props) => {
  return (
    <div className="col-md-12 text-center my-5 text-dark">
      <h1 style={{ fontSize: 70 }}>{code}</h1>
      <h2 className="my-5">{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default ErrorPage;
