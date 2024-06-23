import { Request, Response } from "express";
import { InternalServerError, Ok } from "@/utils/api-response";
import { FetchUser, FetchUserById } from "./user.Repository";

export const GetUser = async (req: Request, res: Response) => {
  try {
    const { page, page_size, search } = req.query;

    const result = await FetchUser({
      page: page ? +page : undefined,
      page_size: page_size ? +page_size : undefined,

      search: search ? (search as string) : undefined,
    });

    return await Ok({ res, data: result.data, meta: result.meta });
  } catch (error) {
    console.log(error);
    return InternalServerError({ res, data: error });
  }
};

export const GetUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await FetchUserById(id);

    return await Ok({ res, data: user });
  } catch (error) {
    return InternalServerError({ res, data: error });
  }
};
