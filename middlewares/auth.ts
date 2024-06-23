import { FetchUserById } from "@/app/user/user.Repository";
import { logWithoutConsole } from "@/lib/logger";
import { Unauthorized } from "@/utils/api-response";
import { DecryptToken } from "@/utils/jwt";
import { tbm_user } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const VerifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BearerToken = req.headers.authorization;
  if (!BearerToken) return Unauthorized({ res, message: "Unauthorized" });

  try {
    const token = BearerToken.split(" ")[1];
    if (!token) return Unauthorized({ res, message: "Unauthorized" });

    const decode = DecryptToken(token);
    if (!decode) return Unauthorized({ res, message: "Session Expired" });

    const user = await FetchUserById((decode as tbm_user).id);
    if (!user) return Unauthorized({ res, message: "User not found" });

    logWithoutConsole({
      level: "info",
      message: `${user.name} is accessing ${req.originalUrl}`,
    });

    req.cookies.user = user;
    next();
  } catch (error) {
    return Unauthorized({ res, message: "Unauthorized" });
  }
};
