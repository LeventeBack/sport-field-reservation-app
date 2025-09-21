import createService from "./http-service";
import { SportFieldType } from "../types/resources";

const fieldTypeService = createService<SportFieldType>("/field-types");

export default fieldTypeService;
