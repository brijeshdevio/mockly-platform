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

import { CourseService, TestService } from './services';
import { CreateCourseDto, CreateCourseSchema } from './dto/create-course.dto';
import {
  GetCoursesQueryDto,
  GetCoursesQuerySchema,
} from './dto/get-courses-query.dto';
import { UpdateCourseDto, UpdateCourseSchema } from './dto/update-course.dto';
import { CreateTestDto, CreateTestSchema } from './dto/create-test.dto';
import {
  GetTestsQueryDto,
  GetTestsQuerySchema,
} from './dto/get-tests-query.dto';
import { UpdateTestDto, UpdateTestSchema } from './dto/update-test.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly courseService: CourseService,
    private readonly testService: TestService,
  ) {}

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

  @Post('tests')
  async createTest(
    @Body(new ZodValidationPipe(CreateTestSchema))
    body: CreateTestDto,
  ) {
    const data = await this.testService.createTest(body);

    return apiSuccessResponse({ message: 'Test created successfully', data });
  }

  @Get('tests')
  async getTests(
    @Query(new ZodValidationPipe(GetTestsQuerySchema))
    query: GetTestsQueryDto,
  ) {
    const data = await this.testService.getTests(query);

    return apiSuccessResponse({ data });
  }

  @Patch('tests/:id')
  async updateTest(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateTestSchema))
    body: UpdateTestDto,
  ) {
    const data = await this.testService.updateTest(id, body);

    return apiSuccessResponse({ message: 'Test updated successfully', data });
  }
}
