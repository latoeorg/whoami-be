import jwt from "jsonwebtoken";
import { ENV } from "@/constants";

export const EncryptToken = (payload: any) => {
  return jwt.sign(payload, ENV.JWT_SECRET);
};

// { expiresIn: ENV.JWT_EXPIRES_IN }

export const DecryptToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
