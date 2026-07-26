import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const CreateQuestionSchema = z
  .object({
    question: z
      .string('Question is required')
      .min(5, 'Question must be at least 5 characters')
      .max(1000, 'Question is too long'),

    optionA: z
      .string('Option A is required')
      .min(1, 'Option A is required')
      .max(300),

    optionB: z
      .string('Option B is required')
      .min(1, 'Option B is required')
      .max(300),

    optionC: z.string().max(300).optional(),

    optionD: z.string().max(300).optional(),

    correctOption: z.enum(['A', 'B', 'C', 'D'], {
      message: 'Correct option must be A, B, C or D',
    }),

    explanation: z.string().max(500).optional(),
  })
  .strict();

export class CreateQuestionDto extends createZodDto(CreateQuestionSchema) {}
