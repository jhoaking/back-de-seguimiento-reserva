import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { TwoFactor } from './entities/two-factor.entity';
import { AuthService } from '../auth.service';
import { User } from '../entities/auth.entity';
import { EmailService } from './EmailService/sendEmail';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(TwoFactor)
    private readonly twoFactorRepository: Repository<TwoFactor>,

    @Inject(forwardRef(() => AuthService))
    private readonly auhtService: AuthService,

    private readonly emailService: EmailService,
  ) {}

  async sendCodeEmail(user: User) {
    const existingUser = await this.twoFactorRepository.findOne({
      where: {
        email: user.email,
        isUsed: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (existingUser) {
      await this.sendEmail(user.email, existingUser.code);
      return;
    }

    const code = this.generatedCode();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const record = this.twoFactorRepository.create({
      code,
      email: user.email,
      createdAt: new Date(),
      expiresAt,
      user: user,
    });

    await this.twoFactorRepository.save(record);

    await this.sendEmail(user.email, code);
  }

  async veferifyCode(email: string, code: string): Promise<{ token: string }> {
    const record = await this.twoFactorRepository.findOne({
      where: { email, code, isUsed: false },
      relations: {
        user: true,
      },
    });

    if (!record || record.expiresAt < new Date())
      throw new UnauthorizedException('invalid or expired code ');

    record.isUsed = true;
    await this.twoFactorRepository.save(record);

    const token = this.auhtService.getJwtToken({ id: record.user.id });

    return { token };
  }

  private generatedCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private sendEmail(to: string, code: string) {
    return this.emailService.sendCode(to, code);
  }
}
