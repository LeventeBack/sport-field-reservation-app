import { useState } from "react";
import { ImageManagerContext } from "../contexts/ImageManagerContext";
import { UploadImageForm } from "../types/resources";
import { FieldValues, useForm } from "react-hook-form";
import useSportFieldDataContext from "../hooks/useSportFieldDataContext";
import imageService, {
  uploadFile,
} from "../services/sport-field-image-service";
import { Image } from "../types/resources";
import { isAxiosError } from "axios";

interface Props {
  children: React.ReactNode;
}

const ImageManagerCtxProvider = ({ children }: Props) => {
  const { sportFields, updateSportFieldList } = useSportFieldDataContext();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const uploadFrom = useForm<UploadImageForm>();

  const clear = () => {
    setError("");
    setSuccess("");
  };

  const getSportFieldById = (id: number) => {
    return sportFields.find((field) => field.id === id);
  };

  const updateImageList = (image: Image) => {
    const sportField = getSportFieldById(image.sportFieldId);
    if (!sportField) return;

    const existingImage = sportField.images.find((img) => img.id === image.id);

    if (existingImage) {
      sportField.images = sportField.images.map((currentImg) => {
        return currentImg.id === image.id ? image : currentImg;
      });
    } else {
      sportField.images = [...sportField.images, image];
    }

    updateSportFieldList(sportField);
  };

  const uploadImage = async (formData: FieldValues) => {
    clear();
    try {
      const { message, data } = await uploadFile({
        ...formData,
        image: formData.image[0],
      });
      setSuccess(message);
      updateImageList(data);
      uploadFrom.resetField("image");
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  const deleteImage = async (image: Image) => {
    clear();
    try {
      const { message } = await imageService.delete(image.id);
      setSuccess(message);

      const sportField = getSportFieldById(image.sportFieldId);
      if (!sportField) return;

      sportField.images = sportField.images.filter(
        (img) => img.id !== image.id
      );

      updateSportFieldList(sportField);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  const setAsBanner = async (image: Image) => {
    clear();
    try {
      const sportField = getSportFieldById(image.sportFieldId);
      if (!sportField) return;

      const updatedImages: Image[] = sportField.images.map((img) => {
        return { ...img, isBanner: img.id === image.id };
      });

      const requests = updatedImages.map((img) => imageService.update(img));
      await Promise.all(requests);
      sportField.images = updatedImages;

      updateSportFieldList(sportField);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
    }
  };

  const ctxValue = {
    uploadFrom,
    uploadImage,
    error,
    success,
    deleteImage,
    setAsBanner,
  };

  return (
    <ImageManagerContext.Provider value={ctxValue}>
      {children}
    </ImageManagerContext.Provider>
  );
};

export default ImageManagerCtxProvider;
