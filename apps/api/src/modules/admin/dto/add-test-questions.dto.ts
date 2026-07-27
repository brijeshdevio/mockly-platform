import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const AddTestQuestionsSchema = z
  .object({
    questionIds: z
      .array(
        z.string().cuid('Invalid question id'),
        'Question ids are required',
      )
      .min(1, 'At least one question is required')
      .max(500, 'Maximum 500 questions can be added at once'),
  })
  .strict()
  .refine(
    (data) => new Set(data.questionIds).size === data.questionIds.length,
    {
      message: 'Duplicate question ids are not allowed',
      path: ['questionIds'],
    },
  );

export class AddTestQuestionsDto extends createZodDto(AddTestQuestionsSchema) {}
