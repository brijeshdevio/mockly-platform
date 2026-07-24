import { randomInt } from 'node:crypto';

import { ConflictException, Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';

import { AcademySignupDto } from './dto/academy-signup.dto';
import { AcademySignupResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
}
