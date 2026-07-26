import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

import { CreateTestDto } from '../dto/create-test.dto';
import { GetTestsQueryDto } from '../dto/get-tests-query.dto';
import { UpdateTestDto } from '../dto/update-test.dto';
import {
  CreateTestResponse,
  GetTestsResponse,
  UpdateTestResponse,
} from '../admin.types';

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
}
