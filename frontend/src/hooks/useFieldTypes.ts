import { isAxiosError } from "axios";
import fieldTypeService from "../services/field-type-service";
import { SportFieldType } from "../types/resources";
import useSportFieldDataContext from "./useSportFieldDataContext";
import { useState } from "react";

const useFieldTypes = () => {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { setFieldTypes, sportFields } = useSportFieldDataContext();

  const clear = () => {
    setError("");
    setMessage("");
  };

  const createFieldType = async (type: SportFieldType) => {
    clear();
    try {
      const { message, data } = await fieldTypeService.create(type);
      setFieldTypes((prev) => [...prev, data]);
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  const updateFieldType = async (type: SportFieldType) => {
    clear();
    try {
      const { message } = await fieldTypeService.update(type);
      setFieldTypes((prev) => prev.map((t) => (t.id === type.id ? type : t)));
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  const deleteFieldType = async (id: number) => {
    clear();
    const fields = sportFields.filter((field) => field.type.id === id);
    if (fields.length) {
      return setError("Cannot delete field type with associated fields");
    }
    try {
      const { message } = await fieldTypeService.delete(id);
      setFieldTypes((prev) => prev.filter((t) => t.id !== id));
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  return { createFieldType, updateFieldType, deleteFieldType, error, message };
};

export default useFieldTypes;
