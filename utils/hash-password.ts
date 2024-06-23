import argon2 from "argon2";

export const EncryptPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const VerifyPassword = async (password: string, hash: string) => {
  return await argon2.verify(hash, password);
};
