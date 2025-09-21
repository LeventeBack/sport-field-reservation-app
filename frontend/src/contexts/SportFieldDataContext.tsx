import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  SportField,
  SportFieldFilterForm,
  SportFieldType,
} from "../types/resources";

export type ImageManagerContext = {
  fieldTypes: SportFieldType[];
  sportFields: SportField[];
  filterForm: UseFormReturn<SportFieldFilterForm>;
  setFieldTypes: React.Dispatch<React.SetStateAction<SportFieldType[]>>;
  setSportFields: React.Dispatch<React.SetStateAction<SportField[]>>;
  updateSportFieldList: (field: SportField) => void;
};

export const SportFieldDataContext = createContext<ImageManagerContext>(null!);
