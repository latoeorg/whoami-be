import { Request, Response } from "express";
import { Router } from "express";
import { VerifyAuthToken } from "@/middlewares/auth";
import { Ok } from "@/utils/api-response";

import AuthRoute from "@/app/auth/auth.Route";
import UserRoute from "@/app/user/user.Route";

const routes = Router();

// AUTH
routes.use("/", AuthRoute);

// OTHERS
routes.use("/user", VerifyAuthToken, UserRoute);
routes.get("/whoami", VerifyAuthToken, (req: Request, res: Response) => {
  return Ok({ res, data: req.cookies.user });
});

export default routes;
