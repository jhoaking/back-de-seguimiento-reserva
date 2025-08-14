import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { sendMessageByN8n } from './adapter/n8n-adapter';

import { CreateInteraccioneDto } from './dto/create-interaccione.dto';

import { Interacciones } from './entities/interaccione.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Interaccion } from './types/interacciones';

@Injectable()
export class InteraccionesService {
  constructor(
    @InjectRepository(Interacciones)
    private readonly interaccionesRepository: Repository<Interacciones>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createInteraccioneDto: CreateInteraccioneDto,
    fromN8n: boolean,
  ): Promise<Interacciones> {
    const user = await this.userRepository.findOneBy({
      id: createInteraccioneDto.userId,
    });

    if (!user)
      throw new NotFoundException(
        `user with ${createInteraccioneDto.userId} not found`,
      );

    const remitente = fromN8n
      ? Interaccion.ia
      : createInteraccioneDto.remitente;

    const interaccion = this.interaccionesRepository.create({
      ...createInteraccioneDto,
      remitente,
      user,
    });

    if (interaccion.remitente === 'user' || interaccion.remitente === 'admin') {
      try {
         sendMessageByN8n(createInteraccioneDto);
      } catch (error) {
        console.log(error);
        console.error('n8n falló, pero no se detiene la creación del mensaje');
      }
    }
    await this.interaccionesRepository.save(interaccion);
    return interaccion;
  }

  async findAll(user_id: string): Promise<Interacciones[]> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new NotFoundException(' user not found');

    const message = await this.interaccionesRepository.find({
      where: { user: { id: user_id } },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return message;
  }
}
 