import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateReservaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  estado?: string[];

  @IsDateString()
  fechaReserva: string;

   @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  precio?: number;

  @IsUUID()
  userId:string

  @IsUUID()
  servicioId:string

}
