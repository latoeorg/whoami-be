import { InternalServerError, Ok } from "@/utils/api-response";
import { EncryptToken } from "@/utils/jwt";
import { Request, Response } from "express";
import { StoreUser } from "../user/user.Repository";
import { NodemailerForgotPassword } from "@/utils/nodemailer";
import { tbm_user } from "@prisma/client";

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

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const user: tbm_user = req.cookies.user;
    const token = await EncryptToken(user);

    await NodemailerForgotPassword({
      name: user.name,
      email: user.email as string,
      link: `http://localhost:3000/reset-password?token=${token}`,
    });

    return await Ok({ res, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);

    return InternalServerError({ res, data: error });
  }
};
