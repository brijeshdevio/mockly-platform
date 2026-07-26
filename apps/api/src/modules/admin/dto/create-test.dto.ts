import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const CreateTestSchema = z
  .object({
    title: z
      .string({ message: 'Title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(150, 'Title must not exceed 150 characters'),

    description: z
      .string()
      .max(500, 'Description must not exceed 500 characters')
      .optional(),

    durationInMinutes: z
      .number({ message: 'Duration is required' })
      .int()
      .min(1, 'Duration must be at least 1 minute')
      .max(600, 'Duration must not exceed 600 minutes'),

    passingPercentage: z
      .number()
      .int()
      .min(1, 'Passing percentage must be between 1 and 100')
      .max(100, 'Passing percentage must be between 1 and 100')
      .default(50),

    isPublished: z.boolean().optional().default(false),
  })
  .strict();

export class CreateTestDto extends createZodDto(CreateTestSchema) {}
