import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GetTestsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z.string().trim().max(100).optional(),

    isPublished: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
  })
  .strict();

export class GetTestsQueryDto extends createZodDto(GetTestsQuerySchema) {}
