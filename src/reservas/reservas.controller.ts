import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Auth } from 'src/auth/Decorator/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidRoles } from 'src/auth/interface';
import { GetUser } from 'src/auth/Decorator/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @Auth()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reservasService.findAll(paginationDto);
  }

  @Get('/user')
  @Auth()
  findAllReservationsOfUser( @GetUser() user : User){
    return this.reservasService.findAllReservationByUser(user)
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.reservasService.findOne(term);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaDto: UpdateReservaDto,
    @GetUser() user:User
  ) {
    return this.reservasService.update(id, updateReservaDto,user);
  }
  
  @Delete(':id')
  @Auth()
  remove(
    @Param('id', ParseUUIDPipe) id: string, 
    @GetUser() user:User
) {
    return this.reservasService.remove(id,user);
  }
}
