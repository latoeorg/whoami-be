import { logger } from "@/lib/logger";
import { Request, Response, NextFunction } from "express";
import { inspect } from "util";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Request Error:
        \nError:\n${JSON.stringify(err)}
        \nHeaders:\n${inspect(req.headers)}
        \nParams:\n${inspect(req.params)}
        \nQuery:\n${inspect(req.query)}
        \nBody:\n${inspect(req.body)}`);

  next();
};
