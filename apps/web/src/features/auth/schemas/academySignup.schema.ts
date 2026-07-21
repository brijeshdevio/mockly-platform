import z from "zod";

const academyName = z
  .string()
  .trim()
  .min(3, "Academy name must be at least 3 characters")
  .max(100, "Academy name is too long");

const ownerName = z
  .string()
  .trim()
  .min(3, "Owner name must be at least 3 characters")
  .max(100, "Owner name is too long");

const phone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number");

const password = z.string().min(8, "Password must be at least 8 characters");

export const AcademySignupSchema = z
  .object({
    academyName,
    ownerName,
    phone,
    password,
  })
  .strict();

export type AcademySignup = z.infer<typeof AcademySignupSchema>;
