import z from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number");

const password = z.string().min(8, "Password must be at least 8 characters");

export const AcademyLoginSchema = z
  .object({
    phone,
    password,
  })
  .strict();

export type AcademyLogin = z.infer<typeof AcademyLoginSchema>;
