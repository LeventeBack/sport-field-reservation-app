import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormButton from "../form/FormButton";
import AlertMessage from "../AlertMessage";
import FileUpload from "../form/FileUpload";
import { useContext, useEffect } from "react";
import { ImageManagerContext } from "../../contexts/ImageManagerContext";
import { SportField } from "../../types/resources";

type Props = {
  currentSportField?: SportField;
};

const ImageUploadForm = ({ currentSportField }: Props) => {
  const { success, error, uploadFrom, uploadImage } =
    useContext(ImageManagerContext);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = uploadFrom;

  useEffect(() => {
    if (!currentSportField) return;

    setValue("sportFieldId", currentSportField.id);
  }, [currentSportField, setValue]);

  return (
    <>
      {success && <AlertMessage variant="success" text={success} />}
      {error && <AlertMessage variant="danger" text={error} />}
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">
            <h2>Upload New Image</h2>
          </Card.Title>
          <Form onSubmit={handleSubmit(uploadImage)}>
            <FileUpload
              control={control}
              error={formErrors.image?.message}
              acceptedFileTypes={["image/*"]}
              {...register("image")}
            />

            <div className="d-flex mt-3">
              <FormButton type="submit" className="mx-auto">
                Upload Photo
              </FormButton>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ImageUploadForm;
