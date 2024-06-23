import { z } from "zod";

export const LoginSchema = z.object({
  uid: z.string().min(1, "uid is required"),
  password: z.string().min(1, "password is required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "name is required"),
  username: z.string().min(1, "username is required"),
  email: z.string().email("email is invalid"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .refine((data) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(data);
    }, "password must contain at least one uppercase letter, one lowercase letter, and one number"),
});
