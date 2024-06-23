import { createClient } from "redis";
import { ENV } from "@/constants";

export const redisClient = createClient({
  url: ENV.REDIS_URL,
});

const EXPIRED_TIME = 60 * 60 * 24 * 7; // 7 days

export const SetRedis = async (key: string, value: string) => {
  try {
    await redisClient.set(key, value);
    await redisClient.expire(key, EXPIRED_TIME);

    return true;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const GetRedis = async (key: string) => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    throw new Error(error as any);
  }
};
