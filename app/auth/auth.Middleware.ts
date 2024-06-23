import { BadRequest, InternalServerError } from "@/utils/api-response";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { LoginSchema, RegisterSchema } from "./auth.Schema";
import {
  FetchUserByEmail,
  FetchUserByUsernameOREmail,
} from "../user/user.Repository";
import { EncryptPassword, VerifyPassword } from "@/utils/hash-password";

export const LoginSchemaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = LoginSchema.parse(req.body);

    const user = await FetchUserByUsernameOREmail(validate.uid);
    if (!user) return BadRequest({ res, message: "User not found" });

    const verifyPassword = await VerifyPassword(
      validate.password,
      user.password
    );

    switch (true) {
      case verifyPassword == false:
        return BadRequest({ res, message: "Password is incorrect" });
      case user.is_deleted:
        return BadRequest({ res, message: "User is deleted" });
      case user.is_active == false:
        return BadRequest({ res, message: "User is not active" });
      default:
        break;
    }

    req.body.user = user;
    next();
  } catch (error) {
    if (error instanceof ZodError)
      return BadRequest({ res, data: error, message: error.errors[0].message });

    return InternalServerError({ res });
  }
};

export const RegisterSchemaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = RegisterSchema.parse(req.body);

    const checkEmail = await FetchUserByEmail(validate.email);
    if (checkEmail)
      return BadRequest({ res, message: "Email already registered" });

    const checkUsername = await FetchUserByUsernameOREmail(validate.username);
    if (checkUsername)
      return BadRequest({ res, message: "Username already registered" });

    validate.password = await EncryptPassword(validate.password);

    req.body = validate;
    next();
  } catch (error) {
    if (error instanceof ZodError)
      return BadRequest({ res, data: error, message: error.errors[0].message });

    return InternalServerError({ res });
  }
};
