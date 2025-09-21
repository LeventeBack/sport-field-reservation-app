import { useState } from "react";
import useSportFieldDataContext from "./useSportFieldDataContext";
import { SportField } from "../types/resources";
import { isAxiosError } from "axios";
import sportFieldService from "../services/sport-field-service";

const useSportFields = () => {
  const { setSportFields } = useSportFieldDataContext();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const clear = () => {
    setError("");
    setMessage("");
  };

  const createSportField = async (field: SportField) => {
    clear();
    let success = true;
    try {
      const { message, data } = await sportFieldService.create(field);
      setSportFields((prev) => [...prev, data]);
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
      success = false;
    }
    return success;
  };

  const updateSportField = async (field: SportField) => {
    clear();
    let success = true;
    try {
      const { message } = await sportFieldService.update(field);
      setSportFields((prev) =>
        prev.map((f) => (f.id === field.id ? field : f))
      );
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
      success = false;
    }
    return success;
  };

  const deleteSportField = async (id: number) => {
    clear();
    let success = true;
    try {
      const { message } = await sportFieldService.delete(id);
      setSportFields((prev) => prev.filter((f) => f.id !== id));
      setMessage(message);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      }
      success = false;
    }
    return success;
  };

  return {
    error,
    message,
    createSportField,
    updateSportField,
    deleteSportField,
  };
};

export default useSportFields;
