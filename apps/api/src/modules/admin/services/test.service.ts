import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

import { CreateTestDto } from '../dto/create-test.dto';
import { GetTestsQueryDto } from '../dto/get-tests-query.dto';
import { UpdateTestDto } from '../dto/update-test.dto';
import {
  AddTestQuestionsResponse,
  CreateTestResponse,
  GetTestsResponse,
  UpdateTestResponse,
} from '../admin.types';
import { AddTestQuestionsDto } from '../dto/add-test-questions.dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async createTest(body: CreateTestDto): Promise<CreateTestResponse> {
    const test = await this.prisma.test.create({
      data: {
        title: body.title,
        description: body.description,
        durationInMinutes: body.durationInMinutes,
        passingPercentage: body.passingPercentage,
        isPublished: body.isPublished,
      },
      select: {
        id: true,
        title: true,
        description: true,
        durationInMinutes: true,
        passingPercentage: true,
        isPublished: true,
        createdAt: true,
      },
    });

    return test;
  }

  async getTests(query: GetTestsQueryDto): Promise<GetTestsResponse> {
    const { page, limit, search, isPublished } = query;

    const where: Prisma.TestWhereInput = {
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      }),
      ...(isPublished !== undefined && { isPublished }),
    };

    const [total, tests] = await this.prisma.$transaction([
      this.prisma.test.count({
        where,
      }),
      this.prisma.test.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          durationInMinutes: true,
          passingPercentage: true,
          isPublished: true,
          createdAt: true,
          _count: {
            select: {
              questions: true,
            },
          },
        },
      }),
    ]);

    return {
      items: tests.map((test) => ({
        id: test.id,
        title: test.title,
        description: test.description,
        durationInMinutes: test.durationInMinutes,
        passingPercentage: test.passingPercentage,
        isPublished: test.isPublished,
        totalQuestions: test._count.questions,
        createdAt: test.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateTest(
    id: string,
    body: UpdateTestDto,
  ): Promise<UpdateTestResponse> {
    const test = await this.prisma.test.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    return this.prisma.test.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.durationInMinutes !== undefined && {
          durationInMinutes: body.durationInMinutes,
        }),
        ...(body.passingPercentage !== undefined && {
          passingPercentage: body.passingPercentage,
        }),
        ...(body.isPublished !== undefined && {
          isPublished: body.isPublished,
        }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        durationInMinutes: true,
        passingPercentage: true,
        isPublished: true,
        updatedAt: true,
      },
    });
  }

  async addQuestions(
    testId: string,
    body: AddTestQuestionsDto,
  ): Promise<AddTestQuestionsResponse> {
    const test = await this.prisma.test.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,
      },
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    const questions = await this.prisma.question.findMany({
      where: {
        id: {
          in: body.questionIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (questions.length !== body.questionIds.length) {
      throw new NotFoundException('One or more questions were not found');
    }

    const existingQuestions = await this.prisma.testQuestion.findMany({
      where: {
        testId,
        questionId: {
          in: body.questionIds,
        },
      },
      select: {
        questionId: true,
      },
    });

    if (existingQuestions.length > 0) {
      throw new ConflictException(
        'One or more questions are already added to this test',
      );
    }

    await this.prisma.testQuestion.createMany({
      data: body.questionIds.map((questionId) => ({
        testId,
        questionId,
      })),
    });

    return {
      addedCount: body.questionIds.length,
    };
  }
}
