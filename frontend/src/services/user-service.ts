import createService from "./http-service";
import { User } from "../types/auth";

const userService = createService<User>("/users");

export default userService;
