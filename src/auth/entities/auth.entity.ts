import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TwoFactor } from '../two-factor/entities/two-factor.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Historial } from 'src/historial/entities/historial.entity';
import { Interacciones } from 'src/interacciones/entities/interaccione.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: true,
  })
  password: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(
    () => TwoFactor,
    (twoFactor) => twoFactor.user,
    {eager : true}
  )
  twoFactor : TwoFactor[]


  @OneToMany(
    ()=> Reserva,
    (reserva) => reserva.user,
    {cascade : true}
  )
  reservas:Reserva[]

  @OneToMany(
    () => Historial,
    (historial) => historial.user
  )
  historial:Historial[]


  @OneToMany(
    () =>  Interacciones,
    (interaccion) => interaccion.user,
    {eager : true}
  )
  message : Interacciones[]

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}
