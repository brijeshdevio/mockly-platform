import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

import { CreateCourseDto } from '../dto/create-course.dto';
import {
  CreateCourseResponse,
  GetCoursesResponse,
  UpdateCourseResponse,
} from '../admin.types';
import { GetCoursesQueryDto } from '../dto/get-courses-query.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto): Promise<CreateCourseResponse> {
    const existingCourse = await this.prisma.course.findFirst({
      where: {
        OR: [
          {
            code: dto.code,
          },
          {
            name: dto.name,
          },
        ],
      },
      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    if (existingCourse) {
      if (existingCourse.code === dto.code) {
        throw new ConflictException('Course code already exists');
      }

      throw new ConflictException('Course name already exists');
    }

    const course = await this.prisma.course.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        modules: dto.modules,
      },
      select: {
        id: true,
        code: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    return course;
  }

  async getCourses(query: GetCoursesQueryDto): Promise<GetCoursesResponse> {
    const { page, limit, search, isActive } = query;

    const where: Prisma.CourseWhereInput = {
      ...(search && {
        OR: [
          {
            code: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
      ...(isActive !== undefined && { isActive }),
    };

    const [total, courses] = await this.prisma.$transaction([
      this.prisma.course.count({
        where,
      }),
      this.prisma.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          code: true,
          name: true,
          description: true,
          modules: true,
          isActive: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      items: courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateCourse(
    courseId: string,
    body: UpdateCourseDto,
  ): Promise<UpdateCourseResponse> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (body.code || body.name) {
      const existingCourse = await this.prisma.course.findFirst({
        where: {
          id: {
            not: courseId,
          },
          OR: [
            ...(body.code
              ? [
                  {
                    code: body.code,
                  },
                ]
              : []),
            ...(body.name
              ? [
                  {
                    name: body.name,
                  },
                ]
              : []),
          ],
        },
        select: {
          code: true,
          name: true,
        },
      });

      if (existingCourse) {
        if (body.code && existingCourse.code === body.code) {
          throw new ConflictException('Course code already exists');
        }

        if (body.name && existingCourse.name === body.name) {
          throw new ConflictException('Course name already exists');
        }
      }
    }

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...(body.code !== undefined && {
          code: body.code,
        }),
        ...(body.name !== undefined && {
          name: body.name,
        }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.modules !== undefined && {
          modules: body.modules,
        }),
        ...(body.isActive !== undefined && {
          isActive: body.isActive,
        }),
      },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        modules: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return updatedCourse;
  }
}
