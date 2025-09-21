import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { UploadImageForm, Image } from "../types/resources";

export type ImageManagerContextType = {
  uploadFrom: UseFormReturn<UploadImageForm>;
  error: string;
  success: string;
  deleteImage: (image: Image) => void;
  setAsBanner: (image: Image) => void;
  uploadImage: SubmitHandler<UploadImageForm>;
};

export const ImageManagerContext = React.createContext<ImageManagerContextType>(
  null!
);
