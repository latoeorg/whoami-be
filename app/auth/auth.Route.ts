import { Router } from "express";
import {
  LoginSchemaMiddleware,
  RegisterSchemaMiddleware,
} from "./auth.Middleware";
import { ForgotPassword, Login, Register } from "./auth.Controller";
import { VerifyAuthToken } from "@/middlewares/auth";

const AuthRoute = Router();

AuthRoute.post("/login", LoginSchemaMiddleware, Login);
AuthRoute.post("/register", RegisterSchemaMiddleware, Register);

AuthRoute.post("/forgot-password", VerifyAuthToken, ForgotPassword);

export default AuthRoute;
