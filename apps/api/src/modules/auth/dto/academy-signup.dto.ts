import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const AcademySignupSchema = z
  .object({
    academyName: z
      .string({ message: 'Academy name is required' })
      .min(2, 'Academy name must be at least 2 characters')
      .max(100, 'Academy name must not exceed 100 characters'),

    ownerName: z
      .string({ message: 'Owner name is required' })
      .min(2, 'Owner name must be at least 2 characters')
      .max(100, 'Owner name must not exceed 100 characters'),

    phone: z
      .string({ message: 'Phone number is required' })
      .regex(/^[6-9]\d{9}$/, 'Invalid phone number'),

    password: z
      .string({ message: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must not exceed 64 characters'),
  })
  .strict();

export class AcademySignupDto extends createZodDto(AcademySignupSchema) {}
