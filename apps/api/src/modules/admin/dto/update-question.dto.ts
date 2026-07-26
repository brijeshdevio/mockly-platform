import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const UpdateQuestionSchema = z
  .object({
    question: z
      .string('Question is required')
      .min(5, 'Question must be at least 5 characters')
      .max(1000)
      .optional(),

    optionA: z
      .string('Option A is required')
      .min(1, 'Option A is required')
      .max(300)
      .optional(),

    optionB: z
      .string('Option B is required')
      .min(1, 'Option B is required')
      .max(300)
      .optional(),

    optionC: z.string().max(300).optional(),

    optionD: z.string().max(300).optional(),

    correctOption: z.enum(['A', 'B', 'C', 'D']).optional(),

    explanation: z.string().max(2000).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export class UpdateQuestionDto extends createZodDto(UpdateQuestionSchema) {}
