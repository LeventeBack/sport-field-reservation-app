import createService from "./http-service";
import { Reservation } from "../types/resources";

const reservationService = createService<Reservation>("/reservations");

export default reservationService;
