import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { type Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';

import { apiSuccessResponse, setCookie } from '../../common/helpers';
import { COOKIE_MAX_AGE, COOKIE_NAME } from '../../common/constants';
import { User } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';
import { Role } from '../../constants';

import { AuthService } from './auth.service';
import {
  AcademySignupDto,
  AcademySignupSchema,
} from './dto/academy-signup.dto';
import { AcademyLoginDto, AcademyLoginSchema } from './dto/academy-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('academy/signup')
  async academySignup(
    @Body(new ZodValidationPipe(AcademySignupSchema))
    body: AcademySignupDto,
  ) {
    const data = await this.authService.academySignup(body);

    return apiSuccessResponse({
      message: 'Academy registered successfully',
      data,
    });
  }

  @Post('academy/login')
  async academyLogin(
    @Body(new ZodValidationPipe(AcademyLoginSchema))
    body: AcademyLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.academyLogin(body);

    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE_MAX_AGE.ACCESS_TOKEN,
    });

    setCookie(res, COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
      maxAge: COOKIE_MAX_AGE.REFRESH_TOKEN,
    });

    return apiSuccessResponse({ message: 'Login successful' });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@User('id') userId: string, @User('role') role: Role) {
    const data = await this.authService.getProfile(userId, role);

    return apiSuccessResponse({ data });
  }
}
