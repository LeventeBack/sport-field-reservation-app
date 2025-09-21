import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputGroup from "../form/TextInputGroup";
import { useForm } from "react-hook-form";
import SelectGroup from "../form/SelectGroup";
import FormButton from "../form/FormButton";
import useSportFieldDataContext from "../../hooks/useSportFieldDataContext";
import useSportFields from "../../hooks/useSportFields";
import { SportField, sportFieldSchema } from "../../types/resources";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertMessage from "../AlertMessage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  currentSportField?: SportField;
};

const CreateSportFieldForm = ({ currentSportField }: Props) => {
  const { fieldTypes } = useSportFieldDataContext();
  const {
    createSportField,
    updateSportField,
    deleteSportField,
    message,
    error,
  } = useSportFields();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SportField>({
    resolver: zodResolver(sportFieldSchema),
  });

  useEffect(() => {
    reset(currentSportField);
  }, [currentSportField, reset]);

  const onSubmit = async (data: SportField) => {
    let success = true;
    if (currentSportField) {
      success = await updateSportField({ ...currentSportField, ...data });
    } else {
      success = await createSportField(data);
    }
    if (success) navigate("/admin/sport-fields");
  };

  const onDelete = async () => {
    if (currentSportField) {
      const success = await deleteSportField(currentSportField.id);
      if (success) navigate("/admin/sport-fields");
    }
  };

  return (
    <>
      {error && <AlertMessage variant="danger" text={error} />}
      {message && <AlertMessage variant="success" text={message} />}
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">
            <h2>{currentSportField ? "Edit" : "Create"} a new sport field</h2>
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputGroup
              label={"Field Title"}
              {...register("title", { required: true })}
              minLength={3}
              maxLength={50}
              error={errors.title?.message}
            />
            <SelectGroup
              {...register("fieldTypeId", {
                required: true,
                valueAsNumber: true,
              })}
              label={"Sport field type"}
              options={fieldTypes.map((f) => ({ value: f.id, label: f.name }))}
              error={errors.fieldTypeId?.message}
            />
            <Row className="mb-3">
              <Col sm={4}>
                <TextInputGroup
                  label={"Opening Time"}
                  {...register("openTime", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  min={0}
                  max={24}
                  error={errors.openTime?.message}
                />
              </Col>
              <Col sm={4}>
                <TextInputGroup
                  label={"Closing Time"}
                  {...register("closeTime", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  min={0}
                  max={24}
                  error={errors.closeTime?.message}
                />
              </Col>
              <Col sm={4}>
                <TextInputGroup
                  label={"Field Price / hour"}
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  min={1}
                  max={1000}
                  error={errors.price?.message}
                />
              </Col>
            </Row>
            <TextInputGroup
              label={"Field Description"}
              type="text"
              as="textarea"
              {...register("description", { required: true })}
              minLength={10}
              maxLength={500}
              error={errors.description?.message}
            />

            <Row>
              {currentSportField && (
                <>
                  <FormButton onClick={onDelete} variant="danger">
                    Delete
                  </FormButton>
                  <FormButton
                    onClick={() => navigate("/admin/sport-fields")}
                    variant="secondary"
                  >
                    Cancel
                  </FormButton>
                </>
              )}
              <FormButton type="submit">
                {currentSportField ? "Save" : "Create"} Sport Field
              </FormButton>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateSportFieldForm;
