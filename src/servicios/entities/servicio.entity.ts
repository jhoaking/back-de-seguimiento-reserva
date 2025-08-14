import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'servicios' })
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text')
  duration: string;

  @Column('bool', {
    default: true,
  })
  activo: boolean;

  @OneToMany(() => Reserva, (reserva) => reserva.servicio)
  reserva: Reserva[];
}
