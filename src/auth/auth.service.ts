import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/auth.entity';
import { CreateUserhDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface';
import { TwoFactorService } from './two-factor/two-factor.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly twoFactorService: TwoFactorService,
  ) {}
  async registerUser(createUserDto: CreateUserhDto) {
    const { password, ...rest } = createUserDto;

    try {
      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
        createdAt: new Date(),
      });

      await this.userRepository.save(user);

      return { user };
    } catch (error) {
      console.log(error);
      this.handlerDbError(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });

      if (!user)
        throw new UnauthorizedException(`user with ${email} not valid`);

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(`password  of user not valid `);

      await this.twoFactorService.sendCodeEmail(user);

      return {
        message: 'codigo 2fa enviado al email',
        user: user
      };
    } catch (error) {
      console.log(error);
      this.handlerDbError(error);
    }
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  chekAuhtStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private handlerDbError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else if (error.code === '42703') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException('please check server  logs');
  }
}
