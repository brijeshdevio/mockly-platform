import { randomInt } from 'node:crypto';

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../constants';

import { AcademySignupDto } from './dto/academy-signup.dto';
import { AcademyLoginDto } from './dto/academy-login.dto';
import {
  AcademyLoginResponse,
  AcademySignupResponse,
  ProfileResponse,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private generateCode({ prefix = '', randomLength = 4 }): string {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const max = 10 ** randomLength;
    const random = randomInt(0, max).toString().padStart(randomLength, '0');

    return `${prefix.toUpperCase()}${day}${month}${random}`;
  }

  async academySignup(dto: AcademySignupDto): Promise<AcademySignupResponse> {
    const academyCode = this.generateCode({ prefix: 'AC' });
    const exists = await this.prisma.academy.findFirst({
      where: {
        OR: [{ academyCode }, { phone: dto.phone }],
      },
      select: {
        id: true,
        academyCode: true,
        phone: true,
      },
    });

    if (exists?.academyCode == academyCode) {
      throw new ConflictException('Academy code already exists.');
    }

    if (exists?.phone === dto.phone) {
      throw new ConflictException('Phone number is already registered');
    }

    const passwordHash = await argon2.hash(dto.password);

    const academy = await this.prisma.academy.create({
      data: {
        academyCode,
        academyName: dto.academyName,
        ownerName: dto.ownerName,
        phone: dto.phone,
        passwordHash,
      },
      select: {
        id: true,
        academyCode: true,
        academyName: true,
        ownerName: true,
        phone: true,
      },
    });

    return academy;
  }

  async academyLogin(dto: AcademyLoginDto): Promise<AcademyLoginResponse> {
    const academy = await this.prisma.academy.findUnique({
      where: {
        phone: dto.phone,
      },
      select: {
        id: true,
        passwordHash: true,
        isActive: true,
      },
    });

    if (!academy) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    if (!academy.isActive) {
      throw new ForbiddenException('Your academy account has been deactivated');
    }

    const passwordMatched = await argon2.verify(
      academy.passwordHash,
      dto.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    const accessToken = await this.jwt.signAsync(
      {
        sub: academy.id,
        role: 'ACADEMY',
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        sub: academy.id,
        role: 'ACADEMY',
      },
      {
        expiresIn: '30d',
      },
    );

    await this.prisma.academySession.create({
      data: {
        academyId: academy.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: string, role: Role): Promise<ProfileResponse> {
    switch (role) {
      case Role.ADMIN: {
        const admin = await this.prisma.admin.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            phone: true,
          },
        });

        if (!admin) {
          throw new NotFoundException('Admin not found');
        }

        return {
          role,
          ...admin,
        };
      }

      case Role.ACADEMY: {
        const academy = await this.prisma.academy.findUnique({
          where: { id: userId },
          select: {
            id: true,
            academyCode: true,
            academyName: true,
            ownerName: true,
            phone: true,
            isActive: true,
          },
        });

        if (!academy) {
          throw new NotFoundException('Academy not found');
        }

        return {
          role,
          ...academy,
        };
      }

      case Role.STUDENT: {
        const student = await this.prisma.student.findUnique({
          where: { id: userId },
          select: {
            id: true,
            studentCode: true,
            name: true,
            phone: true,
            status: true,
            academy: {
              select: {
                id: true,
                academyCode: true,
                academyName: true,
              },
            },
            course: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
        });

        if (!student) {
          throw new NotFoundException('Student not found');
        }

        return {
          role,
          ...student,
        };
      }

      default:
        throw new ForbiddenException('Invalid role');
    }
  }
}
