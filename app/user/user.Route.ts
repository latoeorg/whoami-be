import { Router } from "express";
import { GetUser, GetUserById } from "./user.Controller";

const UserRoute = Router();

UserRoute.get("/", GetUser);
UserRoute.get("/:id", GetUserById);

export default UserRoute;
