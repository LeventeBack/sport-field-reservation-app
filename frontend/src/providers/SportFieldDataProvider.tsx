import { useEffect, useState } from "react";
import { SportFieldDataContext } from "../contexts/SportFieldDataContext";
import {
  SportField,
  SportFieldFilterForm,
  SportFieldType,
} from "../types/resources";
import { useForm } from "react-hook-form";
import fieldTypeService from "../services/field-type-service";
import sportFieldService from "../services/sport-field-service";

interface Props {
  children: React.ReactNode;
}

const SportFieldDataProvider = ({ children }: Props) => {
  const [fieldTypes, setFieldTypes] = useState<SportFieldType[]>([]);
  const [sportFields, setSportFields] = useState<SportField[]>([]);
  const filterForm = useForm<SportFieldFilterForm>();

  const loadInitialData = async () => {
    try {
      const { data: types } = await fieldTypeService.getAll();
      setFieldTypes(types);
      const { data: fields } = await sportFieldService.getAll();
      setSportFields(fields);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const updateSportFieldList = (field: SportField) => {
    setSportFields((fields) => {
      const existingField = fields.find((f) => f.id === field.id);

      if (existingField) {
        return fields.map((f) => (f.id === field.id ? field : f));
      }

      return [...fields, field];
    });
  };

  const ctxValue = {
    fieldTypes,
    sportFields,
    filterForm,
    setFieldTypes,
    setSportFields,
    updateSportFieldList,
  };

  return (
    <SportFieldDataContext.Provider value={ctxValue}>
      {children}
    </SportFieldDataContext.Provider>
  );
};

export default SportFieldDataProvider;
