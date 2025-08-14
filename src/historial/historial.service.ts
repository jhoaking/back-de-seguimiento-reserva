import { Injectable } from '@nestjs/common';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private readonly historialRepository: Repository<Historial>,
  ) {}

  async registrarAccion(createHistorialDto: CreateHistorialDto, user: User) {
    const historial = this.historialRepository.create({
      user,
      ...createHistorialDto,
    });

    await this.historialRepository.save(historial);
    return historial;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const historial = await this.historialRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
    });

    return historial;
  }
}
