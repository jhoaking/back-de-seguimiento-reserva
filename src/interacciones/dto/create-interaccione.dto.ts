import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Interaccion } from "../types/interacciones";



export class CreateInteraccioneDto {


    @IsEnum(Interaccion)
    remitente:Interaccion

    @IsString()
    @MaxLength(1000)
    contenido:string

    @IsNotEmpty()
    userId:string
}
