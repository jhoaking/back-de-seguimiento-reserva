import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/auth.entity';
import { Interaccion } from '../types/interacciones';

@Entity({ name: 'interacciones' })
export class Interacciones {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: Interaccion,
  })
  remitente: Interaccion;

  @Column('text')
  contenido: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.message, { onDelete: 'CASCADE' })
  user: User;
}
