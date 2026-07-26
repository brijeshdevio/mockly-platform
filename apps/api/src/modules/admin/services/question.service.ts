import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

import { CreateQuestionDto } from '../dto/create-question.dto';
import { GetQuestionsQueryDto } from '../dto/get-questions-query';
import {
  CreateQuestionResponse,
  GetQuestionsResponse,
  UpdateQuestionResponse,
} from '../admin.types';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(
    dto: CreateQuestionDto,
  ): Promise<CreateQuestionResponse> {
    if (
      (dto.correctOption === 'C' && !dto.optionC) ||
      (dto.correctOption === 'D' && !dto.optionD)
    ) {
      throw new BadRequestException(
        `Option ${dto.correctOption} must be provided as the correct answer`,
      );
    }

    const question = await this.prisma.question.create({
      data: {
        question: dto.question,
        optionA: dto.optionA,
        optionB: dto.optionB,
        optionC: dto.optionC,
        optionD: dto.optionD,
        correctOption: dto.correctOption,
        explanation: dto.explanation,
      },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        correctOption: true,
        explanation: true,
        createdAt: true,
      },
    });

    return question;
  }

  async getQuestions(
    query: GetQuestionsQueryDto,
  ): Promise<GetQuestionsResponse> {
    const { page, limit, search } = query;

    const where: Prisma.QuestionWhereInput = {
      ...(search
        ? {
            question: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : {}),
    };

    const [total, questions] = await this.prisma.$transaction([
      this.prisma.question.count({
        where,
      }),
      this.prisma.question.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          question: true,
          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,
          correctOption: true,
          explanation: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      items: questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateQuestion(
    id: string,
    dto: UpdateQuestionDto,
  ): Promise<UpdateQuestionResponse> {
    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
      select: {
        id: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        correctOption: true,
      },
    });

    if (!existingQuestion) {
      throw new NotFoundException('Question not found');
    }

    const optionC = dto.optionC ?? existingQuestion.optionC;
    const optionD = dto.optionD ?? existingQuestion.optionD;
    const correctOption = dto.correctOption ?? existingQuestion.correctOption;

    if (
      (correctOption === 'C' && !optionC) ||
      (correctOption === 'D' && !optionD)
    ) {
      throw new BadRequestException(
        `Option ${correctOption} must be provided as the correct answer`,
      );
    }

    const question = await this.prisma.question.update({
      where: { id },
      data: {
        question: dto.question,
        optionA: dto.optionA,
        optionB: dto.optionB,
        optionC: dto.optionC,
        optionD: dto.optionD,
        correctOption: dto.correctOption,
        explanation: dto.explanation,
      },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        correctOption: true,
        explanation: true,
        updatedAt: true,
      },
    });

    return question;
  }
}
