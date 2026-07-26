import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const UpdateTestSchema = z
  .object({
    title: z
      .string({ message: 'Title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(150, 'Title must not exceed 150 characters')
      .optional(),

    description: z
      .string()
      .max(500, 'Description must not exceed 500 characters')
      .optional()
      .nullable(),

    durationInMinutes: z
      .number()
      .int()
      .min(1, 'Duration must be at least 1 minute')
      .max(600, 'Duration must not exceed 600 minutes')
      .optional(),

    passingPercentage: z
      .number()
      .int()
      .min(1, 'Passing percentage must be between 1 and 100')
      .max(100, 'Passing percentage must be between 1 and 100')
      .optional(),

    isPublished: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export class UpdateTestDto extends createZodDto(UpdateTestSchema) {}
