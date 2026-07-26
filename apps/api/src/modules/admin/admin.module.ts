import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { AdminController } from './admin.controller';
import { CourseService, QuestionService, TestService } from './services';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [CourseService, TestService, QuestionService],
})
export class AdminModule {}
