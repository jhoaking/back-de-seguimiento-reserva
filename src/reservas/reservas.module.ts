import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { PassportModule } from '@nestjs/passport';
import { HistorialModule } from 'src/historial/historial.module';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    PassportModule,
    HistorialModule,
  ],
  exports: [TypeOrmModule, ReservasService],
})
export class ReservasModule {}
