import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { apiSuccessResponse } from '../../common/helpers';

import { CourseService } from './services';
import { CreateCourseDto, CreateCourseSchema } from './dto/create-course.dto';
import {
  GetCoursesQueryDto,
  GetCoursesQuerySchema,
} from './dto/get-courses-query.dto';
import { UpdateCourseDto, UpdateCourseSchema } from './dto/update-course.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly courseService: CourseService) {}

  @Post('courses')
  async createCourse(
    @Body(new ZodValidationPipe(CreateCourseSchema))
    body: CreateCourseDto,
  ) {
    const data = await this.courseService.createCourse(body);

    return apiSuccessResponse({ message: 'Course created successfully', data });
  }

  @Get('courses')
  async getCourses(
    @Query(new ZodValidationPipe(GetCoursesQuerySchema))
    query: GetCoursesQueryDto,
  ) {
    const data = await this.courseService.getCourses(query);

    return apiSuccessResponse({ data });
  }

  @Patch('courses/:courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body(new ZodValidationPipe(UpdateCourseSchema))
    body: UpdateCourseDto,
  ) {
    const data = await this.courseService.updateCourse(courseId, body);

    return apiSuccessResponse({ message: 'Course updated successfully', data });
  }
}
