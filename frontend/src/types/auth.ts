import { z, ZodType } from "zod";

type Role = "admin" | "user";

export type Token = "string";
export type UserStatus = "active" | "blocked" | "pending";

export type User = {
  id: number;
  email: string;
  username: string;
  role: Role;
  createdAt: string;
  status: UserStatus;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
} & LoginData;

export const loginSchema: ZodType<LoginData> = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema: ZodType<RegisterData> = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const profileSchema: ZodType<Partial<User>> = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
});
