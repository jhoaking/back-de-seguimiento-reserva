import { Module } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [HistorialController],
  providers: [HistorialService],
  imports: [TypeOrmModule.forFeature([Historial]),PassportModule],
  exports: [TypeOrmModule, HistorialService],
})
export class HistorialModule {}
