import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {
    //Usamos validaciones pra controlar que tipo de datos debemos recibir
    @IsEmail() // Debe ser email
    correo: string;
    @IsString()// Debe ser string
    contrasenia: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto){
    @IsNumber() // Debe ser ser nuemro
    @IsPositive() // Positivo
    //Transformamos si tipo a Number
    @Type(()=> Number)
    id: number;
}

//Con esta clase, controlamos el objeto recibido al hacer login

export class LoginDto {
    @IsEmail()
    correo: string;
    @IsString()
    contrasenia: string;
}