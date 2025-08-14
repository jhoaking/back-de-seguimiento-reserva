import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ServiciosModule } from 'src/servicios/servicios.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports : [ServiciosModule]
})
export class SeedModule {}
