import { Injectable } from '@nestjs/common';
import { ServiciosService } from 'src/servicios/servicios.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly servicioService: ServiciosService) {}

  async runSeed() {
    await this.insertNewService();

    return 'SEED EXECUTED';
  }

  private async insertNewService() {
    await this.servicioService.deleteAllProducts();

    const service = initialData.services;

    const insertPromises: Promise<any>[] = [];

    service.forEach((service) => {
      insertPromises.push(this.servicioService.create(service));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
