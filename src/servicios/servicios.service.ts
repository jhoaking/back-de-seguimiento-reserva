import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ServiciosService {
  private readonly logger = new Logger('ServiciosService');
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    const { ...rest } = createServicioDto;
    try {
      const service = this.servicioRepository.create({
        ...rest,
      });

      await this.servicioRepository.save(service);

      return { service };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const service = await this.servicioRepository.find({
      take: limit,
      skip: offset,
    });
    return service;
  }

  async findOne(term: string) {
    let service: Servicio | null = null;

    if (isUUID(term)) {
      service = await this.servicioRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.servicioRepository.createQueryBuilder('serv');
      service = await queryBuilder
        .where('name =:name', {
          name: term,
        })
        .getOne();
    }
    if (!service) throw new NotFoundException(`service with ${term} not found`);

    return service;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const { ...toUpdate } = updateServicioDto;

    try {
      const service = await this.servicioRepository.preload({
        id,
        ...toUpdate,
      });

      if (!service) throw new NotFoundException(`service with ${id} not found`);

      await this.servicioRepository.save(service);

      return this.findOne(id);
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const service = await this.findOne(id);

    await this.servicioRepository.remove(service);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'unexpected error check server logs!',
    );
  }

  async deleteAllProducts() {
    const query = this.servicioRepository.createQueryBuilder('service');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
