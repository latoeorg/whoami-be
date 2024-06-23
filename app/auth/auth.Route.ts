import { Router } from "express";
import {
  LoginSchemaMiddleware,
  RegisterSchemaMiddleware,
} from "./auth.Middleware";
import { Login, Register } from "./auth.Controller";

const AuthRoute = Router();

AuthRoute.post("/login", LoginSchemaMiddleware, Login);
AuthRoute.post("/register", RegisterSchemaMiddleware, Register);

export default AuthRoute;
