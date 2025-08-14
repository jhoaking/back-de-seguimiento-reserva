import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Headers
} from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { Auth } from 'src/auth/Decorator/auth.decorator';
import { ValidRoles } from 'src/auth/interface';

@Controller('interacciones')
export class InteraccionesController {
  constructor(private readonly interaccionesService: InteraccionesService) {}

  @Post()
  create(
    @Body() createInteraccioneDto: CreateInteraccioneDto,
    @Headers('x-source') source: string,
  ) {
    const fromN8n = source === 'ia';
    return this.interaccionesService.create(createInteraccioneDto, fromN8n);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.interaccionesService.findAll(userId);
  }
}
