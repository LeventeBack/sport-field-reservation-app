import createService from "./http-service";
import { SportField } from "../types/resources";

const sportFieldService = createService<SportField>("/sport-fields");

export default sportFieldService;
