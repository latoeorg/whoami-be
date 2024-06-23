import { Environments } from "@/enums";

export const ENV = {
  IS_DEVELOPMENT: process.env.NODE_ENV === Environments.DEVELOPMENT,
  IS_STAGING: process.env.NODE_ENV === Environments.STAGING,
  IS_PRODUCTION: process.env.NODE_ENV === Environments.PRODUCTION,

  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",

  API_VERSION: process.env.API_VERSION || "",
  API_PORT: process.env.API_PORT || "",

  LOG_DIR: process.env.LOG_DIR || "./logs",

  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || "",

  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
};
