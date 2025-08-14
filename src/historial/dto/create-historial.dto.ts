import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TipoAccion } from '../types/historial.types';

export class CreateHistorialDto {
  @IsEnum(TipoAccion)
  accion: TipoAccion;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  entidadReferida?: string;

  @IsOptional()
  @IsUUID()
  idEntidad?: string;
}
