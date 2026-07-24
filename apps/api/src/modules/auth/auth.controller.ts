import { Body, Controller, Post } from '@nestjs/common';

import { apiSuccessResponse } from '../../common/helpers';

import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  AcademySignupDto,
  AcademySignupSchema,
} from './dto/academy-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('academy/signup')
  async signup(
    @Body(new ZodValidationPipe(AcademySignupSchema))
    body: AcademySignupDto,
  ) {
    const data = await this.authService.academySignup(body);

    return apiSuccessResponse({
      message: 'Academy registered successfully',
      data,
    });
  }
}
