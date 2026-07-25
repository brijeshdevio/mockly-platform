import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const AcademyLoginSchema = z
  .object({
    phone: z
      .string({ message: 'Phone number is required' })
      .regex(/^[6-9]\d{9}$/, 'Invalid phone number'),

    password: z
      .string({ message: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must not exceed 64 characters'),
  })
  .strict();

export class AcademyLoginDto extends createZodDto(AcademyLoginSchema) {}
