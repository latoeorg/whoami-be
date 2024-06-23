import { Response } from "express";
import { ENV } from "@/constants";
import { ResponseData } from "./response";
import { AESEncrypt } from "./encryption";

const isEncrypt = ENV.IS_STAGING || ENV.IS_PRODUCTION;

export const Ok = ({
  res,
  data,
  meta,
  message,
}: {
  res: Response;
  data?: any;
  meta?: any;
  message?: string;
}) => {
  const response = {
    status: 200,
    message: message ?? "Successfully",
    ...(meta && { meta: meta }),
    data: ResponseData(data),
  };

  if (isEncrypt) response.data = AESEncrypt(response.data);

  res.status(response.status).json(response);
};

export const Created = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string;
}) => {
  const response = {
    status: 201,
    message: message ?? "Created",
    data: ResponseData(data),
  };

  if (isEncrypt) (response as any).data = AESEncrypt(response.data);

  res.status(response.status).json(response);
};

export const Download = ({
  res,
  path,
  filename,
}: {
  res: Response;
  path: any;
  filename: string;
}) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.status(200).download(path);
};

export const BadRequest = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string;
}) => {
  const response = {
    status: 400,
    message: message ?? "Bad Request",
    data: data,
  };
  res.status(response.status).json(response);
};

export const Unauthorized = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string;
}) => {
  const response = {
    status: 401,
    message: message ?? "Unauthorized",
    data: data,
  };
  res.status(response.status).json(response);
};

export const Forbidden = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string;
}) => {
  const response = {
    status: 403,
    message: message ?? "Forbidden",
    data: data,
  };
  res.status(response.status).json(response);
};

export const NotFound = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string;
}) => {
  const response = {
    status: 404,
    message: message ?? "Not Found",
    data: data,
  };
  res.status(response.status).json(response);
};

export const InternalServerError = ({
  res,
  data,
  message,
}: {
  res: Response;
  data?: any;
  message?: string | any;
}) => {
  const response = {
    status: 500,
    message: message ?? "Internal Server Error",
    data: data,
  };
  res.status(response.status).json(response);
};
