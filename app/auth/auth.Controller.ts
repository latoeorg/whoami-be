import { InternalServerError, Ok } from "@/utils/api-response";
import { EncryptToken } from "@/utils/jwt";
import { Request, Response } from "express";
import { StoreUser } from "../user/user.Repository";

export const Login = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    delete user.password;

    const token = await EncryptToken(user);

    const response = {
      token: token,
      user: user,
    };

    return await Ok({ res, data: response, message: "Login success" });
  } catch (error) {
    return InternalServerError({ res, data: error });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const user = await StoreUser(body);

    return await Ok({ res, data: user, message: "Register success" });
  } catch (error) {
    return InternalServerError({ res, data: error });
  }
};
