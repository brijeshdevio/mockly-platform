import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateCourseSchema = z
  .object({
    code: z
      .string({ message: 'Course code is required' })
      .trim()
      .min(2, 'Course code must be at least 2 characters')
      .max(20, 'Course code must not exceed 20 characters'),

    name: z
      .string({ message: 'Course name is required' })
      .trim()
      .min(2, 'Course name must be at least 2 characters')
      .max(100, 'Course name must not exceed 100 characters'),

    description: z
      .string()
      .trim()
      .max(500, 'Description must not exceed 500 characters')
      .optional(),

    modules: z.array(
      z
        .string()
        .trim()
        .min(1, 'Module name cannot be empty')
        .max(100, 'Module name must not exceed 100 characters'),
    ),
  })
  .strict();

export class CreateCourseDto extends createZodDto(CreateCourseSchema) {}
