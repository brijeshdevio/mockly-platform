import z from "zod";

const academyCode = z.string().trim().min(3, "Academy code is required");

const studentCode = z.string().trim().min(3, "Student code is required");

const phone = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number");

export const StudentLoginSchema = z
  .object({
    academyCode,
    studentCode,
    phone,
  })
  .strict();

export type StudentLogin = z.infer<typeof StudentLoginSchema>;
