import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { VerifyTwoFactorDto } from './dto/two-factor.dto';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('verify')
  verifyCode(@Body() verifyTwoFactorDto: VerifyTwoFactorDto) {
    return this.twoFactorService.veferifyCode(
      verifyTwoFactorDto.email,
      verifyTwoFactorDto.code,
    );
  }
}
