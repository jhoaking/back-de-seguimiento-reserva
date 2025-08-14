import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { Auth } from 'src/auth/Decorator/auth.decorator';
import { ValidRoles } from 'src/auth/interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetUser } from 'src/auth/Decorator/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';


@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body() createHistorialDto: CreateHistorialDto,
    @GetUser() user:User
  ) {
    return this.historialService.registrarAccion(createHistorialDto,user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto : PaginationDto) {
    return this.historialService.findAll(paginationDto);
  }

  
}
