import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoAccion } from '../types/historial.types';
import { User } from 'src/auth/entities/auth.entity';

@Entity({ name: 'historial_reservas' })
export class Historial {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', {
    enum: TipoAccion,
  })
  accion: TipoAccion;

  // Tipo de entidad a la que se refiere la acción (ej: 'reserva')
  @Column({ nullable: true })
  entidadReferida?: string;

  // ID de la entidad referida (por ejemplo, el ID de la reserva afectada)
  @Column({ nullable: true })
  idEntidad?: string;

  @ManyToOne(() => User, (user) => user.historial, { eager: true })
  user: User;
}
