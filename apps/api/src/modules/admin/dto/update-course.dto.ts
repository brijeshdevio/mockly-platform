import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateCourseSchema = z
  .object({
    code: z
      .string({ message: 'Course code is required' })
      .trim()
      .min(2, 'Course code must be at least 2 characters')
      .max(20, 'Course code must not exceed 20 characters')
      .optional(),

    name: z
      .string({ message: 'Course name is required' })
      .trim()
      .min(2, 'Course name must be at least 2 characters')
      .max(100, 'Course name must not exceed 100 characters')
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, 'Description must not exceed 500 characters')
      .optional()
      .nullable(),

    modules: z
      .array(
        z
          .string()
          .trim()
          .min(1, 'Module name cannot be empty')
          .max(100, 'Module name must not exceed 100 characters'),
      )
      .min(1, 'At least one module is required')
      .optional(),

    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export class UpdateCourseDto extends createZodDto(UpdateCourseSchema) {}
