import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import TextInputGroup from "../form/TextInputGroup";
import SelectGroup from "../form/SelectGroup";
import FormButton from "../form/FormButton";

const SearchForm = () => {
  const { fieldTypes, filterForm } = useSportFieldDataContext();
  const { register, reset } = filterForm;

  const options = [
    { value: 0, label: "All" },
    ...fieldTypes.map((fieldType) => ({
      value: fieldType.id,
      label: fieldType.name,
    })),
  ];

  return (
    <Card>
      <Card.Body className="px-4">
        <Card.Title>Sport Field Search</Card.Title>
        <Form method="GET" action="/">
          <Row className="mb-3">
            <Col md={6}>
              <SelectGroup
                label="Sport field type"
                options={options}
                {...register("type", { valueAsNumber: true })}
              />
            </Col>
            <Col md={3}>
              <TextInputGroup
                label="Min Hour price"
                min={0}
                max={9999}
                type="number"
                {...register("minPrice")}
              />
            </Col>
            <Col md={3}>
              <TextInputGroup
                label="Max Hour price"
                min={0}
                max={9999}
                type="number"
                {...register("maxPrice")}
              />
            </Col>
            <Col className="mx-auto">
              <FormButton type="button" onClick={() => reset()}>
                Reset
              </FormButton>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchForm;
