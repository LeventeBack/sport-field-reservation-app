import createService from "./http-service";
import apiClient from "./api-client";
import { Image, UploadImageForm } from "../types/resources";
import { DataResponse, MessageResponse } from "../types/responses";

const sportFieldImageService = createService<Image>("/sport-field-images");

export const uploadFile = async (data: UploadImageForm) => {
  const response = await apiClient.post<MessageResponse & DataResponse<Image>>(
    "/api/sport-field-images",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export default sportFieldImageService;
